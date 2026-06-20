# InnovaSci Open University - Quick Start Guide

## Login Credentials (All Passwords: `Demo@123`)

### Try These First

**Management:** `vc@innovasci.edu.ng` → Vice-Chancellor (full access)
**Academic:** `dean.undergraduate@innovasci.edu.ng` → Dean (course management)
**Student:** `student.bsc.001@innovasci.edu.ng` → BSc Student L200 (learning)
**Admin:** `super.admin@innovasci.edu.ng` → Super Administrator

---

## What Changed?

| Before | After |
|--------|-------|
| Rector | Vice-Chancellor |
| Diploma (ND/HND) | Degrees (BSc/PGD/MSc/PhD) |
| Mixed roles | **Portal-separated roles** |
| Generic lecturers | E-Tutors, Supervisors, Designers |
| No role hierarchy | Clear management/academic split |

---

## Portal Overview

### Management Portal (16 roles)
Run institutional operations: finance, admissions, exams, quality assurance
**Access:** vc@innovasci.edu.ng / Demo@123

### Academic Portal (11 roles)
Manage teaching & learning: courses, content, grading, research
**Access:** dean.undergraduate@innovasci.edu.ng / Demo@123

### Student Portal (6 students)
Learn and submit work: view courses, take exams, check grades
**Access:** student.bsc.001@innovasci.edu.ng / Demo@123

---

## All 35 Demo Users by Category

### Management (16)
- vc@innovasci.edu.ng
- deputy.vc.academic@innovasci.edu.ng
- deputy.vc.admin@innovasci.edu.ng
- deputy.vc.research@innovasci.edu.ng
- registrar@innovasci.edu.ng
- bursar@innovasci.edu.ng
- director.admission@innovasci.edu.ng
- director.examination@innovasci.edu.ng
- director.study.centre@innovasci.edu.ng
- director.lss@innovasci.edu.ng
- director.odfel@innovasci.edu.ng
- director.ict@innovasci.edu.ng
- director.qa@innovasci.edu.ng
- director.welfare@innovasci.edu.ng
- director.research@innovasci.edu.ng
- super.admin@innovasci.edu.ng

### Academic (11)
- dean.undergraduate@innovasci.edu.ng
- dean.postgraduate@innovasci.edu.ng
- hod.maths@innovasci.edu.ng
- coord.bsc.cs@innovasci.edu.ng
- coord.pgd.biz@innovasci.edu.ng
- coord.msc.eng@innovasci.edu.ng
- coord.phd.bio@innovasci.edu.ng
- etutor.cs101@innovasci.edu.ng
- instructional.designer@innovasci.edu.ng
- supervisor.phd@innovasci.edu.ng
- research.fellow@innovasci.edu.ng

### Student (6)
- student.bsc.001@innovasci.edu.ng (Level 200)
- student.bsc.002@innovasci.edu.ng (Level 300)
- student.bsc.003@innovasci.edu.ng (Level 400)
- student.pgd.001@innovasci.edu.ng (PGD)
- student.msc.001@innovasci.edu.ng (MSc)
- student.phd.001@innovasci.edu.ng (PhD)

### Applicant (2)
- applicant.001@email.com
- applicant.002@email.com

**All passwords:** `Demo@123`

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/types/index.ts` | New role definitions (BSc/PGD/MSc/PhD) |
| `src/lib/rbac.ts` | Permission matrix for all 29 roles |
| `src/lib/portal-separation.ts` | Portal access control |
| `src/lib/seed-data.ts` | 35 demo credentials |
| `DEMO_CREDENTIALS.md` | Full credentials guide |
| `REFACTORING_IMPLEMENTATION_GUIDE.md` | Technical deep dive |

---

## Quick Integration

### Check if user can access portal:
```typescript
import { validatePortalAccess } from '@/lib/portal-separation';

if (validatePortalAccess('vice_chancellor', 'management')) {
  // User can access management portal
}
```

### Verify demo credentials:
```typescript
import { verifyDemoCredentials } from '@/lib/seed-data';

const user = verifyDemoCredentials('vc@innovasci.edu.ng', 'Demo@123');
if (user) console.log(`Logged in as: ${user.fullName}`);
```

### Check user permissions:
```typescript
import { hasPermission } from '@/lib/rbac';

if (hasPermission('vice_chancellor', 'users.create')) {
  // Can create users
}
```

---

## Most Common Questions

**Q: Which role should I test with?**
A: Start with Vice-Chancellor (vc@innovasci.edu.ng) for full system access.

**Q: Can a student access the management portal?**
A: No. Portal separation prevents cross-portal access. Users are restricted to their assigned portal.

**Q: Can I create new demo users?**
A: Yes. Add to `/src/lib/seed-data.ts` and use the same pattern as existing users.

**Q: What's the password for all demo users?**
A: `Demo@123` (same for all 35 users)

**Q: How do I add a new role?**
A: (1) Add to types in `src/types/index.ts` (2) Add to `ROLE_TO_PORTAL` (3) Add permissions in `src/lib/rbac.ts` (4) Create demo user in `src/lib/seed-data.ts`

**Q: Can users have multiple roles?**
A: Not yet. Current system: one role per user. Future enhancement planned.

---

## Role Comparison

| Aspect | Management | Academic | Student |
|--------|-----------|----------|---------|
| Portal Access | 16 roles | 11 roles | 2 roles |
| Can Create Users | Yes | No | No |
| Can Create Courses | No | Yes | No |
| Can Grade Assignments | No | Yes | No |
| Can Submit Work | No | No | Yes |
| Dashboard Type | Analytics | Content | Learning |

---

## Portal Routes

After login, users are redirected to:

- **Management:** `/portal/management/dashboard`
- **Academic:** `/portal/academic/dashboard`
- **Student:** `/portal/student/dashboard`

---

## Degree Levels

**BSc (Undergraduate):**
- Level 100, 200, 300, 400 (4 years)

**PGD (Postgraduate Diploma):**
- Level 100 (1 year)

**MSc (Master of Science):**
- Level 100 (1 year)

**PhD (Doctor of Philosophy):**
- Level 100, 200 (3-4 years)

---

## Testing Checklist

- [ ] Login as Vice-Chancellor
- [ ] Login as Dean
- [ ] Login as Student
- [ ] Try cross-portal access (should fail)
- [ ] Check permissions work
- [ ] Review audit logs
- [ ] Test with 5 different roles
- [ ] Verify redirects to correct portal

---

## Need More Information?

- **Full credentials table:** See `DEMO_CREDENTIALS.md`
- **Technical details:** See `REFACTORING_IMPLEMENTATION_GUIDE.md`
- **Project summary:** See `PROJECT_COMPLETION_SUMMARY.md`
- **Code docs:** Inline comments in type files

---

## Status

✅ Refactoring Complete
✅ 35 Demo Credentials Ready
✅ Portal Separation Active
✅ RBAC System Updated
✅ Documentation Complete

**Ready for Testing & Deployment**
