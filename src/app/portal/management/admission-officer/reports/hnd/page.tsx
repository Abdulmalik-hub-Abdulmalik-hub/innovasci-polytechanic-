'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, GraduationCap, FileText, Users, TrendingUp, BarChart3 } from "lucide-react"

export default function HNDStatisticsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const hndStats = {
    total: 267,
    approved: 165,
    pending: 72,
    rejected: 30,
    underReview: 25,
  }

  const documentStats = [
    { name: 'WAEC', verified: 250, pending: 12, rejected: 5 },
    { name: 'ND Certificate', verified: 245, pending: 15, rejected: 7 },
    { name: 'NCE Certificate', verified: 120, pending: 10, rejected: 5 },
    { name: 'BSc Certificate', verified: 45, pending: 8, rejected: 2 },
    { name: 'Transcript', verified: 80, pending: 30, rejected: 5 },
  ]

  const programBreakdown = [
    { name: 'HND Business Administration', applications: 85, approved: 55 },
    { name: 'HND Computer Science', applications: 68, approved: 42 },
    { name: 'HND Electrical Engineering', applications: 58, approved: 35 },
    { name: 'HND Hotel Management', applications: 35, approved: 22 },
    { name: 'HND Accountancy', applications: 21, approved: 11 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">HND Admission Statistics</h1>
          <p className="text-muted-foreground">Higher National Diploma admission statistics</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <GraduationCap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{hndStats.total}</p>
            <p className="text-xs text-muted-foreground">Total HND</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{hndStats.approved}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{hndStats.pending}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{hndStats.underReview}</p>
            <p className="text-xs text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{hndStats.rejected}</p>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentStats.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">{doc.name}</span>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-700">{doc.verified} Verified</Badge>
                    <Badge className="bg-amber-100 text-amber-700">{doc.pending} Pending</Badge>
                    <Badge className="bg-red-100 text-red-700">{doc.rejected} Rejected</Badge>
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
                      className="bg-purple-500 rounded-full h-2" 
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