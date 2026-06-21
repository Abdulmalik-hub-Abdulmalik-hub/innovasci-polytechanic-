// =====================================================
// INNOVASCI OPEN UNIVERSITY - TYPE DEFINITIONS
// Multi-Portal University Management System
// =====================================================

// =====================================================
// SECTION 1: USER ROLES & PORTAL STRUCTURE
// =====================================================

// Portal-specific roles - strictly separated
export type ManagementPortalRole = 
  // System
  | 'super_admin'
  // Executive Leadership
  | 'vice_chancellor'
  | 'deputy_vc_academic'
  | 'deputy_vc_admin'
  | 'deputy_vc_research'
  | 'rector'
  | 'deputy_rector_academic'
  | 'deputy_rector_admin'
  // Administrative Officers
  | 'registrar'
  | 'bursar'
  | 'librarian'
  // Directors
  | 'director'
  | 'director_admission'
  | 'director_examination'
  | 'director_study_centre'
  | 'director_lss'
  | 'director_odfel'
  | 'director_ict'
  | 'director_quality_assurance'
  | 'director_student_welfare'
  | 'director_research'
  | 'director_cbt_services'
  | 'director_virtual_laboratories'
  | 'director_student_affairs'
  // Officers
  | 'admission_officer'
  | 'examination_officer';

export type AcademicPortalRole =
  // School-level Leadership
  | 'dean'
  | 'dean_undergraduate'
  | 'dean_postgraduate'
  // Department Leadership
  | 'hod'
  | 'head_of_department'
  // Programme Leadership
  | 'program_coordinator'
  | 'programme_coordinator_bsc'
  | 'programme_coordinator_pgd'
  | 'programme_coordinator_msc'
  | 'programme_coordinator_phd'
  // Academic Staff
  | 'lecturer'
  | 'e_tutor'
  | 'instructional_designer'
  | 'supervisor'
  | 'research_fellow';

// Combined type for all roles
export type UserRole = ManagementPortalRole | AcademicPortalRole | 'student' | 'applicant';

// Portal classification
export type PortalType = 'management' | 'academic' | 'student' | 'applicant' | 'admin';

export const ROLE_TO_PORTAL: Record<UserRole, PortalType> = {
  // Super Admin Portal
  super_admin: 'admin',
  
  // Management Portal
  vice_chancellor: 'management',
  deputy_vc_academic: 'management',
  deputy_vc_admin: 'management',
  deputy_vc_research: 'management',
  rector: 'management',
  deputy_rector_academic: 'management',
  deputy_rector_admin: 'management',
  registrar: 'management',
  bursar: 'management',
  librarian: 'management',
  director: 'management',
  director_admission: 'management',
  director_examination: 'management',
  director_study_centre: 'management',
  director_lss: 'management',
  director_odfel: 'management',
  director_ict: 'management',
  director_quality_assurance: 'management',
  director_student_welfare: 'management',
  director_research: 'management',
  director_cbt_services: 'management',
  director_virtual_laboratories: 'management',
  director_student_affairs: 'management',
  admission_officer: 'management',
  examination_officer: 'management',
  
  // Academic Portal
  dean: 'academic',
  dean_undergraduate: 'academic',
  dean_postgraduate: 'academic',
  hod: 'academic',
  head_of_department: 'academic',
  program_coordinator: 'academic',
  programme_coordinator_bsc: 'academic',
  programme_coordinator_pgd: 'academic',
  programme_coordinator_msc: 'academic',
  programme_coordinator_phd: 'academic',
  lecturer: 'academic',
  e_tutor: 'academic',
  instructional_designer: 'academic',
  supervisor: 'academic',
  research_fellow: 'academic',
  
  // Student Portal
  student: 'student',
  applicant: 'applicant'
};

// Role display names for UI
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  // Management Portal
  super_admin: 'Super Administrator',
  vice_chancellor: 'Vice-Chancellor',
  deputy_vc_academic: 'Deputy VC (Academic)',
  deputy_vc_admin: 'Deputy VC (Administration)',
  deputy_vc_research: 'Deputy VC (Research)',
  rector: 'Rector',
  deputy_rector_academic: 'Deputy Rector (Academic)',
  deputy_rector_admin: 'Deputy Rector (Administration)',
  registrar: 'Registrar',
  bursar: 'Bursar',
  librarian: 'Librarian',
  director: 'Director',
  director_admission: 'Director of Admission',
  director_examination: 'Director of Examination',
  director_study_centre: 'Director of Study Centre',
  director_lss: 'Director of Library & Student Services',
  director_odfel: 'Director of ODFeL',
  director_ict: 'Director of ICT',
  director_quality_assurance: 'Director of Quality Assurance',
  director_student_welfare: 'Director of Student Welfare',
  director_research: 'Director of Research',
  director_cbt_services: 'Director of CBT Services',
  director_virtual_laboratories: 'Director of Virtual Laboratories',
  director_student_affairs: 'Director of Student Affairs',
  admission_officer: 'Admission Officer',
  examination_officer: 'Examination Officer',
  
  // Academic Portal
  dean: 'Dean',
  dean_undergraduate: 'Dean (Undergraduate Studies)',
  dean_postgraduate: 'Dean (Postgraduate Studies)',
  hod: 'Head of Department',
  head_of_department: 'Head of Department',
  program_coordinator: 'Programme Coordinator',
  programme_coordinator_bsc: 'Programme Coordinator (BSc)',
  programme_coordinator_pgd: 'Programme Coordinator (PGD)',
  programme_coordinator_msc: 'Programme Coordinator (MSc)',
  programme_coordinator_phd: 'Programme Coordinator (PhD)',
  lecturer: 'Lecturer',
  e_tutor: 'E-Tutor',
  instructional_designer: 'Instructional Designer',
  supervisor: 'Supervisor',
  research_fellow: 'Research Fellow',
  
  // Student Portal
  student: 'Student',
  applicant: 'Applicant'
};

// Role hierarchy for permission levels
export type RoleHierarchy = 'super' | 'executive' | 'director' | 'dean' | 'hod' | 'coordinator' | 'staff' | 'tutor' | 'student';

export const ROLE_HIERARCHY_MAP: Record<UserRole, RoleHierarchy> = {
  // Management Portal
  super_admin: 'super',
  vice_chancellor: 'executive',
  deputy_vc_academic: 'executive',
  deputy_vc_admin: 'executive',
  deputy_vc_research: 'executive',
  rector: 'executive',
  deputy_rector_academic: 'executive',
  deputy_rector_admin: 'executive',
  registrar: 'executive',
  bursar: 'executive',
  librarian: 'director',
  director: 'director',
  director_admission: 'director',
  director_examination: 'director',
  director_study_centre: 'director',
  director_lss: 'director',
  director_odfel: 'director',
  director_ict: 'director',
  director_quality_assurance: 'director',
  director_student_welfare: 'director',
  director_research: 'director',
  director_cbt_services: 'director',
  director_virtual_laboratories: 'director',
  director_student_affairs: 'director',
  admission_officer: 'staff',
  examination_officer: 'staff',
  
  // Academic Portal
  dean: 'dean',
  dean_undergraduate: 'dean',
  dean_postgraduate: 'dean',
  hod: 'hod',
  head_of_department: 'hod',
  program_coordinator: 'coordinator',
  programme_coordinator_bsc: 'coordinator',
  programme_coordinator_pgd: 'coordinator',
  programme_coordinator_msc: 'coordinator',
  programme_coordinator_phd: 'coordinator',
  lecturer: 'staff',
  e_tutor: 'tutor',
  instructional_designer: 'staff',
  supervisor: 'staff',
  research_fellow: 'staff',
  
  // Student Portal
  student: 'student',
  applicant: 'student'
};

// =====================================================
// SECTION 2: BASE INTERFACES
// =====================================================

// Base User Interface with Academic Assignments
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
  portal: PortalType;
  // Academic assignment fields (for deans, hods, programme coordinators)
  schoolId?: string;
  schoolName?: string;
  facultyId?: string;  // Alias for schoolId (used interchangeably in the system)
  facultyName?: string;  // Alias for schoolName (used interchangeably in the system)
  departmentId?: string;
  departmentName?: string;
  programmeId?: string;
  programmeName?: string;
  degreeType?: ProgrammeType;
}

export interface Student extends User {
  role: 'student';
  admissionNumber?: string;
  school?: string;
  department?: string;
  programme?: string;
  degreeType?: ProgrammeType;
  level?: number;
  semester?: number;
  academicStatus: 'active' | 'graduated' | 'suspended' | 'withdrawn';
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  carryovers?: string[];
  cgpa?: number;
}

export interface AcademicStaff extends User {
  role: AcademicPortalRole;
  employeeId?: string;
  school?: string;
  department?: string;
  specialization?: string;
  qualifications?: string[];
}

export type ProgrammeType = 'bsc' | 'pgd' | 'msc' | 'phd';
export type EntryCategory = 'ND' | 'HND';  // National Diploma and Higher National Diploma
export type SchoolType = 'undergraduate' | 'postgraduate';

export interface School {
  id: string;
  name: string;
  code: string;
  type: SchoolType;
  deanId?: string;
  description?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  schoolId: string;
  description?: string;
  hodId?: string;
  createdAt: string;
}

export interface Programme {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  type: ProgrammeType;
  duration: number;
  description?: string;
  requirements?: string;
  careerOpportunities?: string[];
  coordinatorId?: string;
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
export type AcademicStatus = 'regular' | 'carryover' | 'spillover' | 'makeup';

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
  schoolId: string;
  schoolName: string;
  level: number;
  semester: number;
  programmeType: ProgrammeType;
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
  schoolId: string;
  schoolName: string;
  level: number;
  semester: number;
  programmeType: ProgrammeType;
  academicStatus: AcademicStatus[];
  entryCategory?: EntryCategory;  // Optional: ND or HND
  
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
  programmeType: ProgrammeType;
  schoolId: string;
  schoolName: string;
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
