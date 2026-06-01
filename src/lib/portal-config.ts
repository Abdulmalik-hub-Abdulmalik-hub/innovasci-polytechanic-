// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - 5-PORTAL ARCHITECTURE
// =====================================================
// 
// This file defines the core portal structure for the NBTE-compliant
// Online Polytechnic ERP system.
// 
// PORTALS:
// 1. Applicant Portal - Prospective students, admission applicants
// 2. Student Portal - Enrolled students
// 3. Academic Staff Portal - Lecturers, HODs, Deans (permission-based)
// 4. Management Portal - Rector, Deputy Rectors, Registrars, Directors
// 5. Super Admin Portal - System administrators
//
// ARCHITECTURE NOTES:
// - All portals share a common layout system
// - Navigation is role-based through RBAC
// - Single dashboard with permission-based visibility
// =====================================================

export const PORTAL_CONFIG = {
  applicant: {
    id: 'applicant',
    name: 'Applicant Portal',
    description: 'Online application and admission tracking',
    roles: ['applicant'],
    color: 'blue',
    features: [
      'Account Creation',
      'Online Application',
      'Admission Tracking',
      'Document Upload',
      'Payment of Application Fees',
      'Admission Status',
      'Acceptance Confirmation',
      'Applicant Notifications'
    ]
  },
  student: {
    id: 'student',
    name: 'Student Portal',
    description: 'Learning management and academic services',
    roles: ['student'],
    color: 'green',
    features: [
      'Dashboard',
      'Course Registration',
      'LMS (Video Lectures, Slides)',
      'Virtual Laboratory',
      'E-Library Access',
      'Assignments',
      'CBT Examinations',
      'Results & Transcripts',
      'Academic Transcript Requests',
      'Project Submission',
      'Practical Scheduling',
      'Student Profile',
      'Payment History',
      'Certificates',
      'Notifications'
    ]
  },
  academic: {
    id: 'academic',
    name: 'Academic Staff Portal',
    description: 'Course management and academic operations',
    roles: ['lecturer', 'program_coordinator', 'hod', 'dean'],
    color: 'purple',
    features: [
      'Course Management',
      'Content Upload',
      'Assignment Creation',
      'Grading',
      'Attendance',
      'Examination Management',
      'Student Monitoring',
      'Academic Reports',
      'Department Reports',
      'Programme Reports',
      'Curriculum Management'
    ]
  },
  management: {
    id: 'management',
    name: 'Management Portal',
    description: 'Institutional analytics and decision support',
    roles: ['rector', 'deputy_rector_academic', 'deputy_rector_admin', 'registrar', 'bursar', 'librarian', 'director', 'admission_officer', 'director_ict', 'director_odfel', 'director_quality_assurance', 'director_cbt_services', 'director_virtual_laboratories', 'director_student_affairs'],
    color: 'orange',
    features: [
      'Institutional Analytics',
      'Admission Management',
      'Accreditation Monitoring',
      'Student Statistics',
      'Staff Statistics',
      'Revenue Reports',
      'Academic Reports',
      'Quality Assurance Reports',
      'Examination Reports',
      'ODFeL Monitoring',
      'Compliance Reports',
      'Digital Library Reports'
    ]
  },
  admin: {
    id: 'admin',
    name: 'Super Admin Portal',
    description: 'System administration and configuration',
    roles: ['super_admin'],
    color: 'red',
    features: [
      'Institution Settings',
      'User Management',
      'Role Management',
      'Permission Management',
      'Database Monitoring',
      'Security Management',
      'Audit Logs',
      'API Management',
      'LMS Configuration',
      'CBT Configuration',
      'Accreditation Configuration',
      'Full System Control'
    ]
  }
} as const;

export type PortalId = keyof typeof PORTAL_CONFIG;
export type PortalConfig = typeof PORTAL_CONFIG[PortalId];