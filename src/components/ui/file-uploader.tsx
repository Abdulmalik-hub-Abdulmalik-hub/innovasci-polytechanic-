"use client"

import { useState, useRef, useCallback } from 'react'
import { 
  Upload, X, FileText, CheckCircle, AlertCircle, 
  Loader2, Trash2, Eye, Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  uploadDocument,
  deleteDocument,
  getBucketForDocumentType,
  validateFileType,
  validateFileSize,
  formatFileSize,
  getDocumentTypeLabel,
  getAcceptedFormats,
  type DocumentType,
} from '@/lib/storage'
import { cn } from '@/lib/utils'

interface FileUploaderProps {
  documentType: DocumentType
  applicationId: string
  onUploadComplete?: (filePath: string, fileName: string) => void
  onRemove?: () => void
  existingFile?: {
    name: string
    path: string
    url?: string
  }
  required?: boolean
}

export function FileUploader({
  documentType,
  applicationId,
  onUploadComplete,
  onRemove,
  existingFile,
  required = false,
}: FileUploaderProps) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'uploaded' | 'error'>(
    existingFile ? 'uploaded' : 'idle'
  )
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileName, setFileName] = useState<string>(existingFile?.name || '')
  const [filePath, setFilePath] = useState<string>(existingFile?.path || '')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file type
    if (!validateFileType(file)) {
      setStatus('error')
      setErrorMessage('Invalid file type. Please upload PDF, JPG, or PNG files.')
      return
    }

    // Validate file size
    if (!validateFileSize(file)) {
      setStatus('error')
      setErrorMessage('File too large. Maximum size is 10MB.')
      return
    }

    setStatus('uploading')
    setUploadProgress(0)
    setErrorMessage('')
    setFileName(file.name)

    // Simulate progress for demo mode
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 10
      })
    }, 100)

    const result = await uploadDocument(file, applicationId, documentType)

    clearInterval(progressInterval)
    setUploadProgress(100)

    if (result.success && result.path) {
      setStatus('uploaded')
      setFilePath(result.path)
      onUploadComplete?.(result.path, file.name)
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Upload failed')
    }
  }, [applicationId, documentType, onUploadComplete])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleRemove = useCallback(async () => {
    if (filePath && status === 'uploaded') {
      const bucket = getBucketForDocumentType(documentType)
      await deleteDocument(bucket, filePath)
    }
    setStatus('idle')
    setFileName('')
    setFilePath('')
    setUploadProgress(0)
    setErrorMessage('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onRemove?.()
  }, [filePath, status, documentType, onRemove])

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {getDocumentTypeLabel(documentType)}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <span className="text-xs text-gray-500">
          {getAcceptedFormats()} (Max 10MB)
        </span>
      </div>

      {/* Drop zone */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer",
          isDragging 
            ? "border-blue-500 bg-blue-50" 
            : status === 'error'
              ? "border-red-300 bg-red-50"
              : status === 'uploaded'
                ? "border-green-300 bg-green-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={status === 'idle' || status === 'error' ? openFileSelector : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleInputChange}
          disabled={status === 'uploading'}
        />

        {status === 'idle' && (
          <div className="space-y-3">
            <div className={cn(
              "w-14 h-14 rounded-full mx-auto flex items-center justify-center",
              isDragging ? "bg-blue-100" : "bg-gray-100"
            )}>
              <Upload className={cn("w-7 h-7", isDragging ? "text-blue-600" : "text-gray-500")} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isDragging ? "Drop file here" : "Click or drag file to upload"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, JPG, JPEG, PNG up to 10MB
              </p>
            </div>
          </div>
        )}

        {status === 'uploading' && (
          <div className="space-y-3">
            <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
            <div>
              <p className="text-sm font-medium text-gray-700">{fileName}</p>
              <p className="text-xs text-gray-500 mt-1">Uploading...</p>
            </div>
            <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
          </div>
        )}

        {status === 'uploaded' && (
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full mx-auto bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                {fileName}
              </p>
              <p className="text-xs text-green-600 mt-1">Upload successful</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation()
                  openFileSelector()
                }}
              >
                Replace
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                className="text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-full mx-auto bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-700">{errorMessage}</p>
              <p className="text-xs text-gray-500 mt-1">Click to try again</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Document preview component
interface DocumentPreviewProps {
  fileName: string
  filePath: string
  fileUrl?: string
  onRemove?: () => void
}

export function DocumentPreview({ fileName, filePath, fileUrl, onRemove }: DocumentPreviewProps) {
  const isImage = /\.(jpg|jpeg|png)$/i.test(fileName)

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
        {isImage ? (
          <img 
            src={fileUrl || '/placeholder.png'} 
            alt={fileName}
            className="w-10 h-10 rounded-lg object-cover"
          />
        ) : (
          <FileText className="w-5 h-5 text-blue-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
        <p className="text-xs text-gray-500 truncate">{filePath}</p>
      </div>
      <div className="flex items-center gap-2">
        {fileUrl && (
          <Button variant="ghost" size="sm" asChild>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4" />
            </a>
          </Button>
        )}
        {onRemove && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

// Multi-file uploader for transcript documents
interface MultiFileUploaderProps {
  documentType: DocumentType
  applicationId: string
  existingFiles?: Array<{ name: string; path: string; url?: string }>
  onUploadComplete?: (filePath: string, fileName: string) => void
  onRemove?: (filePath: string) => void
  maxFiles?: number
}

export function MultiFileUploader({
  documentType,
  applicationId,
  existingFiles = [],
  onUploadComplete,
  onRemove,
  maxFiles = 5,
}: MultiFileUploaderProps) {
  const [files, setFiles] = useState(existingFiles)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (newFiles: FileList) => {
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`)
      return
    }

    for (const file of Array.from(newFiles)) {
      if (!validateFileType(file) || !validateFileSize(file)) {
        continue
      }

      const result = await uploadDocument(file, applicationId, documentType)
      if (result.success && result.path) {
        const newFile = { name: file.name, path: result.path }
        setFiles(prev => [...prev, newFile])
        onUploadComplete?.(result.path, file.name)
      }
    }
  }

  const handleRemove = async (filePath: string) => {
    const bucket = getBucketForDocumentType(documentType)
    await deleteDocument(bucket, filePath)
    setFiles(prev => prev.filter(f => f.path !== filePath))
    onRemove?.(filePath)
  }

  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <DocumentPreview
          key={`${file.path}-${index}`}
          fileName={file.name}
          filePath={file.path}
          fileUrl={file.url}
          onRemove={() => handleRemove(file.path)}
        />
      ))}
      
      {files.length < maxFiles && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <p className="text-sm text-gray-600">
            + Add another file ({files.length}/{maxFiles})
          </p>
        </div>
      )}
    </div>
  )
}