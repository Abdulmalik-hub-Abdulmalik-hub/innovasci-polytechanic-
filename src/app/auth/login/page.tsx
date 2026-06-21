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
// INNOVASCI OPEN UNIVERSITY - University Management System
const DEMO_CREDENTIALS = [
  // ===== SUPER ADMIN =====
  { role: 'super_admin', email: 'super_admin@innova-sci.local', password: 'Super@12345', portal: '/portal/super-admin', display: 'Super Administrator', assignment: null },
  
  // ===== VICE-CHANCELLOR & DEPUTY VICE-CHANCELLORS (University Executive Leadership) =====
  { role: 'vice_chancellor', email: 'vc@innova-sci.local', password: 'VC@12345', portal: '/portal/management', display: 'Vice-Chancellor', assignment: null },
  { role: 'deputy_vc_academic', email: 'dvc_academic@innova-sci.local', password: 'DVC@12345', portal: '/portal/management', display: 'Deputy VC (Academic)', assignment: null },
  { role: 'deputy_vc_admin', email: 'dvc_admin@innova-sci.local', password: 'DVC@12345', portal: '/portal/management', display: 'Deputy VC (Administration)', assignment: null },
  { role: 'deputy_vc_research', email: 'dvc_research@innova-sci.local', password: 'DVC@12345', portal: '/portal/management', display: 'Deputy VC (Research)', assignment: null },
  
  // ===== UNIVERSITY REGISTRAR =====
  { role: 'registrar', email: 'registrar@innova-sci.local', password: 'Registrar@12345', portal: '/portal/management', display: 'University Registrar', assignment: null },
  
  // ===== UNIVERSITY BURSAR =====
  { role: 'bursar', email: 'bursar@innova-sci.local', password: 'Bursar@12345', portal: '/portal/management', display: 'University Bursar', assignment: null },
  
  // ===== UNIVERSITY LIBRARIAN =====
  { role: 'librarian', email: 'librarian@innova-sci.local', password: 'Librarian@12345', portal: '/portal/management', display: 'University Librarian', assignment: null },
  
  // ===== DIRECTORS =====
  { role: 'director_admission', email: 'director_admission@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director of Admission', assignment: null },
  { role: 'director_examination', email: 'director_examination@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director of Examination', assignment: null },
  { role: 'director_ict', email: 'director_ict@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director of ICT', assignment: null },
  { role: 'director_odfel', email: 'director_odfel@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director of ODFeL', assignment: null },
  { role: 'director_quality_assurance', email: 'director_qa@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director of Quality Assurance', assignment: null },
  { role: 'director_student_welfare', email: 'director_welfare@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director of Student Welfare', assignment: null },
  { role: 'director_research', email: 'director_research@innova-sci.local', password: 'Director@12345', portal: '/portal/management', display: 'Director of Research', assignment: null },
  
  // ===== DEANS - UNDERGRADUATE SCHOOL =====
  { role: 'dean_undergraduate', email: 'dean_undergrad@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean (Undergraduate Studies)', assignment: { type: 'school', id: 'school_ug', name: 'School of Undergraduate Studies' } },
  { role: 'dean_undergraduate', email: 'dean_ai_ug@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean - AI & Computational Intelligence', assignment: { type: 'department', id: 'd1', name: 'Artificial Intelligence & Machine Learning', school: 'Undergraduate' } },
  { role: 'dean_undergraduate', email: 'dean_eng_ug@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean - Engineering', assignment: { type: 'department', id: 'd4', name: 'Electrical/Electronic Engineering', school: 'Undergraduate' } },
  { role: 'dean_undergraduate', email: 'dean_bus_ug@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean - Business', assignment: { type: 'department', id: 'd8', name: 'Business Administration', school: 'Undergraduate' } },
  { role: 'dean_undergraduate', email: 'dean_sci_ug@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean - Applied Sciences', assignment: { type: 'department', id: 'd11', name: 'Science Laboratory Technology', school: 'Undergraduate' } },
  { role: 'dean_undergraduate', email: 'dean_cyber_ug@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean - Cybersecurity', assignment: { type: 'department', id: 'd14', name: 'Cyber Security', school: 'Undergraduate' } },
  
  // ===== DEANS - POSTGRADUATE SCHOOL =====
  { role: 'dean_postgraduate', email: 'dean_postgrad@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean (Postgraduate Studies)', assignment: { type: 'school', id: 'school_pg', name: 'School of Postgraduate Studies' } },
  { role: 'dean_postgraduate', email: 'dean_ai_pg@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean PG - AI & ML', assignment: { type: 'department', id: 'd1', name: 'Artificial Intelligence & Machine Learning', school: 'Postgraduate' } },
  { role: 'dean_postgraduate', email: 'dean_ds_pg@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean PG - Data Science', assignment: { type: 'department', id: 'd2', name: 'Data Science & Analytics', school: 'Postgraduate' } },
  { role: 'dean_postgraduate', email: 'dean_bus_pg@innova-sci.local', password: 'Dean@12345', portal: '/portal/academic', display: 'Dean PG - Business', assignment: { type: 'department', id: 'd8', name: 'Business Administration', school: 'Postgraduate' } },
  
  // ===== HEAD OF DEPARTMENT (UNDERGRADUATE) =====
  { role: 'head_of_department', email: 'hod_aiml@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - AI & ML', assignment: { type: 'department', id: 'd1', name: 'Artificial Intelligence & Machine Learning' } },
  { role: 'head_of_department', email: 'hod_dsa@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Data Science', assignment: { type: 'department', id: 'd2', name: 'Data Science & Analytics' } },
  { role: 'head_of_department', email: 'hod_ris@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Robotics & Intelligent Systems', assignment: { type: 'department', id: 'd3', name: 'Robotics & Intelligent Systems' } },
  { role: 'head_of_department', email: 'hod_eee@innova-sci.local', password: 'HOD@12345', portal: 'portal/academic', display: 'HOD - Electrical/Electronic Engineering', assignment: { type: 'department', id: 'd4', name: 'Electrical/Electronic Engineering' } },
  { role: 'head_of_department', email: 'hod_ce@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Computer Engineering', assignment: { type: 'department', id: 'd5', name: 'Computer Engineering' } },
  { role: 'head_of_department', email: 'hod_tce@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Telecommunications Engineering', assignment: { type: 'department', id: 'd6', name: 'Telecommunications Engineering' } },
  { role: 'head_of_department', email: 'hod_ba@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Business Administration', assignment: { type: 'department', id: 'd8', name: 'Business Administration' } },
  { role: 'head_of_department', email: 'hod_acc@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Accounting', assignment: { type: 'department', id: 'd9', name: 'Accounting' } },
  { role: 'head_of_department', email: 'hod_bf@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Banking & Finance', assignment: { type: 'department', id: 'd10', name: 'Banking & Finance' } },
  { role: 'head_of_department', email: 'hod_slt@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Science Lab Technology', assignment: { type: 'department', id: 'd11', name: 'Science Laboratory Technology' } },
  { role: 'head_of_department', email: 'hod_stat@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Statistics', assignment: { type: 'department', id: 'd12', name: 'Statistics' } },
  { role: 'head_of_department', email: 'hod_bio@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Biotechnology', assignment: { type: 'department', id: 'd13', name: 'Biotechnology' } },
  { role: 'head_of_department', email: 'hod_cs@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Cyber Security', assignment: { type: 'department', id: 'd14', name: 'Cyber Security' } },
  { role: 'head_of_department', email: 'hod_cloud@innova-sci.local', password: 'HOD@12345', portal: '/portal/academic', display: 'HOD - Cloud Computing', assignment: { type: 'department', id: 'd15', name: 'Cloud Computing' } },
  
  // ===== PROGRAMME COORDINATORS - BSc PROGRAMMES =====
  { role: 'programme_coordinator_bsc', email: 'coord_aml_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - AML (BSc)', assignment: { type: 'programme', id: 'p1', name: 'Applied Machine Learning', degree: 'BSc' } },
  { role: 'programme_coordinator_bsc', email: 'coord_dsc_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Data Science (BSc)', assignment: { type: 'programme', id: 'p3', name: 'Data Science', degree: 'BSc' } },
  { role: 'programme_coordinator_bsc', email: 'coord_eee_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - EEE (BSc)', assignment: { type: 'programme', id: 'p7', name: 'Electrical/Electronic Engineering', degree: 'BSc' } },
  { role: 'programme_coordinator_bsc', email: 'coord_ce_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Computer Eng (BSc)', assignment: { type: 'programme', id: 'p9', name: 'Computer Engineering', degree: 'BSc' } },
  { role: 'programme_coordinator_bsc', email: 'coord_ba_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Business Admin (BSc)', assignment: { type: 'programme', id: 'p15', name: 'Business Administration', degree: 'BSc' } },
  { role: 'programme_coordinator_bsc', email: 'coord_acc_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Accounting (BSc)', assignment: { type: 'programme', id: 'p17', name: 'Accounting', degree: 'BSc' } },
  { role: 'programme_coordinator_bsc', email: 'coord_cs_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Cyber Security (BSc)', assignment: { type: 'programme', id: 'p27', name: 'Cyber Security', degree: 'BSc' } },
  { role: 'programme_coordinator_bsc', email: 'coord_cloud_bsc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Cloud Computing (BSc)', assignment: { type: 'programme', id: 'p29', name: 'Cloud Computing', degree: 'BSc' } },
  
  // ===== PROGRAMME COORDINATORS - MSc/PHD PROGRAMMES =====
  { role: 'programme_coordinator_msc', email: 'coord_aml_msc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - AML (MSc)', assignment: { type: 'programme', id: 'p2', name: 'Applied Machine Learning', degree: 'MSc' } },
  { role: 'programme_coordinator_msc', email: 'coord_dsc_msc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Data Science (MSc)', assignment: { type: 'programme', id: 'p4', name: 'Data Science', degree: 'MSc' } },
  { role: 'programme_coordinator_msc', email: 'coord_bus_msc@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Business (MSc)', assignment: { type: 'programme', id: 'p16', name: 'Business Administration', degree: 'MSc' } },
  
  // ===== PROGRAMME COORDINATORS - PGD PROGRAMMES =====
  { role: 'programme_coordinator_pgd', email: 'coord_aml_pgd@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - AML (PGD)', assignment: { type: 'programme', id: 'p1b', name: 'Applied Machine Learning', degree: 'PGD' } },
  { role: 'programme_coordinator_pgd', email: 'coord_cs_pgd@innova-sci.local', password: 'Coord@12345', portal: '/portal/academic', display: 'Coord - Cyber Security (PGD)', assignment: { type: 'programme', id: 'p28', name: 'Cyber Security', degree: 'PGD' } },
  
  // ===== LECTURERS - UNDERGRADUATE =====
  { role: 'lecturer', email: 'lecturer_ai@innova-sci.local', password: 'Lecturer@12345', portal: '/portal/academic', display: 'Lecturer - AI & ML', assignment: null },
  { role: 'lecturer', email: 'lecturer_eng@innova-sci.local', password: 'Lecturer@12345', portal: '/portal/academic', display: 'Lecturer - Engineering', assignment: null },
  { role: 'lecturer', email: 'lecturer_bus@innova-sci.local', password: 'Lecturer@12345', portal: '/portal/academic', display: 'Lecturer - Business', assignment: null },
  
  // ===== E-TUTORS =====
  { role: 'e_tutor', email: 'etutor@innova-sci.local', password: 'ETutor@12345', portal: '/portal/academic', display: 'E-Tutor', assignment: null },
  
  // ===== STUDENTS =====
  { role: 'student', email: 'student@innova-sci.local', password: 'Student@12345', portal: '/portal/student', display: 'Student', assignment: null },
  
  // ===== APPLICANTS =====
  { role: 'applicant', email: 'applicant@innova-sci.local', password: 'Applicant@12345', portal: '/portal/applicant', display: 'Applicant', assignment: null },
]

// Demo credential type
type DemoCredential = typeof DEMO_CREDENTIALS[number];

// Group by portal and role category
const ROLE_GROUPS = [
  // SUPER ADMIN PORTAL
  { name: 'Super Admin Portal', icon: '🔐', roles: DEMO_CREDENTIALS.filter(c => c.role === 'super_admin'), color: 'emerald' },
  
  // MANAGEMENT PORTAL - University Executive & Administrative
  { 
    name: 'Management Portal', 
    icon: '🏛️', 
    roles: DEMO_CREDENTIALS.filter(c => ['vice_chancellor', 'deputy_vc_academic', 'deputy_vc_admin', 'deputy_vc_research', 'registrar', 'bursar', 'librarian', 'director_admission', 'director_examination', 'director_ict', 'director_odfel', 'director_quality_assurance', 'director_student_welfare', 'director_research'].includes(c.role)), 
    color: 'blue' 
  },
  
  // ACADEMIC PORTAL - Teaching & Research
  { 
    name: 'Academic Portal', 
    icon: '📚', 
    roles: DEMO_CREDENTIALS.filter(c => ['dean_undergraduate', 'dean_postgraduate', 'head_of_department', 'programme_coordinator_bsc', 'programme_coordinator_msc', 'programme_coordinator_pgd', 'lecturer', 'e_tutor'].includes(c.role)),
    color: 'purple',
    subGroups: [
      { name: 'Deans (Undergraduate)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'dean_undergraduate') },
      { name: 'Deans (Postgraduate)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'dean_postgraduate') },
      { name: 'HODs (Department Heads)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'head_of_department') },
      { name: 'Programme Coordinators (BSc)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'programme_coordinator_bsc') },
      { name: 'Programme Coordinators (MSc/PhD)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'programme_coordinator_msc') },
      { name: 'Programme Coordinators (PGD)', roles: DEMO_CREDENTIALS.filter(c => c.role === 'programme_coordinator_pgd') },
      { name: 'Lecturers', roles: DEMO_CREDENTIALS.filter(c => c.role === 'lecturer') },
    ]
  },
  
  // STUDENT PORTAL
  { name: 'Student Portal', icon: '🎓', roles: DEMO_CREDENTIALS.filter(c => c.role === 'student'), color: 'amber' },
  
  // APPLICANT PORTAL
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
                                        title={cred.assignment ? `${cred.assignment.name}${cred.assignment.degree ? ` (${cred.assignment.degree})` : ''}` : `Dashboard: ${cred.portal}`}
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
