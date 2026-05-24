'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, BookOpen, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { curriculumData } from '@/lib/curriculum-data';

const hodData = {
  name: 'Prof. Amina Bello',
  title: 'Head of Department',
  department: 'Artificial Intelligence & Machine Learning',
  faculty: 'School of Artificial Intelligence & Computational Intelligence',
  staffId: 'HOD/001',
  departmentStats: {
    totalStudents: 156,
    totalLecturers: 12,
    totalCourses: 24,
    avgGPA: 3.45
  },
  pendingApprovals: [
    { type: 'Result', course: 'AML 111', submittedBy: 'Dr. Emmanuel Obi', date: '2024-05-22' },
    { type: 'Course Material', course: 'AML 211', submittedBy: 'Dr. Emmanuel Obi', date: '2024-05-21' },
    { type: 'Exam', course: 'NLP 111', submittedBy: 'Dr. Fatima Hassan', date: '2024-05-20' },
  ],
  lecturerPerformance: [
    { name: 'Dr. Emmanuel Obi', courses: 3, students: 105, avgRating: 4.5 },
    { name: 'Dr. Fatima Hassan', courses: 2, students: 78, avgRating: 4.2 },
    { name: 'Mr. Chidi Nwachukwu', courses: 2, students: 65, avgRating: 4.0 },
  ],
  recentActivity: [
    { action: 'Approved Results', details: 'AML 111 - ND 1 Sem 1', time: '2 hours ago' },
    { action: 'Added Course Material', details: 'AML 211 Lecture 5', time: '5 hours ago' },
    { action: 'New Student Registration', details: 'Aisha Mohammed - AML', time: '1 day ago' },
  ]
};

export default function HODDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'lecturers' | 'students' | 'approvals'>('overview');

  const dept = curriculumData[0].departments.find(d => d.id === 'dept-1');
  const programs = dept?.programs || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">AB</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{hodData.name}</h1>
              <p className="text-gray-600">{hodData.title}</p>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-sm font-medium">
                {hodData.department}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Department ID</p>
            <p className="text-xl font-bold text-emerald-600">{hodData.staffId}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl"><Users className="w-6 h-6 text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{hodData.departmentStats.totalStudents}</p><p className="text-sm text-gray-500">Total Students</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-xl"><Users className="w-6 h-6 text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{hodData.departmentStats.totalLecturers}</p><p className="text-sm text-gray-500">Lecturers</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl"><BookOpen className="w-6 h-6 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{hodData.departmentStats.totalCourses}</p><p className="text-sm text-gray-500">Courses</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-xl"><TrendingUp className="w-6 h-6 text-emerald-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{hodData.departmentStats.avgGPA}</p><p className="text-sm text-gray-500">Avg GPA</p></div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-sm">
        {['overview', 'lecturers', 'students', 'approvals'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-emerald-600" />Department Programs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.map((program, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                      <p className="font-bold text-emerald-600">{program.code}</p>
                      <p className="text-gray-700 mt-1">{program.name}</p>
                      <p className="text-sm text-gray-500 mt-2">{program.totalUnits} Credits - 2 Years</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {hodData.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                      <div className="p-2 bg-emerald-100 rounded-full"><Clock className="w-4 h-4 text-emerald-600" /></div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
          {activeTab === 'lecturers' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Lecturer Performance</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600 font-medium">Name</th>
                    <th className="text-center py-3 text-gray-600 font-medium">Courses</th>
                    <th className="text-center py-3 text-gray-600 font-medium">Students</th>
                    <th className="text-center py-3 text-gray-600 font-medium">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {hodData.lecturerPerformance.map((lecturer, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 font-semibold text-gray-800">{lecturer.name}</td>
                      <td className="py-4 text-center">{lecturer.courses}</td>
                      <td className="py-4 text-center">{lecturer.students}</td>
                      <td className="py-4 text-center">
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">{lecturer.avgRating}/5</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
          {activeTab === 'students' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Student Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-blue-600">156</p>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-600">45</p>
                  <p className="text-sm text-gray-500">ND 1</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-purple-600">38</p>
                  <p className="text-sm text-gray-500">ND 2</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-orange-600">3.45</p>
                  <p className="text-sm text-gray-500">Avg GPA</p>
                </div>
              </div>
              <h3 className="font-semibold text-gray-700 mb-3">Recent Registrations</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded flex justify-between"><span>Aisha Mohammed</span><span className="text-blue-600">AML</span></div>
                <div className="p-3 bg-gray-50 rounded flex justify-between"><span>Chidi Eze</span><span className="text-blue-600">NLP</span></div>
                <div className="p-3 bg-gray-50 rounded flex justify-between"><span>Fatima Bello</span><span className="text-blue-600">DLN</span></div>
              </div>
            </motion.div>
          )}
          {activeTab === 'approvals' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pending Approvals</h2>
              <div className="space-y-4">
                {hodData.pendingApprovals.map((approval, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">{approval.type}</span>
                        <p className="font-semibold text-gray-800 mt-2">{approval.course}</p>
                        <p className="text-sm text-gray-500">Submitted by: {approval.submittedBy}</p>
                        <p className="text-xs text-gray-400 mt-1">{approval.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Approve</button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">Reject</button>
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
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-orange-600" />Pending Approvals</h2>
            {hodData.pendingApprovals.map((approval, idx) => (
              <div key={idx} className="p-3 bg-orange-50 rounded-xl mb-3">
                <p className="font-semibold text-gray-800">{approval.type}</p>
                <p className="text-sm text-gray-500">{approval.course}</p>
                <span className="text-xs text-gray-400">{approval.date}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 text-blue-700 rounded-xl font-medium flex items-center gap-3 hover:bg-blue-100">View All Students</button>
              <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl font-medium flex items-center gap-3 hover:bg-green-100">Approve Results</button>
              <button className="w-full p-3 bg-purple-50 text-purple-700 rounded-xl font-medium flex items-center gap-3 hover:bg-purple-100">Course Assignment</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}