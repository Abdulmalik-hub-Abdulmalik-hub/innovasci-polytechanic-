-- ============================================
-- INNOVASCI AI LABS POLYTECHNIC
-- COMPREHENSIVE PRODUCTION DATABASE SCHEMA v3.0
-- Complete Academic Management System
-- Last Updated: 2026-05-25
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
    'student_affairs_officer',
    'dean',
    'hod',
    'lecturer',
    'counselor',
    'librarian',
    ' Bursar',
    'registry_officer',
    'staff',
    'student',
    'alumni'
);

-- Gender Enum
CREATE TYPE gender_type AS ENUM (
    'male',
    'female',
    'other'
);

-- Marital Status
CREATE TYPE marital_status AS ENUM (
    'single',
    'married',
    'divorced',
    'widowed'
);

-- Academic Status
CREATE TYPE academic_status AS ENUM (
    'active',
    'graduated',
    'suspended',
    'withdrawn',
    'deferred',
    'expelled',
    'on_probation'
);

-- Payment Status
CREATE TYPE payment_status AS ENUM (
    'pending',
    'processing',
    'verified',
    'approved',
    'failed',
    'refunded',
    'cancelled'
);

-- Payment Type
CREATE TYPE payment_type AS ENUM (
    'tuition',
    'acceptance_fee',
    'registration',
    'library_fee',
    'sports_fee',
    'medical_fee',
    'development_levy',
    'examination_fee',
    'industrial_training',
    'project_fee',
    'result_checking',
    'certificate_fee',
    'hostel_fee',
    'miscellaneous'
);

-- Course Status (Compulsory/Elective)
CREATE TYPE course_status AS ENUM (
    'compulsory',
    'elective',
    'required'
);

-- Grade Scale
CREATE TYPE grade_letter AS ENUM (
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
);

-- Exam Status
CREATE TYPE exam_status AS ENUM (
    'draft',
    'scheduled',
    'active',
    'completed',
    'cancelled'
);

-- Exam Attempt Status
CREATE TYPE attempt_status AS ENUM (
    'not_started',
    'in_progress',
    'submitted',
    'auto_submitted',
    'graded',
    'reviewed'
);

-- Assignment Status
CREATE TYPE assignment_status AS ENUM (
    'draft',
    'published',
    'closed',
    'graded'
);

-- Submission Status
CREATE TYPE submission_status AS ENUM (
    'pending',
    'submitted',
    'graded',
    'returned'
);

-- Admission Status
CREATE TYPE admission_status AS ENUM (
    'pending',
    'screening',
    'accepted',
    'rejected',
    'deferred',
    'withdrawn'
);

-- Enrollment Status
CREATE TYPE enrollment_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'suspended',
    'graduated'
);

-- Notification Type
CREATE TYPE notification_type AS ENUM (
    'announcement',
    'result',
    'assignment',
    'payment',
    'attendance',
    'system',
    'reminder',
    'alert'
);

-- Attendance Status
CREATE TYPE attendance_status AS ENUM (
    'present',
    'absent',
    'late',
    'excused'
);

-- Document Type
CREATE TYPE document_type AS ENUM (
    'o_level_certificate',
    'birth_certificate',
    'identification',
    'passport_photograph',
    'medical_certificate',
    'transcript',
    'completion_certificate',
    'national_id',
    'other'
);

-- Hostel Status
CREATE TYPE hostel_status AS ENUM (
    'available',
    'full',
    'maintenance'
);

-- Room Type
CREATE TYPE room_type AS ENUM (
    'single',
    'double',
    'triple',
    'dormitory'
);

-- Complaint Status
CREATE TYPE complaint_status AS ENUM (
    'submitted',
    'investigating',
    'resolved',
    'escalated',
    'dismissed'
);

-- Log Level
CREATE TYPE log_level AS ENUM (
    'info',
    'warning',
    'error',
    'critical'
);

-- ============================================
-- SECTION 2: CORE TABLES
-- ============================================

-- Users Table (Authentication & Authorization)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    phone VARCHAR(50),
    alternate_phone VARCHAR(50),
    avatar_url TEXT,
    date_of_birth DATE,
    gender gender_type,
    marital_status marital_status DEFAULT 'single',
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Nigeria',
    nationality VARCHAR(100) DEFAULT 'Nigerian',
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    emergency_contact_relationship VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMPTZ,
    last_login TIMESTAMPTZ,
    last_login_ip VARCHAR(45),
    password_changed_at TIMESTAMPTZ,
    must_change_password BOOLEAN DEFAULT false,
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret VARCHAR(255),
    remember_token VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- User Sessions Table
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_info JSONB DEFAULT '{}',
    token VARCHAR(500),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Permissions Table
CREATE TABLE user_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permission VARCHAR(100) NOT NULL,
    resource VARCHAR(100),
    action VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, permission)
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    log_level log_level DEFAULT 'info',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Password Reset Tokens
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    used_by UUID REFERENCES users(id)
);

-- Email Verification Tokens
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    verified_at TIMESTAMPTZ
);

-- ============================================
-- SECTION 3: INSTITUTIONAL STRUCTURE
-- ============================================

-- Academic Sessions (Session/Year)
CREATE TABLE academic_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    registration_start DATE,
    registration_end DATE,
    result_upload_deadline DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(name)
);

-- Semesters within Sessions
CREATE TABLE session_semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    semester_name VARCHAR(50) NOT NULL,
    semester_number INTEGER NOT NULL CHECK (semester_number IN (1, 2, 3)),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, semester_number)
);

-- Faculties (Schools)
CREATE TABLE faculties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    short_name VARCHAR(50),
    description TEXT,
    vision TEXT,
    mission TEXT,
    head_name VARCHAR(255),
    head_title VARCHAR(100),
    head_email VARCHAR(255),
    head_phone VARCHAR(50),
    office_location VARCHAR(100),
    established_year INTEGER,
    website VARCHAR(255),
    logo_url TEXT,
    banner_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departments
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    short_name VARCHAR(50),
    description TEXT,
    vision TEXT,
    mission TEXT,
    hod_id UUID REFERENCES users(id),
    hod_start_date DATE,
    department_email VARCHAR(255),
    department_phone VARCHAR(50),
    office_location VARCHAR(100),
    established_year INTEGER,
    website VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs (ND/HND)
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    short_name VARCHAR(50),
    type VARCHAR(10) NOT NULL CHECK (type IN ('ND', 'HND', 'Certificate', 'Diploma')),
    duration_years INTEGER DEFAULT 2,
    total_credits INTEGER DEFAULT 72,
    description TEXT,
    program_objectives TEXT,
    admission_requirements TEXT,
    career_opportunities TEXT,
    accreditation_status VARCHAR(50) DEFAULT 'pending',
    accredited_by VARCHAR(255),
    accreditation_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    intake_per_session INTEGER DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Program Levels
CREATE TABLE program_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL CHECK (level_number >= 1 AND level_number <= 4),
    level_name VARCHAR(100),
    description TEXT,
    minimum_credits INTEGER DEFAULT 15,
    maximum_credits INTEGER DEFAULT 30,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(program_id, level_number)
);

-- Course Categories
CREATE TABLE course_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(20) DEFAULT '#6366f1',
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL DEFAULT 3 CHECK (credits >= 1 AND credits <= 10),
    category_id UUID REFERENCES course_categories(id),
    course_type VARCHAR(20) DEFAULT 'theory' CHECK (course_type IN ('theory', 'practical', 'project', 'industrial')),
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    program_level_id UUID NOT NULL REFERENCES program_levels(id),
    status course_status DEFAULT 'compulsory',
    lecturer_id UUID REFERENCES users(id),
    co_lecturer_id UUID REFERENCES users(id),
    pass_mark INTEGER DEFAULT 40,
    ca_weight INTEGER DEFAULT 40,
    exam_weight INTEGER DEFAULT 60,
    minimum_attendance_percent INTEGER DEFAULT 75,
    is_active BOOLEAN DEFAULT true,
    is_lab_course BOOLEAN DEFAULT false,
    lab_hours_per_week DECIMAL(5,2) DEFAULT 0,
    lecture_hours_per_week DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Prerequisites
CREATE TABLE course_prerequisites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    prerequisite_course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    is_mandatory BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, prerequisite_course_id)
);

-- Course Learning Outcomes
CREATE TABLE course_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    outcome_code VARCHAR(20),
    outcome_description TEXT NOT NULL,
    bloom_taxonomy_level VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 4: STUDENT MANAGEMENT
-- ============================================

-- Students Profile
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    admission_number VARCHAR(50) UNIQUE NOT NULL,
    matric_number VARCHAR(50) UNIQUE,
    application_id UUID,
    program_id UUID NOT NULL REFERENCES programs(id),
    program_level_id UUID NOT NULL REFERENCES program_levels(id),
    current_session_id UUID REFERENCES academic_sessions(id),
    current_semester_id UUID REFERENCES session_semesters(id),
    academic_status academic_status DEFAULT 'active',
    entry_requirements_met BOOLEAN DEFAULT true,
    entry_year INTEGER,
    entry_semester INTEGER,
    graduation_year INTEGER,
    graduation_semester INTEGER,
    cgpa DECIMAL(4, 2) DEFAULT 0.00,
    total_credits_earned INTEGER DEFAULT 0,
    total_credits_required INTEGER,
    carryover_courses JSONB DEFAULT '[]',
    semester_bans JSONB DEFAULT '[]',
    disciplinary_notes TEXT,
    special_needs TEXT,
    health_conditions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Admissions
CREATE TABLE admissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(50) UNIQUE NOT NULL,
    personal_information JSONB NOT NULL DEFAULT '{}',
    contact_information JSONB NOT NULL DEFAULT '{}',
    education_background JSONB NOT NULL DEFAULT '[]',
    program_preference UUID REFERENCES programs(id),
    olevel_results JSONB DEFAULT '[]',
    nce_results JSONB,
    employment_history JSONB DEFAULT '[]',
    guarantor_information JSONB DEFAULT '{}',
    status admission_status DEFAULT 'pending',
    screening_score DECIMAL(5,2),
    interview_score DECIMAL(5,2),
    total_score DECIMAL(5,2),
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    admission_letter_url TEXT,
    admission_letter_sent_at TIMESTAMPTZ,
    acceptance_deadline DATE,
    acceptance_confirmed BOOLEAN DEFAULT false,
    acceptance_confirmed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Enrollments by Session/Semester
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    program_id UUID NOT NULL REFERENCES programs(id),
    program_level_id UUID NOT NULL REFERENCES program_levels(id),
    enrollment_status enrollment_status DEFAULT 'pending',
    enrollment_date DATE,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    total_credits INTEGER DEFAULT 0,
    total_fees DECIMAL(12,2) DEFAULT 0,
    fees_paid DECIMAL(12,2) DEFAULT 0,
    is_final_enrollment BOOLEAN DEFAULT false,
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, semester_id)
);

-- Course Registrations
CREATE TABLE course_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    enrollment_id UUID REFERENCES enrollments(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    registration_type VARCHAR(20) DEFAULT 'normal' CHECK (registration_type IN ('normal', 'carryover', 'repeat', 'special')),
    status VARCHAR(20) DEFAULT 'registered' CHECK (status IN ('registered', 'approved', 'dropped', 'completed')),
    registered_by UUID REFERENCES users(id),
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    dropout_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester_id)
);

-- Carryover/Mac Courses Tracking
CREATE TABLE carryover_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    original_course_id UUID NOT NULL REFERENCES courses(id),
    original_semester_id UUID NOT NULL REFERENCES session_semesters(id),
    retake_course_id UUID REFERENCES courses(id),
    retake_semester_id UUID REFERENCES session_semesters(id),
    attempt_count INTEGER DEFAULT 1,
    best_score INTEGER,
    is_cleared BOOLEAN DEFAULT false,
    cleared_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 5: RESULTS & GRADING
-- ============================================

-- Grading System Configuration
CREATE TABLE grading_systems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT false,
    grade_scale JSONB NOT NULL DEFAULT '[
        {"grade": "A", "min_score": 70, "max_score": 100, "grade_point": 4.0, "description": "Excellent"},
        {"grade": "B", "min_score": 60, "max_score": 69, "grade_point": 3.5, "description": "Very Good"},
        {"grade": "C", "min_score": 50, "max_score": 59, "grade_point": 3.0, "description": "Good"},
        {"grade": "D", "min_score": 45, "max_score": 49, "grade_point": 2.5, "description": "Pass"},
        {"grade": "E", "min_score": 40, "max_score": 44, "grade_point": 2.0, "description": "Pass"},
        {"grade": "F", "min_score": 0, "max_score": 39, "grade_point": 0.0, "description": "Fail"}
    ]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Continuous Assessment (CA) Components
CREATE TABLE ca_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    component_name VARCHAR(100) NOT NULL,
    component_type VARCHAR(50) NOT NULL CHECK (component_type IN ('test', 'assignment', 'quiz', 'practical', 'project', 'attendance', 'midterm', 'oral')),
    max_score INTEGER NOT NULL DEFAULT 100,
    weight_percent INTEGER NOT NULL DEFAULT 10 CHECK (weight_percent > 0 AND weight_percent <= 100),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student CA Scores
CREATE TABLE ca_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    ca_component_id UUID NOT NULL REFERENCES ca_components(id),
    score DECIMAL(5,2) DEFAULT 0,
    submitted_by UUID REFERENCES users(id),
    submitted_at TIMESTAMPTZ,
    is_approved BOOLEAN DEFAULT false,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, ca_component_id)
);

-- Final Results
CREATE TABLE results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    ca_score DECIMAL(5,2) DEFAULT 0,
    exam_score DECIMAL(5,2) DEFAULT 0,
    total_score DECIMAL(5,2) GENERATED ALWAYS AS (ca_score + exam_score) STORED,
    grade_letter VARCHAR(5),
    grade_point DECIMAL(4,2) DEFAULT 0,
    quality_points DECIMAL(6,2) DEFAULT 0,
    is_carryover BOOLEAN DEFAULT false,
    is_repeat BOOLEAN DEFAULT false,
    exam_status VARCHAR(20) DEFAULT 'pending' CHECK (exam_status IN ('pending', 'entered', 'approved', 'published', 'challenged')),
    result_status VARCHAR(20) DEFAULT 'pending',
    remarks TEXT,
    entered_by UUID REFERENCES users(id),
    entered_at TIMESTAMPTZ,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    published_by UUID REFERENCES users(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester_id)
);

-- GPA Records per Semester
CREATE TABLE gpa_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    gpa DECIMAL(4,2) NOT NULL,
    total_credits_attempted INTEGER DEFAULT 0,
    total_credits_earned INTEGER DEFAULT 0,
    total_quality_points DECIMAL(8,2) DEFAULT 0,
    is_carry_over BOOLEAN DEFAULT false,
    carry_over_credits INTEGER DEFAULT 0,
    remarks TEXT,
    calculated_by UUID REFERENCES users(id),
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    UNIQUE(student_id, semester_id)
);

-- CGPA Records
CREATE TABLE cgpa_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    semester_id UUID REFERENCES session_semesters(id),
    cgpa DECIMAL(4,2) NOT NULL,
    total_credits_attempted INTEGER DEFAULT 0,
    total_credits_earned INTEGER DEFAULT 0,
    cumulative_quality_points DECIMAL(10,2) DEFAULT 0,
    academic_standing VARCHAR(50),
    class_of_degree VARCHAR(50),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, session_id)
);

-- Academic Standing Records
CREATE TABLE academic_standings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    standing VARCHAR(50) NOT NULL CHECK (standing IN ('good_standing', 'probation', 'academic_warning', 'suspended', ' expelled')),
    reason TEXT,
    effective_date DATE,
    reviewed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 6: PAYMENTS & FINANCES
-- ============================================

-- Fee Structure
CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES programs(id),
    program_level_id UUID REFERENCES program_levels(id),
    session_id UUID REFERENCES academic_sessions(id),
    semester_id UUID REFERENCES session_semesters(id),
    payment_type payment_type NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    description TEXT,
    due_date DATE,
    late_fee_amount DECIMAL(12,2) DEFAULT 0,
    late_fee_grace_days INTEGER DEFAULT 0,
    is_mandatory BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment Records
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    fee_structure_id UUID REFERENCES fee_structures(id),
    amount DECIMAL(12,2) NOT NULL,
    actual_amount DECIMAL(12,2) NOT NULL,
    reference VARCHAR(100) UNIQUE,
    payment_type payment_type NOT NULL,
    payment_method VARCHAR(50) CHECK (payment_method IN ('card', 'bank_transfer', 'ussd', 'cash', 'POS', 'paystack', 'flutterwave')),
    gateway_response JSONB DEFAULT '{}',
    transaction_id VARCHAR(255),
    status payment_status DEFAULT 'pending',
    semester_id UUID REFERENCES session_semesters(id),
    session_id UUID REFERENCES academic_sessions(id),
    description TEXT,
    channel VARCHAR(50),
    bank_name VARCHAR(100),
    teller_number VARCHAR(50),
    payment_date TIMESTAMPTZ,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMPTZ,
    approval_status VARCHAR(20) DEFAULT 'pending',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    receipt_number VARCHAR(50),
    receipt_url TEXT,
    reversal_reference VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment Installments
CREATE TABLE payment_installments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    payment_id UUID REFERENCES payments(id),
    installment_number INTEGER NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    due_date DATE,
    paid_amount DECIMAL(12,2) DEFAULT 0,
    status payment_status DEFAULT 'pending',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student Account/Ledger
CREATE TABLE student_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('credit', 'debit')),
    amount DECIMAL(12,2) NOT NULL,
    balance DECIMAL(12,2) NOT NULL,
    description TEXT,
    reference_id UUID,
    reference_type VARCHAR(50),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoice Generation
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id),
    semester_id UUID REFERENCES session_semesters(id),
    session_id UUID REFERENCES academic_sessions(id),
    subtotal DECIMAL(12,2) NOT NULL,
    discount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    amount_paid DECIMAL(12,2) DEFAULT 0,
    balance DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    due_date DATE,
    issued_by UUID REFERENCES users(id),
    issued_at TIMESTAMPTZ,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 7: EXAMINATIONS
-- ============================================

-- Exam Venues/Rooms
CREATE TABLE exam_venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    capacity INTEGER NOT NULL,
    exam_capacity INTEGER,
    building VARCHAR(100),
    floor VARCHAR(20),
    room_number VARCHAR(20),
    has_projector BOOLEAN DEFAULT false,
    has_ac BOOLEAN DEFAULT true,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Seating Plans
CREATE TABLE seating_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    venue_id UUID NOT NULL REFERENCES exam_venues(id),
    rows INTEGER NOT NULL,
    columns INTEGER NOT NULL,
    seating_arrangement JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exams Configuration
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    exam_type VARCHAR(50) DEFAULT 'CBT' CHECK (exam_type IN ('CBT', 'Paper', 'Practical', 'Oral', 'Project')),
    duration_minutes INTEGER DEFAULT 60,
    total_questions INTEGER DEFAULT 50,
    total_marks INTEGER DEFAULT 100,
    pass_mark INTEGER DEFAULT 40,
    venue_id UUID REFERENCES exam_venues(id),
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    status exam_status DEFAULT 'draft',
    instructions TEXT,
    is_online BOOLEAN DEFAULT true,
    allow_calculator BOOLEAN DEFAULT false,
    allow_formula_sheet BOOLEAN DEFAULT false,
    show_results_immediately BOOLEAN DEFAULT false,
    shuffle_questions BOOLEAN DEFAULT true,
    shuffle_answers BOOLEAN DEFAULT false,
    auto_submit BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Questions
CREATE TABLE exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer', 'essay', 'fill_blank', 'matching')),
    options JSONB,
    correct_answer TEXT,
    correct_answers JSONB,
    marks INTEGER NOT NULL DEFAULT 1,
    negative_marks DECIMAL(4,2) DEFAULT 0,
    explanation TEXT,
    difficulty_level VARCHAR(20) DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
    topic VARCHAR(100),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Question Bank (Reusable)
CREATE TABLE question_bank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL,
    options JSONB,
    correct_answer TEXT,
    correct_answers JSONB,
    explanation TEXT,
    difficulty_level VARCHAR(20) DEFAULT 'medium',
    topic VARCHAR(100),
    tags JSONB DEFAULT '[]',
    usage_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Attempts
CREATE TABLE exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES exams(id),
    student_id UUID NOT NULL REFERENCES students(id),
    answers JSONB DEFAULT '{}',
    score DECIMAL(8,2),
    total_marks DECIMAL(8,2),
    percentage DECIMAL(5,2),
    grade VARCHAR(5),
    status attempt_status DEFAULT 'not_started',
    started_at TIMESTAMPTZ,
    submitted_at TIMESTAMPTZ,
    time_spent_seconds INTEGER DEFAULT 0,
    ip_address VARCHAR(45),
    user_agent TEXT,
    browser_info JSONB DEFAULT '{}',
    is_flagged BOOLEAN DEFAULT false,
    flag_reason TEXT,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(exam_id, student_id)
);

-- Student Answer Sheet (Detailed)
CREATE TABLE student_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES exam_questions(id),
    selected_answer TEXT,
    selected_answers JSONB,
    is_correct BOOLEAN,
    marks_obtained DECIMAL(5,2) DEFAULT 0,
    flagged BOOLEAN DEFAULT false,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam Malpractice Records
CREATE TABLE exam_malpractices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_attempt_id UUID REFERENCES exam_attempts(id),
    student_id UUID NOT NULL REFERENCES students(id),
    exam_id UUID NOT NULL REFERENCES exams(id),
    malpractice_type VARCHAR(100) NOT NULL,
    description TEXT,
    evidence JSONB DEFAULT '[]',
    reported_by UUID REFERENCES users(id),
    reported_at TIMESTAMPTZ DEFAULT NOW(),
    investigated_by UUID REFERENCES users(id),
    investigated_at TIMESTAMPTZ,
    penalty VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending',
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 8: ATTENDANCE
-- ============================================

-- Course Sessions/Lectures
CREATE TABLE course_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    session_number INTEGER NOT NULL,
    topic VARCHAR(255),
    description TEXT,
    venue VARCHAR(100),
    scheduled_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_cancelled BOOLEAN DEFAULT false,
    cancellation_reason TEXT,
    cancelled_by UUID REFERENCES users(id),
    cancelled_at TIMESTAMPTZ,
    attendance_taken BOOLEAN DEFAULT false,
    attendance_taken_at TIMESTAMPTZ,
    attendance_code VARCHAR(20),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance Records
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    course_session_id UUID REFERENCES course_sessions(id),
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    lecture_date DATE NOT NULL,
    status attendance_status NOT NULL DEFAULT 'absent',
    arrival_time TIME,
    marked_by UUID REFERENCES users(id),
    marked_at TIMESTAMPTZ DEFAULT NOW(),
    device_info JSONB DEFAULT '{}',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_session_id)
);

-- Attendance Summary
CREATE TABLE attendance_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES session_semesters(id),
    total_sessions INTEGER DEFAULT 0,
    present_count INTEGER DEFAULT 0,
    absent_count INTEGER DEFAULT 0,
    late_count INTEGER DEFAULT 0,
    excused_count INTEGER DEFAULT 0,
    attendance_percentage DECIMAL(5,2) DEFAULT 0,
    is_eligible_for_exam BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, course_id, semester_id)
);

-- ============================================
-- SECTION 9: ASSIGNMENTS & ASSESSMENTS
-- ============================================

-- Assignment Templates (Reusable)
CREATE TABLE assignment_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    template_type VARCHAR(50) DEFAULT 'individual',
    max_score INTEGER DEFAULT 100,
    due_days_from_publish INTEGER,
    instructions TEXT,
    rubric JSONB DEFAULT '[]',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignments
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES assignment_templates(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    assignment_type VARCHAR(50) DEFAULT 'individual' CHECK (assignment_type IN ('individual', 'group', 'peer')),
    max_score INTEGER DEFAULT 100,
    pass_score INTEGER DEFAULT 40,
    weight_percent INTEGER DEFAULT 10,
    due_date TIMESTAMPTZ NOT NULL,
    open_date TIMESTAMPTZ,
    allow_late_submission BOOLEAN DEFAULT false,
    late_penalty_percent INTEGER DEFAULT 10,
    allow_resubmission BOOLEAN DEFAULT false,
    max_resubmissions INTEGER DEFAULT 1,
    status assignment_status DEFAULT 'draft',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    allow_file_upload BOOLEAN DEFAULT true,
    allowed_file_types JSONB DEFAULT '["pdf", "docx", "zip"]',
    max_file_size_mb INTEGER DEFAULT 10,
    plagiarism_check BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignment Submissions
CREATE TABLE assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    submission_number INTEGER DEFAULT 1,
    content TEXT,
    file_url TEXT,
    file_urls JSONB DEFAULT '[]',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    is_late BOOLEAN DEFAULT false,
    late_penalty_applied DECIMAL(5,2) DEFAULT 0,
    status submission_status DEFAULT 'pending',
    score DECIMAL(5,2),
    max_score DECIMAL(5,2) DEFAULT 100,
    percentage DECIMAL(5,2),
    grade VARCHAR(5),
    feedback TEXT,
    annotated_file_url TEXT,
    resubmission_requested BOOLEAN DEFAULT false,
    resubmission_reason TEXT,
    graded_by UUID REFERENCES users(id),
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, student_id, submission_number)
);

-- Group Assignments & Teams
CREATE TABLE assignment_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    group_name VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE assignment_group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES assignment_groups(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id),
    is_leader BOOLEAN DEFAULT false,
    contribution_percent INTEGER DEFAULT 0,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, student_id)
);

-- Peer Reviews
CREATE TABLE peer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES assignment_submissions(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES students(id),
    review_content TEXT,
    score_given DECIMAL(5,2),
    feedback TEXT,
    reviewed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(submission_id, reviewer_id)
);

-- ============================================
-- SECTION 10: COURSE MATERIALS & CONTENT
-- ============================================

-- Course Materials
CREATE TABLE course_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    material_type VARCHAR(50) NOT NULL CHECK (material_type IN ('lecture_note', 'slide', 'video', 'article', 'ebook', 'link', 'pdf', 'assignment', 'other')),
    file_url TEXT,
    external_url TEXT,
    duration_minutes INTEGER,
    file_size_bytes BIGINT,
    is_preview BOOLEAN DEFAULT false,
    is_downloadable BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Topics/Modules
CREATE TABLE course_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    week_number INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course Topic Materials Junction
CREATE TABLE topic_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES course_topics(id) ON DELETE CASCADE,
    material_id UUID NOT NULL REFERENCES course_materials(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 11: GRADING & GRADE BOOKS
-- ============================================

-- Grade Categories
CREATE TABLE grade_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    category_name VARCHAR(100) NOT NULL,
    weight_percent INTEGER NOT NULL,
    is_calculated BOOLEAN DEFAULT false,
    drop_lowest INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grade Items
CREATE TABLE grade_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES grade_categories(id) ON DELETE CASCADE,
    assignment_id UUID REFERENCES assignments(id),
    exam_id UUID REFERENCES exams(id),
    item_name VARCHAR(255) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL,
    is_extra_credit BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grade Overrides
CREATE TABLE grade_overrides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    grade_item_id UUID REFERENCES grade_items(id),
    original_score DECIMAL(5,2),
    override_score DECIMAL(5,2) NOT NULL,
    reason TEXT,
    overridden_by UUID REFERENCES users(id),
    overridden_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 12: ANNOUNCEMENTS & NOTIFICATIONS
-- ============================================

-- Announcements
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    author_id UUID NOT NULL REFERENCES users(id),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    target_type VARCHAR(50) NOT NULL CHECK (target_type IN ('all', 'faculty', 'department', 'program', 'level', 'course', 'individual')),
    target_id UUID,
    attachment_url TEXT,
    is_pinned BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    link_text VARCHAR(100),
    icon VARCHAR(50),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    priority VARCHAR(20) DEFAULT 'normal',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email Queue
CREATE TABLE email_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_email VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(255),
    subject VARCHAR(500) NOT NULL,
    body TEXT NOT NULL,
    template_id VARCHAR(100),
    template_data JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'pending',
    attempts INTEGER DEFAULT 0,
    last_attempt_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    failed_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 13: LIBRARY MANAGEMENT
-- ============================================

-- Library Categories
CREATE TABLE library_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    parent_id UUID REFERENCES library_categories(id),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Books/Resources
CREATE TABLE library_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    isbn VARCHAR(20),
    publisher VARCHAR(255),
    publish_year INTEGER,
    edition VARCHAR(50),
    category_id UUID REFERENCES library_categories(id),
    resource_type VARCHAR(50) CHECK (resource_type IN ('book', 'journal', 'thesis', 'article', 'video', 'audio', 'digital')),
    description TEXT,
    cover_image_url TEXT,
    file_url TEXT,
    total_copies INTEGER DEFAULT 1,
    available_copies INTEGER DEFAULT 1,
    location VARCHAR(100),
    shelf_number VARCHAR(20),
    is_digital BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Book Borrowing
CREATE TABLE borrowings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    resource_id UUID NOT NULL REFERENCES library_resources(id),
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) DEFAULT 'borrowed' CHECK (status IN ('borrowed', 'returned', 'overdue', 'lost')),
    late_fee DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    issued_by UUID REFERENCES users(id),
    returned_to UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 14: HOSTEL MANAGEMENT
-- ============================================

-- Hostels/Residences
CREATE TABLE hostels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    gender_type VARCHAR(10) CHECK (gender_type IN ('male', 'female', 'mixed')),
    status hostel_status DEFAULT 'available',
    address TEXT,
    warden_id UUID REFERENCES users(id),
    contact_phone VARCHAR(50),
    total_rooms INTEGER DEFAULT 0,
    description TEXT,
    amenities JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rooms
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hostel_id UUID NOT NULL REFERENCES hostels(id) ON DELETE CASCADE,
    room_number VARCHAR(20) NOT NULL,
    room_type room_type DEFAULT 'double',
    floor VARCHAR(10),
    capacity INTEGER NOT NULL,
    current_occupancy INTEGER DEFAULT 0,
    rent_amount DECIMAL(10,2),
    amenities JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'available',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(hostel_id, room_number)
);

-- Room Allocations
CREATE TABLE room_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    room_id UUID NOT NULL REFERENCES rooms(id),
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    allocation_date DATE,
    check_in_date DATE,
    check_out_date DATE,
    status VARCHAR(20) DEFAULT 'allocated',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 15: STUDENT DOCUMENTS
-- ============================================

-- Document Uploads
CREATE TABLE student_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    file_name VARCHAR(255),
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    mime_type VARCHAR(100),
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    expiry_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Academic Transcripts
CREATE TABLE transcripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    transcript_data JSONB NOT NULL,
    generated_by UUID REFERENCES users(id),
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    pdf_url TEXT
);

-- ============================================
-- SECTION 16: MESSAGING & COMMUNICATION
-- ============================================

-- Message Threads
CREATE TABLE message_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_type VARCHAR(20) DEFAULT 'direct' CHECK (thread_type IN ('direct', 'group', 'course', 'announcement')),
    title VARCHAR(255),
    course_id UUID REFERENCES courses(id),
    last_message_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Thread Participants
CREATE TABLE thread_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    role VARCHAR(20) DEFAULT 'member',
    last_read_at TIMESTAMPTZ,
    notifications_enabled BOOLEAN DEFAULT true,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(thread_id, user_id)
);

-- Messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    attachment_url TEXT,
    attachment_type VARCHAR(50),
    is_edited BOOLEAN DEFAULT false,
    edited_at TIMESTAMPTZ,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Message Read Status
CREATE TABLE message_reads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    read_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(message_id, user_id)
);

-- ============================================
-- SECTION 17: COMPLAINTS & DISCIPLINE
-- ============================================

-- Complaints
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id),
    complaint_type VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    evidence_urls JSONB DEFAULT '[]',
    status complaint_status DEFAULT 'submitted',
    priority VARCHAR(20) DEFAULT 'normal',
    assigned_to UUID REFERENCES users(id),
    resolution TEXT,
    resolved_at TIMESTAMPTZ,
    student_satisfaction INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disciplinary Records
CREATE TABLE disciplinary_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES students(id),
    incident_date DATE NOT NULL,
    incident_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    evidence JSONB DEFAULT '[]',
    action_taken VARCHAR(255),
    penalties JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'pending',
    decided_by UUID REFERENCES users(id),
    decided_at TIMESTAMPTZ,
    appeal_status VARCHAR(20),
    appeal_decision TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 18: REPORTS & ANALYTICS
-- ============================================

-- Report Templates
CREATE TABLE report_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    description TEXT,
    parameters JSONB DEFAULT '{}',
    template_config JSONB NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated Reports
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES report_templates(id),
    report_name VARCHAR(255) NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    parameters JSONB DEFAULT '{}',
    result_data JSONB,
    pdf_url TEXT,
    generated_by UUID REFERENCES users(id),
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Course Analytics
CREATE TABLE course_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    analytics_date DATE NOT NULL,
    metrics JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, analytics_date)
);

-- ============================================
-- SECTION 19: SYSTEM CONFIGURATION
-- ============================================

-- System Settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'string',
    group_name VARCHAR(50),
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Academic Calendars
CREATE TABLE academic_calendars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    event_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    venue VARCHAR(255),
    is_academic BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SECTION 20: INDEXES
-- ============================================

-- Core Table Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(token) WHERE token IS NOT NULL;
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Academic Structure Indexes
CREATE INDEX idx_faculties_code ON faculties(code);
CREATE INDEX idx_departments_faculty ON departments(faculty_id);
CREATE INDEX idx_departments_code ON departments(code);
CREATE INDEX idx_programs_department ON programs(department_id);
CREATE INDEX idx_programs_code ON programs(code);
CREATE INDEX idx_program_levels_program ON program_levels(program_id);
CREATE INDEX idx_courses_semester ON courses(semester_id);
CREATE INDEX idx_courses_program_level ON courses(program_level_id);
CREATE INDEX idx_courses_code ON courses(code);
CREATE INDEX idx_course_prerequisites_course ON course_prerequisites(course_id);

-- Student Management Indexes
CREATE INDEX idx_students_user ON students(user_id);
CREATE INDEX idx_students_admission ON students(admission_number);
CREATE INDEX idx_students_matric ON students(matric_number) WHERE matric_number IS NOT NULL;
CREATE INDEX idx_students_program ON students(program_id);
CREATE INDEX idx_students_status ON students(academic_status);
CREATE INDEX idx_admissions_application ON admissions(application_number);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_semester ON enrollments(semester_id);
CREATE INDEX idx_course_registrations_student ON course_registrations(student_id);
CREATE INDEX idx_course_registrations_course ON course_registrations(course_id);

-- Results Indexes
CREATE INDEX idx_results_student ON results(student_id);
CREATE INDEX idx_results_course ON results(course_id);
CREATE INDEX idx_results_semester ON results(semester_id);
CREATE INDEX idx_gpa_records_student ON gpa_records(student_id);
CREATE INDEX idx_cgpa_records_student ON cgpa_records(student_id);
CREATE INDEX idx_ca_scores_student ON ca_scores(student_id);
CREATE INDEX idx_ca_scores_course ON ca_scores(course_id);

-- Payment Indexes
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_reference ON payments(reference);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created ON payments(created_at DESC);
CREATE INDEX idx_fee_structures_program ON fee_structures(program_id);

-- Examination Indexes
CREATE INDEX idx_exams_course ON exams(course_id);
CREATE INDEX idx_exams_status ON exams(status);
CREATE INDEX idx_exam_attempts_exam ON exam_attempts(exam_id);
CREATE INDEX idx_exam_attempts_student ON exam_attempts(student_id);
CREATE INDEX idx_exam_questions_exam ON exam_questions(exam_id);
CREATE INDEX idx_question_bank_course ON question_bank(course_id);
CREATE INDEX idx_seating_plans_exam ON seating_plans(exam_id);

-- Attendance Indexes
CREATE INDEX idx_course_sessions_course ON course_sessions(course_id);
CREATE INDEX idx_course_sessions_date ON course_sessions(scheduled_date);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_course ON attendance(course_id);
CREATE INDEX idx_attendance_summary ON attendance_summary(student_id, course_id, semester_id);

-- Assignment Indexes
CREATE INDEX idx_assignments_course ON assignments(course_id);
CREATE INDEX idx_assignments_due ON assignments(due_date);
CREATE INDEX idx_assignment_submissions_assignment ON assignment_submissions(assignment_id);
CREATE INDEX idx_assignment_submissions_student ON assignment_submissions(student_id);

-- Communication Indexes
CREATE INDEX idx_announcements_author ON announcements(author_id);
CREATE INDEX idx_announcements_published ON announcements(is_published, published_at);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- Library Indexes
CREATE INDEX idx_library_resources_isbn ON library_resources(isbn) WHERE isbn IS NOT NULL;
CREATE INDEX idx_library_resources_category ON library_resources(category_id);
CREATE INDEX idx_borrowings_student ON borrowings(student_id);
CREATE INDEX idx_borrowings_status ON borrowings(status);

-- Messages Indexes
CREATE INDEX idx_thread_participants_user ON thread_participants(user_id);
CREATE INDEX idx_messages_thread ON messages(thread_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);

-- ============================================
-- SECTION 21: SEED DATA - ACADEMIC STRUCTURE
-- ============================================

-- Academic Session
INSERT INTO academic_sessions (id, name, start_date, end_date, is_current, registration_start, registration_end) VALUES
('as1', '2025/2026', '2025-10-01', '2026-06-30', true, '2025-08-01', '2025-09-30');

-- Semesters for 2025/2026 Session
INSERT INTO session_semesters (id, session_id, semester_name, semester_number, start_date, end_date, is_active) VALUES
('ss1', 'as1', 'First Semester', 1, '2025-10-01', '2026-01-31', true),
('ss2', 'as1', 'Second Semester', 2, '2026-02-01', '2026-06-30', false);

-- Faculty 1: School of Artificial Intelligence & Computational Intelligence
INSERT INTO faculties (id, name, code, short_name, description, vision, mission, head_name, head_title, head_email, office_location, is_active, sort_order) VALUES
('f1', 'School of Artificial Intelligence & Computational Intelligence', 'SAICI', 'AI School', 'AI, ML, and computational programs for the modern digital age', 'To be a world-class center of excellence in AI and computational intelligence', 'To produce highly skilled AI professionals through innovative teaching and research', 'Prof. Dr. Emmanuel Obi', 'Dean', 'dean@saici.edu.ng', 'AI Tower, Block A', true, 1);

-- Faculty 2: School of Bio-Digital Science & Health Informatics
INSERT INTO faculties (id, name, code, short_name, description, vision, mission, head_name, head_title, head_email, office_location, is_active, sort_order) VALUES
('f2', 'School of Bio-Digital Science & Health Informatics', 'SBSHI', 'Bio-Digital School', 'Bioinformatics, health informatics and digital health systems', 'Leading innovation in bio-digital sciences for healthcare transformation', 'Bridging biology and technology for improved health outcomes', 'Dr. Fatima Hassan', 'Dean', 'dean@sbshi.edu.ng', 'Bio-Digital Center, Block B', true, 2);

-- Department 1: Artificial Intelligence & Machine Learning (SAICI)
INSERT INTO departments (id, faculty_id, name, code, short_name, description, vision, mission, department_email, office_location, is_active, sort_order) VALUES
('d1', 'f1', 'Artificial Intelligence & Machine Learning', 'AIML', 'AI/ML', 'AI and ML research, development and teaching', 'Excellence in AI education and research', 'Advancing AI knowledge through comprehensive programs', 'ai-dept@saici.edu.ng', 'AI Tower, Floor 1', true, 1);

-- Department 2: Computational Science & Simulation (SAICI)
INSERT INTO departments (id, faculty_id, name, code, short_name, description, department_email, office_location, is_active, sort_order) VALUES
('d2', 'f1', 'Computational Science & Simulation', 'CSS', 'CompSci', 'Computational science, digital twins and simulation', 'css-dept@saici.edu.ng', 'AI Tower, Floor 2', true, 2);

-- Department 3: Robotics & Autonomous Systems (SAICI)
INSERT INTO departments (id, faculty_id, name, code, short_name, description, department_email, office_location, is_active, sort_order) VALUES
('d3', 'f1', 'Robotics & Autonomous Systems', 'RAS', 'Robotics', 'Robotics, automation and autonomous systems', 'ras-dept@saici.edu.ng', 'AI Tower, Floor 3', true, 3);

-- Department 4: Bioinformatics & Genomic Data Science (SBSHI)
INSERT INTO departments (id, faculty_id, name, code, short_name, description, department_email, office_location, is_active, sort_order) VALUES
('d4', 'f2', 'Bioinformatics & Genomic Data Science', 'BGD', 'Bioinformatics', 'Genomics, bioinformatics and computational biology', 'bgd-dept@sbshi.edu.ng', 'Bio-Digital Center, Floor 1', true, 1);

-- Department 5: Digital Health & Telemedicine (SBSHI)
INSERT INTO departments (id, faculty_id, name, code, short_name, description, department_email, office_location, is_active, sort_order) VALUES
('d5', 'f2', 'Digital Health & Telemedicine', 'DHT', 'Health Tech', 'Digital health systems and telemedicine solutions', 'dht-dept@sbshi.edu.ng', 'Bio-Digital Center, Floor 2', true, 2);

-- Department 6: Biotechnology & Synthetic Systems (SBSHI)
INSERT INTO departments (id, faculty_id, name, code, short_name, description, department_email, office_location, is_active, sort_order) VALUES
('d6', 'f2', 'Biotechnology & Synthetic Systems', 'BSS', 'Biotech', 'Biotechnology and synthetic biology research', 'bss-dept@sbshi.edu.ng', 'Bio-Digital Center, Floor 3', true, 3);

-- Programs for Department 1: AIML
INSERT INTO programs (id, department_id, name, code, short_name, type, duration_years, total_credits, description, admission_requirements, is_active) VALUES
('p1', 'd1', 'Diploma in Applied Machine Learning', 'AML', 'Applied ML', 'ND', 2, 72, 'Comprehensive program in applied machine learning techniques and applications', 'Five O-level credits including Mathematics and English', true),
('p2', 'd1', 'Diploma in Natural Language Processing', 'NLP', 'NLP', 'ND', 2, 72, 'Specialized program in NLP and text analytics', 'Five O-level credits including Mathematics and English', true),
('p3', 'd1', 'Diploma in Deep Learning & Neural Systems', 'DLN', 'Deep Learning', 'ND', 2, 72, 'Advanced program in deep neural networks and cognitive systems', 'Five O-level credits including Mathematics and English', true);

-- Programs for Department 2: CSS
INSERT INTO programs (id, department_id, name, code, short_name, type, duration_years, total_credits, is_active) VALUES
('p4', 'd2', 'Diploma in Digital Twin Systems', 'DTS', 'Digital Twin', 'ND', 2, 72, true),
('p5', 'd2', 'Diploma in Predictive Modeling & Analytics', 'PMA', 'Predictive Analytics', 'ND', 2, 72, true),
('p6', 'd2', 'Diploma in Computational Physics & Engineering', 'CPE', 'Computational Physics', 'ND', 2, 72, true);

-- Programs for Department 3: RAS
INSERT INTO programs (id, department_id, name, code, short_name, type, duration_years, total_credits, is_active) VALUES
('p7', 'd3', 'Diploma in Autonomous Vehicle Technology', 'AVT', 'Auto Vehicles', 'ND', 2, 72, true),
('p8', 'd3', 'Diploma in Industrial Robotics & Automation', 'IRA', 'Industrial Robotics', 'ND', 2, 72, true),
('p9', 'd3', 'Diploma in Swarm Intelligence & Multi-Agent Systems', 'SIM', 'Swarm Systems', 'ND', 2, 72, true);

-- Programs for Department 4: BGD
INSERT INTO programs (id, department_id, name, code, short_name, type, duration_years, total_credits, is_active) VALUES
('p10', 'd4', 'Diploma in Computational Genomics', 'CGM', 'Genomics', 'ND', 2, 72, true),
('p11', 'd4', 'Diploma in Molecular Modeling & Drug Discovery', 'MDD', 'Drug Discovery', 'ND', 2, 72, true),
('p12', 'd4', 'Diploma in Systems Biology', 'SYB', 'Systems Biology', 'ND', 2, 72, true);

-- Programs for Department 5: DHT
INSERT INTO programs (id, department_id, name, code, short_name, type, duration_years, total_credits, is_active) VALUES
('p13', 'd5', 'Diploma in Health Information Systems', 'HIS', 'Health Info Sys', 'ND', 2, 72, true),
('p14', 'd5', 'Diploma in Telemedicine & Remote Care', 'TRC', 'Telemedicine', 'ND', 2, 72, true),
('p15', 'd5', 'Diploma in Medical Imaging & Visualization', 'MIV', 'Medical Imaging', 'ND', 2, 72, true);

-- Programs for Department 6: BSS
INSERT INTO programs (id, department_id, name, code, short_name, type, duration_years, total_credits, is_active) VALUES
('p16', 'd6', 'Diploma in Synthetic Biology Engineering', 'SBE', 'Synthetic Biology', 'ND', 2, 72, true),
('p17', 'd6', 'Diploma in Bio-Manufacturing & Processing', 'BMP', 'Bio-Manufacturing', 'ND', 2, 72, true),
('p18', 'd6', 'Diploma in Agricultural Biotechnology', 'ABT', 'Agri Biotech', 'ND', 2, 72, true);

-- Program Levels for all Programs (ND Level 1 & 2)
INSERT INTO program_levels (id, program_id, level_number, level_name, description, minimum_credits, maximum_credits, is_active) 
SELECT gen_random_uuid(), id, 1, 'ND I', 'National Diploma Year 1', 15, 24, true FROM programs
UNION ALL
SELECT gen_random_uuid(), id, 2, 'ND II', 'National Diploma Year 2', 15, 24, true FROM programs;

-- Course Categories
INSERT INTO course_categories (id, name, code, description, color, icon, sort_order) VALUES
('cc1', 'General Courses', 'GEN', 'General/university-wide courses', '#3b82f6', 'book-open', 1),
('cc2', 'Core Courses', 'CORE', 'Program core courses', '#10b981', 'cpu', 2),
('cc3', 'Elective Courses', 'ELEC', 'Elective specialization courses', '#8b5cf6', 'sparkles', 3),
('cc4', 'Practical/Lab', 'PRAC', 'Laboratory and practical courses', '#f59e0b', 'flask-conical', 4),
('cc5', 'Industrial Training', 'IT', 'Industrial training and SIWES', '#ef4444', 'wrench', 5);

-- Sample Courses for AML Program (ND 1)
INSERT INTO courses (id, code, title, description, credits, category_id, course_type, semester_id, program_level_id, status, pass_mark, is_active)
SELECT 
    gen_random_uuid(),
    'GST111',
    'Use of English',
    'Communication and academic writing skills',
    2,
    'cc1',
    'theory',
    'ss1',
    pl.id,
    'compulsory',
    40,
    true
FROM program_levels pl WHERE pl.program_id = 'p1' AND pl.level_number = 1;

INSERT INTO courses (id, code, title, description, credits, category_id, course_type, semester_id, program_level_id, status, pass_mark, is_active)
SELECT 
    gen_random_uuid(),
    'MTH111',
    'Mathematics for Technology I',
    'Algebra, trigonometry and calculus fundamentals',
    3,
    'cc2',
    'theory',
    'ss1',
    pl.id,
    'compulsory',
    40,
    true
FROM program_levels pl WHERE pl.program_id = 'p1' AND pl.level_number = 1;

INSERT INTO courses (id, code, title, description, credits, category_id, course_type, semester_id, program_level_id, status, pass_mark, is_active)
SELECT 
    gen_random_uuid(),
    'AML111',
    'Introduction to Machine Learning',
    'Fundamentals of ML algorithms and concepts',
    3,
    'cc2',
    'theory',
    'ss1',
    pl.id,
    'compulsory',
    40,
    true
FROM program_levels pl WHERE pl.program_id = 'p1' AND pl.level_number = 1;

INSERT INTO courses (id, code, title, description, credits, category_id, course_type, semester_id, program_level_id, status, pass_mark, is_active)
SELECT 
    gen_random_uuid(),
    'AML112',
    'Machine Learning Lab I',
    'Hands-on ML programming and experiments',
    2,
    'cc4',
    'practical',
    'ss1',
    pl.id,
    'compulsory',
    40,
    true
FROM program_levels pl WHERE pl.program_id = 'p1' AND pl.level_number = 1;

INSERT INTO courses (id, code, title, description, credits, category_id, course_type, semester_id, program_level_id, status, pass_mark, is_active)
SELECT 
    gen_random_uuid(),
    'PHY111',
    'Physics for Technology',
    'Applied physics principles for technology',
    2,
    'cc2',
    'theory',
    'ss1',
    pl.id,
    'compulsory',
    40,
    true
FROM program_levels pl WHERE pl.program_id = 'p1' AND pl.level_number = 1;

INSERT INTO courses (id, code, title, description, credits, category_id, course_type, semester_id, program_level_id, status, pass_mark, is_active)
SELECT 
    gen_random_uuid(),
    'CSC111',
    'Introduction to Computer Science',
    'Basic computing concepts and problem solving',
    3,
    'cc2',
    'theory',
    'ss1',
    pl.id,
    'compulsory',
    40,
    true
FROM program_levels pl WHERE pl.program_id = 'p1' AND pl.level_number = 1;

INSERT INTO courses (id, code, title, description, credits, category_id, course_type, semester_id, program_level_id, status, pass_mark, is_active)
SELECT 
    gen_random_uuid(),
    'CSC112',
    'Computer Programming I',
    'Programming fundamentals using Python',
    3,
    'cc2',
    'practical',
    'ss1',
    pl.id,
    'compulsory',
    40,
    true
FROM program_levels pl WHERE pl.program_id = 'p1' AND pl.level_number = 1;

-- Grading System
INSERT INTO grading_systems (id, name, description, is_default, grade_scale) VALUES
('gs1', 'Standard Nigerian Poly grading', 'Standard grading system for Nigerian Polytechnics', true, '[
    {"grade": "A", "min_score": 70, "max_score": 100, "grade_point": 4.0, "description": "Excellent"},
    {"grade": "B", "min_score": 60, "max_score": 69, "grade_point": 3.5, "description": "Very Good"},
    {"grade": "C", "min_score": 50, "max_score": 59, "grade_point": 3.0, "description": "Good"},
    {"grade": "D", "min_score": 45, "max_score": 49, "grade_point": 2.5, "description": "Pass"},
    {"grade": "E", "min_score": 40, "max_score": 44, "grade_point": 2.0, "description": "Pass"},
    {"grade": "F", "min_score": 0, "max_score": 39, "grade_point": 0.0, "description": "Fail"}
]');

-- ============================================
-- SECTION 22: DEFAULT USERS
-- ============================================

-- Super Admin User (Permanent)
INSERT INTO users (id, email, password_hash, full_name, role, phone, is_active, is_verified, email_verified_at) VALUES
('u1', 'webuildandtarinbuilders@gmail.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', 'Super Admin', 'super_admin', '+2348012345678', true, true, NOW());

-- System Admin
INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified) VALUES
('u2', 'admin@innovasci.edu.ng', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', 'System Administrator', 'system_admin', true, true);

-- Admission Officer
INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified) VALUES
('u3', 'admission@innovasci.edu.ng', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', 'Admission Officer', 'admission_officer', true, true);

-- Finance Officer
INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified) VALUES
('u4', 'finance@innovasci.edu.ng', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', 'Finance Officer', 'finance_officer', true, true);

-- Exam Officer
INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified) VALUES
('u5', 'exam@innovasci.edu.ng', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', 'Exam Officer', 'exam_officer', true, true);

-- Sample Lecturer
INSERT INTO users (id, email, password_hash, full_name, role, phone, is_active, is_verified) VALUES
('u6', 'lecturer@innovasci.edu.ng', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', 'Dr. John Smith', 'lecturer', '+2348098765432', true, true);

-- Sample Student
INSERT INTO users (id, email, password_hash, full_name, role, phone, is_active, is_verified) VALUES
('u7', 'student@innovasci.edu.ng', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', 'Adebayo Johnson', 'student', '+2348055555555', true, true);

-- Create Student Profile
INSERT INTO students (id, user_id, admission_number, program_id, program_level_id, current_session_id, current_semester_id, academic_status, entry_year, cgpa) VALUES
('s1', 'u7', 'INS/2025/ND/0001', 'p1', (SELECT id FROM program_levels WHERE program_id = 'p1' AND level_number = 1), 'as1', 'ss1', 'active', 2025, 0.00);

-- Update Department HODs
UPDATE departments SET hod_id = 'u6' WHERE id IN ('d1', 'd2', 'd3', 'd4', 'd5', 'd6');

-- ============================================
-- SECTION 23: SYSTEM SETTINGS DEFAULTS
-- ============================================

INSERT INTO system_settings (setting_key, setting_value, setting_type, group_name, description, is_public) VALUES
('institution_name', 'InnovaSci AI Labs Polytechnic', 'string', 'general', 'Institution full name', true),
('institution_short_name', 'InnovaSci Poly', 'string', 'general', 'Institution short name', true),
('institution_email', 'info@innovasci.edu.ng', 'string', 'general', 'Main contact email', true),
('institution_phone', '+234-800-000-0000', 'string', 'general', 'Main contact phone', true),
('institution_address', 'Abuja, Nigeria', 'string', 'general', 'Institution address', true),
('session_duration_minutes', '60', 'number', 'academic', 'Default exam duration', true),
('pass_mark', '40', 'number', 'academic', 'Minimum pass mark percentage', true),
('ca_weight', '40', 'number', 'academic', 'Continuous assessment weight %', true),
('exam_weight', '60', 'number', 'academic', 'Examination weight %', true),
('min_attendance_percent', '75', 'number', 'academic', 'Minimum attendance for exam eligibility', true),
('max_registration_credits', '24', 'number', 'academic', 'Maximum course credits per semester', true),
('carryover_limit', '4', 'number', 'academic', 'Maximum carryover courses allowed', true),
('result_upload_deadline_days', '30', 'number', 'academic', 'Days after semester end to upload results', true);

-- ============================================
-- END OF SCHEMA
-- ============================================

