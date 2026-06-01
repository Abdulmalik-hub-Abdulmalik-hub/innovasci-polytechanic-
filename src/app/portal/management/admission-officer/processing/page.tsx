'use client';

import React, { useState, useMemo } from 'react';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Search, 
  Filter,
  Download,
  Upload,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Loader2,
  AlertTriangle,
  GraduationCap,
  Hash,
  Copy,
  Check,
  UserPlus,
  FileCheck,
  Send,
  Eye,
  Trash2,
  MoreVertical,
  Calendar,
  Building2,
  BookOpen,
  BadgeCheck
} from 'lucide-react';

// Import admission processing functions
import {
  generateProgrammeCode,
  getAllProgrammeCodes,
  generateAdmissionNumber,
  createAdmissionOffer,
  createStudentRecord,
  processBulkAdmission,
  logAdmissionAction,
  getStatusInfo,
  getNextStatuses,
  ApplicationStatus,
  EntryCategory,
  AdmissionOffer,
  StudentRecord,
  DEMO_APPLICATIONS
} from '@/lib/admission-processing';

type TabType = 'applications' | 'admission' | 'bulk' | 'students' | 'reports' | 'audit';

export default function AdmissionProcessingPage() {
  const [activeTab, setActiveTab] = useState<TabType>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  // Demo applications state
  const [applications, setApplications] = useState(DEMO_APPLICATIONS);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.programmeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || app.entryCategory === filterCategory;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [applications, searchQuery, filterStatus, filterCategory]);

  // Handle bulk admission
  const handleBulkAdmission = async () => {
    if (selectedApplications.size === 0) {
      setProcessingResult({ success: false, message: 'No applications selected' });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedApps = applications.filter(app => selectedApplications.has(app.id));
    
    const result = processBulkAdmission(selectedApps, 'admission_officer_001');
    
    // Log actions
    result.offers.forEach(offer => {
      logAdmissionAction('admission_number_generated', 'admission_officer_001', 'Admission Officer', offer.id, 'offer', `Generated: ${offer.admissionNumber}`);
      logAdmissionAction('offer_issued', 'admission_officer_001', 'Admission Officer', offer.id, 'offer');
      
      // Create student record
      const student = createStudentRecord(offer);
      logAdmissionAction('student_created', 'admission_officer_001', 'Admission Officer', student.id, 'student', `Student ID: ${student.studentId}`);
    });

    // Update application statuses
    setApplications(prev => prev.map(app => {
      if (selectedApplications.has(app.id)) {
        return { ...app, status: 'admission_offered' as ApplicationStatus };
      }
      return app;
    }));

    setProcessingResult({
      success: true,
      message: `Successfully processed ${result.successful} admissions. ${result.failed} failed.`,
      data: result
    });

    setSelectedApplications(new Set());
    setIsProcessing(false);
  };

  // Handle single admission
  const handleSingleAdmission = async (applicationId: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const app = applications.find(a => a.id === applicationId);
    if (!app) {
      setProcessingResult({ success: false, message: 'Application not found' });
      setIsProcessing(false);
      return;
    }

    const offer = createAdmissionOffer(app, 'admission_officer_001');
    const student = createStudentRecord(offer);

    logAdmissionAction('admission_number_generated', 'admission_officer_001', 'Admission Officer', offer.id, 'offer', `Generated: ${offer.admissionNumber}`);
    logAdmissionAction('offer_issued', 'admission_officer_001', 'Admission Officer', offer.id, 'offer');
    logAdmissionAction('student_created', 'admission_officer_001', 'Admission Officer', student.id, 'student', `Student ID: ${student.studentId}`);

    setApplications(prev => prev.map(a => 
      a.id === applicationId ? { ...a, status: 'admission_offered' as ApplicationStatus } : a
    ));

    setProcessingResult({
      success: true,
      message: `Admission number ${offer.admissionNumber} generated for ${offer.studentName}`,
      data: { offer, student }
    });

    setIsProcessing(false);
  };

  // Toggle application selection
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedApplications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedApplications(newSelected);
  };

  // Toggle all selection
  const toggleAllSelection = () => {
    if (selectedApplications.size === filteredApplications.length) {
      setSelectedApplications(new Set());
    } else {
      setSelectedApplications(new Set(filteredApplications.map(a => a.id)));
    }
  };

  // Get status badge
  const getStatusBadge = (status: ApplicationStatus) => {
    const info = getStatusInfo(status);
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${info.bgColor} ${info.color}`}>
        {info.label}
      </span>
    );
  };

  // Stats
  const stats = {
    total: applications.length,
    pending: applications.filter(a => ['submitted', 'under_review'].includes(a.status)).length,
    approved: applications.filter(a => a.status === 'approved').length,
    offered: applications.filter(a => ['admission_offered', 'admission_accepted', 'enrolled'].includes(a.status)).length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Admission Processing</h1>
                <p className="text-xs text-gray-500">InnovaSci Open Polytechnic</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Admission Officer
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Admission Processing Engine</h2>
          <p className="text-gray-500">Manage applications, generate admission numbers, and create student records</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Admitted</p>
                <p className="text-3xl font-bold text-purple-600">{stats.offered}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'applications', label: 'Applications', icon: FileText },
                { id: 'admission', label: 'Generate Admission', icon: Hash },
                { id: 'bulk', label: 'Bulk Processing', icon: Users },
                { id: 'students', label: 'Student Records', icon: UserPlus },
                { id: 'reports', label: 'Reports', icon: Download },
                { id: 'audit', label: 'Audit Logs', icon: FileCheck },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All Status</option>
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="admission_offered">Admission Offered</option>
                    </select>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="ND">ND</option>
                      <option value="HND">HND</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-2" /> Export
                    </button>
                  </div>
                </div>

                {/* Bulk Actions */}
                {selectedApplications.size > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-orange-900">
                        {selectedApplications.size} application(s) selected
                      </span>
                      <button
                        onClick={handleBulkAdmission}
                        disabled={isProcessing}
                        className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <GraduationCap className="w-4 h-4 mr-2" />
                        )}
                        Generate Admission Numbers
                      </button>
                      <button
                        onClick={() => setSelectedApplications(new Set())}
                        className="text-sm text-orange-700 hover:text-orange-900"
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                )}

                {/* Applications Table */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedApplications.size === filteredApplications.length && filteredApplications.length > 0}
                            onChange={toggleAllSelection}
                            className="rounded border-gray-300"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Programme</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredApplications.map(app => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedApplications.has(app.id)}
                              onChange={() => toggleSelection(app.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                                {app.fullName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-4">
                                <p className="font-medium text-gray-900">{app.fullName}</p>
                                <p className="text-sm text-gray-500">{app.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{app.programmeName}</p>
                            <p className="text-sm text-gray-500">{app.departmentName}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              app.entryCategory === 'ND' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {app.entryCategory}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(app.status)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              {app.status === 'approved' && (
                                <button
                                  onClick={() => handleSingleAdmission(app.id)}
                                  disabled={isProcessing}
                                  className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                                >
                                  <GraduationCap className="w-4 h-4 mr-1" />
                                  Admit
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admission Number Generation Tab */}
            {activeTab === 'admission' && (
              <div className="space-y-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Admission Number Format</h3>
                  <div className="bg-white rounded-lg p-4 font-mono text-lg">
                    <span className="text-blue-600">INS</span>/<span className="text-green-600">ND/HND</span>/<span className="text-purple-600">XXX</span>/<span className="text-orange-600">2026</span>/<span className="text-red-600">0001</span>
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-blue-600 font-medium">INS</p>
                      <p className="text-gray-500">Institution Code</p>
                    </div>
                    <div className="text-center">
                      <p className="text-green-600 font-medium">ND/HND</p>
                      <p className="text-gray-500">Entry Category</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-600 font-medium">XXX</p>
                      <p className="text-gray-500">Programme Code</p>
                    </div>
                    <div className="text-center">
                      <p className="text-orange-600 font-medium">2026</p>
                      <p className="text-gray-500">Admission Year</p>
                    </div>
                    <div className="text-center">
                      <p className="text-red-600 font-medium">0001</p>
                      <p className="text-gray-500">Sequence No.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Admission Numbers</h3>
                    <div className="space-y-3">
                      {[
                        { category: 'ND', programme: 'Computer Science', code: 'CSC', year: 2026, seq: 1 },
                        { category: 'HND', programme: 'Business Administration', code: 'BAM', year: 2026, seq: 2 },
                        { category: 'ND', programme: 'Electrical Engineering', code: 'ELE', year: 2026, seq: 3 },
                        { category: 'HND', programme: 'Cyber Security', code: 'CYB', year: 2026, seq: 4 },
                      ].map((example, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              {generateAdmissionNumber(example.category as EntryCategory, example.code, example.year, example.seq)}
                            </p>
                            <p className="text-sm text-gray-500">{example.category} - {example.programme}</p>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Programme Code Mapping</h3>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {Object.entries(getAllProgrammeCodes()).slice(0, 15).map(([name, code]) => (
                        <div key={name} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <span className="text-sm text-gray-700">{name}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-mono">{code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Processing Tab */}
            {activeTab === 'bulk' && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <Users className="w-6 h-6 text-green-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-green-900">Bulk Admission Processing</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Select multiple approved applications and process them in batch. Admission numbers will be generated automatically.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Selection Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Selected Applications</span>
                        <span className="font-bold text-2xl text-gray-900">{selectedApplications.size}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">ND Applications</span>
                        <span className="font-medium text-blue-600">
                          {applications.filter(a => selectedApplications.has(a.id) && a.entryCategory === 'ND').length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">HND Applications</span>
                        <span className="font-medium text-purple-600">
                          {applications.filter(a => selectedApplications.has(a.id) && a.entryCategory === 'HND').length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Steps</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                        <div className="ml-4">
                          <p className="font-medium">Select Applications</p>
                          <p className="text-sm text-gray-500">Choose approved applications</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">2</div>
                        <div className="ml-4">
                          <p className="font-medium">Validate Eligibility</p>
                          <p className="text-sm text-gray-500">Check programme and category</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">3</div>
                        <div className="ml-4">
                          <p className="font-medium">Generate Admission Numbers</p>
                          <p className="text-sm text-gray-500">Auto-generate unique numbers</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">4</div>
                        <div className="ml-4">
                          <p className="font-medium">Create Student Records</p>
                          <p className="text-sm text-gray-500">Move to student management</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBulkAdmission}
                  disabled={selectedApplications.size === 0 || isProcessing}
                  className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <GraduationCap className="w-5 h-5 mr-2" />
                  )}
                  Process {selectedApplications.size} Application(s)
                </button>
              </div>
            )}

            {/* Student Records Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-start">
                    <BadgeCheck className="w-6 h-6 text-purple-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-purple-900">Student Record Creation</h3>
                      <p className="text-sm text-purple-700 mt-1">
                        When admission is offered, a student record is automatically created with all academic information linked to the curriculum structure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Auto-Linked Data</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Faculty</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Department</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Hash className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Programme</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Level & Semester</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Generated Fields</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Hash className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Admission Number</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Student ID</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Admission Year</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Academic Status</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Curriculum Link</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                        <span>ND/HND Structure</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Registered Courses</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FileText className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Semester Schedule</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Admission Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Applications</span>
                        <span className="font-bold">{stats.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">ND Applications</span>
                        <span className="font-bold">{applications.filter(a => a.entryCategory === 'ND').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">HND Applications</span>
                        <span className="font-bold">{applications.filter(a => a.entryCategory === 'HND').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Admission Rate</span>
                        <span className="font-bold text-green-600">{((stats.offered / stats.total) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <div className="flex items-center">
                          <Download className="w-5 h-5 mr-3 text-gray-600" />
                          <span>Admission List (CSV)</span>
                        </div>
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <div className="flex items-center">
                          <Download className="w-5 h-5 mr-3 text-gray-600" />
                          <span>Statistics Report (PDF)</span>
                        </div>
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <div className="flex items-center">
                          <Download className="w-5 h-5 mr-3 text-gray-600" />
                          <span>Audit Trail (Excel)</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Audit Logs Tab */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-500">2024-06-01 14:30:00</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">admission_number_generated</span></td>
                        <td className="px-6 py-4 text-sm">Admission Officer</td>
                        <td className="px-6 py-4 text-sm">offer_123</td>
                        <td className="px-6 py-4 text-sm">INS/ND/CSC/2026/0001</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-500">2024-06-01 14:31:00</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">offer_issued</span></td>
                        <td className="px-6 py-4 text-sm">Admission Officer</td>
                        <td className="px-6 py-4 text-sm">offer_123</td>
                        <td className="px-6 py-4 text-sm">Admission offered to Emmanuel Okonkwo</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-500">2024-06-01 14:32:00</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">student_created</span></td>
                        <td className="px-6 py-4 text-sm">Admission Officer</td>
                        <td className="px-6 py-4 text-sm">student_456</td>
                        <td className="px-6 py-4 text-sm">Student ID: STU20260001</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Processing Result Modal */}
        {processingResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                processingResult.success ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {processingResult.success ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">
                {processingResult.success ? 'Processing Complete!' : 'Processing Failed'}
              </h2>
              <p className="text-gray-500 text-center mb-6">{processingResult.message}</p>
              
              {processingResult.data?.offers && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-2">Generated Admission Numbers:</p>
                  {processingResult.data.offers.map((offer: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm">{offer.studentName}</span>
                      <span className="font-mono text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {offer.admissionNumber}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              <button
                onClick={() => setProcessingResult(null)}
                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}