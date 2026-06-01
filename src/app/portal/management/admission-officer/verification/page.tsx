'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  Search, Filter, Download, Eye, CheckCircle, XCircle,
  Clock, FileText, AlertCircle, FileCheck, Shield,
  GraduationCap, BookOpen, BadgeCheck, FileWarning
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample document verification data
const ndDocuments = [
  { 
    id: '1', 
    applicantId: 'APP-2024-001',
    applicantName: 'Adebayo Johnson',
    document: 'WAEC Certificate',
    status: 'verified',
    verifiedAt: '2024-01-15',
    verifiedBy: 'Admin Officer'
  },
  { 
    id: '2', 
    applicantId: 'APP-2024-002',
    applicantName: 'Fatima Ibrahim',
    document: 'NECO Certificate',
    status: 'pending',
    submittedAt: '2024-01-14'
  },
  { 
    id: '3', 
    applicantId: 'APP-2024-003',
    applicantName: 'Emmanuel Okonkwo',
    document: 'WAEC Certificate',
    status: 'verified',
    verifiedAt: '2024-01-13',
    verifiedBy: 'Admin Officer'
  },
  { 
    id: '4', 
    applicantId: 'APP-2024-001',
    applicantName: 'Adebayo Johnson',
    document: 'NABTEB Certificate',
    status: 'pending',
    submittedAt: '2024-01-15'
  },
  { 
    id: '5', 
    applicantId: 'APP-2024-005',
    applicantName: 'Kofi Mensah',
    document: 'GCE Certificate',
    status: 'rejected',
    rejectedAt: '2024-01-11',
    rejectionReason: 'Document not authentic - seal unclear'
  },
]

const hndDocuments = [
  { 
    id: '1', 
    applicantId: 'APP-2024-002',
    applicantName: 'Fatima Ibrahim',
    document: 'ND Certificate',
    status: 'pending',
    submittedAt: '2024-01-14'
  },
  { 
    id: '2', 
    applicantId: 'APP-2024-004',
    applicantName: 'Chidinma Nwachukwu',
    document: 'ND Certificate',
    status: 'rejected',
    rejectedAt: '2024-01-12',
    rejectionReason: 'Certificate verification failed - contact institution'
  },
  { 
    id: '3', 
    applicantId: 'APP-2024-006',
    applicantName: 'Olumide Adeyemi',
    document: 'NCE Certificate',
    status: 'verified',
    verifiedAt: '2024-01-10',
    verifiedBy: 'Admin Officer'
  },
  { 
    id: '4', 
    applicantId: 'APP-2024-007',
    applicantName: 'Blessing Okoro',
    document: 'BSc Certificate',
    status: 'pending',
    submittedAt: '2024-01-09'
  },
  { 
    id: '5', 
    applicantId: 'APP-2024-008',
    applicantName: 'Tunde Balogun',
    document: 'Transcript',
    status: 'pending',
    submittedAt: '2024-01-08'
  },
]

const documentTypes = {
  nd: [
    { name: 'WAEC', description: 'West African Examinations Council' },
    { name: 'NECO', description: 'National Examinations Council' },
    { name: 'NABTEB', description: 'National Business and Technical Examinations Board' },
    { name: 'GCE', description: 'General Certificate of Education' },
  ],
  hnd: [
    { name: 'WAEC', description: 'West African Examinations Council' },
    { name: 'NECO', description: 'National Examinations Council' },
    { name: 'NABTEB', description: 'National Business and Technical Examinations Board' },
    { name: 'GCE', description: 'General Certificate of Education' },
    { name: 'ND Certificate', description: 'National Diploma Certificate' },
    { name: 'NCE Certificate', description: 'Nigeria Certificate in Education' },
    { name: 'BSc Certificate', description: "Bachelor's Degree Certificate" },
    { name: 'Transcript', description: 'Academic Transcript' },
  ]
}

export default function DocumentVerificationPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocument, setSelectedDocument] = useState<typeof ndDocuments[0] | null>(null)
  const [showVerificationModal, setShowVerificationModal] = useState(false)

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending': return <Clock className="h-5 w-5 text-amber-600" />
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />
      default: return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified': return <Badge className="bg-green-100 text-green-700">Verified</Badge>
      case 'pending': return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
      case 'rejected': return <Badge className="bg-red-100 text-red-700">Rejected</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const openVerification = (doc: typeof ndDocuments[0]) => {
    setSelectedDocument(doc)
    setShowVerificationModal(true)
  }

  const handleVerify = () => {
    alert('Document verified successfully!')
    setShowVerificationModal(false)
  }

  const handleReject = () => {
    alert('Document rejected!')
    setShowVerificationModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Verification</h1>
          <p className="text-muted-foreground">Verify and validate applicant documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <FileCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{ndDocuments.filter(d => d.status === 'verified').length + hndDocuments.filter(d => d.status === 'verified').length}</p>
            <p className="text-sm text-muted-foreground">Verified Documents</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{ndDocuments.filter(d => d.status === 'pending').length + hndDocuments.filter(d => d.status === 'pending').length}</p>
            <p className="text-sm text-muted-foreground">Pending Verification</p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{ndDocuments.filter(d => d.status === 'rejected').length + hndDocuments.filter(d => d.status === 'rejected').length}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{ndDocuments.length + hndDocuments.length}</p>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by applicant name or application ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for ND and HND documents */}
      <Tabs defaultValue="nd" className="w-full">
        <TabsList>
          <TabsTrigger value="nd">
            <GraduationCap className="w-4 h-4 mr-2" />
            ND Documents ({ndDocuments.length})
          </TabsTrigger>
          <TabsTrigger value="hnd">
            <BookOpen className="w-4 h-4 mr-2" />
            HND Documents ({hndDocuments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nd" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                ND Applicant Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Required Documents for ND */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                  Required Documents for ND Applicants
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {documentTypes.nd.map((doc) => (
                    <div key={doc.name} className="p-2 bg-white rounded-lg border">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-3">
                {ndDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.applicantName}</p>
                        <p className="text-sm text-muted-foreground">{doc.applicantId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{doc.document}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.verifiedAt || doc.submittedAt || doc.rejectedAt}
                        </p>
                      </div>
                      {getStatusIcon(doc.status)}
                      {getStatusBadge(doc.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openVerification(doc)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        {doc.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600" onClick={() => { setSelectedDocument(doc); handleVerify(); }}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600" onClick={() => { setSelectedDocument(doc); handleReject(); }}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hnd" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                HND Applicant Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Required Documents for HND */}
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-purple-600" />
                  Required Documents for HND Applicants
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {documentTypes.hnd.map((doc) => (
                    <div key={doc.name} className="p-2 bg-white rounded-lg border">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-3">
                {hndDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.applicantName}</p>
                        <p className="text-sm text-muted-foreground">{doc.applicantId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{doc.document}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.verifiedAt || doc.submittedAt || doc.rejectedAt}
                        </p>
                      </div>
                      {getStatusIcon(doc.status)}
                      {getStatusBadge(doc.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openVerification(doc)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        {doc.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600" onClick={() => { setSelectedDocument(doc); handleVerify(); }}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600" onClick={() => { setSelectedDocument(doc); handleReject(); }}>
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Verification Modal */}
      {showVerificationModal && selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg m-4">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Document Verification</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    {selectedDocument.applicantName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedDocument.applicantName}</h3>
                  <p className="text-muted-foreground">{selectedDocument.applicantId}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <label className="text-sm text-muted-foreground">Document Type</label>
                <p className="font-semibold">{selectedDocument.document}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  {getStatusBadge(selectedDocument.status)}
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    {selectedDocument.verifiedAt ? 'Verified At' : selectedDocument.submittedAt ? 'Submitted At' : 'Rejected At'}
                  </label>
                  <p className="font-medium">{selectedDocument.verifiedAt || selectedDocument.submittedAt || selectedDocument.rejectedAt}</p>
                </div>
              </div>

              {selectedDocument.rejectionReason && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <label className="text-sm text-red-700 font-medium">Rejection Reason</label>
                  <p className="text-sm text-red-900 mt-1">{selectedDocument.rejectionReason}</p>
                </div>
              )}

              {selectedDocument.verifiedBy && (
                <div>
                  <label className="text-sm text-muted-foreground">Verified By</label>
                  <p className="font-medium">{selectedDocument.verifiedBy}</p>
                </div>
              )}

              {selectedDocument.status === 'pending' && (
                <>
                  <div className="p-4 border rounded-lg">
                    <label className="text-sm text-muted-foreground mb-2 block">Document Preview</label>
                    <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileWarning className="h-12 w-12 text-slate-400" />
                      <p className="ml-2 text-muted-foreground">Document preview placeholder</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="default" className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleVerify}>
                      <CheckCircle className="w-4 h-4 mr-2" /> Verify Document
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={handleReject}>
                      <XCircle className="w-4 h-4 mr-2" /> Reject Document
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full" onClick={() => setShowVerificationModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}