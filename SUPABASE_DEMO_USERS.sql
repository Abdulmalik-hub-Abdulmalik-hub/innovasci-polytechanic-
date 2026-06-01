-- ============================================
-- INNOVASCI POLYTECHNIC - DEMO USERS SEED DATA
-- Run in Supabase SQL Editor
-- ============================================

-- 🚨 IMPORTANT: Development/Testing only!
-- Do NOT use these credentials in production

-- ============================================
-- SECTION 1: SUPER ADMIN (1 user)
-- ============================================

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'super_admin@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Super@12345
    'Super Admin Demo',
    'super_admin',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SECTION 2: SENIOR MANAGEMENT (3 users)
-- ============================================

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES
(
    '22222222-2222-2222-2222-222222222221',
    'rector@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Rector@12345
    'Rector Demo',
    'rector',
    true,
    true
),
(
    '22222222-2222-2222-2222-222222222222',
    'deputy_academic@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Deputy@12345
    'Deputy Rector (Academic) Demo',
    'deputy_rector_academic',
    true,
    true
),
(
    '22222222-2222-2222-2222-222222222223',
    'deputy_admin@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Deputy@12345
    'Deputy Rector (Admin) Demo',
    'deputy_rector_admin',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SECTION 3: ADMINISTRATIVE OFFICERS (3 users)
-- ============================================

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES
(
    '33333333-3333-3333-3333-333333333331',
    'registrar@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Registrar@12345
    'Registrar Demo',
    'registrar',
    true,
    true
),
(
    '33333333-3333-3333-3333-333333333332',
    'bursar@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Bursar@12345
    'Bursar Demo',
    'bursar',
    true,
    true
),
(
    '33333333-3333-3333-3333-333333333333',
    'librarian@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Librarian@12345
    'Librarian Demo',
    'librarian',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SECTION 4: DIRECTORS (9 users)
-- ============================================

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES
(
    '44444444-4444-4444-4444-444444444441',
    'director@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Director@12345
    'Director Demo',
    'director',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444442',
    'admission@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Admission@12345
    'Admission Officer Demo',
    'admission_officer',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444443',
    'exam@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Exam@12345
    'Examination Officer Demo',
    'examination_officer',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444444',
    'ict@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Ict@12345
    'Director ICT Demo',
    'director_ict',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444445',
    'odfel@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Odfel@12345
    'Director ODFeL Demo',
    'director_odfel',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444446',
    'qa@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Qa@12345
    'Director Quality Assurance Demo',
    'director_quality_assurance',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444447',
    'cbt@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Cbt@12345
    'Director CBT Services Demo',
    'director_cbt_services',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444448',
    'vlab@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Vlab@12345
    'Director Virtual Laboratories Demo',
    'director_virtual_laboratories',
    true,
    true
),
(
    '44444444-4444-4444-4444-444444444449',
    'student_affairs@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- StudentAffairs@12345
    'Director Student Affairs Demo',
    'director_student_affairs',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SECTION 5: ACADEMIC STAFF (4 users)
-- ============================================

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES
(
    '55555555-5555-5555-5555-555555555551',
    'dean@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Dean@12345
    'Dean Demo',
    'dean',
    true,
    true
),
(
    '55555555-5555-5555-5555-555555555552',
    'hod@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Hod@12345
    'Head of Department Demo',
    'hod',
    true,
    true
),
(
    '55555555-5555-5555-5555-555555555553',
    'coordinator@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Coordinator@12345
    'Programme Coordinator Demo',
    'program_coordinator',
    true,
    true
),
(
    '55555555-5555-5555-5555-555555555554',
    'lecturer@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Lecturer@12345
    'Lecturer Demo',
    'lecturer',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SECTION 6: STUDENTS (2 users)
-- ============================================

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified)
VALUES
(
    '66666666-6666-6666-6666-666666666661',
    'student@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Student@12345
    'Student Demo',
    'student',
    true,
    true
),
(
    '66666666-6666-6666-6666-666666666662',
    'applicant@innova-sci.local',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYD/:.', -- Applicant@12345
    'Applicant Demo',
    'applicant',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- SECTION 7: VERIFICATION
-- ============================================

-- Verify all demo users were created
SELECT 
    role,
    COUNT(*) as user_count,
    string_agg(email, ', ') as emails
FROM users 
WHERE email LIKE '%@innova-sci.local'
GROUP BY role
ORDER BY role;

-- ============================================
-- END OF DEMO USERS SEED
-- ============================================