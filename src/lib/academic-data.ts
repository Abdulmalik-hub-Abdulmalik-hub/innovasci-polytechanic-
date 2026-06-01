// =====================================================
// INNOVASCI AI LABS POLYTECHNIC - ACADEMIC DATA HOOKS
// Role-based data fetching for Dean, HOD, Programme Coordinator
// =====================================================

import { UserRole } from '@/types';

// Academic unit types
export interface Faculty {
  id: string;
  name: string;
  code: string;
  description?: string;
  headName?: string;
  headTitle?: string;
  totalDepartments: number;
  totalProgrammes: number;
  totalLecturers: number;
  totalStudents: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  facultyName: string;
  hodId?: string;
  hodName?: string;
  totalProgrammes: number;
  totalLecturers: number;
  totalStudents: number;
}

export interface Programme {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  departmentName: string;
  facultyId: string;
  facultyName: string;
  type: 'ND' | 'HND';
  duration: number;
  totalLevels: number;
  totalStudents: number;
  totalCourses: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  semester: number;
  level: number;
  type: 'compulsory' | 'elective';
  lecturerId?: string;
  lecturerName?: string;
  totalStudents: number;
  passRate?: number;
}

// Role to academic unit mapping
export interface AcademicAssignment {
  role: UserRole;
  facultyId?: string;
  facultyName?: string;
  departmentId?: string;
  departmentName?: string;
  programmeId?: string;
  programmeName?: string;
  programmeType?: 'ND' | 'HND';
}

// Demo data for seeded academic structure
// In production, this would be fetched from Supabase

// Seeded Faculties (5 Schools)
export const SEEDED_FACULTIES: Faculty[] = [
  {
    id: 'f1',
    name: 'School of AI & Computational Intelligence',
    code: 'SAI',
    description: 'Artificial Intelligence, Machine Learning, and Data Science',
    headName: 'Prof. Emeka Okonkwo',
    headTitle: 'Dean of School',
    totalDepartments: 3,
    totalProgrammes: 6,
    totalLecturers: 24,
    totalStudents: 312,
  },
  {
    id: 'f2',
    name: 'School of Engineering',
    code: 'SOE',
    description: 'Electrical, Electronics, and Computer Engineering',
    headName: 'Prof. Aisha Bello',
    headTitle: 'Dean of School',
    totalDepartments: 4,
    totalProgrammes: 8,
    totalLecturers: 36,
    totalStudents: 428,
  },
  {
    id: 'f3',
    name: 'School of Business',
    code: 'SOB',
    description: 'Business Administration, Accounting, and Finance',
    headName: 'Dr. Chidi Okafor',
    headTitle: 'Dean of School',
    totalDepartments: 3,
    totalProgrammes: 6,
    totalLecturers: 18,
    totalStudents: 256,
  },
  {
    id: 'f4',
    name: 'School of Applied Sciences',
    code: 'SAS',
    description: 'Laboratory Technology, Statistics, and Sciences',
    headName: 'Prof. Folake Adeyemi',
    headTitle: 'Dean of School',
    totalDepartments: 3,
    totalProgrammes: 6,
    totalLecturers: 21,
    totalStudents: 198,
  },
  {
    id: 'f5',
    name: 'School of Cybersecurity & Cloud Computing',
    code: 'SCC',
    description: 'Ethical Hacking, Cybersecurity, and Cloud Technologies',
    headName: 'Dr. Ibrahim Musa',
    headTitle: 'Dean of School',
    totalDepartments: 2,
    totalProgrammes: 4,
    totalLecturers: 15,
    totalStudents: 142,
  },
];

// Seeded Departments (15 Departments)
export const SEEDED_DEPARTMENTS: Department[] = [
  // SAI Departments
  { id: 'd1', name: 'Artificial Intelligence & Machine Learning', code: 'AIML', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', hodId: 'u2', hodName: 'Dr. Grace Nnamdi', totalProgrammes: 2, totalLecturers: 8, totalStudents: 104 },
  { id: 'd2', name: 'Data Science & Analytics', code: 'DSA', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', hodId: 'u3', hodName: 'Dr. Tunde Bakare', totalProgrammes: 2, totalLecturers: 8, totalStudents: 112 },
  { id: 'd3', name: 'Robotics & Intelligent Systems', code: 'RIS', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', hodId: 'u4', hodName: 'Engr. Chioma Eze', totalProgrammes: 2, totalLecturers: 8, totalStudents: 96 },
  // SOE Departments
  { id: 'd4', name: 'Electrical/Electronic Engineering', code: 'EEE', facultyId: 'f2', facultyName: 'School of Engineering', hodId: 'u5', hodName: 'Prof. Segun Fashola', totalProgrammes: 2, totalLecturers: 10, totalStudents: 128 },
  { id: 'd5', name: 'Computer Engineering', code: 'CE', facultyId: 'f2', facultyName: 'School of Engineering', hodId: 'u6', hodName: 'Dr. Adaeze Obi', totalProgrammes: 2, totalLecturers: 9, totalStudents: 104 },
  { id: 'd6', name: 'Telecommunications Engineering', code: 'TCE', facultyId: 'f2', facultyName: 'School of Engineering', hodId: 'u7', hodName: 'Engr. Olumide Adeyemi', totalProgrammes: 2, totalLecturers: 8, totalStudents: 88 },
  { id: 'd7', name: 'Mechatronics Engineering', code: 'MCE', facultyId: 'f2', facultyName: 'School of Engineering', hodId: 'u8', hodName: 'Dr. Ngozi Udechukwu', totalProgrammes: 2, totalLecturers: 9, totalStudents: 108 },
  // SOB Departments
  { id: 'd8', name: 'Business Administration', code: 'BA', facultyId: 'f3', facultyName: 'School of Business', hodId: 'u9', hodName: 'Dr. Emeka Nwosu', totalProgrammes: 2, totalLecturers: 6, totalStudents: 96 },
  { id: 'd9', name: 'Accounting', code: 'ACC', facultyId: 'f3', facultyName: 'School of Business', hodId: 'u10', hodName: 'Prof. Binta Garba', totalProgrammes: 2, totalLecturers: 6, totalStudents: 88 },
  { id: 'd10', name: 'Banking & Finance', code: 'BF', facultyId: 'f3', facultyName: 'School of Business', hodId: 'u11', hodName: 'Dr. Yemi Adebayo', totalProgrammes: 2, totalLecturers: 6, totalStudents: 72 },
  // SAS Departments
  { id: 'd11', name: 'Science Laboratory Technology', code: 'SLT', facultyId: 'f4', facultyName: 'School of Applied Sciences', hodId: 'u12', hodName: 'Dr. Halima Musa', totalProgrammes: 2, totalLecturers: 7, totalStudents: 72 },
  { id: 'd12', name: 'Statistics', code: 'STA', facultyId: 'f4', facultyName: 'School of Applied Sciences', hodId: 'u13', hodName: 'Prof. Chinedu Eze', totalProgrammes: 2, totalLecturers: 7, totalStudents: 64 },
  { id: 'd13', name: 'Biotechnology', code: 'BIT', facultyId: 'f4', facultyName: 'School of Applied Sciences', hodId: 'u14', hodName: 'Dr. Amaka Okonkwo', totalProgrammes: 2, totalLecturers: 7, totalStudents: 62 },
  // SCC Departments
  { id: 'd14', name: 'Cyber Security', code: 'CS', facultyId: 'f5', facultyName: 'School of Cybersecurity & Cloud Computing', hodId: 'u15', hodName: 'Dr. Faruk Abubakar', totalProgrammes: 2, totalLecturers: 8, totalStudents: 82 },
  { id: 'd15', name: 'Cloud Computing', code: 'CC', facultyId: 'f5', facultyName: 'School of Cybersecurity & Cloud Computing', hodId: 'u16', hodName: 'Engr. Blessing Okafor', totalProgrammes: 2, totalLecturers: 7, totalStudents: 60 },
];

// Seeded Programmes (45 Programmes - 3 per department)
export const SEEDED_PROGRAMMES: Programme[] = [
  // AIML Programmes
  { id: 'p1', name: 'Applied Machine Learning', code: 'AML', departmentId: 'd1', departmentName: 'Artificial Intelligence & Machine Learning', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 56, totalCourses: 24 },
  { id: 'p2', name: 'Applied Machine Learning (HND)', code: 'AMLH', departmentId: 'd1', departmentName: 'Artificial Intelligence & Machine Learning', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 48, totalCourses: 28 },
  // DSA Programmes
  { id: 'p3', name: 'Data Science', code: 'DSC', departmentId: 'd2', departmentName: 'Data Science & Analytics', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 60, totalCourses: 24 },
  { id: 'p4', name: 'Data Science (HND)', code: 'DSCH', departmentId: 'd2', departmentName: 'Data Science & Analytics', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 52, totalCourses: 28 },
  // RIS Programmes
  { id: 'p5', name: 'Robotics & Automation', code: 'ROB', departmentId: 'd3', departmentName: 'Robotics & Intelligent Systems', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 48, totalCourses: 24 },
  { id: 'p6', name: 'Robotics & Automation (HND)', code: 'ROBH', departmentId: 'd3', departmentName: 'Robotics & Intelligent Systems', facultyId: 'f1', facultyName: 'School of AI & Computational Intelligence', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 48, totalCourses: 28 },
  // EEE Programmes
  { id: 'p7', name: 'Electrical/Electronic Engineering', code: 'ELE', departmentId: 'd4', departmentName: 'Electrical/Electronic Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 68, totalCourses: 26 },
  { id: 'p8', name: 'Electrical/Electronic Engineering (HND)', code: 'ELEH', departmentId: 'd4', departmentName: 'Electrical/Electronic Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 60, totalCourses: 30 },
  // CE Programmes
  { id: 'p9', name: 'Computer Engineering', code: 'CPE', departmentId: 'd5', departmentName: 'Computer Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 56, totalCourses: 26 },
  { id: 'p10', name: 'Computer Engineering (HND)', code: 'CPEH', departmentId: 'd5', departmentName: 'Computer Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 48, totalCourses: 30 },
  // TCE Programmes
  { id: 'p11', name: 'Telecommunications Engineering', code: 'TCO', departmentId: 'd6', departmentName: 'Telecommunications Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 44, totalCourses: 26 },
  { id: 'p12', name: 'Telecommunications Engineering (HND)', code: 'TCOH', departmentId: 'd6', departmentName: 'Telecommunications Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 44, totalCourses: 30 },
  // MCE Programmes
  { id: 'p13', name: 'Mechatronics Engineering', code: 'MCT', departmentId: 'd7', departmentName: 'Mechatronics Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 56, totalCourses: 26 },
  { id: 'p14', name: 'Mechatronics Engineering (HND)', code: 'MCTH', departmentId: 'd7', departmentName: 'Mechatronics Engineering', facultyId: 'f2', facultyName: 'School of Engineering', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 52, totalCourses: 30 },
  // BA Programmes
  { id: 'p15', name: 'Business Administration', code: 'BAD', departmentId: 'd8', departmentName: 'Business Administration', facultyId: 'f3', facultyName: 'School of Business', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 52, totalCourses: 24 },
  { id: 'p16', name: 'Business Administration (HND)', code: 'BADH', departmentId: 'd8', departmentName: 'Business Administration', facultyId: 'f3', facultyName: 'School of Business', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 44, totalCourses: 28 },
  // ACC Programmes
  { id: 'p17', name: 'Accounting', code: 'ACT', departmentId: 'd9', departmentName: 'Accounting', facultyId: 'f3', facultyName: 'School of Business', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 48, totalCourses: 24 },
  { id: 'p18', name: 'Accounting (HND)', code: 'ACTH', departmentId: 'd9', departmentName: 'Accounting', facultyId: 'f3', facultyName: 'School of Business', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 40, totalCourses: 28 },
  // BF Programmes
  { id: 'p19', name: 'Banking & Finance', code: 'BNF', departmentId: 'd10', departmentName: 'Banking & Finance', facultyId: 'f3', facultyName: 'School of Business', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 40, totalCourses: 24 },
  { id: 'p20', name: 'Banking & Finance (HND)', code: 'BNFH', departmentId: 'd10', departmentName: 'Banking & Finance', facultyId: 'f3', facultyName: 'School of Business', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 32, totalCourses: 28 },
  // SLT Programmes
  { id: 'p21', name: 'Science Laboratory Technology', code: 'SLT', departmentId: 'd11', departmentName: 'Science Laboratory Technology', facultyId: 'f4', facultyName: 'School of Applied Sciences', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 40, totalCourses: 26 },
  { id: 'p22', name: 'Science Laboratory Technology (HND)', code: 'SLTH', departmentId: 'd11', departmentName: 'Science Laboratory Technology', facultyId: 'f4', facultyName: 'School of Applied Sciences', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 32, totalCourses: 30 },
  // STA Programmes
  { id: 'p23', name: 'Statistics', code: 'STT', departmentId: 'd12', departmentName: 'Statistics', facultyId: 'f4', facultyName: 'School of Applied Sciences', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 36, totalCourses: 24 },
  { id: 'p24', name: 'Statistics (HND)', code: 'STTH', departmentId: 'd12', departmentName: 'Statistics', facultyId: 'f4', facultyName: 'School of Applied Sciences', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 28, totalCourses: 28 },
  // BIT Programmes
  { id: 'p25', name: 'Biotechnology', code: 'BIT', departmentId: 'd13', departmentName: 'Biotechnology', facultyId: 'f4', facultyName: 'School of Applied Sciences', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 34, totalCourses: 26 },
  { id: 'p26', name: 'Biotechnology (HND)', code: 'BITH', departmentId: 'd13', departmentName: 'Biotechnology', facultyId: 'f4', facultyName: 'School of Applied Sciences', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 28, totalCourses: 30 },
  // CS Programmes
  { id: 'p27', name: 'Ethical Hacking & Penetration Testing', code: 'EHP', departmentId: 'd14', departmentName: 'Cyber Security', facultyId: 'f5', facultyName: 'School of Cybersecurity & Cloud Computing', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 44, totalCourses: 24 },
  { id: 'p28', name: 'Ethical Hacking & Penetration Testing (HND)', code: 'EHPH', departmentId: 'd14', departmentName: 'Cyber Security', facultyId: 'f5', facultyName: 'School of Cybersecurity & Cloud Computing', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 38, totalCourses: 28 },
  // CC Programmes
  { id: 'p29', name: 'Cloud Computing', code: 'CLO', departmentId: 'd15', departmentName: 'Cloud Computing', facultyId: 'f5', facultyName: 'School of Cybersecurity & Cloud Computing', type: 'ND', duration: 2, totalLevels: 2, totalStudents: 32, totalCourses: 24 },
  { id: 'p30', name: 'Cloud Computing (HND)', code: 'CLOH', departmentId: 'd15', departmentName: 'Cloud Computing', facultyId: 'f5', facultyName: 'School of Cybersecurity & Cloud Computing', type: 'HND', duration: 2, totalLevels: 2, totalStudents: 28, totalCourses: 28 },
];

// Demo courses (per programme)
export const PROGRAMME_COURSES: Record<string, Course[]> = {
  'AML': [
    { id: 'c1', code: 'AML 111', title: 'Linear Algebra for AI', credits: 3, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l1', lecturerName: 'Dr. Fatima Hassan', totalStudents: 56, passRate: 78 },
    { id: 'c2', code: 'AML 112', title: 'Python Programming', credits: 3, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l2', lecturerName: 'Mr. Chidi Nwachukwu', totalStudents: 56, passRate: 85 },
    { id: 'c3', code: 'AML 113', title: 'Introduction to Data Science', credits: 2, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l3', lecturerName: 'Prof. Emeka Okonkwo', totalStudents: 56, passRate: 82 },
    { id: 'c4', code: 'AML 114', title: 'Calculus for AI', credits: 3, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l1', lecturerName: 'Dr. Fatima Hassan', totalStudents: 56, passRate: 75 },
    { id: 'c5', code: 'AML 115', title: 'Statistics & Probability', credits: 3, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l4', lecturerName: 'Dr. Grace Nnamdi', totalStudents: 56, passRate: 80 },
    { id: 'c6', code: 'AML 121', title: 'Machine Learning Fundamentals', credits: 4, semester: 2, level: 1, type: 'compulsory', lecturerId: 'l2', lecturerName: 'Mr. Chidi Nwachukwu', totalStudents: 56, passRate: 72 },
  ],
  'DSC': [
    { id: 'c7', code: 'DSC 111', title: 'Data Analysis with Python', credits: 3, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l5', lecturerName: 'Mr. Tunde Bakare', totalStudents: 60, passRate: 88 },
    { id: 'c8', code: 'DSC 112', title: 'Database Systems', credits: 3, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l6', lecturerName: 'Dr. Ada Nnaji', totalStudents: 60, passRate: 84 },
    { id: 'c9', code: 'DSC 113', title: 'Business Intelligence', credits: 2, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l5', lecturerName: 'Mr. Tunde Bakare', totalStudents: 60, passRate: 90 },
    { id: 'c10', code: 'DSC 114', title: 'Data Visualization', credits: 3, semester: 1, level: 1, type: 'compulsory', lecturerId: 'l6', lecturerName: 'Dr. Ada Nnaji', totalStudents: 60, passRate: 86 },
  ],
};

// Helper functions to get data by role assignment
export function getFacultyById(facultyId: string): Faculty | undefined {
  return SEEDED_FACULTIES.find(f => f.id === facultyId);
}

export function getDepartmentById(departmentId: string): Department | undefined {
  return SEEDED_DEPARTMENTS.find(d => d.id === departmentId);
}

export function getProgrammeById(programmeId: string): Programme | undefined {
  return SEEDED_PROGRAMMES.find(p => p.id === programmeId);
}

export function getDepartmentsByFaculty(facultyId: string): Department[] {
  return SEEDED_DEPARTMENTS.filter(d => d.facultyId === facultyId);
}

export function getProgrammesByFaculty(facultyId: string): Programme[] {
  return SEEDED_PROGRAMMES.filter(p => p.facultyId === facultyId);
}

export function getProgrammesByDepartment(departmentId: string): Programme[] {
  return SEEDED_PROGRAMMES.filter(p => p.departmentId === departmentId);
}

export function getCoursesByProgramme(programmeCode: string): Course[] {
  return PROGRAMME_COURSES[programmeCode] || [];
}

// Get academic assignment based on user role and profile
export function getAcademicAssignment(userRole: UserRole, userId: string, userFacultyId?: string, userDepartmentId?: string, userProgrammeId?: string): AcademicAssignment {
  const baseAssignment: AcademicAssignment = { role: userRole };

  switch (userRole) {
    case 'dean':
      if (userFacultyId) {
        const faculty = getFacultyById(userFacultyId);
        return {
          ...baseAssignment,
          facultyId: userFacultyId,
          facultyName: faculty?.name,
        };
      }
      // Demo: Assume first faculty for demonstration
      return {
        ...baseAssignment,
        facultyId: SEEDED_FACULTIES[0].id,
        facultyName: SEEDED_FACULTIES[0].name,
      };

    case 'hod':
      if (userDepartmentId) {
        const dept = getDepartmentById(userDepartmentId);
        return {
          ...baseAssignment,
          departmentId: userDepartmentId,
          departmentName: dept?.name,
          facultyId: dept?.facultyId,
          facultyName: dept?.facultyName,
        };
      }
      // Demo: Assume first department for demonstration
      return {
        ...baseAssignment,
        departmentId: SEEDED_DEPARTMENTS[0].id,
        departmentName: SEEDED_DEPARTMENTS[0].name,
        facultyId: SEEDED_DEPARTMENTS[0].facultyId,
        facultyName: SEEDED_DEPARTMENTS[0].facultyName,
      };

    case 'program_coordinator':
      if (userProgrammeId) {
        const prog = getProgrammeById(userProgrammeId);
        return {
          ...baseAssignment,
          programmeId: userProgrammeId,
          programmeName: prog?.name,
          programmeType: prog?.type,
          departmentId: prog?.departmentId,
          departmentName: prog?.departmentName,
          facultyId: prog?.facultyId,
          facultyName: prog?.facultyName,
        };
      }
      // Demo: Assume first programme for demonstration
      const demoProgramme = SEEDED_PROGRAMMES[0];
      return {
        ...baseAssignment,
        programmeId: demoProgramme.id,
        programmeName: demoProgramme.name,
        programmeType: demoProgramme.type,
        departmentId: demoProgramme.departmentId,
        departmentName: demoProgramme.departmentName,
        facultyId: demoProgramme.facultyId,
        facultyName: demoProgramme.facultyName,
      };

    default:
      return baseAssignment;
  }
}

// Role-specific data getters
export function getDeanData(facultyId: string) {
  const faculty = getFacultyById(facultyId);
  if (!faculty) return null;

  const departments = getDepartmentsByFaculty(facultyId);
  const programmes = getProgrammesByFaculty(facultyId);
  const ndProgrammes = programmes.filter(p => p.type === 'ND');
  const hndProgrammes = programmes.filter(p => p.type === 'HND');

  return {
    faculty,
    departments,
    programmes,
    ndProgrammes,
    hndProgrammes,
    statistics: {
      totalDepartments: departments.length,
      totalProgrammes: programmes.length,
      totalLecturers: faculty.totalLecturers,
      totalStudents: faculty.totalStudents,
    },
  };
}

export function getHodData(departmentId: string) {
  const department = getDepartmentById(departmentId);
  if (!department) return null;

  const faculty = getFacultyById(department.facultyId);
  const programmes = getProgrammesByDepartment(departmentId);
  const ndProgrammes = programmes.filter(p => p.type === 'ND');
  const hndProgrammes = programmes.filter(p => p.type === 'HND');

  return {
    department,
    faculty,
    programmes,
    ndProgrammes,
    hndProgrammes,
    statistics: {
      totalProgrammes: programmes.length,
      totalLecturers: department.totalLecturers,
      totalStudents: department.totalStudents,
    },
  };
}

export function getProgrammeCoordinatorData(programmeId: string) {
  const programme = getProgrammeById(programmeId);
  if (!programme) return null;

  const department = getDepartmentById(programme.departmentId);
  const faculty = getFacultyById(programme.facultyId);
  const courses = getCoursesByProgramme(programme.code);

  return {
    programme,
    department,
    faculty,
    courses,
    statistics: {
      totalStudents: programme.totalStudents,
      totalCourses: programme.totalCourses,
      curriculumCoverage: Math.round((courses.length / programme.totalCourses) * 100),
    },
  };
}