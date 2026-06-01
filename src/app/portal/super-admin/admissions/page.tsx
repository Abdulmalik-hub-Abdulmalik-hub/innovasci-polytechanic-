'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Search, Filter, Download, Eye, CheckCircle, 
  XCircle, Clock, AlertTriangle, FileText, User, GraduationCap,
  Calendar, Building, Phone, Mail, MessageSquare, ChevronDown,
  Upload, Trash2, Check, X, FilterX
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { 
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_COLORS,
  type ApplicationStatus,
  type ApplicationType,
} from '@/lib/admission-types'
import { cn } from '@/lib/utils'

// Mock data for applications (in production, this would come from Supabase)
interface Application {
  id: string
  applicationId: string
  fullName: string
  email: string
  phone: string
  applicationType: ApplicationType
  faculty: string
  department: string
  program: string
  status: ApplicationStatus
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  documents: {
    passport?: string
    ssce?: string
    qualification?: string
    transcript?: string
    industrial_training?: string
  }
  personalInfo: {
    dateOfBirth: string
    gender: string
    nationality: string
    state?: string
    localGovernment?: string
  }
  emergencyContact: {
    guardianName: string
    relationship: string
    phoneNumber: string
  }
}

const mockApplications: Application[] = [
  {
    id: '1',
    applicationId: 'ISA-m1234-abcd',
    fullName: 'Adebayo Johnson',
    email: 'adebayo.johnson@email.com',
    phone: '+2348012345678',
    applicationType: 'ND',
    faculty: 'Computing',
    department: 'Computer Science',
    program: 'Computer Science-ND',
    status: 'submitted',
    submittedAt: '2024-01-15T10:30:00Z',
    documents: {
      passport: 'passport-1.pdf',
      ssce: 'ssce-1.pdf',
    },
    personalInfo: {
      dateOfBirth: '2002-05-15',
      gender: 'male',
      nationality: 'ng',
      state: 'lagos',
      localGovernment: 'ikeja',
    },
    emergencyContact: {
      guardianName: 'Mrs. Adebayo',
      relationship: 'Mother',
      phoneNumber: '+2348012345679',
    },
  },
  {
    id: '2',
    applicationId: 'ISA-m5678-efgh',
    fullName: 'Chidinma Okonkwo',
    email: 'chidinma.okonkwo@email.com',
    phone: '+2348098765432',
    applicationType: 'HND',
    faculty: 'Engineering',
    department: 'Electrical/Electronic',
    program: 'Electrical/Electronic-HND',
    status: 'under_review',
    submittedAt: '2024-01-14T14:20:00Z',
    reviewedAt: '2024-01-16T09:00:00Z',
    reviewedBy: 'Admin',
    documents: {
      passport: 'passport-2.pdf',
      ssce: 'ssce-2.pdf',
      qualification: 'qualification-2.pdf',
      transcript: 'transcript-2.pdf',
    },
    personalInfo: {
      dateOfBirth: '1999-08-22',
      gender: 'female',
      nationality: 'ng',
      state: 'anambra',
      localGovernment: 'awka-south',
    },
    emergencyContact: {
      guardianName: 'Mr. Okonkwo',
      relationship: 'Father',
      phoneNumber: '+2348098765433',
    },
  },
  {
    id: '3',
    applicationId: 'ISA-m9012-ijkl',
    fullName: 'Emmanuel Mensah',
    email: 'emmanuel.mensah@email.com',
    phone: '+233201234567',
    applicationType: 'ND',
    faculty: 'Business',
    department: 'Business Administration',
    program: 'Business Administration-ND',
    status: 'approved',
    submittedAt: '2024-01-10T08:00:00Z',
    reviewedAt: '2024-01-18T11:30:00Z',
    reviewedBy: 'Admin',
    documents: {
      passport: 'passport-3.pdf',
      ssce: 'ssce-3.pdf',
    },
    personalInfo: {
      dateOfBirth: '2001-03-10',
      gender: 'male',
      nationality: 'gh',
    },
    emergencyContact: {
      guardianName: 'Mr. Mensah Sr.',
      relationship: 'Father',
      phoneNumber: '+233201234568',
    },
  },
  {
    id: '4',
    applicationId: 'ISA-m3456-mnop',
    fullName: 'Fatima Ibrahim',
    email: 'fatima.ibrahim@email.com',
    phone: '+2348055551234',
    applicationType: 'HND',
    faculty: 'Applied Sciences',
    department: 'Science Laboratory',
    program: 'Science Laboratory Technology-HND',
    status: 'rejected',
    submittedAt: '2024-01-12T16:45:00Z',
    reviewedAt: '2024-01-17T14:00:00Z',
    reviewedBy: 'Admin',
    documents: {
      passport: 'passport-4.pdf',
      ssce: 'ssce-4.pdf',
      qualification: 'qualification-4.pdf',
    },
    personalInfo: {
      dateOfBirth: '1998-11-30',
      gender: 'female',
      nationality: 'ng',
      state: 'kano',
      localGovernment: 'dala',
    },
    emergencyContact: {
      guardianName: 'Alhaji Ibrahim',
      relationship: 'Father',
      phoneNumber: '+2348055551235',
    },
  },
]

const statusFilters = [
  { value: 'all', label: 'All Applications' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

const typeFilters = [
  { value: 'all', label: 'All Types' },
  { value: 'ND', label: 'ND' },
  { value: 'HND', label: 'HND' },
]

export default function AdminAdmissionsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [reviewComment, setReviewComment] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'admin')) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, portalId, router])

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesType = typeFilter === 'all' || app.applicationType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: ApplicationStatus) => {
    return (
      <Badge className={APPLICATION_STATUS_COLORS[status]}>
        {APPLICATION_STATUS_LABELS[status]}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleOpenDetail = (application: Application) => {
    setSelectedApplication(application)
    setIsDetailOpen(true)
    setReviewComment('')
  }

  const handleApprove = async () => {
    if (!selectedApplication) return
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert(`Application ${selectedApplication.applicationId} has been approved!`)
    setIsProcessing(false)
    setIsDetailOpen(false)
  }

  const handleReject = async () => {
    if (!selectedApplication) return
    if (!reviewComment.trim()) {
      alert('Please provide a reason for rejection.')
      return
    }
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert(`Application ${selectedApplication.applicationId} has been rejected. Reason: ${reviewComment}`)
    setIsProcessing(false)
    setIsDetailOpen(false)
  }

  const handleMarkUnderReview = async () => {
    if (!selectedApplication) return
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert(`Application ${selectedApplication.applicationId} marked as under review.`)
    setIsProcessing(false)
    setIsDetailOpen(false)
  }

  // Stats
  const stats = {
    total: mockApplications.length,
    submitted: mockApplications.filter(a => a.status === 'submitted').length,
    underReview: mockApplications.filter(a => a.status === 'under_review').length,
    approved: mockApplications.filter(a => a.status === 'approved').length,
    rejected: mockApplications.filter(a => a.status === 'rejected').length,
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/portal/super-admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Admissions Management</h1>
            <p className="text-muted-foreground">Review and manage student applications</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-gray-600">{stats.submitted}</p>
            <p className="text-sm text-muted-foreground">Submitted</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">{stats.underReview}</p>
            <p className="text-sm text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or application ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
              <select
                className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {typeFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Applications ({filteredApplications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Applicant</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Program</th>
                  <th className="text-left py-3 px-4 font-medium">Submitted</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(app => (
                  <tr key={app.id} className="border-b hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{app.fullName}</p>
                        <p className="text-sm text-muted-foreground">{app.applicationId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={app.applicationType === 'HND' ? 'bg-purple-50' : 'bg-blue-50'}>
                        {app.applicationType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm">{app.department}</p>
                      <p className="text-xs text-muted-foreground">{app.program}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm">{formatDate(app.submittedAt)}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleOpenDetail(app)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No applications found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedApplication && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedApplication.fullName}</DialogTitle>
                    <DialogDescription>{selectedApplication.applicationId}</DialogDescription>
                  </div>
                  {getStatusBadge(selectedApplication.status)}
                </div>
              </DialogHeader>

              <Tabs defaultValue="personal" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="personal" className="flex-1">
                    <User className="w-4 h-4 mr-2" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="academic" className="flex-1">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Academic
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="review" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Review
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Full Name</Label>
                      <p className="font-medium">{selectedApplication.fullName}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Email</Label>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Phone</Label>
                      <p className="font-medium">{selectedApplication.phone}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Date of Birth</Label>
                      <p className="font-medium">{selectedApplication.personalInfo.dateOfBirth}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Gender</Label>
                      <p className="font-medium capitalize">{selectedApplication.personalInfo.gender}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Nationality</Label>
                      <p className="font-medium">{selectedApplication.personalInfo.nationality.toUpperCase()}</p>
                    </div>
                    {selectedApplication.personalInfo.state && (
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <Label className="text-muted-foreground text-xs">State</Label>
                        <p className="font-medium">{selectedApplication.personalInfo.state}</p>
                      </div>
                    )}
                    {selectedApplication.personalInfo.localGovernment && (
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <Label className="text-muted-foreground text-xs">LGA</Label>
                        <p className="font-medium">{selectedApplication.personalInfo.localGovernment}</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Emergency Contact
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <Label className="text-muted-foreground text-xs">Guardian Name</Label>
                        <p className="font-medium">{selectedApplication.emergencyContact.guardianName}</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <Label className="text-muted-foreground text-xs">Relationship</Label>
                        <p className="font-medium">{selectedApplication.emergencyContact.relationship}</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <Label className="text-muted-foreground text-xs">Phone</Label>
                        <p className="font-medium">{selectedApplication.emergencyContact.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Application Type</Label>
                      <p className="font-medium">{selectedApplication.applicationType}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Faculty</Label>
                      <p className="font-medium">{selectedApplication.faculty}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Department</Label>
                      <p className="font-medium">{selectedApplication.department}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Program</Label>
                      <p className="font-medium">{selectedApplication.program}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Label className="text-muted-foreground text-xs">Submitted On</Label>
                    <p className="font-medium">{formatDate(selectedApplication.submittedAt)}</p>
                  </div>
                  {selectedApplication.reviewedAt && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <Label className="text-muted-foreground text-xs">Reviewed On</Label>
                      <p className="font-medium">{formatDate(selectedApplication.reviewedAt)}</p>
                      <p className="text-sm text-muted-foreground">by {selectedApplication.reviewedBy}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedApplication.documents).map(([docType, docPath]) => (
                      <div key={docType} className="p-4 border rounded-lg hover:bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{docType.replace('_', ' ')}</span>
                          {docPath && <Check className="w-5 h-5 text-green-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{docPath || 'Not uploaded'}</p>
                        {docPath && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="review" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="comment">Review Comments</Label>
                      <Textarea
                        id="comment"
                        placeholder="Enter your review comments or reason for rejection..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Actions</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedApplication.status === 'submitted' && (
                          <Button 
                            variant="outline" 
                            className="bg-amber-50 border-amber-200 hover:bg-amber-100"
                            onClick={handleMarkUnderReview}
                            disabled={isProcessing}
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Mark Under Review
                          </Button>
                        )}
                        {(selectedApplication.status === 'submitted' || selectedApplication.status === 'under_review') && (
                          <>
                            <Button 
                              variant="default"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={handleApprove}
                              disabled={isProcessing}
                            >
                              {isProcessing ? 'Processing...' : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve Application
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={handleReject}
                              disabled={isProcessing}
                            >
                              {isProcessing ? 'Processing...' : (
                                <>
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject Application
                                </>
                              )}
                            </Button>
                          </>
                        )}
                        {selectedApplication.status === 'approved' && (
                          <Button variant="outline" className="bg-green-50">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Application Approved
                          </Button>
                        )}
                        {selectedApplication.status === 'rejected' && (
                          <Button variant="outline" className="bg-red-50">
                            <XCircle className="w-4 h-4 mr-2" />
                            Application Rejected
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}