# ADMISSION OFFICER PERMISSION MATRIX

**InnovaSci Open Polytechnic**
**Online Polytechnic ERP System**

---

## 1. Overview

This document defines the role-based access control (RBAC) permissions for the Admission Officer role within the Management Portal. The Admission Officer has specific permissions limited to admission-related modules and does not have access to system administration, user management, or financial settings.

---

## 2. Role Definition

### Admission Officer Role
- **Role ID**: `admission_officer`
- **Role Display Name**: "Admission Officer"
- **Category**: `management`
- **Portal**: `Management Portal`
- **Access Level**: Department-level (Admission Office)

---

## 3. Permission Matrix

### 3.1 Dashboard & Navigation Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `dashboard.view` | ✅ Yes | View the Admission Officer dashboard |
| `dashboard.analytics` | ✅ Yes | View admission analytics and statistics |

### 3.2 Admission Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `admission.view` | ✅ Yes | View all admission applications |
| `admission.create` | ✅ Yes | Create admission records |
| `admission.edit` | ✅ Yes | Edit application information |
| `admission.approve` | ✅ Yes | Approve admission applications |
| `admission.reject` | ✅ Yes | Reject admission applications |
| `admission.review` | ✅ Yes | Review applications in detail |
| `admission.verify` | ✅ Yes | Verify applicant documents |
| `admission.letter` | ✅ Yes | Generate admission letters |
| `admission.offer` | ✅ Yes | Manage admission offers |
| `admission.revoke` | ✅ Yes | Revoke admission offers |
| `admission.reissue` | ✅ Yes | Reissue admission letters |
| `admission.communicate` | ✅ Yes | Communicate with applicants |

### 3.3 Document Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `documents.view` | ✅ Yes | View uploaded documents |
| `documents.download` | ✅ Yes | Download documents for verification |
| `documents.verify` | ✅ Yes | Verify document authenticity |
| `documents.create` | ❌ No | Create system documents |
| `documents.delete` | ❌ No | Delete documents |

### 3.4 Reports & Analytics Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `reports.view` | ✅ Yes | View admission reports |
| `reports.create` | ✅ Yes | Create admission reports |
| `reports.export` | ✅ Yes | Export reports to PDF/Excel |
| `reports.analytics` | ✅ Yes | View admission analytics |

### 3.5 Quality Assurance Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `qa.view` | ✅ Yes | View QA dashboard |
| `qa.accreditation` | ✅ Yes | Access accreditation documentation |
| `qa.manage` | ❌ No | Manage QA settings |
| `qa.configure` | ❌ No | Configure QA systems |

### 3.6 Notification Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `notifications.view` | ✅ Yes | View notification center |
| `notifications.send` | ✅ Yes | Send notifications to applicants |
| `notifications.manage` | ❌ No | Manage notification templates |
| `notifications.configure` | ❌ No | Configure notification settings |

### 3.7 Certificate Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `certificates.view` | ✅ Yes | View admission certificates |
| `certificates.generate` | ✅ Yes | Generate admission letters |
| `certificates.verify` | ❌ No | Verify system certificates |
| `certificates.revoke` | ❌ No | Revoke certificates |

### 3.8 Student Permissions

| Permission | Allowed | Description |
|------------|---------|-------------|
| `students.view` | ❌ No | View student records |
| `students.create` | ❌ No | Create student records |
| `students.edit` | ❌ No | Edit student records |
| `students.enroll` | ❌ No | Enroll students |
| `students.graduation` | ❌ No | Manage graduation |

---

## 4. DENIED Permissions (Restricted Access)

The following permissions are explicitly NOT granted to the Admission Officer role:

### System Administration
| Permission | Reason for Denial |
|------------|-------------------|
| `users.view` | Not relevant to admission duties |
| `users.create` | Restricted to super admin |
| `users.edit` | Restricted to super admin |
| `users.delete` | Restricted to super admin |
| `users.export` | Restricted to super admin |

### Role Management
| Permission | Reason for Denial |
|------------|-------------------|
| `roles.view` | Not relevant to admission duties |
| `roles.create` | Restricted to super admin |
| `roles.edit` | Restricted to super admin |

### Settings & Configuration
| Permission | Reason for Denial |
|------------|-------------------|
| `settings.view` | Not permitted for department roles |
| `settings.edit` | Restricted to super admin |
| `settings.system` | System-level access only |

### Security
| Permission | Reason for Denial |
|------------|-------------------|
| `security.view` | Not permitted for admission role |
| `security.manage` | Restricted to ICT/security team |
| `audit.view` | Restricted to audit/compliance |
| `audit.export` | Restricted to audit/compliance |

### Financial
| Permission | Reason for Denial |
|------------|-------------------|
| `payments.view` | Not relevant to admission duties |
| `payments.create` | Restricted to bursar |
| `payments.verify` | Restricted to bursar |
| `payments.refund` | Restricted to bursar |
| `payments.report` | Restricted to bursar |

### Academic
| Permission | Reason for Denial |
|------------|-------------------|
| `academic.view` | Not in admission scope |
| `academic.edit` | Restricted to academic staff |
| `academic.approve` | Not in admission scope |
| `courses.view` | Not relevant to admission |
| `courses.create` | Restricted to academic staff |
| `courses.edit` | Restricted to academic staff |
| `assignments.view` | Not relevant to admission |
| `exams.view` | Not relevant to admission |
| `results.view` | Not relevant to admission |

### Library & Labs
| Permission | Reason for Denial |
|------------|-------------------|
| `library.view` | Not relevant to admission |
| `library.manage` | Restricted to librarian |
| `labs.view` | Not relevant to admission |
| `labs.manage` | Restricted to ICT |

---

## 5. Navigation Access Control

### Allowed Navigation Items
- Dashboard
- Applications (list, detail, review)
- Document Verification
- Admission Letters
- Communication Center
- Reports (all admission reports)
- Archive Records
- Statistics
- Profile
- Notifications

### Denied Navigation Items
- User Management
- Role Management
- System Settings
- Security Settings
- Database Administration
- Financial Reports
- Academic Reports (non-admission)
- Library Management
- Laboratory Management

---

## 6. Route Protection

| Route | Permission Required | Access |
|-------|---------------------|--------|
| `/portal/management/admission-officer` | `dashboard.view` | ✅ Allowed |
| `/portal/management/admission-officer/applications` | `admission.view` | ✅ Allowed |
| `/portal/management/admission-officer/verification` | `admission.verify` | ✅ Allowed |
| `/portal/management/admission-officer/letters` | `admission.letter` | ✅ Allowed |
| `/portal/management/admission-officer/communication` | `admission.communicate` | ✅ Allowed |
| `/portal/management/admission-officer/reports/*` | `reports.view` | ✅ Allowed |
| `/portal/management/users` | - | ❌ Blocked |
| `/portal/management/roles` | - | ❌ Blocked |
| `/portal/management/settings` | - | ❌ Blocked |
| `/portal/management/security` | - | ❌ Blocked |
| `/portal/management/finance` | - | ❌ Blocked |
| `/portal/super-admin/*` | - | ❌ Blocked |

---

## 7. API Permissions

### Allowed API Endpoints
- `GET /api/admissions/*` - View admissions
- `POST /api/admissions` - Create admission records
- `PUT /api/admissions/:id` - Update admissions
- `POST /api/admissions/:id/approve` - Approve admissions
- `POST /api/admissions/:id/reject` - Reject admissions
- `GET /api/documents/verify` - Document verification
- `POST /api/documents/verify` - Submit verification
- `GET /api/reports/admissions/*` - Admission reports
- `POST /api/notifications/send` - Send notifications
- `GET /api/archive/*` - Access archive

### Denied API Endpoints
- `/*/users/*` - User management
- `/*/roles/*` - Role management
- `/*/settings/*` - System configuration
- `/*/security/*` - Security management
- `/*/finance/*` - Financial data

---

## 8. Implementation Notes

### Middleware Implementation
The admission officer permissions are enforced through:
1. Route middleware checking user role
2. Permission validation before page access
3. API endpoint authorization

### Sidebar Visibility
Navigation sidebar shows only items the admission officer has permission to access.

### Dashboard Widgets
Only admission-related widgets are displayed on the dashboard.

---

## 9. Compliance

This permission matrix ensures:
- **Least Privilege**: Admission Officer has only necessary permissions
- **Separation of Duties**: Admission functions separated from other departments
- **Audit Trail**: All admission actions are logged
- **Accreditation Support**: Complete documentation for NBTE compliance

---

**Document Version**: 1.0.0
**Last Updated**: 2024
**Document Owner**: System Administration