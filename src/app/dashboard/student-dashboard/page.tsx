'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Calendar, TrendingUp, Award, Clock, CheckCircle, 
  AlertCircle, Users, FileText, Download, ChevronRight, GraduationCap
} from 'lucide-react';
import { curriculumData, getProgramByCode } from '@/lib/curriculum-data';

const studentData = {
  studentId: '2024/AML/001',
  name: 'Aisha Mohammed',
  program: 'AML',
  programName: 'Diploma in Applied Machine Learning',
  level: 1,
  semester: 1,
  cgpa: 3.75,
  registeredCourses: [
    { code: 'AML 111', title: 'Linear Algebra for AI', unit: 3, status: 'registered' },
    { code: 'AML 112', title: 'Programming Foundations in Python', unit: 3, status: 'registered' },
    { code: 'AML 113', title: 'Introduction to Machine Learning', unit: 3, status: 'registered' },
    { code: 'AML 114', title: 'Computational Statistics', unit: 3, status: 'registered' },
    { code: 'GEN 101', title: 'Communication Skills for Tech', unit: 2, status: 'registered' },
    { code: 'ELE 101', title: 'Logic & Critical Thinking', unit: 2, status: 'registered' },
  ],
  currentResults: [
    { code: 'AML 111', title: 'Linear Algebra for AI', ca: 18, exam: 72, total: 90, grade: 'A', gradePoint: 4.0 },
    { code: 'AML 112', title: 'Programming Foundations in Python', ca: 20, exam: 68, total: 88, grade: 'A', gradePoint: 4.0 },
    { code: 'AML 113', title: 'Introduction to Machine Learning', ca: 15, exam: 65, total: 80, grade: 'A', gradePoint: 4.0 },
    { code: 'AML 114', title: 'Computational Statistics', ca: 12, exam: 55, total: 67, grade: 'B', gradePoint: 3.0 },
    { code: 'GEN 101', title: 'Communication Skills for Tech', ca: 16, exam: 62, total: 78, grade: 'B+', gradePoint: 3.5 },
  ],
  previousResults: [
    { semester: 'ND 1 Sem 1', gpa: 3.85, courses: 6, credits: 19 },
  ],
  attendance: { present: 45, total: 48, percentage: 94 },
  assignments: [
    { title: 'Linear Algebra Problem Set', dueDate: '2024-05-30', status: 'pending', score: null },
    { title: 'Python Programming Quiz', dueDate: '2024-05-25', status: 'submitted', score: 85 },
    { title: 'ML Case Study', dueDate: '2024-05-20', status: 'graded', score: 92 },
  ],
  timetable: [
    { time: '08:00 - 10:00', course: 'AML 111', room: 'Lab A' },
    { time: '10:30 - 12:30', course: 'AML 112', room: 'Lab B' },
    { time: '14:00 - 16:00', course: 'GEN 101', room: 'Room 201' },
  ]
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'results' | 'timetable'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">AM</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{studentData.name}</h1>
              <p className="text-gray-600">{studentData.studentId} - {studentData.programName}</p>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm font-medium">
                ND {studentData.level} - Semester {studentData.semester}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">{studentData.cgpa}</p>
            <p className="text-sm text-gray-500">Current CGPA</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-md border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-xl"><BookOpen className="w-6 h-6 text-green-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{studentData.registeredCourses.length}</p><p className="text-sm text-gray-500">Registered Courses</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl"><TrendingUp className="w-6 h-6 text-blue-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">19</p><p className="text-sm text-gray-500">Credit Units</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-xl"><Award className="w-6 h-6 text-purple-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">3.75</p><p className="text-sm text-gray-500">CGPA</p></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-xl"><Clock className="w-6 h-6 text-orange-600" /></div>
            <div><p className="text-2xl font-bold text-gray-800">{studentData.attendance.percentage}%</p><p className="text-sm text-gray-500">Attendance</p></div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-sm">
        {['overview', 'courses', 'results', 'timetable'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Award className="w-5 h-5 text-green-600" />Current Semester Results</h2>
                </div>
                <div className="p-5">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-gray-600 font-medium">Course</th>
                        <th className="text-center py-3 text-gray-600 font-medium">CA</th>
                        <th className="text-center py-3 text-gray-600 font-medium">Exam</th>
                        <th className="text-center py-3 text-gray-600 font-medium">Total</th>
                        <th className="text-center py-3 text-gray-600 font-medium">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.currentResults.map((result, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3">
                            <p className="font-semibold text-gray-800">{result.code}</p>
                            <p className="text-sm text-gray-500">{result.title}</p>
                          </td>
                          <td className="text-center py-3">{result.ca}</td>
                          <td className="text-center py-3">{result.exam}</td>
                          <td className="text-center py-3 font-bold">{result.total}</td>
                          <td className="text-center py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${result.grade === 'A' ? 'bg-green-100 text-green-700' : result.grade === 'B+' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{result.grade}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Semester GPA</span>
                    <span className="text-2xl font-bold text-blue-600">3.75</span>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" />Registered Courses - Semester {studentData.semester}</h2>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {studentData.registeredCourses.map((course, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <p className="font-mono font-bold text-blue-600">{course.code}</p>
                        <p className="text-sm text-gray-700 mt-1">{course.title}</p>
                        <p className="text-xs text-gray-500 mt-2">{course.unit} Credit Units</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">All Registered Courses</h2>
              {studentData.registeredCourses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                      <span className="font-bold text-white text-sm">{course.code.slice(0, 3)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{course.code} - {course.title}</p>
                      <p className="text-sm text-gray-500">{course.unit} Credit Units</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Registered</span>
                </div>
              ))}
            </motion.div>
          )}
          {activeTab === 'results' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Results</h2>
              {studentData.previousResults.map((result, idx) => (
                <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{result.semester}</p>
                      <p className="text-sm text-gray-500">{result.courses} Courses - {result.credits} Credits</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{result.gpa.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">GPA</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full mt-4 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"><Download className="w-5 h-5" />Download Official Transcript</button>
            </motion.div>
          )}
          {activeTab === 'timetable' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Timetable</h2>
              {studentData.timetable.map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50">
                  <span className="font-medium text-gray-700">{slot.time}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{slot.course}</span>
                  <span className="text-gray-600">{slot.room}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Pending Assignments</h2>
            {studentData.assignments.map((assignment, idx) => (
              <div key={idx} className="p-3 bg-yellow-50 rounded-xl mb-3">
                <p className="font-semibold text-gray-800">{assignment.title}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Due: {assignment.dueDate}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${assignment.status === 'pending' ? 'bg-orange-100 text-orange-700' : assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{assignment.status}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">CGPA Progress</h2>
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="56" stroke="url(#gradient)" strokeWidth="12" fill="none" strokeDasharray={`${(studentData.cgpa / 4) * 352} 352`} strokeLinecap="round" />
                  <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl font-bold text-gray-800">{studentData.cgpa}</span></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">out of 4.0</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}