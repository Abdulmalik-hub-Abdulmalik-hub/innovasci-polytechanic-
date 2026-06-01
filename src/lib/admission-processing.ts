// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - ADMISSION PROCESSING ENGINE
// Admission Number Generation & Student Record Management
// =====================================================

import { SEEDED_PROGRAMMES, SEEDED_DEPARTMENTS, SEEDED_FACULTIES } from './academic-data';

// =====================================================
// SECTION 1: PROGRAMME CODE ENGINE
// =====================================================

/**
 * Generate a standardized programme code from programme name
 * Code format: First 3 letters of each significant word, uppercase
 */
export function generateProgrammeCode(programmeName: string): string {
  // Remove common prefixes/suffixes
  const cleanName = programmeName
    .replace(/\b(ND|HND|Diploma|Certificate)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Split into words
  const words = cleanName.split(' ');

  // Generate code from significant words
  let code = '';
  for (const word of words) {
    if (word.length >= 3 && !['and', 'the', 'of', 'in', 'for'].includes(word.toLowerCase())) {
      code += word.substring(0, 3).toUpperCase();
    }
  }

  // Fallback: first 3 letters of first word + first 3 of second
  if (code.length < 3) {
    code = cleanName.substring(0, 6).toUpperCase().replace(/\s/g, '');
  }

  return code.substring(0, 6);
}

/**
 * Get programme code from seeded programmes
 */
export function getProgrammeCode(programmeId: string): string {
  const programme = SEEDED_PROGRAMMES.find(p => p.id === programmeId);
  if (programme) {
    return programme.code;
  }
  // Generate code from name if not found in seeded data
  return generateProgrammeCode(programmeId);
}

/**
 * Get all programme codes mapped
 */
export function getAllProgrammeCodes(): Record<string, string> {
  const codes: Record<string, string> = {};
  
  SEEDED_PROGRAMMES.forEach(p => {
    codes[p.id] = p.code;
    codes[p.name] = p.code;
  });

  return codes;
}

// =====================================================
// SECTION 2: ADMISSION NUMBER GENERATION ENGINE
// =====================================================

export type EntryCategory = 'ND' | 'HND';

export interface AdmissionNumberConfig {
  institutionCode: string;
  separator: string;
  yearFormat: 'YYYY' | 'YY';
  sequencePadding: number;
}

const DEFAULT_CONFIG: AdmissionNumberConfig = {
  institutionCode: 'INS',
  separator: '/',
  yearFormat: 'YYYY',
  sequencePadding: 4,
};

/**
 * Generate admission number
 * Format: INS/ND/XXX/2026/0001
 */
export function generateAdmissionNumber(
  entryCategory: EntryCategory,
  programmeCode: string,
  admissionYear: number,
  sequenceNumber: number,
  config: AdmissionNumberConfig = DEFAULT_CONFIG
): string {
  const parts = [
    config.institutionCode,
    entryCategory,
    programmeCode.substring(0, 3).toUpperCase(),
    config.yearFormat === 'YYYY' ? String(admissionYear) : String(admissionYear).slice(-2),
    String(sequenceNumber).padStart(config.sequencePadding, '0'),
  ];

  return parts.join(config.separator);
}

/**
 * Parse admission number components
 */
export function parseAdmissionNumber(admissionNumber: string): {
  institutionCode: string;
  entryCategory: EntryCategory;
  programmeCode: string;
  year: number;
  sequence: number;
} | null {
  const parts = admissionNumber.split('/');
  if (parts.length !== 5) return null;

  const [institutionCode, entryCategory, programmeCode, yearStr, sequenceStr] = parts;
  
  return {
    institutionCode,
    entryCategory: entryCategory as EntryCategory,
    programmeCode,
    year: parseInt(yearStr, 10),
    sequence: parseInt(sequenceStr, 10),
  };
}

/**
 * Validate admission number format
 */
export function isValidAdmissionNumber(admissionNumber: string): boolean {
  const pattern = /^[A-Z]{2,4}\/(ND|HND)\/[A-Z]{3,6}\/\d{2,4}\/\d{4}$/;
  return pattern.test(admissionNumber);
}

// =====================================================
// SECTION 3: SEQUENTIAL NUMBER MANAGEMENT
// =====================================================

interface SequenceTracker {
  [key: string]: number; // Key: programmeCode + year
}

// In-memory sequence tracker (in production, use database)
const sequenceTracker: SequenceTracker = {};

/**
 * Get next sequence number for a programme/year combination
 */
export function getNextSequenceNumber(
  programmeCode: string,
  entryCategory: EntryCategory,
  admissionYear: number
): number {
  const key = `${programmeCode}_${entryCategory}_${admissionYear}`;
  
  if (!sequenceTracker[key]) {
    sequenceTracker[key] = 0;
  }

  sequenceTracker[key]++;
  return sequenceTracker[key];
}

/**
 * Reset sequence for a programme (use with caution)
 */
export function resetSequence(
  programmeCode: string,
  entryCategory: EntryCategory,
  admissionYear: number
): void {
  const key = `${programmeCode}_${entryCategory}_${admissionYear}`;
  sequenceTracker[key] = 0;
}

// =====================================================
// SECTION 4: ADMISSION OFFER MANAGEMENT
// =====================================================

export interface AdmissionOffer {
  id: string;
  applicationId: string;
  admissionNumber: string;
  studentName: string;
  email: string;
  phone: string;
  
  // Academic Info
  entryCategory: EntryCategory;
  facultyId: string;
  facultyName: string;
  departmentId: string;
  departmentName: string;
  programmeId: string;
  programmeName: string;
  programmeCode: string;
  
  // Admission Details
  admissionYear: number;
  admissionDate: string;
  status: 'offered' | 'accepted' | 'rejected' | 'enrolled' | 'withdrawn';
  
  // Audit
  offeredBy: string;
  offeredAt: string;
  acceptedAt?: string;
  rejectedAt?: string;
}

/**
 * Create admission offer with auto-generated admission number
 */
export function createAdmissionOffer(
  application: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    entryCategory: EntryCategory;
    facultyId: string;
    facultyName: string;
    departmentId: string;
    departmentName: string;
    programmeId: string;
    programmeName: string;
  },
  offeredBy: string
): AdmissionOffer {
  // Get programme code
  const programme = SEEDED_PROGRAMMES.find(p => p.id === application.programmeId);
  const programmeCode = programme?.code || generateProgrammeCode(application.programmeName);
  
  // Get current admission year
  const admissionYear = new Date().getFullYear();
  
  // Get next sequence number
  const sequenceNumber = getNextSequenceNumber(programmeCode, application.entryCategory, admissionYear);
  
  // Generate admission number
  const admissionNumber = generateAdmissionNumber(
    application.entryCategory,
    programmeCode,
    admissionYear,
    sequenceNumber
  );

  const offer: AdmissionOffer = {
    id: `offer_${Date.now()}`,
    applicationId: application.id,
    admissionNumber,
    studentName: application.fullName,
    email: application.email,
    phone: application.phone,
    entryCategory: application.entryCategory,
    facultyId: application.facultyId,
    facultyName: application.facultyName,
    departmentId: application.departmentId,
    departmentName: application.departmentName,
    programmeId: application.programmeId,
    programmeName: application.programmeName,
    programmeCode,
    admissionYear,
    admissionDate: new Date().toISOString(),
    status: 'offered',
    offeredBy,
    offeredAt: new Date().toISOString(),
  };

  return offer;
}

// =====================================================
// SECTION 5: STUDENT RECORD CREATION
// =====================================================

export interface StudentRecord {
  id: string;
  admissionNumber: string;
  studentName: string;
  email: string;
  phone: string;
  avatar?: string;
  
  // Academic Info
  entryCategory: EntryCategory;
  facultyId: string;
  facultyName: string;
  departmentId: string;
  departmentName: string;
  programmeId: string;
  programmeName: string;
  programmeCode: string;
  level: number; // 1 for ND1/HND1
  semester: number; // 1
  academicStatus: 'active' | 'graduated' | 'suspended' | 'withdrawn';
  
  // Admission Details
  admissionYear: number;
  admissionDate: string;
  
  // Student Identifiers
  studentId: string; // Internal ID
  
  // Security
  password?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create student record from admission offer
 */
export function createStudentRecord(offer: AdmissionOffer): StudentRecord {
  const studentId = generateStudentId(offer.admissionNumber);
  
  const studentRecord: StudentRecord = {
    id: `student_${Date.now()}`,
    admissionNumber: offer.admissionNumber,
    studentName: offer.studentName,
    email: offer.email,
    phone: offer.phone,
    entryCategory: offer.entryCategory,
    facultyId: offer.facultyId,
    facultyName: offer.facultyName,
    departmentId: offer.departmentId,
    departmentName: offer.departmentName,
    programmeId: offer.programmeId,
    programmeName: offer.programmeName,
    programmeCode: offer.programmeCode,
    level: 1, // Start at level 1
    semester: 1, // Start at semester 1
    academicStatus: 'active',
    admissionYear: offer.admissionYear,
    admissionDate: offer.admissionDate,
    studentId,
    isVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return studentRecord;
}

/**
 * Generate unique student ID from admission number
 */
function generateStudentId(admissionNumber: string): string {
  const parsed = parseAdmissionNumber(admissionNumber);
  if (!parsed) {
    return `STU${Date.now()}`;
  }
  return `STU${parsed.year}${String(parsed.sequence).padStart(6, '0')}`;
}

// =====================================================
// SECTION 6: BULK ADMISSION PROCESSING
// =====================================================

export interface BulkAdmissionResult {
  total: number;
  successful: number;
  failed: number;
  offers: AdmissionOffer[];
  errors: { applicationId: string; error: string }[];
}

/**
 * Process bulk admission for multiple applicants
 */
export function processBulkAdmission(
  applications: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    entryCategory: EntryCategory;
    facultyId: string;
    facultyName: string;
    departmentId: string;
    departmentName: string;
    programmeId: string;
    programmeName: string;
  }>,
  offeredBy: string
): BulkAdmissionResult {
  const result: BulkAdmissionResult = {
    total: applications.length,
    successful: 0,
    failed: 0,
    offers: [],
    errors: [],
  };

  for (const app of applications) {
    try {
      const offer = createAdmissionOffer(app, offeredBy);
      result.offers.push(offer);
      result.successful++;
    } catch (error) {
      result.errors.push({
        applicationId: app.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      result.failed++;
    }
  }

  return result;
}

// =====================================================
// SECTION 7: ADMISSION LOGGING
// =====================================================

export interface AdmissionLog {
  id: string;
  timestamp: string;
  action: 'application_received' | 'review_started' | 'review_completed' | 
          'document_verified' | 'admission_approved' | 'admission_rejected' | 
          'correction_requested' | 'offer_issued' | 'offer_accepted' | 
          'offer_rejected' | 'student_created' | 'admission_number_generated';
  userId: string;
  userName: string;
  targetId: string; // Application, Offer, or Student ID
  targetType: 'application' | 'offer' | 'student';
  details?: string;
  metadata?: Record<string, unknown>;
}

// In-memory log store (in production, use database)
const admissionLogs: AdmissionLog[] = [];

/**
 * Log admission action
 */
export function logAdmissionAction(
  action: AdmissionLog['action'],
  userId: string,
  userName: string,
  targetId: string,
  targetType: AdmissionLog['targetType'],
  details?: string,
  metadata?: Record<string, unknown>
): AdmissionLog {
  const log: AdmissionLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    action,
    userId,
    userName,
    targetId,
    targetType,
    details,
    metadata,
  };

  admissionLogs.push(log);
  return log;
}

/**
 * Get admission logs for a target
 */
export function getAdmissionLogs(targetId: string, targetType?: AdmissionLog['targetType']): AdmissionLog[] {
  return admissionLogs.filter(log => 
    log.targetId === targetId && 
    (targetType ? log.targetType === targetType : true)
  );
}

/**
 * Get all admission logs
 */
export function getAllAdmissionLogs(): AdmissionLog[] {
  return [...admissionLogs];
}

// =====================================================
// SECTION 8: APPLICATION STATUS MANAGEMENT
// =====================================================

export type ApplicationStatus = 
  | 'submitted'
  | 'under_review'
  | 'document_verification'
  | 'approved'
  | 'rejected'
  | 'correction_requested'
  | 'admission_offered'
  | 'admission_accepted'
  | 'enrolled';

/**
 * Get status display info
 */
export function getStatusInfo(status: ApplicationStatus): {
  label: string;
  color: string;
  bgColor: string;
  description: string;
} {
  const statusMap: Record<ApplicationStatus, ReturnType<typeof getStatusInfo>> = {
    submitted: {
      label: 'Submitted',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 border-blue-200',
      description: 'Application received and awaiting review',
    },
    under_review: {
      label: 'Under Review',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50 border-amber-200',
      description: 'Application is being reviewed by admission officer',
    },
    document_verification: {
      label: 'Document Verification',
      color: 'text-purple-700',
      bgColor: 'bg-purple-50 border-purple-200',
      description: 'Applicant documents are being verified',
    },
    approved: {
      label: 'Approved',
      color: 'text-green-700',
      bgColor: 'bg-green-50 border-green-200',
      description: 'Application approved, awaiting admission offer',
    },
    rejected: {
      label: 'Rejected',
      color: 'text-red-700',
      bgColor: 'bg-red-50 border-red-200',
      description: 'Application has been rejected',
    },
    correction_requested: {
      label: 'Correction Requested',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50 border-orange-200',
      description: 'Applicant needs to correct some information',
    },
    admission_offered: {
      label: 'Admission Offered',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50 border-emerald-200',
      description: 'Admission offer has been issued',
    },
    admission_accepted: {
      label: 'Offer Accepted',
      color: 'text-teal-700',
      bgColor: 'bg-teal-50 border-teal-200',
      description: 'Applicant has accepted admission offer',
    },
    enrolled: {
      label: 'Enrolled',
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50 border-indigo-200',
      description: 'Student has been enrolled in the programme',
    },
  };

  return statusMap[status];
}

/**
 * Get next allowed statuses from current status
 */
export function getNextStatuses(currentStatus: ApplicationStatus): ApplicationStatus[] {
  const workflow: Record<ApplicationStatus, ApplicationStatus[]> = {
    submitted: ['under_review', 'rejected'],
    under_review: ['document_verification', 'rejected', 'correction_requested'],
    document_verification: ['approved', 'rejected', 'correction_requested'],
    approved: ['admission_offered'],
    rejected: [],
    correction_requested: ['under_review'],
    admission_offered: ['admission_accepted', 'rejected'],
    admission_accepted: ['enrolled'],
    enrolled: [],
  };

  return workflow[currentStatus];
}

// =====================================================
// SECTION 9: STATISTICS & REPORTING
// =====================================================

export interface AdmissionStatistics {
  totalApplications: number;
  byStatus: Record<ApplicationStatus, number>;
  byEntryCategory: Record<EntryCategory, number>;
  byFaculty: Record<string, number>;
  byDepartment: Record<string, number>;
  byProgramme: Record<string, number>;
  byYear: Record<number, number>;
  admissionRate: number;
  rejectionRate: number;
  averageProcessingDays: number;
}

/**
 * Calculate admission statistics
 */
export function calculateAdmissionStatistics(
  applications: Array<{
    status: ApplicationStatus;
    entryCategory: EntryCategory;
    facultyId: string;
    departmentId: string;
    programmeId: string;
    createdAt: string;
  }>
): AdmissionStatistics {
  const stats: AdmissionStatistics = {
    totalApplications: applications.length,
    byStatus: {} as Record<ApplicationStatus, number>,
    byEntryCategory: { ND: 0, HND: 0 },
    byFaculty: {},
    byDepartment: {},
    byProgramme: {},
    byYear: {},
    admissionRate: 0,
    rejectionRate: 0,
    averageProcessingDays: 0,
  };

  // Initialize counts
  const statuses: ApplicationStatus[] = [
    'submitted', 'under_review', 'document_verification', 'approved',
    'rejected', 'correction_requested', 'admission_offered', 'admission_accepted', 'enrolled'
  ];
  statuses.forEach(s => stats.byStatus[s] = 0);

  let totalAdmitted = 0;
  let totalRejected = 0;
  let totalDays = 0;

  applications.forEach(app => {
    // Count by status
    stats.byStatus[app.status] = (stats.byStatus[app.status] || 0) + 1;

    // Count by entry category
    stats.byEntryCategory[app.entryCategory]++;

    // Count by faculty
    stats.byFaculty[app.facultyId] = (stats.byFaculty[app.facultyId] || 0) + 1;

    // Count by department
    stats.byDepartment[app.departmentId] = (stats.byDepartment[app.departmentId] || 0) + 1;

    // Count by programme
    stats.byProgramme[app.programmeId] = (stats.byProgramme[app.programmeId] || 0) + 1;

    // Count by year
    const year = new Date(app.createdAt).getFullYear();
    stats.byYear[year] = (stats.byYear[year] || 0) + 1;

    // Track admitted/rejected
    if (['admission_offered', 'admission_accepted', 'enrolled'].includes(app.status)) {
      totalAdmitted++;
    }
    if (app.status === 'rejected') {
      totalRejected++;
    }
  });

  // Calculate rates
  stats.admissionRate = applications.length > 0 
    ? (totalAdmitted / applications.length) * 100 
    : 0;
  stats.rejectionRate = applications.length > 0 
    ? (totalRejected / applications.length) * 100 
    : 0;

  return stats;
}

// =====================================================
// EXPORTS
// =====================================================

// All functions are exported inline, no need for block export

// Demo data for testing
export const DEMO_APPLICATIONS = [
  {
    id: 'app1',
    fullName: 'Adebayo Johnson',
    email: 'adebayo.johnson@email.com',
    phone: '+2348012345678',
    entryCategory: 'ND' as EntryCategory,
    facultyId: 'f1',
    facultyName: 'School of AI & Computational Intelligence',
    departmentId: 'd1',
    departmentName: 'Artificial Intelligence & Machine Learning',
    programmeId: 'p1',
    programmeName: 'Applied Machine Learning',
    status: 'under_review' as ApplicationStatus,
    createdAt: '2024-06-01',
  },
  {
    id: 'app2',
    fullName: 'Fatima Ibrahim',
    email: 'fatima.ibrahim@email.com',
    phone: '+2348023456789',
    entryCategory: 'HND' as EntryCategory,
    facultyId: 'f3',
    facultyName: 'School of Business',
    departmentId: 'd8',
    departmentName: 'Business Administration',
    programmeId: 'p15',
    programmeName: 'Business Administration',
    status: 'submitted' as ApplicationStatus,
    createdAt: '2024-06-02',
  },
  {
    id: 'app3',
    fullName: 'Emmanuel Okonkwo',
    email: 'emmanuel.okonkwo@email.com',
    phone: '+2348034567890',
    entryCategory: 'ND' as EntryCategory,
    facultyId: 'f2',
    facultyName: 'School of Engineering',
    departmentId: 'd4',
    departmentName: 'Electrical/Electronic Engineering',
    programmeId: 'p7',
    programmeName: 'Electrical/Electronic Engineering',
    status: 'approved' as ApplicationStatus,
    createdAt: '2024-06-03',
  },
];