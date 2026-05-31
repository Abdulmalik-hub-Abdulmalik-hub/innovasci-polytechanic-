'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useAcademicStore, usePaymentStore, PORTALS } from "@/store"
import { ROLE_DISPLAY_NAMES } from "@/types"

// Redirect to appropriate portal dashboard
export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const { gpa, cgpa, currentLevel } = useAcademicStore()
  const { accessLevel } = usePaymentStore()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
      return
    }
    
    if (isAuthenticated && portalId) {
      // Redirect to the portal-specific dashboard
      router.push(`/portal/${portalId}`)
    }
  }, [isAuthenticated, isLoading, portalId, router])

  // Show loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse" />
        <p className="text-lg font-medium text-slate-600">Loading your dashboard...</p>
        <p className="text-sm text-slate-400">Redirecting to your portal</p>
      </div>
    </div>
  )
}
