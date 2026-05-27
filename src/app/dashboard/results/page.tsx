"use client"

import { motion } from "framer-motion"
import { TrendingUp, Award, Download, BarChart3, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { curriculumData } from "@/lib/curriculum-data"

const prog = curriculumData[0].departments[0].programs[0]
const sem1Courses = prog.levels[0]?.semesters[0]?.courses || []
const sem2Courses = prog.levels[0]?.semesters[1]?.courses || []

const semesters = [
  { 
    name: "First Semester", 
    gpa: 3.75, 
    courses: sem1Courses.slice(0, 4).map((c, i) => ({
      code: c.code,
      name: c.title,
      score: [85, 78, 82, 75][i],
      grade: [85, 78, 82, 75][i] >= 80 ? "A" as const : "B" as const,
      unit: c.unit,
    }))
  },
  { 
    name: "Second Semester", 
    gpa: 4.0, 
    courses: sem2Courses.slice(0, 4).map((c, i) => ({
      code: c.code,
      name: c.title,
      score: [92, 88, 95, 85][i],
      grade: "A" as const,
      unit: c.unit,
    }))
  },
]

export default function ResultsPage() {
  const currentCGPA = 3.85

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Academic Results</h1>
          <p className="text-muted-foreground">View your grades and academic performance</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Transcript
        </Button>
      </div>

      {/* CGPA Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Academic Standing</CardTitle>
            <CardDescription>Your cumulative performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around py-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="url(#cgpaGradient)" strokeWidth="12" strokeDasharray="352" strokeDashoffset={352 - (currentCGPA / 4) * 352} strokeLinecap="round" />
                    <defs>
                      <linearGradient id="cgpaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{currentCGPA.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground">CGPA</span>
                  </div>
                </div>
                <p className="font-medium">Cumulative GPA</p>
                <Badge variant="success" className="mt-2">First Class</Badge>
              </div>
              <div className="space-y-4 text-center">
                <div>
                  <p className="text-4xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-muted-foreground">Semesters</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-purple-600">26</p>
                  <p className="text-sm text-muted-foreground">Total Units</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-green-600">A</p>
                  <p className="text-sm text-muted-foreground">Predicted Class</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Scale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b">
              <span>A (70-100)</span>
              <Badge variant="success">5.0 Points</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>B (60-69)</span>
              <Badge variant="info">4.0 Points</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>C (50-59)</span>
              <Badge variant="secondary">3.0 Points</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>D (45-49)</span>
              <Badge variant="warning">2.0 Points</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>F (0-44)</span>
              <Badge variant="destructive">0.0 Points</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Semester Results */}
      {semesters.map((semester, semIndex) => (
        <Card key={semIndex}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{semester.name}</CardTitle>
                <CardDescription>GPA: {semester.gpa.toFixed(2)}</CardDescription>
              </div>
              <Badge variant={semester.gpa >= 3.5 ? "success" : semester.gpa >= 3.0 ? "info" : "secondary"}>
                {semester.gpa >= 4.0 ? "Distinction" : semester.gpa >= 3.5 ? "Merit" : "Pass"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Course Code</th>
                    <th className="text-left py-3 px-4 font-medium">Course Title</th>
                    <th className="text-center py-3 px-4 font-medium">Unit</th>
                    <th className="text-center py-3 px-4 font-medium">Score</th>
                    <th className="text-center py-3 px-4 font-medium">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.courses.map((course, index) => (
                    <motion.tr 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="py-4 px-4 font-medium">{course.code}</td>
                      <td className="py-4 px-4">{course.name}</td>
                      <td className="py-4 px-4 text-center">{course.unit}</td>
                      <td className="py-4 px-4 text-center">{course.score}%</td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant={course.grade === 'A' ? 'success' : course.grade === 'B' ? 'info' : 'secondary'}>
                          {course.grade}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Request Official Transcript</h3>
                <p className="text-sm text-muted-foreground">Get your verified academic transcript for official use</p>
              </div>
            </div>
            <Button>Request Transcript</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}