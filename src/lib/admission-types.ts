// =====================================================
// ADMISSION SYSTEM TYPES
// InnovaSci Open Polytechnic - Admissions System
// =====================================================

import type { DocumentType } from './storage';

// Application status enum
export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'admission_offered';

// Application type
export type ApplicationType = 'ND' | 'HND';

// Gender type
export type Gender = 'male' | 'female';

// Guardian relationship types
export const GUARDIAN_RELATIONSHIPS = [
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Uncle',
  'Aunt',
  'Grandparent',
  'Guardian',
  'Other',
] as const;
export type GuardianRelationship = typeof GUARDIAN_RELATIONSHIPS[number];

// SSCE exam types
export const SSCE_TYPES = [
  'WAEC',
  'NECO',
  'NABTEB',
  'GCE',
] as const;
export type SSCEType = typeof SSCE_TYPES[number];

// Previous qualification types for HND
export const PREVIOUS_QUALIFICATIONS = [
  'ND',
  'NCE',
  'BSc',
  'HND',
  'Equivalent Qualification',
] as const;
export type PreviousQualification = typeof PREVIOUS_QUALIFICATIONS[number];

// Personal information interface
export interface PersonalInformation {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  nationality: string;
  state?: string;
  localGovernment?: string;
}

// Academic information interface
export interface AcademicInformation {
  applicationType: ApplicationType;
  faculty: string;
  department: string;
  program: string;
}

// Emergency contact interface
export interface EmergencyContact {
  guardianName: string;
  relationship: GuardianRelationship;
  phoneNumber: string;
}

// Document upload state
export interface DocumentUpload {
  type: DocumentType;
  fileName: string;
  fileSize: number;
  filePath: string;
  uploadedAt: string;
  status: 'pending' | 'uploading' | 'uploaded' | 'error';
  error?: string;
}

// Full admission application data
export interface AdmissionApplicationData {
  personalInfo: PersonalInformation;
  academicInfo: AcademicInformation;
  emergencyContact: EmergencyContact;
  documents: DocumentUpload[];
  applicationId?: string;
  status: ApplicationStatus;
  submittedAt?: string;
  lastSavedAt?: string;
}

// Create initial empty application data
export function createEmptyApplicationData(): AdmissionApplicationData {
  return {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'male',
      nationality: '',
    },
    academicInfo: {
      applicationType: 'ND',
      faculty: '',
      department: '',
      program: '',
    },
    emergencyContact: {
      guardianName: '',
      relationship: 'Father',
      phoneNumber: '',
    },
    documents: [],
    status: 'draft',
  };
}

// Application status display labels
export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  approved: 'Approved',
  rejected: 'Rejected',
  admission_offered: 'Admission Offered',
};

// Application status colors (for badges)
export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  admission_offered: 'bg-purple-100 text-purple-800',
};

// Required documents by application type (Direct Application Model - No JAMB Required)
export const REQUIRED_DOCUMENTS: Record<ApplicationType, DocumentType[]> = {
  ND: ['passport', 'ssce'],
  HND: ['passport', 'ssce', 'qualification', 'transcript', 'industrial_training'],
};

// Optional documents
export const OPTIONAL_DOCUMENTS: DocumentType[] = ['industrial_training'];

// Check if document is required
export function isDocumentRequired(
  documentType: DocumentType,
  applicationType: ApplicationType
): boolean {
  return REQUIRED_DOCUMENTS[applicationType].includes(documentType);
}

// Check if document is optional
export function isDocumentOptional(documentType: DocumentType): boolean {
  return OPTIONAL_DOCUMENTS.includes(documentType);
}

// Form step configuration
export interface FormStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const ADMISSION_FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Basic details about you',
    icon: 'User',
  },
  {
    id: 2,
    title: 'Academic Information',
    description: 'Your educational background',
    icon: 'GraduationCap',
  },
  {
    id: 3,
    title: 'Emergency Contact',
    description: 'Guardian/Parent contact info',
    icon: 'Phone',
  },
  {
    id: 4,
    title: 'Document Upload',
    description: 'Required certificates and documents',
    icon: 'Upload',
  },
  {
    id: 5,
    title: 'Review & Submit',
    description: 'Confirm your application',
    icon: 'CheckCircle',
  },
];

// Review comment interface
export interface ReviewComment {
  id: string;
  applicationId: string;
  reviewerId: string;
  reviewerName: string;
  comment: string;
  createdAt: string;
}

// Application review data
export interface ApplicationReview {
  applicationId: string;
  status: ApplicationStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  comments: ReviewComment[];
  verifiedDocuments: DocumentType[];
}