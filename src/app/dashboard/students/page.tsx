"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Search, Filter, Plus, Mail, MoreHorizontal, GraduationCap, CheckCircle, Download, Edit, Trash2, Eye, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const initialStudents = [
  { id: 1, name: "Aisha Mohammed", admission: "IS-24-AML-0001", email: "aisha.m@innovasci.edu", level: "ND 2", status: "active", cgpa: 3.85, payment: "paid", phone: "+2348012345678" },
  { id: 2, name: "David Okonkwo", admission: "IS-24-NLP-0002", email: "david.o@innovasci.edu", level: "ND 2", status: "active", cgpa: 3.42, payment: "partial", phone: "+2348012345679" },
  { id: 3, name: "Fatima Al-Hassan", admission: "IS-24-CGM-0001", email: "fatima.h@innovasci.edu", level: "HND 1", status: "active", cgpa: 4.0, payment: "paid", phone: "+2348012345680" },
  { id: 4, name: "Emmanuel Eze", admission: "IS-24-EHP-0001", email: "emma.e@innovasci.edu", level: "ND 1", status: "active", cgpa: 3.20, payment: "paid", phone: "+2348012345681" },
  { id: 5, name: "Blessing Adebayo", admission: "IS-24-AML-H001", email: "blessing.a@innovasci.edu", level: "HND 2", status: "graduated", cgpa: 4.2, payment: "paid", phone: "+2348012345682" },
  { id: 6, name: "Chidi Nwachukwu", admission: "IS-24-DTS-0003", email: "chidi.n@innovasci.edu", level: "ND 2", status: "suspended", cgpa: 2.8, payment: "unpaid", phone: "+2348012345683" },
]

export default function StudentsPage() {
  const [students] = useState(initialStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<typeof initialStudents[0] | null>(null)

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.admission.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = selectedLevel === "all" || student.level === selectedLevel
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus
    return matchesSearch && matchesLevel && matchesStatus
  })

  const handleExportList = () => {
    const csvContent = [
      ["Name", "Admission No", "Email", "Level", "CGPA", "Payment Status", "Status"],
      ...filteredStudents.map(s => [s.name, s.admission, s.email, s.level, s.cgpa.toString(), s.payment, s.status])
    ].map(row => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "students_list.csv"
    a.click()
    URL.revokeObjectURL(url)
    setIsExportModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">View and manage all enrolled students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsExportModalOpen(true)}>
            <Download className="mr-2 h-4 w-4" /> Export List
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-blue-600">{students.length}</p><p className="text-sm text-muted-foreground">Total Students</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-green-600">{students.filter(s => s.status === 'active').length}</p><p className="text-sm text-muted-foreground">Active Students</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-purple-600">{students.filter(s => s.payment === 'partial').length}</p><p className="text-sm text-muted-foreground">Pending Payments</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-amber-600">{students.filter(s => s.cgpa < 2.5).length}</p><p className="text-sm text-muted-foreground">Carryovers</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="px-4 py-2 rounded-lg border bg-background" value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              <option value="all">All Levels</option>
              <option value="ND 1">ND 1</option>
              <option value="ND 2">ND 2</option>
              <option value="HND 1">HND 1</option>
              <option value="HND 2">HND 2</option>
            </select>
            <select className="px-4 py-2 rounded-lg border bg-background" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="graduated">Graduated</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" />More Filters</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Students ({filteredStudents.length})</CardTitle>
          <CardDescription>Click on a student to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Student</th>
                  <th className="text-left py-3 px-4 font-medium">Admission No.</th>
                  <th className="text-left py-3 px-4 font-medium">Level</th>
                  <th className="text-left py-3 px-4 font-medium">CGPA</th>
                  <th className="text-left py-3 px-4 font-medium">Payment</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <motion.tr key={student.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedStudent(student)}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-sm">{student.admission}</td>
                    <td className="py-4 px-4"><Badge variant="secondary">{student.level}</Badge></td>
                    <td className="py-4 px-4"><span className={student.cgpa >= 3.5 ? 'text-green-600 font-medium' : student.cgpa >= 2.5 ? 'text-amber-600' : 'text-red-600'}>{student.cgpa.toFixed(2)}</span></td>
                    <td className="py-4 px-4"><Badge variant={student.payment === 'paid' ? 'success' : student.payment === 'partial' ? 'warning' : 'destructive'}>{student.payment}</Badge></td>
                    <td className="py-4 px-4"><Badge variant={student.status === 'active' ? 'success' : student.status === 'graduated' ? 'info' : 'destructive'}>{student.status}</Badge></td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Student Details</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedStudent(null)}><X className="h-5 w-5" /></Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16"><AvatarFallback className="text-xl">{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent.admission}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{selectedStudent.email}</p></div>
                <div><p className="text-sm text-muted-foreground">Phone</p><p className="font-medium">{selectedStudent.phone}</p></div>
                <div><p className="text-sm text-muted-foreground">Level</p><p className="font-medium">{selectedStudent.level}</p></div>
                <div><p className="text-sm text-muted-foreground">CGPA</p><p className="font-medium">{selectedStudent.cgpa.toFixed(2)}</p></div>
                <div><p className="text-sm text-muted-foreground">Payment</p><Badge variant={selectedStudent.payment === 'paid' ? 'success' : selectedStudent.payment === 'partial' ? 'warning' : 'destructive'}>{selectedStudent.payment}</Badge></div>
                <div><p className="text-sm text-muted-foreground">Status</p><Badge variant={selectedStudent.status === 'active' ? 'success' : 'destructive'}>{selectedStudent.status}</Badge></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsAddModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add New Student</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)}><X className="h-5 w-5" /></Button>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter student name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@email.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Level</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select Level</option>
                    <option value="ND 1">ND 1</option>
                    <option value="ND 2">ND 2</option>
                    <option value="HND 1">HND 1</option>
                    <option value="HND 2">HND 2</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Program</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select Program</option>
                    <option value="AML">Applied Machine Learning</option>
                    <option value="NLP">Natural Language Processing</option>
                    <option value="EHP">Ethical Hacking</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600" type="button">Add Student</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsExportModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Export Student List</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsExportModalOpen(false)}><X className="h-5 w-5" /></Button>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">Choose export format:</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={handleExportList}>
                  <Download className="mr-2 h-4 w-4" /> Export as CSV
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Download className="mr-2 h-4 w-4" /> Export as Excel
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Download className="mr-2 h-4 w-4" /> Export as PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
