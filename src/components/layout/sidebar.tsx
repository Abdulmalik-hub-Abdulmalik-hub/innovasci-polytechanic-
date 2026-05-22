"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Users,
  Settings,
  BookOpen,
  CreditCard,
  Shield,
  ClipboardList,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAppStore } from "@/store"
import { useAuthStore } from "@/store"
import { motion } from "framer-motion"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: string
}

const navigationByRole: Record<string, { items: NavItem[]; label: string }> = {
  student: {
    label: "Student",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
      { label: "Exams", href: "/dashboard/exams", icon: FileText },
      { label: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
      { label: "Results", href: "/dashboard/results", icon: BarChart3 },
      { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
      { label: "Project", href: "/dashboard/project", icon: GraduationCap },
    ],
  },
  lecturer: {
    label: "Lecturer",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
      { label: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
      { label: "Students", href: "/dashboard/students", icon: Users },
      { label: "Results", href: "/dashboard/results", icon: BarChart3 },
      { label: "Materials", href: "/dashboard/materials", icon: FileText },
    ],
  },
  admin: {
    label: "Admin",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Students", href: "/dashboard/students", icon: Users },
      { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
      { label: "Exams", href: "/dashboard/exams", icon: FileText },
      { label: "Results", href: "/dashboard/results", icon: BarChart3 },
      { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
  super_admin: {
    label: "Super Admin",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Users", href: "/dashboard/users", icon: Users },
      { label: "Academic", href: "/dashboard/academic", icon: GraduationCap },
      { label: "Finance", href: "/dashboard/finance", icon: CreditCard },
      { label: "Exams", href: "/dashboard/exams", icon: FileText },
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
      { label: "Audit Logs", href: "/dashboard/audit", icon: Shield },
    ],
  },
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const { user, logout } = useAuthStore()

  const roleKey = user?.role?.includes('admin') ? (user.role === 'super_admin' ? 'super_admin' : 'admin') : 
                  user?.role || 'student'
  const navConfig = navigationByRole[roleKey] || navigationByRole.student

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-300",
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-xl font-bold text-white">IA</span>
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-bold text-white"
              >
                InnovaSci
              </motion.span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navConfig.items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-white")} />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
                {item.badge && sidebarOpen && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-white/10 p-4">
          <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
            <Avatar className="h-10 w-10 ring-2 ring-white/20">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {user?.fullName?.slice(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{user?.fullName || 'User'}</p>
                <Badge variant="secondary" className="text-xs mt-1 bg-white/10 text-white/80 border-0">
                  {navConfig.label}
                </Badge>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <Button
              variant="ghost"
              className="mt-4 w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}