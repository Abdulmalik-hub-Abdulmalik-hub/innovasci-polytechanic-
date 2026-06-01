'use client';

import React, { useState } from 'react';
import { 
  DollarSign,
  Calendar,
  Clock,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Minus,
  Save,
  Download,
  Upload,
  Building2,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Database,
  Eye,
  Edit
} from 'lucide-react';

import {
  DEFAULT_FEE_ITEMS,
  DEFAULT_PAYMENT_SCHEDULE,
  FeeItem,
  DEFAULT_FEE_STRUCTURE,
  FeeConfiguration
} from '@/lib/registration-eligibility';

export default function SuperAdminFeesConfiguration() {
  const [activeTab, setActiveTab] = useState<'fees' | 'schedule' | 'reports'>('fees');
  const [feeItems, setFeeItems] = useState<FeeItem[]>(DEFAULT_FEE_ITEMS);
  const [paymentSchedule, setPaymentSchedule] = useState(DEFAULT_PAYMENT_SCHEDULE);
  const [editingFee, setEditingFee] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState<string>('');

  const toggleFeeEnabled = (feeId: string) => {
    setFeeItems(prev => prev.map(fee => 
      fee.id === feeId ? { ...fee, enabled: !fee.enabled } : fee
    ));
  };

  const updateFeeAmount = (feeId: string, newAmount: number) => {
    setFeeItems(prev => prev.map(fee => 
      fee.id === feeId ? { ...fee, amount: newAmount } : fee
    ));
  };

  const totalFees = feeItems.filter(f => f.enabled).reduce((sum, f) => sum + f.amount, 0);
  const totalDisabled = feeItems.filter(f => !f.enabled).reduce((sum, f) => sum + f.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Fees & Payments Configuration</h1>
          <p className="text-gray-500">Configure school fees, payment schedules and view reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Fee Items</p>
              <p className="text-2xl font-bold">{feeItems.filter(f => f.enabled).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Active Fees</p>
              <p className="text-2xl font-bold">{formatCurrency(totalFees)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Payment Deadline</p>
              <p className="text-lg font-bold">{paymentSchedule.paymentDeadline}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Installment Plan</p>
              <p className="text-2xl font-bold">{paymentSchedule.hasInstallmentPlan ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'fees', label: 'Fee Structure', icon: DollarSign },
              { id: 'schedule', label: 'Payment Schedule', icon: Calendar },
              { id: 'reports', label: 'Payment Reports', icon: FileText },
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
          {/* Fee Structure Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Fee Structure Configuration</h3>
                  <p className="text-gray-500">Configure fees by session, faculty, department, programme, level and entry category</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span>Session: {DEFAULT_PAYMENT_SCHEDULE.session}</span>
                </div>
              </div>

              {/* Session/Faculty/Programme Filter */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Session</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option>{DEFAULT_PAYMENT_SCHEDULE.session}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option>School of AI & Computational Intelligence</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Programme</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option>Applied Machine Learning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white">
                    <option>ND 1, ND 2, HND 1, HND 2</option>
                  </select>
                </div>
              </div>

              {/* Total Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Total Active Fees</p>
                  <p className="text-2xl font-bold text-green-700">{formatCurrency(totalFees)}</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Total Disabled Fees</p>
                  <p className="text-2xl font-bold text-gray-500">{formatCurrency(totalDisabled)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Grand Total</p>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(totalFees)}</p>
                </div>
              </div>

              {/* Fee Items Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Fee Item</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {feeItems.map(fee => (
                      <tr key={fee.id} className={fee.enabled ? '' : 'bg-gray-50 text-gray-400'}>
                        <td className="px-6 py-4 font-medium">{fee.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            fee.category === 'acceptance' ? 'bg-purple-100 text-purple-700' :
                            fee.category === 'tuition' ? 'bg-blue-100 text-blue-700' :
                            fee.category === 'levy' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {fee.category.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{fee.description}</td>
                        <td className="px-6 py-4 text-right font-semibold">
                          {editingFee === fee.id ? (
                            <div className="flex items-center justify-end space-x-2">
                              <input
                                type="number"
                                value={tempAmount}
                                onChange={(e) => setTempAmount(e.target.value)}
                                className="w-32 px-2 py-1 border border-gray-300 rounded"
                              />
                              <button 
                                onClick={() => { updateFeeAmount(fee.id, Number(tempAmount)); setEditingFee(null); }}
                                className="text-green-600"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setEditingFee(null)}
                                className="text-red-600"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            formatCurrency(fee.amount)
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleFeeEnabled(fee.id)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${
                              fee.enabled 
                                ? 'bg-green-100 text-green-700 border-green-200' 
                                : 'bg-gray-100 text-gray-500 border-gray-200'
                            }`}
                          >
                            {fee.enabled ? 'Enabled' : 'Disabled'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => { setEditingFee(fee.id); setTempAmount(String(fee.amount)); }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fee Categories Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-purple-100 rounded"></div>
                  <span>Acceptance Fee</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-blue-100 rounded"></div>
                  <span>Tuition Fee</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-amber-100 rounded"></div>
                  <span>Levies & Fees</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span>Other Charges</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Payment Schedule Configuration</h3>
                <p className="text-gray-500">Set payment deadlines, penalty periods and installment plans</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Important Dates */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Important Dates
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Start Date</label>
                      <input
                        type="date"
                        defaultValue={paymentSchedule.paymentStartDate}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Deadline</label>
                      <input
                        type="date"
                        defaultValue={paymentSchedule.paymentDeadline}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Late Registration End Date</label>
                      <input
                        type="date"
                        defaultValue={paymentSchedule.lateRegistrationEndDate}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Penalty Start Date</label>
                      <input
                        type="date"
                        defaultValue={paymentSchedule.penaltyStartDate}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Installment Plan */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Installment Plan
                    </h4>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={paymentSchedule.hasInstallmentPlan}
                        className="w-5 h-5 rounded"
                      />
                      <span>Enable</span>
                    </label>
                  </div>
                  
                  {paymentSchedule.hasInstallmentPlan && paymentSchedule.installmentPlanDetails && (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-500">1st Installment Amount</p>
                        <p className="text-xl font-bold">{formatCurrency(150000)}</p>
                        <p className="text-sm text-gray-500">Due: {paymentSchedule.installmentPlanDetails.firstInstallmentDeadline}</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <p className="text-sm text-gray-500">2nd Installment Amount</p>
                        <p className="text-xl font-bold">{formatCurrency(100000)}</p>
                        <p className="text-sm text-gray-500">Due: {paymentSchedule.installmentPlanDetails.secondInstallmentDeadline}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-500">Final Payment</p>
                        <p className="text-xl font-bold text-orange-700">Remaining Balance</p>
                        <p className="text-sm text-gray-500">Due: {paymentSchedule.installmentPlanDetails.finalDeadline}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Payment Reports</h3>
                <p className="text-gray-500">View and export payment status reports</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                  <h4 className="font-semibold">Paid Students Report</h4>
                  <p className="text-sm text-gray-500">Students with fully paid fees</p>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                  <h4 className="font-semibold">Partially Paid Report</h4>
                  <p className="text-sm text-gray-500">Students with partial payments</p>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                  <h4 className="font-semibold">Unpaid Students Report</h4>
                  <p className="text-sm text-gray-500">Students with unpaid fees</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                  <h4 className="font-semibold">Faculty Payment Report</h4>
                  <p className="text-sm text-gray-500">Payment breakdown by faculty</p>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <Download className="w-5 h-5 text-gray-400" />
                  </div>
                  <h4 className="font-semibold">Programme Payment Report</h4>
                  <p className="text-sm text-gray-500">Payment breakdown by programme</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
