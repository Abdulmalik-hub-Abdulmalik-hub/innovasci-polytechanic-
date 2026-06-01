# InnovaSci Open Polytechnic
## Demo Login Credentials
### Version: 1.0 | Created: June 1, 2026

---

## 🚨 IMPORTANT SECURITY NOTICE

**⚠️ These credentials are STRICTLY for development/testing only**
- Do NOT use these credentials in production environments
- Do NOT commit these credentials to version control if your repo is public
- These demo accounts have intentionally weak passwords for easy testing
- User metadata and roles are pre-configured for system testing

---

## 📋 DEMO CREDENTIALS TABLE

| Role | Email | Password | Dashboard | Display Name |
|------|-------|----------|----------|--------------|
| **super_admin** | super_admin@innova-sci.local | Super@12345 | /portal/super-admin | Super Administrator |
| **rector** | rector@innova-sci.local | Rector@12345 | /portal/management | Rector |
| **deputy_rector_academic** | deputy_academic@innova-sci.local | Deputy@12345 | /portal/management | Deputy Rector (Academic) |
| **deputy_rector_admin** | deputy_admin@innova-sci.local | Deputy@12345 | /portal/management | Deputy Rector (Administration) |
| **registrar** | registrar@innova-sci.local | Registrar@12345 | /portal/management | Registrar |
| **bursar** | bursar@innova-sci.local | Bursar@12345 | /portal/management | Bursar |
| **librarian** | librarian@innova-sci.local | Librarian@12345 | /portal/management | Polytechnic Librarian |
| **director** | director@innova-sci.local | Director@12345 | /portal/management | Director |
| **admission_officer** | admission@innova-sci.local | Admission@12345 | /portal/management | Admission Officer |
| **examination_officer** | exam@innova-sci.local | Exam@12345 | /portal/management | Examination Officer |
| **director_ict** | ict@innova-sci.local | Ict@12345 | /portal/management | Director ICT |
| **director_odfel** | odfel@innova-sci.local | Odfel@12345 | /portal/management | Director ODFeL |
| **director_quality_assurance** | qa@innova-sci.local | Qa@12345 | /portal/management | Director Quality Assurance |
| **director_cbt_services** | cbt@innova-sci.local | Cbt@12345 | /portal/management | Director CBT Services |
| **director_virtual_laboratories** | vlab@innova-sci.local | Vlab@12345 | /portal/management | Director Virtual Laboratories |
| **director_student_affairs** | student_affairs@innova-sci.local | StudentAffairs@12345 | /portal/management | Director Student Affairs |
| **dean** | dean@innova-sci.local | Dean@12345 | /portal/academic | Dean |
| **hod** | hod@innova-sci.local | Hod@12345 | /portal/academic | Head of Department |
| **program_coordinator** | coordinator@innova-sci.local | Coordinator@12345 | /portal/academic | Programme Coordinator |
| **lecturer** | lecturer@innova-sci.local | Lecturer@12345 | /portal/academic | Lecturer |
| **student** | student@innova-sci.local | Student@12345 | /portal/student | Student |
| **applicant** | applicant@innova-sci.local | Applicant@12345 | /portal/applicant | Applicant |

---

## 🔑 QUICK REFERENCE BY PORTAL

### Admin Portal (/portal/super-admin)
- **super_admin@innova-sci.local** / Super@12345

### Management Portal (/portal/management)
- **rector@innova-sci.local** / Rector@12345
- **deputy_academic@innova-sci.local** / Deputy@12345
- **deputy_admin@innova-sci.local** / Deputy@12345
- **registrar@innova-sci.local** / Registrar@12345
- **bursar@innova-sci.local** / Bursar@12345
- **librarian@innova-sci.local** / Librarian@12345
- **director@innova-sci.local** / Director@12345
- **admission@innova-sci.local** / Admission@12345
- **exam@innova-sci.local** / Exam@12345
- **ict@innova-sci.local** / Ict@12345
- **odfel@innova-sci.local** / Odfel@12345
- **qa@innova-sci.local** / Qa@12345
- **cbt@innova-sci.local** / Cbt@12345
- **vlab@innova-sci.local** / Vlab@12345
- **student_affairs@innova-sci.local** / StudentAffairs@12345

### Academic Portal (/portal/academic)
- **dean@innova-sci.local** / Dean@12345
- **hod@innova-sci.local** / Hod@12345
- **coordinator@innova-sci.local** / Coordinator@12345
- **lecturer@innova-sci.local** / Lecturer@12345

### Student Portal (/portal/student)
- **student@innova-sci.local** / Student@12345

### Applicant Portal (/portal/applicant)
- **applicant@innova-sci.local** / Applicant@12345

---

## 📊 ROLE CATEGORIES

### System Administration (1 role)
| Role | Permissions |
|------|-------------|
| super_admin | Full system access |

### Senior Management (3 roles)
| Role | Purpose |
|------|---------|
| rector | Head of institution |
| deputy_rector_academic | Academic affairs deputy |
| deputy_rector_admin | Administration deputy |

### Administrative Officers (3 roles)
| Role | Purpose |
|------|---------|
| registrar | Academic records, admissions |
| bursar | Finance management |
| librarian | Library services |

### Specialized Directors (9 roles)
| Role | Purpose |
|------|---------|
| director | Generic departmental director |
| admission_officer | Admissions processing |
| examination_officer | Examination administration |
| director_ict | ICT infrastructure |
| director_odfel | ODFeL compliance |
| director_quality_assurance | NBTE accreditation |
| director_cbt_services | CBT administration |
| director_virtual_laboratories | Virtual labs |
| director_student_affairs | Student welfare |

### Academic Staff (4 roles)
| Role | Purpose |
|------|---------|
| dean | Faculty/School head |
| hod | Department head |
| program_coordinator | Programme management |
| lecturer | Teaching staff |

### Students (2 roles)
| Role | Purpose |
|------|---------|
| student | Enrolled students |
| applicant | Prospective students |

---

## 🛠️ SETUP INSTRUCTIONS

### For Supabase Auth Integration

Run the following SQL to create demo users:

```sql
-- Demo Users Seed Data
-- Run in Supabase SQL Editor

-- Super Admin
INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES (
    gen_random_uuid(),
    'super_admin@innova-sci.local',
    -- Password: Super@12345 (bcrypt hash)
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.rsA4h/xPJ1O1P9P3P',
    'Super Administrator Demo',
    'super_admin',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- Rector
INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES (
    gen_random_uuid(),
    'rector@innova-sci.local',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZRGdjGj/n3.rsA4h/xPJ1O1P9P3P',
    'Rector Demo',
    'rector',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- [Continue for all roles...]
```

### Password Hash Generation

All demo passwords should be hashed using bcrypt with 10 rounds:
- Super@12345
- Rector@12345
- Deputy@12345
- Registrar@12345
- Bursar@12345
- Librarian@12345
- Director@12345
- Admission@12345
- Exam@12345
- Ict@12345
- Odfel@12345
- Qa@12345
- Cbt@12345
- Vlab@12345
- StudentAffairs@12345
- Dean@12345
- Hod@12345
- Coordinator@12345
- Lecturer@12345
- Student@12345
- Applicant@12345

---

## 📱 USAGE IN LOGIN PAGE

The login page displays a collapsible "Demo Credentials" section that shows:
- Quick access buttons for each role category
- One-click fill for email and password
- Visual indicators for portal/dashboard target

This allows developers to easily:
1. Click on a role button
2. Credentials auto-fill in the form
3. Click Sign In to access that role's dashboard

---

## 🔒 SECURITY NOTES

1. **Development Only**: These credentials must NEVER be used in production
2. **Weak Passwords**: Passwords are intentionally simple for easy testing
3. **No 2FA**: Demo accounts skip two-factor authentication
4. **Open Access**: Demo users have full access to their portal features
5. **Logging**: All login attempts should be logged in production

---

*Document maintained by InnovaSci AI Labs Development Team*