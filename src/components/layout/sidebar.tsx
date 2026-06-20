'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Home,
} from 'lucide-react'
import { useAppStore, useAuthStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ROLE_DISPLAY_NAMES } from '@/types'
import { getNavigationByPortal } from '@/lib/navigation-config'

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore()
  const { user, logout, portalId } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
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

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  if (!isMounted || !user || !portalId) return null

  const navigationSections = getNavigationByPortal(portalId)
  const userRoleName = ROLE_DISPLAY_NAMES[user.role]

  const handleSectionToggle = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const handleNavClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Menu Button (fixed position) */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="bg-white shadow-md hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-10"
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={isMobile ? { x: -300 } : { opacity: 0 }}
            animate={isMobile ? { x: 0 } : { opacity: 1 }}
            exit={isMobile ? { x: -300 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'fixed lg:static top-0 left-0 bottom-0 z-20 bg-white border-r overflow-y-auto',
              sidebarOpen ? 'w-72' : 'w-20',
              isMobile && 'w-72 shadow-xl'
            )}
          >
            {/* Logo/Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              {sidebarOpen ? (
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
                    <span className="font-bold text-sm hidden md:inline">
                      InnovaSci
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {portalId === 'management'
                      ? 'Management Portal'
                      : portalId === 'academic'
                      ? 'Academic Portal'
                      : portalId === 'student'
                      ? 'Student Portal'
                      : 'Applicant Portal'}
                  </p>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 mx-auto" />
              )}
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-8 w-8"
                >
                  {sidebarOpen ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {/* User Info */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {user.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{userRoleName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {navigationSections.map((section, index) => (
                <div key={index} className="space-y-1">
                  {sidebarOpen && (
                    <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.label}
                    </div>
                  )}
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNavClick}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
                        )}
                        title={item.label}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {sidebarOpen && (
                          <span className="flex-1 truncate">{item.label}</span>
                        )}
                        {item.badge && sidebarOpen && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    )
                  })}
                </div>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="sticky bottom-0 border-t bg-white p-4">
              <Button
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {sidebarOpen && 'Logout'}
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar Toggle (when closed) */}
      {!isMobile && !sidebarOpen && (
        <aside className="fixed left-0 top-0 bottom-0 w-20 bg-white border-r flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="w-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </aside>
      )}
    </>
  )
}
