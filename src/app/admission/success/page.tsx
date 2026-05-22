"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AdmissionSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Application Submitted Successfully!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your application has been received and is now under review. We will send you an email with your application status.
        </p>

        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="font-semibold mb-6 text-lg">What happens next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Application Review</h3>
                  <p className="text-sm text-muted-foreground">Our admission team will review your application within 48 hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <span className="font-bold text-purple-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Email Notification</h3>
                  <p className="text-sm text-muted-foreground">You will receive an email with your admission status and next steps.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="font-bold text-green-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Acceptance & Registration</h3>
                  <p className="text-sm text-muted-foreground">Once accepted, you can complete your registration and begin learning.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <ArrowRight className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90" asChild>
            <Link href="/auth/login">
              Sign In to Check Status
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Need help? Contact us at <span className="text-primary">support@innovasci.edu</span>
        </p>
      </motion.div>
    </div>
  )
}