'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Copy, Check, LogIn, ChevronDown, ChevronUp, Shield, 
  AlertTriangle, User, GraduationCap, Building, BookOpen,
  Users, Clock, Eye, EyeOff, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { ROLE_DISPLAY_NAMES, type UserRole } from '@/types'

// =====================================================
// DEMO USERS DATA
// =====================================================

interface DemoAccount {
  email: string
  role: UserRole
  fullName: string
  description: string
  portal: string
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
}

const DEMO_PASSWORD = 'Demo@12345'

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    email: 'super_admin@innovasci-demo.com',
    role: 'super_admin',
    fullName: 'Super Admin Demo',
    description: 'Full system access and configuration',
    portal: '/portal/super-admin',
    icon: <Shield className="w-4 h-4" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  {
    email: 'rector@innovasci-demo.com',
    role: 'rector',
    fullName: 'Rector Demo',
    description: 'Top-level academic leadership',
    portal: '/portal/management',
    icon: <Building className="w-4 h-4" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    email: 'deputy_rector_academic@innovasci-demo.com',
    role: 'deputy_rector_academic',
    fullName: 'Deputy Rector (Academic) Demo',
    description: 'Academic affairs management',
    portal: '/portal/management',
    icon: <GraduationCap className="w-4 h-4" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    email: 'deputy_rector_admin@innovasci-demo.com',
    role: 'deputy_rector_admin',
    fullName: 'Deputy Rector (Admin) Demo',
    description: 'Administrative management',
    portal: '/portal/management',
    icon: <Building className="w-4 h-4" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  {
    email: 'registrar@innovasci-demo.com',
    role: 'registrar',
    fullName: 'Registrar Demo',
    description: 'Academic records and admissions',
    portal: '/portal/management',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
  },
  {
    email: 'bursar@innovasci-demo.com',
    role: 'bursar',
    fullName: 'Bursar Demo',
    description: 'Financial management',
    portal: '/portal/management',
    icon: <Building className="w-4 h-4" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    email: 'librarian@innovasci-demo.com',
    role: 'librarian',
    fullName: 'Librarian Demo',
    description: 'Library services management',
    portal: '/portal/management',
    icon: <BookOpen className="w-4 h-4" />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  {
    email: 'director@innovasci-demo.com',
    role: 'director',
    fullName: 'Director Demo',
    description: 'Departmental leadership',
    portal: '/portal/management',
    icon: <Users className="w-4 h-4" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    email: 'dean@innovasci-demo.com',
    role: 'dean',
    fullName: 'Dean Demo',
    description: 'Faculty leadership',
    portal: '/portal/academic',
    icon: <GraduationCap className="w-4 h-4" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    email: 'hod@innovasci-demo.com',
    role: 'hod',
    fullName: 'Head of Department Demo',
    description: 'Departmental management',
    portal: '/portal/academic',
    icon: <Users className="w-4 h-4" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    email: 'program_coordinator@innovasci-demo.com',
    role: 'program_coordinator',
    fullName: 'Program Coordinator Demo',
    description: 'Program management',
    portal: '/portal/academic',
    icon: <GraduationCap className="w-4 h-4" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    email: 'lecturer@innovasci-demo.com',
    role: 'lecturer',
    fullName: 'Lecturer Demo',
    description: 'Teaching and course management',
    portal: '/portal/academic',
    icon: <User className="w-4 h-4" />,
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    borderColor: 'border-lime-200',
  },
  {
    email: 'student@innovasci-demo.com',
    role: 'student',
    fullName: 'Student Demo',
    description: 'Student portal access',
    portal: '/portal/student',
    icon: <GraduationCap className="w-4 h-4" />,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
  },
  {
    email: 'applicant@innovasci-demo.com',
    role: 'applicant',
    fullName: 'Applicant Demo',
    description: 'Application and admission portal',
    portal: '/portal/applicant',
    icon: <User className="w-4 h-4" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
]

// =====================================================
// DEMO LOGIN PANEL COMPONENT
// =====================================================

interface DemoLoginPanelProps {
  onLoginSuccess?: () => void
}

export function DemoLoginPanel({ onLoginSuccess }: DemoLoginPanelProps) {
  const router = useRouter()
  const { login } = useAuthStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedEmail(key)
      setTimeout(() => setCopiedEmail(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDemoLogin = async (account: DemoAccount) => {
    if (!isSupabaseConfigured()) {
      setLoginError('Supabase not configured. Demo login requires Supabase setup.')
      return
    }

    setIsLoggingIn(account.email)
    setLoginError(null)

    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: account.email,
        password: DEMO_PASSWORD,
      })

      if (signInError) throw signInError

      if (authData.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single()

        if (profileError) {
          login({
            id: authData.user.id,
            email: authData.user.email || account.email,
            fullName: account.fullName,
            role: account.role,
            isActive: true,
            isVerified: true,
            createdAt: authData.user.created_at,
            updatedAt: authData.user.updated_at || authData.user.created_at,
          }, authData.session?.access_token || 'demo-token')
        } else {
          login({
            id: profileData.id,
            email: profileData.email,
            fullName: profileData.full_name,
            role: profileData.role,
            isActive: profileData.is_active,
            isVerified: profileData.is_verified,
            createdAt: profileData.created_at,
            updatedAt: profileData.updated_at,
          }, authData.session?.access_token || 'demo-token')
        }

        router.push(account.portal)
        onLoginSuccess?.()
      }
    } catch (err: any) {
      setLoginError(`Login failed: ${err.message}`)
    } finally {
      setIsLoggingIn(null)
    }
  }

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="mt-6">
      <div className="border border-amber-200 rounded-lg bg-amber-50/50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-amber-800 hover:bg-amber-100/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Demo Accounts (Development Mode)</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        <div className="px-4 pb-2">
          <div className="bg-amber-100 border border-amber-300 rounded px-3 py-2 text-sm text-amber-800 flex items-center gap-2">
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span>⚠️ These are demo accounts for testing only. NOT for production use.</span>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 space-y-4">
                <div className="bg-slate-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Password for all demo accounts:</span>
                    <button
                      onClick={() => copyToClipboard(DEMO_PASSWORD, 'password')}
                      className="flex items-center gap-1 text-sm text-slate-700 hover:text-slate-900"
                    >
                      {copiedEmail === 'password' ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-white px-3 py-1 rounded text-sm font-mono">
                      {showPassword ? DEMO_PASSWORD : '••••••••••••'}
                    </code>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {loginError}
                  </div>
                )}

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {DEMO_ACCOUNTS.map((account) => (
                    <div
                      key={account.email}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border',
                        account.bgColor,
                        account.borderColor
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn('p-2 rounded-lg', account.bgColor)}>
                          <span className={account.color}>{account.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{account.fullName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <code className="text-xs text-slate-500">{account.email}</code>
                            <button
                              onClick={() => copyToClipboard(account.email, account.email)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              {copiedEmail === account.email ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {account.portal}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDemoLogin(account)}
                          disabled={isLoggingIn !== null}
                          className="gap-1"
                        >
                          {isLoggingIn === account.email ? (
                            <Clock className="w-4 h-4 animate-spin" />
                          ) : (
                            <LogIn className="w-4 h-4" />
                          )}
                          Login
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 mb-2">Portal Access by Role:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-red-500" />
                      <span>Super Admin</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-purple-500" />
                      <span>Management</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-amber-500" />
                      <span>Academic</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-pink-500" />
                      <span>Student/Applicant</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// =====================================================
// COMPACT DEMO ACCOUNTS BUTTON
// =====================================================

interface CompactDemoButtonProps {
  onClick?: () => void
}

export function CompactDemoButton({ onClick }: CompactDemoButtonProps) {
  return (
    <div className="text-center mt-4">
      <button
        onClick={onClick}
        className="text-sm text-amber-400 hover:text-amber-300 underline"
      >
        Need a demo account? Click here
      </button>
    </div>
  )
}

// =====================================================
// EXPORT ACCOUNT DATA FOR OTHER COMPONENTS
// =====================================================

export { DEMO_ACCOUNTS, DEMO_PASSWORD }
export type { DemoAccount }