# CBT ROLE PERMISSION MATRIX

**InnovaSci Open Polytechnic**
**CBT Examination Engine**

---

## 1. CBT Permissions Overview

### 1.1 Permission Categories

| Category | Permissions |
|----------|-------------|
| Questions | View, Create, Edit, Delete, Moderate |
| Examinations | View, Create, Edit, Delete, Publish, Schedule, Approve, Monitor, Cancel |
| Students | View, Assign, Track |
| Results | View, Grade, Publish, Export |
| Security | View, Manage |
| Incidents | View, Resolve |
| Configuration | View, Manage |

---

## 2. Role Permission Matrix

### 2.1 Student

| Permission | Allowed |
|------------|---------|
| cbt.exams.view | ✅ |
| cbt.students.view | ✅ |
| cbt.results.view | ✅ |
| exams.take | ✅ |

**Access**: Own examinations only
**Denied**: Question creation, exam management, security

---

### 2.2 Lecturer

| Permission | Allowed |
|------------|---------|
| cbt.questions.view | ✅ |
| cbt.questions.create | ✅ |
| cbt.questions.edit | ✅ |
| cbt.exams.view | ✅ |
| cbt.exams.create | ✅ |
| cbt.exams.edit | ✅ |
| cbt.exams.publish | ✅ |
| cbt.results.view | ✅ |
| cbt.results.grade | ✅ |
| cbt.results.publish | ✅ |
| cbt.analytics.view | ✅ |

**Scope**: Assigned courses only
**Denied**: Institution-wide settings, security management

---

### 2.3 Programme Coordinator

| Permission | Allowed |
|------------|---------|
| cbt.questions.view | ✅ |
| cbt.questions.create | ✅ |
| cbt.questions.edit | ✅ |
| cbt.exams.view | ✅ |
| cbt.exams.create | ✅ |
| cbt.exams.edit | ✅ |
| cbt.exams.publish | ✅ |
| cbt.exams.approve | ✅ |
| cbt.exams.monitor | ✅ |
| cbt.analytics.view | ✅ |
| cbt.results.view | ✅ |
| cbt.results.grade | ✅ |
| cbt.results.publish | ✅ |

**Scope**: Programme level
**Additional**: Exam approval for programme

---

### 2.4 HOD

| Permission | Allowed |
|------------|---------|
| cbt.questions.view | ✅ |
| cbt.questions.moderate | ✅ |
| cbt.exams.view | ✅ |
| cbt.exams.approve | ✅ |
| cbt.exams.monitor | ✅ |
| cbt.banks.view | ✅ |
| cbt.banks.approve | ✅ |
| cbt.analytics.view | ✅ |
| cbt.results.view | ✅ |

**Scope**: Department level
**Additional**: Question bank approval, exam approval

---

### 2.5 Dean

| Permission | Allowed |
|------------|---------|
| cbt.exams.view | ✅ |
| cbt.exams.approve | ✅ |
| cbt.exams.monitor | ✅ |
| cbt.questions.view | ✅ |
| cbt.questions.moderate | ✅ |
| cbt.analytics.view | ✅ |
| cbt.results.view | ✅ |

**Scope**: Faculty level
**Additional**: Faculty-wide monitoring

---

### 2.6 Examination Officer

| Permission | Allowed |
|------------|---------|
| cbt.questions.view | ✅ |
| cbt.questions.moderate | ✅ |
| cbt.exams.view | ✅ |
| cbt.exams.schedule | ✅ |
| cbt.exams.approve | ✅ |
| cbt.exams.monitor | ✅ |
| cbt.exams.cancel | ✅ |
| cbt.students.view | ✅ |
| cbt.students.assign | ✅ |
| cbt.students.track | ✅ |
| cbt.results.view | ✅ |
| cbt.results.publish | ✅ |
| cbt.results.export | ✅ |
| cbt.analytics.view | ✅ |
| cbt.security.view | ✅ |
| cbt.incidents.view | ✅ |
| cbt.incidents.resolve | ✅ |
| cbt.banks.view | ✅ |
| reports.view | ✅ |
| reports.create | ✅ |
| reports.export | ✅ |
| qa.view | ✅ |
| qa.accreditation | ✅ |
| settings.view | ✅ |
| audit.view | ✅ |

**Scope**: Institution-wide operational management
**Denied**: System settings, user management, security configuration

---

### 2.7 Director CBT Services

| Permission | Allowed |
|------------|---------|
| cbt.questions.view | ✅ |
| cbt.questions.create | ✅ |
| cbt.questions.edit | ✅ |
| cbt.questions.delete | ✅ |
| cbt.questions.moderate | ✅ |
| cbt.exams.view | ✅ |
| cbt.exams.create | ✅ |
| cbt.exams.edit | ✅ |
| cbt.exams.delete | ✅ |
| cbt.exams.publish | ✅ |
| cbt.exams.schedule | ✅ |
| cbt.exams.approve | ✅ |
| cbt.exams.monitor | ✅ |
| cbt.exams.cancel | ✅ |
| cbt.students.view | ✅ |
| cbt.students.assign | ✅ |
| cbt.students.track | ✅ |
| cbt.results.view | ✅ |
| cbt.results.grade | ✅ |
| cbt.results.publish | ✅ |
| cbt.results.export | ✅ |
| cbt.analytics.view | ✅ |
| cbt.security.view | ✅ |
| cbt.security.manage | ✅ |
| cbt.incidents.view | ✅ |
| cbt.incidents.resolve | ✅ |
| cbt.configuration.view | ✅ |
| cbt.configuration.manage | ✅ |
| cbt.banks.view | ✅ |
| cbt.banks.approve | ✅ |
| odfel.exams.view | ✅ |
| odfel.exams.configure | ✅ |
| cbt.view | ✅ |
| cbt.configure | ✅ |

**Scope**: Full CBT administration

---

## 3. Denied Permissions by Role

### 3.1 Student

❌ cbt.questions.*
❌ cbt.exams.create, edit, delete, publish, schedule, approve, cancel
❌ cbt.students.assign, track
❌ cbt.results.grade, publish, export
❌ cbt.security.*
❌ cbt.incidents.*
❌ cbt.configuration.*

### 3.2 Lecturer

❌ cbt.questions.delete
❌ cbt.exams.delete, schedule, approve, cancel
❌ cbt.security.*
❌ cbt.configuration.*

### 3.3 Examination Officer

❌ cbt.questions.create, edit, delete
❌ cbt.exams.create, edit, delete
❌ cbt.security.manage
❌ cbt.configuration.manage

---

## 4. Navigation Access

### 4.1 Student Portal

```
CBT Dashboard
├── Available Examinations
├── Examination History
└── Past Results
```

### 4.2 Academic Portal

```
CBT Management
├── Question Bank
├── Create Examination
├── Scheduled Exams
├── Results
└── Analytics
```

### 4.3 Management Portal

```
CBT Services
├── Overview Dashboard
├── Examination Management
├── Question Bank Admin
├── Approval Workflow
├── Security & Incidents
├── Analytics
└── Configuration
```

---

**Report Version**: 1.0.0
**Last Updated**: 2024