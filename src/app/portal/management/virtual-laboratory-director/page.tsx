'use client';

import React, { useState, useMemo } from 'react';
import { 
  FlaskConical,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  BarChart3,
  Calendar,
  Settings,
  Eye,
  Plus,
  Search,
  Download,
  PieChart,
  TrendingUp,
  Award,
  Database
} from 'lucide-react';

import {
  DEMO_VIRTUAL_LABORATORIES,
  DEMO_LABORATORY_ACTIVITIES,
  DEMO_LAB_REPORTS,
  getLabAnalytics,
  VirtualLaboratory,
  LaboratoryActivity,
  LabReport,
  LabAnalytics
} from '@/lib/virtual-laboratory';

export default function VirtualLaboratoryDirectorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'labs' | 'reports' | 'quality'>('overview');
  const [selectedLab, setSelectedLab] = useState<VirtualLaboratory | null>(null);

  // Calculate overall analytics
  const overallAnalytics = useMemo(() => {
    const labs = DEMO_VIRTUAL_LABORATORIES;
    return {
      totalLabs: labs.length,
      totalActivities: labs.reduce((sum, lab) => sum + lab.totalActivities, 0),
      totalStudents: labs.reduce((sum, lab) => sum + lab.totalStudents, 0),
      averageCompletion: Math.round(labs.reduce((sum, lab) => sum + lab.completionRate, 0) / labs.length),
      totalReports: DEMO_LAB_REPORTS.length,
      pendingReviews: DEMO_LAB_REPORTS.filter(r => r.status === 'submitted').length,
      averageScore: 74,
      qualityScore: 88,
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'maintenance': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'published': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'submitted': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Virtual Laboratory Director</h1>
          <p className="text-gray-500">Manage and monitor all virtual laboratory operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Lab</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Laboratories</p>
              <p className="text-3xl font-bold">{overallAnalytics.totalLabs}</p>
              <p className="text-sm text-green-600">Active</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-3xl font-bold">{overallAnalytics.totalStudents}</p>
              <p className="text-sm text-blue-600">Enrolled</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Reviews</p>
              <p className="text-3xl font-bold text-amber-600">{overallAnalytics.pendingReviews}</p>
              <p className="text-sm text-amber-600">Reports</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Quality Score</p>
              <p className="text-3xl font-bold text-green-600">{overallAnalytics.qualityScore}%</p>
              <p className="text-sm text-green-600">Excellent</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'overview', label: 'Overview', icon: PieChart },
              { id: 'labs', label: 'Manage Labs', icon: FlaskConical },
              { id: 'reports', label: 'Lab Reports', icon: FileText },
              { id: 'quality', label: 'Quality Assurance', icon: CheckCircle },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-6 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Programme Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Laboratory Distribution by Programme</h3>
                  <div className="space-y-4">
                    {DEMO_VIRTUAL_LABORATORIES.map(lab => (
                      <div key={lab.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{lab.programmeName}</p>
                          <p className="text-sm text-gray-500">{lab.courseCode}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{lab.totalActivities} Activities</p>
                          <p className="text-sm text-green-600">{lab.completionRate}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Activity Completion Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Overall Completion</span>
                        <span className="text-sm font-medium">{overallAnalytics.averageCompletion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-purple-600 h-3 rounded-full" 
                          style={{ width: `${overallAnalytics.averageCompletion}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Report Submission</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Assessment Pass Rate</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Recent Laboratory Activity</h3>
                <div className="space-y-3">
                  {DEMO_LAB_REPORTS.slice(0, 3).map(report => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{report.activityTitle}</p>
                        <p className="text-sm text-gray-500">{report.studentName} • {report.courseCode}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{report.submittedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search laboratories..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80"
                  />
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  + Create Lab
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Lab Code</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Course</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Programme</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Level</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Activities</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Students</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {DEMO_VIRTUAL_LABORATORIES.map(lab => (
                      <tr key={lab.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{lab.code}</td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{lab.courseCode}</p>
                          <p className="text-sm text-gray-500">{lab.courseTitle}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{lab.programmeName}</td>
                        <td className="px-6 py-4">{lab.programmeType} {lab.level}</td>
                        <td className="px-6 py-4">{lab.totalActivities}</td>
                        <td className="px-6 py-4">{lab.totalStudents}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lab.status)}`}>
                            {lab.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">Edit</button>
                            <button className="text-gray-600 hover:text-gray-700">View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Lab Reports Management</h3>
                <div className="flex items-center space-x-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>All Status</option>
                    <option>Submitted</option>
                    <option>Reviewed</option>
                    <option>Approved</option>
                  </select>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Course</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Activity</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Score</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {DEMO_LAB_REPORTS.map(report => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium">{report.studentName}</p>
                          <p className="text-sm text-gray-500">{report.admissionNumber}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium">{report.courseCode}</p>
                          <p className="text-sm text-gray-500">{report.courseTitle}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{report.activityTitle}</td>
                        <td className="px-6 py-4 text-gray-600">{report.submittedAt}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {report.score ? (
                            <span className="font-semibold">{report.score}%</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">Review</button>
                            <button className="text-gray-600 hover:text-gray-700">View</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'quality' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Quality Assurance Dashboard</h3>
                  <p className="text-gray-500">Monitor and audit laboratory activities for accreditation</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                  <Database className="w-4 h-4" />
                  <span>Generate Accreditation Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Quality Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lab Quality Score</span>
                      <span className="font-semibold text-green-600">88%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Procedure Compliance</span>
                      <span className="font-semibold text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Safety Compliance</span>
                      <span className="font-semibold text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Report Quality</span>
                      <span className="font-semibold text-amber-600">78%</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Competency Tracking</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Advanced Level</span>
                      <span className="font-semibold">24 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proficient Level</span>
                      <span className="font-semibold">58 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intermediate Level</span>
                      <span className="font-semibold">42 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Beginner Level</span>
                      <span className="font-semibold">16 students</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Accreditation Evidence</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Lab Activities</span>
                      <span className="font-semibold">{overallAnalytics.totalActivities}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Lab Reports</span>
                      <span className="font-semibold">{overallAnalytics.totalReports}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Assessments</span>
                      <span className="font-semibold">48</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">Quality Audits</span>
                      <span className="font-semibold">12</span>
                    </div>
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