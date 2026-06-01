# LABORATORY NOTEBOOK REPORT

**InnovaSci AI Labs Online Polytechnic**
**Digital Laboratory Notebook System**

---

## 1. System Overview

The Digital Laboratory Notebook enables students to record, organize, and review their practical work throughout their studies.

---

## 2. Notebook Structure

### 2.1 Notebook Hierarchy

```
Student Lab Notebook
├── Course: AML 111 (Linear Algebra for AI)
│   ├── Activity 1: NumPy Arrays
│   │   ├── Entry: Observation - Matrix dimensions
│   │   ├── Entry: Calculation - Eigenvalues
│   │   └── Entry: Finding - Matrix multiplication
│   ├── Activity 2: Linear Transformations
│   │   ├── Entry: Observation - Rotation matrices
│   │   └── Entry: Calculation - Transformation matrices
│   └── ...
├── Course: AML 112 (Python Programming)
│   └── ...
└── ...
```

### 2.2 Notebook Entry Model

```typescript
interface NotebookEntry {
  id: string;
  notebookId: string;
  type: 'observation' | 'calculation' | 'finding' | 'note' | 'sketch';
  title: string;
  content: string;
  mediaUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

---

## 3. Entry Types

### 3.1 Observation Entry

Purpose: Record experimental observations and data

Content:
- Experimental data
- Observations notes
- Time-stamped findings

### 3.2 Calculation Entry

Purpose: Document mathematical and computational work

Content:
- Step-by-step calculations
- Formula derivations
- Code snippets

### 3.3 Finding Entry

Purpose: Record key discoveries and insights

Content:
- Key observations
- Patterns identified
- Conclusions reached

### 3.4 Note Entry

Purpose: General study notes

Content:
- Study notes
- Reference material
- Quick reminders

### 3.5 Sketch Entry

Purpose: Store diagrams and visual data

Content:
- Diagram uploads
- Chart references
- Visual representations

---

## 4. Integration with Curriculum

Notebook entries are linked to:

| Field | Source |
|-------|--------|
| courseCode | ProgrammeCourses.courseCode |
| courseTitle | ProgrammeCourses.courseTitle |
| activityId | LaboratoryActivity.id |
| activityTitle | LaboratoryActivity.title |
| studentId | DEMO_STUDENT_PROFILE.id |

---

## 5. Features

### 5.1 Student Features

- Create notebook entries
- Edit existing entries
- Tag entries for organization
- Attach media files
- Search entries
- Export notebooks

### 5.2 Lecturer Features

- View student notebooks
- Add comments
- Provide feedback
- Track progress

---

## 6. Data Persistence

All notebook entries are:
- Permanently stored
- Linked to student ID
- Linked to course/activity
- Searchable
- Exportable

---

**Report Version**: 1.0.0  
**Last Updated**: 2024