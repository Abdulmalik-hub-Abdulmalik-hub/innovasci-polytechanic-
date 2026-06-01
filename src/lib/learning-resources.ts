// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - LEARNING RESOURCE ENGINE
// Curriculum-Driven Learning Resource Access System
// =====================================================

import { SEEDED_FACULTIES, SEEDED_DEPARTMENTS, SEEDED_PROGRAMMES, PROGRAMME_COURSES, Programme, Course } from './academic-data';

// =====================================================
// SECTION 1: LEARNING RESOURCE TYPES
// =====================================================

export type ResourceType = 
  | 'video'
  | 'audio'
  | 'pdf'
  | 'slides'
  | 'document'
  | 'ebook'
  | 'link'
  | 'assignment'
  | 'project';

export type ContentFormat = 
  | 'mp4'
  | 'webm'
  | 'mp3'
  | 'pdf'
  | 'pptx'
  | 'docx'
  | 'txt'
  | 'html';

export interface LearningResource {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  type: ResourceType;
  format: ContentFormat;
  url: string;
  duration?: number; // minutes for video/audio
  fileSize?: number; // bytes
  downloads: number;
  views: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isPremium: boolean;
  tags: string[];
  thumbnail?: string;
}

export interface VideoLecture extends LearningResource {
  type: 'video';
  duration: number;
  thumbnail: string;
  transcript?: string;
  chapters?: VideoChapter[];
  playbackSpeedOptions: number[];
}

export interface VideoChapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
}

export interface AudioLecture extends LearningResource {
  type: 'audio';
  duration: number;
  transcript?: string;
  transcriptUrl?: string;
}

export interface DocumentResource extends LearningResource {
  type: 'pdf' | 'slides' | 'document';
  pageCount?: number;
  canPrint: boolean;
  canDownload: boolean;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  maxScore: number;
  submissionType: 'file' | 'text' | 'both';
  allowedFileTypes: string[];
  maxFileSize: number;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded' | 'returned';
  submissionId?: string;
  score?: number;
  feedback?: string;
  submittedAt?: string;
  gradedAt?: string;
}

export interface Project {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  maxScore: number;
  phases?: ProjectPhase[];
  status: 'not_started' | 'in_progress' | 'submitted' | 'defended';
  submissionId?: string;
  score?: number;
  feedback?: string;
}

export interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'approved';
  submissionId?: string;
}

// =====================================================
// SECTION 2: STUDENT NOTES & HIGHLIGHTS
// =====================================================

export interface StudentNote {
  id: string;
  studentId: string;
  courseId: string;
  courseCode: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TextHighlight {
  id: string;
  studentId: string;
  courseId: string;
  resourceId: string;
  startOffset: number;
  endOffset: number;
  selectedText: string;
  note?: string;
  color: 'yellow' | 'green' | 'blue' | 'pink' | 'orange';
  createdAt: string;
}

export interface Bookmark {
  id: string;
  studentId: string;
  courseId: string;
  resourceId: string;
  position: number;
  title: string;
  createdAt: string;
}

// =====================================================
// SECTION 3: STUDENT PROFILE & VERIFICATION
// =====================================================

export interface StudentProfile {
  id: string;
  admissionNumber: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  
  // Academic Info (auto-loaded from student record)
  facultyId: string;
  facultyName: string;
  departmentId: string;
  departmentName: string;
  programmeId: string;
  programmeName: string;
  programmeCode: string;
  entryCategory: 'ND' | 'HND';
  level: number;
  semester: number;
  academicStatus: 'active' | 'graduated' | 'suspended' | 'withdrawn';
  
  // Enrollment
  enrollmentYear: number;
  currentSession: string;
  currentSemester: number;
  
  // Stats
  cgpa?: number;
  totalCreditsEarned?: number;
  totalCreditsRequired?: number;
}

export interface CourseEnrollment {
  id: string;
  studentId: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  credits: number;
  semester: number;
  level: number;
  enrollmentDate: string;
  status: 'registered' | 'completed' | 'failed' | 'in_progress';
  grade?: string;
  score?: number;
}

// =====================================================
// SECTION 4: LEARNING ANALYTICS
// =====================================================

export interface LearningActivity {
  id: string;
  studentId: string;
  courseId: string;
  resourceId?: string;
  activityType: 'view' | 'download' | 'note_created' | 'highlight' | 'bookmark' | 'assignment_submit' | 'video_watch';
  duration?: number; // seconds
  timestamp: string;
}

export interface LearningStatistics {
  studentId: string;
  totalLearningTime: number; // minutes
  coursesAccessed: number;
  totalCourses: number;
  videosWatched: number;
  totalVideos: number;
  documentsDownloaded: number;
  notesCreated: number;
  assignmentsSubmitted: number;
  totalAssignments: number;
  averageProgress: number; // percentage
  weeklyProgress: WeeklyProgress[];
  lastActive: string;
}

export interface WeeklyProgress {
  week: string;
  learningMinutes: number;
  activitiesCount: number;
  coursesAccessed: number;
}

// =====================================================
// SECTION 5: CURRICULUM-DRIVEN COURSE LOADER
// =====================================================

export interface CurriculumCourse {
  id: string;
  code: string;
  title: string;
  credits: number;
  semester: number;
  level: number;
  type: 'compulsory' | 'elective';
  lecturerName?: string;
  resources?: LearningResource[];
  assignments?: Assignment[];
  projects?: Project[];
}

/**
 * Get courses for a student based on their programme, level, and semester
 */
export function getStudentCourses(student: StudentProfile): CurriculumCourse[] {
  const programme = SEEDED_PROGRAMMES.find(p => p.id === student.programmeId);
  if (!programme) return [];

  const courses = PROGRAMME_COURSES[programme.code] || [];
  
  return courses
    .filter(course => 
      course.semester === student.semester && 
      course.level === student.level
    )
    .map(course => ({
      id: course.id,
      code: course.code,
      title: course.title,
      credits: course.credits,
      semester: course.semester,
      level: course.level,
      type: course.type,
      lecturerName: course.lecturerName,
      resources: [],
      assignments: [],
      projects: [],
    }));
}

/**
 * Verify student academic standing
 */
export function verifyStudentAccess(student: StudentProfile): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (student.academicStatus !== 'active') {
    errors.push(`Student is not active (status: ${student.academicStatus})`);
  }

  if (student.level < 1 || student.level > 4) {
    errors.push(`Invalid level: ${student.level}`);
  }

  if (student.semester < 1 || student.semester > 2) {
    errors.push(`Invalid semester: ${student.semester}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// =====================================================
// SECTION 6: DEMO LEARNING RESOURCES
// =====================================================

export const DEMO_VIDEO_LECTURES: VideoLecture[] = [
  {
    id: 'vid1',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'Introduction to Matrices',
    description: 'Learn the fundamentals of matrix operations and their applications in AI',
    type: 'video',
    format: 'mp4',
    url: '/videos/matrices-intro.mp4',
    duration: 45,
    thumbnail: '/thumbnails/matrices.jpg',
    views: 245,
    downloads: 0,
    createdBy: 'l1',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    isActive: true,
    isPremium: false,
    tags: ['matrix', 'algebra', 'basics'],
    playbackSpeedOptions: [0.5, 0.75, 1, 1.25, 1.5, 2],
    chapters: [
      { id: 'ch1', title: 'What is a Matrix?', startTime: 0, endTime: 600 },
      { id: 'ch2', title: 'Matrix Operations', startTime: 600, endTime: 1800 },
      { id: 'ch3', title: 'Applications in AI', startTime: 1800, endTime: 2700 },
    ],
  },
  {
    id: 'vid2',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'Eigenvalues and Eigenvectors',
    description: 'Understanding eigenvalues and eigenvectors and their importance in machine learning',
    type: 'video',
    format: 'mp4',
    url: '/videos/eigenvalues.mp4',
    duration: 60,
    thumbnail: '/thumbnails/eigenvalues.jpg',
    views: 189,
    downloads: 0,
    createdBy: 'l1',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    isActive: true,
    isPremium: false,
    tags: ['eigenvalues', 'eigenvectors', 'advanced'],
    playbackSpeedOptions: [0.5, 0.75, 1, 1.25, 1.5, 2],
  },
];

export const DEMO_DOCUMENTS: DocumentResource[] = [
  {
    id: 'doc1',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'Lecture Notes - Week 1',
    description: 'Comprehensive lecture notes covering matrix fundamentals',
    type: 'pdf',
    format: 'pdf',
    url: '/documents/aml111-week1.pdf',
    pageCount: 25,
    downloads: 156,
    views: 342,
    createdBy: 'l1',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    isActive: true,
    isPremium: false,
    tags: ['notes', 'week1', 'matrices'],
    canPrint: true,
    canDownload: true,
  },
  {
    id: 'doc2',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'Slides - Matrix Operations',
    description: 'Presentation slides for matrix operations lecture',
    type: 'slides',
    format: 'pptx',
    url: '/documents/aml111-matrix-ops.pptx',
    pageCount: 35,
    downloads: 89,
    views: 201,
    createdBy: 'l1',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    isActive: true,
    isPremium: false,
    tags: ['slides', 'presentation'],
    canPrint: true,
    canDownload: true,
  },
  {
    id: 'doc3',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'Lab Manual - Practical 1',
    description: 'Hands-on lab exercises for linear algebra',
    type: 'document',
    format: 'pdf',
    url: '/documents/aml111-lab1.pdf',
    pageCount: 15,
    downloads: 234,
    views: 456,
    createdBy: 'l1',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    isActive: true,
    isPremium: false,
    tags: ['lab', 'practical', 'exercises'],
    canPrint: true,
    canDownload: true,
  },
];

export const DEMO_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg1',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'Assignment 1: Matrix Operations',
    description: 'Solve the given matrix operation problems',
    instructions: 'Complete all 10 questions. Show all working steps. Submit as PDF.',
    dueDate: '2024-06-20',
    maxScore: 100,
    submissionType: 'file',
    allowedFileTypes: ['pdf', 'docx'],
    maxFileSize: 10485760, // 10MB
    status: 'not_started',
  },
  {
    id: 'asg2',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'Assignment 2: Eigenvalues',
    description: 'Calculate eigenvalues and eigenvectors for given matrices',
    instructions: 'Submit handwritten solutions or typed document.',
    dueDate: '2024-06-27',
    maxScore: 100,
    submissionType: 'both',
    allowedFileTypes: ['pdf', 'jpg', 'png', 'docx'],
    maxFileSize: 52428800, // 50MB
    status: 'in_progress',
  },
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'proj1',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    title: 'AI Application Project',
    description: 'Develop a simple AI model using linear algebra concepts',
    requirements: 'Implement a neural network from scratch using only matrix operations. Submit code and report.',
    deadline: '2024-07-15',
    maxScore: 200,
    status: 'not_started',
    phases: [
      { id: 'ph1', title: 'Research', description: 'Research neural network basics', dueDate: '2024-06-30', status: 'pending' },
      { id: 'ph2', title: 'Implementation', description: 'Code the neural network', dueDate: '2024-07-10', status: 'pending' },
      { id: 'ph3', title: 'Documentation', description: 'Write project report', dueDate: '2024-07-15', status: 'pending' },
    ],
  },
];

// =====================================================
// SECTION 7: DEMO STUDENT PROFILE
// =====================================================

export const DEMO_STUDENT_PROFILE: StudentProfile = {
  id: 'student1',
  admissionNumber: 'INS/ND/AML/2024/0001',
  studentId: 'STU20240001',
  fullName: 'Chidi Okonkwo',
  email: 'chidi.okonkwo@isa.edu.ng',
  phone: '+2348012345678',
  facultyId: 'f1',
  facultyName: 'School of AI & Computational Intelligence',
  departmentId: 'd1',
  departmentName: 'Artificial Intelligence & Machine Learning',
  programmeId: 'p1',
  programmeName: 'Applied Machine Learning',
  programmeCode: 'AML',
  entryCategory: 'ND',
  level: 1,
  semester: 1,
  academicStatus: 'active',
  enrollmentYear: 2024,
  currentSession: '2023/2024',
  currentSemester: 1,
  cgpa: 3.75,
  totalCreditsEarned: 15,
  totalCreditsRequired: 60,
};

// =====================================================
// SECTION 8: GET ALL RESOURCES FOR COURSE
// =====================================================

export function getCourseResources(courseId: string): {
  videos: VideoLecture[];
  documents: DocumentResource[];
  assignments: Assignment[];
  projects: Project[];
} {
  return {
    videos: DEMO_VIDEO_LECTURES.filter(v => v.courseId === courseId),
    documents: DEMO_DOCUMENTS.filter(d => d.courseId === courseId),
    assignments: DEMO_ASSIGNMENTS.filter(a => a.courseId === courseId),
    projects: DEMO_PROJECTS.filter(p => p.courseId === courseId),
  };
}

export function getAllCourseResources(): {
  videos: VideoLecture[];
  documents: DocumentResource[];
} {
  return {
    videos: DEMO_VIDEO_LECTURES,
    documents: DEMO_DOCUMENTS,
  };
}

// All functions are exported inline above