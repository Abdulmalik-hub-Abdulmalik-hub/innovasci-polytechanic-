'use client';

import React, { useState } from 'react';
import { 
  Monitor,
  FileText,
  Users,
  BarChart3,
  Settings,
  Bell,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download,
  Calendar,
  TrendingUp,
  Activity,
  Database,
  ClipboardList
} from 'lucide-react';

export default function DirectorCBTServicesDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);

  // Mock data
  const stats = {
    activeExams: 12,
    totalStudents: 847,
    avgPassRate: 78,
    pendingApprovals: 5,
    questionsInBank: 1250,
    scheduledToday: 8,
  };

  const pendingExaminations = [
    { id: 'exam1', title: 'AML 111 - Linear Algebra Examination', faculty: 'School of AI', department: 'AIML', level: 1, status: 'pending_program_coordinator', submittedBy: 'Dr. Fatima Hassan', submittedAt: '2024-06-10' },
    { id: 'exam2', title: 'EEE 211 - Circuit Analysis Examination', faculty: 'School of Engineering', department: 'EEE', level: 2, status: 'pending_hod', submittedBy: 'Prof. Segun Fashola', submittedAt: '2024-06-09' },
    { id: 'exam3', title: 'BA 111 - Business Communication', faculty: 'School of Business', department: 'BA', level: 1, status: 'pending_examination_officer', submittedBy: 'Dr. Emeka Nwosu', submittedAt: '2024-06-08' },
  ];

  const activeExaminations = [
    { id: 'exam4', title: 'AML 121 - Machine Learning Exam', courseCode: 'AML 121', duration: 90, students: 56, completed: 45, avgScore: 72 },
    { id: 'exam5', title: 'DSC 211 - Data Science Exam', courseCode: 'DSC 211', duration: 60, students: 48, completed: 38, avgScore: 68 },
  ];

  const recentIncidents = [
    { id: 'inc1', type: 'network_interruption', student: 'Chidi Okonkwo', exam: 'AML 111', status: 'resolved', time: '2 hours ago' },
    { id: 'inc2', type: 'browser_crash', student: 'Adaobi Nnamdi', exam: 'AML 111', status: 'investigating', time: '4 hours ago' },
    { id: 'inc3', type: 'multiple_login', student: 'Emeka Fashola', exam: 'EEE 211', status: 'resolved', time: '1 day ago' },
  ];

  const facultyStats = [
    { name: 'School of AI & Computational Intelligence', exams: 45, passRate: 82, students: 312 },
    { name: 'School of Engineering', exams: 38, passRate: 75, students: 428 },
    { name: 'School of Business', exams: 32, passRate: 80, students: 256 },
    { name: 'School of Applied Sciences', exams: 28, passRate: 78, students: 198 },
    { name: 'School of Cybersecurity', exams: 18, passRate: 85, students: 142 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Monitor className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">CBT Services Director</h1>
                <p className="text-xs text-gray-500">Examination Management Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                DCBT
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">CBT Examination Management</h2>
          <p className="text-gray-500">Comprehensive Computer-Based Testing System Administration</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Examinations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeExams}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Monitor className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Pass Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgPassRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'examinations', label: 'Examinations', icon: FileText },
                { id: 'questions', label: 'Question Bank', icon: Database },
                { id: 'approval', label: 'Approval Workflow', icon: CheckCircle },
                { id: 'security', label: 'Security & Incidents', icon: Shield },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'settings', label: 'Configuration', icon: Settings },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Pending Approvals Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pending Examination Approvals</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      {pendingExaminations.length} pending
                    </span>
                  </div>
                  <div className="space-y-4">
                    {pendingExaminations.map(exam => (
                      <div key={exam.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{exam.title}</h4>
                            <p className="text-sm text-gray-500">{exam.faculty} • {exam.department} • Level {exam.level}</p>
                            <p className="text-xs text-gray-400 mt-1">Submitted by {exam.submittedBy} on {exam.submittedAt}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                              Review
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Examinations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Currently Active Examinations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeExaminations.map(exam => (
                      <div key={exam.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{exam.title}</h4>
                            <p className="text-sm text-gray-500">{exam.courseCode}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                            <Activity className="w-4 h-4 mr-1" /> Live
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-gray-50 rounded-lg p-2">
                            <p className="text-xl font-bold text-gray-900">{exam.students}</p>
                            <p className="text-xs text-gray-500">Enrolled</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <p className="text-xl font-bold text-green-600">{exam.completed}</p>
                            <p className="text-xs text-gray-500">Completed</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2">
                            <p className="text-xl font-bold text-purple-600">{exam.avgScore}%</p>
                            <p className="text-xs text-gray-500">Avg Score</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Faculty Performance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Examination Performance</h3>
                  <div className="space-y-3">
                    {facultyStats.map((faculty, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{faculty.name}</h4>
                          <span className="text-sm text-gray-500">{faculty.exams} exams</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${faculty.passRate}%` }}></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Pass Rate: {faculty.passRate}%</span>
                          <span>{faculty.students} students</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Security Incidents */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Incidents</h3>
                  <div className="space-y-3">
                    {recentIncidents.map(incident => (
                      <div key={incident.id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            incident.status === 'resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{incident.type.replace('_', ' ')}</p>
                            <p className="text-sm text-gray-500">{incident.student} • {incident.exam}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            incident.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {incident.status}
                          </span>
                          <span className="text-sm text-gray-400">{incident.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'examinations' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input type="text" placeholder="Search examinations..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80" />
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 mr-2" /> Filter
                    </button>
                  </div>
                  <button 
                    onClick={() => setShowCreateExamModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Create Examination
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-center text-gray-500">Examination list will be displayed here. Connect to database for actual data.</p>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Question Bank</h3>
                    <p className="text-sm text-gray-500">{stats.questionsInBank} questions across all courses</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Upload className="w-4 h-4 mr-2" /> Import
                    </button>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" /> Add Question
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {['Multiple Choice', 'True/False', 'Fill in Blank', 'Short Answer', 'Essay', 'Matching'].map((type, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-gray-900">{type}</h4>
                      <p className="text-2xl font-bold text-gray-600">{Math.floor(Math.random() * 200) + 50}</p>
                      <p className="text-sm text-gray-500">questions</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approval' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Examination Approval Workflow</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <ClipboardList className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Approval Chain</h4>
                        <p className="text-sm text-gray-500">Examinations must be approved by all levels before going live</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    {['Lecturer', 'Programme Coordinator', 'HOD', 'Examination Officer', 'Director CBT'].map((step, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                          idx < 2 ? 'bg-green-500' : idx === 2 ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{step}</span>
                        {idx < 4 && <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Security & Incident Management</h3>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-2" /> Export Logs
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-red-600 font-medium">Critical</span>
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-3xl font-bold text-red-600">3</p>
                    <p className="text-sm text-red-500">Open incidents</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-600 font-medium">Warning</span>
                      <Clock className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">8</p>
                    <p className="text-sm text-yellow-500">Investigating</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">Resolved</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-green-600">45</p>
                    <p className="text-sm text-green-500">Resolved this week</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">CBT Analytics Dashboard</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Examination Trends</h4>
                    <div className="h-48 flex items-end justify-around space-x-2">
                      {[65, 72, 68, 78, 82, 75, 80].map((value, idx) => (
                        <div key={idx} className="w-12 bg-blue-600 rounded-t" style={{ height: `${value}%` }}></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Pass Rate by Faculty</h4>
                    {facultyStats.map((faculty, idx) => (
                      <div key={idx} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 truncate">{faculty.name.split(' ')[0]}</span>
                          <span className="font-medium">{faculty.passRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${faculty.passRate}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">CBT Configuration</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-medium text-gray-900 mb-4">General Settings</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Default Exam Duration</span>
                        <span className="font-medium">60 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pass Mark</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Max Attempts</span>
                        <span className="font-medium">2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Negative Marking</span>
                        <span className="font-medium">Disabled</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Browser Lockdown</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Enabled</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tab Switch Detection</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Enabled</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Auto-save Interval</span>
                        <span className="font-medium">30 seconds</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Session Timeout</span>
                        <span className="font-medium">30 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}