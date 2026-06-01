# EXAMINATION WORKFLOW REPORT

**InnovaSci Open Polytechnic**
**CBT Examination Engine**

---

## 1. Student Examination Workflow

### 1.1 Entry Requirements

Before accessing any examination, students must:

1. **Login to Student Portal**
2. **Navigate to CBT Dashboard**
3. **View Available Examinations** (filtered by programme, level, semester)

### 1.2 Examination Verification Form

Every student must complete the professional verification form:

**Personal Information**
- Full Name (from database)
- Admission Number (validated against records)
- Student Email (from database)
- Phone Number

**Academic Information**
- Entry Category: ND / HND
- Faculty (from student profile)
- Department (from student profile)
- Programme (from student profile)
- Level (from student profile)
- Semester (from student profile)

**Academic Status**
- Regular Student
- Carryover Student
- Spillover Student

**Verification**
- Student Photo confirmation
- Programme verification
- Admission Number validation

---

## 2. Exam Access Workflow

```
┌─────────────────┐
│   Student Login │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Identity Verify │
│ (Admission No.) │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Record Validate │
│ (Student DB)    │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Programme Check│
│ (Match Profile) │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Course Select   │
│ (Reg. Courses)  │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Eligibility     │
│ ├ Payment ✓    │
│ ├ Registration ✓│
│ └ Prerequisites ✓│
└────────┬────────┘
         ↓
┌─────────────────┐
│ Verification    │
│     Form         │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Exam Instructions│
└────────┬────────┘
         ↓
┌─────────────────┐
│  TIMER START    │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Question Load   │
│ (Random Order)  │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Take Exam     │
│ - Answer Q's   │
│ - Flag for Rev │
│ - Auto-save    │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Review & Submit│
└────────┬────────┘
         ↓
┌─────────────────┐
│  Auto Scoring   │
│  (MCQ, T/F)     │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Manual Grading  │
│ (Essay, Short)  │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Result Processing│
│ - Score         │
│ - Percentage   │
│ - Grade        │
│ - Pass/Fail    │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Result Publish  │
│ (After Release) │
└─────────────────┘
```

---

## 3. Carryover & Spillover Management

### 3.1 Carryover Students
- Automatically identified from academic records
- Shown only relevant examinations (failed courses)
- Separate exam scheduling for carryover exams

### 3.2 Spillover Students
- Identified when carryover exceeds threshold
- Access to both regular and spillover examinations
- Priority scheduling for spillover exams

---

## 4. Examination States

| State | Description | Student Access |
|-------|------------|---------------|
| Draft | Created but not submitted | ❌ |
| Pending Approval | In approval workflow | ❌ |
| Approved | Approved but not published | ❌ |
| Published | Available for students | ✅ |
| Active | Currently in progress | ✅ |
| Completed | All attempts completed | ❌ |
| Cancelled | Cancelled by admin | ❌ |

---

## 5. Approval Workflow

### 5.1 Stages

| Level | Role | Action |
|-------|------|--------|
| 1 | Lecturer | Create and submit for review |
| 2 | Programme Coordinator | Review and recommend |
| 3 | HOD | Approve/reject |
| 4 | Examination Officer | Verify readiness |
| 5 | Director CBT | Final approval and publish |

### 5.2 Approval History

All approval actions are logged with:
- Approver identity
- Timestamp
- Comments/reasons
- Decision (approve/reject)

---

## 6. Incident Management

### 6.1 Incident Types

- Network interruption
- Browser crash
- Session timeout
- Multiple login attempts
- Suspicious activities

### 6.2 Resolution Process

```
Incident Reported
    ↓
Examination Officer Notified
    ↓
Investigation
    ↓
Resolution Decision
    ↓
Student Notification
    ↓
Incident Archived
```

---

## 7. Result Processing

### 7.1 Automatic Scoring

| Question Type | Grading Method |
|--------------|---------------|
| Multiple Choice | Exact match |
| True/False | Exact match |
| Fill in Blank | Keyword matching |
| Matching | Partial credit |

### 7.2 Manual Grading

| Question Type | Grading Method |
|--------------|---------------|
| Short Answer | Keyword comparison |
| Essay | Rubric-based |
| Scenario | Rubric-based |

### 7.3 Grade Calculation

```
Total Score = (Correct × Marks) - (Wrong × Negative Mark)
Percentage = (Total Score / Total Possible) × 100
Grade = Calculated from percentage
```

---

## 8. Communication Workflow

### 8.1 Notification Types

| Event | Notification |
|-------|-------------|
| Exam Available | Email + In-app |
| Exam Reminder | Email |
| Submission Confirmed | In-app |
| Results Published | Email + In-app |
| Incident Reported | Admin notification |
| Incident Resolved | Email to student |

---

**Report Version**: 1.0.0
**Last Updated**: 2024