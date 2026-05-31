'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
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
  Home,
  UserCheck,
  Building2,
  Award,
  FileCheck,
  Upload,
  Calendar,
  BookMarked,
  Video,
  FlaskConical,
  Library,
  ClipboardCheck,
  BarChart,
  Scale,
  FileStack,
  Database,
  Key,
  Eye,
  UsersRound,
  UserCog,
  BellRing,
  Settings2,
  Gauge,
  PieChart,
  BadgeCheck,
  History,
  Webhook,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAppStore, useAuthStore } from '@/store'
import { motion } from 'framer-motion'
import { Permission } from '@/lib/rbac'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: string
  permission?: Permission
}

interface NavSection {
  label: string
  items: NavItem[]
}

// Navigation configuration by portal
const navigationByPortal: Record<string, { sections: NavSection[] }> = {
  applicant: {
    sections: [
      {
        label: 'Main',
        items: [
          { label: 'Dashboard', href: '/portal/applicant', icon: LayoutDashboard },
          { label: 'My Application', href: '/portal/applicant/application', icon: FileText },
          { label: 'Document Upload', href: '/portal/applicant/documents', icon: Upload },
          { label: 'Application Status', href: '/portal/applicant/status', icon: BadgeCheck },
        ],
      },
      {
        label: 'Payments',
        items: [
          { label: 'Pay Application Fee', href: '/portal/applicant/payment', icon: CreditCard },
        ],
      },
      {
        label: 'Support',
        items: [
          { label: 'Notifications', href: '/portal/applicant/notifications', icon: Bell },
          { label: 'Help & FAQ', href: '/portal/applicant/help', icon: FileCheck },
        ],
      },
    ],
  },
  student: {
    sections: [
      {
        label: 'Learning',
        items: [
          { label: 'Dashboard', href: '/portal/student', icon: LayoutDashboard },
          { label: 'My Courses', href: '/portal/student/courses', icon: BookOpen },
          { label: 'Video Lectures', href: '/portal/student/lectures', icon: Video },
          { label: 'Slides & Materials', href: '/portal/student/materials', icon: FileText },
          { label: 'Virtual Laboratory', href: '/portal/student/laboratory', icon: FlaskConical },
          { label: 'E-Library', href: '/portal/student/library', icon: Library },
        ],
      },
      {
        label: 'Academic',
        items: [
          { label: 'Course Registration', href: '/portal/student/registration', icon: UserCheck },
          { label: 'Assignments', href: '/portal/student/assignments', icon: ClipboardList },
          { label: 'CBT Exams', href: '/portal/student/exams', icon: ClipboardCheck },
          { label: 'Results', href: '/portal/student/results', icon: BarChart3 },
          { label: 'Transcript', href: '/portal/student/transcript', icon: FileStack },
        ],
      },
      {
        label: 'Project',
        items: [
          { label: 'Project Work', href: '/portal/student/project', icon: GraduationCap },
          { label: 'Practical Schedule', href: '/portal/student/practical', icon: Calendar },
        ],
      },
      {
        label: 'Account',
        items: [
          { label: 'Payments', href: '/portal/student/payments', icon: CreditCard },
          { label: 'Certificates', href: '/portal/student/certificates', icon: Award },
          { label: 'Profile', href: '/portal/student/profile', icon: Users },
          { label: 'Notifications', href: '/portal/student/notifications', icon: Bell },
        ],
      },
    ],
  },
  academic: {
    sections: [
      {
        label: 'Teaching',
        items: [
          { label: 'Dashboard', href: '/portal/academic', icon: LayoutDashboard },
          { label: 'My Courses', href: '/portal/academic/courses', icon: BookOpen },
          { label: 'Content Upload', href: '/portal/academic/content', icon: Upload },
          { label: 'Assignments', href: '/portal/academic/assignments', icon: ClipboardList },
          { label: 'Examinations', href: '/portal/academic/exams', icon: ClipboardCheck },
        ],
      },
      {
        label: 'Students',
        items: [
          { label: 'Student List', href: '/portal/academic/students', icon: Users },
          { label: 'Attendance', href: '/portal/academic/attendance', icon: Calendar },
          { label: 'Grading', href: '/portal/academic/grading', icon: Award },
          { label: 'Results', href: '/portal/academic/results', icon: BarChart3 },
        ],
      },
      {
        label: 'Management',
        items: [
          { label: 'Academic Reports', href: '/portal/academic/reports', icon: BarChart },
          { label: 'Department Reports', href: '/portal/academic/department', icon: Building2 },
          { label: 'Programme Reports', href: '/portal/academic/programme', icon: FileCheck },
          { label: 'Curriculum', href: '/portal/academic/curriculum', icon: BookMarked },
        ],
      },
      {
        label: 'Account',
        items: [
          { label: 'Profile', href: '/portal/academic/profile', icon: Users },
          { label: 'Notifications', href: '/portal/academic/notifications', icon: Bell },
        ],
      },
    ],
  },
  management: {
    sections: [
      {
        label: 'Overview',
        items: [
          { label: 'Dashboard', href: '/portal/management', icon: LayoutDashboard },
          { label: 'Analytics', href: '/portal/management/analytics', icon: PieChart },
          { label: 'Reports', href: '/portal/management/reports', icon: BarChart },
        ],
      },
      {
        label: 'Academic',
        items: [
          { label: 'Student Statistics', href: '/portal/management/students', icon: UsersRound },
          { label: 'Staff Statistics', href: '/portal/management/staff', icon: Users },
          { label: 'Academic Reports', href: '/portal/management/academic-reports', icon: BookOpen },
          { label: 'Examination Reports', href: '/portal/management/examinations', icon: ClipboardCheck },
        ],
      },
      {
        label: 'Quality',
        items: [
          { label: 'QA Reports', href: '/portal/management/qa', icon: Scale },
          { label: 'Accreditation', href: '/portal/management/accreditation', icon: BadgeCheck },
          { label: 'ODFeL Monitoring', href: '/portal/management/odfel', icon: Eye },
        ],
      },
      {
        label: 'Operations',
        items: [
          { label: 'Revenue Reports', href: '/portal/management/finance', icon: CreditCard },
          { label: 'Library Reports', href: '/portal/management/library', icon: Library },
        ],
      },
      {
        label: 'Account',
        items: [
          { label: 'Profile', href: '/portal/management/profile', icon: Users },
          { label: 'Notifications', href: '/portal/management/notifications', icon: BellRing },
        ],
      },
    ],
  },
  admin: {
    sections: [
      {
        label: 'System',
        items: [
          { label: 'Dashboard', href: '/portal/super-admin', icon: LayoutDashboard },
          { label: 'Users', href: '/portal/super-admin/users', icon: UsersRound },
          { label: 'Roles', href: '/portal/super-admin/roles', icon: Shield },
          { label: 'Permissions', href: '/portal/super-admin/permissions', icon: Key },
        ],
      },
      {
        label: 'Configuration',
        items: [
          { label: 'Institution Settings', href: '/portal/super-admin/settings', icon: Settings2 },
          { label: 'LMS Configuration', href: '/portal/super-admin/lms', icon: BookOpen },
          { label: 'CBT Configuration', href: '/portal/super-admin/cbt', icon: ClipboardCheck },
          { label: 'Accreditation', href: '/portal/super-admin/accreditation', icon: BadgeCheck },
        ],
      },
      {
        label: 'Monitoring',
        items: [
          { label: 'Database', href: '/portal/super-admin/database', icon: Database },
          { label: 'Security', href: '/portal/super-admin/security', icon: Shield },
          { label: 'Audit Logs', href: '/portal/super-admin/audit', icon: History },
          { label: 'API Management', href: '/portal/super-admin/api', icon: Webhook },
        ],
      },
      {
        label: 'Account',
        items: [
          { label: 'Profile', href: '/portal/super-admin/profile', icon: Users },
          { label: 'Notifications', href: '/portal/super-admin/notifications', icon: BellRing },
        ],
      },
    ],
  },
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const { user, logout, portalId } = useAuthStore()

  const navConfig = portalId ? navigationByPortal[portalId] : null

  // Determine portal display name
  const getPortalName = () => {
    if (!portalId) return 'Portal'
    switch (portalId) {
      case 'applicant': return 'Applicant'
      case 'student': return 'Student'
      case 'academic': return 'Academic Staff'
      case 'management': return 'Management'
      case 'admin': return 'Super Admin'
      default: return 'Portal'
    }
  }

  // Determine portal color
  const getPortalColor = () => {
    if (!portalId) return 'from-slate-700 to-slate-600'
    switch (portalId) {
      case 'applicant': return 'from-blue-700 to-blue-600'
      case 'student': return 'from-emerald-700 to-emerald-600'
      case 'academic': return 'from-purple-700 to-purple-600'
      case 'management': return 'from-orange-700 to-orange-600'
      case 'admin': return 'from-red-700 to-red-600'
      default: return 'from-slate-700 to-slate-600'
    }
  }

  if (!navConfig) {
    return null
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-300',
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/portal" className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${getPortalColor()} shadow-lg`}>
              <span className="text-xl font-bold text-white">IA</span>
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <span className="text-lg font-bold text-white">InnovaSci</span>
                <span className="text-xs text-white/60">{getPortalName()} Portal</span>
              </motion.div>
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
        <nav className="flex-1 space-y-6 p-4 overflow-y-auto">
          {navConfig.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-1">
              {sidebarOpen && (
                <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                  {section.label}
                </h3>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? `bg-gradient-to-r ${getPortalColor()} text-white shadow-lg`
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <item.icon className={cn('h-5 w-5 shrink-0', isActive && 'text-white')} />
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
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t border-white/10 p-4">
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'justify-center')}>
            <Avatar className="h-10 w-10 ring-2 ring-white/20">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className={`bg-gradient-to-br ${getPortalColor()} text-white`}>
                {user?.fullName?.slice(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">{user?.fullName || 'User'}</p>
                <Badge variant="secondary" className="text-xs mt-1 bg-white/10 text-white/80 border-0">
                  {getPortalName()}
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