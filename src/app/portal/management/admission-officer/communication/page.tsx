'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  Search, Send, Mail, MessageSquare, Bell,
  CheckCircle, Clock, Eye, FileText, Users,
  AlertCircle, ChevronDown
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

// Sample communication history
const communicationHistory = [
  {
    id: '1',
    recipient: 'Emmanuel Okonkwo',
    applicationId: 'APP-2024-003',
    type: 'admission_update',
    subject: 'Admission Offer Confirmation',
    message: 'Your application has been approved. Please accept your admission offer by completing the acceptance form.',
    sentAt: '2024-01-15 10:30',
    status: 'delivered',
    read: true
  },
  {
    id: '2',
    recipient: 'Chidinma Nwachukwu',
    applicationId: 'APP-2024-004',
    type: 'correction_request',
    subject: 'Document Correction Required',
    message: 'Please re-upload your ND Certificate with proper verification seal. The current document is not clearly readable.',
    sentAt: '2024-01-14 14:20',
    status: 'delivered',
    read: false
  },
  {
    id: '3',
    recipient: 'Fatima Ibrahim',
    applicationId: 'APP-2024-002',
    type: 'admission_offer',
    subject: 'Admission Offer - HND Business Administration',
    message: 'Congratulations! You have been offered admission to HND Business Administration. Accept your offer by logging into your portal.',
    sentAt: '2024-01-13 09:15',
    status: 'delivered',
    read: true
  },
  {
    id: '4',
    recipient: 'Kofi Mensah',
    applicationId: 'APP-2024-005',
    type: 'rejection_notification',
    subject: 'Application Status Update',
    message: 'Unfortunately, your application could not be approved due to insufficient academic qualifications. You may reapply in the next admission cycle.',
    sentAt: '2024-01-11 16:45',
    status: 'delivered',
    read: true
  },
  {
    id: '5',
    recipient: 'Adebayo Johnson',
    applicationId: 'APP-2024-001',
    type: 'document_reminder',
    subject: 'Document Verification Reminder',
    message: 'Reminder: Please submit your NABTEB certificate for verification. Your application is pending document completion.',
    sentAt: '2024-01-10 11:00',
    status: 'delivered',
    read: false
  },
]

// Notification templates
const notificationTemplates = [
  { id: '1', name: 'Admission Offer', description: 'Send admission offer to approved applicants' },
  { id: '2', name: 'Correction Request', description: 'Request corrections from applicants' },
  { id: '3', name: 'Document Reminder', description: 'Remind applicants to submit documents' },
  { id: '4', name: 'Application Status', description: 'Update applicants on their application status' },
  { id: '5', name: 'Interview Schedule', description: 'Schedule interview dates for applicants' },
]

export default function CommunicationPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'admission_offer': return <Mail className="h-4 w-4 text-green-600" />
      case 'correction_request': return <AlertCircle className="h-4 w-4 text-orange-600" />
      case 'admission_update': return <FileText className="h-4 w-4 text-blue-600" />
      case 'rejection_notification': return <Mail className="h-4 w-4 text-red-600" />
      case 'document_reminder': return <Clock className="h-4 w-4 text-amber-600" />
      default: return <MessageSquare className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'admission_offer': return <Badge className="bg-green-100 text-green-700">Admission Offer</Badge>
      case 'correction_request': return <Badge className="bg-orange-100 text-orange-700">Correction Request</Badge>
      case 'admission_update': return <Badge className="bg-blue-100 text-blue-700">Admission Update</Badge>
      case 'rejection_notification': return <Badge className="bg-red-100 text-red-700">Rejection</Badge>
      case 'document_reminder': return <Badge className="bg-amber-100 text-amber-700">Document Reminder</Badge>
      default: return <Badge variant="outline">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered': return <Badge className="bg-green-100 text-green-700">Delivered</Badge>
      case 'pending': return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
      case 'failed': return <Badge className="bg-red-100 text-red-700">Failed</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSendMessage = () => {
    if (recipient && subject && message) {
      alert('Message sent successfully!')
      setShowComposeModal(false)
      setRecipient('')
      setSubject('')
      setMessage('')
    } else {
      alert('Please fill in all required fields')
    }
  }

  const applyTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    switch (templateId) {
      case '1':
        setSubject('Admission Offer')
        setMessage('Congratulations! You have been offered admission to [Programme]. Please accept your offer by logging into your portal.')
        break
      case '2':
        setSubject('Document Correction Required')
        setMessage('Please correct/submit the following document(s): [Documents]. Your application is pending this correction.')
        break
      case '3':
        setSubject('Document Submission Reminder')
        setMessage('Reminder: Please submit the required documents for your application. The deadline is [Date].')
        break
      case '4':
        setSubject('Application Status Update')
        setMessage('Your application status has been updated. Please log in to check the current status.')
        break
      case '5':
        setSubject('Interview Schedule')
        setMessage('You are invited for an interview on [Date] at [Time]. Please confirm your attendance.')
        break
    }
  }

  const filteredHistory = communicationHistory.filter(comm =>
    comm.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comm.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comm.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unreadCount = communicationHistory.filter(c => !c.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Communication Center</h1>
          <p className="text-muted-foreground">Send notifications and communicate with applicants</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowComposeModal(true)}>
            <Mail className="w-4 h-4 mr-2" /> Compose Message
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{communicationHistory.length}</p>
            <p className="text-sm text-muted-foreground">Total Sent</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{communicationHistory.filter(c => c.status === 'delivered').length}</p>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <Bell className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{unreadCount}</p>
            <p className="text-sm text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{notificationTemplates.length}</p>
            <p className="text-sm text-muted-foreground">Templates</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Communication History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  Communication History
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by recipient or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* History List */}
              <div className="space-y-3">
                {filteredHistory.map((comm) => (
                  <div key={comm.id} className={`p-4 rounded-lg border ${comm.read ? 'bg-slate-50' : 'bg-blue-50 border-blue-100'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={comm.read ? 'bg-slate-400 text-white' : 'bg-blue-600 text-white'}>
                            {comm.recipient.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{comm.recipient}</p>
                          <p className="text-sm text-muted-foreground">{comm.applicationId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(comm.type)}
                        {getTypeBadge(comm.type)}
                        {!comm.read && <Badge className="bg-blue-100 text-blue-700">New</Badge>}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold">{comm.subject}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{comm.message}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{comm.sentAt}</p>
                      {getStatusBadge(comm.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Compose */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowComposeModal(true)}>
                <Mail className="mr-2 h-4 w-4" /> Send Admission Update
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => { applyTemplate('2'); setShowComposeModal(true); }}>
                <AlertCircle className="mr-2 h-4 w-4" /> Request Correction
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => { applyTemplate('3'); setShowComposeModal(true); }}>
                <Clock className="mr-2 h-4 w-4" /> Send Reminder
              </Button>
            </CardContent>
          </Card>

          {/* Notification Templates */}
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Notification Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {notificationTemplates.map((template) => (
                <div key={template.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => { applyTemplate(template.id); setShowComposeModal(true); }}>
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Recent Recipients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2">
                <span className="text-sm">Emmanuel Okonkwo</span>
                <Badge className="bg-green-100 text-green-700">2 messages</Badge>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm">Chidinma Nwachukwu</span>
                <Badge className="bg-green-100 text-green-700">1 message</Badge>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm">Fatima Ibrahim</span>
                <Badge className="bg-green-100 text-green-700">1 message</Badge>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm">Kofi Mensah</span>
                <Badge className="bg-green-100 text-green-700">1 message</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg m-4">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Compose Message</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowComposeModal(false)}>
                Cancel
              </Button>
            </div>
            <div className="p-6 space-y-4">
              {/* Template Selection */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Use Template (Optional)</label>
                <div className="relative">
                  <select 
                    className="w-full p-3 border rounded-lg bg-white"
                    value={selectedTemplate}
                    onChange={(e) => applyTemplate(e.target.value)}
                  >
                    <option value="">Select a template...</option>
                    {notificationTemplates.map((template) => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Recipient (Applicant Name or Application ID)</label>
                <Input 
                  placeholder="e.g., Emmanuel Okonkwo or APP-2024-003"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                <Input 
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                <Textarea 
                  placeholder="Enter your message..."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t">
                <Button variant="outline" className="flex-1" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </Button>
                <Button variant="default" className="flex-1" onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}