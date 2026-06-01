// =====================================================
// REGISTRATION ELIGIBILITY AND SCHOOL FEES CONTROL ENGINE
// InnovaSci Open Polytechnic
// =====================================================

import { DEMO_STUDENT_PROFILE, StudentProfile } from './learning-resources';

// =====================================================
// ELIGIBILITY TYPES
// =====================================================

export type EligibilityStatus = 'eligible' | 'partially_eligible' | 'not_eligible';

export type PaymentStatus = 'paid' | 'partially_paid' | 'unpaid' | 'overdue';

export type StudentCategory = 'fresh_nd' | 'fresh_hnd' | 'returning_nd' | 'returning_hnd';

export interface FeeItem {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  enabled: boolean;
  category: 'acceptance' | 'tuition' | 'registration' | 'examination' | 'levy' | 'other';
}

export interface FeeStructure {
  id: string;
  session: string;
  facultyId: string;
  departmentId: string;
  programmeId: string;
  level: number;
  semester: number;
  entryCategory: 'ND' | 'HND';
  studentCategory: StudentCategory;
  fees: FeeItem[];
  totalAmount: number;
}

export interface PaymentSchedule {
  id: string;
  session: string;
  facultyId: string;
  departmentId: string;
  programmeId: string;
  paymentStartDate: string;
  paymentDeadline: string;
  lateRegistrationEndDate: string;
  penaltyStartDate: string;
  hasInstallmentPlan: boolean;
  installmentPlanDetails?: {
    firstInstallment: number;
    firstInstallmentDeadline: string;
    secondInstallment: number;
    secondInstallmentDeadline: string;
    finalDeadline: string;
  };
}

export interface StudentPaymentStatus {
  studentId: string;
  admissionNumber: string;
  session: string;
  semester: number;
  totalFees: number;
  amountPaid: number;
  balance: number;
  paymentStatus: PaymentStatus;
  lastPaymentDate?: string;
  paymentHistory: PaymentRecord[];
  installmentPlanActive: boolean;
  currentInstallment: number;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method: 'paystack' | 'bank_transfer' | 'manual';
  reference: string;
  status: 'pending' | 'verified' | 'failed';
  receiptNumber?: string;
}

export interface RegistrationStatus {
  studentId: string;
  session: string;
  semester: number;
  isSemesterRegistered: boolean;
  registeredCourses: string[];
  registrationDate?: string;
  registrationApprovedBy?: string;
  registrationApprovedAt?: string;
}

export interface EligibilityRecord {
  studentId: string;
  eligibilityStatus: EligibilityStatus;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  canAccessLearningResources: boolean;
  canAccessCBT: boolean;
  canRegisterCourses: boolean;
  canViewResults: boolean;
  canAccessAssignments: boolean;
  lastVerified: string;
  restrictions: string[];
}

// =====================================================
// DEFAULT FEE STRUCTURES
// =====================================================

export const DEFAULT_FEE_ITEMS: FeeItem[] = [
  {
    id: 'acceptance',
    name: 'Acceptance Fee',
    description: 'One-time acceptance fee for new students',
    amount: 50000,
    currency: 'NGN',
    enabled: true,
    category: 'acceptance',
  },
  {
    id: 'tuition',
    name: 'Tuition Fee',
    description: 'Per semester tuition',
    amount: 150000,
    currency: 'NGN',
    enabled: true,
    category: 'tuition',
  },
  {
    id: 'registration',
    name: 'Registration Fee',
    description: 'Semester registration',
    amount: 10000,
    currency: 'NGN',
    enabled: true,
    category: 'registration',
  },
  {
    id: 'examination',
    name: 'Examination Fee',
    description: 'Examination processing',
    amount: 15000,
    currency: 'NGN',
    enabled: true,
    category: 'examination',
  },
  {
    id: 'ict',
    name: 'ICT Fee',
    description: 'Computer and technology services',
    amount: 20000,
    currency: 'NGN',
    enabled: true,
    category: 'levy',
  },
  {
    id: 'library',
    name: 'Library Fee',
    description: 'Library services and resources',
    amount: 10000,
    currency: 'NGN',
    enabled: true,
    category: 'levy',
  },
  {
    id: 'development',
    name: 'Development Levy',
    description: 'Institution development',
    amount: 25000,
    currency: 'NGN',
    enabled: true,
    category: 'levy',
  },
  {
    id: 'laboratory',
    name: 'Laboratory Fee',
    description: 'Lab access and materials',
    amount: 30000,
    currency: 'NGN',
    enabled: true,
    category: 'levy',
  },
  {
    id: 'virtual_lab',
    name: 'Virtual Laboratory Fee',
    description: 'Virtual lab access',
    amount: 15000,
    currency: 'NGN',
    enabled: true,
    category: 'levy',
  },
  {
    id: 'student_affairs',
    name: 'Student Affairs Fee',
    description: 'Student services',
    amount: 5000,
    currency: 'NGN',
    enabled: true,
    category: 'levy',
  },
];

export const DEFAULT_FEE_STRUCTURE: FeeStructure = {
  id: 'fs001',
  session: '2024/2025',
  facultyId: 'f1',
  departmentId: 'd1',
  programmeId: 'p1',
  level: 1,
  semester: 1,
  entryCategory: 'ND',
  studentCategory: 'fresh_nd',
  fees: DEFAULT_FEE_ITEMS.filter(f => f.enabled),
  totalAmount: DEFAULT_FEE_ITEMS.filter(f => f.enabled).reduce((sum, f) => sum + f.amount, 0),
};

// =====================================================
// DEFAULT PAYMENT SCHEDULE
// =====================================================

export const DEFAULT_PAYMENT_SCHEDULE: PaymentSchedule = {
  id: 'ps001',
  session: '2024/2025',
  facultyId: 'f1',
  departmentId: 'd1',
  programmeId: 'p1',
  paymentStartDate: '2024-09-01',
  paymentDeadline: '2024-10-31',
  lateRegistrationEndDate: '2024-11-15',
  penaltyStartDate: '2024-11-16',
  hasInstallmentPlan: true,
  installmentPlanDetails: {
    firstInstallment: 150000,
    firstInstallmentDeadline: '2024-09-30',
    secondInstallment: 100000,
    secondInstallmentDeadline: '2024-10-31',
    finalDeadline: '2024-11-15',
  },
};

// =====================================================
// MOCK STUDENT PAYMENT DATA
// =====================================================

export const DEMO_STUDENT_PAYMENTS: StudentPaymentStatus[] = [
  {
    studentId: 's1',
    admissionNumber: 'ISA/2024/001',
    session: '2024/2025',
    semester: 1,
    totalFees: 345000,
    amountPaid: 345000,
    balance: 0,
    paymentStatus: 'paid',
    lastPaymentDate: '2024-09-15',
    paymentHistory: [
      {
        id: 'pay1',
        amount: 345000,
        date: '2024-09-15',
        method: 'paystack',
        reference: 'PSK_123456',
        status: 'verified',
        receiptNumber: 'RCP-2024-001',
      },
    ],
    installmentPlanActive: false,
    currentInstallment: 0,
  },
];

export const DEMO_STUDENT_REGISTRATIONS: RegistrationStatus[] = [
  {
    studentId: 's1',
    session: '2024/2025',
    semester: 1,
    isSemesterRegistered: true,
    registeredCourses: ['AML 111', 'AML 112', 'AML 113', 'AML 114'],
    registrationDate: '2024-09-20',
    registrationApprovedBy: 'admin',
    registrationApprovedAt: '2024-09-20',
  },
];

// =====================================================
// ELIGIBILITY ENGINE FUNCTIONS
// =====================================================

export function getStudentPaymentStatus(
  student: StudentProfile
): StudentPaymentStatus {
  // Check if student has payment record
  const existingPayment = DEMO_STUDENT_PAYMENTS.find(
    p => p.admissionNumber === student.admissionNumber
  );

  if (existingPayment) {
    return existingPayment;
  }

  // Default for students without payment record
  return {
    studentId: student.id,
    admissionNumber: student.admissionNumber,
    session: '2024/2025',
    semester: student.semester,
    totalFees: DEFAULT_FEE_STRUCTURE.totalAmount,
    amountPaid: 0,
    balance: DEFAULT_FEE_STRUCTURE.totalAmount,
    paymentStatus: 'unpaid',
    paymentHistory: [],
    installmentPlanActive: false,
    currentInstallment: 0,
  };
}

export function getStudentRegistrationStatus(
  student: StudentProfile
): RegistrationStatus {
  const existing = DEMO_STUDENT_REGISTRATIONS.find(
    r => r.studentId === student.id
  );

  if (existing) {
    return existing;
  }

  // Default for students without registration
  return {
    studentId: student.id,
    session: '2024/2025',
    semester: student.semester,
    isSemesterRegistered: false,
    registeredCourses: [],
  };
}

export function calculatePaymentStatus(
  totalFees: number,
  amountPaid: number
): PaymentStatus {
  if (amountPaid === 0) return 'unpaid';
  if (amountPaid >= totalFees) return 'paid';
  
  // Check if overdue
  const today = new Date();
  const deadline = new Date(DEFAULT_PAYMENT_SCHEDULE.paymentDeadline);
  if (amountPaid < totalFees && today > deadline) {
    return 'overdue';
  }
  
  return 'partially_paid';
}

export function determineEligibility(
  student: StudentProfile,
  paymentStatus: StudentPaymentStatus,
  registrationStatus: RegistrationStatus
): EligibilityRecord {
  const restrictions: string[] = [];
  let canAccessLearningResources = false;
  let canAccessCBT = false;
  let canRegisterCourses = false;
  let canViewResults = false;
  let canAccessAssignments = false;

  // Determine payment and registration status
  const calcPaymentStatus = calculatePaymentStatus(
    paymentStatus.totalFees,
    paymentStatus.amountPaid
  );

  // Check eligibility based on status
  if (calcPaymentStatus === 'paid' && registrationStatus.isSemesterRegistered) {
    // Fully eligible
    canAccessLearningResources = true;
    canAccessCBT = true;
    canRegisterCourses = true;
    canViewResults = true;
    canAccessAssignments = true;

    return {
      studentId: student.id,
      eligibilityStatus: 'eligible',
      paymentStatus: calcPaymentStatus,
      registrationStatus,
      canAccessLearningResources,
      canAccessCBT,
      canRegisterCourses,
      canViewResults,
      canAccessAssignments,
      lastVerified: new Date().toISOString(),
      restrictions: [],
    };
  } else if (calcPaymentStatus === 'partially_paid' || 
             (calcPaymentStatus === 'paid' && !registrationStatus.isSemesterRegistered)) {
    // Partially eligible
    canAccessLearningResources = false;
    canAccessCBT = false;
    canRegisterCourses = !registrationStatus.isSemesterRegistered;
    canViewResults = false;
    canAccessAssignments = false;

    if (calcPaymentStatus !== 'paid') {
      restrictions.push('Outstanding school fees must be settled');
    }
    if (!registrationStatus.isSemesterRegistered) {
      restrictions.push('Semester registration must be completed');
    }

    return {
      studentId: student.id,
      eligibilityStatus: 'partially_eligible',
      paymentStatus: calcPaymentStatus,
      registrationStatus,
      canAccessLearningResources,
      canAccessCBT,
      canRegisterCourses,
      canViewResults,
      canAccessAssignments,
      lastVerified: new Date().toISOString(),
      restrictions,
    };
  } else {
    // Not eligible
    restrictions.push('School fees must be paid in full');
    if (!registrationStatus.isSemesterRegistered) {
      restrictions.push('Semester registration must be completed');
    }

    return {
      studentId: student.id,
      eligibilityStatus: 'not_eligible',
      paymentStatus: calcPaymentStatus,
      registrationStatus,
      canAccessLearningResources,
      canAccessCBT,
      canRegisterCourses,
      canViewResults,
      canAccessAssignments,
      lastVerified: new Date().toISOString(),
      restrictions,
    };
  }
}

export function getStudentEligibility(
  student: StudentProfile
): EligibilityRecord {
  const paymentStatus = getStudentPaymentStatus(student);
  const registrationStatus = getStudentRegistrationStatus(student);
  return determineEligibility(student, paymentStatus, registrationStatus);
}

export function verifyAcademicAccess(
  student: StudentProfile,
  requiredAccess: 'learning_resources' | 'cbt' | 'course_registration' | 'results' | 'assignments'
): { hasAccess: boolean; reason?: string } {
  const eligibility = getStudentEligibility(student);

  switch (requiredAccess) {
    case 'learning_resources':
      if (eligibility.canAccessLearningResources) {
        return { hasAccess: true };
      }
      return { 
        hasAccess: false, 
        reason: eligibility.restrictions[0] || 'Access restricted. Please clear outstanding fees.' 
      };
    case 'cbt':
      if (eligibility.canAccessCBT) {
        return { hasAccess: true };
      }
      return { 
        hasAccess: false, 
        reason: 'CBT access requires full payment and semester registration.' 
      };
    case 'course_registration':
      if (eligibility.canRegisterCourses) {
        return { hasAccess: true };
      }
      return { 
        hasAccess: false, 
        reason: 'Course registration requires payment settlement.' 
      };
    case 'results':
      if (eligibility.canViewResults) {
        return { hasAccess: true };
      }
      return { 
        hasAccess: false, 
        reason: 'Results require full payment and semester registration.' 
      };
    case 'assignments':
      if (eligibility.canAccessAssignments) {
        return { hasAccess: true };
      }
      return { 
        hasAccess: false, 
        reason: 'Assignment access requires payment settlement.' 
      };
  }
}

// =====================================================
// FRESH STUDENT WORKFLOW
// =====================================================

export interface FreshStudentWorkflow {
  stage: 'admission_offered' | 'acceptance_pending' | 'acceptance_paid' | 
          'school_fees_pending' | 'school_fees_partial' | 'school_fees_paid' |
          'registration_pending' | 'cleared' | 'active';
  nextActions: string[];
  blockers: string[];
}

export function getFreshStudentWorkflow(student: StudentProfile): FreshStudentWorkflow {
  const eligibility = getStudentEligibility(student);
  const isFresh = student.entryCategory === 'ND' && student.level === 1;

  if (!isFresh) {
    return {
      stage: 'active',
      nextActions: ['Continue academic activities'],
      blockers: [],
    };
  }

  // Fresh student workflow stages
  if (eligibility.eligibilityStatus === 'eligible') {
    return {
      stage: 'active',
      nextActions: [],
      blockers: [],
    };
  }

  if (eligibility.paymentStatus === 'overdue') {
    return {
      stage: 'school_fees_pending',
      nextActions: ['Pay outstanding school fees immediately'],
      blockers: ['Overdue payment may attract penalties'],
    };
  }

  if (eligibility.paymentStatus === 'partially_paid') {
    return {
      stage: 'school_fees_partial',
      nextActions: ['Complete school fees payment'],
      blockers: [`Outstanding balance: ₦${eligibility.paymentStatus === 'partially_paid' ? (eligibility.registrationStatus ? 0 : 0) : 0}`],
    };
  }

  return {
    stage: 'school_fees_pending',
    nextActions: ['Complete school fees payment'],
    blockers: ['School fees payment required'],
  };
}

// =====================================================
// RETURNING STUDENT WORKFLOW
// =====================================================

export function getReturningStudentWorkflow(student: StudentProfile): FreshStudentWorkflow {
  const eligibility = getStudentEligibility(student);

  if (eligibility.eligibilityStatus === 'eligible') {
    return {
      stage: 'active',
      nextActions: [],
      blockers: [],
    };
  }

  if (eligibility.eligibilityStatus === 'partially_eligible') {
    return {
      stage: 'school_fees_partial',
      nextActions: ['Clear outstanding fees', 'Complete semester registration'],
      blockers: eligibility.restrictions,
    };
  }

  return {
    stage: 'school_fees_pending',
    nextActions: ['Pay school fees', 'Complete semester registration'],
    blockers: eligibility.restrictions,
  };
}

// =====================================================
// PAYMENT GATEWAY INTEGRATION
// =====================================================

export interface PaymentInitiation {
  reference: string;
  amount: number;
  email: string;
  metadata: {
    admissionNumber: string;
    session: string;
    semester: number;
  };
}

export function initiatePayment(
  student: StudentProfile,
  amount: number,
  method: 'paystack' | 'bank_transfer'
): PaymentInitiation {
  const reference = `ISA_${Date.now()}_${student.admissionNumber}`;
  
  return {
    reference,
    amount,
    email: student.email,
    metadata: {
      admissionNumber: student.admissionNumber,
      session: '2024/2025',
      semester: student.semester,
    },
  };
}

export function verifyPayment(paymentReference: string): {
  success: boolean;
  verifiedAt?: string;
  message: string;
} {
  // Mock verification
  return {
    success: true,
    verifiedAt: new Date().toISOString(),
    message: 'Payment verified successfully',
  };
}

// =====================================================
// FEE CONFIGURATION
// =====================================================

export interface FeeConfiguration {
  fees: FeeItem[];
  session: string;
  facultyId: string;
  departmentId: string;
  programmeId: string;
}

export function calculateTotalFees(feeItems: FeeItem[]): number {
  return feeItems
    .filter(item => item.enabled)
    .reduce((sum, item) => sum + item.amount, 0);
}

export function generateFeeBreakdown(
  student: StudentProfile
): { item: FeeItem; paid: number; balance: number }[] {
  return DEFAULT_FEE_ITEMS.map(item => ({
    item,
    paid: item.enabled ? Math.min(item.amount, getStudentPaymentStatus(student).amountPaid) : 0,
    balance: item.enabled ? Math.max(0, item.amount - getStudentPaymentStatus(student).amountPaid) : 0,
  }));
}
