/**
 * Demo Users Seed Script
 * InnovaSci AI Labs Polytechnic - Authentication System
 * 
 * This script creates demo users for all system roles.
 * Run with: npx ts-node --esm scripts/seed-demo-users.ts
 * Or: npm run seed:demo
 * 
 * IMPORTANT: This script is for DEMO/TESTING purposes only.
 */

import { createClient } from '@supabase/supabase-js';

// =====================================================
// CONFIGURATION
// =====================================================

// Demo password (same for all demo users)
const DEMO_PASSWORD = 'Demo@12345';

// Environment variables (set these in .env.local or shell)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// =====================================================
// ROLE DEFINITIONS
// =====================================================

interface DemoUser {
  email: string;
  password: string;
  fullName: string;
  role: string;
  metadata?: Record<string, any>;
}

const DEMO_USERS: DemoUser[] = [
  // System Administration
  {
    email: 'super_admin@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Super Admin Demo',
    role: 'super_admin',
  },
  
  // Top Management
  {
    email: 'rector@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Rector Demo',
    role: 'rector',
  },
  {
    email: 'deputy_rector_academic@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Deputy Rector Academic Demo',
    role: 'deputy_rector_academic',
  },
  {
    email: 'deputy_rector_admin@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Deputy Rector Admin Demo',
    role: 'deputy_rector_admin',
  },
  
  // Administrative Staff
  {
    email: 'registrar@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Registrar Demo',
    role: 'registrar',
  },
  {
    email: 'bursar@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Bursar Demo',
    role: 'bursar',
  },
  {
    email: 'librarian@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Librarian Demo',
    role: 'librarian',
  },
  {
    email: 'director@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Director Demo',
    role: 'director',
  },
  
  // Academic Staff
  {
    email: 'dean@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Dean Demo',
    role: 'dean',
  },
  {
    email: 'hod@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Head of Department Demo',
    role: 'hod',
  },
  {
    email: 'program_coordinator@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Program Coordinator Demo',
    role: 'program_coordinator',
  },
  {
    email: 'lecturer@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Lecturer Demo',
    role: 'lecturer',
  },
  
  // Students & Applicants
  {
    email: 'student@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Student Demo',
    role: 'student',
  },
  {
    email: 'applicant@innovasci-demo.com',
    password: DEMO_PASSWORD,
    fullName: 'Applicant Demo',
    role: 'applicant',
  },
];

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
  const prefix = {
    info: '📋',
    success: '✅',
    error: '❌',
    warning: '⚠️',
  };
  console.log(`${prefix[type]} ${message}`);
}

function formatRoleName(role: string): string {
  return role
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// =====================================================
// MAIN SEED FUNCTION
// =====================================================

async function seedDemoUsers() {
  // Validate environment
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    log('Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY', 'error');
    log('You can also run this script with inline environment variables:', 'info');
    log('SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=xxx npx ts-node scripts/seed-demo-users.ts', 'info');
    process.exit(1);
  }

  log('Starting demo users seed script...', 'info');
  log(`Target: ${SUPABASE_URL}`, 'info');
  log(`Users to create: ${DEMO_USERS.length}`, 'info');
  console.log('');

  // Create Supabase admin client (bypasses RLS)
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const results = {
    created: 0,
    updated: 0,
    errors: 0,
  };

  for (const demoUser of DEMO_USERS) {
    try {
      log(`Processing ${demoUser.email} (${formatRoleName(demoUser.role)})...`, 'info');

      // Check if user already exists in auth
      const { data: existingAuth, error: getUserError } = await supabaseAdmin.auth.admin.listUsers();
      
      let authUser = null;
      if (getUserError) {
        log(`  Error checking existing user: ${getUserError.message}`, 'error');
        results.errors++;
        continue;
      }

      const existingUser = existingAuth?.users.find(u => u.email === demoUser.email);

      if (existingUser) {
        // Update existing user
        log(`  User exists, updating profile...`, 'info');
        
        // Update or insert profile in users table
        const { error: profileUpdateError } = await supabaseAdmin
          .from('users')
          .upsert({
            id: existingUser.id,
            email: demoUser.email,
            full_name: demoUser.fullName,
            role: demoUser.role,
            is_active: true,
            is_verified: true,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id',
          });

        if (profileUpdateError) {
          log(`  Profile update error: ${profileUpdateError.message}`, 'error');
          results.errors++;
        } else {
          log(`  Profile updated successfully`, 'success');
          results.updated++;
        }
      } else {
        // Create new user
        log(`  Creating new user...`, 'info');

        const { data: newAuthUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
          email: demoUser.email,
          password: demoUser.password,
          email_confirm: true, // Auto-confirm for demo
          user_metadata: {
            full_name: demoUser.fullName,
            role: demoUser.role,
          },
        });

        if (createUserError) {
          log(`  User creation error: ${createUserError.message}`, 'error');
          results.errors++;
          continue;
        }

        if (newAuthUser?.user) {
          // Create profile in users table
          const { error: profileInsertError } = await supabaseAdmin.from('users').insert({
            id: newAuthUser.user.id,
            email: demoUser.email,
            full_name: demoUser.fullName,
            role: demoUser.role,
            is_active: true,
            is_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          if (profileInsertError) {
            log(`  Profile creation error: ${profileInsertError.message}`, 'error');
            results.errors++;
          } else {
            log(`  User created successfully`, 'success');
            results.created++;
          }
        }
      }
    } catch (err: any) {
      log(`  Unexpected error: ${err.message}`, 'error');
      results.errors++;
    }
  }

  console.log('');
  log('Seed script completed!', 'success');
  log(`Created: ${results.created}`, 'success');
  log(`Updated: ${results.updated}`, 'success');
  log(`Errors: ${results.errors}`, results.errors > 0 ? 'error' : 'success');
  console.log('');

  // Print summary table
  log('Demo Accounts Summary:', 'info');
  console.log('┌─────────────────────────────┬─────────────────────────────────────────┬────────────────────┐');
  console.log('│ Role                       │ Email                                    │ Password           │');
  console.log('├─────────────────────────────┼─────────────────────────────────────────┼────────────────────┤');
  
  for (const user of DEMO_USERS) {
    const roleName = formatRoleName(user.role).padEnd(27);
    const email = user.email.padEnd(42);
    const password = 'Demo@12345'.padEnd(18);
    console.log(`│ ${roleName} │ ${email} │ ${password} │`);
  }
  
  console.log('└─────────────────────────────┴─────────────────────────────────────────┴────────────────────┘');
  console.log('');
  log('⚠️  WARNING: These are demo accounts for testing only. NOT for production use.', 'warning');
}

// =====================================================
// RUN SEED
// =====================================================

seedDemoUsers().catch(console.error);