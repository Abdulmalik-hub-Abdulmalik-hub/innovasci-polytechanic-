'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"

export default function PortalIndexPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, portalId } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
      return
    }
    
    if (isAuthenticated && portalId) {
      router.push(`/portal/${portalId}`)
    }
  }, [isAuthenticated, isLoading, portalId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse" />
        <p className="text-lg font-medium text-slate-600">Loading your portal...</p>
      </div>
    </div>
  )
}
