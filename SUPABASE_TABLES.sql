-- ============================================
-- INNOVASCI AI LABS POLYTECHNIC
-- SUPABASE DATABASE SCHEMA
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
    'hod',
    'lecturer',
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

-- Payment Type
CREATE TYPE payment_type AS ENUM (
    'semester',
    'full_program',
    'registration',
    'acceptance'
);

-- Exam Status
CREATE TYPE exam_status AS ENUM (
    'scheduled',
    'active',
    'completed',
    'cancelled'
);

-- Project Stage
CREATE TYPE project_stage AS ENUM (
    'topic',
    'proposal',
    'chapter',
    'correction',
    'final',
    'graded'
);

-- Admission Status
CREATE TYPE admission_status AS ENUM (
    'pending',
    'under_review',
    'approved',
    'rejected'
);

-- Document Type
CREATE TYPE document_type AS ENUM (
    'transcript',
    'testimonial',
    'statement',
    'certificate',
    'id_card'
);

-- Document Status
CREATE TYPE document_status AS ENUM (
    'draft',
    'published',
    'archived'
);

-- ============================================
-- SECTION 2: CORE TABLES
-- ============================================

-- Users Table (All users including students, lecturers, admins)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT email_unique UNIQUE (email)
);

-- User Profile Extension
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender VARCHAR(20),
    state_of_origin VARCHAR(100),
    address TEXT,
    emergency_contact VARCHAR(255),
    emergency_phone VARCHAR(50),
    bio TEXT,
    linkedin_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 3: ACADEMIC STRUCTURE
-- ============================================

-- Faculties
CREATE TABLE faculties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    head_name VARCHAR(255),
    head_title VARCHAR(100),
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    hod_id UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs (ND/HND)
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('ND', 'HND')),
    duration_years INTEGER DEFAULT 2,
    description TEXT,
    requirements TEXT,
    career_opportunities TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Levels
CREATE TABLE levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    number INTEGER NOT NULL CHECK (number >= 1 AND number <= 4),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Semesters
CREATE TABLE semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    number INTEGER NOT NULL CHECK (number IN (1, 2)),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_deadline DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    unit INTEGER NOT NULL DEFAULT 3 CHECK (unit >= 1 AND unit <= 6),
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    type VARCHAR(20) DEFAULT 'compulsory' CHECK (type IN ('compulsory', 'elective')),
    lecturer_id UUID REFERENCES users(id),
    pass_mark INTEGER DEFAULT 40,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 4: STUDENT MANAGEMENT
-- ============================================

-- Student Records
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admission_number VARCHAR(50) UNIQUE NOT NULL,
    program_id UUID NOT NULL REFERENCES programs(id),
    level_id UUID NOT NULL REFERENCES levels(id),
    current_semester_id UUID REFERENCES semesters(id),
    academic_status academic_status DEFAULT 'active',
    entry_year INTEGER,
    graduation_year INTEGER,
    carryovers UUID[] DEFAULT '{}',
    cgpa DECIMAL(4, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Enrollments
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'carryover', 'repeat')),
    score DECIMAL(5, 2),
    grade VARCHAR(5),
    exam_score INTEGER,
    assignment_score INTEGER,
    project_score INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester_id)
);

-- ============================================
-- SECTION 5: PAYMENT SYSTEM
-- ============================================

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    amount DECIMAL(12, 2) NOT NULL,
    type payment_type NOT NULL,
    semester_id UUID REFERENCES semesters(id),
    status payment_status DEFAULT 'pending',
    reference VARCHAR(100),
    paystack_ref VARCHAR(100),
    paystack_amount INTEGER,
    paystack_currency VARCHAR(10) DEFAULT 'NGN',
    payment_proof_url TEXT,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment Access
CREATE TABLE payment_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    access_level VARCHAR(20) DEFAULT 'none' CHECK (access_level IN ('none', 'partial', 'full')),
    paid_amount DECIMAL(12, 2) DEFAULT 0,
    required_amount DECIMAL(12, 2),
    payment_progress INTEGER DEFAULT 0,
    is_unlocked BOOLEAN DEFAULT false,
    unlocked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, semester_id)
);

-- Fee Structure
CREATE TABLE fee_structure (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES programs(id),
    semester_id UUID REFERENCES semesters(id),
    fee_name VARCHAR(255) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    is_mandatory BOOLEAN DEFAULT true,
    due_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 6: EXAMINATION SYSTEM (CBT)
-- ============================================

-- Exams
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 60,
    total_questions INTEGER NOT NULL,
    total_marks INTEGER NOT NULL DEFAULT 100,
    passing_score INTEGER DEFAULT 40,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status exam_status DEFAULT 'scheduled',
    instructions TEXT,
    is_proctored BOOLEAN DEFAULT false,
    allow_review BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Questions Bank
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id),
    question TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]',
    correct_answer INTEGER NOT NULL,
    marks INTEGER NOT NULL DEFAULT 5,
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    explanation TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Attempts
CREATE TABLE exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES exams(id),
    student_id UUID NOT NULL REFERENCES students(id),
    answers JSONB DEFAULT '{}',
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    score INTEGER,
    percentage DECIMAL(5, 2),
    grade VARCHAR(5),
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'submitted', 'expired')),
    tab_switches INTEGER DEFAULT 0,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 7: ASSIGNMENTS & PROJECTS
-- ============================================

-- Assignments
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ NOT NULL,
    max_score INTEGER DEFAULT 100,
    allow_late BOOLEAN DEFAULT false,
    late_penalty_percent INTEGER DEFAULT 10,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignment Submissions
CREATE TABLE assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id),
    content TEXT,
    file_url TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    score INTEGER,
    feedback TEXT,
    graded_by UUID REFERENCES users(id),
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Final Year Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    supervisor_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    stage project_stage DEFAULT 'topic',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'approved', 'rejected')),
    final_grade VARCHAR(5),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Chapters
CREATE TABLE project_chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    file_url TEXT,
    feedback TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'correction')),
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 8: RESULTS & GRADING
-- ============================================

-- Results
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),
    exam_score INTEGER,
    assignment_score INTEGER,
    project_score INTEGER,
    total_score INTEGER,
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
    total_points DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, semester_id)
);

-- ============================================
-- SECTION 9: ADMISSION SYSTEM
-- ============================================

-- Admission Applications
CREATE TABLE admission_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    state VARCHAR(100),
    program_id UUID NOT NULL REFERENCES programs(id),
    entry_level VARCHAR(10) CHECK (entry_level IN ('ND', 'HND')),
    previous_institution VARCHAR(255),
    qualification VARCHAR(100),
    qualifications_file_url TEXT,
    passport_url TEXT,
    personal_statement TEXT,
    status admission_status DEFAULT 'pending',
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 10: ANNOUNCEMENTS & NOTIFICATIONS
-- ============================================

-- Announcements
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES users(id),
    target_audience VARCHAR(50) DEFAULT 'all' CHECK (target_audience IN ('all', 'students', 'lecturers', 'specific')),
    specific_roles user_role[],
    is_published BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    link TEXT,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 11: DOCUMENTS & TRANSCRIPTS
-- ============================================

-- Document Templates (Super Admin uploads)
CREATE TABLE document_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type document_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    template_url TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated Documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    type document_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    file_url TEXT,
    status document_status DEFAULT 'draft',
    verification_code VARCHAR(100) UNIQUE,
    generated_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 12: INSTITUTIONAL ASSETS
-- ============================================

-- Institution Branding
CREATE TABLE institution_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL CHECK (type IN ('logo', 'stamp', 'signature', 'letterhead', 'banner')),
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 13: AUDIT LOGGING
-- ============================================

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    details JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 14: STAFF MANAGEMENT
-- ============================================

-- Staff Records
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id),
    position VARCHAR(100),
    salary DECIMAL(12, 2),
    hire_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff Salary Records
CREATE TABLE salary_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL REFERENCES staff(id),
    amount DECIMAL(12, 2) NOT NULL,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
    paid_at TIMESTAMPTZ,
    paid_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 15: COMMUNITY & FORUMS
-- ============================================

-- Discussion Forums
CREATE TABLE forums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level_id UUID REFERENCES levels(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Posts
CREATE TABLE forum_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    forum_id UUID NOT NULL REFERENCES forums(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(255),
    content TEXT NOT NULL,
    parent_id UUID REFERENCES forum_posts(id),
    is_pinned BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post Reactions
CREATE TABLE post_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    reaction VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, user_id, reaction)
);

-- ============================================
-- SECTION 16: INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_admission ON students(admission_number);
CREATE INDEX idx_students_user ON students(user_id);
CREATE INDEX idx_courses_semester ON courses(semester_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_exams_course ON exams(course_id);
CREATE INDEX idx_exam_attempts_student ON exam_attempts(student_id);
CREATE INDEX idx_results_student ON results(student_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================
-- SECTION 17: ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students view own payments" ON payments FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- ============================================
-- SECTION 18: SEED DATA
-- ============================================

INSERT INTO users (email, password_hash, full_name, role, is_verified, is_active)
VALUES (
    'webuildandtarinbuilders@gmail.com',
    '$2b$12$YourHashedPasswordHere',
    'Super Admin',
    'super_admin',
    true,
    true
);

INSERT INTO faculties (name, code, description, head_name, head_title) VALUES 
    ('Computing & Information Technology', 'CIT', 'Technology and computing programs', 'Dr. Emmanuel Obi', 'Dean'),
    ('Engineering Technology', 'ET', 'Engineering and technical programs', 'Prof. Amina Bello', 'Dean'),
    ('Business Management', 'BM', 'Business and management programs', 'Mr. Chidi Nwachukwu', 'Dean'),
    ('Applied Sciences', 'AS', 'Science and mathematics programs', 'Dr. Fatima Hassan', 'Dean');