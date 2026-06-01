'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Building2, Users, ChevronDown, ChevronRight, Check, Plus } from 'lucide-react';
import { curriculumData, curriculumStats, type Program, type Course } from '@/lib/curriculum-data';

export default function CurriculumPage() {
  const [expandedFaculty, setExpandedFaculty] = useState<string | null>('fac-1');
  const [expandedDept, setExpandedDept] = useState<string | null>('dept-1');
  const [expandedProgram, setExpandedProgram] = useState<string | null>('prog-1');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [viewMode, setViewMode] = useState<'structure' | 'table'>('structure');

  const toggleFaculty = (id: string) => {
    setExpandedFaculty(expandedFaculty === id ? null : id);
  };

  const toggleDept = (id: string) => {
    setExpandedDept(expandedDept === id ? null : id);
  };

  const toggleProgram = (id: string) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  const renderCurriculumTable = (program: Program) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">Course Code</th>
              <th className="px-4 py-3 text-left font-semibold">Course Title</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Unit</th>
              <th className="px-4 py-3 text-center font-semibold">Semester</th>
              <th className="px-4 py-3 text-center font-semibold">Level</th>
            </tr>
          </thead>
          <tbody>
            {program.levels.map((level, levelIdx) => (
              level.semesters.map((semester, semIdx) => (
                semester.courses.map((course, courseIdx) => (
                  <tr 
                    key={`${level.number}-${semester.number}-${course.code}`}
                    className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                      course.status === 'C' ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-blue-600">{course.code}</td>
                    <td className="px-4 py-3 text-gray-800">{course.title}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'C' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {course.status === 'C' ? (
                          <>
                            <Check className="w-3 h-3 mr-1" /> Compulsory
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 mr-1" /> Elective
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">{course.unit}</td>
                    <td className="px-4 py-3 text-center">{semester.number}</td>
                    <td className="px-4 py-3 text-center">{program.code.endsWith('-HND') ? 'HND' : 'ND'} {level.number}</td>
                  </tr>
                ))
              ))
            ))}
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 font-bold">
              <td colSpan={3} className="px-4 py-3 text-right">Total Credits:</td>
              <td className="px-4 py-3 text-center text-lg text-blue-600">{program.totalUnits}</td>
              <td colSpan={2} className="px-4 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Curriculum Management
            </h1>
            <p className="text-gray-600">InnovaSci Open Polytechnic - ND & HND Programs</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
      >
        <div className="bg-white rounded-xl p-5 shadow-md border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{curriculumStats.totalFaculties}</p>
              <p className="text-sm text-gray-500">Schools/Faculties</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{curriculumStats.totalDepartments}</p>
              <p className="text-sm text-gray-500">Departments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{curriculumStats.totalPrograms}</p>
              <p className="text-sm text-gray-500">Programs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{curriculumStats.totalCourses}</p>
              <p className="text-sm text-gray-500">Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md border border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{curriculumStats.totalCredits}</p>
              <p className="text-sm text-gray-500">Total Credits</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curriculum Structure Tree */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Academic Structure
            </h2>
          </div>
          <div className="p-4 max-h-[600px] overflow-y-auto">
            {curriculumData.map((faculty) => (
              <div key={faculty.id} className="mb-4">
                <button
                  onClick={() => toggleFaculty(faculty.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all mb-2"
                >
                  {expandedFaculty === faculty.id ? (
                    <ChevronDown className="w-4 h-4 text-blue-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                  )}
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{faculty.name}</p>
                    <p className="text-xs text-gray-500">{faculty.departments.length} Departments</p>
                  </div>
                </button>

                {expandedFaculty === faculty.id && (
                  <div className="ml-6 space-y-2">
                    {faculty.departments.map((dept) => (
                      <div key={dept.id}>
                        <button
                          onClick={() => toggleDept(dept.id)}
                          className="w-full flex items-center gap-2 p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-all"
                        >
                          {expandedDept === dept.id ? (
                            <ChevronDown className="w-3 h-3 text-purple-600" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-purple-600" />
                          )}
                          <GraduationCap className="w-4 h-4 text-purple-600" />
                          <div className="text-left flex-1">
                            <p className="font-medium text-gray-700 text-sm">{dept.name}</p>
                            <p className="text-xs text-gray-500">{dept.programs.length} Programs</p>
                          </div>
                        </button>

                        {expandedDept === dept.id && (
                          <div className="ml-5 space-y-1 mt-1">
                            {dept.programs.map((program) => (
                              <button
                                key={program.id}
                                onClick={() => {
                                  toggleProgram(program.id);
                                  setSelectedProgram(program);
                                  setViewMode('table');
                                }}
                                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all ${
                                  selectedProgram?.id === program.id
                                    ? 'bg-green-100 border border-green-300'
                                    : 'bg-green-50 hover:bg-green-100'
                                }`}
                              >
                                <GraduationCap className="w-4 h-4 text-green-600" />
                                <div className="text-left flex-1">
                                  <p className="font-medium text-gray-700 text-xs">{program.name}</p>
                                  <p className="text-xs text-gray-500">{program.code} - {program.totalUnits} Credits</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Curriculum Table View */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" />
              {selectedProgram ? selectedProgram.name : 'Select a Program'}
            </h2>
            {selectedProgram && (
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-blue-700">{selectedProgram.code}</span>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-green-700">{selectedProgram.totalUnits} Credits</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-5">
            {selectedProgram ? (
              renderCurriculumTable(selectedProgram)
            ) : (
              <div className="text-center py-16">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Select a program from the structure to view its curriculum</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Semester Breakdown */}
      {selectedProgram && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {selectedProgram.levels.map((level) => (
            level.semesters.map((semester) => (
              <div 
                key={`${level.number}-${semester.number}`}
                className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800">ND {level.number} - Semester {semester.number}</h3>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {semester.totalUnits} Credits
                  </span>
                </div>
                <div className="space-y-1">
                  {semester.courses.map((course) => (
                    <div key={course.code} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{course.code}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        course.status === 'C' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                      }`}>
                        {course.unit} cr
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ))}
        </motion.div>
      )}
    </div>
  );
}