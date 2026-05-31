// =====================================================
// SUPABASE STORAGE FOR DOCUMENT UPLOADS
// InnovaSci AI Labs Polytechnic - Admissions System
// =====================================================

import { supabase } from './supabase';
import { isSupabaseConfigured } from './supabase';

// Storage bucket names
export const STORAGE_BUCKETS = {
  SSCE_DOCUMENTS: 'ssce-documents',
  JAMB_DOCUMENTS: 'jamb-documents',
  QUALIFICATION_DOCUMENTS: 'qualification-documents',
  TRANSCRIPT_DOCUMENTS: 'transcript-documents',
  ADMISSION_DOCUMENTS: 'admission-documents',
  PASSPORT_PHOTOS: 'passport-photos',
} as const;

// Document types for applications
export type DocumentType = 
  | 'passport'
  | 'ssce'
  | 'jamb'
  | 'qualification'
  | 'transcript'
  | 'industrial_training';

// File validation constants
const ALLOWED_MIME_TYPES: string[] = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_EXTENSIONS: ['.pdf', '.jpg', '.jpeg', '.png'],
} as const;

// Get bucket path for document type
export function getBucketForDocumentType(type: DocumentType): string {
  switch (type) {
    case 'passport':
      return STORAGE_BUCKETS.PASSPORT_PHOTOS;
    case 'ssce':
      return STORAGE_BUCKETS.SSCE_DOCUMENTS;
    case 'jamb':
      return STORAGE_BUCKETS.JAMB_DOCUMENTS;
    case 'qualification':
      return STORAGE_BUCKETS.QUALIFICATION_DOCUMENTS;
    case 'transcript':
      return STORAGE_BUCKETS.TRANSCRIPT_DOCUMENTS;
    case 'industrial_training':
      return STORAGE_BUCKETS.ADMISSION_DOCUMENTS;
    default:
      return STORAGE_BUCKETS.ADMISSION_DOCUMENTS;
  }
}

// Generate unique file path
export function generateFilePath(
  applicationId: string,
  documentType: DocumentType,
  fileName: string
): string {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${applicationId}/${documentType}/${timestamp}-${sanitizedFileName}`;
}

// Validate file type
export function validateFileType(file: File): boolean {
  return ALLOWED_MIME_TYPES.includes(file.type);
}

// Validate file size
export function validateFileSize(file: File): boolean {
  return file.size <= FILE_LIMITS.MAX_SIZE;
}

// Upload file to Supabase storage
export async function uploadDocument(
  file: File,
  applicationId: string,
  documentType: DocumentType
): Promise<{ success: boolean; path?: string; error?: string }> {
  if (!isSupabaseConfigured()) {
    // For demo mode, simulate successful upload
    console.log('[DEMO MODE] Simulating file upload:', {
      name: file.name,
      size: file.size,
      type: file.type,
      applicationId,
      documentType,
    });
    return {
      success: true,
      path: `demo/${applicationId}/${documentType}/${file.name}`,
    };
  }

  try {
    // Validate file
    if (!validateFileType(file)) {
      return { success: false, error: 'Invalid file type. Please upload PDF, JPG, or PNG files.' };
    }
    if (!validateFileSize(file)) {
      return { success: false, error: 'File too large. Maximum size is 10MB.' };
    }

    const bucket = getBucketForDocumentType(documentType);
    const filePath = generateFilePath(applicationId, documentType, file.name);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message || 'Failed to upload file.' };
    }

    return { success: true, path: filePath };
  } catch (error) {
    console.error('Upload exception:', error);
    return { success: false, error: 'An unexpected error occurred during upload.' };
  }
}

// Delete file from Supabase storage
export async function deleteDocument(
  bucket: string,
  filePath: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log('[DEMO MODE] Simulating file deletion:', filePath);
    return { success: true };
  }

  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete file.' };
  }
}

// Get public URL for document
export function getDocumentUrl(
  bucket: string,
  filePath: string
): string | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

// Download document
export async function downloadDocument(
  bucket: string,
  filePath: string
): Promise<{ success: boolean; data?: Blob; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Storage not configured' };
  }

  try {
    const { data, error } = await supabase.storage.from(bucket).download(filePath);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to download document.' };
  }
}

// Format file size for display
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Get document type display name
export function getDocumentTypeLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    passport: 'Passport Photograph',
    ssce: 'SSCE Result',
    jamb: 'JAMB Result',
    qualification: 'Previous Qualification',
    transcript: 'Academic Transcript',
    industrial_training: 'Industrial Training Evidence',
  };
  return labels[type];
}

// Get accepted formats string
export function getAcceptedFormats(): string {
  return FILE_LIMITS.ALLOWED_EXTENSIONS.join(',');
}
