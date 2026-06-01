// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - TYPE DEFINITIONS
// NBTE-Compliant Online Polytechnic ERP System
// =====================================================

// =====================================================
// SECTION 1: USER ROLES & RBAC
// =====================================================

// Centralized User Roles
export type UserRole = 
  // Super Admin
  | 'super_admin'
  // Senior Management (Top Leadership)
  | 'rector'
  | 'deputy_rector_academic'
  | 'deputy_rector_admin'
  // Administrative Officers
  | 'registrar'
  | 'bursar'
  | 'librarian'
  // Directors (Specialized Units)
  | 'director'
  | 'admission_officer'
  | 'examination_officer'
  | 'director_ict'
  | 'director_odfel'
  | 'director_quality_assurance'
  | 'director_cbt_services'
  | 'director_virtual_laboratories'
  | 'director_student_affairs'
  // Academic Staff Roles
  | 'dean'
  | 'hod'
  | 'program_coordinator'
  | 'lecturer'
  // Student & Applicant Roles
  | 'student'
  | 'applicant';

// Role display names for UI
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  super_admin: 'Super Administrator',
  rector: 'Rector',
  deputy_rector_academic: 'Deputy Rector (Academic)',
  deputy_rector_admin: 'Deputy Rector (Administration)',
  registrar: 'Registrar',
  bursar: 'Bursar',
  librarian: 'Polytechnic Librarian',
  director: 'Director',
  admission_officer: 'Admission Officer',
  examination_officer: 'Examination Officer',
  director_ict: 'Director ICT',
  director_odfel: 'Director ODFeL',
  director_quality_assurance: 'Director Quality Assurance',
  director_cbt_services: 'Director CBT Services',
  director_virtual_laboratories: 'Director Virtual Laboratories',
  director_student_affairs: 'Director Student Affairs',
  dean: 'Dean',
  hod: 'Head of Department',
  program_coordinator: 'Programme Coordinator',
  lecturer: 'Lecturer',
  student: 'Student',
  applicant: 'Applicant'
};

// Role categories for grouping
export type RoleCategory = 'management' | 'academic' | 'student' | 'system';

export const ROLE_CATEGORIES: Record<UserRole, RoleCategory> = {
  super_admin: 'system',
  rector: 'management',
  deputy_rector_academic: 'management',
  deputy_rector_admin: 'management',
  registrar: 'management',
  bursar: 'management',
  librarian: 'management',
  director: 'management',
  admission_officer: 'management',
  examination_officer: 'management',
  director_ict: 'management',
  director_odfel: 'management',
  director_quality_assurance: 'management',
  director_cbt_services: 'management',
  director_virtual_laboratories: 'management',
  director_student_affairs: 'management',
  dean: 'academic',
  hod: 'academic',
  program_coordinator: 'academic',
  lecturer: 'academic',
  student: 'student',
  applicant: 'student'
};

// =====================================================
// SECTION 2: BASE INTERFACES
// =====================================================

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isVerified: boolean;
  departmentId?: string;
  facultyId?: string;
  programId?: string;
}

export interface Student extends User {
  role: 'student';
  admissionNumber?: string;
  faculty?: string;
  department?: string;
  program?: string;
  level?: number;
  semester?: number;
  academicStatus: 'active' | 'graduated' | 'suspended' | 'withdrawn';
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  carryovers?: string[];
  cgpa?: number;
}

export interface Lecturer extends User {
  role: 'lecturer';
  employeeId?: string;
  faculty?: string;
  department?: string;
  assignedCourses?: string[];
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  description?: string;
  headName?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  description?: string;
  hodId?: string;
  createdAt: string;
}

export interface Program {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  type: 'diploma' | 'hnd';
  duration: number;
  description?: string;
  requirements?: string;
  careerOpportunities?: string[];
  createdAt: string;
}

export interface Level {
  id: string;
  number: number;
  programId: string;
  description?: string;
}

export interface Semester {
  id: string;
  number: number;
  levelId: string;
  startDate: string;
  endDate: string;
  paymentDeadline: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description?: string;
  unit: number;
  semesterId: string;
  type: 'compulsory' | 'elective';
  lecturerId?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  semesterId: string;
  status: 'active' | 'completed' | 'carryover';
  score?: number;
  grade?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  type: 'semester' | 'full_program';
  semesterId?: string;
  status: 'pending' | 'verified' | 'failed';
  reference?: string;
  paystackRef?: string;
  createdAt: string;
  verifiedAt?: string;
}

// =====================================================
// SECTION 7: EXAMINATION TYPES (Unified CBT)
// =====================================================

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  duration: number;
  totalQuestions: number;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'active' | 'completed';
  instructions?: string;
}

export interface Question {
  id: string;
  examId?: string;
  questionBankId?: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  questionText: string;
  question?: string;
  options?: string[];
  correctAnswer: string | number | string[];
  explanation?: string;
  imageUrl?: string;
  topic?: string;
  marks: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  moderationStatus: 'pending' | 'approved' | 'rejected';
  moderatedBy?: string;
  moderatedAt?: string;
}

export interface ExamAttempt {
  id: string;
  examId?: string;
  sessionId: string;
  examinationId?: string;
  studentId: string;
  attemptNumber: number;
  answers: Record<string, string | number | string[]>;
  startTime?: string;
  endTime?: string;
  score?: number;
  objectiveScore?: number;
  subjectiveScore?: number;
  totalScore?: number;
  percentage?: number;
  grade?: string;
  status: 'in_progress' | 'completed' | 'submitted' | 'graded' | 'published';
  submittedAt?: string;
  gradedAt?: string;
  reviewRequested: boolean;
  reviewComments?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  submissions?: AssignmentSubmission[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  fileUrl?: string;
  submittedAt: string;
  score?: number;
  feedback?: string;
}

export interface Project {
  id: string;
  studentId: string;
  supervisorId?: string;
  title: string;
  description: string;
  stage: 'topic' | 'proposal' | 'chapter' | 'correction' | 'final' | 'graded';
  status: 'pending' | 'in_progress' | 'approved' | 'rejected';
  chapters?: ProjectChapter[];
  finalGrade?: string;
  createdAt: string;
}

export interface ProjectChapter {
  id: string;
  projectId: string;
  chapterNumber: number;
  title: string;
  content: string;
  fileUrl?: string;
  feedback?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'correction';
  submittedAt: string;
  reviewedAt?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  targetAudience: 'all' | 'students' | 'lecturers' | 'specific';
  specificRoles?: UserRole[];
  createdAt: string;
  isPublished: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  type: 'transcript' | 'testimonial' | 'statement' | 'certificate';
  studentId: string;
  content: string;
  generatedAt: string;
  status: 'draft' | 'published';
  verificationCode?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface AdmissionApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  state: string;
  programId: string;
  qualifications?: string;
  personalStatement?: string;
  passportUrl?: string;
  applicationId: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// =====================================================
// SECTION 8: CBT EXAMINATION TYPES
// =====================================================

// Question Bank Types
export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'short_answer' | 'essay' | 'image_based' | 'scenario' | 'practical';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type EntryCategory = 'ND' | 'HND';
export type AcademicStatus = 'regular' | 'carryover' | 'spillover';

// Note: Question interface is defined in Section 7 above

export interface QuestionBank {
  id: string;
  name: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  programmeId: string;
  programmeName: string;
  departmentId: string;
  departmentName: string;
  facultyId: string;
  facultyName: string;
  level: number;
  semester: number;
  entryCategory: EntryCategory;
  totalQuestions: number;
  activeQuestions: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Examination Types
export type ExamStatus = 'draft' | 'pending_approval' | 'approved' | 'published' | 'active' | 'completed' | 'cancelled';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Examination {
  id: string;
  title: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  questionBankId: string;
  programmeId: string;
  programmeName: string;
  departmentId: string;
  departmentName: string;
  facultyId: string;
  facultyName: string;
  level: number;
  semester: number;
  entryCategory: EntryCategory;
  academicStatus: AcademicStatus[];
  
  // Exam Settings
  duration: number; // minutes
  totalQuestions: number;
  passingMarks: number;
  marksPerQuestion: number;
  negativeMarking: boolean;
  negativeMarkingValue: number;
  
  // Timing
  examDate: string;
  startTime: string;
  endTime: string;
  availabilityWindow: number; // minutes before/after
  
  // Attempt Configuration
  maxAttempts: number;
  allowRetake: boolean;
  retakeDelay: number; // hours
  
  // Status & Approval
  status: ExamStatus;
  approvalStatus: ApprovalStatus;
  createdBy: string;
  createdAt: string;
  publishedAt?: string;
  
  // Statistics
  totalAttempts: number;
  avgScore?: number;
  passRate?: number;
}

export interface ExamApproval {
  id: string;
  examinationId: string;
  level: 'lecturer' | 'program_coordinator' | 'hod' | 'examination_officer' | 'director_cbt';
  status: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
  order: number;
}

// Exam Session & Attempts
export interface ExamSession {
  id: string;
  examinationId: string;
  studentId: string;
  admissionNumber: string;
  studentName: string;
  
  // Session Info
  startedAt: string;
  endedAt?: string;
  remainingTime: number; // seconds
  status: 'in_progress' | 'paused' | 'completed' | 'submitted' | 'expired';
  
  // Security
  ipAddress?: string;
  deviceInfo?: string;
  browserInfo?: string;
  
  // Progress
  currentQuestionIndex: number;
  answeredQuestions: number[];
  flaggedQuestions: number[];
  autoSavedAt?: string;
}

// Note: ExamAttempt interface is defined in Section 7 above

// Exam Results & Analytics
export interface ExamResult {
  id: string;
  attemptId: string;
  examinationId: string;
  studentId: string;
  admissionNumber: string;
  studentName: string;
  
  score: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: 'pass' | 'fail';
  
  // Breakdown
  correctAnswers: number;
  wrongAnswers: number;
  unattempted: number;
  
  // Timing
  timeTaken: number; // minutes
  submittedAt: string;
  
  // Published
  isPublished: boolean;
  publishedAt?: string;
}

export interface ExamStatistics {
  examinationId: string;
  totalAttempts: number;
  completedAttempts: number;
  avgScore: number;
  highestScore: number;
  lowestScore: number;
  passCount: number;
  failCount: number;
  passRate: number;
  avgTimeTaken: number;
}

// Exam Security & Logging
export interface SecurityLog {
  id: string;
  sessionId: string;
  eventType: 'login' | 'logout' | 'tab_switch' | 'browser_close' | 'network_error' | 'suspicious_activity' | 'session_expire';
  description: string;
  severity: 'info' | 'warning' | 'critical';
  ipAddress?: string;
  deviceInfo?: string;
  timestamp: string;
}

export interface ExamIncident {
  id: string;
  sessionId: string;
  studentId: string;
  examinationId: string;
  type: 'network_interruption' | 'browser_crash' | 'session_timeout' | 'multiple_login' | 'malpractice';
  description: string;
  resolution?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  status: 'open' | 'investigating' | 'resolved';
}

// Student Exam Eligibility
export interface ExamEligibility {
  studentId: string;
  examinationId: string;
  isEligible: boolean;
  reasons: string[];
  paymentVerified: boolean;
  registrationVerified: boolean;
  prerequisiteCompleted: boolean;
  notAttempted: boolean;
}

// Exam Verification Form
export interface ExamVerificationForm {
  // Personal Information
  fullName: string;
  admissionNumber: string;
  studentEmail: string;
  phoneNumber: string;
  
  // Academic Information
  entryCategory: EntryCategory;
  facultyId: string;
  facultyName: string;
  departmentId: string;
  departmentName: string;
  programmeId: string;
  programmeName: string;
  level: number;
  semester: number;
  
  // Academic Status
  academicStatus: AcademicStatus;
  
  // Verification
  studentPhoto?: string;
  isVerified: boolean;
  verifiedAt?: string;
}

// Question Moderation
export interface QuestionModeration {
  id: string;
  questionId: string;
  reviewedBy: string;
  reviewedAt: string;
  correctness: 'correct' | 'incorrect' | 'needs_revision';
  curriculumAlignment: 'aligned' | 'misaligned';
  difficultyLevel: DifficultyLevel;
  comments?: string;
  recommendations?: string;
}