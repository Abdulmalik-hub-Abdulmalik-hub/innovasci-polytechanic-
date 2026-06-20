'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Users,
  ClipboardCheck,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  Briefcase,
  BarChart3,
} from 'lucide-react'
import { User } from '@/types'

interface AcademicDashboardProps {
  user: User
}

export function AcademicDashboard({ user }: AcademicDashboardProps) {
  const courseStats = [
    { label: 'My Courses', value: '5', icon: BookOpen, color: 'bg-blue-50' },
    { label: 'Total Students', value: '287', icon: Users, color: 'bg-green-50' },
    { label: 'Pending Grading', value: '42', icon: ClipboardCheck, color: 'bg-amber-50', urgent: true },
    { label: 'Projects Supervised', value: '8', icon: Briefcase, color: 'bg-purple-50' },
  ]

  const myCourses = [
    { name: 'MTH 201: Calculus II', students: 45, level: '200', status: 'Active' },
    { name: 'MTH 301: Real Analysis', students: 38, level: '300', status: 'Active' },
    { name: 'MTH 401: Advanced Topics', students: 22, level: '400', status: 'Active' },
    { name: 'PGD 101: Research Methods', students: 28, level: 'PGD', status: 'Active' },
    { name: 'MSC 201: Thesis Supervision', students: 5, level: 'MSc', status: 'Supervision' },
  ]

  const upcomingAssignments = [
    { title: 'Calculus II - Assignment 3 Due', dueDate: 'Tomorrow', students: 45, submitted: 38 },
    { title: 'Real Analysis - Quiz 2', dueDate: 'In 3 days', students: 38, submitted: 0 },
    { title: 'Thesis Proposal Reviews Due', dueDate: 'In 5 days', students: 5, submitted: 2 },
  ]

  const recentSubmissions = [
    { studentName: 'Chioma Nwankor', course: 'MTH 201', assignment: 'Assignment 2', grade: 'A', time: '2 hours ago' },
    { studentName: 'Amara Obiagwu', course: 'MTH 301', assignment: 'Quiz 1', grade: 'B+', time: '5 hours ago' },
    { studentName: 'Oluwatoyin Adebisi', course: 'MTH 201', assignment: 'Assignment 1', grade: 'A-', time: '1 day ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome, {user.fullName}</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s your teaching and learning dashboard</p>
        </div>
        <Button className="w-full sm:w-auto">Create Course Content</Button>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courseStats.map((stat, index) => {
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
        {/* My Courses */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">My Courses</CardTitle>
              <CardDescription>Currently teaching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {myCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{course.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {course.students} students
                      </Badge>
                      <span className="text-xs text-muted-foreground">Level {course.level}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {course.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines & Recent Submissions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Assignments and submissions due soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.submitted} / {assignment.students} submitted
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-amber-600">{assignment.dueDate}</p>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{
                          width: `${(assignment.submitted / assignment.students) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Recent Submissions
              </CardTitle>
              <CardDescription>Latest graded assignments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      {submission.studentName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{submission.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.course} - {submission.assignment}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge variant="secondary">{submission.grade}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{submission.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
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
              Upload Content
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Grade Assignments
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Message Students
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
