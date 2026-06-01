# STUDENT LEARNING WORKFLOW REPORT

**InnovaSci AI Labs Polytechnic**
**Learning Resource Access Engine**

---

## 1. Learning Workflow Overview

### 1.1 Entry Point
```
Student Login
    ↓
Student Portal
    ↓
Learning Portal Access
    ↓
Student Verification
```

### 1.2 Verification Process
Upon entering the Learning Area:
1. System retrieves student profile from database
2. Validates admission number
3. Verifies programme enrollment
4. Confirms level and semester
5. Displays only enrolled courses

---

## 2. Student Verification Details

### 2.1 Auto-Retrieved Information
| Field | Source | Display |
|-------|--------|---------|
| Full Name | Student Record | Read-only |
| Admission Number | Student Record | Read-only |
| Faculty | Student Record | Read-only |
| Department | Student Record | Read-only |
| Programme | Student Record | Read-only |
| Entry Category | Student Record | Read-only |
| Level | Student Record | Read-only |
| Semester | Student Record | Read-only |

### 2.2 Verification Checks
- **Active Status**: Student must be active
- **Valid Level**: Level must be 1-4
- **Valid Semester**: Semester must be 1-2
- **Programme Match**: Must match enrolled programme

---

## 3. Course Loading Workflow

### 3.1 Loading Process
```
Get Student Profile
    ↓
Extract Programme ID
    ↓
Extract Level & Semester
    ↓
Query Courses
    ↓
Filter by Programme
    ↓
Filter by Level
    ↓
Filter by Semester
    ↓
Display Courses
```

### 3.2 Display Rules
- **Programme Filter**: Only enrolled programme courses
- **Level Filter**: Only current level courses
- **Semester Filter**: Only current semester courses
- **No Manual Selection**: System determines automatically

---

## 4. Resource Access Workflow

### 4.1 Video Access
```
Select Course
    ↓
View Available Videos
    ↓
Select Video
    ↓
Play (Auto-resume if previous progress)
    ↓
Track Progress
    ↓
Mark as Watched
```

### 4.2 Document Access
```
Select Course
    ↓
View Available Documents
    ↓
Select Document
    ↓
View Online / Download
    ↓
Track Downloads
    ↓
Update Statistics
```

---

## 5. Assignment Workflow

### 5.1 Assignment Access
```
View Assignments
    ↓
Select Assignment
    ↓
Read Instructions
    ↓
Start / Continue / Submit
    ↓
Upload Files
    ↓
Submit
    ↓
Await Grading
```

### 5.2 Status Tracking
| Status | Description |
|--------|-------------|
| Not Started | Assignment available |
| In Progress | Work in progress |
| Submitted | Awaiting grading |
| Graded | Results available |

---

## 6. Notes & Highlights

### 6.1 Note Creation
```
Create Note
    ↓
Select Course (Optional)
    ↓
Enter Title
    ↓
Enter Content
    ↓
Add Tags (Optional)
    ↓
Save
```

### 6.2 Highlight System
```
View Document
    ↓
Select Text
    ↓
Choose Color
    ↓
Add Note (Optional)
    ↓
Save Highlight
```

---

## 7. Progress Tracking

### 7.1 Tracked Activities
- Courses accessed
- Videos watched (duration)
- Documents downloaded
- Notes created
- Highlights added
- Assignments submitted

### 7.2 Analytics Data
```
Total Learning Time
Courses Accessed / Total Courses
Videos Watched / Total Videos
Documents Downloaded
Notes Created
Assignments Submitted
```

---

**Report Version**: 1.0.0
**Last Updated**: 2024