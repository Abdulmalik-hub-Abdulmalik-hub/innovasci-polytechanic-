'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  FileText, Upload, BadgeCheck, CreditCard, Bell, HelpCircle,
  Send, Clock, CheckCircle, AlertCircle, Calendar, DollarSign,
  User, Shield, ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function ApplicantPortalPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'applicant')) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const applicationSteps = [
    { step: 1, title: 'Account Created', status: 'completed', date: 'May 15, 2026' },
    { step: 2, title: 'Application Submitted', status: 'completed', date: 'May 16, 2026' },
    { step: 3, title: 'Document Verification', status: 'in_progress', date: 'In Review' },
    { step: 4, title: 'Screening & Interview', status: 'pending', date: 'TBD' },
    { step: 5, title: 'Final Decision', status: 'pending', date: 'TBD' },
  ]

  const requiredDocuments = [
    { name: 'O-Level Results', status: 'verified', icon: FileText },
    { name: 'Birth Certificate', status: 'verified', icon: FileText },
    { name: 'Passport Photograph', status: 'pending', icon: Upload },
    { name: 'NIN Slip', status: 'pending', icon: FileText },
    { name: 'LGA Identification', status: 'pending', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-blue-100">
          <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'AP'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.fullName?.split(' ')[0] || 'Applicant'}!</h1>
          <p className="text-muted-foreground">InnovaSci Open Polytechnic Application</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Application In Progress
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">My Application</p>
              <p className="text-lg font-bold">View</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-green-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upload Documents</p>
              <p className="text-lg font-bold">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-amber-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <BadgeCheck className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Application Status</p>
              <p className="text-lg font-bold">Check</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-purple-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pay Fees</p>
              <p className="text-lg font-bold">₦15,000</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Application Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Overall Progress</span>
                <span className="text-sm font-medium">50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            {applicationSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-100' :
                  step.status === 'in_progress' ? 'bg-blue-100' : 'bg-slate-100'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : step.status === 'in_progress' ? (
                    <Clock className="h-4 w-4 text-blue-600" />
                  ) : (
                    <span className="text-xs text-slate-400">{step.step}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </div>
                {step.status === 'in_progress' && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                    In Progress
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-green-600" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <doc.icon className="h-5 w-5 text-slate-400" />
                  <span className="font-medium">{doc.name}</span>
                </div>
                <Badge variant={doc.status === 'verified' ? 'default' : 'outline'} 
                       className={doc.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-600'}>
                  {doc.status === 'verified' ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            ))}
            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Application Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg">Programme Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-700">Diploma in Applied Machine Learning</p>
              <p className="text-sm text-blue-600 mt-1">School of AI & Computational Intelligence</p>
              <p className="text-xs text-blue-500 mt-2">ND Level 1 • 2 Years Programme</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100">
          <CardHeader>
            <CardTitle className="text-lg">Application Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">₦15,000</p>
              <p className="text-sm text-muted-foreground mt-1">Non-refundable</p>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-700">Status: <span className="font-semibold">Pending Payment</span></p>
            </div>
            <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
              <CreditCard className="mr-2 h-4 w-4" /> Pay Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="text-lg">Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="mr-2 h-4 w-4" /> Help & FAQ
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Send className="mr-2 h-4 w-4" /> Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}