"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Loader2, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoadingLocal(true)

    // Simulate login - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Demo accounts for testing
    const demoUsers = {
      "student@innovasci.edu": { id: "1", email: "student@innovasci.edu", fullName: "Aisha Mohammed", role: "student" as const, isActive: true, isVerified: true, createdAt: "", updatedAt: "" },
      "lecturer@innovasci.edu": { id: "2", email: "lecturer@innovasci.edu", fullName: "Dr. Emmanuel Obi", role: "lecturer" as const, isActive: true, isVerified: true, createdAt: "", updatedAt: "" },
      "rector@innovasci.edu": { id: "3", email: "rector@innovasci.edu", fullName: "Prof. Adeniyi Olamilekan", role: "rector" as const, isActive: true, isVerified: true, createdAt: "", updatedAt: "" },
      "registrar@innovasci.edu": { id: "4", email: "registrar@innovasci.edu", fullName: "Mrs. Folake Adebayo", role: "registrar" as const, isActive: true, isVerified: true, createdAt: "", updatedAt: "" },
      "super@innovasci.edu": { id: "5", email: "super@innovasci.edu", fullName: "System Owner", role: "super_admin" as const, isActive: true, isVerified: true, createdAt: "", updatedAt: "" },
      "webuildandtarinbuilders@gmail.com": { id: "6", email: "webuildandtarinbuilders@gmail.com", fullName: "Super Admin", role: "super_admin" as const, isActive: true, isVerified: true, createdAt: "", updatedAt: "" },
    }

    const user = demoUsers[formData.email as keyof typeof demoUsers]
    if (user) {
      login(user, "demo-token-123")
      router.push("/dashboard")
    } else {
      setError("Invalid email or password. Try: student@innovasci.edu, lecturer@innovasci.edu, rector@innovasci.edu, or super@innovasci.edu")
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-300">Sign in to your InnovaSci account</p>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300 text-sm">
                Don't have an account?{" "}
                <Link href="/admission" className="text-blue-400 hover:text-blue-300 font-medium">
                  Apply Now
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-400 text-center mb-3">Demo Accounts (any password works)</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button onClick={() => setFormData({ email: "student@innovasci.edu", password: "demo" })} className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300">
                  Student
                </button>
                <button onClick={() => setFormData({ email: "lecturer@innovasci.edu", password: "demo" })} className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300">
                  Lecturer
                </button>
                <button onClick={() => setFormData({ email: "admin@innovasci.edu", password: "demo" })} className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300">
                  Admin
                </button>
                <button onClick={() => setFormData({ email: "super@innovasci.edu", password: "demo" })} className="p-2 rounded bg-white/5 hover:bg-white/10 text-slate-300">
                  Super Admin
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}