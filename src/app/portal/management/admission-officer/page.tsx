'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  FileText, Users, CheckCircle, XCircle, Clock, 
  GraduationCap, Globe, BarChart3, TrendingUp, 
  AlertCircle, Eye, Send, FileCheck, Database,
  PieChart, Building2, BookOpen, Hash
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Sample data for demonstration
const admissionStats = {
  total: 847,
  pending: 156,
  underReview: 89,
  approved: 412,
  rejected: 134,
  correctionRequested: 56,
}

const applicationTypeStats = {
  nd: 523,
  hnd: 267,
  international: 57,
}

const recentApplications = [
  { id: '1', name: 'Adebayo Johnson', program: 'ND Computer Science', type: 'ND', status: 'under_review', date: '2024-01-15' },
  { id: '2', name: 'Fatima Ibrahim', program: 'HND Business Administration', type: 'HND', status: 'pending', date: '2024-01-14' },
  { id: '3', name: 'Emmanuel Okonkwo', program: 'ND Electrical Engineering', type: 'ND', status: 'approved', date: '2024-01-13' },
  { id: '4', name: 'Chidinma Nwachukwu', program: 'HND Hotel Management', type: 'HND', status: 'correction_requested', date: '2024-01-12' },
  { id: '5', name: 'Kofi Mensah', program: 'ND Accounting', type: 'ND', status: 'pending', date: '2024-01-11' },
]

const workflowStages = [
  { name: 'Submitted', count: 156, color: 'bg-blue-500' },
  { name: 'Under Review', count: 89, color: 'bg-amber-500' },
  { name: 'Document Verification', count: 67, color: 'bg-purple-500' },
  { name: 'Approved', count: 412, color: 'bg-green-500' },
  { name: 'Rejected', count: 134, color: 'bg-red-500' },
]

export default function AdmissionOfficerDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, user, router])

  if (isLoading || !isAuthenticated || user?.role !== 'admission_officer') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 animate-pulse" />
          <p className="text-muted-foreground">Loading Admission Portal...</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>
      case 'under_review':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Under Review</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
      case 'correction_requested':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Correction Requested</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-orange-100">
          <AvatarFallback className="bg-gradient-to-br from-orange-600 to-orange-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'AO'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0] || 'Officer'}!</h1>
          <p className="text-muted-foreground">Admission Officer • InnovaSci Open Polytechnic</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <FileText className="w-4 h-4 mr-1" />
            Management Portal
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Admission Officer
          </Badge>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                +12%
              </Badge>
            </div>
            <p className="text-3xl font-bold">{admissionStats.total}</p>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 text-xs">
                {((admissionStats.pending / admissionStats.total) * 100).toFixed(0)}%
              </Badge>
            </div>
            <p className="text-3xl font-bold">{admissionStats.pending + admissionStats.underReview}</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                {((admissionStats.approved / admissionStats.total) * 100).toFixed(0)}%
              </Badge>
            </div>
            <p className="text-3xl font-bold">{admissionStats.approved}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                {((admissionStats.rejected / admissionStats.total) * 100).toFixed(0)}%
              </Badge>
            </div>
            <p className="text-3xl font-bold">{admissionStats.rejected}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Application Type Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{applicationTypeStats.nd}</p>
            <p className="text-sm text-muted-foreground">ND Applications</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{applicationTypeStats.hnd}</p>
            <p className="text-sm text-muted-foreground">HND Applications</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{applicationTypeStats.international}</p>
            <p className="text-sm text-muted-foreground">International</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Recent Applications
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => router.push('/portal/management/admission-officer/applications')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                          {app.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.program}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={app.type === 'ND' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}>
                        {app.type}
                      </Badge>
                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workflow Progress */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Application Workflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowStages.map((stage, index) => (
                  <div key={stage.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${stage.color}`} />
                        {stage.name}
                      </span>
                      <span className="font-medium">{stage.count}</span>
                    </div>
                    <Progress 
                      value={(stage.count / admissionStats.total) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/applications')}>
                <FileText className="mr-2 h-4 w-4" /> Review Applications
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/verification')}>
                <Eye className="mr-2 h-4 w-4" /> Verify Documents
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/letters')}>
                <FileCheck className="mr-2 h-4 w-4" /> Generate Admission Letters
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/processing')}>
                <Hash className="mr-2 h-4 w-4" /> Admission Processing
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/communication')}>
                <Send className="mr-2 h-4 w-4" /> Send Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="text-sm font-medium">{admissionStats.pending} applications awaiting review</p>
                <p className="text-xs text-muted-foreground mt-1">3 high priority</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-medium">{admissionStats.correctionRequested} correction requests pending</p>
                <p className="text-xs text-muted-foreground mt-1">From applicants</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-sm font-medium">67 documents pending verification</p>
                <p className="text-xs text-muted-foreground mt-1">ND and HND certificates</p>
              </div>
            </CardContent>
          </Card>

          {/* Reports */}
          <Card className="border-slate-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-slate-600" />
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/reports/daily')}>
                <BarChart3 className="mr-2 h-4 w-4" /> Daily Admission Report
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/reports/faculty')}>
                <Building2 className="mr-2 h-4 w-4" /> Faculty Report
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/reports/nd')}>
                <BookOpen className="mr-2 h-4 w-4" /> ND Statistics
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/reports/hnd')}>
                <BookOpen className="mr-2 h-4 w-4" /> HND Statistics
              </Button>
            </CardContent>
          </Card>

          {/* Accreditation Support */}
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Accreditation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/archive')}>
                <Database className="mr-2 h-4 w-4" /> Archive Records
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/portal/management/admission-officer/statistics')}>
                <PieChart className="mr-2 h-4 w-4" /> Admission Statistics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}