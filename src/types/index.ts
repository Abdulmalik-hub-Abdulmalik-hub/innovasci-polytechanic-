export type UserRole = 
  | 'super_admin'
  | 'system_admin'
  | 'admission_officer'
  | 'finance_officer'
  | 'exam_officer'
  | 'student_affairs'
  | 'hod'
  | 'lecturer'
  | 'student';

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
  examId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  marks: number;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  answers: Record<string, number>;
  startTime: string;
  endTime?: string;
  score?: number;
  status: 'in_progress' | 'completed' | 'submitted';
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