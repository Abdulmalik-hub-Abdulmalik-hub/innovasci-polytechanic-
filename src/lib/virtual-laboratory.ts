// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - VIRTUAL LABORATORY ECOSYSTEM
// Curriculum-Driven Virtual Laboratory Management System
// =====================================================

import { 
  SEEDED_FACULTIES, 
  SEEDED_DEPARTMENTS, 
  SEEDED_PROGRAMMES, 
  PROGRAMME_COURSES, 
  Programme, 
  Course,
  Department,
  Faculty
} from './academic-data';
import { DEMO_STUDENT_PROFILE, StudentProfile } from './learning-resources';

// =====================================================
// SECTION 1: VIRTUAL LAB ECOSYSTEM TYPES
// =====================================================

// Lab Status Types
export type LabStatus = 'active' | 'inactive' | 'maintenance' | 'archived';
export type ActivityStatus = 'not_started' | 'in_progress' | 'completed' | 'submitted' | 'graded';
export type ReportStatus = 'draft' | 'submitted' | 'reviewed' | 'approved' | 'resubmit';
export type AssessmentType = 'quiz' | 'viva' | 'assignment' | 'report' | 'competency';
export type SubmissionStatus = 'pending' | 'verified' | 'rejected';

// Resource Types
export type LabResourceType = 
  | 'simulation'
  | 'guided_activity'
  | 'video_demonstration'
  | 'lab_manual'
  | 'procedure_guide'
  | 'safety_instruction'
  | 'worksheet'
  | 'observation_template'
  | 'research_material';

// =====================================================
// SECTION 2: CORE LAB ECOSYSTEM TYPES
// =====================================================

// Virtual Laboratory - Top Level Container
export interface VirtualLaboratory {
  id: string;
  code: string;
  name: string;
  description: string;
  facultyId: string;
  facultyName: string;
  departmentId: string;
  departmentName: string;
  programmeId: string;
  programmeName: string;
  programmeType: 'ND' | 'HND';
  level: number;
  semester: number;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  status: LabStatus;
  resources: LabResource[];
  lecturerId: string;
  lecturerName: string;
  totalActivities: number;
  totalStudents: number;
  completionRate: number;
  createdAt: string;
  updatedAt: string;
}

// Lab Resource - Materials and Assets
export interface LabResource {
  id: string;
  labId: string;
  type: LabResourceType;
  title: string;
  description: string;
  url: string;
  fileSize?: number;
  duration?: number; // for videos
  pageCount?: number; // for documents
  isDownloadable: boolean;
  isInteractive: boolean;
  order: number;
  createdAt: string;
}

// Laboratory Activity - Individual Practical Work
export interface LaboratoryActivity {
  id: string;
  labId: string;
  code: string;
  title: string;
  objectives: string[];
  materials: string[];
  procedures: ProcedureStep[];
  safetyInstructions: string[];
  estimatedDuration: number; // minutes
  maxScore: number;
  passingScore: number;
  order: number;
  resources: LabResource[];
  status: 'published' | 'draft' | 'archived';
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcedureStep {
  stepNumber: number;
  title: string;
  instructions: string;
  imageUrl?: string;
  videoUrl?: string;
  isCritical: boolean;
}

// Lab Notebook - Student Digital Notes
export interface LabNotebook {
  id: string;
  studentId: string;
  courseCode: string;
  courseTitle: string;
  activityId: string;
  activityTitle: string;
  entries: NotebookEntry[];
  totalEntries: number;
  isComplete: boolean;
  lastUpdated: string;
  createdAt: string;
}

export interface NotebookEntry {
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

// Lab Report - Professional Practical Report
export interface LabReport {
  id: string;
  studentId: string;
  admissionNumber: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  activityId: string;
  activityTitle: string;
  facultyName: string;
  departmentName: string;
  programmeName: string;
  level: number;
  semester: number;
  // Report Sections
  experimentTitle: string;
  date: string;
  objectives: string;
  materials: string;
  procedures: string;
  observations: string;
  results: string;
  analysis: string;
  conclusion: string;
  // Metadata
  status: ReportStatus;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

// Practical Assessment - Test and Evaluation
export interface PracticalAssessment {
  id: string;
  labId: string;
  activityId: string;
  type: AssessmentType;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  timeLimit?: number; // minutes
  maxScore: number;
  passingScore: number;
  attempts: number;
  maxAttempts: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'short_answer' | 'long_answer' | 'practical';
  options?: string[];
  correctAnswer?: string;
  score: number;
  order: number;
}

// Practical Result - Student Assessment Results
export interface PracticalResult {
  id: string;
  studentId: string;
  assessmentId: string;
  courseCode: string;
  activityTitle: string;
  assessmentType: AssessmentType;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  attemptNumber: number;
  answers: StudentAnswer[];
  submittedAt: string;
  gradedAt?: string;
  gradedBy?: string;
}

// Student Answer in Assessment
export interface StudentAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  score: number;
  feedback?: string;
}

// =====================================================
// SECTION 3: LAB MAPPING (Curriculum-Driven)
// =====================================================

// Maps labs to curriculum structure
export interface LabMapping {
  id: string;
  labId: string;
  facultyId: string;
  departmentId: string;
  programmeId: string;
  programmeType: 'ND' | 'HND';
  level: number;
  semester: number;
  courseId: string;
  courseCode: string;
  isActive: boolean;
  createdAt: string;
}

// =====================================================
// SECTION 4: LAB ECOSYSTEM ANALYTICS
// =====================================================

export interface LabAnalytics {
  // Participation
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  
  // Activity Metrics
  totalActivities: number;
  completedActivities: number;
  averageCompletionTime: number;
  
  // Report Metrics
  totalReports: number;
  submittedReports: number;
  gradedReports: number;
  averageReportScore: number;
  
  // Assessment Metrics
  totalAssessments: number;
  averageScore: number;
  passRate: number;
  
  // Time Metrics
  averageTimeSpent: number; // minutes per student
  peakUsageHours: number[];
  
  // Quality Metrics
  qualityScore: number;
  satisfactionScore: number;
}

// Individual Student Lab Progress
export interface StudentLabProgress {
  studentId: string;
  admissionNumber: string;
  studentName: string;
  courseCode: string;
  coursesName: string;
  enrolledActivities: number;
  completedActivities: number;
  completionRate: number;
  reportsSubmitted: number;
  reportsReviewed: number;
  averageScore: number;
  competencyLevel: 'beginner' | 'intermediate' | 'proficient' | 'advanced';
  lastActivity: string;
  totalTimeSpent: number;
}

// =====================================================
// SECTION 5: DEFAULT LAB ECOSYSTEM DATA
// =====================================================

// Sample Labs for AML Programme
export const DEMO_VIRTUAL_LABORATORIES: VirtualLaboratory[] = [
  {
    id: 'vl1',
    code: 'AML-LAB-111',
    name: 'Applied Machine Learning Laboratory I',
    description: 'Introduction to machine learning algorithms, data preprocessing, and model training using Python and scikit-learn.',
    facultyId: 'f1',
    facultyName: 'School of AI & Computational Intelligence',
    departmentId: 'd1',
    departmentName: 'Artificial Intelligence & Machine Learning',
    programmeId: 'p1',
    programmeName: 'Applied Machine Learning',
    programmeType: 'ND',
    level: 1,
    semester: 1,
    courseId: 'c1',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    status: 'active',
    resources: [],
    lecturerId: 'l1',
    lecturerName: 'Dr. Chidi Okonkwo',
    totalActivities: 8,
    totalStudents: 45,
    completionRate: 78,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01',
  },
  {
    id: 'vl2',
    code: 'AML-LAB-112',
    name: 'Python Programming Laboratory',
    description: 'Hands-on Python programming for AI applications including data structures, functions, and libraries.',
    facultyId: 'f1',
    facultyName: 'School of AI & Computational Intelligence',
    departmentId: 'd1',
    departmentName: 'Artificial Intelligence & Machine Learning',
    programmeId: 'p1',
    programmeName: 'Applied Machine Learning',
    programmeType: 'ND',
    level: 1,
    semester: 1,
    courseId: 'c2',
    courseCode: 'AML 112',
    courseTitle: 'Python Programming',
    status: 'active',
    resources: [],
    lecturerId: 'l2',
    lecturerName: 'Dr. Adebayo Johnson',
    totalActivities: 10,
    totalStudents: 45,
    completionRate: 82,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01',
  },
  {
    id: 'vl3',
    code: 'AML-LAB-113',
    name: 'Data Science Laboratory',
    description: 'Practical data science exercises including data cleaning, visualization, and statistical analysis.',
    facultyId: 'f1',
    facultyName: 'School of AI & Computational Intelligence',
    departmentId: 'd1',
    departmentName: 'Artificial Intelligence & Machine Learning',
    programmeId: 'p1',
    programmeName: 'Applied Machine Learning',
    programmeType: 'ND',
    level: 1,
    semester: 1,
    courseId: 'c3',
    courseCode: 'AML 113',
    courseTitle: 'Introduction to Data Science',
    status: 'active',
    resources: [],
    lecturerId: 'l1',
    lecturerName: 'Dr. Chidi Okonkwo',
    totalActivities: 6,
    totalStudents: 42,
    completionRate: 75,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01',
  },
];

// Sample Activities
export const DEMO_LABORATORY_ACTIVITIES: LaboratoryActivity[] = [
  {
    id: 'act1',
    labId: 'vl1',
    code: 'AML-LAB-111-01',
    title: 'Introduction to NumPy Arrays',
    objectives: [
      'Understand the basics of NumPy arrays',
      'Perform basic array operations',
      'Create and manipulate matrices',
      'Apply NumPy functions for AI computations',
    ],
    materials: [
      'Computer with Python installed',
      'NumPy library',
      'Jupyter Notebook',
      'Sample datasets',
    ],
    procedures: [
      { stepNumber: 1, title: 'Setup Environment', instructions: 'Install NumPy and launch Jupyter Notebook', isCritical: true },
      { stepNumber: 2, title: 'Create Arrays', instructions: 'Create 1D and 2D arrays using NumPy', isCritical: true },
      { stepNumber: 3, title: 'Array Operations', instructions: 'Perform element-wise operations on arrays', isCritical: false },
      { stepNumber: 4, title: 'Matrix Operations', instructions: 'Implement matrix multiplication using NumPy', isCritical: true },
    ],
    safetyInstructions: [
      'Ensure Python environment is properly configured',
      'Save work frequently',
      'Follow proper keyboard and posture practices',
    ],
    estimatedDuration: 120,
    maxScore: 100,
    passingScore: 60,
    order: 1,
    resources: [],
    status: 'published',
    deadline: '2024-06-30',
    createdAt: '2024-01-20',
    updatedAt: '2024-06-01',
  },
  {
    id: 'act2',
    labId: 'vl1',
    code: 'AML-LAB-111-02',
    title: 'Linear Algebra Operations',
    objectives: [
      'Implement matrix operations using NumPy',
      'Solve systems of linear equations',
      'Calculate eigenvalues and eigenvectors',
      'Apply matrix transformations',
    ],
    materials: [
      'Computer with Python installed',
      'NumPy and SciPy libraries',
      'Jupyter Notebook',
    ],
    procedures: [
      { stepNumber: 1, title: 'Matrix Creation', instructions: 'Create matrices using NumPy', isCritical: true },
      { stepNumber: 2, title: 'Matrix Operations', instructions: 'Perform addition, subtraction, multiplication', isCritical: true },
      { stepNumber: 3, title: 'Solve Equations', instructions: 'Use NumPy linalg for solving equations', isCritical: true },
    ],
    safetyInstructions: [
      'Save work frequently',
      'Verify matrix dimensions before operations',
    ],
    estimatedDuration: 180,
    maxScore: 100,
    passingScore: 60,
    order: 2,
    resources: [],
    status: 'published',
    deadline: '2024-07-15',
    createdAt: '2024-01-25',
    updatedAt: '2024-06-01',
  },
];

// Sample Lab Reports
export const DEMO_LAB_REPORTS: LabReport[] = [
  {
    id: 'rpt1',
    studentId: 's1',
    admissionNumber: 'ISA/2024/001',
    studentName: 'Chidi Okonkwo',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    activityId: 'act1',
    activityTitle: 'Introduction to NumPy Arrays',
    facultyName: 'School of AI & Computational Intelligence',
    departmentName: 'Artificial Intelligence & Machine Learning',
    programmeName: 'Applied Machine Learning',
    level: 1,
    semester: 1,
    experimentTitle: 'Introduction to NumPy Arrays',
    date: '2024-06-10',
    objectives: 'To understand and implement basic NumPy array operations for AI computations.',
    materials: 'Computer, Python, NumPy library, Jupyter Notebook, Sample datasets',
    procedures: 'Created 1D and 2D arrays, performed element-wise operations, and implemented matrix multiplication.',
    observations: 'NumPy provides efficient array operations. 2D arrays behave as matrices. Element-wise operations are intuitive.',
    results: 'Successfully created 1D array [1,2,3,4,5] and 2D array [[1,2],[3,4]]. Matrix multiplication produced correct results.',
    analysis: 'Results demonstrate proper understanding of NumPy array operations. Performance improvements over Python lists are significant.',
    conclusion: 'Learned to create and manipulate NumPy arrays for AI computations. Ready for more advanced operations.',
    status: 'submitted',
    submittedAt: '2024-06-10',
    createdAt: '2024-06-10',
    updatedAt: '2024-06-10',
  },
];

// =====================================================
// SECTION 6: CORE FUNCTIONS
// =====================================================

/**
 * Get all virtual laboratories for a student
 * Uses curriculum mapping to dynamically assign labs
 */
export function getStudentVirtualLaboratories(student: StudentProfile): VirtualLaboratory[] {
  return DEMO_VIRTUAL_LABORATORIES.filter(lab => 
    lab.facultyId === student.facultyId &&
    lab.departmentId === student.departmentId &&
    lab.programmeId === student.programmeId &&
    lab.programmeType === student.entryCategory &&
    lab.level === student.level &&
    lab.semester === student.semester &&
    lab.status === 'active'
  );
}

/**
 * Get laboratory activities for a specific lab
 */
export function getLabActivities(labId: string): LaboratoryActivity[] {
  return DEMO_LABORATORY_ACTIVITIES.filter(act => act.labId === labId);
}

/**
 * Get student lab reports
 */
export function getStudentLabReports(student: StudentProfile): LabReport[] {
  return DEMO_LAB_REPORTS.filter(rpt => rpt.studentId === student.id);
}

/**
 * Get lab by ID with curriculum context
 */
export function getLabById(labId: string): VirtualLaboratory | undefined {
  return DEMO_VIRTUAL_LABORATORIES.find(lab => lab.id === labId);
}

/**
 * Calculate student lab progress
 */
export function calculateStudentLabProgress(
  student: StudentProfile,
  enrolledLabs: VirtualLaboratory[]
): StudentLabProgress {
  const studentReports = getStudentLabReports(student);
  const completedActivities = studentReports.filter(r => r.status === 'approved').length;
  const totalActivities = enrolledLabs.reduce((sum, lab) => sum + lab.totalActivities, 0);
  
  return {
    studentId: student.id,
    admissionNumber: student.admissionNumber,
    studentName: student.fullName,
    courseCode: student.programmeCode,
    coursesName: student.programmeName,
    enrolledActivities: enrolledLabs.length,
    completedActivities,
    completionRate: totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0,
    reportsSubmitted: studentReports.filter(r => r.status === 'submitted').length,
    reportsReviewed: studentReports.filter(r => ['reviewed', 'approved'].includes(r.status)).length,
    averageScore: calculateAverageScore(studentReports),
    competencyLevel: calculateCompetencyLevel(completedActivities, studentReports),
    lastActivity: studentReports[0]?.submittedAt || '',
    totalTimeSpent: completedActivities * 120, // Estimate 2 hours per activity
  };
}

/**
 * Calculate average score from reports
 */
function calculateAverageScore(reports: LabReport[]): number {
  const scoredReports = reports.filter(r => r.score !== undefined);
  if (scoredReports.length === 0) return 0;
  return Math.round(scoredReports.reduce((sum, r) => sum + (r.score || 0), 0) / scoredReports.length);
}

/**
 * Determine student competency level
 */
function calculateCompetencyLevel(
  completedActivities: number,
  reports: LabReport[]
): 'beginner' | 'intermediate' | 'proficient' | 'advanced' {
  if (completedActivities < 3) return 'beginner';
  if (completedActivities < 6) return 'intermediate';
  
  const avgScore = calculateAverageScore(reports);
  if (avgScore >= 80) return 'advanced';
  if (avgScore >= 65) return 'proficient';
  return 'intermediate';
}

/**
 * Get lab analytics for a specific lab
 */
export function getLabAnalytics(labId: string): LabAnalytics {
  const lab = getLabById(labId);
  if (!lab) {
    return {
      totalStudents: 0,
      activeStudents: 0,
      completionRate: 0,
      totalActivities: 0,
      completedActivities: 0,
      averageCompletionTime: 0,
      totalReports: 0,
      submittedReports: 0,
      gradedReports: 0,
      averageReportScore: 0,
      totalAssessments: 0,
      averageScore: 0,
      passRate: 0,
      averageTimeSpent: 0,
      peakUsageHours: [],
      qualityScore: 0,
      satisfactionScore: 0,
    };
  }

  return {
    totalStudents: lab.totalStudents,
    activeStudents: Math.round(lab.totalStudents * 0.8),
    completionRate: lab.completionRate,
    totalActivities: lab.totalActivities,
    completedActivities: Math.round(lab.totalActivities * lab.completionRate / 100),
    averageCompletionTime: 150,
    totalReports: lab.totalStudents * 2,
    submittedReports: Math.round(lab.totalStudents * 1.5),
    gradedReports: Math.round(lab.totalStudents * 1.3),
    averageReportScore: 72,
    totalAssessments: lab.totalActivities,
    averageScore: 74,
    passRate: 85,
    averageTimeSpent: 180,
    peakUsageHours: [9, 10, 11, 14, 15, 16, 20, 21],
    qualityScore: 88,
    satisfactionScore: 4.2,
  };
}

/**
 * Generate new lab report template
 */
export function generateLabReportTemplate(
  student: StudentProfile,
  activity: LaboratoryActivity,
  lab: VirtualLaboratory
): Omit<LabReport, 'id' | 'status' | 'submittedAt' | 'createdAt' | 'updatedAt'> {
  return {
    studentId: student.id,
    admissionNumber: student.admissionNumber,
    studentName: student.fullName,
    courseCode: lab.courseCode,
    courseTitle: lab.courseTitle,
    activityId: activity.id,
    activityTitle: activity.title,
    facultyName: student.facultyName,
    departmentName: student.departmentName,
    programmeName: student.programmeName,
    level: student.level,
    semester: student.semester,
    experimentTitle: activity.title,
    date: new Date().toISOString().split('T')[0],
    objectives: activity.objectives.join('\n'),
    materials: activity.materials.join('\n'),
    procedures: activity.procedures.map(p => `${p.stepNumber}. ${p.title}: ${p.instructions}`).join('\n'),
    observations: '',
    results: '',
    analysis: '',
    conclusion: '',
  };
}

/**
 * Create new notebook for student
 */
export function createStudentNotebook(
  student: StudentProfile,
  activity: LaboratoryActivity
): LabNotebook {
  return {
    id: `nb-${student.id}-${activity.id}-${Date.now()}`,
    studentId: student.id,
    courseCode: activity.labId.startsWith('vl') ? 
      DEMO_VIRTUAL_LABORATORIES.find(v => v.id === activity.labId)?.courseCode || '' : '',
    courseTitle: activity.title,
    activityId: activity.id,
    activityTitle: activity.title,
    entries: [],
    totalEntries: 0,
    isComplete: false,
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
}

/**
 * Add notebook entry
 */
export function addNotebookEntry(
  notebook: LabNotebook,
  entry: Omit<NotebookEntry, 'id' | 'notebookId' | 'createdAt' | 'updatedAt'>
): LabNotebook {
  const newEntry: NotebookEntry = {
    ...entry,
    id: `entry-${Date.now()}`,
    notebookId: notebook.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    ...notebook,
    entries: [...notebook.entries, newEntry],
    totalEntries: notebook.totalEntries + 1,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get labs by programme and level
 */
export function getLabsByProgramme(
  facultyId: string,
  departmentId: string,
  programmeId: string,
  programmeType: 'ND' | 'HND',
  level: number,
  semester: number
): VirtualLaboratory[] {
  return DEMO_VIRTUAL_LABORATORIES.filter(lab =>
    lab.facultyId === facultyId &&
    lab.departmentId === departmentId &&
    lab.programmeId === programmeId &&
    lab.programmeType === programmeType &&
    lab.level === level &&
    lab.semester === semester &&
    lab.status === 'active'
  );
}

/**
 * Validate student lab access
 */
export function validateLabAccess(
  student: StudentProfile,
  labId: string
): { hasAccess: boolean; reason?: string } {
  const lab = getLabById(labId);
  
  if (!lab) {
    return { hasAccess: false, reason: 'Laboratory not found' };
  }

  if (lab.facultyId !== student.facultyId) {
    return { hasAccess: false, reason: 'Access restricted to enrolled programme' };
  }

  if (lab.departmentId !== student.departmentId) {
    return { hasAccess: false, reason: 'Access restricted to enrolled programme' };
  }

  if (lab.programmeId !== student.programmeId) {
    return { hasAccess: false, reason: 'Access restricted to enrolled programme' };
  }

  if (lab.programmeType !== student.entryCategory) {
    return { hasAccess: false, reason: 'Access restricted to entry category' };
  }

  if (lab.level !== student.level) {
    return { hasAccess: false, reason: 'Access restricted to current level' };
  }

  if (lab.semester !== student.semester) {
    return { hasAccess: false, reason: 'Access restricted to current semester' };
  }

  if (lab.status !== 'active') {
    return { hasAccess: false, reason: 'Laboratory is not active' };
  }

  return { hasAccess: true };
}

/**
 * Get curriculum-mapped labs for lecturer
 */
export function getLecturerAssignedLabs(lecturerId: string): VirtualLaboratory[] {
  return DEMO_VIRTUAL_LABORATORIES.filter(
    lab => lab.lecturerId === lecturerId && lab.status === 'active'
  );
}

/**
 * Get programme-specific lab configuration
 */
export interface LabProgrammeConfig {
  programmeId: string;
  customActivities?: number;
  practicalHours?: number;
  competencyRequirements?: string[];
}

export function getLabProgrammeConfig(programmeId: string): LabProgrammeConfig {
  const configs: Record<string, LabProgrammeConfig> = {
    'p1': {
      programmeId: 'p1',
      customActivities: 24,
      practicalHours: 180,
      competencyRequirements: [
        'Python Programming Proficiency',
        'Data Analysis Skills',
        'Model Training Competency',
        'Results Interpretation',
      ],
    },
  };

  return configs[programmeId] || {
    programmeId,
    customActivities: 20,
    practicalHours: 150,
    competencyRequirements: [
      'Technical Proficiency',
      'Documentation Skills',
      'Analysis Competency',
    ],
  };
}
