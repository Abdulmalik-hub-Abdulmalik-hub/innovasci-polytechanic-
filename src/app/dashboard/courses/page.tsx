"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, CheckCircle, AlertCircle, Play, FileText, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const courses = [
  { id: 1, name: "Data Structures & Algorithms", code: "CSC201", instructor: "Dr. Emmanuel Obi", progress: 78, lessons: 24, completed: 19, nextLesson: "Binary Search Trees", status: "active" },
  { id: 2, name: "Web Development", code: "CSC202", instructor: "Ms. Aisha Bello", progress: 92, lessons: 30, completed: 28, nextLesson: "React Hooks", status: "active" },
  { id: 3, name: "Database Systems", code: "CSC203", instructor: "Prof. Chidi Okonkwo", progress: 65, lessons: 20, completed: 13, nextLesson: "SQL Joins", status: "active" },
  { id: 4, name: "Software Engineering", code: "CSC204", instructor: "Mr. Tunde Adeyemi", progress: 45, lessons: 18, completed: 8, nextLesson: "Agile Methodology", status: "active" },
  { id: 5, name: "Artificial Intelligence Fundamentals", code: "CSC205", instructor: "Dr. Fatima Hassan", progress: 88, lessons: 25, completed: 22, nextLesson: "Neural Networks", status: "active" },
]

const recentActivity = [
  { type: "lesson", title: "Completed: Introduction to Big O Notation", time: "2 hours ago" },
  { type: "assignment", title: "Submitted: Database Design Project", time: "Yesterday" },
  { type: "quiz", title: "Completed: CSS Quiz - Score: 85%", time: "2 days ago" },
  { type: "video", title: "Watched: React Component Patterns", time: "3 days ago" },
]

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">Track your learning progress across all enrolled courses</p>
        </div>
        <Button variant="outline">Browse All Courses</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden card-hover">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">{course.code}</Badge>
                      <h3 className="text-xl font-semibold">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">By {course.instructor}</p>
                    </div>
                    <Badge variant={course.progress >= 75 ? "success" : course.progress >= 50 ? "warning" : "secondary"}>
                      {course.progress}% Complete
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{course.completed}/{course.lessons} lessons</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Play className="h-4 w-4" />
                      <span>Next: {course.nextLesson}</span>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                      Continue Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="url(#gradient)" strokeWidth="12" strokeDasharray="352" strokeDashoffset="88" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">75%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Semester Completion</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">92</p>
                  <p className="text-xs text-muted-foreground">Lessons Done</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">117</p>
                  <p className="text-xs text-muted-foreground">Total Lessons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    activity.type === "lesson" ? "bg-blue-100" :
                    activity.type === "assignment" ? "bg-green-100" :
                    activity.type === "quiz" ? "bg-purple-100" : "bg-amber-100"
                  }`}>
                    {activity.type === "lesson" ? <BookOpen className="h-4 w-4 text-blue-600" /> :
                     activity.type === "assignment" ? <FileText className="h-4 w-4 text-green-600" /> :
                     activity.type === "quiz" ? <CheckCircle className="h-4 w-4 text-purple-600" /> :
                     <Clock className="h-4 w-4 text-amber-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}