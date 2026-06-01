'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { getProgrammeCoordinatorData, SEEDED_PROGRAMMES } from "@/lib/academic-data"
import { motion } from "framer-motion"
import { 
  BookOpen, Users, GraduationCap, BarChart3, 
  FileText, Calendar, Bell, TrendingUp,
  Award, ClipboardCheck, Clock, CheckCircle, BookMarked
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProgrammeCoordinatorDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'academic' || user?.role !== 'program_coordinator')) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router, user?.role])

  if (isLoading || !isAuthenticated || user?.role !== 'program_coordinator') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 animate-pulse" />
          <p className="text-muted-foreground">Loading Programme Coordinator Dashboard...</p>
        </div>
      </div>
    )
  }

  // Get Programme Coordinator's assigned programme (demo: first programme)
  const pcData = getProgrammeCoordinatorData(SEEDED_PROGRAMMES[0].id)

  if (!pcData) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Programme data not available</p>
      </div>
    )
  }

  const { programme, department, faculty, courses, statistics } = pcData

  // Sample enrolled students
  const enrolledStudents = [
    { name: 'Aisha Mohammed', matno: 'ISA/2024/001', level: 'ND 2', cgpa: 3.85, status: 'active' },
    { name: 'Emmanuel Obi', matno: 'ISA/2024/002', level: 'ND 2', cgpa: 3.72, status: 'active' },
    { name: 'Chidinma Nwosu', matno: 'ISA/2024/003', level: 'ND 2', cgpa: 3.45, status: 'active' },
    { name: 'Segun Adeyemi', matno: 'ISA/2024/004', level: 'ND 2', cgpa: 3.20, status: 'active' },
    { name: 'Fatima Ibrahim', matno: 'ISA/2024/005', level: 'ND 2', cgpa: 2.98, status: 'warning' },
  ]

  // Sample pending items
  const pendingItems = [
    { type: 'Result Submission', course: 'AML 121', submittedBy: 'Dr. Fatima Hassan', date: '2 hours ago' },
    { type: 'Assignment Marking', course: 'AML 111', submittedBy: 'Mr. Chidi Nwachukwu', date: '5 hours ago' },
  ]

  // Sample programme courses (curriculum)
  const programmeCurriculum = [
    { code: 'AML 111', title: 'Linear Algebra for AI', credits: 3, semester: '1st', status: 'completed' },
    { code: 'AML 112', title: 'Python Programming', credits: 3, semester: '1st', status: 'completed' },
    { code: 'AML 113', title: 'Introduction to Data Science', credits: 2, semester: '1st', status: 'completed' },
    { code: 'AML 114', title: 'Calculus for AI', credits: 3, semester: '1st', status: 'completed' },
    { code: 'AML 121', title: 'Machine Learning Fundamentals', credits: 4, semester: '2nd', status: 'in_progress' },
    { code: 'AML 122', title: 'Data Structures & Algorithms', credits: 3, semester: '2nd', status: 'in_progress' },
    { code: 'AML 123', title: 'Statistics for AI', credits: 3, semester: '2nd', status: 'pending' },
    { code: 'AML 124', title: 'Neural Networks Basics', credits: 4, semester: '2nd', status: 'pending' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-teal-100">
          <AvatarFallback className="bg-gradient-to-br from-teal-600 to-teal-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'PC'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Programme Coordinator Dashboard</h1>
          <p className="text-muted-foreground">{user?.fullName} • {programme.name}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
            Programme Coordinator
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {programme.type}
          </Badge>
        </div>
      </div>

      {/* Programme Overview Banner */}
      <Card className="bg-gradient-to-r from-teal-600 to-teal-500 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{programme.name}</h2>
                <p className="text-white/80">{programme.code} • {department?.name} • {faculty?.name}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm text-white/70">ND/HND: {programme.type}</span>
                  <span className="text-sm text-white/70">Duration: {programme.duration} Years</span>
                  <span className="text-sm text-white/70">Levels: {programme.totalLevels}</span>
                </div>
              </div>
            </div>
            <div className="text-right text-white">
              <p className="text-sm text-white/70">Programme Coordinator</p>
              <p className="font-semibold">{user?.fullName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-teal-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enrolled Students</p>
              <p className="text-2xl font-bold">{statistics.totalStudents}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-teal-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-bold">{statistics.totalCourses}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-teal-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
              <BookMarked className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Curriculum Coverage</p>
              <p className="text-2xl font-bold">{statistics.curriculumCoverage}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-teal-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Pass Rate</p>
              <p className="text-2xl font-bold">82%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Sections */}
      <Tabs defaultValue="curriculum" className="space-y-4">
        <TabsList className="bg-white border">
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-teal-600" />
                Programme Curriculum - {programme.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* ND Level 1 */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-green-700">ND Level 1</h3>
                    <Badge className="bg-green-600">Completed</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">Semester 1</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>AML 111 - Linear Algebra for AI</span>
                          <Badge variant="outline" className="text-xs">3 cr</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>AML 112 - Python Programming</span>
                          <Badge variant="outline" className="text-xs">3 cr</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>AML 113 - Intro to Data Science</span>
                          <Badge variant="outline" className="text-xs">2 cr</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">Semester 2</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>AML 114 - Calculus for AI</span>
                          <Badge variant="outline" className="text-xs">3 cr</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>AML 115 - Statistics & Probability</span>
                          <Badge variant="outline" className="text-xs">3 cr</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ND Level 2 */}
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-amber-700">ND Level 2</h3>
                    <Badge className="bg-amber-600">In Progress</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">Semester 1</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>AML 121 - Machine Learning</span>
                          <Badge variant="outline" className="text-xs">4 cr</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>AML 122 - Data Structures</span>
                          <Badge variant="outline" className="text-xs">3 cr</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">Semester 2</p>
                      <div className="mt-2 space-y-1">
                        <div className="text-sm text-muted-foreground">Coming soon...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  Enrolled Students - {programme.name}
                </CardTitle>
                <Button variant="outline" size="sm">Export List</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {enrolledStudents.map((student, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  student.status === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-teal-100 text-teal-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.matno} • {student.level}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold">CGPA: {student.cgpa.toFixed(2)}</p>
                      </div>
                      <Badge variant={student.status === 'warning' ? 'secondary' : 'default'}>
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-teal-600" />
                  Programme Courses
                </CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {courses.map((course, index) => (
                <div key={index} className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-teal-700">{course.code} - {course.title}</p>
                      <p className="text-sm text-teal-600">
                        Lecturer: {course.lecturerName} • Level {course.level}, Semester {course.semester}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{course.credits} Credits</p>
                        <p className="text-sm text-muted-foreground">{course.totalStudents} Students</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold">{course.passRate}%</p>
                        <p className="text-xs text-muted-foreground">Pass Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Programme Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Pass Rate</span>
                    <span className="font-semibold">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average CGPA</span>
                    <span className="font-semibold">3.45</span>
                  </div>
                  <Progress value={86} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Completion</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Student Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>ND Level 1</span>
                  <Badge>28 Students</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>ND Level 2</span>
                  <Badge>28 Students</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Programme Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-600" />
                Programme Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{department?.name}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Faculty/School</p>
                  <p className="font-medium">{faculty?.name}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Programme Type</p>
                  <p className="font-medium">{programme.type}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{programme.duration} Years ({programme.totalLevels} Levels)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Items */}
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingItems.map((item, index) => (
                <div key={index} className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="font-medium text-sm">{item.type}: {item.course}</p>
                  <p className="text-xs text-muted-foreground">by {item.submittedBy}</p>
                  <p className="text-xs text-amber-600 mt-1">{item.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-teal-100">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" /> Programme Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ClipboardCheck className="mr-2 h-4 w-4" /> Review Submissions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" /> Send Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookMarked className="mr-2 h-4 w-4" /> Monitor Curriculum
              </Button>
            </CardContent>
          </Card>

          {/* Programme Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Programme Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Accreditation</span>
                <Badge className="bg-green-600">Approved</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Enrollments</span>
                <Badge>Open</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Curriculum</span>
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}