'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { BookOpen, Video, Library, FlaskConical, ClipboardCheck, TrendingUp, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function StudentPortalPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'student')) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-emerald-100">
          <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-emerald-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'ST'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0]}! 👋</h1>
          <p className="text-muted-foreground">Diploma in Applied Machine Learning • ND 2</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">ND 2</Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">First Semester</Badge>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-emerald-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Video className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Video Lectures</p>
              <p className="text-lg font-bold">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Library className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">E-Library</p>
              <p className="text-lg font-bold">Access</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-purple-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Virtual Lab</p>
              <p className="text-lg font-bold">Access</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow border-orange-100">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CBT Exams</p>
              <p className="text-lg font-bold">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current CGPA</p>
                <p className="text-3xl font-bold text-emerald-600">3.75</p>
                <p className="text-xs text-green-600 mt-1">↑ 0.15 from last semester</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-emerald-600" />
              </div>
            </div>
            <Progress value={75} className="mt-4" />
          </CardContent>
        </Card>
        <Card className="border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Registered Courses</p>
                <p className="text-3xl font-bold">6</p>
                <p className="text-xs text-muted-foreground mt-1">19 Credit Units</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Assignments</p>
                <p className="text-3xl font-bold text-amber-600">3</p>
                <p className="text-xs text-muted-foreground mt-1">Due this week</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <FileText className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-3xl font-bold text-green-600">94%</p>
                <p className="text-xs text-muted-foreground mt-1">Above target</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}