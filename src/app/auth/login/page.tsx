"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, GraduationCap, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const { login, setLoading } = useAuthStore()
  const [isLoading, setIsLoadingLocal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoadingLocal(true)

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setError("Authentication system not configured. Please contact system administrator.")
      setIsLoadingLocal(false)
      return
    }

    try {
      if (isSignUp) {
        // Sign up flow
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        })

        if (signUpError) throw signUpError

        if (authData.user) {
          // Create user profile in users table
          const { error: profileError } = await supabase.from('users').insert({
            id: authData.user.id,
            email: formData.email,
            full_name: formData.email.split('@')[0],
            role: 'applicant', // Default role for new signups
            is_active: true,
            is_verified: false,
          })

          if (profileError) console.error('Profile creation error:', profileError)

          // Redirect to applicant portal for new users
          login({
            id: authData.user.id,
            email: formData.email,
            fullName: formData.email.split('@')[0],
            role: 'applicant',
            isActive: true,
            isVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }, 'supabase-auth-token')
          router.push("/portal/applicant")
        }
      } else {
        // Sign in flow
        const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) throw signInError

        if (authData.user) {
          // Fetch user profile from database
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authData.user.id)
            .single()

          if (profileError) {
            // If profile doesn't exist, use auth data
            login({
              id: authData.user.id,
              email: authData.user.email || formData.email,
              fullName: authData.user.user_metadata?.full_name || formData.email.split('@')[0],
              role: 'applicant', // Default role
              isActive: true,
              isVerified: authData.user.email_confirmed_at ? true : false,
              createdAt: authData.user.created_at,
              updatedAt: authData.user.updated_at || authData.user.created_at,
            }, authData.session?.access_token || 'supabase-auth-token')
          } else {
            // Use profile from database
            login({
              id: profileData.id,
              email: profileData.email,
              fullName: profileData.full_name,
              role: profileData.role,
              isActive: profileData.is_active,
              isVerified: profileData.is_verified,
              createdAt: profileData.created_at,
              updatedAt: profileData.updated_at,
            }, authData.session?.access_token || 'supabase-auth-token')
          }

          // Redirect based on role
          const userRole = profileData?.role || 'applicant'
          const roleToRoute: Record<string, string> = {
            applicant: '/portal/applicant',
            student: '/portal/student',
            lecturer: '/portal/academic',
            programme_coordinator: '/portal/academic',
            hod: '/portal/academic',
            dean: '/portal/academic',
            rector: '/portal/management',
            deputy_rector_academic: '/portal/management',
            deputy_rector_admin: '/portal/management',
            registrar: '/portal/management',
            bursar: '/portal/management',
            librarian: '/portal/management',
            director: '/portal/management',
            super_admin: '/portal/super-admin',
          }
          
          router.push(roleToRoute[userRole] || '/portal/applicant')
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(err.message || "Authentication failed. Please try again.")
    }

    setIsLoadingLocal(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <span className="text-2xl font-bold text-white">IA</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-300">
            {isSignUp 
              ? 'Sign up to start your application' 
              : 'Sign in to your InnovaSci account'}
          </p>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" className="rounded border-white/20 bg-white/10" />
                  Remember me
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isSignUp ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300 text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{" "}
                <button 
                  onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {isSignUp ? 'Sign In' : 'Apply Now'}
                </button>
              </p>
            </div>

            {!isSupabaseConfigured() && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-amber-400 text-sm">
                  <p className="font-semibold mb-1">Configuration Required</p>
                  <p>Supabase authentication is not configured. Please set environment variables.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}