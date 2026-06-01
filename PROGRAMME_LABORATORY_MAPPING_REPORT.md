# PROGRAMME-TO-LABORATORY MAPPING REPORT

**InnovaSci AI Labs Online Polytechnic**
**Curriculum-Driven Lab Assignment**

---

## 1. Mapping Overview

The Virtual Laboratory Ecosystem uses curriculum mappings to dynamically assign laboratories to students based on their academic profile.

---

## 2. Programme-to-Lab Mapping

### 2.1 Applied Machine Learning (ND)

| Level | Semester | Course Code | Course Title | Lab Code | Activities |
|-------|----------|-------------|--------------|----------|------------|
| ND 1 | Semester 1 | AML 111 | Linear Algebra for AI | AML-LAB-111 | 8 |
| ND 1 | Semester 1 | AML 112 | Python Programming | AML-LAB-112 | 10 |
| ND 1 | Semester 1 | AML 113 | Introduction to Data Science | AML-LAB-113 | 6 |
| ND 1 | Semester 2 | AML 121 | Statistics for AI | - | - |
| ND 1 | Semester 2 | AML 122 | Machine Learning Basics | - | - |
| ND 2 | Semester 1 | AML 211 | Neural Networks | - | - |
| ND 2 | Semester 1 | AML 212 | Deep Learning | - | - |
| ND 2 | Semester 2 | AML 221 | Natural Language Processing | - | - |
| ND 2 | Semester 2 | AML 222 | Computer Vision | - | - |

### 2.2 HND Programme Mapping

| Level | Semester | Course Code | Course Title | Lab Code | Activities |
|-------|----------|-------------|--------------|----------|------------|
| HND 1 | Semester 1 | AML 311 | Advanced Machine Learning | - | - |
| HND 1 | Semester 1 | AML 312 | Reinforcement Learning | - | - |
| HND 1 | Semester 2 | AML 321 | AI Ethics and Governance | - | - |
| HND 1 | Semester 2 | AML 322 | Research Methods | - | - |
| HND 2 | Semester 1 | AML 411 | AI Systems Design | - | - |
| HND 2 | Semester 1 | AML 412 | Capstone Project I | - | - |
| HND 2 | Semester 2 | AML 421 | Capstone Project II | - | - |
| HND 2 | Semester 2 | AML 422 | Professional Practice | - | - |

---

## 3. Access Control Rules

### 3.1 Student Lab Assignment Logic

```typescript
function getStudentVirtualLaboratories(student) {
  return DEMO_VIRTUAL_LABORATORIES.filter(lab => 
    lab.facultyId === student.facultyId &&           // Must match faculty
    lab.departmentId === student.departmentId &&       // Must match department
    lab.programmeId === student.programmeId &&        // Must match programme
    lab.programmeType === student.entryCategory &&   // Must match ND/HND
    lab.level === student.level &&                    // Must match level
    lab.semester === student.semester &&             // Must match semester
    lab.status === 'active'                            // Must be active
  );
}
```

### 3.2 Access Validation

```typescript
function validateLabAccess(student, labId) {
  // Returns { hasAccess: boolean, reason?: string }
  // Students can ONLY access labs for their programme
}
```

---

## 4. Curriculum Protection

The mapping system uses the existing seeded curriculum structure:

- ✅ Faculty IDs from existing data
- ✅ Department IDs from existing data
- ✅ Programme IDs from existing data
- ✅ Course IDs from existing data
- ❌ Does NOT create duplicate curriculum tables
- ❌ Does NOT modify existing curriculum structure

---

## 5. Lab-to-Curriculum Relationships

| Lab Field | Curriculum Source |
|-----------|-------------------|
| facultyId | SEEDED_FACULTIES.id |
| departmentId | SEEDED_DEPARTMENTS.id |
| programmeId | SEEDED_PROGRAMMES.id |
| level | PROGRAMME_COURSES.level |
| semester | PROGRAMME_COURSES.semester |
| courseId | PROGRAMME_COURSES.courseId |

---

**Report Version**: 1.0.0  
**Last Updated**: 2024