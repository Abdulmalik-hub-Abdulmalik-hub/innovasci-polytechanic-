'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { useAppStore, useAuthStore } from "@/store"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { sidebarOpen } = useAppStore()
  const { isAuthenticated, isLoading, portalId } = useAuthStore()
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse" />
          <p className="text-muted-foreground">Loading portal...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className={`transition-all duration-300 ${
        isMobile
          ? 'ml-0 pt-16'
          : sidebarOpen
          ? 'ml-72'
          : 'ml-20'
      }`}>
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
