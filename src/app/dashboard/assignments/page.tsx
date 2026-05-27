"use client"

import { motion } from "framer-motion"
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { curriculumData } from "@/lib/curriculum-data"

const sampleCourses = curriculumData[0].departments[0].programs[0].levels[0].semesters[0].courses

const assignments = [
  { id: 1, course: sampleCourses[0]?.title || "Course 1", title: "Lab Implementation Project", dueDate: "2024-03-20", status: "pending", maxScore: 100 },
  { id: 2, course: sampleCourses[1]?.title || "Course 2", title: "Research & Analysis Report", dueDate: "2024-03-18", status: "submitted", score: 92 },
  { id: 3, course: sampleCourses[2]?.title || "Course 3", title: "System Design Document", dueDate: "2024-03-25", status: "pending", maxScore: 80 },
  { id: 4, course: sampleCourses[3]?.title || "Course 4", title: "Technical Report", dueDate: "2024-03-15", status: "graded", score: 85 },
]

export default function AssignmentsPage() {
  const pendingCount = assignments.filter(a => a.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Track and submit your coursework</p>
        </div>
        <Badge variant="warning">{pendingCount} pending</Badge>
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      assignment.status === 'graded' ? 'bg-green-100' :
                      assignment.status === 'submitted' ? 'bg-blue-100' :
                      new Date(assignment.dueDate) < new Date() ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                      {assignment.status === 'graded' ? <CheckCircle className="h-6 w-6 text-green-600" /> :
                       assignment.status === 'submitted' ? <FileText className="h-6 w-6 text-blue-600" /> :
                       new Date(assignment.dueDate) < new Date() ? <AlertCircle className="h-6 w-6 text-red-600" /> :
                       <Clock className="h-6 w-6 text-amber-600" />}
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{assignment.course}</Badge>
                      <h3 className="text-lg font-semibold">{assignment.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Due: {assignment.dueDate}
                        </span>
                        <span>Max: {assignment.maxScore} marks</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {assignment.status === 'pending' && (
                      <>
                        <Badge variant={new Date(assignment.dueDate) < new Date() ? "destructive" : "warning"}>
                          {new Date(assignment.dueDate) < new Date() ? "Overdue" : "Pending"}
                        </Badge>
                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Upload className="mr-2 h-4 w-4" />
                          Submit
                        </Button>
                      </>
                    )}
                    {assignment.status === 'submitted' && (
                      <Badge variant="info">Submitted</Badge>
                    )}
                    {assignment.status === 'graded' && (
                      <div className="text-right">
                        <Badge variant="success">{assignment.score}%</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Graded</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}