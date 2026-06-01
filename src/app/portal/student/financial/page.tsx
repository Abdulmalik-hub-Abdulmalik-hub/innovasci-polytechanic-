'use client';

import React, { useState, useMemo } from 'react';
import { 
  CreditCard, 
  Receipt, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  FileText,
  Wallet,
  Calendar,
  TrendingUp,
  Shield,
  AlertCircle,
  ArrowRight,
  Download
} from 'lucide-react';

import { 
  DEMO_STUDENT_PROFILE,
  StudentProfile 
} from '@/lib/learning-resources';

import { 
  getStudentEligibility,
  getStudentPaymentStatus,
  getStudentRegistrationStatus,
  generateFeeBreakdown,
  EligibilityStatus,
  PaymentStatus,
  EligibilityRecord,
  DEFAULT_FEE_ITEMS,
  DEFAULT_PAYMENT_SCHEDULE
} from '@/lib/registration-eligibility';

export default function StudentFinancialDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'history' | 'payment'>('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const student: StudentProfile = DEMO_STUDENT_PROFILE;
  
  const eligibility = useMemo(() => getStudentEligibility(student), [student]);
  const paymentStatus = useMemo(() => getStudentPaymentStatus(student), [student]);
  const registrationStatus = useMemo(() => getStudentRegistrationStatus(student), [student]);
  const feeBreakdown = useMemo(() => generateFeeBreakdown(student), [student]);

  const getEligibilityColor = (status: EligibilityStatus) => {
    switch (status) {
      case 'eligible': return 'bg-green-100 text-green-700 border-green-200';
      case 'partially_eligible': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'not_eligible': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'partially_paid': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'unpaid': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getPaymentStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-5 h-5" />;
      case 'partially_paid': return <Clock className="w-5 h-5" />;
      case 'unpaid': return <AlertTriangle className="w-5 h-5" />;
      case 'overdue': return <AlertCircle className="w-5 h-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Eligibility Banner */}
      <div className={`rounded-xl p-6 border ${getEligibilityColor(eligibility.eligibilityStatus)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              eligibility.eligibilityStatus === 'eligible' ? 'bg-green-100' :
              eligibility.eligibilityStatus === 'partially_eligible' ? 'bg-amber-100' : 'bg-red-100'
            }`}>
              {eligibility.eligibilityStatus === 'eligible' ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : eligibility.eligibilityStatus === 'partially_eligible' ? (
                <Clock className="w-7 h-7 text-amber-600" />
              ) : (
                <AlertCircle className="w-7 h-7 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {eligibility.eligibilityStatus === 'eligible' 
                  ? 'Fully Eligible for Academic Services' 
                  : eligibility.eligibilityStatus === 'partially_eligible'
                  ? 'Partially Eligible - Some Services Restricted'
                  : 'Not Eligible - Academic Services Restricted'}
              </h3>
              <p className="text-sm opacity-80">
                {eligibility.restrictions.length > 0 
                  ? eligibility.restrictions.join(' • ')
                  : 'All systems active'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowPaymentModal(true)}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
              eligibility.eligibilityStatus === 'eligible'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>
              {eligibility.eligibilityStatus === 'eligible' ? 'View Payment' : 'Make Payment'}
            </span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Fees</p>
              <p className="text-2xl font-bold">{formatCurrency(paymentStatus.totalFees)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(paymentStatus.amountPaid)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Outstanding Balance</p>
              <p className="text-2xl font-bold text-amber-600">{formatCurrency(paymentStatus.balance)}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(paymentStatus.paymentStatus)}`}>
                  {paymentStatus.paymentStatus.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              paymentStatus.paymentStatus === 'paid' ? 'bg-green-100' :
              paymentStatus.paymentStatus === 'partially_paid' ? 'bg-amber-100' :
              paymentStatus.paymentStatus === 'overdue' ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              {getPaymentStatusIcon(paymentStatus.paymentStatus)}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'fees', label: 'Fee Breakdown', icon: FileText },
              { id: 'history', label: 'Payment History', icon: Receipt },
              { id: 'payment', label: 'Make Payment', icon: CreditCard },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Academic Access Status */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Academic Access Status
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Learning Resources', access: eligibility.canAccessLearningResources },
                      { label: 'CBT Examinations', access: eligibility.canAccessCBT },
                      { label: 'Course Registration', access: eligibility.canRegisterCourses },
                      { label: 'View Results', access: eligibility.canViewResults },
                      { label: 'Assignments', access: eligibility.canAccessAssignments },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-gray-600">{item.label}</span>
                        {item.access ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" /> Eligible
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" /> Restricted
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Registration Status */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Semester Registration
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Registration Status</span>
                      {registrationStatus.isSemesterRegistered ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" /> Registered
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-1" /> Not Registered
                        </span>
                      )}
                    </div>
                    {registrationStatus.isSemesterRegistered && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Registration Date</span>
                          <span className="font-medium">
                            {registrationStatus.registrationDate 
                              ? formatDate(registrationStatus.registrationDate) 
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Registered Courses</span>
                          <span className="font-medium">{registrationStatus.registeredCourses.length}</span>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">Course Codes</p>
                          <div className="flex flex-wrap gap-2">
                            {registrationStatus.registeredCourses.map(course => (
                              <span key={course} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Payment Schedule - Session {DEFAULT_PAYMENT_SCHEDULE.session}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Payment Start</p>
                    <p className="font-semibold">{formatDate(DEFAULT_PAYMENT_SCHEDULE.paymentStartDate)}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-semibold text-amber-700">{formatDate(DEFAULT_PAYMENT_SCHEDULE.paymentDeadline)}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Late Registration</p>
                    <p className="font-semibold text-orange-700">{formatDate(DEFAULT_PAYMENT_SCHEDULE.lateRegistrationEndDate)}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Penalty Start</p>
                    <p className="font-semibold text-red-700">{formatDate(DEFAULT_PAYMENT_SCHEDULE.penaltyStartDate)}</p>
                  </div>
                </div>
                {DEFAULT_PAYMENT_SCHEDULE.hasInstallmentPlan && (
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <p className="font-medium text-blue-900 mb-2">Installment Plan Available</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">1st Installment ({formatCurrency(150000)})</p>
                        <p className="font-medium">Due: {formatDate('2024-09-30')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">2nd Installment ({formatCurrency(100000)})</p>
                        <p className="font-medium">Due: {formatDate('2024-10-31')}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Final Payment</p>
                        <p className="font-medium">Due: {formatDate('2024-11-15')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fee Breakdown Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Fee Breakdown</h3>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <Download className="w-4 h-4" />
                  <span>Download Invoice</span>
                </button>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold">Total Fees</span>
                  <span className="font-bold text-xl">{formatCurrency(paymentStatus.totalFees)}</span>
                </div>
              </div>

              {feeBreakdown.map(({ item, paid, balance }) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(item.amount)}</p>
                    {paid > 0 && (
                      <p className="text-sm text-green-600">Paid: {formatCurrency(paid)}</p>
                    )}
                    {balance > 0 && item.category !== 'acceptance' && (
                      <p className="text-sm text-amber-600">Balance: {formatCurrency(balance)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payment History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-6">Payment History</h3>
              
              {paymentStatus.paymentHistory.length > 0 ? (
                <div className="space-y-4">
                  {paymentStatus.paymentHistory.map(payment => (
                    <div key={payment.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-gray-500">
                              {payment.method === 'paystack' ? 'Paystack' : 
                               payment.method === 'bank_transfer' ? 'Bank Transfer' : 'Manual'} • {payment.reference}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                          <p className="text-sm text-gray-500">{formatDate(payment.date)}</p>
                          {payment.receiptNumber && (
                            <p className="text-sm text-blue-600">Receipt: {payment.receiptNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No payment history available</p>
                  <p className="text-sm text-gray-400">Make your first payment to see records</p>
                </div>
              )}
            </div>
          )}

          {/* Make Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Make Payment</h3>
                <p className="text-gray-500">Outstanding Balance: {formatCurrency(paymentStatus.balance)}</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-4">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Payment Options</h4>
                  <div className="space-y-3">
                    <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Paystack</p>
                          <p className="text-sm text-gray-500">Pay with card, bank transfer, or USSD</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Bank Transfer</p>
                          <p className="text-sm text-gray-500">Transfer to school account</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
