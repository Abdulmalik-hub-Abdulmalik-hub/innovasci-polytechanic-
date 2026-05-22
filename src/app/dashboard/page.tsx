"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Play,
  GraduationCap,
  Trophy,
  CalendarCheck
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuthStore, useAcademicStore, usePaymentStore } from "@/store"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

// Mock data for different roles
const mockData = {
  student: {
    name: "Aisha Mohammed",
    level: "ND 2",
    semester: "Second Semester",
    cgpa: 3.85,
    nextPayment: "March 15, 2024",
    paymentStatus: "partial" as const,
    paymentProgress: 65,
    enrolledCourses: 5,
    completedAssignments: 12,
    pendingAssignments: 3,
    upcomingExams: 2,
    courses: [
      { name: "Data Structures", progress: 78, totalLessons: 24, completedLessons: 19 },
      { name: "Web Development", progress: 92, totalLessons: 30, completedLessons: 28 },
      { name: "Database Systems", progress: 65, totalLessons: 20, completedLessons: 13 },
      { name: "Software Engineering", progress: 45, totalLessons: 18, completedLessons: 8 },
      { name: "AI Fundamentals", progress: 88, totalLessons: 25, completedLessons: 22 },
    ],
    announcements: [
      { title: "Mid-Semester Exams Schedule", date: "2 days ago", type: "info" as const },
      { title: "Assignment Deadline Extended", date: "4 days ago", type: "warning" as const },
      { title: "New Course Materials Available", date: "1 week ago", type: "success" as const },
    ],
    recentGrades: [
      { course: "Web Development", assignment: "React Project", grade: "A", score: 92 },
      { course: "Data Structures", assignment: "Binary Tree Lab", grade: "B", score: 85 },
    ],
    accessLevel: "partial" as const,
    carryovers: 0,
    attendance: 94,
  },
  lecturer: {
    name: "Dr. Emmanuel Obi",
    courses: 4,
    students: 156,
    pendingGrading: 23,
    upcomingClasses: 3,
    recentSubmissions: 45,
    assignments: [
      { title: "Database Project", submissions: 45, total: 52, due: "2 days" },
      { title: "Web Dev Quiz", submissions: 38, total: 52, due: "5 days" },
    ],
  },
  admin: {
    name: "System Administrator",
    totalStudents: 1250,
    activeStudents: 1180,
    totalRevenue: 24500000,
    pendingAdmissions: 45,
    upcomingExams: 8,
  },
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { gpa, cgpa, currentLevel } = useAcademicStore()
  const { accessLevel } = usePaymentStore()

  // For demo, show student dashboard
  const data = mockData.student

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {data.name.split(' ')[0]}! 👋</h1>
          <p className="text-muted-foreground">{data.level} • {data.semester}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={accessLevel === 'full' ? 'success' : accessLevel === 'partial' ? 'warning' : 'destructive'}>
            {accessLevel === 'full' ? 'Full Access' : accessLevel === 'partial' ? 'Limited Access' : 'Access Locked'}
          </Badge>
          <Button>View Profile</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div {...fadeInUp}>
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current CGPA</p>
                  <p className="text-3xl font-bold text-primary">{data.cgpa}</p>
                  <p className="text-xs text-green-600 mt-1">↑ 0.15 from last semester</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
              </div>
              <Progress value={data.cgpa * 20} className="mt-4" />
              <p className="text-xs text-muted-foreground mt-2">Target: 4.0 GPA</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  <p className="text-3xl font-bold">{data.enrolledCourses}</p>
                  <p className="text-xs text-muted-foreground mt-1">{data.completedAssignments} completed</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Assignments</p>
                  <p className="text-3xl font-bold text-amber-600">{data.pendingAssignments}</p>
                  <p className="text-xs text-muted-foreground mt-1">Due this week</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                  <FileText className="h-7 w-7 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Exams</p>
                  <p className="text-3xl font-bold text-red-600">{data.upcomingExams}</p>
                  <p className="text-xs text-muted-foreground mt-1">Next 14 days</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                  <Calendar className="h-7 w-7 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment Status Banner */}
      {accessLevel !== 'full' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Limited Academic Access</h3>
                <p className="text-sm text-muted-foreground">Your payment progress: {data.paymentProgress}%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-48">
                <Progress value={data.paymentProgress} className="h-2" />
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90">
                Complete Payment
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Courses Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>Your learning journey this semester</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All Courses</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {course.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{course.name}</h4>
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {course.completedLessons}/{course.totalLessons} lessons completed
                    </p>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Play className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
                  15
                  <span className="text-[8px] block">MAR</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Database Systems Exam</h4>
                  <p className="text-xs text-muted-foreground">9:00 AM - 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-purple-50 border border-purple-100">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold">
                  18
                  <span className="text-[8px] block">MAR</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Assignment Deadline</h4>
                  <p className="text-xs text-muted-foreground">Web Development Project</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
                  20
                  <span className="text-[8px] block">MAR</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Virtual Class</h4>
                  <p className="text-xs text-muted-foreground">AI Fundamentals - 2:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Grades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div>
                    <p className="font-medium text-sm">{grade.assignment}</p>
                    <p className="text-xs text-muted-foreground">{grade.course}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={grade.grade === 'A' ? 'success' : 'secondary'}>
                      {grade.grade}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{grade.score}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Attendance Rate</span>
                <span className="font-semibold text-green-600">{data.attendance}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Carryovers</span>
                <span className="font-semibold">{data.carryovers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Study Hours This Week</span>
                <span className="font-semibold">24h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Latest updates from your institution</CardDescription>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.announcements.map((ann, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  ann.type === 'info' ? 'bg-blue-100' : ann.type === 'warning' ? 'bg-amber-100' : 'bg-green-100'
                }`}>
                  {ann.type === 'info' ? <Calendar className="h-5 w-5 text-blue-600" /> :
                   ann.type === 'warning' ? <AlertCircle className="h-5 w-5 text-amber-600" /> :
                   <CheckCircle className="h-5 w-5 text-green-600" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{ann.title}</h4>
                  <p className="text-sm text-muted-foreground">{ann.date}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}