'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"
import { 
  Settings, Users, Shield, Key, Database, Activity, 
  Server, Lock, Eye, Webhook, Bell, AlertTriangle,
  CheckCircle, Clock, UserCog, ShieldAlert
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function SuperAdminPortalPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'admin')) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, portalId, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-500 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const systemStats = [
    { label: 'Total Users', value: '1,380', icon: Users, color: 'red' },
    { label: 'Active Sessions', value: '245', icon: Activity, color: 'blue' },
    { label: 'API Requests Today', value: '12.5K', icon: Server, color: 'green' },
    { label: 'System Uptime', value: '99.9%', icon: CheckCircle, color: 'purple' },
  ]

  const systemHealth = [
    { service: 'Authentication Service', status: 'operational', latency: '12ms' },
    { service: 'Database Cluster', status: 'operational', latency: '8ms' },
    { service: 'API Gateway', status: 'operational', latency: '15ms' },
    { service: 'LMS Service', status: 'operational', latency: '25ms' },
    { service: 'CBT Service', status: 'operational', latency: '18ms' },
    { service: 'File Storage', status: 'operational', latency: '45ms' },
  ]

  const recentLogs = [
    { action: 'User role updated', user: 'Admin User', time: '5 minutes ago', type: 'info' },
    { action: 'Failed login attempt', user: 'Unknown', time: '12 minutes ago', type: 'warning' },
    { action: 'Database backup completed', user: 'System', time: '30 minutes ago', type: 'success' },
    { action: 'Permission change', user: 'Super Admin', time: '1 hour ago', type: 'info' },
    { action: 'New user created', user: 'Admin User', time: '2 hours ago', type: 'success' },
  ]

  const configSections = [
    { title: 'User Management', icon: Users, description: 'Manage users, roles, and permissions' },
    { title: 'Role Management', icon: UserCog, description: 'Configure role-based access control' },
    { title: 'Institution Settings', icon: Settings, description: 'Configure system settings' },
    { title: 'LMS Configuration', icon: Server, description: 'Learning management system settings' },
    { title: 'CBT Configuration', icon: Shield, description: 'Examination system settings' },
    { title: 'Accreditation', icon: ShieldAlert, description: 'Programme accreditation settings' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-4 ring-red-100">
          <AvatarFallback className="bg-gradient-to-br from-red-600 to-red-500 text-white text-lg">
            {user?.fullName?.slice(0, 2).toUpperCase() || 'SA'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">System Administration & Configuration</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Full System Access
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Super Admin
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index} className="border-red-100">
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Configuration */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-red-600" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {configSections.map((section, index) => (
                  <Button key={index} variant="outline" className="h-auto py-4 flex-col items-start text-left border-red-100 hover:bg-red-50">
                    <section.icon className="h-6 w-6 text-red-600 mb-2" />
                    <span className="font-semibold">{section.title}</span>
                    <span className="text-xs text-muted-foreground mt-1">{section.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">{service.service}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{service.latency}</span>
                      <Badge className="bg-green-100 text-green-700">Operational</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Security Overview */}
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Security Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Security Score</span>
                  <span className="text-2xl font-bold text-green-600">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                  <span className="text-sm">2FA Enabled</span>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                  <span className="text-sm">SSL Certificate</span>
                  <Badge className="bg-green-100 text-green-700">Valid</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                  <span className="text-sm">Audit Logging</span>
                  <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs */}
          <Card className="border-amber-100">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-amber-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentLogs.map((log, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  log.type === 'warning' ? 'bg-amber-50 border-amber-100' :
                  log.type === 'success' ? 'bg-green-50 border-green-100' :
                  'bg-slate-50 border-slate-100'
                }`}>
                  <p className="text-sm font-medium">{log.action}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{log.user}</span>
                    <span className="text-xs text-muted-foreground">{log.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                <Eye className="mr-2 h-4 w-4" /> View All Logs
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" /> Create User
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Key className="mr-2 h-4 w-4" /> Manage Roles
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" /> Database Monitor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Webhook className="mr-2 h-4 w-4" /> API Management
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" /> Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}