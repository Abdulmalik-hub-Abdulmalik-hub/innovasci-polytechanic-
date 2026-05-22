"use client"

import { motion } from "framer-motion"
import { CreditCard, AlertCircle, CheckCircle, Clock, Download, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const paymentHistory = [
  { id: "PAY001", amount: 125000, type: "First Semester", date: "2024-01-15", status: "completed" },
  { id: "PAY002", amount: 75000, type: "Registration Fee", date: "2024-01-10", status: "completed" },
]

const upcomingPayments = [
  { id: "PAY003", amount: 125000, type: "Second Semester", dueDate: "2024-03-15", status: "pending" },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage your tuition and fees</p>
        </div>
      </div>

      {/* Payment Status Banner */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Payment Progress: 65%</h3>
                <p className="text-sm text-muted-foreground">Balance: ₦125,000 due by March 15, 2024</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90">
              Complete Payment
            </Button>
          </div>
          <Progress value={65} className="mt-4 h-2" />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your completed and pending payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">₦{payment.amount.toLocaleString()}</p>
                      <Badge variant="success">Paid</Badge>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment, index) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-amber-600">Due: {payment.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-amber-600">₦{payment.amount.toLocaleString()}</p>
                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500">Pay Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold">P</div>
                  <div>
                    <p className="font-medium">Paystack</p>
                    <p className="text-xs text-muted-foreground">Card, Bank Transfer, USSD</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Contact the finance department for payment assistance.</p>
              <Button variant="outline" className="w-full">
                Contact Finance
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}