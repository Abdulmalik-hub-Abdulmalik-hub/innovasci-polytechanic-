'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, PieChart, BarChart3, TrendingUp, Users, FileText, CheckCircle } from "lucide-react"

export default function StatisticsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const overallStats = {
    totalApplications: 847,
    totalApproved: 485,
    totalRejected: 164,
    totalPending: 198,
    ndApplications: 523,
    hndApplications: 267,
    internationalApplications: 57,
  }

  const genderDistribution = [
    { gender: 'Male', count: 520, percentage: 61 },
    { gender: 'Female', count: 327, percentage: 39 },
  ]

  const monthlyTrend = [
    { month: 'Jan', applications: 120, approved: 85 },
    { month: 'Feb', applications: 95, approved: 70 },
    { month: 'Mar', applications: 150, approved: 110 },
    { month: 'Apr', applications: 180, approved: 125 },
    { month: 'May', applications: 200, approved: 145 },
    { month: 'Jun', applications: 102, approved: 75 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admission Statistics</h1>
          <p className="text-muted-foreground">Comprehensive admission data and analytics</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" /> Export Statistics
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{overallStats.totalApplications}</p>
            <p className="text-xs text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{overallStats.totalApproved}</p>
            <p className="text-xs text-muted-foreground">Total Approved</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-amber-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{overallStats.totalPending}</p>
            <p className="text-xs text-muted-foreground">Total Pending</p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{overallStats.totalRejected}</p>
            <p className="text-xs text-muted-foreground">Total Rejected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Application Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded" />
                <span className="font-medium">ND Applications</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{overallStats.ndApplications}</p>
                <p className="text-xs text-muted-foreground">{((overallStats.ndApplications / overallStats.totalApplications) * 100).toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded" />
                <span className="font-medium">HND Applications</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{overallStats.hndApplications}</p>
                <p className="text-xs text-muted-foreground">{((overallStats.hndApplications / overallStats.totalApplications) * 100).toFixed(1)}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="font-medium">International</span>
              </div>
              <div className="text-right">
                <p className="font-bold">{overallStats.internationalApplications}</p>
                <p className="text-xs text-muted-foreground">{((overallStats.internationalApplications / overallStats.totalApplications) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Gender Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {genderDistribution.map((item) => (
              <div key={item.gender} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.gender}</span>
                  <span className="font-bold">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className={item.gender === 'Male' ? 'bg-blue-500' : 'bg-purple-500'}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Approval Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-6xl font-bold text-green-600">{((overallStats.totalApproved / overallStats.totalApplications) * 100).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-2">Overall Approval Rate</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{(overallStats.totalApproved / overallStats.totalApplications * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">ND Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{(overallStats.totalApproved / overallStats.totalApplications * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">HND Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            Monthly Application Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-4">
            {monthlyTrend.map((month) => (
              <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(month.applications / 200) * 200}px` }}
                  />
                  <div 
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(month.approved / 200) * 200}px` }}
                  />
                </div>
                <span className="text-sm font-medium">{month.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded" />
              <span className="text-sm">Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-sm">Approved</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}