// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - RBAC SYSTEM
// Role-Based Access Control for 5-Portal Architecture
// =====================================================

import { UserRole, ROLE_CATEGORIES } from '@/types';

// Permission definitions
export const PERMISSIONS = {
  // Dashboard & Navigation
  'dashboard.view': 'View Dashboard',
  'dashboard.analytics': 'View Analytics',
  
  // User Management
  'users.view': 'View Users',
  'users.create': 'Create Users',
  'users.edit': 'Edit Users',
  'users.delete': 'Delete Users',
  'users.export': 'Export Users',
  
  // Role Management
  'roles.view': 'View Roles',
  'roles.create': 'Create Roles',
  'roles.edit': 'Edit Roles',
  'roles.delete': 'Delete Roles',
  
  // Academic Permissions
  'academic.view': 'View Academic Data',
  'academic.edit': 'Edit Academic Data',
  'academic.approve': 'Approve Academic Records',
  
  // Student Permissions
  'students.view': 'View Students',
  'students.create': 'Create Student Records',
  'students.edit': 'Edit Student Records',
  'students.delete': 'Delete Student Records',
  'students.enroll': 'Enroll Students',
  'students.graduation': 'Manage Graduation',
  
  // Course Permissions
  'courses.view': 'View Courses',
  'courses.create': 'Create Courses',
  'courses.edit': 'Edit Courses',
  'courses.delete': 'Delete Courses',
  'courses.assign': 'Assign Courses to Lecturers',
  
  // Content & LMS
  'content.view': 'View Content',
  'content.create': 'Create Content',
  'content.edit': 'Edit Content',
  'content.delete': 'Delete Content',
  'content.publish': 'Publish Content',
  
  // Assignment Permissions
  'assignments.view': 'View Assignments',
  'assignments.create': 'Create Assignments',
  'assignments.edit': 'Edit Assignments',
  'assignments.grade': 'Grade Assignments',
  'assignments.submit': 'Submit Assignments',
  
  // Examination & CBT
  'exams.view': 'View Examinations',
  'exams.create': 'Create Examinations',
  'exams.edit': 'Edit Examinations',
  'exams.publish': 'Publish Examinations',
  'exams.monitor': 'Monitor Examinations',
  'exams.take': 'Take Examinations',
  'exams.grade': 'Grade Examinations',
  
  // Results & Grading
  'results.view': 'View Results',
  'results.edit': 'Edit Results',
  'results.approve': 'Approve Results',
  'results.publish': 'Publish Results',
  'results.transcript': 'Generate Transcripts',
  
  // Attendance
  'attendance.view': 'View Attendance',
  'attendance.mark': 'Mark Attendance',
  'attendance.edit': 'Edit Attendance',
  
  // Payment & Finance
  'payments.view': 'View Payments',
  'payments.create': 'Create Payments',
  'payments.verify': 'Verify Payments',
  'payments.refund': 'Refund Payments',
  'payments.report': 'Payment Reports',
  
  // Admission
  'admission.view': 'View Admissions',
  'admission.create': 'Create Applications',
  'admission.edit': 'Edit Applications',
  'admission.approve': 'Approve Admissions',
  'admission.reject': 'Reject Admissions',
  
  // Library & E-Resources
  'library.view': 'View Library',
  'library.manage': 'Manage Library',
  'library.borrow': 'Borrow Books',
  'library.returns': 'Process Returns',
  
  // Virtual Laboratories
  'labs.view': 'View Virtual Labs',
  'labs.access': 'Access Virtual Labs',
  'labs.manage': 'Manage Virtual Labs',
  
  // Projects & Research
  'projects.view': 'View Projects',
  'projects.create': 'Create Projects',
  'projects.supervise': 'Supervise Projects',
  'projects.approve': 'Approve Projects',
  
  // Reports & Analytics
  'reports.view': 'View Reports',
  'reports.create': 'Create Reports',
  'reports.export': 'Export Reports',
  'reports.analytics': 'View Analytics',
  
  // Quality Assurance
  'qa.view': 'View Quality Assurance',
  'qa.manage': 'Manage Quality Assurance',
  'qa.accreditation': 'Accreditation Management',
  
  // ODFeL Compliance
  'odfel.view': 'View ODFeL Data',
  'odfel.manage': 'Manage ODFeL',
  'odfel.compliance': 'ODFeL Compliance',
  
  // Settings & Configuration
  'settings.view': 'View Settings',
  'settings.edit': 'Edit Settings',
  'settings.system': 'System Settings',
  
  // Security & Audit
  'security.view': 'View Security',
  'security.manage': 'Manage Security',
  'audit.view': 'View Audit Logs',
  'audit.export': 'Export Audit Logs',
  
  // API Management
  'api.view': 'View API',
  'api.manage': 'Manage API',
  'api.keys': 'Manage API Keys',
  
  // LMS Configuration
  'lms.view': 'View LMS Settings',
  'lms.configure': 'Configure LMS',
  
  // CBT Configuration
  'cbt.view': 'View CBT Settings',
  'cbt.configure': 'Configure CBT',
  
  // Document Management
  'documents.view': 'View Documents',
  'documents.create': 'Create Documents',
  'documents.download': 'Download Documents',
  'documents.verify': 'Verify Documents',
  
  // Certificates
  'certificates.view': 'View Certificates',
  'certificates.generate': 'Generate Certificates',
  'certificates.verify': 'Verify Certificates',
  
  // Notifications
  'notifications.view': 'View Notifications',
  'notifications.send': 'Send Notifications',
  'notifications.manage': 'Manage Notifications',
  
  // Department & Faculty
  'department.view': 'View Departments',
  'department.manage': 'Manage Departments',
  'faculty.view': 'View Faculties',
  'faculty.manage': 'Manage Faculties',
  
  // Programme Management
  'programme.view': 'View Programmes',
  'programme.manage': 'Manage Programmes',
  'programme.accreditation': 'Programme Accreditation',
  
  // Curriculum
  'curriculum.view': 'View Curriculum',
  'curriculum.edit': 'Edit Curriculum',
  'curriculum.approve': 'Approve Curriculum',
} as const;

export type Permission = keyof typeof PERMISSIONS;

// Role-Permission Matrix
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // =====================================================
  // SUPER ADMIN - Full System Access
  // =====================================================
  super_admin: Object.keys(PERMISSIONS) as Permission[], // All permissions
  
  // =====================================================
  // MANAGEMENT ROLES - Institutional Administration
  // =====================================================
  rector: [
    'dashboard.view', 'dashboard.analytics',
    'students.view', 'students.enroll',
    'academic.view', 'academic.approve',
    'courses.view',
    'assignments.view',
    'exams.view', 'exams.monitor',
    'results.view', 'results.transcript',
    'attendance.view',
    'payments.view', 'payments.report',
    'admission.view', 'admission.approve',
    'library.view',
    'labs.view',
    'projects.view',
    'reports.view', 'reports.create', 'reports.export', 'reports.analytics',
    'qa.view', 'qa.manage', 'qa.accreditation',
    'odfel.view', 'odfel.manage', 'odfel.compliance',
    'settings.view',
    'audit.view',
    'documents.view', 'documents.download',
    'certificates.view', 'certificates.verify',
    'notifications.view', 'notifications.send',
    'department.view', 'faculty.view',
    'programme.view',
    'curriculum.view',
  ],
  
  deputy_rector_academic: [
    'dashboard.view', 'dashboard.analytics',
    'students.view',
    'academic.view', 'academic.edit', 'academic.approve',
    'courses.view', 'courses.edit',
    'assignments.view',
    'exams.view', 'exams.monitor', 'exams.grade',
    'results.view', 'results.edit', 'results.approve', 'results.publish',
    'attendance.view', 'attendance.mark', 'attendance.edit',
    'admission.view',
    'reports.view', 'reports.create', 'reports.analytics',
    'qa.view', 'qa.manage',
    'odfel.view', 'odfel.manage',
    'settings.view',
    'documents.view',
    'notifications.view', 'notifications.send',
    'department.view', 'faculty.view',
    'programme.view', 'programme.manage',
    'curriculum.view', 'curriculum.edit', 'curriculum.approve',
  ],
  
  deputy_rector_admin: [
    'dashboard.view', 'dashboard.analytics',
    'users.view', 'users.create', 'users.edit',
    'students.view',
    'payments.view', 'payments.verify', 'payments.report',
    'admission.view', 'admission.approve',
    'reports.view', 'reports.create', 'reports.export',
    'settings.view', 'settings.edit',
    'audit.view',
    'documents.view',
    'notifications.view', 'notifications.send', 'notifications.manage',
  ],
  
  registrar: [
    'dashboard.view', 'dashboard.analytics',
    'students.view', 'students.create', 'students.edit',
    'students.enroll', 'students.graduation',
    'academic.view', 'academic.edit', 'academic.approve',
    'courses.view',
    'assignments.view',
    'exams.view',
    'results.view', 'results.approve', 'results.publish', 'results.transcript',
    'attendance.view',
    'admission.view', 'admission.create', 'admission.edit', 'admission.approve', 'admission.reject',
    'documents.view', 'documents.create', 'documents.download', 'documents.verify',
    'certificates.view', 'certificates.generate', 'certificates.verify',
    'reports.view', 'reports.create', 'reports.export',
    'qa.view', 'qa.manage',
    'notifications.view', 'notifications.send',
    'department.view', 'faculty.view',
    'programme.view',
  ],
  
  bursar: [
    'dashboard.view', 'dashboard.analytics',
    'students.view',
    'payments.view', 'payments.create', 'payments.verify', 
    'payments.refund', 'payments.report',
    'reports.view', 'reports.create', 'reports.export',
    'settings.view',
    'audit.view',
    'documents.view', 'documents.download',
    'notifications.view',
  ],
  
  librarian: [
    'dashboard.view',
    'students.view',
    'library.view', 'library.manage',
    'library.borrow', 'library.returns',
    'reports.view',
    'notifications.view',
  ],
  
  director: [
    'dashboard.view', 'dashboard.analytics',
    'students.view',
    'academic.view',
    'courses.view',
    'assignments.view',
    'exams.view', 'exams.monitor',
    'results.view',
    'attendance.view',
    'payments.view', 'payments.report',
    'admission.view',
    'library.view',
    'labs.view',
    'projects.view',
    'reports.view', 'reports.create', 'reports.export', 'reports.analytics',
    'qa.view', 'qa.manage',
    'odfel.view', 'odfel.manage',
    'settings.view',
    'documents.view',
    'certificates.view',
    'notifications.view',
    'department.view',
    'programme.view',
  ],
  
  // =====================================================
  // ACADEMIC STAFF ROLES - Teaching & Research
  // =====================================================
  dean: [
    'dashboard.view', 'dashboard.analytics',
    'students.view',
    'academic.view', 'academic.edit',
    'courses.view', 'courses.create', 'courses.edit',
    'content.view', 'content.create', 'content.edit', 'content.publish',
    'assignments.view', 'assignments.create', 'assignments.edit', 'assignments.grade',
    'exams.view', 'exams.create', 'exams.edit', 'exams.publish',
    'results.view', 'results.edit', 'results.approve',
    'attendance.view', 'attendance.mark',
    'reports.view', 'reports.create',
    'department.view', 'department.manage',
    'faculty.view',
    'programme.view', 'programme.manage',
    'curriculum.view', 'curriculum.edit',
    'documents.view',
    'notifications.view', 'notifications.send',
  ],
  
  hod: [
    'dashboard.view',
    'students.view',
    'academic.view', 'academic.edit',
    'courses.view', 'courses.create', 'courses.edit', 'courses.assign',
    'content.view', 'content.create', 'content.edit', 'content.publish',
    'assignments.view', 'assignments.create', 'assignments.edit', 'assignments.grade',
    'exams.view', 'exams.create', 'exams.edit', 'exams.publish',
    'results.view', 'results.edit', 'results.approve',
    'attendance.view', 'attendance.mark', 'attendance.edit',
    'labs.view', 'labs.manage',
    'projects.view', 'projects.supervise',
    'reports.view', 'reports.create',
    'qa.view',
    'department.view', 'department.manage',
    'curriculum.view', 'curriculum.edit',
    'documents.view',
    'notifications.view', 'notifications.send',
  ],
  
  program_coordinator: [
    'dashboard.view',
    'students.view',
    'academic.view',
    'courses.view', 'courses.edit',
    'content.view', 'content.create', 'content.edit', 'content.publish',
    'assignments.view', 'assignments.create', 'assignments.edit', 'assignments.grade',
    'exams.view', 'exams.create', 'exams.edit', 'exams.publish',
    'results.view', 'results.edit',
    'attendance.view', 'attendance.mark',
    'labs.view',
    'projects.view', 'projects.supervise',
    'programme.view', 'programme.manage',
    'curriculum.view',
    'documents.view',
    'notifications.view', 'notifications.send',
  ],
  
  lecturer: [
    'dashboard.view',
    'students.view',
    'courses.view',
    'content.view', 'content.create', 'content.edit', 'content.publish',
    'assignments.view', 'assignments.create', 'assignments.edit', 'assignments.grade',
    'exams.view', 'exams.create', 'exams.edit',
    'results.view', 'results.edit',
    'attendance.view', 'attendance.mark',
    'labs.view', 'labs.access',
    'projects.view', 'projects.supervise',
    'curriculum.view',
    'documents.view',
    'notifications.view',
  ],
  
  // =====================================================
  // STUDENT & APPLICANT ROLES
  // =====================================================
  student: [
    'dashboard.view',
    'courses.view',
    'content.view',
    'assignments.view', 'assignments.submit',
    'exams.view', 'exams.take',
    'results.view',
    'attendance.view',
    'payments.view',
    'library.view', 'library.borrow',
    'labs.view', 'labs.access',
    'projects.view', 'projects.create',
    'documents.view', 'documents.download',
    'certificates.view',
    'notifications.view',
  ],
  
  applicant: [
    'dashboard.view',
    'admission.view', 'admission.create', 'admission.edit',
    'documents.view', 'documents.create', 'documents.download',
    'payments.view', 'payments.create',
    'notifications.view',
  ],
};

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  return permissions.includes(permission);
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Get all permissions grouped by category
 */
export function getPermissionsByCategory(): Record<string, Permission[]> {
  const categories: Record<string, Permission[]> = {};
  
  for (const permission of Object.keys(PERMISSIONS) as Permission[]) {
    const [category] = permission.split('.');
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(permission);
  }
  
  return categories;
}

/**
 * Check if role belongs to a specific category
 */
export function isRoleInCategory(role: UserRole, category: string): boolean {
  const roleCategory = ROLE_CATEGORIES[role];
  return roleCategory === category;
}

/**
 * Get portal ID for a role
 */
export function getPortalForRole(role: UserRole): string {
  switch (role) {
    case 'super_admin':
      return 'admin';
    case 'applicant':
      return 'applicant';
    case 'student':
      return 'student';
    case 'lecturer':
    case 'program_coordinator':
    case 'hod':
    case 'dean':
      return 'academic';
    default:
      return 'management';
  }
}