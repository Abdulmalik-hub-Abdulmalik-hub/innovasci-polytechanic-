'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Building2, Users, FileText, TrendingUp } from "lucide-react"

export default function DepartmentReportPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const departments = [
    { name: 'Computer Science', faculty: 'Engineering', applications: 89, approved: 65, pending: 18, rejected: 6 },
    { name: 'Electrical/Electronic', faculty: 'Engineering', applications: 78, approved: 55, pending: 15, rejected: 8 },
    { name: 'Business Administration', faculty: 'Business Studies', applications: 95, approved: 72, pending: 18, rejected: 5 },
    { name: 'Accountancy', faculty: 'Business Studies', applications: 68, approved: 48, pending: 15, rejected: 5 },
    { name: 'Mathematics', faculty: 'Applied Sciences', applications: 45, approved: 32, pending: 10, rejected: 3 },
    { name: 'Statistics', faculty: 'Applied Sciences', applications: 42, approved: 30, pending: 9, rejected: 3 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Department Admission Reports</h1>
          <p className="text-muted-foreground">Admission statistics by department</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <Building2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{departments.length}</p>
            <p className="text-xs text-muted-foreground">Departments</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{departments.reduce((a, d) => a + d.applications, 0)}</p>
            <p className="text-xs text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{departments.reduce((a, d) => a + d.approved, 0)}</p>
            <p className="text-xs text-muted-foreground">Total Approved</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">73%</p>
            <p className="text-xs text-muted-foreground">Avg Approval Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department-wise Admission Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Department</th>
                  <th className="text-left p-3 font-semibold">Faculty</th>
                  <th className="text-center p-3 font-semibold">Applications</th>
                  <th className="text-center p-3 font-semibold">Approved</th>
                  <th className="text-center p-3 font-semibold">Pending</th>
                  <th className="text-center p-3 font-semibold">Rejected</th>
                  <th className="text-center p-3 font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.name} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-medium">{dept.name}</td>
                    <td className="p-3 text-muted-foreground">{dept.faculty}</td>
                    <td className="p-3 text-center">{dept.applications}</td>
                    <td className="p-3 text-center"><Badge className="bg-green-100 text-green-700">{dept.approved}</Badge></td>
                    <td className="p-3 text-center"><Badge className="bg-amber-100 text-amber-700">{dept.pending}</Badge></td>
                    <td className="p-3 text-center"><Badge className="bg-red-100 text-red-700">{dept.rejected}</Badge></td>
                    <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700">{((dept.approved / dept.applications) * 100).toFixed(0)}%</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}