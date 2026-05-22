import { create } from 'zustand';
import { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token }),
  login: (user, token) => {
    set({ user, token, isAuthenticated: true, isLoading: false });
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },
  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },
  setLoading: (isLoading) => set({ isLoading }),
}));

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

// Permission matrix for RBAC
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: ['*'],
  system_admin: [
    'users.view', 'users.create', 'users.edit', 'users.delete',
    'academic.view', 'academic.edit',
    'payments.view', 'payments.manage',
    'exams.view', 'exams.create', 'exams.edit',
    'settings.view', 'settings.edit',
  ],
  admission_officer: [
    'admission.view', 'admission.create', 'admission.edit', 'admission.approve',
  ],
  finance_officer: [
    'payments.view', 'payments.create', 'payments.verify', 'payments.report',
  ],
  exam_officer: [
    'exams.view', 'exams.create', 'exams.edit', 'exams.publish', 'exams.monitor',
  ],
  student_affairs: [
    'students.view', 'complaints.view', 'complaints.manage',
  ],
  hod: [
    'department.view', 'department.manage', 'courses.view', 'courses.edit',
    'results.view', 'results.edit',
  ],
  lecturer: [
    'courses.view', 'materials.create', 'assignments.view', 'assignments.grade',
    'results.view', 'results.edit',
  ],
  student: [
    'dashboard.view', 'courses.view', 'assignments.view', 'assignments.submit',
    'exams.view', 'exams.take', 'results.view', 'payments.view',
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  if (permissions.includes('*')) return true;
  return permissions.includes(permission);
}