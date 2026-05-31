# INNOVASCI AI LABS POLYTECHNIC
## Architecture Audit Report v3.0
### NBTE-Compliant Online Polytechnic ERP System

---

## Executive Summary

This document provides a comprehensive architectural audit of the InnovaSci AI Labs Online Polytechnic codebase. The audit identifies redundancies, consolidates portals, refactors the database schema, and establishes a modern RBAC architecture aligned with NBTE accreditation requirements.

**Date of Audit:** May 31, 2026  
**Status:** COMPLETED  
**Version:** 3.0

---

## 1. ARCHITECTURAL OVERVIEW

### 1.1 Previous State (Before Audit)
- **5 Duplicate Dashboards:** student-dashboard, lecturer-dashboard, hod-dashboard, generic dashboard, admin dashboard
- **14 User Roles:** fragmented across multiple dashboards
- **Legacy Database:** Supabase schema v2 with missing modules
- **Inconsistent Navigation:** Role-based but not portal-based

### 1.2 New Architecture (After Audit)
- **5 Core Portals:** Consolidated into unified portal structure
- **14 Unified Roles:** RBAC system with 90+ permissions
- **Comprehensive Database:** Full NBTE-compliant schema with 40+ tables
- **Permission-Based Navigation:** Role determines visibility, not separate portals

---

## 2. PORTAL STRUCTURE

### 2.1 The 5 Core Portals

| Portal | Target Users | Primary Features |
|--------|-------------|------------------|
| **Applicant Portal** | Prospective students, Admission applicants, Scholarship applicants | Account creation, Online application, Admission tracking, Document upload, Payment of application fees, Admission status, Acceptance confirmation, Applicant notifications |
| **Student Portal** | Enrolled students | Dashboard, Course registration, LMS (Video lectures, Slides), Virtual laboratory, E-library access, Assignments, CBT examinations, Results, Academic transcript requests, Project submission, Practical scheduling, Student profile, Payment history, Certificates, Notifications |
| **Academic Staff Portal** | Lecturers, Instructors, Programme Coordinators, HODs, Deans | Course management, Content upload, Assignment creation, Grading, Attendance, Examination management, Student monitoring, Academic reports, Department reports, Programme reports, Curriculum management |
| **Management Portal** | Rector, Deputy Rector (Academics), Deputy Rector (Administration), Registrar, Bursar, Polytechnic Librarian, Director of ICT, Director of ODFeL, Director of Quality Assurance, Director of CBT Services, Director of Virtual Laboratories, Director of Student Affairs | Institutional analytics, Accreditation monitoring, Student statistics, Staff statistics, Revenue reports, Academic reports, Quality assurance reports, Examination reports, ODFeL monitoring, Compliance reports, Digital library reports |
| **Super Admin Portal** | System owners | Institution settings, User management, Role management, Permission management, Database monitoring, Security management, Audit logs, API management, LMS configuration, CBT configuration, Accreditation configuration, Full system control |

### 2.2 Key Architectural Decision

**NO SEPARATE PORTALS FOR INDIVIDUAL MANAGEMENT POSITIONS**

All management roles (Rector, Deputy Rectors, Registrar, Bursar, Directors) share the same Management Portal. Role-based access control (RBAC) determines which features and data each role can see and manage.

---

## 3. ROLE-BASED ACCESS CONTROL (RBAC)

### 3.1 Supported Roles

| Role | Category | Portal Access |
|------|----------|---------------|
| super_admin | System | Admin Portal |
| rector | Management | Management Portal |
| deputy_rector_academic | Management | Management Portal |
| deputy_rector_admin | Management | Management Portal |
| registrar | Management | Management Portal |
| bursar | Management | Management Portal |
| librarian | Management | Management Portal |
| director | Management | Management Portal |
| dean | Academic | Academic Portal |
| hod | Academic | Academic Portal |
| program_coordinator | Academic | Academic Portal |
| lecturer | Academic | Academic Portal |
| student | Student | Student Portal |
| applicant | Student | Applicant Portal |

### 3.2 Permission Categories

The RBAC system includes 90+ permissions organized into categories:

1. **Dashboard & Navigation:** 3 permissions
2. **User Management:** 5 permissions
3. **Role Management:** 4 permissions
4. **Academic:** 3 permissions
5. **Student:** 6 permissions
6. **Course:** 5 permissions
7. **Content & LMS:** 5 permissions
8. **Assignments:** 5 permissions
9. **Examination & CBT:** 7 permissions
10. **Results & Grading:** 6 permissions
11. **Attendance:** 3 permissions
12. **Payment & Finance:** 6 permissions
13. **Admission:** 6 permissions
14. **Library & E-Resources:** 4 permissions
15. **Virtual Laboratories:** 3 permissions
16. **Projects & Research:** 4 permissions
17. **Reports & Analytics:** 4 permissions
18. **Quality Assurance:** 3 permissions
19. **ODFeL Compliance:** 3 permissions
20. **Settings & Configuration:** 8 permissions
21. **Security & Audit:** 4 permissions
22. **API Management:** 3 permissions
23. **Documents & Certificates:** 6 permissions
24. **Notifications:** 3 permissions
25. **Department & Faculty:** 4 permissions
26. **Programme Management:** 3 permissions
27. **Curriculum:** 3 permissions

---

## 4. DATABASE SCHEMA (NBTE-COMPLIANT)

### 4.1 Tables Summary

| Category | Tables | Purpose |
|----------|--------|---------|
| Core Institution | 4 | institution, users, sessions, audit_logs |
| Academic Structure | 5 | faculties, departments, programs, levels, semesters |
| Curriculum & Courses | 2 | courses, course_content |
| Student Management | 5 | students, applicants, applicant_documents, registrations |
| Results & Grading | 3 | results, gpa_records, grade_scales |
| Payments & Finance | 3 | fee_structure, payments, application_fees |
| CBT & Examinations | 3 | cbt_exams, exam_questions, exam_attempts |
| Attendance | 2 | attendance, attendance_summary |
| Assignments | 2 | assignments, assignment_submissions |
| Projects & Research | 2 | projects, project_chapters |
| Library & E-Resources | 2 | library_resources, library_transactions |
| Announcements & Notifications | 2 | announcements, notifications |
| Accreditation & QA | 4 | accreditation_records, qa_metrics, odfel_records, staff_qualifications |
| Virtual Laboratories | 2 | virtual_labs, course_labs |
| Certificates & Transcripts | 2 | certificates, transcript_requests |
| Practical Scheduling | 2 | practical_sessions, practical_attendance |
| **TOTAL** | **45** | **Full NBTE-compliant schema** |

### 4.2 Key Enumerations (Enums)

```sql
-- User Roles
user_role: super_admin, rector, deputy_rector_academic, deputy_rector_admin, 
           registrar, bursar, librarian, director, dean, hod, program_coordinator, 
           lecturer, student, applicant

-- Academic Status
academic_status: active, graduated, suspended, withdrawn, deferred, completed

-- Application Status
application_status: draft, submitted, under_review, approved, rejected, 
                    conditional_offer, waitlisted

-- Payment Status
payment_status: pending, verified, failed, refunded, cancelled

-- ODFeL Compliance Level
odfel_level: level_1, level_2, level_3, full_compliance

-- Accreditation Status
accreditation_status: pending, in_progress, accredited, expired, revoked

-- Content Type (LMS)
content_type: video, slides, document, quiz, assignment, link

-- Project Stage
project_stage: topic_approval, proposal, chapter_1_3, correction, 
               final_submission, grading, completed
```

### 4.3 Accreditation Readiness Features

The database schema includes comprehensive support for NBTE accreditation:

1. **Programme Accreditation Records:** Track accreditation status, inspection dates, expiry
2. **Staff Qualifications:** Track lecturer qualifications for accreditation compliance
3. **ODFeL Compliance Records:** Monitor ODFeL compliance levels
4. **Quality Assurance Metrics:** Track program quality metrics
5. **Student Statistics:** Comprehensive enrollment and performance data
6. **Examination Reports:** CBT and traditional exam tracking
7. **Curriculum Versioning:** Track curriculum changes and approvals

---

## 5. REMOVED/MERGED COMPONENTS

### 5.1 Removed Dashboards
- `/dashboard/student-dashboard` → Consolidated into `/portal/student`
- `/dashboard/lecturer-dashboard` → Consolidated into `/portal/academic`
- `/dashboard/hod-dashboard` → Consolidated into `/portal/academic`

### 5.2 Removed Files
- Duplicate dashboard pages (3 files)
- Legacy sidebar component (replaced with portal-aware sidebar)
- Old RBAC system in store (moved to dedicated `/lib/rbac.ts`)

### 5.3 Merged Features
- All role-specific dashboards → Single portal with RBAC
- Multiple navigation configurations → Unified portal-based navigation
- Scattered permission definitions → Centralized `/lib/rbac.ts`

---

## 6. NEW FILE STRUCTURE

```
src/
├── app/
│   ├── portal/
│   │   ├── layout.tsx          # Portal layout wrapper
│   │   ├── page.tsx             # Portal index (redirects)
│   │   ├── applicant/
│   │   │   └── page.tsx         # Applicant Dashboard
│   │   ├── student/
│   │   │   └── page.tsx         # Student Dashboard
│   │   ├── academic/
│   │   │   └── page.tsx         # Academic Staff Dashboard
│   │   ├── management/
│   │   │   └── page.tsx         # Management Dashboard
│   │   └── admin/
│   │       └── page.tsx         # Super Admin Dashboard
│   ├── dashboard/               # Legacy (redirects to portals)
│   ├── admission/
│   ├── auth/
│   └── page.tsx                 # Public landing page
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx         # Portal-aware sidebar
│   │   └── header.tsx           # Header component
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── rbac.ts                  # RBAC system (NEW)
│   ├── portal-config.ts         # Portal configuration (NEW)
│   ├── curriculum-data.ts       # Curriculum data
│   ├── utils.ts                 # Utilities
│   └── nigeria-locations.ts      # Location data
├── store/
│   └── index.ts                 # Zustand store (updated)
└── types/
    └── index.ts                 # TypeScript types (updated)
```

---

## 7. UI/UX IMPROVEMENTS

### 7.1 Responsive Design
- **Mobile:** Optimized for smartphones and tablets
- **Desktop:** Full-featured layout for desktop computers
- **Laptop:** Balanced layout for laptop screens
- **Collapsible Sidebar:** 280px expanded, 80px collapsed

### 7.2 Portal-Specific Color Coding
| Portal | Color Theme |
|--------|-------------|
| Applicant | Blue gradient |
| Student | Emerald gradient |
| Academic | Purple gradient |
| Management | Orange gradient |
| Admin | Red gradient |

### 7.3 Navigation Structure
Each portal has categorized navigation sections:
- **Applicant:** Main, Payments, Support
- **Student:** Learning, Academic, Project, Account
- **Academic:** Teaching, Students, Management, Account
- **Management:** Overview, Academic, Quality, Operations, Account
- **Admin:** System, Configuration, Monitoring, Account

---

## 8. SECURITY & AUDIT

### 8.1 Audit Logging
All significant actions are logged:
- User authentication events
- Data modifications (create, update, delete)
- Permission changes
- System configuration changes
- Failed access attempts

### 8.2 Session Management
- JWT token-based authentication
- Session tracking with device info
- Automatic session expiration

### 8.3 Data Protection
- Password hashing (bcrypt)
- Role-based data access control
- Sensitive field encryption support

---

## 9. MIGRATION SUMMARY

### 9.1 What Was Removed
| Item | Reason |
|------|--------|
| 3 duplicate dashboards | Consolidated into 5-portal architecture |
| Legacy RBAC system | Replaced with comprehensive `/lib/rbac.ts` |
| Old sidebar component | Replaced with portal-aware sidebar |
| Scattered role configs | Centralized in portal-config.ts |

### 9.2 What Was Added
| Item | Purpose |
|------|---------|
| `/lib/rbac.ts` | Centralized RBAC with 90+ permissions |
| `/lib/portal-config.ts` | Portal configuration and types |
| `/portal/*` pages | Unified portal dashboard pages |
| Updated sidebar | Portal-aware with role-based visibility |
| Comprehensive DB schema | 45 tables covering all NBTE requirements |

### 9.3 What Was Modified
| Item | Changes |
|------|---------|
| `src/types/index.ts` | Added 14 roles, role categories, display names |
| `src/store/index.ts` | Added PortalId type, PORTALS config, checkPermission |
| `src/components/layout/sidebar.tsx` | Portal-aware navigation |
| `SUPABASE_TABLES.sql` | Full schema rewrite with 45 tables |

---

## 10. ACCREDITATION CHECKLIST

### 10.1 NBTE Requirements Coverage

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Student Records Management | ✅ | students table with full enrollment data |
| Academic Reporting | ✅ | results, gpa_records, grade_scales tables |
| Staff Qualification Tracking | ✅ | staff_qualifications table |
| Programme Accreditation | ✅ | accreditation_records table |
| Quality Assurance Metrics | ✅ | qa_metrics table |
| ODFeL Compliance Monitoring | ✅ | odfel_records table |
| CBT Examination System | ✅ | cbt_exams, exam_questions, exam_attempts |
| LMS with Video/Slides | ✅ | course_content with content_type enum |
| Virtual Laboratories | ✅ | virtual_labs, course_labs tables |
| E-Library | ✅ | library_resources, library_transactions |
| Financial Management | ✅ | fee_structure, payments tables |
| Attendance Tracking | ✅ | attendance, attendance_summary tables |
| Project Management | ✅ | projects, project_chapters tables |
| Certificate Generation | ✅ | certificates table with verification |
| Transcript Management | ✅ | transcript_requests table |

### 10.2 ODFeL Compliance Levels

The system supports 4 levels of ODFeL compliance:
- Level 1: Basic compliance
- Level 2: Intermediate compliance
- Level 3: Advanced compliance
- Full Compliance: Complete NBTE ODFeL compliance

---

## 11. DEPLOYMENT CHECKLIST

- [ ] Configure Supabase project with new schema
- [ ] Update environment variables for Supabase
- [ ] Test authentication flow
- [ ] Test RBAC permissions for all roles
- [ ] Verify portal redirects work correctly
- [ ] Check responsive design on all devices
- [ ] Validate database indexes for performance
- [ ] Configure audit log retention policy
- [ ] Set up backup and recovery procedures

---

## 12. CONCLUSION

The architectural audit has successfully transformed the InnovaSci AI Labs Online Polytechnic system into a modern, scalable, NBTE-compliant ERP system. The new architecture:

1. **Eliminates Redundancy:** Consolidated 3+ duplicate dashboards into unified 5-portal system
2. **Improves Maintainability:** Centralized RBAC, types, and configuration
3. **Enhances Security:** Comprehensive audit logging and role-based access
4. **Ensures Compliance:** Full support for NBTE accreditation and ODFeL requirements
5. **Future-Proofs:** Modular design allows easy expansion of features

---

**Document Version:** 3.0  
**Last Updated:** May 31, 2026  
**Prepared By:** Senior Polytechnic ERP Architect (AI Agent)