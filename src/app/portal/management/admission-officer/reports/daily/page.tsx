'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, Users, FileText, CheckCircle, Clock } from "lucide-react"

export default function DailyReportPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  // Sample daily data
  const todayStats = {
    applicationsReceived: 12,
    applicationsReviewed: 8,
    applicationsApproved: 5,
    applicationsRejected: 2,
    documentsVerified: 15,
    lettersIssued: 3,
  }

  const weeklyTrend = [
    { day: 'Mon', applications: 15, approved: 8 },
    { day: 'Tue', applications: 22, approved: 12 },
    { day: 'Wed', applications: 18, approved: 10 },
    { day: 'Thu', applications: 25, approved: 14 },
    { day: 'Fri', applications: 20, approved: 11 },
    { day: 'Sat', applications: 8, approved: 4 },
    { day: 'Sun', applications: 3, approved: 2 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Daily Admission Report</h1>
          <p className="text-muted-foreground">Daily statistics and summary</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" /> Select Date
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{todayStats.applicationsReceived}</p>
            <p className="text-xs text-muted-foreground">Received Today</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{todayStats.applicationsReviewed}</p>
            <p className="text-xs text-muted-foreground">Reviewed</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{todayStats.applicationsApproved}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{todayStats.applicationsRejected}</p>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{todayStats.documentsVerified}</p>
            <p className="text-xs text-muted-foreground">Docs Verified</p>
          </CardContent>
        </Card>
        <Card className="border-orange-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{todayStats.lettersIssued}</p>
            <p className="text-xs text-muted-foreground">Letters Issued</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trend Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Applications Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {weeklyTrend.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(day.applications / 25) * 200}px` }}
                  />
                  <div 
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(day.approved / 25) * 200}px` }}
                  />
                </div>
                <span className="text-sm font-medium">{day.day}</span>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">5 Applications Approved</p>
                  <p className="text-sm text-muted-foreground">Emmanuel Okonkwo, Amina Yusuf, and 3 others</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">09:30 AM</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">12 New Applications Received</p>
                  <p className="text-sm text-muted-foreground">Including 8 ND and 4 HND applications</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">08:00 AM</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-medium">15 Documents Verified</p>
                  <p className="text-sm text-muted-foreground">All academic documents verified</p>
                </div>
              </div>
              <Badge className="bg-purple-100 text-purple-700">11:45 AM</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}