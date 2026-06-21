import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Users,
  Settings,
  BookOpen,
  CreditCard,
  Shield,
  ClipboardList,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  UserCheck,
  Building2,
  Award,
  FileCheck,
  Upload,
  Calendar,
  BookMarked,
  Video,
  FlaskConical,
  Library,
  ClipboardCheck,
  BarChart,
  Scale,
  FileStack,
  Database,
  Key,
  Eye,
  UsersRound,
  UserCog,
  BellRing,
  Settings2,
  Gauge,
  PieChart,
  BadgeCheck,
  History,
  Webhook,
  Send,
  DollarSign,
  TrendingUp,
  Briefcase,
  BookPlus,
  CheckSquare,
  AlertCircle,
  Zap,
  GitBranch,
} from 'lucide-react';
import { Permission } from './rbac';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  permission?: Permission;
  children?: NavItem[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

// =====================================================
// MANAGEMENT PORTAL NAVIGATION
// =====================================================

export const MANAGEMENT_NAVIGATION: NavSection[] = [
  {
    label: 'Dashboard',
    items: [
      { label: 'Overview', href: '/portal/management', icon: LayoutDashboard },
      { label: 'Analytics', href: '/portal/management/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'User Management',
    items: [
      { label: 'Users', href: '/portal/management/users', icon: Users, permission: 'users.view' },
      { label: 'Roles & Permissions', href: '/portal/management/roles', icon: Shield, permission: 'users.view' },
      { label: 'Staff Directory', href: '/portal/management/directory', icon: UsersRound },
    ],
  },
  {
    label: 'Academic',
    items: [
      { label: 'Programmes', href: '/portal/management/programmes', icon: GraduationCap, permission: 'academic.view' },
      { label: 'Departments', href: '/portal/management/departments', icon: Building2, permission: 'academic.view' },
      { label: 'Courses', href: '/portal/management/courses', icon: BookOpen, permission: 'courses.view' },
      { label: 'Curriculum', href: '/portal/management/curriculum', icon: BookPlus, permission: 'academic.view' },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Applications', href: '/portal/management/admissions/applications', icon: FileText, permission: 'admission.view' },
      { label: 'Verification', href: '/portal/management/admissions/verification', icon: CheckSquare, permission: 'admission.view' },
      { label: 'Letters', href: '/portal/management/admissions/letters', icon: Send, permission: 'admission.view' },
      { label: 'Reports', href: '/portal/management/admissions/reports', icon: BarChart, permission: 'admission.view' },
    ],
  },
  {
    label: 'Examinations',
    items: [
      { label: 'CBT Exams', href: '/portal/management/exams', icon: ClipboardCheck, permission: 'exams.view' },
      { label: 'Question Banks', href: '/portal/management/question-banks', icon: Database, permission: 'exams.view' },
      { label: 'Results', href: '/portal/management/results', icon: BarChart3, permission: 'results.view' },
      { label: 'Grade Management', href: '/portal/management/grading', icon: TrendingUp, permission: 'results.view' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Payments', href: '/portal/management/payments', icon: CreditCard, permission: 'payments.view' },
      { label: 'Financial Reports', href: '/portal/management/financial-reports', icon: BarChart, permission: 'payments.view' },
      { label: 'Billing', href: '/portal/management/billing', icon: DollarSign, permission: 'payments.view' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Quality Assurance', href: '/portal/management/qa', icon: Award, permission: 'qa.view' },
      { label: 'ODFeL Compliance', href: '/portal/management/odfel', icon: Scale, permission: 'odfel.view' },
      { label: 'ICT Management', href: '/portal/management/ict', icon: Zap, permission: 'settings.view' },
      { label: 'Library Services', href: '/portal/management/library', icon: Library, permission: 'documents.view' },
    ],
  },
  {
    label: 'Reports & Analytics',
    items: [
      { label: 'System Reports', href: '/portal/management/reports', icon: FileText, permission: 'reports.view' },
      { label: 'Audit Logs', href: '/portal/management/audit', icon: History, permission: 'audit.view' },
      { label: 'Compliance', href: '/portal/management/compliance', icon: FileCheck, permission: 'qa.view' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Settings', href: '/portal/management/settings', icon: Settings, permission: 'settings.view' },
      { label: 'Notifications', href: '/portal/management/notifications', icon: Bell, permission: 'notifications.view' },
    ],
  },
];

// =====================================================
// ACADEMIC PORTAL NAVIGATION
// =====================================================

export const ACADEMIC_NAVIGATION: NavSection[] = [
  {
    label: 'Dashboard',
    items: [
      { label: 'Overview', href: '/portal/academic', icon: LayoutDashboard },
      { label: 'Analytics', href: '/portal/academic/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Academic Management',
    items: [
      { label: 'Programmes', href: '/portal/academic/programmes', icon: GraduationCap, permission: 'programme.view' },
      { label: 'Departments', href: '/portal/academic/departments', icon: Building2, permission: 'department.view' },
      { label: 'Curriculum', href: '/portal/academic/curriculum', icon: BookPlus, permission: 'curriculum.view' },
      { label: 'Courses', href: '/portal/academic/courses', icon: BookOpen, permission: 'courses.view' },
    ],
  },
  {
    label: 'Teaching & Learning',
    items: [
      { label: 'My Courses', href: '/portal/academic/my-courses', icon: BookOpen, permission: 'courses.view' },
      { label: 'Course Content', href: '/portal/academic/content', icon: FileText, permission: 'content.view' },
      { label: 'Assignments', href: '/portal/academic/assignments', icon: ClipboardList, permission: 'assignments.view' },
      { label: 'Grading', href: '/portal/academic/grading', icon: BarChart, permission: 'results.edit' },
    ],
  },
  {
    label: 'Assessment',
    items: [
      { label: 'Examinations', href: '/portal/academic/exams', icon: ClipboardCheck, permission: 'exams.view' },
      { label: 'Question Banks', href: '/portal/academic/question-banks', icon: Database, permission: 'exams.view' },
      { label: 'Results', href: '/portal/academic/results', icon: BarChart3, permission: 'results.view' },
      { label: 'Attendance', href: '/portal/academic/attendance', icon: UserCheck, permission: 'attendance.view' },
    ],
  },
  {
    label: 'Students',
    items: [
      { label: 'Enrolled Students', href: '/portal/academic/students', icon: Users, permission: 'students.view' },
      { label: 'Student Progress', href: '/portal/academic/progress', icon: TrendingUp, permission: 'students.view' },
      { label: 'Advisory', href: '/portal/academic/advisory', icon: AlertCircle, permission: 'students.view' },
    ],
  },
  {
    label: 'Research & Projects',
    items: [
      { label: 'Projects', href: '/portal/academic/projects', icon: Briefcase, permission: 'projects.view' },
      { label: 'Supervision', href: '/portal/academic/supervision', icon: Eye, permission: 'projects.supervise' },
      { label: 'Publications', href: '/portal/academic/publications', icon: BookMarked, permission: 'documents.view' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Learning Materials', href: '/portal/academic/materials', icon: FileText, permission: 'content.view' },
      { label: 'Virtual Labs', href: '/portal/academic/labs', icon: FlaskConical, permission: 'labs.view' },
      { label: 'Library', href: '/portal/academic/library', icon: Library, permission: 'documents.view' },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Settings', href: '/portal/academic/settings', icon: Settings, permission: 'settings.view' },
      { label: 'Notifications', href: '/portal/academic/notifications', icon: Bell, permission: 'notifications.view' },
    ],
  },
];

// =====================================================
// STUDENT PORTAL NAVIGATION
// =====================================================

export const STUDENT_NAVIGATION: NavSection[] = [
  {
    label: 'Learning',
    items: [
      { label: 'Dashboard', href: '/portal/student', icon: LayoutDashboard },
      { label: 'My Courses', href: '/portal/student/courses', icon: BookOpen },
      { label: 'Video Lectures', href: '/portal/student/lectures', icon: Video },
      { label: 'Slides & Materials', href: '/portal/student/materials', icon: FileText },
      { label: 'Virtual Laboratory', href: '/portal/student/laboratory', icon: FlaskConical },
      { label: 'E-Library', href: '/portal/student/library', icon: Library },
    ],
  },
  {
    label: 'Academic',
    items: [
      { label: 'Course Registration', href: '/portal/student/registration', icon: UserCheck },
      { label: 'Assignments', href: '/portal/student/assignments', icon: ClipboardList },
      { label: 'CBT Exams', href: '/portal/student/exams', icon: ClipboardCheck },
      { label: 'Results', href: '/portal/student/results', icon: BarChart3 },
      { label: 'Transcript', href: '/portal/student/transcript', icon: FileStack },
      { label: 'Attendance', href: '/portal/student/attendance', icon: UserCheck },
    ],
  },
  {
    label: 'Finance',
    items: [
      { label: 'Payment Dashboard', href: '/portal/student/payment', icon: CreditCard },
      { label: 'Invoices', href: '/portal/student/invoices', icon: FileText },
      { label: 'Payment History', href: '/portal/student/payment-history', icon: History },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Notifications', href: '/portal/student/notifications', icon: Bell },
      { label: 'Help & FAQ', href: '/portal/student/help', icon: FileCheck },
      { label: 'Submit a Ticket', href: '/portal/student/support', icon: Send },
    ],
  },
];

// =====================================================
// APPLICANT PORTAL NAVIGATION
// =====================================================

export const APPLICANT_NAVIGATION: NavSection[] = [
  {
    label: 'Application',
    items: [
      { label: 'Dashboard', href: '/portal/applicant', icon: LayoutDashboard },
      { label: 'My Application', href: '/portal/applicant/application', icon: FileText },
      { label: 'Document Upload', href: '/portal/applicant/documents', icon: Upload },
      { label: 'Application Status', href: '/portal/applicant/status', icon: BadgeCheck },
    ],
  },
  {
    label: 'Payments',
    items: [
      { label: 'Pay Application Fee', href: '/portal/applicant/payment', icon: CreditCard },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Notifications', href: '/portal/applicant/notifications', icon: Bell },
      { label: 'Help & FAQ', href: '/portal/applicant/help', icon: FileCheck },
    ],
  },
];

// =====================================================
// SUPER ADMIN PORTAL NAVIGATION
// =====================================================

export const SUPER_ADMIN_NAVIGATION: NavSection[] = [
  {
    label: 'Dashboard',
    items: [
      { label: 'Overview', href: '/portal/super-admin', icon: LayoutDashboard },
      { label: 'Analytics', href: '/portal/super-admin/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'User Management', href: '/portal/super-admin/users', icon: Users },
      { label: 'Role Management', href: '/portal/super-admin/roles', icon: Shield },
      { label: 'Permission Management', href: '/portal/super-admin/permissions', icon: Key },
      { label: 'Audit Logs', href: '/portal/super-admin/audit', icon: History },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { label: 'Institution Settings', href: '/portal/super-admin/settings', icon: Settings },
      { label: 'LMS Configuration', href: '/portal/super-admin/lms', icon: BookOpen },
      { label: 'CBT Configuration', href: '/portal/super-admin/cbt', icon: ClipboardCheck },
      { label: 'API Management', href: '/portal/super-admin/api', icon: Webhook },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Admissions', href: '/portal/super-admin/admissions', icon: UserCheck },
      { label: 'Applications', href: '/portal/super-admin/applications', icon: FileText },
    ],
  },
];

// Get navigation by portal type
export function getNavigationByPortal(portal: 'management' | 'academic' | 'student' | 'applicant' | 'admin'): NavSection[] {
  switch (portal) {
    case 'management':
      return MANAGEMENT_NAVIGATION;
    case 'academic':
      return ACADEMIC_NAVIGATION;
    case 'student':
      return STUDENT_NAVIGATION;
    case 'applicant':
      return APPLICANT_NAVIGATION;
    case 'admin':
      return SUPER_ADMIN_NAVIGATION;
    default:
      return STUDENT_NAVIGATION;
  }
}
