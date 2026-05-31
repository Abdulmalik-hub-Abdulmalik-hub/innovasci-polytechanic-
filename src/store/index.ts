// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - ZUSTAND STORE
// Updated for 5-Portal Architecture with RBAC
// =====================================================

import { create } from 'zustand';
import { User, UserRole, ROLE_DISPLAY_NAMES } from '@/types';
import { hasPermission, Permission, getPortalForRole, getRolePermissions } from '@/lib/rbac';

// =====================================================
// PORTAL TYPES
// =====================================================
export type PortalId = 'applicant' | 'student' | 'academic' | 'management' | 'admin';

interface PortalState {
  id: PortalId;
  name: string;
  roles: UserRole[];
}

export const PORTALS: Record<PortalId, PortalState> = {
  applicant: { id: 'applicant', name: 'Applicant Portal', roles: ['applicant'] },
  student: { id: 'student', name: 'Student Portal', roles: ['student'] },
  academic: { id: 'academic', name: 'Academic Staff Portal', roles: ['lecturer', 'program_coordinator', 'hod', 'dean'] },
  management: { id: 'management', name: 'Management Portal', roles: ['rector', 'deputy_rector_academic', 'deputy_rector_admin', 'registrar', 'bursar', 'librarian', 'director'] },
  admin: { id: 'admin', name: 'Super Admin Portal', roles: ['super_admin'] },
};

// =====================================================
// AUTH STORE
// =====================================================

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  portalId: PortalId | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  checkPermission: (permission: Permission) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  portalId: null,
  setUser: (user) => {
    const portalId = user ? getPortalForRole(user.role) as PortalId : null;
    set({ user, isAuthenticated: !!user, portalId });
  },
  setToken: (token) => set({ token }),
  login: (user, token) => {
    const portalId = getPortalForRole(user.role) as PortalId;
    set({ user, token, isAuthenticated: true, isLoading: false, portalId });
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false, portalId: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
  setLoading: (isLoading) => set({ isLoading }),
  checkPermission: (permission: Permission) => {
    const { user } = get();
    if (!user) return false;
    return hasPermission(user.role, permission);
  },
}));

// =====================================================
// APP STORE
// =====================================================

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

interface NotificationState {
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
  }>;
  unreadCount: number;
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }));
  },
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));

interface AcademicState {
  currentSemester: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    paymentDeadline: string;
  } | null;
  currentLevel: number;
  cgpa: number;
  gpa: number;
  setAcademicData: (data: Partial<AcademicState>) => void;
}

export const useAcademicStore = create<AcademicState>((set) => ({
  currentSemester: null,
  currentLevel: 1,
  cgpa: 0,
  gpa: 0,
  setAcademicData: (data) => set((state) => ({ ...state, ...data })),
}));

interface PaymentState {
  hasAccess: boolean;
  accessLevel: 'none' | 'partial' | 'full';
  paymentProgress: number;
  setPaymentStatus: (status: { hasAccess: boolean; accessLevel: 'none' | 'partial' | 'full'; paymentProgress: number }) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  hasAccess: false,
  accessLevel: 'none',
  paymentProgress: 0,
  setPaymentStatus: (status) => set(status),
}));