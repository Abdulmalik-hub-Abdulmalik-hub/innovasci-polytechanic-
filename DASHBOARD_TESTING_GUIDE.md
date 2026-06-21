# Dashboard Testing Guide

## Quick Start

1. **Start the dev server**:
   ```bash
   npm run dev
   ```
   Server runs at http://localhost:3000

2. **Navigate to login**:
   ```
   http://localhost:3000/auth/login
   ```

3. **Use demo credentials** from the 35 quick-login options available

4. **Dashboard auto-routes** based on user role

## Portal Access Map

### Management Portal
Navigate to: `/portal/management`

**Sample Credentials to Test**:
- Vice Chancellor
- Deputy VC Academic
- Deputy VC Admin
- Registrar
- Bursar
- Any Director role
- Admission Officer

**Dashboard Shows**:
- 4 KPI cards (Students, Staff, Programmes, Revenue)
- Pending tasks with urgency levels
- Recent activity timeline
- Quick action buttons
- System status monitoring

**Navigation Includes**:
- User Management
- Academic Management
- Admissions Processing
- Examinations
- Finance
- Operations (QA, ODFeL, ICT, Library)
- Reports & Analytics

---

### Academic Portal
Navigate to: `/portal/academic`

**Sample Credentials to Test**:
- Lecturer
- HOD (Head of Department)
- Dean
- Programme Coordinator
- E-Tutor
- Instructional Designer
- Supervisor

**Dashboard Shows**:
- Course statistics
- My courses with student counts
- Upcoming deadlines
- Student submissions with grades
- Quick teaching actions

**Navigation Includes**:
- Dashboard & Analytics
- Academic Management (Programmes, Departments, Curriculum, Courses)
- Teaching & Learning
- Assessment (Exams, Question Banks, Results)
- Students (Enrolled, Progress, Advisory)
- Research & Projects
- Resources (Materials, Labs, Library)

---

### Student Portal
Navigate to: `/portal/student`

**Sample Credentials to Test**:
- Any student username

**Dashboard Shows**:
- Academic Statistics (GPA, Courses, Assignments, Attendance)
- Enrolled courses with progress bars
- Upcoming deadlines (next 7 days)
- Recent grades
- Scheduled examinations

**Navigation Includes**:
- Learning (Courses, Lectures, Materials, Labs, E-Library)
- Academic (Registration, Assignments, Exams, Results, Transcript, Attendance)
- Finance (Payment Dashboard, Invoices, Payment History)
- Support (Notifications, FAQ, Support Tickets)

---

### Applicant Portal
Navigate to: `/portal/applicant`

**Sample Credentials to Test**:
- applicant demo credentials

**Dashboard Shows**:
- Application status
- Document upload progress
- Payment status

**Navigation Includes**:
- Application (Dashboard, My Application, Documents, Status)
- Payments (Application Fee Payment)
- Support (Notifications, FAQ)

---

## Mobile Responsiveness Testing

### Test on Mobile (< 1024px width)

1. **Open DevTools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M / Cmd+Shift+M)
3. **Select iPhone 12 Pro** (390px width)
4. **Refresh page**

**Expected Mobile Behavior**:
- ✓ Hamburger menu visible in top-left
- ✓ Sidebar replaced with overlay menu
- ✓ Full-width header
- ✓ Single-column layouts
- ✓ Touch-friendly button sizes
- ✓ Readable text at smaller font sizes
- ✓ No horizontal scrolling

### Key Mobile Components to Test

1. **Sidebar Navigation**:
   - Click hamburger menu
   - Menu appears as full-screen overlay
   - Click menu item to navigate
   - Menu closes after navigation
   - Swipe left to close (browser feature)

2. **Dashboard Cards**:
   - Stats: Stack vertically
   - Tables: Scroll horizontally if needed
   - Buttons: Full width on mobile
   - Text: Readable without zooming

3. **Header Elements**:
   - Search bar: Hidden on mobile
   - Notifications: Full drawer
   - User menu: Dropdown works
   - Theme toggle: Present and functional

### Test on Tablet (768px - 1023px)

1. **Select iPad Air** (820px width) in DevTools
2. **Refresh page**

**Expected Tablet Behavior**:
- ✓ Hamburger menu visible
- ✓ 2-column layouts where applicable
- ✓ Sidebar overlay navigation
- ✓ Larger touch targets than mobile

### Test on Desktop (> 1024px)

1. **Select "Responsive" and manually set to 1200px**
2. **Refresh page**

**Expected Desktop Behavior**:
- ✓ Sidebar always visible
- ✓ No hamburger menu
- ✓ Multi-column layouts (3-4 columns)
- ✓ Search bar visible in header
- ✓ Content properly spaced

### Test Sidebar Collapse/Expand (Desktop Only)

1. **At desktop width (> 1024px)**
2. **Sidebar shows collapse button** (< or > chevron)
3. **Click to collapse**: Sidebar shrinks to 80px (icon-only)
4. **Main content shifts**: Content area expands
5. **Click to expand**: Sidebar returns to 280px (full width)

---

## Testing Dashboard Features

### 1. Role-Based Navigation

**Test**: Different roles show different navigation
1. Login with **Rector** → See Management navigation
2. Login with **Lecturer** → See Academic navigation
3. Login with **Student** → See Student navigation
4. Login with **Applicant** → See Applicant navigation

**Expected**: Navigation sidebar changes based on role

---

### 2. User Information Display

**Test**: User details display correctly
1. Login with any credential
2. Check sidebar: Shows user avatar and name
3. Check sidebar: Shows user role
4. Check header: Avatar dropdown works
5. Click avatar → See user profile menu

**Expected**: All user info matches logged-in user

---

### 3. Dashboard Cards

**Test**: KPI cards display correctly
1. Management Portal:
   - See 4 cards (Students, Staff, Programmes, Revenue)
   - Cards have icons and values
   - Cards have trend indicators
   
2. Academic Portal:
   - See 4 cards (Courses, Students, Pending Grading, Projects)
   - Grading card shows "Urgent" badge
   
3. Student Portal:
   - See 4 cards (GPA, Courses, Assignments, Attendance)
   - Cards show appropriate icons and values

---

### 4. Notifications System

**Test**: Notifications work
1. Look for bell icon in header
2. Unread notification count shows (red badge)
3. Click bell icon
4. Notification panel opens
5. Click "Mark all read"
6. Red badge disappears
7. Click notification → marks as read

---

### 5. User Logout

**Test**: Logout functionality
1. Click user avatar in header (desktop) or menu (mobile)
2. Select "Logout"
3. Redirect to login page
4. Try accessing /portal/student directly
5. Should redirect to /auth/login (not authenticated)

---

### 6. Responsive Images

**Test**: Avatars load correctly
1. Check sidebar: User avatar displays
2. Check header: User avatar displays
3. Check management dashboard: Activity avatars display
4. All avatars should be circular with initials as fallback

---

## Performance Testing

### Lighthouse Check

1. **Open DevTools** → Lighthouse
2. **Generate Report** for `/portal/student`

**Target Scores**:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

### Network Tab Inspection

1. **Open DevTools** → Network
2. **Clear** all requests
3. **Navigate to /portal/management**
4. **Look for**:
   - Total requests: < 50
   - Total size: < 1MB
   - Load time: < 3s

---

## Accessibility Testing

### Keyboard Navigation

1. **Press Tab** repeatedly
2. **Verify**: All interactive elements are reachable
3. **Press Enter** on buttons
4. **Verify**: Buttons activate
5. **Press Escape**: Modals/dropdowns close

### Screen Reader

1. **Use NVDA (Windows)** or **VoiceOver (Mac)**
2. **Read through**:
   - Page title
   - Navigation items
   - Dashboard cards
   - Button labels

**Expected**: All elements have descriptive labels

### Color Contrast

1. **Check DevTools** → Accessibility
2. **Look for**: All text > 4.5:1 contrast ratio
3. **Verify**: Color is not only visual indicator

---

## Common Demo Credentials

### Quick Test Paths

**Management Super Admin**:
```
Email: super_admin@innova.edu.ng
Password: Demo@2024
Portal: Management Portal
```

**Lecturer**:
```
Email: dr_hakeem@innova.edu.ng
Password: Demo@2024
Portal: Academic Portal
```

**Student**:
```
Email: chioma_nwankor@innova.edu.ng
Password: Demo@2024
Portal: Student Portal
```

**Applicant**:
```
Email: applicant_demo@innova.edu.ng
Password: Demo@2024
Portal: Applicant Portal
```

---

## Troubleshooting

### Dashboard Not Loading
1. Check browser console (F12) for errors
2. Verify user is authenticated
3. Check `/portal/[portal]` route exists
4. Verify RBAC configuration in store

### Sidebar Not Showing
1. Check if screen width < 1024px (mobile mode)
2. On desktop, check sidebar toggle button
3. Verify CSS is loaded (no FOUC)
4. Check component is rendering

### Responsive Layout Broken
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh page (Ctrl+Shift+R / Cmd+Shift+R)
3. Resize browser window
4. Check DevTools responsive mode is off

### User Not Seeing Their Portal
1. Verify role is in correct role group
2. Check store.ts has portal mapping
3. Verify auth status (should see user data in header)
4. Check console for RBAC errors

---

## Testing Checklist

- [ ] Management Portal loads with correct dashboard
- [ ] Academic Portal loads with correct dashboard
- [ ] Student Portal loads with correct dashboard
- [ ] Applicant Portal loads with correct dashboard
- [ ] Mobile menu opens/closes on mobile
- [ ] Desktop sidebar collapses/expands
- [ ] Navigation items match user role
- [ ] User info displays correctly
- [ ] Logout works and redirects properly
- [ ] Responsive layout works at all breakpoints
- [ ] Dashboard cards display with correct data
- [ ] Notifications system works
- [ ] No console errors
- [ ] Lighthouse scores are good
- [ ] Keyboard navigation works
- [ ] Screen reader can access all content

---

## Performance Benchmarks

| Metric | Target | Actual |
|--------|--------|--------|
| Page Load | < 3s | TBD |
| First Paint | < 1s | TBD |
| Time to Interactive | < 3.5s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |

*Run Lighthouse audit to populate actual values*
