'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  BookOpen, Users, FileText, Upload, ClipboardCheck, Award, 
  BarChart3, Calendar, Building2, GraduationCap, Bell, Settings,
  TrendingUp, Clock, CheckCircle, AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function AcademicPortalPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'academic')) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'lecturer': return 'Lecturer'
      case 'program_coordinator': return 'Programme Coordinator'
      case 'hod': return 'Head of Department'
      case 'dean': return 'Dean'
      default: return 'Academic Staff'
    }
  }

  const assignedCourses = [
    { code: 'AML 111', title: 'Linear Algebra for AI', students: 45, pendingGrading: 12 },
    { code: 'AML 211', title: 'Neural Networks & Deep Learning', students: 32, pendingGrading: 8 },
    { code: 'NLP 111', title: 'Introduction to Linguistics for AI', students: 28, pendingGrading: 5 },
  ]

  const pendingApprovals = [
    { type: 'Results', course: 'AML 111', submittedBy: 'Dr. Fatima Hassan', date: '2 hours ago' },
    { type: 'Course Material', course: 'AML 211', submittedBy: 'Mr. Chidi Nwachukwu', date: '5 hours ago' },
  ]

  const stats = [
    { label: 'Assigned Courses', value: assignedCourses.length, icon: BookOpen, color: 'purple' },
    { label: 'Total Students', value: 105, icon: Users, color: 'blue' },
    { label: 'Pending Grading', value: 25, icon: ClipboardCheck, color: 'amber' },
    { label: 'Upcoming Exams', value: 3, icon: Calendar, color: 'green' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-purple-100">
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'AC'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0] || 'Academic Staff'}!</h1>
          <p className="text-muted-foreground">{getRoleTitle()} • School of AI & Computational Intelligence</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {getRoleTitle()}
          </Badge>
          {(user?.role === 'hod' || user?.role === 'dean') && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Management Access
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-purple-100">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Assigned Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  My Courses
                </CardTitle>
                <Button variant="outline" size="sm">Manage Courses</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignedCourses.map((course, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-purple-700">{course.code}</p>
                      <p className="text-sm text-purple-600">{course.title}</p>
                      <p className="text-xs text-purple-400 mt-1">{course.students} Students</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        {course.pendingGrading} Pending
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">Students</Button>
                    <Button size="sm" variant="outline" className="flex-1">Grade</Button>
                    <Button size="sm" variant="outline" className="flex-1">Materials</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Sections based on role */}
          {(user?.role === 'hod' || user?.role === 'dean') && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  Department Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Lecturers</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Department Students</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Department Reports</Button>
                  <Button variant="outline" className="flex-1">Programme Reports</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Approvals */}
          {(user?.role === 'hod' || user?.role === 'dean') && (
            <Card className="border-amber-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingApprovals.map((item, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="font-medium text-sm">{item.type}: {item.course}</p>
                    <p className="text-xs text-muted-foreground">by {item.submittedBy}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">Approve</Button>
                      <Button size="sm" variant="outline" className="flex-1">Reject</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" /> Upload Materials
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ClipboardCheck className="mr-2 h-4 w-4" /> Create Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" /> Mark Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" /> View Reports
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-slate-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-slate-600" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm font-medium">Exam schedule updated</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium">New student registrations</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}