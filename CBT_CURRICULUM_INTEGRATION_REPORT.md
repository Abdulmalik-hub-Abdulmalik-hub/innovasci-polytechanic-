# CURRICULUM INTEGRATION REPORT

**InnovaSci AI Labs Polytechnic**
**CBT Examination Engine**

---

## 1. Curriculum Data Integration

### 1.1 Seeded Academic Structure

The CBT Engine is fully integrated with the existing seeded curriculum:

```
5 Faculties (Schools)
    ↓
15 Departments
    ↓
45 Programmes (ND & HND)
    ↓
Curriculum Levels
    ↓
Semesters
    ↓
Courses
    ↓
CBT Examination System
```

---

## 2. Faculty Integration

### 2.1 Faculty List

| Code | Faculty Name |
|------|-------------|
| SAI | School of AI & Computational Intelligence |
| SOE | School of Engineering |
| SOB | School of Business |
| SAS | School of Applied Sciences |
| SCC | School of Cybersecurity & Cloud Computing |

### 2.2 Department Distribution

| Faculty | Departments |
|---------|-------------|
| SAI | 3 (AIML, DSA, RIS) |
| SOE | 4 (EEE, CE, TCE, MCE) |
| SOB | 3 (BA, ACC, BF) |
| SAS | 3 (SLT, STA, BIT) |
| SCC | 2 (CS, CC) |

---

## 3. Programme Integration

### 3.1 Programme Types

| Type | Duration | Levels |
|------|----------|--------|
| ND | 2 years | ND1, ND2 |
| HND | 2 years | HND1, HND2 |

### 3.2 Programme Distribution

- **ND Programmes**: 30 programmes (2 per department)
- **HND Programmes**: 15 programmes (1 per department)
- **Total**: 45 programmes

---

## 4. Course Integration

### 4.1 Course Structure

Each programme contains:
- Semester 1 courses: 4-6 courses
- Semester 2 courses: 4-6 courses
- Per level: 10-12 courses
- Per programme: 20-24 courses

### 4.2 Course Types

| Type | Description |
|------|-------------|
| Compulsory | Required for graduation |
| Elective | Optional specialization |

---

## 5. Examination Mapping

### 5.1 Course-to-Exam Mapping

| Course Level | Exam Frequency |
|-------------|----------------|
| ND1 Semester 1 | Mid-term + Final |
| ND1 Semester 2 | Mid-term + Final |
| ND2 Semester 1 | Mid-term + Final |
| ND2 Semester 2 | Mid-term + Final |
| HND1 Semester 1 | Mid-term + Final |
| HND1 Semester 2 | Mid-term + Final |
| HND2 Semester 1 | Mid-term + Final |
| HND2 Semester 2 | Mid-term + Final |

### 5.2 Programme-Specific Exams

- Each course has dedicated question bank
- Exams filtered by programme and level
- Carryover exams mapped to failed courses
- Spillover exams for overflow students

---

## 6. Student Eligibility

### 6.1 Eligibility Criteria

| Criteria | Verification |
|----------|-------------|
| Registered Student | Student record check |
| Active Status | Account status |
| Payment Verified | Fee payment status |
| Course Registration | Enrolled courses |
| Examination Schedule | Published exam |

### 6.2 Programme Filter

Students only see examinations for:
- Their programme (ND/HND)
- Their current level
- Their current semester
- Registered courses

---

## 7. ODFeL Compliance

### 7.1 Remote Access Support

- Students can take exams from any location
- Flexible examination windows
- Asynchronous scheduling options

### 7.2 Curriculum Alignment

- All exams aligned to NBTE curriculum
- Programme learning outcomes assessed
- Competency-based evaluation

---

**Report Version**: 1.0.0
**Last Updated**: 2024