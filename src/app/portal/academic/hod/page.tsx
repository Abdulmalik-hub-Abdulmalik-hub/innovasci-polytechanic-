'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { getHodData, SEEDED_DEPARTMENTS, getDepartmentById, getFacultyById, getProgrammesByDepartment } from "@/lib/academic-data"
import { motion } from "framer-motion"
import { 
  Building2, Users, BookOpen, GraduationCap, BarChart3, 
  FileText, Calendar, Bell, Settings, TrendingUp,
  Award, ClipboardCheck, Clock, CheckCircle, BookMarked, UserCheck, ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HodDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('')
  const [activeTab, setActiveTab] = useState('overview')

  // Get department from user assignment or selected demo department
  const departmentId = user?.departmentId || selectedDepartmentId || SEEDED_DEPARTMENTS[0]?.id
  const department = getDepartmentById(departmentId)
  const faculty = department ? getFacultyById(department.facultyId) : null
  const programmes = getProgrammesByDepartment(departmentId)
  const ndProgrammes = programmes.filter(p => p.type === 'ND')
  const hndProgrammes = programmes.filter(p => p.type === 'HND')

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'academic' || (user?.role !== 'hod' && user?.role !== 'super_admin'))) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router, user?.role])

  if (isLoading || !isAuthenticated || (user?.role !== 'hod' && user?.role !== 'super_admin')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 animate-pulse" />
          <p className="text-muted-foreground">Loading HOD Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!department) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Department data not available</p>
      </div>
    )
  }

  // Calculate statistics
  const statistics = {
    totalProgrammes: programmes.length,
    totalLecturers: department.totalLecturers,
    totalStudents: department.totalStudents,
    totalNdStudents: ndProgrammes.reduce((acc, p) => acc + p.totalStudents, 0),
    totalHndStudents: hndProgrammes.reduce((acc, p) => acc + p.totalStudents, 0),
  }

  // Sample pending items
  const pendingItems = [
    { type: 'Result Approval', item: `${ndProgrammes[0]?.code || 'AML'} Results`, submittedBy: 'Lecturer', date: '2 hours ago' },
    { type: 'Course Material', item: `${hndProgrammes[0]?.name || 'Course'} Materials`, submittedBy: 'Lecturer', date: '5 hours ago' },
    { type: 'Attendance', item: 'Attendance Report', submittedBy: 'Coordinator', date: '1 day ago' },
  ]

  // Department selector for demo mode
  const DepartmentSelector = () => (
    <Card className="border-indigo-100 mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium">Select Department (Demo Mode):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SEEDED_DEPARTMENTS.slice(0, 8).map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDepartmentId(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                departmentId === d.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              {d.code}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  // Sample course allocations
  const courseAllocations = [
    { code: 'AML 111', title: 'Linear Algebra for AI', lecturer: 'Dr. Fatima Hassan', students: 56, status: 'active' },
    { code: 'AML 211', title: 'Neural Networks & Deep Learning', lecturer: 'Mr. Chidi Nwachukwu', students: 42, status: 'active' },
    { code: 'AML 112', title: 'Python Programming', lecturer: 'Prof. Emeka Okonkwo', students: 56, status: 'pending' },
    { code: 'AML 121', title: 'Machine Learning Fundamentals', lecturer: 'Unassigned', students: 0, status: 'unassigned' },
  ]

  // Sample department lecturers
  const departmentLecturers = [
    { name: 'Dr. Grace Nnamdi', title: 'HOD', courses: 2, students: 104 },
    { name: 'Dr. Fatima Hassan', title: 'Senior Lecturer', courses: 3, students: 156 },
    { name: 'Mr. Chidi Nwachukwu', title: 'Lecturer I', courses: 2, students: 88 },
    { name: 'Prof. Emeka Okonkwo', title: 'Professor', courses: 4, students: 198 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-indigo-100">
          <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'HO'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">HOD Dashboard</h1>
          <p className="text-muted-foreground">{user?.fullName || 'HOD'} • {department.name}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            HOD
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {department.code}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {ndProgrammes.length}ND/{hndProgrammes.length}HND
          </Badge>
        </div>
      </div>

      {/* Demo Department Selector */}
      <DepartmentSelector />

      {/* Department Overview Banner */}
      <Card className="bg-gradient-to-r from-indigo-600 to-indigo-500 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{department.name}</h2>
                <p className="text-white/80">{department.code} • {faculty?.name}</p>
              </div>
            </div>
            <div className="text-right text-white">
              <p className="text-sm text-white/70">Head of Department</p>
              <p className="font-semibold">{department.hodName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-indigo-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Programmes</p>
              <p className="text-2xl font-bold">{statistics.totalProgrammes}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-indigo-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lecturers</p>
              <p className="text-2xl font-bold">{statistics.totalLecturers}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-indigo-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Students</p>
              <p className="text-2xl font-bold">{statistics.totalStudents}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-indigo-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <BookMarked className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Sections */}
      <Tabs defaultValue="programmes" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="programmes">Programmes</TabsTrigger>
          <TabsTrigger value="lecturers">Lecturers</TabsTrigger>
          <TabsTrigger value="courses">Course Allocation</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        </TabsList>

        {/* Programmes Tab */}
        <TabsContent value="programmes" className="space-y-4">
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
                {ndProgrammes.map((prog) => (
                  <div key={prog.id} className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-green-700">{prog.name}</p>
                        <p className="text-sm text-green-600">{prog.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-700">{prog.totalStudents}</p>
                        <p className="text-xs text-green-600">Students</p>
                      </div>
                    </div>
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
                {hndProgrammes.map((prog) => (
                  <div key={prog.id} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-blue-700">{prog.name}</p>
                        <p className="text-sm text-blue-600">{prog.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-700">{prog.totalStudents}</p>
                        <p className="text-xs text-blue-600">Students</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Lecturers Tab */}
        <TabsContent value="lecturers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Department Lecturers
                </CardTitle>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {departmentLecturers.map((lec, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-100 text-indigo-600">
                          {lec.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{lec.name}</p>
                        <p className="text-sm text-muted-foreground">{lec.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-bold">{lec.courses}</p>
                        <p className="text-xs text-muted-foreground">Courses</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{lec.students}</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Allocation Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-indigo-600" />
                  Course Allocation
                </CardTitle>
                <Button variant="outline" size="sm">Allocate Course</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {courseAllocations.map((course, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  course.status === 'active' ? 'bg-green-50 border-green-100' :
                  course.status === 'pending' ? 'bg-amber-50 border-amber-100' :
                  'bg-red-50 border-red-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{course.code} - {course.title}</p>
                      <p className="text-sm text-muted-foreground">Lecturer: {course.lecturer}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{course.students} Students</p>
                      </div>
                      <Badge variant={course.status === 'active' ? 'default' : course.status === 'pending' ? 'secondary' : 'destructive'}>
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Curriculum Implementation Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-700 mb-2">ND Curriculum</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Level 1 - Semester 1</span>
                      <Badge className="bg-green-600">Complete</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Level 1 - Semester 2</span>
                      <Badge className="bg-green-600">Complete</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Level 2 - Semester 1</span>
                      <Badge className="bg-amber-600">In Progress</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-2">HND Curriculum</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Level 1 - Semester 1</span>
                      <Badge className="bg-green-600">Complete</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Level 1 - Semester 2</span>
                      <Badge className="bg-amber-600">In Progress</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Level 2 - Semester 1</span>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Department Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approvals */}
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingItems.map((item, index) => (
                <div key={index} className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.type}: {item.item}</p>
                      <p className="text-sm text-muted-foreground">by {item.submittedBy}</p>
                      <p className="text-xs text-amber-600 mt-1">{item.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pass Rate</span>
                  <span className="font-semibold">86%</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Completion</span>
                  <span className="font-semibold">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Staff Utilization</span>
                  <span className="font-semibold">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="mr-2 h-4 w-4" /> Allocate Courses
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ClipboardCheck className="mr-2 h-4 w-4" /> Review Submissions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" /> Department Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" /> Send Announcement
              </Button>
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
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-medium text-sm">Department Meeting - June 12</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-sm">CBT Schedule Released</p>
                <p className="text-xs text-muted-foreground">5 days ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}