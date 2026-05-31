# InnovaSci AI Labs Polytechnic
## RBAC (Role-Based Access Control) Documentation
### Version: 1.0 | Last Updated: May 31, 2026

---

## 📋 APPROVED RBAC STRUCTURE

All system roles MUST follow this standardized structure. No exceptions.

### System Administration
| Role | Purpose | Portal |
|------|---------|--------|
| `super_admin` | System owners, full control | Admin Portal |

### Management Roles
| Role | Purpose | Portal |
|------|---------|--------|
| `rector` | Head of institution | Management Portal |
| `deputy_rector_academic` | Academic affairs deputy | Management Portal |
| `deputy_rector_administration` | Administration deputy | Management Portal |
| `registrar` | Academic records, admissions | Management Portal |
| `bursar` | Finance management | Management Portal |
| `librarian` | Library services | Management Portal |
| `director` | Departmental directors | Management Portal |

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
| `admission_officer` | ❌ DEPRECATED | Use `registrar` |
| `finance_officer` | ❌ DEPRECATED | Use `bursar` |
| `exam_officer` | ❌ DEPRECATED | Use `director` |
| `student_affairs` | ❌ DEPRECATED | Use `director` |
| `staff` | ❌ DEPRECATED | Use `lecturer` or specific role |

---

## 📁 FILE REFERENCE

### Role Definitions
| File | Description |
|------|-------------|
| `src/types/index.ts` | TypeScript UserRole type definition |
| `src/lib/rbac.ts` | RBAC permission system |
| `src/lib/portal-config.ts` | Portal configuration |
| `SUPABASE_TABLES.sql` | Database enum definition |

### Key Files to Update for New Roles
| File | Update Required |
|------|----------------|
| `src/types/index.ts` | Add to UserRole union type |
| `src/lib/rbac.ts` | Add ROLE_PERMISSIONS entry |
| `src/lib/portal-config.ts` | Add to PORTAL_CONFIG.roles array |
| `src/store/index.ts` | Add to PORTALS.roles array |
| `SUPABASE_TABLES.sql` | Add to user_role ENUM |

---

## 🔒 PERMISSION SUMMARY

### Super Admin (`super_admin`)
- **Access:** All permissions (`'*'`)
- **Description:** Full system access with all privileges

### Management Roles
| Role | Key Permissions |
|------|----------------|
| `rector` | Dashboard analytics, academic approval, reports, QA |
| `deputy_rector_academic` | Academic editing, course management, results approval |
| `deputy_rector_administration` | User management, payments, settings |
| `registrar` | Student records, admissions, documents, transcripts |
| `bursar` | Payments, finance reports, audit logs |
| `librarian` | Library management, resource access |
| `director` | Department reports, QA, analytics |

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

## 🧪 DEMO ACCOUNTS (TESTING)

For development/testing, use these demo accounts:

| Email | Role | Name |
|-------|------|------|
| `student@innovasci.edu` | `student` | Aisha Mohammed |
| `lecturer@innovasci.edu` | `lecturer` | Dr. Emmanuel Obi |
| `rector@innovasci.edu` | `rector` | Prof. Adeniyi Olamilekan |
| `registrar@innovasci.edu` | `registrar` | Mrs. Folake Adebayo |
| `super@innovasci.edu` | `super_admin` | System Owner |
| `webuildandtarinbuilders@gmail.com` | `super_admin` | Super Admin |

**Note:** Any password works for demo accounts.

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

3. **Update `src/lib/portal-config.ts`:**
   ```typescript
   admin: {
     // ... existing config
     roles: ['super_admin', 'new_role'],  // Add to appropriate portal
   }
   ```

4. **Update `src/store/index.ts`:**
   ```typescript
   export const PORTALS: Record<PortalId, PortalState> = {
     // ... existing portals
     admin: { id: 'admin', name: 'Admin Portal', roles: ['super_admin', 'new_role'] },
   }
   ```

5. **Update `SUPABASE_TABLES.sql`:**
   ```sql
   CREATE TYPE user_role AS ENUM (
     // ... existing values
     'new_role'
   );
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

- [ ] Role is in the approved list (14 roles only)
- [ ] Role exists in `UserRole` TypeScript type
- [ ] Role exists in database ENUM
- [ ] Role has RBAC permissions defined
- [ ] Role is assigned to correct portal
- [ ] No legacy role names used (admin, system_admin, etc.)

---

## 📞 SUPPORT

For questions about RBAC implementation, refer to:
- ARCHITECTURE_AUDIT_REPORT.md
- src/lib/rbac.ts (full permission matrix)
- src/lib/portal-config.ts (portal structure)

---

*Document maintained by Senior Polytechnic ERP Architect*