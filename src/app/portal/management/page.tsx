'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  PieChart, BarChart3, Users, BookOpen, GraduationCap, 
  CreditCard, Shield, Database, AlertCircle, TrendingUp,
  Clock, CheckCircle, Eye, Scale, BadgeCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function ManagementPortalPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management')) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'rector': return 'Rector'
      case 'deputy_rector_academic': return 'Deputy Rector (Academic)'
      case 'deputy_rector_admin': return 'Deputy Rector (Administration)'
      case 'registrar': return 'Registrar'
      case 'bursar': return 'Bursar'
      case 'librarian': return 'Polytechnic Librarian'
      case 'director': return 'Director'
      default: return 'Management Staff'
    }
  }

  const stats = [
    { label: 'Total Students', value: '1,250', icon: Users, color: 'blue', change: '+12%' },
    { label: 'Active Staff', value: '85', icon: BookOpen, color: 'green', change: '+5%' },
    { label: 'Revenue', value: '₦45M', icon: CreditCard, color: 'amber', change: '+8%' },
    { label: 'Programmes', value: '18', icon: GraduationCap, color: 'purple', change: '0' },
  ]

  const quickReports = [
    { title: 'Student Statistics', icon: Users, badge: 'Live' },
    { title: 'Academic Reports', icon: BookOpen, badge: 'Live' },
    { title: 'Revenue Reports', icon: CreditCard, badge: 'Live' },
    { title: 'QA Reports', icon: Scale, badge: 'Live' },
    { title: 'Accreditation Status', icon: BadgeCheck, badge: 'Live' },
    { title: 'ODFeL Monitoring', icon: Eye, badge: 'Live' },
  ]

  const alerts = [
    { type: 'warning', message: '3 programmes due for accreditation renewal', time: '1 day ago' },
    { type: 'info', message: 'New student registration batch pending approval', time: '3 hours ago' },
    { type: 'success', message: 'Q1 academic audit completed successfully', time: '1 week ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-orange-100">
          <AvatarFallback className="bg-gradient-to-br from-orange-600 to-orange-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'MG'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0] || 'Management'}!</h1>
          <p className="text-muted-foreground">{getRoleTitle()} • InnovaSci AI Labs Polytechnic</p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Management Portal
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Analytics & Reports */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-orange-600" />
                  Institutional Analytics
                </CardTitle>
                <Button variant="outline" size="sm">View Full Dashboard</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600">78%</p>
                  <p className="text-sm text-blue-600">Pass Rate</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">3.2</p>
                  <p className="text-sm text-green-600">Avg CGPA</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-600">92%</p>
                  <p className="text-sm text-purple-600">Attendance</p>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Quick Reports</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickReports.map((report, index) => (
                  <Button key={index} variant="outline" className="justify-start h-auto py-3">
                    <report.icon className="mr-2 h-4 w-4" />
                    <span className="flex-1 text-left">{report.title}</span>
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 text-xs">
                      {report.badge}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accreditation & QA Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-green-600" />
                Accreditation & Quality Assurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-semibold">NBTE Full Accreditation</p>
                      <p className="text-sm text-green-600">All 18 programmes accredited</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-xs text-muted-foreground">Accredited Programmes</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Pending Review</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-xs text-muted-foreground">ODFeL Compliance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.type === 'warning' ? 'bg-amber-50 border-amber-100' :
                  alert.type === 'info' ? 'bg-blue-50 border-blue-100' :
                  'bg-green-50 border-green-100'
                }`}>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg">Management Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" /> Generate Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" /> Staff Management
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Scale className="mr-2 h-4 w-4" /> QA Dashboard
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" /> ODFeL Monitoring
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" /> Compliance Reports
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="border-slate-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-slate-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">Database</span>
                <Badge className="bg-green-100 text-green-700">Operational</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">LMS</span>
                <Badge className="bg-green-100 text-green-700">Operational</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">CBT System</span>
                <Badge className="bg-green-100 text-green-700">Operational</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}