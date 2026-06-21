'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  GraduationCap,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { User } from '@/types'

interface ManagementDashboardProps {
  user: User
}

export function ManagementDashboard({ user }: ManagementDashboardProps) {
  // Mock data - in production, this would come from an API
  const stats = [
    { label: 'Total Students', value: '2,845', icon: Users, trend: '+12%', color: 'bg-blue-50' },
    { label: 'Total Staff', value: '284', icon: Users, trend: '+5%', color: 'bg-green-50' },
    { label: 'Programmes', value: '24', icon: GraduationCap, trend: 'Active', color: 'bg-purple-50' },
    { label: 'Revenue (Month)', value: '₦4.2M', icon: DollarSign, trend: '+8%', color: 'bg-amber-50' },
  ]

  const recentActivity = [
    { title: 'New Student Admission', description: 'Chioma Nwankor admitted to BSc Computer Science', time: '2 hours ago', type: 'admission' },
    { title: 'Payment Received', description: 'Payment from Amara Obiagwu (Level 300)', time: '4 hours ago', type: 'payment' },
    { title: 'Exam Published', description: 'MTH 201: Calculus II exam published for Level 200', time: '1 day ago', type: 'exam' },
    { title: 'System Update', description: 'Database backup completed successfully', time: '1 day ago', type: 'system' },
  ]

  const pendingTasks = [
    { title: 'Review 15 Admission Applications', count: '15', urgent: true },
    { title: 'Approve Course Allocations', count: '8', urgent: false },
    { title: 'Process Payment Invoices', count: '23', urgent: true },
    { title: 'Update QA Reports', count: '5', urgent: false },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, {user.fullName}</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s your management dashboard overview</p>
        </div>
        <Button className="w-full sm:w-auto">Generate Report</Button>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-2">{stat.trend}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Tasks</CardTitle>
              <CardDescription>Actions requiring your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.count} items</p>
                  </div>
                  {task.urgent && (
                    <Badge variant="destructive" className="ml-2">
                      Urgent
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Latest events in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex-shrink-0">
                    {activity.type === 'admission' && (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    {activity.type === 'payment' && (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                    {activity.type === 'exam' && (
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                    )}
                    {activity.type === 'system' && (
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-amber-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Add New User
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <GraduationCap className="mr-2 h-4 w-4" />
              Create Programme
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Event
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
