"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Building, BookOpen, Users, Plus, Edit, Trash2, ChevronRight, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { curriculumData, curriculumStats, getAllPrograms } from "@/lib/curriculum-data"

const faculties = curriculumData.map((f, i) => ({
  id: i + 1,
  name: f.name,
  code: f.code,
  departments: f.departments.length,
  students: [850, 420, 380, 280, 320][i] || 200,
  courses: f.departments.reduce((acc, d) => acc + d.programs.length, 0),
}))

const programs = getAllPrograms().slice(0, 8).map((p, i) => ({
  id: i + 1,
  name: p.name,
  code: p.code,
  faculty: p.facultyName,
  duration: '2 Years',
  students: [320, 280, 150, 100, 200, 180, 140, 120][i] || 100,
}))

export default function AcademicPage() {
  const [activeTab, setActiveTab] = useState<'faculties' | 'departments' | 'programs' | 'courses'>('faculties')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Academic Structure</h1>
          <p className="text-muted-foreground">Manage your institution's academic hierarchy</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-4">
        {[
          { id: 'faculties', label: 'Faculties', icon: GraduationCap, count: curriculumStats.totalFaculties },
          { id: 'departments', label: 'Departments', icon: Building, count: curriculumStats.totalDepartments },
          { id: 'programs', label: 'Programs', icon: BookOpen, count: curriculumStats.totalPrograms },
          { id: 'courses', label: 'Courses', icon: Users, count: curriculumStats.totalCourses },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab.id as any)}
            className={activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}
          >
            <tab.icon className="mr-2 h-4 w-4" />
            {tab.label}
            <Badge variant="secondary" className="ml-2">{tab.count}</Badge>
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'faculties' ? faculties : programs).map((item: any, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{item.code?.slice(0, 2)}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {item.departments && <span>{item.departments} Departments</span>}
                  {item.students && <span>{item.students} Students</span>}
                  {item.courses && <span>{item.courses} Courses</span>}
                  {item.duration && <span>{item.duration}</span>}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Academic Hierarchy Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Hierarchy</CardTitle>
          <CardDescription>Visual representation of your institution structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 py-8 overflow-x-auto">
            <div className="flex flex-col items-center">
              <div className="w-32 h-20 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-center px-4">
                Institution
              </div>
              <ChevronRight className="h-6 w-6 text-muted-foreground my-2 rotate-90" />
              <div className="flex gap-2">
                {faculties.slice(0, 2).map((f) => (
                  <div key={f.id} className="flex flex-col items-center">
                    <div className="w-28 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm text-center px-2">
                      {f.name.split(' ')[0]}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground my-1 rotate-90" />
                    <div className="w-24 h-12 rounded-md bg-purple-100 flex items-center justify-center text-purple-700 text-xs">
                      Programs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}