# DEMO AUTHENTICATION SYSTEM REPORT

## InnovaSci AI Labs Online Polytechnic

**Date:** May 31, 2026  
**Version:** 1.0  
**Status:** Ready for Deployment

---

## Executive Summary

This document outlines the complete demo authentication system for the InnovaSci AI Labs Online Polytechnic. The system provides pre-configured demo accounts for all 14 system roles, enabling easy testing and demonstration of the platform's functionality.

---

## 1. Demo Accounts Overview

### 1.1 Account Format
- **Email Pattern:** `role@innovasci-demo.com`
- **Password:** `Demo@12345` (same for all demo accounts)
- **Auto-Confirmed:** All demo accounts are automatically verified

### 1.2 Complete Role List (14 Roles)

| # | Role | Email | Portal | Dashboard |
|---|------|-------|--------|-----------|
| 1 | super_admin | super_admin@innovasci-demo.com | /portal/super-admin | Super Admin Portal |
| 2 | rector | rector@innovasci-demo.com | /portal/management | Management Portal |
| 3 | deputy_rector_academic | deputy_rector_academic@innovasci-demo.com | /portal/management | Management Portal |
| 4 | deputy_rector_admin | deputy_rector_admin@innovasci-demo.com | /portal/management | Management Portal |
| 5 | registrar | registrar@innovasci-demo.com | /portal/management | Management Portal |
| 6 | bursar | bursar@innovasci-demo.com | /portal/management | Management Portal |
| 7 | librarian | librarian@innovasci-demo.com | /portal/management | Management Portal |
| 8 | director | director@innovasci-demo.com | /portal/management | Management Portal |
| 9 | dean | dean@innovasci-demo.com | /portal/academic | Academic Portal |
| 10 | hod | hod@innovasci-demo.com | /portal/academic | Academic Portal |
| 11 | program_coordinator | program_coordinator@innovasci-demo.com | /portal/academic | Academic Portal |
| 12 | lecturer | lecturer@innovasci-demo.com | /portal/academic | Academic Portal |
| 13 | student | student@innovasci-demo.com | /portal/student | Student Portal |
| 14 | applicant | applicant@innovasci-demo.com | /portal/applicant | Applicant Portal |

---

## 2. Files Created

### 2.1 Seed Scripts

| File | Description |
|------|-------------|
| `scripts/seed-demo-users.ts` | TypeScript seed script for programmatic user creation |
| `scripts/seed-demo-users.sql` | SQL script for Supabase dashboard execution |

### 2.2 Components

| File | Description |
|------|-------------|
| `src/components/auth/demo-login-panel.tsx` | Demo login panel with quick login buttons |

---

## 3. Setup Instructions

### 3.1 Option A: Supabase Dashboard (Recommended for Testing)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `scripts/seed-demo-users.sql`
4. Run the SQL script

### 3.2 Option B: Programmatic (Using Service Role Key)

1. Set environment variables:
   ```bash
   export NEXT_PUBLIC_SUPABASE_URL="your-project-url"
   export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

2. Run the TypeScript seed script:
   ```bash
   npx ts-node --esm scripts/seed-demo-users.ts
   ```

### 3.3 Option C: Manual User Creation

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **Add User** for each role
3. Use the email format `role@innovasci-demo.com`
4. Set password to `Demo@12345`
5. Set email_confirm to `true`
6. Add user_metadata: `{ "full_name": "Role Name Demo", "role": "role_name" }`
7. Create matching record in `users` table

---

## 4. Demo Login Panel Features

### 4.1 UI Components
- **Expandable Panel**: Click to reveal all demo accounts
- **Warning Banner**: Displays security notice
- **Copy Credentials**: One-click copy for email and password
- **Quick Login Buttons**: Direct login to any role
- **Password Toggle**: Show/hide password
- **Role Legend**: Visual guide to portal access

### 4.2 Security Features
- Only visible in development mode (`NODE_ENV !== 'production'`)
- Warning banner on every appearance
- Non-production usage restriction

---

## 5. Role-Based Access Control (RBAC)

### 5.1 Portal Access Matrix

| Portal | Roles | Access Level |
|--------|-------|--------------|
| Super Admin | super_admin | Full system access |
| Management | rector, deputy_rector_academic, deputy_rector_admin, registrar, bursar, librarian, director | Administrative functions |
| Academic | dean, hod, program_coordinator, lecturer | Academic staff functions |
| Student | student | Student portal |
| Applicant | applicant | Admission portal |

### 5.2 Permission Levels

| Role | View Reports | Manage Users | Configure System | Approve Applications |
|------|-------------|--------------|------------------|---------------------|
| super_admin | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| rector | ✅ Full | ✅ View | ❌ | ✅ |
| deputy_rector_academic | ✅ Academic | ❌ | ❌ | ✅ |
| deputy_rector_admin | ✅ Admin | ❌ | ❌ | ❌ |
| registrar | ✅ Academic | ✅ Students | ❌ | ✅ |
| bursar | ✅ Finance | ❌ | ❌ | ❌ |
| librarian | ✅ Library | ❌ | ❌ | ❌ |
| dean | ✅ Faculty | ✅ Department | ❌ | ❌ |
| hod | ✅ Department | ❌ | ❌ | ❌ |
| program_coordinator | ✅ Program | ❌ | ❌ | ❌ |
| lecturer | ✅ Courses | ❌ | ❌ | ❌ |
| student | ✅ Own | ❌ | ❌ | ❌ |
| applicant | ✅ Own | ❌ | ❌ | ❌ |

---

## 6. Technical Implementation

### 6.1 Auth Flow
1. User clicks demo login button
2. System calls `supabase.auth.signInWithPassword()`
3. On success, fetches user profile from `users` table
4. Stores user data in Zustand store
5. Redirects to role-appropriate portal

### 6.2 Database Schema
- `users` table with role and profile information
- Supabase Auth handles password validation
- RLS policies control data access

---

## 7. Testing Checklist

- [ ] All 14 demo accounts can login successfully
- [ ] Each role redirects to correct portal
- [ ] Demo login panel shows in development mode
- [ ] Demo login panel hidden in production
- [ ] Copy credentials functionality works
- [ ] Quick login buttons work for all roles
- [ ] RBAC enforced on all portal pages
- [ ] Seed script idempotent (safe to run twice)

---

## 8. Security Considerations

### ⚠️ IMPORTANT: Demo Mode Only
- These accounts are for **TESTING AND DEMONSTRATION ONLY**
- NOT suitable for production use
- All demo accounts have simple, predictable passwords
- Should be removed or secured before production deployment

### Recommended Actions
1. [ ] Use strong, unique passwords for production accounts
2. [ ] Implement rate limiting on login attempts
3. [ ] Enable 2FA for admin accounts
4. [ ] Set up IP allowlisting for sensitive portals
5. [ ] Monitor authentication logs

---

## 9. Troubleshooting

### Issue: Demo login fails
**Solution:** Ensure Supabase is configured with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: User profile not found
**Solution:** Run the seed script to create user profiles in the `users` table

### Issue: Panel not visible
**Solution:** This is expected in production mode. Demo panel only shows in development.

---

## 10. Support & Documentation

For questions or issues, contact the development team.

**This documentation was generated by OpenHands AI Agent**

---

*InnovaSci AI Labs Polytechnic - Demo Authentication System v1.0*