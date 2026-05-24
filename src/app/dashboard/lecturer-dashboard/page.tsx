'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, FileText, Upload, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';

const lecturerData = {
  name: 'Dr. Emmanuel Obi',
  title: 'Senior Lecturer',
  department: 'Artificial Intelligence & Machine Learning',
  faculty: 'School of Artificial Intelligence & Computational Intelligence',
  staffId: 'LEC/001',
  assignedCourses: [
    { code: 'AML 111', title: 'Linear Algebra for AI', students: 45, level: 'ND 1', semester: 1 },
    { code: 'AML 211', title: 'Neural Networks & Deep Learning', students: 32, level: 'ND 2', semester: 1 },
    { code: 'NLP 111', title: 'Introduction to Linguistics for AI', students: 28, level: 'ND 1', semester: 1 },
  ],
  pendingGrading: 12,
  upcomingExams: 2,
  recentSubmissions: [
    { student: 'Aisha Mohammed', course: 'AML 111', assignment: 'Problem Set 3', submittedAt: '2024-05-20' },
    { student: 'Chidi Eze', course: 'AML 211', assignment: 'Lab Report', submittedAt: '2024-05-19' },
    { student: 'Fatima Bello', course: 'NLP 111', assignment: 'Essay', submittedAt: '2024-05-18' },
  ],
  attendanceRecords: [
    { course: 'AML 111', date: '2024-05-22', present: 42, total: 45 },
    { course: 'AML 211', date: '2024-05-21', present: 30, total: 32 },
  ]
};

export default function LecturerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'grading' | 'materials'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">EO</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{lecturerData.name}</h1>
              <p className="text-gray-600">{lecturerData.title}</p>
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-sm font-medium">
                {lecturerData.department}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Staff ID</p>
            <p className="text-xl font-bold text-purple-600">{lecturerData.staffId}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl"><BookOpen className="w-6 h-6 text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{lecturerData.assignedCourses.length}</p><p className="text-sm text-gray-500">Assigned Courses</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl"><FileText className="w-6 h-6 text-orange-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{lecturerData.pendingGrading}</p><p className="text-sm text-gray-500">Pending Grading</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl"><Users className="w-6 h-6 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{lecturerData.assignedCourses.reduce((acc, c) => acc + c.students, 0)}</p><p className="text-sm text-gray-500">Total Students</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-xl"><Clock className="w-6 h-6 text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{lecturerData.upcomingExams}</p><p className="text-sm text-gray-500">Upcoming Exams</p></div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-sm">
        {['overview', 'courses', 'grading', 'materials'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" />My Courses</h2>
                <div className="space-y-4">
                  {lecturerData.assignedCourses.map((course, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-blue-600">{course.code}</p>
                        <p className="text-gray-700">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.level} - Semester {course.semester}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">{course.students}</p>
                        <p className="text-sm text-gray-500">Students</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-orange-600" />Recent Submissions</h2>
                <div className="space-y-3">
                  {lecturerData.recentSubmissions.map((sub, idx) => (
                    <div key={idx} className="p-4 bg-yellow-50 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{sub.student}</p>
                        <p className="text-sm text-gray-500">{sub.course} - {sub.assignment}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Review</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Assigned Courses</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700">
                  <Plus className="w-4 h-4" /> Manage Courses
                </button>
              </div>
              {lecturerData.assignedCourses.map((course, idx) => (
                <div key={idx} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{course.code}</p>
                      <p className="text-gray-700">{course.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{course.level} - Semester {course.semester}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Students</button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Grade</button>
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">Materials</button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          {activeTab === 'grading' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Grading Panel</h2>
              <div className="space-y-4">
                {lecturerData.assignedCourses.map((course, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-bold text-gray-800">{course.code} - {course.title}</p>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">{lecturerData.pendingGrading} Pending</span>
                    </div>
                    <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-medium">
                      Start Grading
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {activeTab === 'materials' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Course Materials</h2>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-green-700">
                  <Upload className="w-4 h-4" /> Upload Material
                </button>
              </div>
              <div className="space-y-4">
                {lecturerData.assignedCourses.map((course, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-xl">
                    <p className="font-semibold text-gray-800 mb-2">{course.code}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Lecture Notes Week 1-4</span>
                        <span className="text-xs text-gray-500">PDF - 2.3 MB</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">Lab Exercises</span>
                        <span className="text-xs text-gray-500">ZIP - 5.1 MB</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Attendance Records</h2>
            {lecturerData.attendanceRecords.map((record, idx) => (
              <div key={idx} className="p-3 bg-green-50 rounded-xl mb-3">
                <p className="font-semibold text-gray-800">{record.course}</p>
                <p className="text-sm text-gray-500">{record.date}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">{record.present}/{record.total} Present</span>
                  <span className="text-green-600 font-medium">{Math.round((record.present/record.total)*100)}%</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-medium flex items-center gap-3 hover:bg-blue-100">
                <Upload className="w-5 h-5" /> Upload Materials
              </button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-medium flex items-center gap-3 hover:bg-green-100">
                <FileText className="w-5 h-5" /> Submit Results
              </button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-medium flex items-center gap-3 hover:bg-purple-100">
                <Users className="w-5 h-5" /> Take Attendance
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}