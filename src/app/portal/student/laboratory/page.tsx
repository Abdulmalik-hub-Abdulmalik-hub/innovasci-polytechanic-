'use client';

import React, { useState, useMemo } from 'react';
import { 
  FlaskConical,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
  Eye,
  Download,
  Award,
  Users,
  BarChart3,
  Calendar,
  ChevronRight,
  Settings,
  Search,
  Filter
} from 'lucide-react';

import {
  DEMO_STUDENT_PROFILE,
  StudentProfile
} from '@/lib/learning-resources';

import {
  getStudentVirtualLaboratories,
  getLabById,
  getLabActivities,
  VirtualLaboratory,
  LaboratoryActivity
} from '@/lib/virtual-laboratory';

export default function StudentVirtualLaboratoryHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLab, setSelectedLab] = useState<VirtualLaboratory | null>(null);
  const [activeTab, setActiveTab] = useState<'labs' | 'notebook' | 'reports'>('labs');

  const student: StudentProfile = DEMO_STUDENT_PROFILE;

  // Get labs assigned to this student based on curriculum
  const studentLabs = useMemo(() => {
    return getStudentVirtualLaboratories(student);
  }, [student]);

  // Filter labs based on search
  const filteredLabs = useMemo(() => {
    if (!searchTerm) return studentLabs;
    return studentLabs.filter(lab =>
      lab.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [studentLabs, searchTerm]);

  // Get activities for selected lab
  const labActivities = useMemo(() => {
    if (!selectedLab) return [];
    return getLabActivities(selectedLab.id);
  }, [selectedLab]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: LabStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'maintenance': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'archived': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Virtual Laboratories</h1>
          <p className="text-gray-500">Access your practical laboratory sessions</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FlaskConical className="w-5 h-5" />
          <span>{studentLabs.length} Laboratories</span>
        </div>
      </div>

      {/* Student Info Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <FlaskConical className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{student.fullName}</h2>
              <p className="text-purple-200">Admission No: {student.admissionNumber}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <p className="text-sm text-purple-200">Programme</p>
              <p className="font-semibold">{student.entryCategory} {student.programmeCode}</p>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <p className="text-sm text-purple-200">Level</p>
              <p className="font-semibold">{student.entryCategory} {student.level}</p>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <p className="text-sm text-purple-200">Semester</p>
              <p className="font-semibold">Semester {student.semester}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-white/10 rounded-lg p-3 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-purple-200" />
          <p className="text-sm text-purple-100">
            Laboratories automatically assigned based on your curriculum enrollment
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Laboratories</p>
              <p className="text-3xl font-bold">{studentLabs.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Labs</p>
              <p className="text-3xl font-bold text-green-600">{studentLabs.filter(l => l.status === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Activities</p>
              <p className="text-3xl font-bold">
                {studentLabs.reduce((sum, lab) => sum + lab.totalActivities, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Completion</p>
              <p className="text-3xl font-bold text-amber-600">
                {Math.round(studentLabs.reduce((sum, lab) => sum + lab.completionRate, 0) / studentLabs.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'labs', label: 'My Laboratories', icon: FlaskConical },
              { id: 'notebook', label: 'Lab Notebook', icon: BookOpen },
              { id: 'reports', label: 'Lab Reports', icon: FileText },
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
          {activeTab === 'labs' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search laboratories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Labs Grid */}
              {filteredLabs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLabs.map(lab => (
                    <div 
                      key={lab.id} 
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedLab(lab)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <FlaskConical className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                              {lab.courseCode}
                            </span>
                            <h3 className="font-semibold text-gray-900 mt-2">{lab.name}</h3>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lab.status)}`}>
                          {lab.status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{lab.description}</p>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold">{lab.totalActivities}</p>
                          <p className="text-xs text-gray-500">Activities</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold">{lab.totalStudents}</p>
                          <p className="text-xs text-gray-500">Students</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <p className="text-xl font-bold">{lab.completionRate}%</p>
                          <p className="text-xs text-gray-500">Completion</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{lab.lecturerName}</span>
                        </div>
                        <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700">
                          <span>Access Lab</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <FlaskConical className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No laboratories found</p>
                  <p className="text-sm text-gray-400">Laboratories will appear when enrolled</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notebook' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Digital Laboratory Notebook</h3>
                  <p className="text-gray-500">Record observations, calculations, and findings</p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>New Entry</span>
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">Lab Notebook</h4>
                    <p className="text-gray-500 mb-4">Access laboratory notebook from specific lab activities</p>
                    <p className="text-sm text-gray-400">Select a laboratory to start recording observations</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Laboratory Reports</h3>
                  <p className="text-gray-500">View and manage your submitted lab reports</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Reports</span>
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Course</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Activity</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Score</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">AML 111</td>
                      <td className="px-6 py-4 text-gray-600">Introduction to NumPy Arrays</td>
                      <td className="px-6 py-4 text-gray-600">2024-06-10</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                          Under Review
                        </span>
                      </td>
                      <td className="px-6 py-4">-</td>
                      <td className="px-6 py-4">
                        <button className="text-purple-600 hover:text-purple-700">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lab Detail Modal */}
      {selectedLab && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedLab.name}</h2>
                    <p className="text-gray-500">{selectedLab.courseCode} • {selectedLab.courseTitle}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLab(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Lab Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Activities</p>
                  <p className="text-2xl font-bold">{selectedLab.totalActivities}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Completion</p>
                  <p className="text-2xl font-bold text-green-600">{selectedLab.completionRate}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Students</p>
                  <p className="text-2xl font-bold">{selectedLab.totalStudents}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLab.status)}`}>
                    {selectedLab.status}
                  </span>
                </div>
              </div>

              {/* Activities */}
              <div>
                <h3 className="text-lg font-bold mb-4">Laboratory Activities</h3>
                <div className="space-y-3">
                  {labActivities.map(activity => (
                    <div key={activity.id} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                            {activity.order}
                          </div>
                          <div>
                            <h4 className="font-semibold">{activity.title}</h4>
                            <p className="text-sm text-gray-500">{activity.estimatedDuration} min • {activity.maxScore} marks</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-1">
                            <Play className="w-4 h-4" />
                            <span>Start</span>
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activity.objectives.slice(0, 3).map((obj, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {obj}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Type for lab status
type LabStatus = 'active' | 'inactive' | 'maintenance' | 'archived';