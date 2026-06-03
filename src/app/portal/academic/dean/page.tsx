'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { getDeanData, SEEDED_FACULTIES, getFacultyById, getDepartmentsByFaculty, getProgrammesByFaculty } from "@/lib/academic-data"
import { motion } from "framer-motion"
import { 
  Building2, Users, BookOpen, GraduationCap, BarChart3, 
  FileText, Calendar, Bell, Settings, TrendingUp,
  Award, ClipboardCheck, Clock, CheckCircle, School, ChevronRight, Layers
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function DeanDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>('')
  const [activeTab, setActiveTab] = useState('overview')

  // Get faculty from user assignment or use selected/demo faculty
  const facultyId = user?.facultyId || selectedFacultyId || SEEDED_FACULTIES[0]?.id
  const faculty = getFacultyById(facultyId)
  const departments = getDepartmentsByFaculty(facultyId)
  const programmes = getProgrammesByFaculty(facultyId)
  const ndProgrammes = programmes.filter(p => p.type === 'ND')
  const hndProgrammes = programmes.filter(p => p.type === 'HND')

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'academic' || (user?.role !== 'dean' && user?.role !== 'super_admin'))) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router, user?.role])

  if (isLoading || !isAuthenticated || (user?.role !== 'dean' && user?.role !== 'super_admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 animate-pulse" />
          <p className="text-muted-foreground">Loading Dean Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!faculty) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Faculty data not available</p>
      </div>
    )
  }

  // Calculate statistics
  const statistics = {
    totalDepartments: departments.length,
    totalProgrammes: programmes.length,
    totalLecturers: faculty.totalLecturers,
    totalStudents: faculty.totalStudents,
    totalNdStudents: ndProgrammes.reduce((acc, p) => acc + p.totalStudents, 0),
    totalHndStudents: hndProgrammes.reduce((acc, p) => acc + p.totalStudents, 0),
  }

  // Sample pending approvals
  const pendingApprovals = [
    { type: 'Curriculum', item: `${ndProgrammes[0]?.code || 'AML'} Semester 2 Updates`, submittedBy: 'HOD', date: '2 hours ago' },
    { type: 'Course Material', item: `${hndProgrammes[0]?.name || 'Course'} Materials`, submittedBy: 'Lecturer', date: '5 hours ago' },
    { type: 'Results', item: `${ndProgrammes[0]?.name || 'Programme'} Results`, submittedBy: 'Coordinator', date: '1 day ago' },
  ]

  // Recent activities
  const recentActivities = [
    { type: 'approval', message: `${faculty.name} curriculum approved`, time: '2 hours ago', icon: CheckCircle, color: 'green' },
    { type: 'submission', message: 'New course material submitted for review', time: '4 hours ago', icon: FileText, color: 'blue' },
    { type: 'student', message: `${statistics.totalStudents} students enrolled`, time: '6 hours ago', icon: Users, color: 'amber' },
    { type: 'exam', message: 'Semester exams schedule finalized', time: '1 day ago', icon: Calendar, color: 'purple' },
  ]

  // Faculty selector component for demo mode
  const FacultySelector = () => (
    <Card className="border-purple-100 mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <School className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium">Select Faculty (Demo Mode):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SEEDED_FACULTIES.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFacultyId(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                facultyId === f.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
            >
              {f.code}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  // Sample announcements
  const announcements = [
    { title: 'Faculty Meeting - June 15', date: '2 days ago', type: 'meeting' },
    { title: 'Mid-Semester Exam Schedule Released', date: '3 days ago', type: 'academic' },
    { title: 'NBTE Accreditation Visit - July 2026', date: '1 week ago', type: 'important' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-purple-100">
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'DE'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Dean Dashboard</h1>
          <p className="text-muted-foreground">{user?.fullName || 'Dean'} • {faculty.name}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Dean
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {departments.length} Depts
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {ndProgrammes.length}ND/{hndProgrammes.length}HND
          </Badge>
        </div>
      </div>

      {/* Demo Faculty Selector */}
      <FacultySelector />

      {/* Faculty Overview Banner */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-500 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{faculty.name}</h2>
                <p className="text-white/80">{faculty.code} • {faculty.description}</p>
              </div>
            </div>
            <div className="text-right text-white">
              <p className="text-sm text-white/70">Faculty Dean</p>
              <p className="font-semibold">{faculty.headName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-purple-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Departments</p>
              <p className="text-2xl font-bold">{statistics.totalDepartments}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Programmes</p>
              <p className="text-2xl font-bold">{statistics.totalProgrammes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lecturers</p>
              <p className="text-2xl font-bold">{statistics.totalLecturers}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="text-2xl font-bold">{statistics.totalStudents}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Faculty Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Departments Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  Departments Under Faculty
                </CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {departments.map((dept) => (
                <div key={dept.id} className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-purple-700">{dept.name}</p>
                      <p className="text-sm text-purple-600">{dept.code}</p>
                      <p className="text-xs text-purple-400 mt-1">HOD: {dept.hodName}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold">{dept.totalLecturers} Lecturers</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold">{dept.totalStudents} Students</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Programme Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ND Programmes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  ND Programmes ({ndProgrammes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ndProgrammes.slice(0, 4).map((prog) => (
                  <div key={prog.id} className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="font-semibold text-green-700">{prog.name}</p>
                    <p className="text-xs text-green-600">{prog.code} • {prog.totalStudents} Students</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* HND Programmes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  HND Programmes ({hndProgrammes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hndProgrammes.slice(0, 4).map((prog) => (
                  <div key={prog.id} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="font-semibold text-blue-700">{prog.name}</p>
                    <p className="text-xs text-blue-600">{prog.code} • {prog.totalStudents} Students</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Academic Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Faculty Academic Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <p className="font-medium">Mid-Semester Tests</p>
                <p className="text-sm text-muted-foreground">June 10-14, 2026</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium">Faculty Board Meeting</p>
                <p className="text-sm text-muted-foreground">June 15, 2026 • 10:00 AM</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="font-medium">Submission of Continuous Assessment</p>
                <p className="text-sm text-muted-foreground">June 25, 2026</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Approvals */}
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingApprovals.map((item, index) => (
                <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="font-medium text-sm">{item.type}: {item.item}</p>
                  <p className="text-xs text-muted-foreground">by {item.submittedBy}</p>
                  <p className="text-xs text-amber-600 mt-1">{item.date}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">Approve</Button>
                    <Button size="sm" variant="outline" className="flex-1">Review</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.map((ann, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  ann.type === 'important' ? 'bg-red-50 border-red-100' : 
                  ann.type === 'meeting' ? 'bg-purple-50 border-purple-100' : 
                  'bg-slate-50 border-slate-100'
                }`}>
                  <p className="font-medium text-sm">{ann.title}</p>
                  <p className="text-xs text-muted-foreground">{ann.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-purple-100">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" /> Faculty Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" /> Generate Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ClipboardCheck className="mr-2 h-4 w-4" /> Review Submissions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" /> Manage Lecturers
              </Button>
            </CardContent>
          </Card>

          {/* Faculty Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Faculty Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pass Rate</span>
                  <span className="font-semibold">84%</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Student Satisfaction</span>
                  <span className="font-semibold">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Staff Utilization</span>
                  <span className="font-semibold">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}