# InnovaSci AI Labs Polytechnic
## RBAC (Role-Based Access Control) Documentation
### Version: 2.0 | Last Updated: May 31, 2026

---

## 📋 APPROVED RBAC STRUCTURE

All system roles MUST follow this standardized structure. No exceptions.

### System Administration
| Role | Purpose | Portal |
|------|---------|--------|
| `super_admin` | System owners, full control | Admin Portal |

### Senior Management
| Role | Purpose | Portal |
|------|---------|--------|
| `rector` | Head of institution | Management Portal |
| `deputy_rector_academic` | Academic affairs deputy | Management Portal |
| `deputy_rector_admin` | Administration deputy | Management Portal |

### Administrative Officers
| Role | Purpose | Portal |
|------|---------|--------|
| `registrar` | Academic records, admissions | Management Portal |
| `bursar` | Finance management | Management Portal |
| `librarian` | Library services | Management Portal |

### Specialized Directors (Institutional Units)
| Role | Purpose | Portal |
|------|---------|--------|
| `director` | Generic departmental director | Management Portal |
| `admission_officer` | Admissions processing & verification | Management Portal |
| `director_ict` | ICT infrastructure & systems | Management Portal |
| `director_odfel` | Open & Flexible e-Learning compliance | Management Portal |
| `director_quality_assurance` | NBTE accreditation & quality | Management Portal |
| `director_cbt_services` | Computer-Based Testing administration | Management Portal |
| `director_virtual_laboratories` | Virtual labs & simulations | Management Portal |
| `director_student_affairs` | Student welfare & support | Management Portal |

### Academic Staff Roles
| Role | Purpose | Portal |
|------|---------|--------|
| `dean` | Faculty/School head | Academic Portal |
| `hod` | Department head | Academic Portal |
| `programme_coordinator` | Programme management | Academic Portal |
| `lecturer` | Teaching staff | Academic Portal |

### Student Roles
| Role | Purpose | Portal |
|------|---------|--------|
| `student` | Enrolled students | Student Portal |
| `applicant` | Prospective students | Applicant Portal |

---

## 🎯 DIRECTOR ROLE RESPONSIBILITIES

### Admission Officer
- Application review and processing
- SSCE/JAMB/HND qualification verification
- Applicant communication
- Admission recommendations and approvals
- Admission statistics and reporting

### Director ICT
- ICT infrastructure management
- LMS analytics and configuration
- System monitoring and security
- Technology reports
- Platform performance monitoring

### Director ODFeL
- Distance learning monitoring
- ODFeL compliance reporting
- Online learning analytics
- Student engagement reports
- ODFeL accreditation readiness

### Director Quality Assurance
- Accreditation repository management
- Programme accreditation records
- NBTE compliance dashboard
- Internal audit reports
- Evidence management

### Director CBT Services
- CBT administration
- Examination analytics
- Question bank management
- Exam scheduling
- Examination monitoring

### Director Virtual Laboratories
- Virtual laboratory management
- Practical activity reports
- Simulation analytics
- Laboratory utilization reports

### Director Student Affairs
- Student welfare monitoring
- Student disciplinary records
- Student support services
- Student engagement reports

---

## ❌ LEGACY ROLES (DEPRECATED)

The following roles are **NOT VALID** and must never be used:

| Legacy Role | Status | Replacement |
|------------|--------|-------------|
| `admin` | ❌ DEPRECATED | Use `super_admin` or management roles |
| `system_admin` | ❌ DEPRECATED | Use `super_admin` |
| `superuser` | ❌ DEPRECATED | Use `super_admin` |
| `owner` | ❌ DEPRECATED | Use `super_admin` |
| `root` | ❌ DEPRECATED | Use `super_admin` |
| `manager` | ❌ DEPRECATED | Use appropriate management role |
| `exam_officer` | ❌ DEPRECATED | Use `director_cbt_services` |
| `staff` | ❌ DEPRECATED | Use `lecturer` or specific role |

---

## 📁 FILE REFERENCE

### Role Definitions
| File | Description |
|------|-------------|
| `src/types/index.ts` | TypeScript UserRole type definition |
| `src/lib/rbac.ts` | RBAC permission system |
| `src/store/index.ts` | Portal configuration with role assignments |
| `SUPABASE_TABLES.sql` | Database enum definition |

### Files Updated for New Roles
| File | Update Required |
|------|----------------|
| `src/types/index.ts` | Added 7 new director roles to UserRole union |
| `src/lib/rbac.ts` | Added ROLE_PERMISSIONS for all new roles |
| `src/store/index.ts` | Added roles to Management Portal |
| `SUPABASE_TABLES.sql` | Added roles to user_role ENUM |
| `src/app/auth/login/page.tsx` | Added role-to-route mappings |

---

## 🔒 PERMISSION SUMMARY

### Super Admin (`super_admin`)
- **Access:** All permissions (`'*'`)
- **Description:** Full system access with all privileges

### Senior Management
| Role | Key Permissions |
|------|----------------|
| `rector` | Dashboard analytics, academic approval, reports, QA, ODFeL |
| `deputy_rector_academic` | Academic editing, course management, results approval |
| `deputy_rector_admin` | User management, payments, settings |

### Administrative Officers
| Role | Key Permissions |
|------|----------------|
| `registrar` | Student records, admissions, documents, transcripts |
| `bursar` | Payments, finance reports, audit logs |
| `librarian` | Library management, resource access |

### Specialized Directors
| Role | Key Permissions |
|------|----------------|
| `director` | General departmental management, reports |
| `admission_officer` | Admission workflow, document verification, statistics |
| `director_ict` | LMS, CBT, security, API, system settings |
| `director_odfel` | ODFeL compliance, LMS, accreditation |
| `director_quality_assurance` | QA, accreditation, documents, programme management |
| `director_cbt_services` | CBT configuration, exam management, analytics |
| `director_virtual_laboratories` | Virtual labs, practical activities, reports |
| `director_student_affairs` | Student welfare, support, engagement |

### Academic Staff Roles
| Role | Key Permissions |
|------|----------------|
| `dean` | Faculty management, course creation, grading |
| `hod` | Department management, course assignment, results approval |
| `programme_coordinator` | Programme management, curriculum, exams |
| `lecturer` | Course content, assignments, grading, attendance |

### Student Roles
| Role | Key Permissions |
|------|----------------|
| `student` | Dashboard, courses, assignments, exams, results, library |
| `applicant` | Application, documents, payments, status tracking |

---

## 🚀 ADDING A NEW ROLE

To add a new role to the system:

1. **Update `src/types/index.ts`:**
   ```typescript
   export type UserRole = 
     | 'super_admin'
     | 'rector'
     // ... existing roles
     | 'new_role'  // Add here
   ```

2. **Update `src/lib/rbac.ts`:**
   ```typescript
   export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
     // ... existing roles
     new_role: [
       'dashboard.view',
       // Add required permissions
     ],
   }
   ```

3. **Update `src/store/index.ts`:**
   ```typescript
   export const PORTALS: Record<PortalId, PortalState> = {
     // ... existing portals
     management: { 
       id: 'management', 
       name: 'Management Portal', 
       roles: [..., 'new_role'] 
     },
   }
   ```

4. **Update `src/app/auth/login/page.tsx`:**
   ```typescript
   const roleToRoute: Record<string, string> = {
     // ... existing roles
     new_role: '/portal/management',
   }
   ```

5. **Update `SUPABASE_TABLES.sql`:**
   ```sql
   ALTER TYPE user_role ADD VALUE 'new_role';
   ```

6. **Add display name in `src/types/index.ts`:**
   ```typescript
   export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
     // ... existing entries
     new_role: 'New Role Display Name',
   }
   ```

---

## 🔍 VERIFICATION CHECKLIST

Before committing any code that uses roles, verify:

- [x] Role is in the approved list (21 roles total)
- [x] Role exists in `UserRole` TypeScript type
- [x] Role exists in database ENUM
- [x] Role has RBAC permissions defined
- [x] Role is assigned to correct portal
- [x] Role has route mapping in login page
- [ ] No legacy role names used (admin, system_admin, etc.)

---

## 📊 ROLE STATISTICS

| Category | Count |
|----------|-------|
| System Admin | 1 |
| Senior Management | 3 |
| Administrative Officers | 3 |
| Specialized Directors | 8 |
| Academic Staff | 4 |
| Students | 2 |
| **Total** | **21** |

---

## 📞 SUPPORT

For questions about RBAC implementation, refer to:
- ARCHITECTURE_AUDIT_REPORT.md
- src/lib/rbac.ts (full permission matrix)
- src/store/index.ts (portal structure)

---

*Document maintained by Senior Polytechnic ERP Architect*