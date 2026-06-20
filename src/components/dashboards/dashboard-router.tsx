'use client'

import { useAuthStore } from '@/store'
import { ManagementDashboard } from './management-dashboard'
import { AcademicDashboard } from './academic-dashboard'
import { StudentDashboard } from './student-dashboard'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function DashboardRouter() {
  const { user, portalId } = useAuthStore()

  if (!user) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">User Not Authenticated</p>
              <p className="text-sm text-red-700">Please log in to view your dashboard.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!portalId) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div>
              <p className="font-medium text-amber-900">Portal Not Determined</p>
              <p className="text-sm text-amber-700">Your portal access is being determined. Please refresh the page.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Route to the correct dashboard based on portal
  switch (portalId) {
    case 'management':
      return <ManagementDashboard user={user} />
    case 'academic':
      return <AcademicDashboard user={user} />
    case 'student':
      return <StudentDashboard user={user} />
    case 'applicant':
      // For applicant portal, use student dashboard as placeholder
      return <StudentDashboard user={user} />
    default:
      return (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-900">Unknown Portal</p>
                <p className="text-sm text-red-700">Your portal type is not recognized: {portalId}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )
  }
}

export default DashboardRouter
