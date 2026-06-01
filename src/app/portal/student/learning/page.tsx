'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Headphones, 
  FileCheck,
  Download,
  Play,
  Clock,
  Star,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Eye,
  Bookmark,
  Edit,
  Trash2,
  Plus,
  MoreVertical,
  GraduationCap,
  Award,
  BarChart3,
  Library,
  FlaskConical
} from 'lucide-react';

import {
  DEMO_STUDENT_PROFILE,
  DEMO_VIDEO_LECTURES,
  DEMO_DOCUMENTS,
  DEMO_ASSIGNMENTS,
  DEMO_PROJECTS,
  getStudentCourses,
  verifyStudentAccess,
  StudentProfile,
  CurriculumCourse,
  VideoLecture,
  DocumentResource,
  Assignment,
  StudentNote
} from '@/lib/learning-resources';

type TabType = 'courses' | 'videos' | 'documents' | 'assignments' | 'notes' | 'analytics';
type ContentView = 'list' | 'detail';

export default function StudentLearningPortal() {
  const [activeTab, setActiveTab] = useState<TabType>('courses');
  const [selectedCourse, setSelectedCourse] = useState<CurriculumCourse | null>(null);
  const [contentView, setContentView] = useState<ContentView>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [studentNotes, setStudentNotes] = useState<StudentNote[]>([]);
  const [student] = useState<StudentProfile>(DEMO_STUDENT_PROFILE);

  // Get student courses based on curriculum
  const studentCourses = useMemo(() => {
    return getStudentCourses(student);
  }, [student]);

  // Verify student access
  const accessVerification = useMemo(() => {
    return verifyStudentAccess(student);
  }, [student]);

  // Filter resources based on search
  const filteredVideos = useMemo(() => {
    return DEMO_VIDEO_LECTURES.filter(v => 
      v.courseId === selectedCourse?.id || !selectedCourse
    ).filter(v => 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCourse, searchQuery]);

  const filteredDocuments = useMemo(() => {
    return DEMO_DOCUMENTS.filter(d => 
      d.courseId === selectedCourse?.id || !selectedCourse
    ).filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCourse, searchQuery]);

  const filteredAssignments = useMemo(() => {
    return DEMO_ASSIGNMENTS.filter(a => 
      a.courseId === selectedCourse?.id || !selectedCourse
    );
  }, [selectedCourse]);

  // Statistics
  const stats = {
    totalLearningTime: 245,
    coursesAccessed: studentCourses.length,
    videosWatched: 12,
    documentsDownloaded: 28,
    notesCreated: studentNotes.length,
    assignmentsCompleted: 2,
    progress: 68,
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'not_started':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'submitted':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'graded':
        return <Star className="w-4 h-4 text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-600';
      case 'in_progress':
        return 'bg-amber-100 text-amber-600';
      case 'submitted':
        return 'bg-blue-100 text-blue-600';
      case 'graded':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleCreateNote = () => {
    if (newNote.title && newNote.content) {
      const note: StudentNote = {
        id: `note_${Date.now()}`,
        studentId: student.id,
        courseId: selectedCourse?.id || '',
        courseCode: selectedCourse?.code || '',
        title: newNote.title,
        content: newNote.content,
        tags: [],
        isPinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setStudentNotes(prev => [note, ...prev]);
      setNewNote({ title: '', content: '' });
      setShowNotesModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-emerald-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Learning Portal</h1>
                <p className="text-xs text-gray-500">InnovaSci Open Polytechnic</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                Student
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Verification Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                {student.fullName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{student.fullName}</p>
                <p className="text-sm text-gray-600">Admission No: {student.admissionNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <p className="text-gray-500">Programme</p>
                <p className="font-medium">{student.entryCategory} - {student.programmeCode}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Level</p>
                <p className="font-medium">{student.entryCategory} {student.level}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Semester</p>
                <p className="font-medium">Semester {student.semester}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Faculty</p>
                <p className="font-medium">{student.facultyName.split(' ')[0]}</p>
              </div>
            </div>
          </div>
          {!accessVerification.isValid && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                Access issues: {accessVerification.errors.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Learning Time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLearningTime}h</p>
              </div>
              <Clock className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.coursesAccessed}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Videos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.videosWatched}</p>
              </div>
              <Video className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.documentsDownloaded}</p>
              </div>
              <Download className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.notesCreated}</p>
              </div>
              <Edit className="w-8 h-8 text-cyan-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.progress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {[
                { id: 'courses', label: 'My Courses', icon: BookOpen },
                { id: 'videos', label: 'Video Lectures', icon: Video },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'assignments', label: 'Assignments', icon: FileCheck },
                { id: 'notes', label: 'My Notes', icon: Edit },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
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
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Semester {student.semester} Courses
                  </h3>
                  <span className="text-sm text-gray-500">
                    {studentCourses.length} courses registered
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentCourses.map(course => (
                    <div 
                      key={course.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedCourse(course);
                        setContentView('detail');
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {course.code}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          course.type === 'compulsory' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {course.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{course.credits} credits</span>
                        <span>{course.lecturerName || 'TBA'}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-end text-emerald-600">
                        <span className="text-sm">View Resources</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Video Lectures</h3>
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredVideos.map(video => (
                    <div key={video.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
                      <div className="relative h-40 bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {video.duration} min
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {video.courseCode}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
                        <p className="text-sm text-gray-500 mb-3">{video.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" /> {video.views} views
                          </span>
                          <button className="flex items-center text-emerald-600 hover:text-emerald-700">
                            <Play className="w-4 h-4 mr-1" /> Watch
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Learning Documents</h3>
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredDocuments.map(doc => (
                    <div key={doc.id} className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            doc.type === 'pdf' ? 'bg-red-100' :
                            doc.type === 'slides' ? 'bg-orange-100' : 'bg-blue-100'
                          }`}>
                            <FileText className={`w-6 h-6 ${
                              doc.type === 'pdf' ? 'text-red-600' :
                              doc.type === 'slides' ? 'text-orange-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                            <p className="text-sm text-gray-500">{doc.courseCode} • {doc.pageCount} pages</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right text-sm">
                            <p className="text-gray-500">{doc.downloads} downloads</p>
                            <p className="text-gray-400">{doc.views} views</p>
                          </div>
                          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                            <Download className="w-4 h-4 mr-2" /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Course Assignments</h3>
                </div>

                <div className="space-y-3">
                  {filteredAssignments.map(assignment => (
                    <div key={assignment.id} className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(assignment.status)}
                          <div>
                            <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                            <p className="text-sm text-gray-500">
                              {assignment.courseCode} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                            {assignment.status.replace('_', ' ')}
                          </span>
                          {assignment.status === 'not_started' && (
                            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                              Start
                            </button>
                          )}
                          {assignment.status === 'in_progress' && (
                            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                              Continue
                            </button>
                          )}
                          {assignment.status === 'graded' && (
                            <span className="text-lg font-bold text-emerald-600">
                              {assignment.score}/{assignment.maxScore}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">My Study Notes</h3>
                  <button 
                    onClick={() => setShowNotesModal(true)}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Create Note
                  </button>
                </div>

                {studentNotes.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Edit className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No notes yet. Start taking notes!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentNotes.map(note => (
                      <div key={note.id} className="border border-gray-200 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{note.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{note.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{note.courseCode || 'General'}</span>
                          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Learning Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Weekly Progress</h4>
                    <div className="space-y-3">
                      {[
                        { week: 'Week 1', progress: 85 },
                        { week: 'Week 2', progress: 72 },
                        { week: 'Week 3', progress: 90 },
                        { week: 'Week 4', progress: 65 },
                      ].map(item => (
                        <div key={item.week} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.week}</span>
                            <span className="font-medium">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Learning Distribution</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                          <span className="text-gray-600">Videos</span>
                        </div>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-600">Documents</span>
                        </div>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-gray-600">Assignments</span>
                        </div>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                          <span className="text-gray-600">Notes</span>
                        </div>
                        <span className="font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create Study Note</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Note title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32"
                  placeholder="Write your notes here..."
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowNotesModal(false)}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNote}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}