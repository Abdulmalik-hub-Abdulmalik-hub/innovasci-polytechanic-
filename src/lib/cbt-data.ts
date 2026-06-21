// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - CBT DATA STORE
// Computer-Based Testing Examination Engine
// =====================================================

import { create } from 'zustand';
import { 
  Examination, 
  Question, 
  QuestionBank, 
  ExamSession, 
  ExamAttempt, 
  ExamResult, 
  ExamStatistics,
  SecurityLog,
  ExamIncident,
  ExamEligibility,
  QuestionType,
  DifficultyLevel,
  EntryCategory,
  AcademicStatus
} from '@/types';
import { SEEDED_PROGRAMMES, SEEDED_DEPARTMENTS, SEEDED_FACULTIES, PROGRAMME_COURSES } from './academic-data';

// Demo CBT Data Store

interface CBTState {
  // Question Banks
  questionBanks: QuestionBank[];
  questions: Question[];
  
  // Examinations
  examinations: Examination[];
  examSessions: ExamSession[];
  examAttempts: ExamAttempt[];
  examResults: ExamResult[];
  examStatistics: Map<string, ExamStatistics>;
  
  // Security
  securityLogs: SecurityLog[];
  incidents: ExamIncident[];
  
  // Student Eligibility
  eligibilityCache: Map<string, ExamEligibility>;
  
  // Actions
  getExaminationsByStudent: (studentId: string, programmeId: string, level: number, semester: number) => Examination[];
  getEligibleExaminations: (studentId: string, programmeId: string, level: number, semester: number, academicStatus: AcademicStatus) => Examination[];
  startExam: (examinationId: string, studentId: string, admissionNumber: string, studentName: string) => ExamSession;
  saveAnswer: (sessionId: string, questionIndex: number, answer: string | number | string[]) => void;
  submitExam: (sessionId: string) => ExamAttempt;
  getExamStatistics: (examinationId: string) => ExamStatistics | undefined;
  logSecurityEvent: (sessionId: string, eventType: SecurityLog['eventType'], description: string, severity: SecurityLog['severity']) => void;
  createIncident: (sessionId: string, studentId: string, examinationId: string, type: ExamIncident['type'], description: string) => ExamIncident;
}

// Demo questions for AML course
const demoQuestions: Question[] = [
  // Multiple Choice
  { id: 'q1', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'multiple_choice', difficulty: 'easy', questionText: 'What is the determinant of a 2x2 matrix [[a,b],[c,d]]?', options: ['a+d', 'ad-bc', 'ab-cd', 'a*d'], correctAnswer: 1, marks: 2, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  { id: 'q2', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'multiple_choice', difficulty: 'medium', questionText: 'Which of the following is NOT a property of eigenvalues?', options: ['Product of eigenvalues = determinant', 'Sum of eigenvalues = trace', 'All eigenvalues are always positive', 'Eigenvalues can be complex'], correctAnswer: 2, marks: 2, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  { id: 'q3', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'multiple_choice', difficulty: 'hard', questionText: 'For a symmetric matrix A, which statement is TRUE?', options: ['A has only real eigenvalues', 'A is always positive definite', 'A has zero determinant', 'A has complex eigenvalues'], correctAnswer: 0, marks: 3, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  
  // True/False
  { id: 'q4', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'true_false', difficulty: 'easy', questionText: 'The transpose of a matrix A is denoted by A^T.', correctAnswer: 'true', marks: 1, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  { id: 'q5', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'true_false', difficulty: 'medium', questionText: 'A square matrix with all zeros is considered an identity matrix.', correctAnswer: 'false', marks: 1, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  
  // Fill in the Blank
  { id: 'q6', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'fill_blank', difficulty: 'medium', questionText: 'The identity matrix I has 1s on the ____ and 0s elsewhere.', correctAnswer: 'diagonal', marks: 2, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  { id: 'q7', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'fill_blank', difficulty: 'hard', questionText: 'The rank of a matrix represents the number of ____ linearly independent rows or columns.', correctAnswer: 'linearly', marks: 2, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  
  // Short Answer
  { id: 'q8', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'short_answer', difficulty: 'medium', questionText: 'Define what an eigenvalue is in your own words.', correctAnswer: 'A scalar λ such that Av = λv for some non-zero vector v', marks: 5, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  
  // Essay
  { id: 'q9', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'essay', difficulty: 'hard', questionText: 'Explain the relationship between eigenvectors and eigenvalues. Provide an example of how eigenvalues are used in machine learning applications.', correctAnswer: '', marks: 10, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
  
  // Scenario
  { id: 'q10', questionBankId: 'qb1', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', type: 'scenario', difficulty: 'hard', questionText: 'You are working on a facial recognition system. The system needs to reduce the dimensionality of image data from 1000 dimensions to 50 dimensions. How would you use eigenvalues and eigenvectors to solve this problem? Explain your approach.', correctAnswer: '', marks: 15, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15', isActive: true, moderationStatus: 'approved' },
];

// Demo Question Banks
const demoQuestionBanks: QuestionBank[] = [
  { id: 'qb1', name: 'AML 111 - Linear Algebra for AI Question Bank', courseId: 'c1', courseCode: 'AML 111', courseTitle: 'Linear Algebra for AI', programmeId: 'p1', programmeName: 'Applied Machine Learning', departmentId: 'd1', departmentName: 'Artificial Intelligence & Machine Learning', schoolId: 'f1', schoolName: 'School of AI & Computational Intelligence', level: 1, semester: 1, programmeType: 'bsc', totalQuestions: 10, activeQuestions: 10, createdBy: 'l1', createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: 'qb2', name: 'AML 121 - Machine Learning Fundamentals Question Bank', courseId: 'c6', courseCode: 'AML 121', courseTitle: 'Machine Learning Fundamentals', programmeId: 'p1', programmeName: 'Applied Machine Learning', departmentId: 'd1', departmentName: 'Artificial Intelligence & Machine Learning', schoolId: 'f1', schoolName: 'School of AI & Computational Intelligence', level: 1, semester: 2, programmeType: 'bsc', totalQuestions: 15, activeQuestions: 15, createdBy: 'l2', createdAt: '2024-01-20', updatedAt: '2024-01-20' },
];

// Demo Examinations
const demoExaminations: Examination[] = [
  {
    id: 'exam1',
    title: 'AML 111 - Linear Algebra Mid-Term Examination',
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    questionBankId: 'qb1',
    programmeId: 'p1',
    programmeName: 'Applied Machine Learning',
    departmentId: 'd1',
    departmentName: 'Artificial Intelligence & Machine Learning',
    schoolId: 'f1',
    schoolName: 'School of AI & Computational Intelligence',
    level: 1,
    semester: 1,
    programmeType: 'bsc',
    entryCategory: 'ND',
    academicStatus: ['regular', 'carryover', 'spillover'],
    duration: 60,
    totalQuestions: 10,
    passingMarks: 50,
    marksPerQuestion: 10,
    negativeMarking: false,
    negativeMarkingValue: 0,
    examDate: '2024-06-15',
    startTime: '09:00',
    endTime: '10:00',
    availabilityWindow: 30,
    maxAttempts: 1,
    allowRetake: false,
    retakeDelay: 0,
    status: 'published',
    approvalStatus: 'approved',
    createdBy: 'l1',
    createdAt: '2024-05-01',
    publishedAt: '2024-05-15',
    totalAttempts: 45,
    avgScore: 72.5,
    passRate: 85
  },
  {
    id: 'exam2',
    title: 'AML 121 - Machine Learning Fundamentals Examination',
    courseId: 'c6',
    courseCode: 'AML 121',
    courseTitle: 'Machine Learning Fundamentals',
    questionBankId: 'qb2',
    programmeId: 'p1',
    programmeName: 'Applied Machine Learning',
    departmentId: 'd1',
    departmentName: 'Artificial Intelligence & Machine Learning',
    schoolId: 'f1',
    schoolName: 'School of AI & Computational Intelligence',
    level: 1,
    semester: 2,
    programmeType: 'bsc',
    entryCategory: 'ND',
    academicStatus: ['regular'],
    duration: 90,
    totalQuestions: 15,
    passingMarks: 50,
    marksPerQuestion: 10,
    negativeMarking: true,
    negativeMarkingValue: 0.25,
    examDate: '2024-06-20',
    startTime: '14:00',
    endTime: '15:30',
    availabilityWindow: 30,
    maxAttempts: 2,
    allowRetake: true,
    retakeDelay: 24,
    status: 'published',
    approvalStatus: 'approved',
    createdBy: 'l2',
    createdAt: '2024-05-10',
    publishedAt: '2024-05-20',
    totalAttempts: 0,
    avgScore: undefined,
    passRate: undefined
  },
];

// Demo Exam Results
const demoExamResults: ExamResult[] = [
  { id: 'res1', attemptId: 'att1', examinationId: 'exam1', studentId: 's1', admissionNumber: 'ISA/2024/001', studentName: 'Chidi Okonkwo', score: 85, totalMarks: 100, percentage: 85, grade: 'A', status: 'pass', correctAnswers: 8, wrongAnswers: 1, unattempted: 1, timeTaken: 45, submittedAt: '2024-06-15T09:45:00Z', isPublished: true, publishedAt: '2024-06-15T12:00:00Z' },
  { id: 'res2', attemptId: 'att2', examinationId: 'exam1', studentId: 's2', admissionNumber: 'ISA/2024/002', studentName: 'Adaobi Nnamdi', score: 72, totalMarks: 100, percentage: 72, grade: 'B', status: 'pass', correctAnswers: 7, wrongAnswers: 2, unattempted: 1, timeTaken: 52, submittedAt: '2024-06-15T09:52:00Z', isPublished: true, publishedAt: '2024-06-15T12:00:00Z' },
  { id: 'res3', attemptId: 'att3', examinationId: 'exam1', studentId: 's3', admissionNumber: 'ISA/2024/003', studentName: 'Emeka Fashola', score: 45, totalMarks: 100, percentage: 45, grade: 'D', status: 'fail', correctAnswers: 4, wrongAnswers: 4, unattempted: 2, timeTaken: 58, submittedAt: '2024-06-15T09:58:00Z', isPublished: true, publishedAt: '2024-06-15T12:00:00Z' },
  { id: 'res4', attemptId: 'att4', examinationId: 'exam1', studentId: 's4', admissionNumber: 'ISA/2024/004', studentName: 'Fatima Bello', score: 92, totalMarks: 100, percentage: 92, grade: 'A+', status: 'pass', correctAnswers: 9, wrongAnswers: 1, unattempted: 0, timeTaken: 38, submittedAt: '2024-06-15T09:38:00Z', isPublished: true, publishedAt: '2024-06-15T12:00:00Z' },
  { id: 'res5', attemptId: 'att5', examinationId: 'exam1', studentId: 's5', admissionNumber: 'ISA/2024/005', studentName: 'Segun Adeyemi', score: 55, totalMarks: 100, percentage: 55, grade: 'C', status: 'pass', correctAnswers: 5, wrongAnswers: 3, unattempted: 2, timeTaken: 55, submittedAt: '2024-06-15T09:55:00Z', isPublished: true, publishedAt: '2024-06-15T12:00:00Z' },
];

// Demo Security Logs
const demoSecurityLogs: SecurityLog[] = [
  { id: 'sec1', sessionId: 'session1', eventType: 'login', description: 'Student logged in', severity: 'info', ipAddress: '192.168.1.100', deviceInfo: 'Chrome on Windows 10', timestamp: '2024-06-15T08:55:00Z' },
  { id: 'sec2', sessionId: 'session1', eventType: 'tab_switch', description: 'Student switched tab', severity: 'warning', ipAddress: '192.168.1.100', deviceInfo: 'Chrome on Windows 10', timestamp: '2024-06-15T09:15:00Z' },
  { id: 'sec3', sessionId: 'session1', eventType: 'logout', description: 'Exam submitted successfully', severity: 'info', ipAddress: '192.168.1.100', deviceInfo: 'Chrome on Windows 10', timestamp: '2024-06-15T09:45:00Z' },
];

// Demo Incidents
const demoIncidents: ExamIncident[] = [
  { id: 'inc1', sessionId: 'session2', studentId: 's2', examinationId: 'exam1', type: 'network_interruption', description: 'Student experienced 30 second network disconnection', status: 'resolved', resolvedBy: 'admin1', resolvedAt: '2024-06-15T10:30:00Z' },
];

// Helper to get course by programme
function getCoursesForProgramme(programmeId: string) {
  const programme = SEEDED_PROGRAMMES.find(p => p.id === programmeId);
  if (!programme) return [];
  return PROGRAMME_COURSES[programme.code] || [];
}

// Create the CBT store
export const useCBTStore = create<CBTState>((set, get) => ({
  questionBanks: demoQuestionBanks,
  questions: demoQuestions,
  examinations: demoExaminations,
  examSessions: [],
  examAttempts: [],
  examResults: demoExamResults,
  examStatistics: new Map(),
  securityLogs: demoSecurityLogs,
  incidents: demoIncidents,
  eligibilityCache: new Map(),
  
  // Get examinations available for a student
  getExaminationsByStudent: (studentId: string, programmeId: string, level: number, semester: number) => {
    const { examinations } = get();
    return examinations.filter(exam => 
      exam.programmeId === programmeId &&
      exam.level === level &&
      exam.semester === semester &&
      exam.status === 'published'
    );
  },
  
  // Get eligible examinations based on academic status
  getEligibleExaminations: (studentId: string, programmeId: string, level: number, semester: number, academicStatus: AcademicStatus) => {
    const { examinations } = get();
    return examinations.filter(exam => 
      exam.programmeId === programmeId &&
      exam.level === level &&
      exam.semester === semester &&
      exam.status === 'published' &&
      exam.academicStatus.includes(academicStatus)
    );
  },
  
  // Start a new exam session
  startExam: (examinationId: string, studentId: string, admissionNumber: string, studentName: string) => {
    const exam = get().examinations.find(e => e.id === examinationId);
    if (!exam) throw new Error('Examination not found');
    
    const session: ExamSession = {
      id: `session_${Date.now()}`,
      examinationId,
      studentId,
      admissionNumber,
      studentName,
      startedAt: new Date().toISOString(),
      remainingTime: exam.duration * 60, // Convert to seconds
      status: 'in_progress',
      ipAddress: '127.0.0.1',
      deviceInfo: navigator.userAgent,
      currentQuestionIndex: 0,
      answeredQuestions: [],
      flaggedQuestions: [],
    };
    
    set(state => ({ examSessions: [...state.examSessions, session] }));
    return session;
  },
  
  // Save an answer
  saveAnswer: (sessionId: string, questionIndex: number, answer: string | number | string[]) => {
    set(state => ({
      examSessions: state.examSessions.map(session => 
        session.id === sessionId 
          ? { 
              ...session, 
              answeredQuestions: session.answeredQuestions.includes(questionIndex) 
                ? session.answeredQuestions 
                : [...session.answeredQuestions, questionIndex],
              autoSavedAt: new Date().toISOString()
            }
          : session
      )
    }));
  },
  
  // Submit exam
  submitExam: (sessionId: string) => {
    const session = get().examSessions.find(s => s.id === sessionId);
    if (!session) throw new Error('Session not found');
    
    const attempt: ExamAttempt = {
      id: `att_${Date.now()}`,
      sessionId,
      examinationId: session.examinationId,
      studentId: session.studentId,
      attemptNumber: 1,
      answers: {},
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      reviewRequested: false,
    };
    
    set(state => ({
      examSessions: state.examSessions.map(s => 
        s.id === sessionId ? { ...s, status: 'submitted', endedAt: new Date().toISOString() } : s
      ),
      examAttempts: [...state.examAttempts, attempt]
    }));
    
    return attempt;
  },
  
  // Get exam statistics
  getExamStatistics: (examinationId: string) => {
    const stats = get().examStatistics.get(examinationId);
    if (stats) return stats;
    
    const results = get().examResults.filter(r => r.examinationId === examinationId);
    if (results.length === 0) return undefined;
    
    const scores = results.map(r => r.percentage);
    const statistics: ExamStatistics = {
      examinationId,
      totalAttempts: results.length,
      completedAttempts: results.length,
      avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
      passCount: results.filter(r => r.status === 'pass').length,
      failCount: results.filter(r => r.status === 'fail').length,
      passRate: (results.filter(r => r.status === 'pass').length / results.length) * 100,
      avgTimeTaken: results.reduce((a, b) => a + b.timeTaken, 0) / results.length,
    };
    
    return statistics;
  },
  
  // Log security event
  logSecurityEvent: (sessionId: string, eventType: SecurityLog['eventType'], description: string, severity: SecurityLog['severity']) => {
    const log: SecurityLog = {
      id: `sec_${Date.now()}`,
      sessionId,
      eventType,
      description,
      severity,
      timestamp: new Date().toISOString(),
    };
    
    set(state => ({ securityLogs: [...state.securityLogs, log] }));
  },
  
  // Create incident
  createIncident: (sessionId: string, studentId: string, examinationId: string, type: ExamIncident['type'], description: string) => {
    const incident: ExamIncident = {
      id: `inc_${Date.now()}`,
      sessionId,
      studentId,
      examinationId,
      type,
      description,
      status: 'open',
    };
    
    set(state => ({ incidents: [...state.incidents, incident] }));
    return incident;
  },
}));

// Export helper functions
export { getCoursesForProgramme, demoQuestions, demoQuestionBanks, demoExaminations, demoExamResults, demoSecurityLogs, demoIncidents };