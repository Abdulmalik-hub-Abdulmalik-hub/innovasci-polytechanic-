'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Play,
  Download,
} from 'lucide-react'
import { User } from '@/types'

interface StudentDashboardProps {
  user: User
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const academicStats = [
    { label: 'Current GPA', value: '3.8', icon: BarChart3, color: 'bg-blue-50' },
    { label: 'Courses Registered', value: '5', icon: BookOpen, color: 'bg-green-50' },
    { label: 'Assignments Due', value: '3', icon: Clock, color: 'bg-amber-50', urgent: true },
    { label: 'Payment Status', value: 'Partial', icon: DollarSign, color: 'bg-red-50', warning: true },
  ]

  const enrolledCourses = [
    { name: 'MTH 201: Calculus II', instructor: 'Dr. Hakeem Ibrahim', progress: 75, credits: 3, status: 'In Progress' },
    { name: 'CSC 201: Data Structures', instructor: 'Mrs. Adekunle Adekunle', progress: 60, credits: 3, status: 'In Progress' },
    { name: 'ENG 201: Literature', instructor: 'Prof. Segun Adeyemo', progress: 85, credits: 2, status: 'In Progress' },
    { name: 'PHY 201: Mechanics', instructor: 'Mr. Oluwaseun Olalekan', progress: 50, credits: 3, status: 'In Progress' },
    { name: 'CHM 201: Organic Chemistry', instructor: 'Dr. Akinbode Femi', progress: 70, credits: 3, status: 'In Progress' },
  ]

  const upcomingDeadlines = [
    { title: 'Calculus II - Assignment 3', dueDate: 'Tomorrow', type: 'assignment' },
    { title: 'Data Structures - Quiz 2', dueDate: 'In 2 days', type: 'quiz' },
    { title: 'Literature - Essay Submission', dueDate: 'In 5 days', type: 'assignment' },
    { title: 'Physics Lab Report', dueDate: 'In 7 days', type: 'report' },
  ]

  const recentGrades = [
    { course: 'MTH 201', assignment: 'Assignment 2', grade: 'A', date: '2 days ago' },
    { course: 'CSC 201', assignment: 'Project 1', grade: 'A-', date: '5 days ago' },
    { course: 'ENG 201', assignment: 'Essay 1', grade: 'B+', date: '1 week ago' },
    { course: 'PHY 201', assignment: 'Quiz 1', grade: 'A', date: '1 week ago' },
  ]

  const scheduledExams = [
    { course: 'MTH 201', date: 'June 25, 2026', time: '09:00 AM', duration: '2 hours', venue: 'Room 301' },
    { course: 'CSC 201', date: 'June 28, 2026', time: '01:00 PM', duration: '2 hours', venue: 'Lab 2' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome, {user.fullName}</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s your learning dashboard</p>
        </div>
        <Button className="w-full sm:w-auto">View My Transcript</Button>
      </div>

      {/* Academic Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {academicStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    {stat.urgent && (
                      <Badge variant="destructive" className="mt-2">
                        Urgent
                      </Badge>
                    )}
                    {stat.warning && (
                      <Badge variant="secondary" className="mt-2">
                        Action Needed
                      </Badge>
                    )}
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Enrolled Courses</CardTitle>
              <CardDescription>Your current academic load</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border hover:shadow-md transition-all hover:border-blue-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{course.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {course.credits} Credits
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-3 justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    Continue Learning
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Due Soon
              </CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <p className="text-sm font-medium line-clamp-2">{deadline.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-3 w-3 text-amber-600" />
                    <span className="text-xs text-amber-700">{deadline.dueDate}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Grades & Scheduled Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Grades</CardTitle>
            <CardDescription>Your latest assessment results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.course}</p>
                  <p className="text-xs text-muted-foreground">{item.assignment}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    {item.grade}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Scheduled Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scheduled Exams</CardTitle>
            <CardDescription>Your upcoming CBT examinations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledExams.map((exam, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-sm">{exam.course}</p>
                  <Badge variant="outline">{exam.duration}</Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {exam.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {exam.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {exam.venue}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              View Courses
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Assignments
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Materials
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" />
              Pay Fees
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
