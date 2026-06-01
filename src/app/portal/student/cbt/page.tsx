'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Play,
  Eye,
  FileText,
  User,
  GraduationCap,
  Calendar,
  Timer,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';

// Mock student data
const studentData = {
  id: 's1',
  fullName: 'Chidi Okonkwo',
  admissionNumber: 'ISA/2024/001',
  email: 'chidi.okonkwo@isa.edu.ng',
  phone: '+2348034567890',
  faculty: 'School of AI & Computational Intelligence',
  facultyId: 'f1',
  department: 'Artificial Intelligence & Machine Learning',
  departmentId: 'd1',
  programme: 'Applied Machine Learning',
  programmeId: 'p1',
  level: 1,
  semester: 1,
  entryCategory: 'ND' as const,
  academicStatus: 'regular' as const,
  photo: '/api/placeholder/150/150',
};

// Mock examinations
const examinations = [
  {
    id: 'exam1',
    title: 'AML 111 - Linear Algebra Mid-Term Examination',
    courseCode: 'AML 111',
    courseTitle: 'Linear Algebra for AI',
    duration: 60,
    totalQuestions: 10,
    passingMarks: 50,
    examDate: '2024-06-15',
    startTime: '09:00',
    endTime: '10:00',
    status: 'available' as const,
    attempts: 0,
    maxAttempts: 1,
    bestScore: undefined,
    lastAttempt: undefined,
  },
  {
    id: 'exam2',
    title: 'AML 112 - Python Programming Examination',
    courseCode: 'AML 112',
    courseTitle: 'Python Programming',
    duration: 90,
    totalQuestions: 15,
    passingMarks: 50,
    examDate: '2024-06-20',
    startTime: '14:00',
    endTime: '15:30',
    status: 'upcoming' as const,
    attempts: 0,
    maxAttempts: 2,
    bestScore: undefined,
    lastAttempt: undefined,
  },
  {
    id: 'exam3',
    title: 'AML 113 - Introduction to Data Science',
    courseCode: 'AML 113',
    courseTitle: 'Introduction to Data Science',
    duration: 45,
    totalQuestions: 8,
    passingMarks: 50,
    examDate: '2024-06-10',
    startTime: '11:00',
    endTime: '11:45',
    status: 'completed' as const,
    attempts: 1,
    maxAttempts: 2,
    bestScore: 85,
    lastAttempt: { score: 85, percentage: 85, grade: 'A', status: 'pass' },
  },
];

// Exam History
const examHistory = [
  { id: 'h1', title: 'AML 111 - Linear Algebra', date: '2024-06-15', score: 85, grade: 'A', status: 'pass' },
  { id: 'h2', title: 'AML 112 - Python Programming', date: '2024-06-10', score: 72, grade: 'B', status: 'pass' },
];

// Past Results
const pastResults = [
  { course: 'AML 111', score: 85, percentage: 85, grade: 'A', date: '2024-06-15' },
  { course: 'AML 112', score: 72, percentage: 72, grade: 'B', date: '2024-06-10' },
  { course: 'AML 113', score: 58, percentage: 58, grade: 'C', date: '2024-05-28' },
];

export default function StudentCBTDashboard() {
  const [activeTab, setActiveTab] = useState<'available' | 'history' | 'results'>('available');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [selectedExam, setSelectedExam] = useState<typeof examinations[0] | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Verification form state
  const [verificationForm, setVerificationForm] = useState({
    admissionNumber: '',
    verificationCode: '',
  });

  const handleStartExam = (exam: typeof examinations[0]) => {
    setSelectedExam(exam);
    setShowVerificationModal(true);
    setVerificationStep(1);
    setVerificationForm({
      admissionNumber: studentData.admissionNumber,
      verificationCode: '',
    });
  };

  const handleVerification = () => {
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      if (verificationForm.admissionNumber === studentData.admissionNumber) {
        setVerificationStep(2);
      }
    }, 1500);
  };

  const handleStartActualExam = () => {
    if (selectedExam) {
      window.location.href = `/portal/student/cbt/examination/${selectedExam.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">Student CBT Portal</h1>
                <p className="text-xs text-gray-500">InnovaSci AI Labs Polytechnic</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {studentData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{studentData.fullName}</p>
                  <p className="text-xs text-gray-500">{studentData.admissionNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Info Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{studentData.fullName}</h2>
                <p className="text-blue-100">{studentData.admissionNumber}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="text-sm text-blue-200">Programme</p>
                <p className="font-semibold">{studentData.entryCategory}</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="text-sm text-blue-200">Level</p>
                <p className="font-semibold">{studentData.level}</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="text-sm text-blue-200">Semester</p>
                <p className="font-semibold">{studentData.semester}</p>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-2">
                <p className="text-sm text-blue-200">Status</p>
                <p className="font-semibold capitalize">{studentData.academicStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Exams</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Score</p>
                <p className="text-3xl font-bold text-gray-900">72%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pass Rate</p>
                <p className="text-3xl font-bold text-gray-900">85%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('available')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'available'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Available Examinations
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Examination History
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'results'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Past Results
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'available' && (
              <div className="space-y-4">
                {examinations.filter(e => e.status !== 'completed').map(exam => (
                  <div key={exam.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {exam.courseCode}
                          </span>
                          {exam.status === 'available' ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" /> Available Now
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center">
                              <Clock className="w-4 h-4 mr-1" /> Upcoming
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{exam.title}</h3>
                        <p className="text-gray-500 mb-4">{exam.courseTitle}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {exam.duration} minutes
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {exam.totalQuestions} questions
                          </div>
                          <div className="flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Pass: {exam.passingMarks}%
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exam.examDate}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
                        {exam.status === 'available' && (
                          <button
                            onClick={() => handleStartExam(exam)}
                            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Start Examination
                          </button>
                        )}
                        {exam.status === 'upcoming' && (
                          <span className="text-sm text-gray-500">Opens {exam.examDate}</span>
                        )}
                        <span className="text-sm text-gray-500">
                          Attempts: {exam.attempts}/{exam.maxAttempts}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {examHistory.map(exam => (
                  <div key={exam.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                        <p className="text-sm text-gray-500">{exam.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{exam.score}%</p>
                          <p className="text-sm text-gray-500">Grade: {exam.grade}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          exam.status === 'pass' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {exam.status === 'pass' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-4">
                {pastResults.map((result, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{result.course}</h3>
                        <p className="text-sm text-gray-500">{result.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{result.percentage}%</p>
                          <p className="text-sm text-gray-500">Grade: {result.grade}</p>
                        </div>
                        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                          {result.grade}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            {verificationStep === 1 && (
              <>
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Examination Verification</h2>
                <p className="text-gray-500 text-center mb-6">Please verify your identity before starting the examination</p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admission Number</label>
                    <input
                      type="text"
                      value={verificationForm.admissionNumber}
                      onChange={(e) => setVerificationForm({...verificationForm, admissionNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your admission number"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Student Information (Auto-populated)</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-600">Name:</p>
                    <p className="font-medium">{studentData.fullName}</p>
                    <p className="text-gray-600">Programme:</p>
                    <p className="font-medium">{studentData.programme}</p>
                    <p className="text-gray-600">Level:</p>
                    <p className="font-medium">{studentData.level}</p>
                    <p className="text-gray-600">Semester:</p>
                    <p className="font-medium">{studentData.semester}</p>
                  </div>
                </div>

                <button
                  onClick={handleVerification}
                  disabled={isVerifying || verificationForm.admissionNumber !== studentData.admissionNumber}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </>
            )}

            {verificationStep === 2 && selectedExam && (
              <>
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Identity Verified!</h2>
                <p className="text-gray-500 text-center mb-6">You are verified as {studentData.fullName}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedExam.title}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" /> Duration: {selectedExam.duration} min
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FileText className="w-4 h-4 mr-2" /> {selectedExam.totalQuestions} Questions
                    </div>
                    <div className="flex items-center text-gray-600">
                      <AlertTriangle className="w-4 h-4 mr-2" /> Pass Mark: {selectedExam.passingMarks}%
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" /> {selectedExam.examDate}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Before You Start</h4>
                      <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                        <li>• Ensure you have a stable internet connection</li>
                        <li>• Use a compatible browser (Chrome, Firefox, Edge)</li>
                        <li>• Disable any screen recording software</li>
                        <li>• Keep this window focused during the exam</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartActualExam}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Start Examination
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}