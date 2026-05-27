"use client"

import { motion } from "framer-motion"
import { Users, Search, Filter, Plus, Mail, MoreHorizontal, GraduationCap, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const students = [
  { id: 1, name: "Aisha Mohammed", admission: "IS-24-AML-0001", email: "aisha.m@innovasci.edu", level: "ND 2", status: "active", cgpa: 3.85, payment: "paid" },
  { id: 2, name: "David Okonkwo", admission: "IS-24-NLP-0002", email: "david.o@innovasci.edu", level: "ND 2", status: "active", cgpa: 3.42, payment: "partial" },
  { id: 3, name: "Fatima Al-Hassan", admission: "IS-24-CGM-0001", email: "fatima.h@innovasci.edu", level: "HND 1", status: "active", cgpa: 4.0, payment: "paid" },
  { id: 4, name: "Emmanuel Eze", admission: "IS-24-EHP-0001", email: "emma.e@innovasci.edu", level: "ND 1", status: "active", cgpa: 3.20, payment: "paid" },
  { id: 5, name: "Blessing Adebayo", admission: "IS-24-AML-H001", email: "blessing.a@innovasci.edu", level: "HND 2", status: "graduated", cgpa: 4.2, payment: "paid" },
  { id: 6, name: "Chidi Nwachukwu", admission: "IS-24-DTS-0003", email: "chidi.n@innovasci.edu", level: "ND 2", status: "suspended", cgpa: 2.8, payment: "unpaid" },
]

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">View and manage all enrolled students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Mail className="mr-2 h-4 w-4" />Export List</Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600"><Plus className="mr-2 h-4 w-4" />Add Student</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-blue-600">1,250</p><p className="text-sm text-muted-foreground">Total Students</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-green-600">1,180</p><p className="text-sm text-muted-foreground">Active Students</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-purple-600">45</p><p className="text-sm text-muted-foreground">Pending Admissions</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-2xl font-bold text-amber-600">25</p><p className="text-sm text-muted-foreground">Carryovers</p></CardContent></Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
            <select className="px-4 py-2 rounded-lg border">
              <option>All Levels</option>
              <option>ND 1</option>
              <option>ND 2</option>
              <option>HND 1</option>
              <option>HND 2</option>
            </select>
            <select className="px-4 py-2 rounded-lg border">
              <option>All Status</option>
              <option>Active</option>
              <option>Graduated</option>
              <option>Suspended</option>
            </select>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" />More Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
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
                {students.map((student, index) => (
                  <motion.tr 
                    key={student.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-slate-50 cursor-pointer"
                  >
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
                    <td className="py-4 px-4 text-right"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}