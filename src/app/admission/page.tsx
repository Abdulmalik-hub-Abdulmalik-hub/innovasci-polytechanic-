"use client"

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  GraduationCap, Loader2, CheckCircle, ArrowLeft, ArrowRight,
  User, MapPin, Phone, AlertCircle,
  Save, Info, Shield, Upload, CheckCircle as CheckIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { FileUploader } from '@/components/ui/file-uploader'
import { CountryStateLGA } from '@/components/ui/location-select'
import { curriculumData } from '@/lib/curriculum-data'
import { getCountryById } from '@/lib/countries'
import {
  ADMISSION_FORM_STEPS,
  REQUIRED_DOCUMENTS,
  GUARDIAN_RELATIONSHIPS,
  createEmptyApplicationData,
  type AdmissionApplicationData,
  type ApplicationType,
} from '@/lib/admission-types'
import { cn } from '@/lib/utils'

// Generate unique application ID
function generateApplicationId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `ISA-${timestamp}-${random}`.toUpperCase()
}

export default function EnhancedAdmissionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [applicationId] = useState(generateApplicationId())

  // Form state
  const [formData, setFormData] = useState<AdmissionApplicationData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admission-draft')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          // ignore
        }
      }
    }
    return createEmptyApplicationData()
  })

  // Track uploaded documents
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, { path: string; name: string }>>({})

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admission-draft', JSON.stringify(formData))
    }
  }, [formData])

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const updateAcademicInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      academicInfo: { ...prev.academicInfo, [field]: value },
    }))
  }

  const updateEmergencyContact = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value },
    }))
  }

  const handleDocumentUpload = (docType: string, path: string, name: string) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [docType]: { path, name },
    }))
  }

  const handleDocumentRemove = (docType: string) => {
    setUploadedDocuments(prev => {
      const newDocs = { ...prev }
      delete newDocs[docType]
      return newDocs
    })
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const saveDraft = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    const requiredDocs = REQUIRED_DOCUMENTS[formData.academicInfo.applicationType as ApplicationType]
    const missingDocs = requiredDocs.filter(doc => !uploadedDocuments[doc])
    
    if (missingDocs.length > 0) {
      alert(`Please upload all required documents: ${missingDocs.join(', ')}`)
      setIsSubmitting(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 2000))
    
    localStorage.removeItem('admission-draft')
    
    router.push(`/admission/success?appId=${applicationId}`)
  }

  // Get program options based on application type
  const faculties = curriculumData.map(f => ({
    id: f.id,
    name: f.name,
    departments: f.departments.map(d => ({
      name: d.name,
      programs: d.programs.map(p => ({ id: p.code, name: p.name }))
    })),
  }))

  const selectedFaculty = faculties.find(f => f.id === formData.academicInfo.faculty)
  const selectedDepartment = selectedFaculty?.departments.find(d => d.name === formData.academicInfo.department)
  
  const filteredPrograms = selectedDepartment?.programs.filter(p => {
    if (formData.academicInfo.applicationType === 'ND') {
      return !p.id.endsWith('-HND')
    } else {
      return p.id.endsWith('-HND')
    }
  }) || []

  const guardianRelationOptions = GUARDIAN_RELATIONSHIPS.map(r => ({ value: r, label: r }))

  // Step validation
  const canProceed = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.personalInfo.fullName &&
          formData.personalInfo.email &&
          formData.personalInfo.phone &&
          formData.personalInfo.dateOfBirth &&
          formData.personalInfo.gender &&
          formData.personalInfo.nationality
        )
      case 2:
        return !!(
          formData.academicInfo.applicationType &&
          formData.academicInfo.faculty &&
          formData.academicInfo.department &&
          formData.academicInfo.program
        )
      case 3:
        return !!(
          formData.emergencyContact.guardianName &&
          formData.emergencyContact.relationship &&
          formData.emergencyContact.phoneNumber
        )
      case 4:
        const appType = formData.academicInfo.applicationType as ApplicationType
        const required = REQUIRED_DOCUMENTS[appType || 'ND']
        return required.every(doc => uploadedDocuments[doc])
      default:
        return true
    }
  }

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <span className="text-xl font-bold text-white">IA</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">InnovaSci</span>
                <span className="block text-xs text-muted-foreground">AI Labs Polytechnic</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Application ID: <span className="font-mono font-medium text-slate-900">{applicationId}</span>
              </div>
              <Button variant="ghost" asChild className="text-sm">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Online Admission</h1>
              <p className="text-muted-foreground mt-1">Complete all steps to submit your application</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Step {currentStep} of 5
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={saveDraft}
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span className="ml-2">Save Draft</span>
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-between mt-6 overflow-x-auto pb-2">
            {ADMISSION_FORM_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center" onClick={() => currentStep > step.id && setCurrentStep(step.id)}>
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all cursor-pointer",
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="hidden sm:block ml-3">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-slate-900" : "text-gray-500"
                  )}>
                    {step.title}
                  </p>
                </div>
                {index < ADMISSION_FORM_STEPS.length - 1 && (
                  <div className={cn(
                    "w-12 sm:w-20 h-1 mx-3 rounded transition-all",
                    currentStep > step.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-200"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <User className="w-5 h-5 text-blue-600" />}
                {currentStep === 2 && <GraduationCap className="w-5 h-5 text-purple-600" />}
                {currentStep === 3 && <Phone className="w-5 h-5 text-green-600" />}
                {currentStep === 4 && <Upload className="w-5 h-5 text-orange-600" />}
                {currentStep === 5 && <CheckIcon className="w-5 h-5 text-emerald-600" />}
                {ADMISSION_FORM_STEPS[currentStep - 1].title}
              </CardTitle>
              <CardDescription>{ADMISSION_FORM_STEPS[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* STEP 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                      <Input 
                        id="fullName" 
                        placeholder="Enter your full name as on your documents" 
                        value={formData.personalInfo.fullName} 
                        onChange={(e) => updatePersonalInfo("fullName", e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        value={formData.personalInfo.email} 
                        onChange={(e) => updatePersonalInfo("email", e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+234..." 
                        value={formData.personalInfo.phone} 
                        onChange={(e) => updatePersonalInfo("phone", e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
                      <Input 
                        id="dob" 
                        type="date" 
                        value={formData.personalInfo.dateOfBirth} 
                        onChange={(e) => updatePersonalInfo("dateOfBirth", e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                      <select 
                        id="gender" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.personalInfo.gender}
                        onChange={(e) => updatePersonalInfo("gender", e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Country/State/LGA Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      Location Information
                    </h3>
                    <CountryStateLGA
                      countryValue={formData.personalInfo.nationality}
                      stateValue={formData.personalInfo.state || ''}
                      lgaValue={formData.personalInfo.localGovernment || ''}
                      onCountryChange={(value) => updatePersonalInfo("nationality", value)}
                      onStateChange={(value) => updatePersonalInfo("state", value)}
                      onLgaChange={(value) => updatePersonalInfo("localGovernment", value)}
                      required={true}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Application Type</p>
                        <p className="text-sm text-blue-700">Select the type of program you are applying for</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Application Type <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => updateAcademicInfo("applicationType", "ND")}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-all text-center",
                            formData.academicInfo.applicationType === "ND"
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <GraduationCap className={cn(
                            "w-8 h-8 mx-auto mb-2",
                            formData.academicInfo.applicationType === "ND" ? "text-blue-600" : "text-gray-400"
                          )} />
                          <p className="font-medium">National Diploma (ND)</p>
                          <p className="text-xs text-muted-foreground mt-1">Entry Level</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => updateAcademicInfo("applicationType", "HND")}
                          className={cn(
                            "p-4 rounded-lg border-2 transition-all text-center",
                            formData.academicInfo.applicationType === "HND"
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <GraduationCap className={cn(
                            "w-8 h-8 mx-auto mb-2",
                            formData.academicInfo.applicationType === "HND" ? "text-purple-600" : "text-gray-400"
                          )} />
                          <p className="font-medium">Higher National Diploma (HND)</p>
                          <p className="text-xs text-muted-foreground mt-1">Advanced Level</p>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Faculty <span className="text-red-500">*</span></Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.academicInfo.faculty}
                        onChange={(e) => {
                          updateAcademicInfo("faculty", e.target.value)
                          updateAcademicInfo("department", "")
                          updateAcademicInfo("program", "")
                        }}
                      >
                        <option value="">Select Faculty</option>
                        {faculties.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department <span className="text-red-500">*</span></Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.academicInfo.department}
                        onChange={(e) => {
                          updateAcademicInfo("department", e.target.value)
                          updateAcademicInfo("program", "")
                        }}
                        disabled={!formData.academicInfo.faculty}
                      >
                        <option value="">Select Department</option>
                        {selectedFaculty?.departments.map(d => (
                          <option key={d.name} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Program <span className="text-red-500">*</span></Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.academicInfo.program}
                        onChange={(e) => updateAcademicInfo("program", e.target.value)}
                        disabled={!formData.academicInfo.department}
                      >
                        <option value="">Select Program</option>
                        {filteredPrograms.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Emergency Contact */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Emergency Contact Information</p>
                        <p className="text-sm text-amber-700">Provide details of a parent or guardian who can be contacted in emergencies</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="guardianName">Guardian/Parent Name <span className="text-red-500">*</span></Label>
                      <Input 
                        id="guardianName" 
                        placeholder="Enter guardian's full name" 
                        value={formData.emergencyContact.guardianName}
                        onChange={(e) => updateEmergencyContact("guardianName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship <span className="text-red-500">*</span></Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.emergencyContact.relationship}
                        onChange={(e) => updateEmergencyContact("relationship", e.target.value)}
                      >
                        <option value="">Select Relationship</option>
                        {guardianRelationOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="guardianPhone">Guardian/Parent Phone Number <span className="text-red-500">*</span></Label>
                      <Input 
                        id="guardianPhone" 
                        type="tel" 
                        placeholder="+234..." 
                        value={formData.emergencyContact.phoneNumber}
                        onChange={(e) => updateEmergencyContact("phoneNumber", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Document Upload */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-800">Document Requirements</p>
                        <p className="text-sm text-orange-700">
                          {formData.academicInfo.applicationType === 'HND' 
                            ? 'Please upload your SSCE result, previous qualification, and academic transcript.'
                            : 'Please upload your SSCE result and JAMB result.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Passport Photo - Required for all */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium mb-1">Passport Photograph</h3>
                    <p className="text-sm text-muted-foreground mb-4">Required for all applicants</p>
                    <FileUploader
                      documentType="passport"
                      applicationId={applicationId}
                      onUploadComplete={(path, name) => handleDocumentUpload('passport', path, name)}
                      onRemove={() => handleDocumentRemove('passport')}
                      existingFile={uploadedDocuments['passport']}
                      required={true}
                    />
                  </div>

                  {/* SSCE Result - Required for all */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium mb-1">SSCE Result</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Accepted: WAEC, NECO, NABTEB, GCE
                    </p>
                    <FileUploader
                      documentType="ssce"
                      applicationId={applicationId}
                      onUploadComplete={(path, name) => handleDocumentUpload('ssce', path, name)}
                      onRemove={() => handleDocumentRemove('ssce')}
                      existingFile={uploadedDocuments['ssce']}
                      required={true}
                    />
                  </div>

                  {/* JAMB Result - Only for ND */}
                  {formData.academicInfo.applicationType === 'ND' && (
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium mb-1">JAMB Result</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload your JAMB UTME result slip
                      </p>
                      <FileUploader
                        documentType="jamb"
                        applicationId={applicationId}
                        onUploadComplete={(path, name) => handleDocumentUpload('jamb', path, name)}
                        onRemove={() => handleDocumentRemove('jamb')}
                        existingFile={uploadedDocuments['jamb']}
                        required={true}
                      />
                    </div>
                  )}

                  {/* HND-specific documents */}
                  {formData.academicInfo.applicationType === 'HND' && (
                    <>
                      <div className="border-b pb-6">
                        <h3 className="text-lg font-medium mb-1">Previous Qualification</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload your ND, NCE, BSc, HND, or equivalent certificate
                        </p>
                        <FileUploader
                          documentType="qualification"
                          applicationId={applicationId}
                          onUploadComplete={(path, name) => handleDocumentUpload('qualification', path, name)}
                          onRemove={() => handleDocumentRemove('qualification')}
                          existingFile={uploadedDocuments['qualification']}
                          required={true}
                        />
                      </div>
                      <div className="border-b pb-6">
                        <h3 className="text-lg font-medium mb-1">Academic Transcript</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload your academic transcript from previous institution
                        </p>
                        <FileUploader
                          documentType="transcript"
                          applicationId={applicationId}
                          onUploadComplete={(path, name) => handleDocumentUpload('transcript', path, name)}
                          onRemove={() => handleDocumentRemove('transcript')}
                          existingFile={uploadedDocuments['transcript']}
                          required={true}
                        />
                      </div>
                      <div className="pb-6">
                        <h3 className="text-lg font-medium mb-1">Industrial Training (IT) Evidence</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Optional - Upload your IT completion certificate or letter
                        </p>
                        <FileUploader
                          documentType="industrial_training"
                          applicationId={applicationId}
                          onUploadComplete={(path, name) => handleDocumentUpload('industrial_training', path, name)}
                          onRemove={() => handleDocumentRemove('industrial_training')}
                          existingFile={uploadedDocuments['industrial_training']}
                          required={false}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {/* Personal Information Review */}
                  <div className="bg-slate-50 p-6 rounded-xl space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Personal Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-muted-foreground">Full Name:</span> <span className="font-medium">{formData.personalInfo.fullName || '-'}</span></div>
                      <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{formData.personalInfo.email || '-'}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{formData.personalInfo.phone || '-'}</span></div>
                      <div><span className="text-muted-foreground">Date of Birth:</span> <span className="font-medium">{formData.personalInfo.dateOfBirth || '-'}</span></div>
                      <div><span className="text-muted-foreground">Gender:</span> <span className="font-medium capitalize">{formData.personalInfo.gender || '-'}</span></div>
                      <div><span className="text-muted-foreground">Nationality:</span> <span className="font-medium">{getCountryById(formData.personalInfo.nationality)?.name || '-'}</span></div>
                      {formData.personalInfo.state && (
                        <div><span className="text-muted-foreground">State:</span> <span className="font-medium">{formData.personalInfo.state}</span></div>
                      )}
                      {formData.personalInfo.localGovernment && (
                        <div><span className="text-muted-foreground">LGA:</span> <span className="font-medium">{formData.personalInfo.localGovernment}</span></div>
                      )}
                    </div>
                  </div>

                  {/* Academic Information Review */}
                  <div className="bg-purple-50 p-6 rounded-xl space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                      Academic Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-muted-foreground">Application Type:</span> <span className="font-medium">{formData.academicInfo.applicationType || '-'}</span></div>
                      <div><span className="text-muted-foreground">Faculty:</span> <span className="font-medium">{formData.academicInfo.faculty || '-'}</span></div>
                      <div><span className="text-muted-foreground">Department:</span> <span className="font-medium">{formData.academicInfo.department || '-'}</span></div>
                      <div><span className="text-muted-foreground">Program:</span> <span className="font-medium">{formData.academicInfo.program || '-'}</span></div>
                    </div>
                  </div>

                  {/* Emergency Contact Review */}
                  <div className="bg-green-50 p-6 rounded-xl space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-600" />
                      Emergency Contact
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.emergencyContact.guardianName || '-'}</span></div>
                      <div><span className="text-muted-foreground">Relationship:</span> <span className="font-medium">{formData.emergencyContact.relationship || '-'}</span></div>
                      <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{formData.emergencyContact.phoneNumber || '-'}</span></div>
                    </div>
                  </div>

                  {/* Documents Review */}
                  <div className="bg-orange-50 p-6 rounded-xl space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Upload className="h-5 w-5 text-orange-600" />
                      Uploaded Documents
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(uploadedDocuments).map(([type, doc]) => (
                        <div key={type} className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
                        </div>
                      ))}
                      {Object.keys(uploadedDocuments).length === 0 && (
                        <p className="text-sm text-orange-700">No documents uploaded yet</p>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Declaration</p>
                        <p className="text-sm text-amber-700 mt-1">
                          By submitting this application, I confirm that all information provided is accurate and complete. 
                          I understand that providing false information may result in rejection or revocation of admission.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < 5 ? (
            <Button 
              onClick={nextStep}
              disabled={!canProceed(currentStep)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed(4)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Need help? Contact our admissions team at admissions@innovasci.edu.ng</p>
          <p className="mt-2">Application ID: <code className="bg-gray-100 px-2 py-1 rounded">{applicationId}</code></p>
        </div>
      </div>
    </div>
  )
}