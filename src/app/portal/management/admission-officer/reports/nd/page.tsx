'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, GraduationCap, FileText, Users, TrendingUp, BarChart3 } from "lucide-react"

export default function NDStatisticsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const ndStats = {
    total: 523,
    approved: 320,
    pending: 145,
    rejected: 58,
    underReview: 45,
  }

  const qualificationStats = [
    { name: 'WAEC', verified: 490, pending: 25, rejected: 8 },
    { name: 'NECO', verified: 320, pending: 45, rejected: 20 },
    { name: 'NABTEB', verified: 180, pending: 35, rejected: 10 },
    { name: 'GCE', verified: 85, pending: 20, rejected: 5 },
    { name: 'JAMB', verified: 480, pending: 30, rejected: 13 },
  ]

  const programBreakdown = [
    { name: 'ND Computer Science', applications: 120, approved: 85 },
    { name: 'ND Electrical Engineering', applications: 98, approved: 65 },
    { name: 'ND Accountancy', applications: 110, approved: 75 },
    { name: 'ND Business Administration', applications: 95, approved: 70 },
    { name: 'ND Statistics', applications: 50, approved: 35 },
    { name: 'ND Mathematics', applications: 50, approved: 30 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ND Admission Statistics</h1>
          <p className="text-muted-foreground">National Diploma admission statistics</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{ndStats.total}</p>
            <p className="text-xs text-muted-foreground">Total ND</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{ndStats.approved}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{ndStats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{ndStats.underReview}</p>
            <p className="text-xs text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{ndStats.rejected}</p>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Qualification Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualificationStats.map((qual) => (
                <div key={qual.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">{qual.name}</span>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-700">{qual.verified} Verified</Badge>
                    <Badge className="bg-amber-100 text-amber-700">{qual.pending} Pending</Badge>
                    <Badge className="bg-red-100 text-red-700">{qual.rejected} Rejected</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Programme Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programBreakdown.map((prog) => (
                <div key={prog.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{prog.name}</span>
                    <span className="text-sm">{prog.applications} / {prog.approved} approved</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2" 
                      style={{ width: `${(prog.approved / prog.applications) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}