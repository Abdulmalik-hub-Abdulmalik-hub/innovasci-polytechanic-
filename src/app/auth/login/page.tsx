"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Loader2, GraduationCap, AlertCircle, Mail, Lock, User, ChevronDown, ChevronUp, KeyRound, Users, BookOpen, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthStore } from "@/store"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { getPortalForRole } from "@/lib/rbac"

// Demo credentials for all system roles with academic entity mappings
const DEMO_CREDENTIALS = [
  // Super Admin
  { role: 'super_admin', email: 'super_admin@innova-sci.local', password: 'Super@12345', portal: '/portal/super-admin', display: 'Super Admin', assignment: null },
  
  // ===== ACADEMIC PORTAL - DEANS (5) =====
  { role: 'dean', email: 'dean_ai@innova-sci.local', password: 'DeanAI@12345', portal: '/portal/academic', display: 'Dean - AI School', assignment: { type: 'faculty', id: 'f1', name: 'School of AI & Computational Intelligence', ndCount: 3, hndCount: 3 } },
  { role: 'dean', email: 'dean_eng@innova-sci.local', password: 'DeanEng@12345', portal: '/portal/academic', display: 'Dean - Engineering', assignment: { type: 'faculty', id: 'f2', name: 'School of Engineering', ndCount: 4, hndCount: 4 } },
  { role: 'dean', email: 'dean_bus@innova-sci.local', password: 'DeanBus@12345', portal: '/portal/academic', display: 'Dean - Business', assignment: { type: 'faculty', id: 'f3', name: 'School of Business', ndCount: 3, hndCount: 3 } },
  { role: 'dean', email: 'dean_sci@innova-sci.local', password: 'DeanSci@12345', portal: '/portal/academic', display: 'Dean - Applied Sciences', assignment: { type: 'faculty', id: 'f4', name: 'School of Applied Sciences', ndCount: 3, hndCount: 3 } },
  { role: 'dean', email: 'dean_cyber@innova-sci.local', password: 'DeanCyber@12345', portal: '/portal/academic', display: 'Dean - Cybersecurity', assignment: { type: 'faculty', id: 'f5', name: 'School of Cybersecurity & Cloud Computing', ndCount: 2, hndCount: 2 } },
  
  // ===== ACADEMIC PORTAL - HODs (15) =====
  { role: 'hod', email: 'hod_aiml@innova-sci.local', password: 'HodAIML@12345', portal: '/portal/academic', display: 'HOD - AI & ML', assignment: { type: 'department', id: 'd1', name: 'Artificial Intelligence & Machine Learning', faculty: 'School of AI & Computational Intelligence' } },
  { role: 'hod', email: 'hod_dsa@innova-sci.local', password: 'HodDSA@12345', portal: '/portal/academic', display: 'HOD - Data Science', assignment: { type: 'department', id: 'd2', name: 'Data Science & Analytics', faculty: 'School of AI & Computational Intelligence' } },
  { role: 'hod', email: 'hod_ris@innova-sci.local', password: 'HodRIS@12345', portal: '/portal/academic', display: 'HOD - Robotics', assignment: { type: 'department', id: 'd3', name: 'Robotics & Intelligent Systems', faculty: 'School of AI & Computational Intelligence' } },
  { role: 'hod', email: 'hod_eee@innova-sci.local', password: 'HodEEE@12345', portal: '/portal/academic', display: 'HOD - EEE', assignment: { type: 'department', id: 'd4', name: 'Electrical/Electronic Engineering', faculty: 'School of Engineering' } },
  { role: 'hod', email: 'hod_ce@innova-sci.local', password: 'HodCE@12345', portal: '/portal/academic', display: 'HOD - Computer Eng', assignment: { type: 'department', id: 'd5', name: 'Computer Engineering', faculty: 'School of Engineering' } },
  { role: 'hod', email: 'hod_tce@innova-sci.local', password: 'HodTCE@12345', portal: '/portal/academic', display: 'HOD - Telecom', assignment: { type: 'department', id: 'd6', name: 'Telecommunications Engineering', faculty: 'School of Engineering' } },
  { role: 'hod', email: 'hod_mce@innova-sci.local', password: 'HodMCE@12345', portal: '/portal/academic', display: 'HOD - Mechatronics', assignment: { type: 'department', id: 'd7', name: 'Mechatronics Engineering', faculty: 'School of Engineering' } },
  { role: 'hod', email: 'hod_ba@innova-sci.local', password: 'HodBA@12345', portal: '/portal/academic', display: 'HOD - Business Admin', assignment: { type: 'department', id: 'd8', name: 'Business Administration', faculty: 'School of Business' } },
  { role: 'hod', email: 'hod_acc@innova-sci.local', password: 'HodACC@12345', portal: '/portal/academic', display: 'HOD - Accounting', assignment: { type: 'department', id: 'd9', name: 'Accounting', faculty: 'School of Business' } },
  { role: 'hod', email: 'hod_bf@innova-sci.local', password: 'HodBF@12345', portal: '/portal/academic', display: 'HOD - Banking & Finance', assignment: { type: 'department', id: 'd10', name: 'Banking & Finance', faculty: 'School of Business' } },
  { role: 'hod', email: 'hod_slt@innova-sci.local', password: 'HodSLT@12345', portal: '/portal/academic', display: 'HOD - Science Lab', assignment: { type: 'department', id: 'd11', name: 'Science Laboratory Technology', faculty: 'School of Applied Sciences' } },
  { role: 'hod', email: 'hod_stat@innova-sci.local', password: 'HodSTAT@12345', portal: '/portal/academic', display: 'HOD - Statistics', assignment: { type: 'department', id: 'd12', name: 'Statistics', faculty: 'School of Applied Sciences' } },
  { role: 'hod', email: 'hod_bio@innova-sci.local', password: 'HodBIO@12345', portal: '/portal/academic', display: 'HOD - Biotechnology', assignment: { type: 'department', id: 'd13', name: 'Biotechnology', faculty: 'School of Applied Sciences' } },
  { role: 'hod', email: 'hod_cs@innova-sci.local', password: 'HodCS@12345', portal: '/portal/academic', display: 'HOD - Cyber Security', assignment: { type: 'department', id: 'd14', name: 'Cyber Security', faculty: 'School of Cybersecurity & Cloud Computing' } },
  { role: 'hod', email: 'hod_cloud@innova-sci.local', password: 'HodCloud@12345', portal: '/portal/academic', display: 'HOD - Cloud Computing', assignment: { type: 'department', id: 'd15', name: 'Cloud Computing', faculty: 'School of Cybersecurity & Cloud Computing' } },
  
  // ===== ACADEMIC PORTAL - PROGRAMME COORDINATORS (ND + HND for each) =====
  { role: 'program_coordinator', email: 'coord_aml_nd@innova-sci.local', password: 'CoordAML@12345', portal: '/portal/academic', display: 'Coord - AML (ND)', assignment: { type: 'programme', id: 'p1', name: 'Applied Machine Learning', level: 'ND', department: 'Artificial Intelligence & Machine Learning', faculty: 'School of AI & Computational Intelligence' } },
  { role: 'program_coordinator', email: 'coord_aml_hnd@innova-sci.local', password: 'CoordAML@12345', portal: '/portal/academic', display: 'Coord - AML (HND)', assignment: { type: 'programme', id: 'p2', name: 'Applied Machine Learning', level: 'HND', department: 'Artificial Intelligence & Machine Learning', faculty: 'School of AI & Computational Intelligence' } },
  { role: 'program_coordinator', email: 'coord_dsc_nd@innova-sci.local', password: 'CoordDSC@12345', portal: '/portal/academic', display: 'Coord - Data Science (ND)', assignment: { type: 'programme', id: 'p3', name: 'Data Science', level: 'ND', department: 'Data Science & Analytics', faculty: 'School of AI & Computational Intelligence' } },
  { role: 'program_coordinator', email: 'coord_dsc_hnd@innova-sci.local', password: 'CoordDSC@12345', portal: '/portal/academic', display: 'Coord - Data Science (HND)', assignment: { type: 'programme', id: 'p4', name: 'Data Science', level: 'HND', department: 'Data Science & Analytics', faculty: 'School of AI & Computational Intelligence' } },
  { role: 'program_coordinator', email: 'coord_eee_nd@innova-sci.local', password: 'CoordEEE@12345', portal: '/portal/academic', display: 'Coord - EEE (ND)', assignment: { type: 'programme', id: 'p7', name: 'Electrical/Electronic Engineering', level: 'ND', department: 'Electrical/Electronic Engineering', faculty: 'School of Engineering' } },
  { role: 'program_coordinator', email: 'coord_eee_hnd@innova-sci.local', password: 'CoordEEE@12345', portal: '/portal/academic', display: 'Coord - EEE (HND)', assignment: { type: 'programme', id: 'p8', name: 'Electrical/Electronic Engineering', level: 'HND', department: 'Electrical/Electronic Engineering', faculty: 'School of Engineering' } },
  { role: 'program_coordinator', email: 'coord_ce_nd@innova-sci.local', password: 'CoordCE@12345', portal: '/portal/academic', display: 'Coord - Comp Eng (ND)', assignment: { type: 'programme', id: 'p9', name: 'Computer Engineering', level: 'ND', department: 'Computer Engineering', faculty: 'School of Engineering' } },
  { role: 'program_coordinator', email: 'coord_ce_hnd@innova-sci.local', password: 'CoordCE@12345', portal: '/portal/academic', display: 'Coord - Comp Eng (HND)', assignment: { type: 'programme', id: 'p10', name: 'Computer Engineering', level: 'HND', department: 'Computer Engineering', faculty: 'School of Engineering' } },
  { role: 'program_coordinator', email: 'coord_ba_nd@innova-sci.local', password: 'CoordBA@12345', portal: '/portal/academic', display: 'Coord - Business Admin (ND)', assignment: { type: 'programme', id: 'p15', name: 'Business Administration', level: 'ND', department: 'Business Administration', faculty: 'School of Business' } },
  { role: 'program_coordinator', email: 'coord_ba_hnd@innova-sci.local', password: 'CoordBA@12345', portal: '/portal/academic', display: 'Coord - Business Admin (HND)', assignment: { type: 'programme', id: 'p16', name: 'Business Administration', level: 'HND', department: 'Business Administration', faculty: 'School of Business' } },
  { role: 'program_coordinator', email: 'coord_acc_nd@innova-sci.local', password: 'CoordACC@12345', portal: '/portal/academic', display: 'Coord - Accounting (ND)', assignment: { type: 'programme', id: 'p17', name: 'Accounting', level: 'ND', department: 'Accounting', faculty: 'School of Business' } },
  { role: 'program_coordinator', email: 'coord_acc_hnd@innova-sci.local', password: 'CoordACC@12345', portal: '/portal/academic', display: 'Coord - Accounting (HND)', assignment: { type: 'programme', id: 'p18', name: 'Accounting', level: 'HND', department: 'Accounting', faculty: 'School of Business' } },
  { role: 'program_coordinator', email: 'coord_cs_nd@innova-sci.local', password: 'CoordCS@12345', portal: '/portal/academic', display: 'Coord - Cyber Sec (ND)', assignment: { type: 'programme', id: 'p27', name: 'Ethical Hacking & Penetration Testing', level: 'ND', department: 'Cyber Security', faculty: 'School of Cybersecurity & Cloud Computing' } },
  { role: 'program_coordinator', email: 'coord_cs_hnd@innova-sci.local', password: 'CoordCS@12345', portal: '/portal/academic', display: 'Coord - Cyber Sec (HND)', assignment: { type: 'programme', id: 'p28', name: 'Ethical Hacking & Penetration Testing', level: 'HND', department: 'Cyber Security', faculty: 'School of Cybersecurity & Cloud Computing' } },
  { role: 'program_coordinator', email: 'coord_cloud_nd@innova-sci.local', password: 'CoordCloud@12345', portal: '/portal/academic', display: 'Coord - Cloud (ND)', assignment: { type: 'programme', id: 'p29', name: 'Cloud Computing', level: 'ND', department: 'Cloud Computing', faculty: 'School of Cybersecurity & Cloud Computing' } },
  { role: 'program_coordinator', email: 'coord_cloud_hnd@innova-sci.local', password: 'CoordCloud@12345', portal: '/portal/academic', display: 'Coord - Cloud (HND)', assignment: { type: 'programme', id: 'p30', name: 'Cloud Computing', level: 'HND', department: 'Cloud Computing', faculty: 'School of Cybersecurity & Cloud Computing' } },
  
  // ===== ACADEMIC PORTAL - LECTURER =====
  { role: 'lecturer', email: 'lecturer@innova-sci.local', password: 'Lecturer@12345', portal: '/portal/academic', display: 'Lecturer', assignment: null },
  
  // Senior Management
  { role: 'rector', email: 'rector@innova-sci.local', password: 'Rector@12345', portal: '/portal/management', display: 'Rector', assignment: null },
  { role: 'deputy_rector_academic', email: 'deputy_academic@innova-sci.local', password: 'Deputy@12345', portal: '/portal/management', display: 'Deputy Rector (Academic)', assignment: null },
  { role: 'deputy_rector_admin', email: 'deputy_admin@innova-sci.local', password: 'Deputy@12345', portal: '/portal/management', display: 'Deputy Rector (Admin)', assignment: null },
  // Administrative Officers
  { role: 'registrar', email: 'registrar@innova-sci.local', password: 'Registrar@12345', portal: '/portal/management', display: 'Registrar', assignment: null },
  { role: 'bursar', email: 'bursar@innova-sci.local', password: 'Bursar@12345', portal: '/portal/management', display: 'Bursar', assignment: null },
  { role: 'librarian', email: 'librarian@innova-sci.local', password: 'Librarian@12345', portal: '/portal/management', display: 'Librarian', assignment: null },
  // Directors
  { role: 'director', email: 'director@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director', assignment: null },
  { role: 'admission_officer', email: 'admission@innova-sci.local', password: 'Admission@12345', portal: '/portal/management', display: 'Admission Officer', assignment: null },
  { role: 'examination_officer', email: 'exam@innova-sci.local', password: 'Exam@12345', portal: '/portal/management', display: 'Examination Officer', assignment: null },
  { role: 'director_ict', email: 'ict@innova-sci.local', password: 'Ict@12345', portal: '/portal/management', display: 'Director ICT', assignment: null },
  { role: 'director_odfel', email: 'odfel@innova-sci.local', password: 'Odfel@12345', portal: '/portal/management', display: 'Director ODFeL', assignment: null },
  { role: 'director_quality_assurance', email: 'qa@innova-sci.local', password: 'Qa@12345', portal: '/portal/management', display: 'Director QA', assignment: null },
  { role: 'director_cbt_services', email: 'cbt@innova-sci.local', password: 'Cbt@12345', portal: '/portal/management', display: 'Director CBT', assignment: null },
  { role: 'director_virtual_laboratories', email: 'vlab@innova-sci.local', password: 'Vlab@12345', portal: '/portal/management', display: 'Director V-Lab', assignment: null },
  { role: 'director_student_affairs', email: 'student_affairs@innova-sci.local', password: 'StudentAffairs@12345', portal: '/portal/management', display: 'Dir. Student Affairs', assignment: null },
  // Students
  { role: 'student', email: 'student@innova-sci.local', password: 'Student@12345', portal: '/portal/student', display: 'Student', assignment: null },
  { role: 'applicant', email: 'applicant@innova-sci.local', password: 'Applicant@12345', portal: '/portal/applicant', display: 'Applicant', assignment: null },
]

// Demo credential type
type DemoCredential = typeof DEMO_CREDENTIALS[number];

// Group by portal and role category
const ROLE_GROUPS = [
  { name: 'Admin Portal', icon: '🔐', roles: DEMO_CREDENTIALS.filter(c => c.role === 'super_admin'), color: 'emerald' },
  { 
    name: 'Academic Portal', 
    icon: '📚', 
    roles: DEMO_CREDENTIALS.filter(c => ['dean', 'hod', 'program_coordinator', 'lecturer'].includes(c.role)),
    color: 'purple',
    subGroups: [
      { name: 'Deans (Faculty Heads)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'dean') },
      { name: 'HODs (Department Heads)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'hod') },
      { name: 'Programme Coordinators', roles: DEMO_CREDENTIALS.filter(c => c.role === 'program_coordinator') },
      { name: 'Lecturers', roles: DEMO_CREDENTIALS.filter(c => c.role === 'lecturer') },
    ]
  },
  { name: 'Management Portal', icon: '🏛️', roles: DEMO_CREDENTIALS.filter(c => ['rector', 'deputy_rector_academic', 'deputy_rector_admin', 'registrar', 'bursar', 'librarian', 'director', 'admission_officer', 'examination_officer', 'director_ict', 'director_odfel', 'director_quality_assurance', 'director_cbt_services', 'director_virtual_laboratories', 'director_student_affairs'].includes(c.role)), color: 'blue' },
  { name: 'Student Portal', icon: '🎓', roles: DEMO_CREDENTIALS.filter(c => c.role === 'student'), color: 'amber' },
  { name: 'Applicant Portal', icon: '📝', roles: DEMO_CREDENTIALS.filter(c => c.role === 'applicant'), color: 'rose' },
]

// Sub-group type
type SubGroup = { name: string; roles: DemoCredential[] };

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [fullName, setFullName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showDemoPanel, setShowDemoPanel] = useState(false)

  // Auto-fill credentials when demo button is clicked
  const fillDemoCredentials = (email: string, password: string) => {
    setFormData({ email, password })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setPasswordError("")
    setIsLoading(true)

    if (!isSupabaseConfigured()) {
      setError("Authentication system not configured. Please contact system administrator.")
      setIsLoading(false)
      return
    }

    try {
      if (mode === 'register') {
        // Password validation
        if (formData.password.length < 8) {
          setPasswordError("Password must be at least 8 characters long")
          setIsLoading(false)
          return
        }
        
        if (formData.password !== confirmPassword) {
          setPasswordError("Passwords do not match")
          setIsLoading(false)
          return
        }

        // Register new user
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (signUpError) throw signUpError

        if (authData.user) {
          // Create user profile in users table
          const { error: profileError } = await supabase.from('users').insert({
            id: authData.user.id,
            email: formData.email,
            full_name: fullName,
            role: 'applicant', // Default role for new registrations
            is_active: true,
            is_verified: false, // Email verification required
          })

          if (profileError) {
            console.error('Profile creation error:', profileError)
          }

          login({
            id: authData.user.id,
            email: formData.email,
            fullName: fullName,
            role: 'applicant',
            portal: 'applicant' as any,
            isActive: true,
            isVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }, authData.session?.access_token || 'supabase-auth-token')
          
          // Redirect to applicant portal with email verification message
          router.push("/portal/applicant?verified=pending")
        }
      } else {
        // Login existing user
        const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) throw signInError

        if (authData.user) {
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authData.user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            throw new Error('Failed to fetch user profile')
          }

          if (profileData) {
            login({
              id: profileData.id,
              email: profileData.email,
              fullName: profileData.full_name,
              role: profileData.role,
              portal: getPortalForRole(profileData.role as any) as any,
              isActive: profileData.is_active,
              isVerified: profileData.is_verified,
              createdAt: profileData.created_at,
              updatedAt: profileData.updated_at,
            }, authData.session?.access_token || 'supabase-auth-token')
          } else {
            // Profile doesn't exist, create minimal profile
            login({
              id: authData.user.id,
              email: authData.user.email || formData.email,
              fullName: authData.user.user_metadata?.full_name || formData.email.split('@')[0],
              role: 'applicant',
              portal: '/portal/applicant' as any,
              isActive: true,
              isVerified: authData.user.email_confirmed_at ? true : false,
              createdAt: authData.user.created_at,
              updatedAt: authData.user.updated_at || authData.user.created_at,
            }, authData.session?.access_token || 'supabase-auth-token')
          }

          const userRole = profileData?.role || 'applicant'
          const roleToRoute: Record<string, string> = {
            applicant: '/portal/applicant',
            student: '/portal/student',
            lecturer: '/portal/academic',
            programme_coordinator: '/portal/academic',
            hod: '/portal/academic',
            dean: '/portal/academic',
            rector: '/portal/management',
            examination_officer: '/portal/management',
            deputy_rector_academic: '/portal/management',
            deputy_rector_admin: '/portal/management',
            registrar: '/portal/management',
            bursar: '/portal/management',
            librarian: '/portal/management',
            director: '/portal/management',
            admission_officer: '/portal/management',
            director_ict: '/portal/management',
            director_odfel: '/portal/management',
            director_quality_assurance: '/portal/management',
            director_cbt_services: '/portal/management',
            director_virtual_laboratories: '/portal/management',
            director_student_affairs: '/portal/management',
            super_admin: '/portal/super-admin',
          }
          
          router.push(roleToRoute[userRole] || '/portal/applicant')
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(err.message || "Authentication failed. Please try again.")
    }

    setIsLoading(false)
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
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <span className="text-2xl font-bold text-white">IA</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {mode === 'register' ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-300">
            {mode === 'register' 
              ? 'Sign up to begin your application process' 
              : 'Sign in to access your InnovaSci account'}
          </p>
        </div>

        {/* Demo Credentials Panel */}
        {mode === 'login' && (
          <Card className="backdrop-blur-lg bg-emerald-500/10 border-emerald-500/30 shadow-2xl mb-6">
            <CardContent className="p-4">
              <button
                type="button"
                onClick={() => setShowDemoPanel(!showDemoPanel)}
                className="w-full flex items-center justify-between text-emerald-400 hover:text-emerald-300"
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5" />
                  <span className="font-semibold">🚀 Demo Credentials - Click to Test Any Role</span>
                </div>
                {showDemoPanel ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              
              <AnimatePresence>
                {showDemoPanel && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4">
                      {ROLE_GROUPS.map((group) => (
                        <div key={group.name} className="space-y-2">
                          <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                            <span>{group.icon}</span>
                            <span>{group.name}</span>
                            <span className="text-xs text-slate-500">({group.roles.length} roles)</span>
                          </h3>
                          
                          {/* Show sub-groups for Academic Portal */}
                          {'subGroups' in group && group.subGroups ? (
                            <div className="pl-4 space-y-3 border-l-2 border-emerald-500/30">
                              {group.subGroups.map((subGroup: SubGroup) => (
                                <div key={subGroup.name}>
                                  <h4 className="text-xs font-medium text-slate-400 mb-2">{subGroup.name}</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {subGroup.roles.map((cred) => (
                                      <button
                                        key={`${cred.role}-${cred.email}`}
                                        type="button"
                                        onClick={() => fillDemoCredentials(cred.email, cred.password)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                          formData.email === cred.email
                                            ? 'bg-purple-500 text-white ring-2 ring-purple-400'
                                            : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/30'
                                        }`}
                                        title={cred.assignment ? `${cred.assignment.name}${cred.assignment.type === 'faculty' ? ` (${cred.assignment.ndCount}ND/${cred.assignment.hndCount}HND)` : ''}` : `Dashboard: ${cred.portal}`}
                                      >
                                        {cred.display}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {group.roles.map((cred) => (
                                <button
                                  key={`${cred.role}-${cred.email}`}
                                  type="button"
                                  onClick={() => fillDemoCredentials(cred.email, cred.password)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    formData.email === cred.email
                                      ? 'bg-emerald-500 text-white ring-2 ring-emerald-400'
                                      : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
                                  }`}
                                  title={`Dashboard: ${cred.portal}`}
                                >
                                  {cred.display}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <span className="text-amber-400">⚠️</span>
                          Development/Testing only - Do not use in production
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        )}

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-10"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={mode === 'register' ? "Create a strong password (min 8 chars)" : "Enter your password"}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={mode === 'register' ? 8 : 6}
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

              {mode === 'register' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-400 text-sm">{passwordError}</p>
                  )}
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-end">
                  <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === 'register' ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  mode === 'register' ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-300 text-sm">
                {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}{" "}
                <button 
                  onClick={() => { 
                    setMode(mode === 'register' ? 'login' : 'register'); 
                    setError(''); 
                    setPasswordError('');
                  }}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {mode === 'register' ? 'Sign In' : 'Apply Now'}
                </button>
              </p>
            </div>

            {mode === 'register' && (
              <div className="mt-4 text-center text-xs text-slate-400">
                <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            )}

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
