"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { GraduationCap, Eye, EyeOff, Loader2, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { curriculumData, getAllPrograms } from "@/lib/curriculum-data"

const steps = [
  { id: 1, title: "Personal Information", description: "Basic details about you" },
  { id: 2, title: "Academic Background", description: "Your educational history" },
  { id: 3, title: "Program Selection", description: "Choose your field of study" },
  { id: 4, title: "Document Upload", description: "Required certificates" },
  { id: 5, title: "Review & Submit", description: "Confirm your application" },
]

const faculties = curriculumData.map(f => ({
  id: f.id,
  name: f.name,
  departments: f.departments.map(d => d.name),
}))

const programs = getAllPrograms().map(p => ({
  id: p.id,
  name: p.name,
  code: p.code,
  type: p.code.endsWith('-HND') ? 'HND' as const : 'ND' as const,
  duration: '2 Years',
}))

export default function AdmissionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    previousInstitution: "",
    qualification: "",
    yearCompleted: "",
    faculty: "",
    department: "",
    program: "",
    entryLevel: "",
    password: "",
    confirmPassword: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push('/admission/success')
  }

  const selectedFaculty = faculties.find(f => f.id === formData.faculty)
  const selectedFacultyData = curriculumData.find(f => f.id === formData.faculty)
  const filteredPrograms = programs.filter(p => {
    const matchesLevel = formData.entryLevel === 'nd' ? p.type === 'ND' : p.type === 'HND'
    if (!selectedFacultyData) return matchesLevel
    const facultyProgramCodes = selectedFacultyData.departments.flatMap(d => d.programs.map(prog => prog.code))
    return matchesLevel && facultyProgramCodes.includes(p.code)
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
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
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Already have an account? Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Online Admission</h1>
            <Badge variant="secondary">Step {currentStep} of 5</Badge>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 rounded ${
                    currentStep > step.id ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-slate-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={(e) => updateFormData("fullName", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+234..." value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input id="dob" type="date" value={formData.dateOfBirth} onChange={(e) => updateFormData("dateOfBirth", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <select id="gender" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.gender} onChange={(e) => updateFormData("gender", e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State of Origin *</Label>
                    <Input id="state" placeholder="Enter your state" value={formData.state} onChange={(e) => updateFormData("state", e.target.value)} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="institution">Previous Institution</Label>
                    <Input id="institution" placeholder="Name of your last school" value={formData.previousInstitution} onChange={(e) => updateFormData("previousInstitution", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <select id="qualification" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.qualification} onChange={(e) => updateFormData("qualification", e.target.value)}>
                      <option value="">Select Qualification</option>
                      <option value="waec">WAEC/NECO</option>
                      <option value="nd">National Diploma</option>
                      <option value="hnd">Higher National Diploma</option>
                      <option value="bsc">Bachelor's Degree</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearCompleted">Year Completed</Label>
                    <Input id="yearCompleted" type="number" placeholder="2020" value={formData.yearCompleted} onChange={(e) => updateFormData("yearCompleted", e.target.value)} />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Entry Level *</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.entryLevel} onChange={(e) => updateFormData("entryLevel", e.target.value)}>
                        <option value="">Select Entry Level</option>
                        <option value="nd">National Diploma (ND)</option>
                        <option value="hnd">Higher National Diploma (HND)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Faculty *</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.faculty} onChange={(e) => updateFormData("faculty", e.target.value)}>
                        <option value="">Select Faculty</option>
                        {faculties.map(f => (<option key={f.id} value={f.id}>{f.name}</option>))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department *</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.department} onChange={(e) => updateFormData("department", e.target.value)} disabled={!formData.faculty}>
                        <option value="">Select Department</option>
                        {selectedFaculty?.departments.map(d => (<option key={d} value={d}>{d}</option>))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Program *</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.program} onChange={(e) => updateFormData("program", e.target.value)}>
                        <option value="">Select Program</option>
                        {filteredPrograms.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <h4 className="font-semibold mb-2">Upload Passport Photo</h4>
                    <p className="text-sm text-muted-foreground mb-4">JPG, PNG or WEBP (Max 2MB)</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <h4 className="font-semibold mb-2">Upload Academic Certificate</h4>
                    <p className="text-sm text-muted-foreground mb-4">WAEC, NECO, or previous certificates</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-xl space-y-4">
                    <h4 className="font-semibold flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" /> Personal Information</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-muted-foreground">Name:</span> {formData.fullName}</div>
                      <div><span className="text-muted-foreground">Email:</span> {formData.email}</div>
                      <div><span className="text-muted-foreground">Phone:</span> {formData.phone}</div>
                      <div><span className="text-muted-foreground">Gender:</span> {formData.gender}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Create Password *</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={formData.password} onChange={(e) => updateFormData("password", e.target.value)} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => updateFormData("confirmPassword", e.target.value)} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" /> Previous</Button>
          {currentStep < 5 ? (
            <Button onClick={nextStep}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
              {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>) : (<>Submit Application <ArrowRight className="ml-2 h-4 w-4" /></>)}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}