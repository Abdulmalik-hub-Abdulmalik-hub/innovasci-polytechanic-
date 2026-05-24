-- ============================================
-- INNOVASCI AI LABS POLYTECHNIC
-- COMPLETE SUPABASE DATABASE SCHEMA v2
-- With Full ND Curriculum Structure
-- ============================================

-- ============================================
-- SECTION 1: ENUM TYPES
-- ============================================

-- User Roles
CREATE TYPE user_role AS ENUM (
    'super_admin',
    'system_admin',
    'admission_officer',
    'finance_officer',
    'exam_officer',
    'student_affairs',
    'dean',
    'hod',
    'lecturer',
    'staff',
    'student'
);

-- Academic Status
CREATE TYPE academic_status AS ENUM (
    'active',
    'graduated',
    'suspended',
    'withdrawn',
    'deferred'
);

-- Payment Status
CREATE TYPE payment_status AS ENUM (
    'pending',
    'verified',
    'failed',
    'refunded'
);

-- Course Status (Compulsory/Elective)
CREATE TYPE course_status AS ENUM (
    'compulsory',
    'elective'
);

-- ============================================
-- SECTION 2: CORE TABLES
-- ============================================

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    phone VARCHAR(50),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Faculties (Schools)
CREATE TABLE faculties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    head_name VARCHAR(255),
    head_title VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES faculties(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    hod_id UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs (ND/HND)
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID NOT NULL REFERENCES departments(id),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('ND', 'HND')),
    duration_years INTEGER DEFAULT 2,
    total_credits INTEGER DEFAULT 72,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Levels
CREATE TABLE levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES programs(id),
    number INTEGER NOT NULL CHECK (number >= 1 AND number <= 4),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(program_id, number)
);

-- Semesters
CREATE TABLE semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID NOT NULL REFERENCES levels(id),
    number INTEGER NOT NULL CHECK (number IN (1, 2)),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(level_id, number)
);

-- ============================================
-- SECTION 3: CURRICULUM & COURSES
-- ============================================

-- Courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 3 CHECK (credits >= 1 AND credits <= 6),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    status course_status DEFAULT 'compulsory',
    lecturer_id UUID REFERENCES users(id),
    pass_mark INTEGER DEFAULT 40,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 4: STUDENT MANAGEMENT
-- ============================================

-- Students
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id),
    admission_number VARCHAR(50) UNIQUE NOT NULL,
    program_id UUID NOT NULL REFERENCES programs(id),
    level_id UUID NOT NULL REFERENCES levels(id),
    current_semester_id UUID REFERENCES semesters(id),
    academic_status academic_status DEFAULT 'active',
    entry_year INTEGER,
    cgpa DECIMAL(4, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Registrations
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    status VARCHAR(20) DEFAULT 'registered' CHECK (status IN ('registered', 'completed', 'carryover', 'repeat')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester_id)
);

-- ============================================
-- SECTION 5: RESULTS & GRADING
-- ============================================

-- Results
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    ca_score INTEGER DEFAULT 0,
    exam_score INTEGER DEFAULT 0,
    total_score INTEGER GENERATED ALWAYS AS (ca_score + exam_score) STORED,
    grade VARCHAR(5),
    grade_point DECIMAL(4, 2),
    is_repeat BOOLEAN DEFAULT false,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester_id)
);

-- GPA Records
CREATE TABLE gpa_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    gpa DECIMAL(4, 2) NOT NULL,
    total_credits INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, semester_id)
);

-- ============================================
-- SECTION 6: PAYMENTS
-- ============================================

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    amount DECIMAL(12, 2) NOT NULL,
    reference VARCHAR(100),
    status payment_status DEFAULT 'pending',
    semester_id UUID REFERENCES semesters(id),
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 7: EXAMINATIONS
-- ============================================

CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    total_questions INTEGER DEFAULT 50,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES exams(id),
    student_id UUID NOT NULL REFERENCES students(id),
    answers JSONB DEFAULT '{}',
    score INTEGER,
    status VARCHAR(20) DEFAULT 'in_progress',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ
);

-- ============================================
-- SECTION 8: ATTENDANCE
-- ============================================

CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    lecture_date DATE NOT NULL,
    is_present BOOLEAN DEFAULT false,
    marked_by UUID REFERENCES users(id),
    marked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, lecture_date)
);

-- ============================================
-- SECTION 9: ASSIGNMENTS
-- ============================================

CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    max_score INTEGER DEFAULT 100,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES assignments(id),
    student_id UUID NOT NULL REFERENCES students(id),
    content TEXT,
    file_url TEXT,
    score INTEGER,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    graded_by UUID REFERENCES users(id),
    graded_at TIMESTAMPTZ
);

-- ============================================
-- SECTION 10: ANNOUNCEMENTS
-- ============================================

CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id),
    target_audience VARCHAR(50) DEFAULT 'all',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 11: INDEXES
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_admission ON students(admission_number);
CREATE INDEX idx_courses_semester ON courses(semester_id);
CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_registrations_student ON registrations(student_id);
CREATE INDEX idx_results_student ON results(student_id);

-- ============================================
-- SECTION 12: SEED DATA - CURRICULUM
-- ============================================

-- Faculty 1: School of Artificial Intelligence & Computational Intelligence
INSERT INTO faculties (id, name, code, description, head_name, head_title) VALUES
('f1', 'School of Artificial Intelligence & Computational Intelligence', 'SAICI', 'AI, ML, and computational programs', 'Prof. Dr. Emmanuel Obi', 'Dean');

-- Department 1: Artificial Intelligence & Machine Learning
INSERT INTO departments (id, faculty_id, name, code, description) VALUES
('d1', 'f1', 'Artificial Intelligence & Machine Learning', 'AIML', 'AI and ML research and teaching');

-- Programs for Dept 1
INSERT INTO programs (id, department_id, name, code, type, duration_years, total_credits) VALUES
('p1', 'd1', 'Diploma in Applied Machine Learning', 'AML', 'ND', 2, 72),
('p2', 'd1', 'Diploma in Natural Language Processing', 'NLP', 'ND', 2, 72),
('p3', 'd1', 'Diploma in Deep Learning & Neural Systems', 'DLN', 'ND', 2, 72);

-- Department 2: Computational Science & Simulation
INSERT INTO departments (id, faculty_id, name, code, description) VALUES
('d2', 'f1', 'Computational Science & Simulation', 'CSS', 'Computational science and simulation');

INSERT INTO programs (id, department_id, name, code, type, duration_years, total_credits) VALUES
('p4', 'd2', 'Diploma in Digital Twin Systems', 'DTS', 'ND', 2, 72),
('p5', 'd2', 'Diploma in Predictive Modeling & Analytics', 'PMA', 'ND', 2, 72),
('p6', 'd2', 'Diploma in Computational Physics & Engineering', 'CPE', 'ND', 2, 72);

-- Department 3: Robotics & Autonomous Systems
INSERT INTO departments (id, faculty_id, name, code, description) VALUES
('d3', 'f1', 'Robotics & Autonomous Systems', 'RAS', 'Robotics and autonomous systems');

INSERT INTO programs (id, department_id, name, code, type, duration_years, total_credits) VALUES
('p7', 'd3', 'Diploma in Autonomous Vehicle Technology', 'AVT', 'ND', 2, 72),
('p8', 'd3', 'Diploma in Industrial Robotics & Automation', 'IRA', 'ND', 2, 72),
('p9', 'd3', 'Diploma in Swarm Intelligence & Multi-Agent Systems', 'SIM', 'ND', 2, 72);

-- Faculty 2: School of Bio-Digital Science & Health Informatics
INSERT INTO faculties (id, name, code, description, head_name, head_title) VALUES
('f2', 'School of Bio-Digital Science & Health Informatics', 'SBSHI', 'Bioinformatics and health informatics', 'Dr. Fatima Hassan', 'Dean');

-- Department 4: Bioinformatics & Genomic Data Science
INSERT INTO departments (id, faculty_id, name, code, description) VALUES
('d4', 'f2', 'Bioinformatics & Genomic Data Science', 'BGD', 'Genomics and bioinformatics');

INSERT INTO programs (id, department_id, name, code, type, duration_years, total_credits) VALUES
('p10', 'd4', 'Diploma in Computational Genomics', 'CGM', 'ND', 2, 72),
('p11', 'd4', 'Diploma in Molecular Modeling & Drug Discovery', 'MDD', 'ND', 2, 72),
('p12', 'd4', 'Diploma in Systems Biology', 'SYB', 'ND', 2, 72);

-- Department 5: Digital Health & Telemedicine
INSERT INTO departments (id, faculty_id, name, code, description) VALUES
('d5', 'f2', 'Digital Health & Telemedicine', 'DHT', 'Digital health systems');

INSERT INTO programs (id, department_id, name, code, type, duration_years, total_credits) VALUES
('p13', 'd5', 'Diploma in Health Information Systems', 'HIS', 'ND', 2, 72),
('p14', 'd5', 'Diploma in Telemedicine & Remote Care', 'TRC', 'ND', 2, 72),
('p15', 'd5', 'Diploma in Medical Imaging & Visualization', 'MIV', 'ND', 2, 72);

-- Department 6: Biotechnology & Synthetic Systems
INSERT INTO departments (id, faculty_id, name, code, description) VALUES
('d6', 'f2', 'Biotechnology & Synthetic Systems', 'BSS', 'Biotechnology and synthetic biology');

INSERT INTO programs (id, department_id, name, code, type, duration_years, total_credits) VALUES
('p16', 'd6', 'Diploma in Synthetic Biology Engineering', 'SBE', 'ND', 2, 72),
('p17', 'd6', 'Diploma in Bio-Manufacturing & Processing', 'BMP', 'ND', 2, 72),
('p18', 'd6', 'Diploma in Agricultural Biotechnology', 'ABT', 'ND', 2, 72);

-- Create Levels for all Programs
DO $$
DECLARE
    prog RECORD;
    lvl RECORD;
    lvl_id UUID;
BEGIN
    FOR prog IN SELECT id FROM programs LOOP
        FOR lvl IN SELECT generate_series(1, 2) as num LOOP
            INSERT INTO levels (id, program_id, number, description)
            VALUES (gen_random_uuid(), prog.id, lvl.num, 'ND Level ' || lvl.num)
            ON CONFLICT (program_id, number) DO NOTHING
            RETURNING id INTO lvl_id;
        END LOOP;
    END LOOP;
END $$;

-- Create Semesters and Courses for AML Program (Example)
DO $$
DECLARE
    sem_id UUID;
BEGIN
    -- AML Program - ND 1 Sem 1
    SELECT id INTO sem_id FROM semesters WHERE level_id = (SELECT id FROM levels WHERE program_id = 'p1' AND number = 1) AND number = 1;
    IF sem_id IS NULL THEN
        INSERT INTO semesters (id, level_id, number, is_active) 
        SELECT gen_random_uuid(), id, 1, true FROM levels WHERE program_id = 'p1' AND number = 1
        RETURNING id INTO sem_id;
    END IF;
END $$;

-- ============================================
-- SECTION 13: SUPER ADMIN USER
-- ============================================

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES (
    'u1',
    'webuildandtarinbuilders@gmail.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.',
    'Super Admin',
    'super_admin',
    true,
    true
);

-- ============================================
-- END OF SCHEMA
-- ============================================

