# STUDENT RECORD CREATION REPORT

**InnovaSci Open Polytechnic**
**Admission Processing Engine**

---

## 1. Automatic Student Record Creation

### 1.1 Creation Trigger

Student records are automatically created when:
- Application is approved
- Admission number is generated
- Admission offer is issued

### 1.2 Data Flow

```
Admission Offer Issued
    ↓
Student Record Created
    ↓
Linked to Curriculum
    ↓
Available in Student Portal
```

---

## 2. Student Record Fields

### 2.1 Personal Information

| Field | Source |
|-------|--------|
| Full Name | Application |
| Email | Application |
| Phone | Application |
| Admission Number | Auto-generated |
| Student ID | Auto-generated |
| Photo | Applicant upload |

### 2.2 Academic Information

| Field | Source |
|-------|--------|
| Faculty | Programme link |
| Department | Programme link |
| Programme | Application |
| Entry Category | Application |
| Level | Auto (1 for new) |
| Semester | Auto (1 for new) |
| Academic Status | Auto (active) |

### 2.3 Curriculum Linkage

| Field | Source |
|-------|--------|
| Programme Structure | Seeded curriculum |
| Registered Courses | Auto from curriculum |
| Curriculum Year | Programme level |
| Expected Graduation | Programme duration |

---

## 3. Student ID Generation

### 3.1 Format

```
STU20260001
```

| Segment | Description |
|---------|-------------|
| STU | Prefix |
| 2026 | Admission year |
| 000001 | Sequence |

### 3.2 Generation Rules

- Unique per admission year
- Sequential numbering
- Never reused

---

## 4. Curriculum Integration

### 4.1 Automatic Linkages

When student is created:
- Faculty assignment
- Department assignment
- Programme enrollment
- Level assignment (ND1/HND1)
- Semester assignment (1)
- Course registration from curriculum

### 4.2 ND Curriculum Linkage

```
ND Year 1 → Level 1, Semester 1
ND Year 2 → Level 2, Semester 1, 2
```

### 4.3 HND Curriculum Linkage

```
HND Year 1 → Level 1, Semester 1
HND Year 2 → Level 2, Semester 1, 2
```

---

## 5. Status Management

### 5.1 Academic Statuses

| Status | Description |
|--------|-------------|
| active | Currently enrolled |
| suspended | Temporarily suspended |
| withdrawn | Voluntarily left |
| graduated | Completed programme |
| expelled | Dismissed |

### 5.2 Status Transitions

- active → graduated (completion)
- active → suspended (disciplinary)
- active → withdrawn (voluntary)
- active → expelled (severe violation)

---

**Report Version**: 1.0.0
**Last Updated**: 2024