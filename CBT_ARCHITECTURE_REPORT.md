# CBT EXAMINATION ENGINE ARCHITECTURE REPORT

**InnovaSci AI Labs Polytechnic**
**NBTE-Compliant Online Polytechnic ERP System**

---

## 1. Executive Summary

This document outlines the comprehensive architecture of the Computer-Based Testing (CBT) Examination Engine integrated into InnovaSci AI Labs Polytechnic's Online ERP System. The CBT Engine supports all ND and HND programmes across all faculties, departments, and levels.

---

## 2. Architecture Overview

### 2.1 System Hierarchy

```
InnovaSci AI Labs Polytechnic ERP
└── CBT Examination Engine
    ├── Question Bank Management
    ├── Examination Management
    ├── Student Examination Portal
    ├── Staff Management Dashboards
    ├── Security & Monitoring
    └── Analytics & Reporting
```

### 2.2 Integrated Components

| Component | Description | Portal Integration |
|-----------|-------------|-------------------|
| Question Bank | Centralized question repository | Academic, Management |
| Examination Engine | Exam delivery and management | All portals |
| Student Portal | Exam taking interface | Student Portal |
| Lecturer Dashboard | Question creation, exam scheduling | Academic Portal |
| Director Dashboard | CBT administration | Management Portal |

---

## 3. Curriculum Integration

### 3.1 Data Source

The CBT Engine consumes data from the existing seeded curriculum structure:

```
5 Faculties → 15 Departments → 45 Programmes → Levels → Semesters → Courses
```

### 3.2 Hierarchical Data Flow

```
Faculty (5 Schools)
    ↓
Department (15)
    ↓
Programme (45 - ND & HND)
    ↓
Level (ND: 1-2, HND: 1-2)
    ↓
Semester (1-2 per level)
    ↓
Course (programme-specific)
    ↓
Question Bank (course-specific)
    ↓
Examination (course-based)
```

---

## 4. Question Bank Architecture

### 4.1 Question Types Supported

| Type | Auto-Grading | Description |
|------|-------------|-------------|
| Multiple Choice | ✅ Yes | 4 options, single correct answer |
| True/False | ✅ Yes | Binary correct/incorrect |
| Fill in the Blank | ✅ Yes | Text answer matching |
| Matching | ✅ Yes | Match items from two columns |
| Short Answer | ⚠️ Manual | Text answer with keywords |
| Essay | ⚠️ Manual | Long-form written response |
| Image-based | ✅ Yes | Questions with visual content |
| Scenario-based | ⚠️ Manual | Case study questions |
| Practical Simulation | ⚠️ Manual | Interactive simulations |

### 4.2 Question Organization

```
Question Bank
├── Faculty
│   └── Department
│       └── Programme
│           └── Level
│               └── Semester
│                   └── Course
│                       └── Questions (by topic, difficulty, type)
```

### 4.3 Question Metadata

- Entry Category: ND / HND
- Faculty, Department, Programme
- Level, Semester, Course
- Topic, Difficulty (Easy/Medium/Hard)
- Question Type
- Marks
- Moderation Status

---

## 5. Examination Architecture

### 5.1 Exam Configuration

| Setting | Options | Default |
|---------|---------|---------|
| Duration | 15-180 minutes | 60 minutes |
| Total Questions | 5-100 | 20 |
| Passing Marks | 0-100% | 50% |
| Negative Marking | On/Off | Off |
| Max Attempts | 1-5 | 2 |
| Retake Delay | 0-168 hours | 24 hours |
| Availability Window | 0-120 minutes | 30 minutes |

### 5.2 Exam Types

- **Regular Exams**: Scheduled for registered courses
- **Carryover Exams**: For students with failed courses
- **Spillover Exams**: For students exceeding carryover limits
- **Supplementary Exams**: Additional examination opportunities

### 5.3 Question Selection

- Random question selection from question bank
- Random option shuffling
- Question pooling per difficulty level
- Curriculum-aligned question selection

---

## 6. Student Examination Workflow

```
Student Login
    ↓
Identity Verification (Admission Number)
    ↓
Student Record Validation
    ↓
Programme Verification
    ↓
Course Selection (from registered courses)
    ↓
Exam Eligibility Check
    ├── Payment verified
    ├── Registration confirmed
    └── Prerequisites met
    ↓
Exam Verification Form
    ↓
Examination Instructions
    ↓
Timer Start
    ↓
Question Display
    ↓
Answer Submission
    ↓
Auto-grading (MCQ, True/False, Fill-in-blank)
    ↓
Manual Grading (Essay, Short Answer)
    ↓
Results Processing
    ↓
Result Publication
```

---

## 7. Role-Based Access Control

### 7.1 Permission Matrix

| Role | Create Questions | Create Exams | Approve Exams | Monitor | Results |
|------|----------------|--------------|---------------|---------|---------|
| Lecturer | ✅ | ✅ | ❌ | ❌ | View |
| Programme Coordinator | View | ✅ | ✅ | ✅ | View |
| HOD | View | View | ✅ | ✅ | View |
| Dean | View | View | View | ✅ | View |
| Examination Officer | View | View | ✅ | ✅ | Full |
| Director CBT | Full | Full | Full | Full | Full |
| Student | ❌ | ❌ | ❌ | ❌ | View (own) |

### 7.2 Navigation by Role

**Student Portal**
- Available Examinations
- Examination History
- Past Results
- Exam Verification Form

**Academic Portal**
- Question Bank Management
- Examination Creation
- Result Review
- Performance Analytics

**Management Portal**
- CBT Configuration
- Examination Approval
- Security Monitoring
- Institution-wide Analytics

---

## 8. Security Architecture

### 8.1 Security Features

| Feature | Implementation |
|---------|---------------|
| Browser Lockdown | Full-screen mode enforcement |
| Tab Switch Detection | Warning on tab change, logging |
| Session Management | Auto-save every 30 seconds |
| Network Monitoring | Connection status tracking |
| Device Tracking | Browser, OS, IP logging |
| Activity Logging | All user actions recorded |
| Time Synchronization | Server-synced exam timer |
| Exam Encryption | HTTPS transmission |

### 8.2 Anti-Cheating Measures

- Random question order per student
- Random option shuffling
- Tab switch warnings and logging
- Multiple login detection
- Session timeout handling
- Browser close prevention

---

## 9. Approval Workflow

### 9.1 Examination Approval Chain

```
Lecturer Creates Exam
    ↓
Programme Coordinator Reviews
    ↓
HOD Approves
    ↓
Examination Officer Verifies
    ↓
Director CBT Services Publishes
    ↓
Examination Live
```

### 9.2 Question Moderation

- Review question correctness
- Verify curriculum alignment
- Check difficulty appropriateness
- Validate answer options
- Document moderation decisions

---

## 10. ODFeL Compliance

### 10.1 Open Distance Flexible e-Learning Support

- Remote examination access
- Flexible scheduling windows
- Secure online delivery
- Accessibility features
- Participation tracking
- Learning analytics integration

---

## 11. Technical Architecture

### 11.1 Frontend Stack

- **Framework**: Next.js 14 (React)
- **State Management**: Zustand
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion

### 11.2 Key Pages

| Route | Description |
|-------|-------------|
| `/portal/student/cbt` | Student CBT Dashboard |
| `/portal/student/cbt/examination/[id]` | Examination Interface |
| `/portal/management/cbt-director` | Director CBT Dashboard |
| `/portal/academic/*/cbt` | Academic staff CBT pages |

### 11.3 Data Store

- **State**: Zustand store for CBT data
- **Mock Data**: Demo questions, banks, exams, results
- **Production**: Supabase integration ready

---

## 12. Performance Considerations

- Lazy loading for question banks
- Progressive question loading
- Optimistic UI updates
- Session state persistence
- Offline answer caching

---

**Report Version**: 1.0.0
**Last Updated**: 2024