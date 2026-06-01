# REGISTRATION ELIGIBILITY AND SCHOOL FEES CONTROL SYSTEM REPORT

**InnovaSci AI Labs Polytechnic**
**Student Registration, Fees Control & Payment Eligibility System**

---

## 1. Overview

This document outlines the comprehensive Registration Eligibility and School Fees Control System that manages student access to academic services based on payment and registration status.

---

## 2. System Architecture

### 2.1 Centralized Eligibility Engine

The system uses a centralized eligibility engine that serves as the single source of truth for:

```
Student Record
    ↓
Payment Verification
    ↓
Registration Verification
    ↓
Eligibility Determination
    ↓
Academic Access Control
```

### 2.2 Integration Points

| Component | Integration |
|-----------|-------------|
| Learning Resources Engine | Eligibility check before access |
| CBT Examination Engine | Payment + Registration check |
| Course Registration | Registration check |
| Results Access | Full payment check |
| Assignments | Payment check |

---

## 3. Eligibility Levels

### 3.1 Eligible Student
**Status:** ✅ Full Access

Can access:
- ✅ Course Registration
- ✅ Learning Resources
- ✅ CBT Examinations
- ✅ Assignments
- ✅ Results
- ✅ Academic Records

### 3.2 Partially Eligible Student
**Status:** ⚠️ Limited Access

Can access:
- ✅ Dashboard
- ✅ Profile
- ✅ Invoices
- ✅ Payment Portal
- ❌ Learning Resources
- ❌ CBT Examinations
- ❌ Course Registration (until registered)
- ❌ Results

### 3.3 Not Eligible Student
**Status:** ❌ Blocked

Can access:
- ✅ Profile
- ✅ Payment Information
- ✅ Outstanding Balances
- ✅ Help Desk
- ❌ All Academic Services

---

## 4. Fee Structure Engine

### 4.1 Supported Fee Types

| Fee Type | Category | Description |
|----------|----------|-------------|
| Acceptance Fee | acceptance | One-time new student fee |
| Tuition Fee | tuition | Per semester tuition |
| Registration Fee | registration | Semester registration |
| Examination Fee | examination | Exam processing |
| ICT Fee | levy | Computer services |
| Library Fee | levy | Library services |
| Development Levy | levy | Institution development |
| Laboratory Fee | levy | Lab access |
| Virtual Lab Fee | levy | Virtual lab access |
| Student Affairs Fee | levy | Student services |

### 4.2 Fee Configuration by Level

| Student Type | Enabled By Default |
|--------------|--------------------|
| ND 1 Fresh | Acceptance + All |
| ND 1 Returning | Tuition + All |
| ND 2 Fresh | Tuition + All |
| ND 2 Returning | Tuition + All |
| HND 1 Fresh | Acceptance + All |
| HND 1 Returning | Tuition + All |
| HND 2 Fresh | Tuition + All |
| HND 2 Returning | Tuition + All |

---

## 5. Payment Schedule Management

### 5.1 Schedule Configuration
- Payment Start Date
- Payment Deadline
- Late Registration Period
- Penalty Start Date
- Installment Plan Details

### 5.2 Installment Plan
- First Installment: 50% due by first deadline
- Second Installment: 35% due by second deadline
- Final Payment: 15% + penalties due by final deadline

---

## 6. Payment Status Engine

| Status | Condition | Access |
|--------|-----------|--------|
| Paid | amountPaid >= totalFees | Full access |
| Partially Paid | 0 < amountPaid < totalFees | Limited access |
| Unpaid | amountPaid = 0 | Basic access only |
| Overdue | past deadline + partial payment | Basic access only |

---

## 7. Fresh Student Workflow

```
Admission Offered
    ↓
Acceptance Fee Payment (Fresh ND/HND only)
    ↓
School Fees Payment
    ↓
(First Installment if using plan)
    ↓
(Second Installment)
    ↓
Registration Clearance
    ↓
Student Account Activation
    ↓
Academic Access Granted
```

---

## 8. Returning Student Workflow

```
Student Login
    ↓
School Fees Verification
    ↓
(If outstanding: Payment Portal)
    ↓
Semester Registration
    ↓
Eligibility Clearance
    ↓
Academic Access Granted
```

---

## 9. Access Control Map

| Service | Eligible | Partially Eligible | Not Eligible |
|--------|----------|-------------------|--------------|
| Dashboard | ✅ | ✅ | ✅ |
| Profile | ✅ | ✅ | ✅ |
| Financial Dashboard | ✅ | ✅ | ✅ |
| Learning Resources | ✅ | ❌ | ❌ |
| CBT Examinations | ✅ | ❌ | ❌ |
| Course Registration | ✅ | ⚠️ | ❌ |
| Results | ✅ | ❌ | ❌ |
| Assignments | ✅ | ❌ | ❌ |
| Projects | ✅ | ❌ | ❌ |
| Virtual Lab | ✅ | ❌ | ❌ |

---

## 10. Student Financial Dashboard

### Features
- Fee Breakdown by item
- Outstanding Balance display
- Payment History with receipts
- Invoice generation
- Payment gateway integration (Paystack, Bank Transfer)
- Installment plan tracking
- Academic eligibility status

---

## 11. Super Admin Configuration

### Capabilities
- Configure fee structure by:
  - Academic Session
  - Faculty
  - Department
  - Programme
  - Level
  - Semester
  - Entry Category (ND/HND)
  - Student Category (Fresh/Returning)
- Enable/disable fee items
- Set payment schedules
- Configure penalty periods
- Manage installment plans
- View payment reports

### Reports
- Paid Students Report
- Partially Paid Report
- Unpaid Students Report
- Faculty Payment Report
- Department Payment Report
- Programme Payment Report

---

## 12. Audit & Security

### Logged Events
- Payment creation
- Payment verification
- Payment receipt generation
- Registration approval
- Eligibility status changes
- Fee configuration changes

### Storage
All records stored for:
- Institutional accreditation
- Financial auditing
- Regulatory compliance
- Dispute resolution

---

## 13. Implementation Report

### 13.1 Files Created
- `src/lib/registration-eligibility.ts` - Core eligibility engine
- `src/app/portal/student/financial/page.tsx` - Student financial dashboard
- `src/app/portal/super-admin/fees/page.tsx` - Super admin fee configuration

### 13.2 Files Modified
- `src/components/layout/sidebar.tsx` - Added navigation items

### 13.3 Shared Architecture
The system uses the same student profile from `learning-resources.ts` ensuring consistency across all systems.

---

## 14. Quality Assurance

- ✅ TypeScript type checking
- ✅ Build compilation
- ✅ Navigation integration
- ✅ No duplicate systems

---

**Report Version**: 1.0.0  
**Last Updated**: 2024
