/**
 * Demo Users Seed Script (SQL Version)
 * InnovaSci AI Labs Polytechnic
 * 
 * Run this SQL in Supabase Dashboard > SQL Editor
 * This creates demo users using the auth.admin API
 * 
 * IMPORTANT: This script is for DEMO/TESTING purposes only.
 */

// =====================================================
// SECTION 1: CREATE DEMO USERS FUNCTION
// =====================================================

-- Function to create demo users (returns void, logs results)
CREATE OR REPLACE FUNCTION create_demo_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  demo_password TEXT := 'Demo@12345';
  demo_users JSON := '[
    {"email": "super_admin@innovasci-demo.com", "full_name": "Super Admin Demo", "role": "super_admin"},
    {"email": "rector@innovasci-demo.com", "full_name": "Rector Demo", "role": "rector"},
    {"email": "deputy_rector_academic@innovasci-demo.com", "full_name": "Deputy Rector Academic Demo", "role": "deputy_rector_academic"},
    {"email": "deputy_rector_admin@innovasci-demo.com", "full_name": "Deputy Rector Admin Demo", "role": "deputy_rector_admin"},
    {"email": "registrar@innovasci-demo.com", "full_name": "Registrar Demo", "role": "registrar"},
    {"email": "bursar@innovasci-demo.com", "full_name": "Bursar Demo", "role": "bursar"},
    {"email": "librarian@innovasci-demo.com", "full_name": "Librarian Demo", "role": "librarian"},
    {"email": "director@innovasci-demo.com", "full_name": "Director Demo", "role": "director"},
    {"email": "dean@innovasci-demo.com", "full_name": "Dean Demo", "role": "dean"},
    {"email": "hod@innovasci-demo.com", "full_name": "Head of Department Demo", "role": "hod"},
    {"email": "program_coordinator@innovasci-demo.com", "full_name": "Program Coordinator Demo", "role": "program_coordinator"},
    {"email": "lecturer@innovasci-demo.com", "full_name": "Lecturer Demo", "role": "lecturer"},
    {"email": "student@innovasci-demo.com", "full_name": "Student Demo", "role": "student"},
    {"email": "applicant@innovasci-demo.com", "full_name": "Applicant Demo", "role": "applicant"}
  ]'::json;
  
  user_data JSON;
  user_email TEXT;
  user_full_name TEXT;
  user_role TEXT;
  auth_user_id UUID;
  existing_user UUID;
BEGIN
  -- Iterate through demo users
  FOR user_data IN SELECT * FROM json_array_elements(demo_users)
  LOOP
    user_email := user_data->>'email';
    user_full_name := user_data->>'full_name';
    user_role := user_data->>'role';
    
    -- Check if user already exists in users table
    SELECT id INTO existing_user FROM users WHERE email = user_email;
    
    IF existing_user IS NOT NULL THEN
      RAISE NOTICE 'User % already exists, skipping...', user_email;
    ELSE
      -- Create user using Supabase auth admin API
      -- Note: This requires service_role key and is run via edge function or external script
      RAISE NOTICE 'User % needs to be created via admin API', user_email;
    END IF;
  END LOOP;
  
  RAISE NOTICE 'Demo users check complete. Run admin API for creation.';
END;
$$;

// =====================================================
// SECTION 2: SEED USERS TABLE (For demo purposes)
// =====================================================

-- Insert demo users directly into users table
-- These would normally be created via Supabase Auth Admin API

INSERT INTO users (id, email, password_hash, full_name, role, is_active, is_verified, created_at, updated_at)
VALUES
  -- Using placeholder UUIDs - replace with actual auth user IDs after creation
  ('11111111-1111-1111-1111-111111111111', 'super_admin@innovasci-demo.com', '$2b$12$placeholder', 'Super Admin Demo', 'super_admin', true, true, NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'rector@innovasci-demo.com', '$2b$12$placeholder', 'Rector Demo', 'rector', true, true, NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'deputy_rector_academic@innovasci-demo.com', '$2b$12$placeholder', 'Deputy Rector Academic Demo', 'deputy_rector_academic', true, true, NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'deputy_rector_admin@innovasci-demo.com', '$2b$12$placeholder', 'Deputy Rector Admin Demo', 'deputy_rector_admin', true, true, NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'registrar@innovasci-demo.com', '$2b$12$placeholder', 'Registrar Demo', 'registrar', true, true, NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'bursar@innovasci-demo.com', '$2b$12$placeholder', 'Bursar Demo', 'bursar', true, true, NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777777', 'librarian@innovasci-demo.com', '$2b$12$placeholder', 'Librarian Demo', 'librarian', true, true, NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'director@innovasci-demo.com', '$2b$12$placeholder', 'Director Demo', 'director', true, true, NOW(), NOW()),
  ('99999999-9999-9999-9999-999999999999', 'dean@innovasci-demo.com', '$2b$12$placeholder', 'Dean Demo', 'dean', true, true, NOW(), NOW()),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'hod@innovasci-demo.com', '$2b$12$placeholder', 'Head of Department Demo', 'hod', true, true, NOW(), NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'program_coordinator@innovasci-demo.com', '$2b$12$placeholder', 'Program Coordinator Demo', 'program_coordinator', true, true, NOW(), NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'lecturer@innovasci-demo.com', '$2b$12$placeholder', 'Lecturer Demo', 'lecturer', true, true, NOW(), NOW()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'student@innovasci-demo.com', '$2b$12$placeholder', 'Student Demo', 'student', true, true, NOW(), NOW()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'applicant@innovasci-demo.com', '$2b$12$placeholder', 'Applicant Demo', 'applicant', true, true, NOW(), NOW())
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  is_verified = EXCLUDED.is_verified,
  updated_at = NOW();

-- =====================================================
// SECTION 3: DISPLAY DEMO ACCOUNTS INFO
// =====================================================

-- Display all demo users
SELECT 
  full_name as "Full Name",
  email as "Email",
  role as "Role",
  CASE 
    WHEN role = 'super_admin' THEN '/portal/super-admin'
    WHEN role IN ('rector', 'deputy_rector_academic', 'deputy_rector_admin', 'registrar', 'bursar', 'librarian', 'director') THEN '/portal/management'
    WHEN role IN ('dean', 'hod', 'program_coordinator', 'lecturer') THEN '/portal/academic'
    WHEN role = 'student' THEN '/portal/student'
    WHEN role = 'applicant' THEN '/portal/applicant'
    ELSE '/portal/applicant'
  END as "Dashboard Route"
FROM users 
WHERE email LIKE '%@innovasci-demo.com'
ORDER BY role;

-- =====================================================
// SECTION 4: INSTRUCTIONS
-- =====================================================

/*
INSTRUCTIONS:
=============

1. Run this SQL in Supabase Dashboard > SQL Editor

2. To create actual Auth users (with working passwords), you need to use 
   Supabase Auth Admin API. You can do this via:
   
   a) Supabase Dashboard > Authentication > Users > Add User
   
   b) Or via API using the service_role key:
   
      curl -X POST 'https://your-project.supabase.co/auth/v1/admin/users' \
        -H 'Authorization: Bearer SERVICE_ROLE_KEY' \
        -H 'Content-Type: application/json' \
        -d '{
          "email": "super_admin@innovasci-demo.com",
          "password": "Demo@12345",
          "email_confirm": true,
          "user_metadata": {"full_name": "Super Admin Demo", "role": "super_admin"}
        }'

3. Demo Account Credentials:
   ========================
   Email format: role@innovasci-demo.com
   Password: Demo@12345 (for all accounts)

4. After creating auth users, UPDATE the users table with the correct IDs:
   
   UPDATE users SET id = 'actual-auth-uuid' WHERE email = 'super_admin@innovasci-demo.com';

5. Role to Portal Mapping:
   ======================
   super_admin → /portal/super-admin (Full access)
   rector, deputy_rector_academic, deputy_rector_admin, registrar, bursar, librarian, director → /portal/management
   dean, hod, program_coordinator, lecturer → /portal/academic
   student → /portal/student
   applicant → /portal/applicant

⚠️  WARNING: These are demo accounts for testing only. NOT for production use.
*/