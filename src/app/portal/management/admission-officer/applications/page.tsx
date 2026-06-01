'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  Search, Filter, Download, Eye, CheckCircle, XCircle,
  Clock, FileText, Send, ChevronDown, ChevronUp, 
  AlertCircle, FileCheck, MessageSquare, Edit
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample applications data (Direct Application Model - No JAMB Required)
const sampleApplications = [
  {
    id: '1',
    applicationId: 'APP-2024-001',
    fullName: 'Adebayo Johnson',
    email: 'adebayo.johnson@email.com',
    phone: '+2348012345678',
    program: 'ND Computer Science',
    type: 'ND',
    status: 'under_review',
    appliedDate: '2024-01-15',
    documents: { waec: 'verified', passport: 'verified' },
    qualifications: ['WAEC: 5 Credits'],
  },
  {
    id: '2',
    applicationId: 'APP-2024-002',
    fullName: 'Fatima Ibrahim',
    email: 'fatima.ibrahim@email.com',
    phone: '+2348098765432',
    program: 'HND Business Administration',
    type: 'HND',
    status: 'pending',
    appliedDate: '2024-01-14',
    documents: { waec: 'pending', nd_certificate: 'pending', transcript: 'pending' },
    qualifications: ['ND Business Admin', 'WAEC: 5 Credits'],
  },
  {
    id: '3',
    applicationId: 'APP-2024-003',
    fullName: 'Emmanuel Okonkwo',
    email: 'emmanuel.okonkwo@email.com',
    phone: '+2348055555555',
    program: 'ND Electrical Engineering',
    type: 'ND',
    status: 'approved',
    appliedDate: '2024-01-13',
    documents: { waec: 'verified', passport: 'verified' },
    qualifications: ['WAEC: 6 Credits'],
  },
  {
    id: '4',
    applicationId: 'APP-2024-004',
    fullName: 'Chidinma Nwachukwu',
    email: 'chidinma.nwachukwu@email.com',
    phone: '+2348066666666',
    program: 'HND Hotel Management',
    type: 'HND',
    status: 'correction_requested',
    appliedDate: '2024-01-12',
    documents: { waec: 'verified', nd_certificate: 'rejected', transcript: 'pending' },
    qualifications: ['ND Hotel Management', 'WAEC: 4 Credits'],
    correctionNote: 'ND Certificate needs to be re-uploaded with proper verification seal',
  },
  {
    id: '5',
    applicationId: 'APP-2024-005',
    fullName: 'Kofi Mensah',
    email: 'kofi.mensah@email.com',
    phone: '+233201234567',
    program: 'ND Accounting',
    type: 'ND',
    status: 'rejected',
    appliedDate: '2024-01-11',
    documents: { waec: 'rejected', passport: 'verified' },
    qualifications: ['WAEC: 3 Credits'],
    rejectionReason: 'Insufficient academic qualifications',
  },
]

export default function ApplicationsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<typeof sampleApplications[0] | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewComment, setReviewComment] = useState('')

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const filteredApplications = sampleApplications.filter(app => 
    app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.program.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'under_review': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'approved': return 'bg-green-50 text-green-700 border-green-200'
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200'
      case 'correction_requested': return 'bg-orange-50 text-orange-700 border-orange-200'
      default: return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case 'verified': return <Badge className="bg-green-100 text-green-700">Verified</Badge>
      case 'pending': return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
      case 'rejected': return <Badge className="bg-red-100 text-red-700">Rejected</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleApprove = (app: typeof sampleApplications[0]) => {
    alert(`Application ${app.applicationId} approved!`)
  }

  const handleReject = (app: typeof sampleApplications[0]) => {
    alert(`Application ${app.applicationId} rejected!`)
  }

  const handleRequestCorrection = (app: typeof sampleApplications[0]) => {
    alert(`Correction requested for ${app.applicationId}!`)
  }

  const viewDetails = (app: typeof sampleApplications[0]) => {
    setSelectedApplication(app)
    setShowReviewModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Application Management</h1>
          <p className="text-muted-foreground">Review and manage all admission applications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name, application ID, or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold">{filteredApplications.length}</p>
            <p className="text-sm text-muted-foreground">Applications</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for filtering */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({filteredApplications.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filteredApplications.filter(a => a.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="review">Under Review ({filteredApplications.filter(a => a.status === 'under_review').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({filteredApplications.filter(a => a.status === 'approved').length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({filteredApplications.filter(a => a.status === 'rejected').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {filteredApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                          {app.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{app.fullName}</p>
                        <p className="text-sm text-muted-foreground">{app.applicationId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{app.program}</p>
                        <p className="text-xs text-muted-foreground">Applied: {app.appliedDate}</p>
                      </div>
                      <Badge className={app.type === 'ND' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>
                        {app.type}
                      </Badge>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.replace('_', ' ')}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewDetails(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {app.status !== 'approved' && app.status !== 'rejected' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600" onClick={() => handleApprove(app)}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleReject(app)}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <div className="grid gap-4">
            {filteredApplications.filter(a => a.status === 'pending').map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                          {app.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{app.fullName}</p>
                        <p className="text-sm text-muted-foreground">{app.applicationId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-amber-100 text-amber-700">Pending Review</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewDetails(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="review" className="mt-4">
          <div className="grid gap-4">
            {filteredApplications.filter(a => a.status === 'under_review').map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                          {app.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{app.fullName}</p>
                        <p className="text-sm text-muted-foreground">{app.applicationId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-blue-100 text-blue-700">Under Review</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewDetails(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-green-600" onClick={() => handleApprove(app)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleReject(app)}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          <div className="grid gap-4">
            {filteredApplications.filter(a => a.status === 'approved').map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                          {app.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{app.fullName}</p>
                        <p className="text-sm text-muted-foreground">{app.applicationId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-100 text-green-700">Approved</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewDetails(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileCheck className="h-4 w-4 mr-1" /> Generate Letter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          <div className="grid gap-4">
            {filteredApplications.filter(a => a.status === 'rejected').map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-rose-600 text-white">
                          {app.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{app.fullName}</p>
                        <p className="text-sm text-muted-foreground">{app.applicationId}</p>
                        {app.rejectionReason && (
                          <p className="text-xs text-red-600 mt-1">Reason: {app.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-red-100 text-red-700">Rejected</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewDetails(app)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Application Details Modal */}
      {showReviewModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Application Details</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowReviewModal(false)}>
                  Close
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Applicant Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-lg">
                    {selectedApplication.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedApplication.fullName}</h3>
                  <p className="text-muted-foreground">{selectedApplication.applicationId}</p>
                </div>
                <div className="ml-auto">
                  <Badge className={selectedApplication.type === 'ND' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>
                    {selectedApplication.type}
                  </Badge>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone</label>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
              </div>

              {/* Program */}
              <div>
                <label className="text-sm text-muted-foreground">Applied Programme</label>
                <p className="font-medium">{selectedApplication.program}</p>
              </div>

              {/* Qualifications */}
              <div>
                <label className="text-sm text-muted-foreground">Qualifications</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedApplication.qualifications.map((q, i) => (
                    <Badge key={i} variant="outline">{q}</Badge>
                  ))}
                </div>
              </div>

              {/* Document Verification Status */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Document Verification</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedApplication.documents).map(([doc, status]) => (
                    <div key={doc} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium capitalize">{doc.replace('_', ' ')}</span>
                      {getDocumentStatus(status)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm text-muted-foreground">Current Status</label>
                <Badge className={getStatusColor(selectedApplication.status)}>
                  {selectedApplication.status.replace('_', ' ')}
                </Badge>
              </div>

              {/* Correction Note or Rejection Reason */}
              {selectedApplication.correctionNote && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <label className="text-sm text-orange-700 font-medium">Correction Note</label>
                  <p className="text-sm text-orange-900 mt-1">{selectedApplication.correctionNote}</p>
                </div>
              )}
              {selectedApplication.rejectionReason && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <label className="text-sm text-red-700 font-medium">Rejection Reason</label>
                  <p className="text-sm text-red-900 mt-1">{selectedApplication.rejectionReason}</p>
                </div>
              )}

              {/* Review Comment */}
              <div>
                <label className="text-sm text-muted-foreground">Review Comment</label>
                <textarea 
                  className="w-full p-3 border rounded-lg mt-2"
                  rows={3}
                  placeholder="Add your review comment..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button variant="default" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleApprove(selectedApplication)}>
                  <CheckCircle className="w-4 h-4 mr-2" /> Approve Application
                </Button>
                <Button variant="outline" className="flex-1 text-orange-600 border-orange-300 hover:bg-orange-50" onClick={() => handleRequestCorrection(selectedApplication)}>
                  <Edit className="w-4 h-4 mr-2" /> Request Correction
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleReject(selectedApplication)}>
                  <XCircle className="w-4 h-4 mr-2" /> Reject Application
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" /> Send Message
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileCheck className="w-4 h-4 mr-2" /> Generate Admission Letter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}