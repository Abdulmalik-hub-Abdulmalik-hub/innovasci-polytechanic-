# LEARNING RESOURCE ARCHITECTURE REPORT

**InnovaSci AI Labs Polytechnic**
**Learning Resource Access Engine**

---

## 1. System Overview

### 1.1 Purpose
The Learning Resource Access Engine provides curriculum-driven access to all academic learning materials within the Student Portal, ensuring students can only access resources relevant to their enrolled programme, level, and semester.

### 1.2 Architecture Principles
- **Curriculum-First**: All learning resources are mapped to the existing seeded curriculum structure
- **Programme-Driven**: Resources are filtered based on student's programme enrollment
- **Verified Access**: Student identity and enrollment are verified before resource access
- **Single Source of Truth**: One unified system for all learning content delivery

---

## 2. Curriculum Integration

### 2.1 Data Flow
```
Student Record → Programme → Level → Semester → Course → Learning Resources
```

### 2.2 Academic Structure
- **5 Faculties**: Schools of AI, Engineering, Business, Applied Sciences, Cybersecurity
- **15 Departments**: Mapped to faculties
- **45 Programmes**: ND and HND programmes
- **Levels**: ND1-ND2, HND1-HND2
- **Semesters**: 1-2 per level
- **Courses**: Programme-specific courses

---

## 3. Resource Types

### 3.1 Video Content
| Type | Format | Features |
|------|--------|----------|
| Recorded Lectures | MP4, WebM | Streaming, progress tracking |
| Course Tutorials | MP4 | Chapters, transcripts |
| Demonstration Videos | MP4 | Full-screen support |

### 3.2 Document Content
| Type | Format | Features |
|------|--------|----------|
| Lecture Notes | PDF | Download, print |
| Slides | PPTX, PDF | Download |
| Lab Manuals | PDF | Download |
| E-books | PDF, EPUB | Online reading |

### 3.3 Audio Content
| Type | Format | Features |
|------|--------|----------|
| Audio Lectures | MP3 | Streaming, download |
| Podcasts | MP3 | Offline access |

### 3.4 Interactive Content
| Type | Description |
|------|-------------|
| Assignments | File/text submission |
| Projects | Phased submissions |
| Quizzes | CBT integration ready |

---

## 4. Student Verification Workflow

### 4.1 Verification Steps
1. **Login**: Authenticate student credentials
2. **Profile Load**: Retrieve student record
3. **Enrollment Check**: Verify active enrollment
4. **Programme Validation**: Confirm programme registration
5. **Resource Filtering**: Display only relevant courses

### 4.2 Auto-Retrieved Data
- Full Name (from student record)
- Admission Number (from student record)
- Faculty (from student record)
- Department (from student record)
- Programme (from student record)
- Entry Category (ND/HND)
- Level (from student record)
- Semester (from student record)

---

## 5. Course Loading System

### 5.1 Filter Logic
```javascript
Courses.filter(course => 
  course.programmeId === student.programmeId &&
  course.level === student.level &&
  course.semester === student.semester
)
```

### 5.2 Display Rules
- Only enrolled programme courses shown
- Only current level courses shown
- Only current semester courses shown
- No manual programme/level/semester selection needed

---

## 6. Technical Architecture

### 6.1 Frontend Stack
- **Framework**: Next.js 14 (React)
- **State Management**: React hooks
- **UI**: Tailwind CSS + Lucide icons
- **Routing**: App Router

### 6.2 Key Pages
| Route | Purpose |
|-------|---------|
| /portal/student/learning | Main learning portal |
| /portal/student/learning/courses | Course listing |
| /portal/student/learning/videos | Video library |
| /portal/student/learning/documents | Document repository |

### 6.3 Component Structure
```
StudentLearningPortal
├── StudentVerificationBanner
├── StatsOverview
├── TabNavigation
├── CoursesTab
├── VideosTab
├── DocumentsTab
├── AssignmentsTab
├── NotesTab
└── AnalyticsTab
```

---

## 7. Data Models

### 7.1 Learning Resource
```typescript
{
  id: string;
  courseId: string;
  title: string;
  type: 'video' | 'audio' | 'pdf' | 'slides';
  url: string;
  duration?: number;
  downloads: number;
  views: number;
}
```

### 7.2 Student Profile
```typescript
{
  id: string;
  admissionNumber: string;
  facultyId: string;
  departmentId: string;
  programmeId: string;
  level: number;
  semester: number;
  academicStatus: 'active';
}
```

---

## 8. Integration Points

### 8.1 CBT Integration
- Assignments linked to CBT examination system
- Progress tracked across both systems

### 8.2 Academic Records
- Grades integrated with learning progress
- Attendance linked to video views

### 8.3 ODFeL Support
- Remote access to all resources
- Flexible learning schedule
- Progress synchronization

---

**Report Version**: 1.0.0
**Last Updated**: 2024