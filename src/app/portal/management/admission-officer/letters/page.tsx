'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  Search, Download, Eye, FileCheck, XCircle, 
  RefreshCw, Send, FileText, CheckCircle, 
  AlertCircle, Mail, Printer
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample admission letters data
const admissionLetters = [
  {
    id: '1',
    letterId: 'ADM-2024-001',
    applicantName: 'Emmanuel Okonkwo',
    applicationId: 'APP-2024-003',
    program: 'ND Electrical Engineering',
    type: 'ND',
    status: 'issued',
    issuedAt: '2024-01-15',
    admittedSession: '2023/2024 Academic Session'
  },
  {
    id: '2',
    letterId: 'ADM-2024-002',
    applicantName: 'Amina Yusuf',
    applicationId: 'APP-2024-009',
    program: 'HND Business Administration',
    type: 'HND',
    status: 'approved',
    approvedAt: '2024-01-14',
    admittedSession: '2023/2024 Academic Session'
  },
  {
    id: '3',
    letterId: 'ADM-2024-003',
    applicantName: 'Samuel Eze',
    applicationId: 'APP-2024-011',
    program: 'ND Computer Science',
    type: 'ND',
    status: 'pending',
    approvedAt: '2024-01-13',
    admittedSession: '2023/2024 Academic Session'
  },
  {
    id: '4',
    letterId: 'ADM-2023-089',
    applicantName: 'Ngozi Chukwu',
    applicationId: 'APP-2023-156',
    program: 'HND Hospitality Management',
    type: 'HND',
    status: 'revoked',
    issuedAt: '2024-01-10',
    revokedAt: '2024-01-16',
    revokedReason: 'Found fraudulent documents during verification'
  },
  {
    id: '5',
    letterId: 'ADM-2024-004',
    applicantName: 'Emeka Nnamdi',
    applicationId: 'APP-2024-015',
    program: 'ND Mechanical Engineering',
    type: 'ND',
    status: 'reissued',
    issuedAt: '2024-01-12',
    reissuedAt: '2024-01-17',
    reissuedReason: 'Original letter lost by applicant'
  },
]

export default function AdmissionLettersPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<typeof admissionLetters[0] | null>(null)
  const [showLetterModal, setShowLetterModal] = useState(false)

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'issued': return <Badge className="bg-green-100 text-green-700">Issued</Badge>
      case 'approved': return <Badge className="bg-blue-100 text-blue-700">Approved - Ready to Issue</Badge>
      case 'pending': return <Badge className="bg-amber-100 text-amber-700">Pending Issuance</Badge>
      case 'revoked': return <Badge className="bg-red-100 text-red-700">Revoked</Badge>
      case 'reissued': return <Badge className="bg-purple-100 text-purple-700">Reissued</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'issued': return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'approved': return <FileCheck className="h-5 w-5 text-blue-600" />
      case 'pending': return <AlertCircle className="h-5 w-5 text-amber-600" />
      case 'revoked': return <XCircle className="h-5 w-5 text-red-600" />
      case 'reissued': return <RefreshCw className="h-5 w-5 text-purple-600" />
      default: return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  const viewLetter = (letter: typeof admissionLetters[0]) => {
    setSelectedLetter(letter)
    setShowLetterModal(true)
  }

  const handleGenerateLetter = (letter: typeof admissionLetters[0]) => {
    alert(`Generating admission letter for ${letter.applicantName}...`)
  }

  const handleApproveOffer = (letter: typeof admissionLetters[0]) => {
    alert(`Approving admission offer for ${letter.applicantName}...`)
  }

  const handleRevokeLetter = (letter: typeof admissionLetters[0]) => {
    if (confirm(`Are you sure you want to revoke the admission letter for ${letter.applicantName}?`)) {
      alert(`Admission letter revoked for ${letter.applicantName}`)
    }
  }

  const handleReissueLetter = (letter: typeof admissionLetters[0]) => {
    alert(`Reissuing admission letter for ${letter.applicantName}...`)
  }

  const handleSendToApplicant = (letter: typeof admissionLetters[0]) => {
    alert(`Sending admission letter to ${letter.applicantName} via email...`)
  }

  const filteredLetters = admissionLetters.filter(letter =>
    letter.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    letter.letterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    letter.applicationId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admission Letters Management</h1>
          <p className="text-muted-foreground">Generate, approve, and manage admission letters</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <FileCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{admissionLetters.filter(l => l.status === 'pending').length}</p>
            <p className="text-xs text-muted-foreground">Pending Issuance</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{admissionLetters.filter(l => l.status === 'issued').length}</p>
            <p className="text-xs text-muted-foreground">Issued</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <FileCheck className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{admissionLetters.filter(l => l.status === 'approved').length}</p>
            <p className="text-xs text-muted-foreground">Ready to Issue</p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{admissionLetters.filter(l => l.status === 'revoked').length}</p>
            <p className="text-xs text-muted-foreground">Revoked</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{admissionLetters.filter(l => l.status === 'reissued').length}</p>
            <p className="text-xs text-muted-foreground">Reissued</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by applicant name, letter ID, or application ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Letters ({filteredLetters.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filteredLetters.filter(l => l.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="issued">Issued ({filteredLetters.filter(l => l.status === 'issued').length})</TabsTrigger>
          <TabsTrigger value="revoked">Revoked ({filteredLetters.filter(l => l.status === 'revoked').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredLetters.map((letter) => (
                  <div key={letter.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{letter.applicantName}</p>
                        <p className="text-sm text-muted-foreground">{letter.letterId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium">{letter.program}</p>
                        <p className="text-xs text-muted-foreground">{letter.admittedSession}</p>
                      </div>
                      <Badge className={letter.type === 'ND' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>
                        {letter.type}
                      </Badge>
                      {getStatusIcon(letter.status)}
                      {getStatusBadge(letter.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewLetter(letter)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {letter.status === 'pending' && (
                          <Button size="sm" variant="outline" className="text-green-600" onClick={() => handleGenerateLetter(letter)}>
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        )}
                        {letter.status === 'approved' && (
                          <Button size="sm" variant="outline" className="text-blue-600" onClick={() => handleGenerateLetter(letter)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        {letter.status === 'issued' && (
                          <Button size="sm" variant="outline" className="text-purple-600" onClick={() => handleSendToApplicant(letter)}>
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        {(letter.status === 'issued' || letter.status === 'approved') && (
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleRevokeLetter(letter)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {letter.status === 'revoked' && (
                          <Button size="sm" variant="outline" className="text-purple-600" onClick={() => handleReissueLetter(letter)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredLetters.filter(l => l.status === 'pending').map((letter) => (
                  <div key={letter.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-amber-600 to-orange-600 text-white">
                          {letter.applicantName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{letter.applicantName}</p>
                        <p className="text-sm text-muted-foreground">{letter.letterId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                      <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700" onClick={() => handleGenerateLetter(letter)}>
                        Generate Letter
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issued" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredLetters.filter(l => l.status === 'issued').map((letter) => (
                  <div key={letter.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                          {letter.applicantName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{letter.applicantName}</p>
                        <p className="text-sm text-muted-foreground">{letter.letterId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-100 text-green-700">Issued</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewLetter(letter)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleSendToApplicant(letter)}>
                          <Send className="h-4 w-4 mr-1" /> Send
                        </Button>
                        <Button size="sm" variant="outline">
                          <Printer className="h-4 w-4 mr-1" /> Print
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revoked" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredLetters.filter(l => l.status === 'revoked').map((letter) => (
                  <div key={letter.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-red-600 to-rose-600 text-white">
                          {letter.applicantName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{letter.applicantName}</p>
                        <p className="text-sm text-muted-foreground">{letter.letterId}</p>
                        {letter.revokedReason && (
                          <p className="text-xs text-red-600 mt-1">Reason: {letter.revokedReason}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-red-100 text-red-700">Revoked</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewLetter(letter)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-purple-600" onClick={() => handleReissueLetter(letter)}>
                          <RefreshCw className="h-4 w-4 mr-1" /> Reissue
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Letter Detail Modal */}
      {showLetterModal && selectedLetter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl m-4">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Admission Letter Details</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowLetterModal(false)}>
                Close
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-lg">
                    {selectedLetter.applicantName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedLetter.applicantName}</h3>
                  <p className="text-muted-foreground">{selectedLetter.letterId}</p>
                </div>
                <div className="ml-auto">
                  {getStatusBadge(selectedLetter.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <label className="text-sm text-muted-foreground">Application ID</label>
                  <p className="font-semibold">{selectedLetter.applicationId}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <label className="text-sm text-muted-foreground">Programme</label>
                  <p className="font-semibold">{selectedLetter.program}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <label className="text-sm text-muted-foreground">Admission Type</label>
                  <p className="font-semibold">{selectedLetter.type}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <label className="text-sm text-muted-foreground">Admitted Session</label>
                  <p className="font-semibold">{selectedLetter.admittedSession}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedLetter.issuedAt && (
                  <div>
                    <label className="text-sm text-muted-foreground">Issued At</label>
                    <p className="font-medium">{selectedLetter.issuedAt}</p>
                  </div>
                )}
                {selectedLetter.approvedAt && (
                  <div>
                    <label className="text-sm text-muted-foreground">Approved At</label>
                    <p className="font-medium">{selectedLetter.approvedAt}</p>
                  </div>
                )}
                {selectedLetter.revokedAt && (
                  <div>
                    <label className="text-sm text-muted-foreground">Revoked At</label>
                    <p className="font-medium text-red-600">{selectedLetter.revokedAt}</p>
                  </div>
                )}
                {selectedLetter.reissuedAt && (
                  <div>
                    <label className="text-sm text-muted-foreground">Reissued At</label>
                    <p className="font-medium text-purple-600">{selectedLetter.reissuedAt}</p>
                  </div>
                )}
              </div>

              {selectedLetter.revokedReason && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <label className="text-sm text-red-700 font-medium">Revocation Reason</label>
                  <p className="text-sm text-red-900 mt-1">{selectedLetter.revokedReason}</p>
                </div>
              )}

              {selectedLetter.reissuedReason && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <label className="text-sm text-purple-700 font-medium">Reissue Reason</label>
                  <p className="text-sm text-purple-900 mt-1">{selectedLetter.reissuedReason}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t">
                {selectedLetter.status === 'pending' && (
                  <Button variant="default" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleGenerateLetter(selectedLetter)}>
                    <FileCheck className="w-4 h-4 mr-2" /> Generate Letter
                  </Button>
                )}
                {selectedLetter.status === 'issued' && (
                  <>
                    <Button variant="outline" className="flex-1" onClick={() => handleSendToApplicant(selectedLetter)}>
                      <Send className="w-4 h-4 mr-2" /> Send to Applicant
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Printer className="w-4 h-4 mr-2" /> Print Letter
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => handleRevokeLetter(selectedLetter)}>
                      <XCircle className="w-4 h-4 mr-2" /> Revoke
                    </Button>
                  </>
                )}
                {selectedLetter.status === 'revoked' && (
                  <Button variant="default" className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={() => handleReissueLetter(selectedLetter)}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Reissue Letter
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}