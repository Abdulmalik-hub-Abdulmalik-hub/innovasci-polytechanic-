'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Building2, Users, FileText, TrendingUp } from "lucide-react"

export default function FacultyReportPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  // Sample faculty data
  const faculties = [
    { 
      name: 'Engineering', 
      programs: 6, 
      applications: 245, 
      approved: 180, 
      pending: 45, 
      rejected: 20 
    },
    { 
      name: 'Business Studies', 
      programs: 4, 
      applications: 198, 
      approved: 150, 
      pending: 38, 
      rejected: 10 
    },
    { 
      name: 'Computer Science', 
      programs: 3, 
      applications: 178, 
      approved: 120, 
      pending: 48, 
      rejected: 10 
    },
    { 
      name: 'Applied Sciences', 
      programs: 5, 
      applications: 156, 
      approved: 110, 
      pending: 36, 
      rejected: 10 
    },
  ]

  const totalApplications = faculties.reduce((acc, f) => acc + f.applications, 0)
  const totalApproved = faculties.reduce((acc, f) => acc + f.approved, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Faculty Admission Reports</h1>
          <p className="text-muted-foreground">Admission statistics by faculty</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <Building2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{faculties.length}</p>
            <p className="text-xs text-muted-foreground">Faculties</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalApplications}</p>
            <p className="text-xs text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalApproved}</p>
            <p className="text-xs text-muted-foreground">Total Approved</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{((totalApproved / totalApplications) * 100).toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">Approval Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Table */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty-wise Admission Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Faculty</th>
                  <th className="text-center p-3 font-semibold">Programs</th>
                  <th className="text-center p-3 font-semibold">Applications</th>
                  <th className="text-center p-3 font-semibold">Approved</th>
                  <th className="text-center p-3 font-semibold">Pending</th>
                  <th className="text-center p-3 font-semibold">Rejected</th>
                  <th className="text-center p-3 font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty) => (
                  <tr key={faculty.name} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{faculty.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{faculty.programs}</td>
                    <td className="p-3 text-center">{faculty.applications}</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-green-100 text-green-700">{faculty.approved}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge className="bg-amber-100 text-amber-700">{faculty.pending}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge className="bg-red-100 text-red-700">{faculty.rejected}</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge className="bg-blue-100 text-blue-700">
                        {((faculty.approved / faculty.applications) * 100).toFixed(0)}%
                      </Badge>
                    </td>
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