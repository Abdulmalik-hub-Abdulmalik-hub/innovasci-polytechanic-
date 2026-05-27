"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  GraduationCap, 
  Users, 
  Award, 
  BookOpen, 
  Globe, 
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  ChevronRight,
  Play,
  Zap,
  Shield,
  TrendingUp,
  Code,
  Brain,
  Database
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { curriculumData, curriculumStats } from "@/lib/curriculum-data"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stats = [
  { label: "Active Students", value: "5,000+", icon: Users },
  { label: "Expert Courses", value: "120+", icon: BookOpen },
  { label: "Certified Graduates", value: "10,000+", icon: Award },
  { label: "Success Rate", value: "95%", icon: TrendingUp },
]

const programs = [
  {
    title: "National Diploma (ND)",
    duration: "2 Years",
    description: "Foundation programs in Technology and Engineering",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    features: ["Level 1 & Level 2", "Semester System", "Industry Skills", "Internship"],
  },
  {
    title: "Higher National Diploma (HND)",
    duration: "2 Years",
    description: "Advanced specialization for career advancement",
    icon: Award,
    color: "from-purple-500 to-pink-500",
    features: ["Specialized Tracks", "Project-Based", "Leadership Skills", "Career Support"],
  },
]

const features = [
  {
    title: "AI-Powered Learning",
    description: "Smart recommendations and personalized study paths",
    icon: Brain,
  },
  {
    title: "Industry Experts",
    description: "Learn from professionals with real-world experience",
    icon: Code,
  },
  {
    title: "Flexible Schedule",
    description: "Study at your own pace with 24/7 access",
    icon: Clock,
  },
  {
    title: "Verified Certificates",
    description: "Industry-recognized credentials",
    icon: Shield,
  },
  {
    title: "Global Community",
    description: "Connect with students worldwide",
    icon: Globe,
  },
  {
    title: "Career Growth",
    description: "Dedicated support for your professional journey",
    icon: TrendingUp,
  },
]

const faculties = curriculumData.map(f => ({
  name: f.name,
  code: f.code,
  courses: f.departments.reduce((acc, d) => acc + d.programs.length, 0),
}))

const testimonials = [
  {
    name: "Aisha Mohammed",
    role: "ND Applied Machine Learning Graduate",
    content: "InnovaSci transformed my career. The AI-focused curriculum prepared me for real industry challenges.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "David Okonkwo",
    role: "HND Cloud Architecture Student",
    content: "The flexibility of online learning combined with rigorous academics makes this program exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Lecturer, Department of AI & Machine Learning",
    content: "Teaching here is rewarding. Students are engaged and the technology infrastructure is outstanding.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
]

const steps = [
  { num: "01", title: "Apply Online", desc: "Fill out our simple admission form" },
  { num: "02", title: "Verification", desc: "We review your qualifications" },
  { num: "03", title: "Acceptance", desc: "Receive your admission letter" },
  { num: "04", title: "Begin Learning", desc: "Start your educational journey" },
]

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <span className="text-xl font-bold text-white">IA</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">InnovaSci</span>
                <span className="block text-xs text-muted-foreground">AI Labs Polytechnic</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                About
              </Link>
              <Link href="/programs" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Programs
              </Link>
              <Link href="/admission" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Admission
              </Link>
              <Link href="/news" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                News
              </Link>
              <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" asChild>
                <Link href="/admission">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                <Zap className="h-4 w-4" />
                <span>AI-Powered Education Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">Transform Your Future</span>
                <br />
                with AI-Driven Education
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join InnovaSci AI Labs Polytechnic and gain industry-recognized skills. 
                Our cutting-edge curriculum prepares you for the careers of tomorrow.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" asChild>
                  <Link href="/admission">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/programs">
                    Explore Programs
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {["👨‍💻", "👩‍🎨", "👨‍🔬", "👩‍💼"].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-white flex items-center justify-center text-lg">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold">5,000+ Students</p>
                  <p className="text-sm text-muted-foreground">Learning Together</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="font-semibold">AI & ML</h3>
                    <p className="text-sm text-muted-foreground">Deep Learning</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Database className="h-10 w-10 text-purple-600 mb-4" />
                    <h3 className="font-semibold">Data Science</h3>
                    <p className="text-sm text-muted-foreground">Big Data</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Code className="h-10 w-10 text-cyan-600 mb-4" />
                    <h3 className="font-semibold">Web Dev</h3>
                    <p className="text-sm text-muted-foreground">Full Stack</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Shield className="h-10 w-10 text-green-600 mb-4" />
                    <h3 className="font-semibold">Cybersecurity</h3>
                    <p className="text-sm text-muted-foreground">Network Sec</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">95% Success Rate</p>
                    <p className="text-sm text-muted-foreground">Graduate Employment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-700">Academic Programs</Badge>
            <h2 className="text-4xl font-bold mb-4">Choose Your Path to Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive programs are designed to equip you with practical skills and industry-recognized certifications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden card-hover">
                  <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${program.color} flex items-center justify-center`}>
                        <program.icon className="h-7 w-7 text-white" />
                      </div>
                      <Badge variant="secondary">{program.duration}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                    <p className="text-muted-foreground mb-6">{program.description}</p>
                    <div className="space-y-3">
                      {program.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-purple-100 text-purple-700">Why InnovaSci</Badge>
              <h2 className="text-4xl font-bold mb-6">Education That Prepares You for Tomorrow</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We combine cutting-edge technology with proven educational methods to deliver an exceptional learning experience.
              </p>
              <div className="space-y-6">
                {features.slice(0, 3).map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm cursor-pointer transition-all hover:shadow-md"
                    onMouseEnter={() => setActiveFeature(i)}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeFeature === i ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-100'
                    }`}>
                      <feature.icon className={`h-6 w-6 ${activeFeature === i ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-1">
                <div className="bg-white rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="h-24 bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl" />
                      <div className="h-24 bg-gradient-to-b from-purple-100 to-purple-200 rounded-xl" />
                      <div className="h-24 bg-gradient-to-b from-pink-100 to-pink-200 rounded-xl" />
                    </div>
                    <div className="flex justify-center mt-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* faculties Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-700">Our Faculties</Badge>
            <h2 className="text-4xl font-bold mb-4">Academic Structure</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our faculties and find the program that matches your career goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {faculties.map((faculty, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center p-6 card-hover">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{faculty.code}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{faculty.name}</h3>
                  <p className="text-sm text-muted-foreground">{faculty.courses} Programs</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-white/10 text-white border-0">Admission</Badge>
            <h2 className="text-4xl font-bold mb-4">Start Your Journey Today</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our streamlined admission process gets you started in just four simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/10 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2">
                    <ChevronRight className="h-6 w-6 text-white/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link href="/admission">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-700">Testimonials</Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Community Says</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of students who have launched their careers with InnovaSci AI Labs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100" asChild>
                <Link href="/admission">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-xl font-bold text-white">IA</span>
                </div>
                <div>
                  <span className="font-bold">InnovaSci</span>
                  <span className="block text-xs text-slate-400">AI Labs Polytechnic</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Transforming education through AI-powered learning experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/programs/nd" className="hover:text-white">National Diploma</Link></li>
                <li><Link href="/programs/hnd" className="hover:text-white">Higher National Diploma</Link></li>
                <li><Link href="/programs/short" className="hover:text-white">Short Courses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/admission" className="hover:text-white">Admissions</Link></li>
                <li><Link href="/news" className="hover:text-white">News</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>info@innovasci.edu</li>
                <li>+234 800 123 4567</li>
                <li>Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 InnovaSci AI Labs Polytechnic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}