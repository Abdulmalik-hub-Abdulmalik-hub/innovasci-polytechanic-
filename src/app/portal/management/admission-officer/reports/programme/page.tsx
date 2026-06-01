'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, BookOpen, FileText, Users, TrendingUp } from "lucide-react"

export default function ProgrammeReportPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const programmes = [
    { name: 'ND Computer Science', type: 'ND', applications: 89, approved: 65, pending: 18, rejected: 6 },
    { name: 'HND Business Administration', type: 'HND', applications: 95, approved: 72, pending: 18, rejected: 5 },
    { name: 'ND Electrical Engineering', type: 'ND', applications: 78, approved: 55, pending: 15, rejected: 8 },
    { name: 'HND Computer Science', type: 'HND', applications: 68, approved: 48, pending: 15, rejected: 5 },
    { name: 'ND Accountancy', type: 'ND', applications: 72, approved: 52, pending: 14, rejected: 6 },
    { name: 'HND Electrical Engineering', type: 'HND', applications: 58, approved: 40, pending: 12, rejected: 6 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Programme Admission Reports</h1>
          <p className="text-muted-foreground">Admission statistics by programme</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{programmes.length}</p>
            <p className="text-xs text-muted-foreground">Programmes</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{programmes.reduce((a, p) => a + p.applications, 0)}</p>
            <p className="text-xs text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{programmes.reduce((a, p) => a + p.approved, 0)}</p>
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
          <CardTitle>Programme-wise Admission Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Programme</th>
                  <th className="text-center p-3 font-semibold">Type</th>
                  <th className="text-center p-3 font-semibold">Applications</th>
                  <th className="text-center p-3 font-semibold">Approved</th>
                  <th className="text-center p-3 font-semibold">Pending</th>
                  <th className="text-center p-3 font-semibold">Rejected</th>
                  <th className="text-center p-3 font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody>
                {programmes.map((prog) => (
                  <tr key={prog.name} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-medium">{prog.name}</td>
                    <td className="p-3 text-center">
                      <Badge className={prog.type === 'ND' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}>{prog.type}</Badge>
                    </td>
                    <td className="p-3 text-center">{prog.applications}</td>
                    <td className="p-3 text-center"><Badge className="bg-green-100 text-green-700">{prog.approved}</Badge></td>
                    <td className="p-3 text-center"><Badge className="bg-amber-100 text-amber-700">{prog.pending}</Badge></td>
                    <td className="p-3 text-center"><Badge className="bg-red-100 text-red-700">{prog.rejected}</Badge></td>
                    <td className="p-3 text-center"><Badge className="bg-blue-100 text-blue-700">{((prog.approved / prog.applications) * 100).toFixed(0)}%</Badge></td>
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