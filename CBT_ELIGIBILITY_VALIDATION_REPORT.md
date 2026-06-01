# CBT ELIGIBILITY VALIDATION REPORT

**InnovaSci AI Labs Polytechnic**
**CBT Examination Access Engine**

---

## 1. Eligibility Validation Overview

The CBT Student Examination Access Engine validates student eligibility before granting examination access.

---

## 2. Validation Checks

### 2.1 Student Status Check
| Status | Access Allowed |
|--------|---------------|
| active | ✅ Yes |
| graduated | ❌ No |
| suspended | ❌ No |
| withdrawn | ❌ No |

### 2.2 Academic Level Validation
| Level | Valid | Access |
|-------|-------|--------|
| 1 | ✅ | Yes |
| 2 | ✅ | Yes |
| 3 | ✅ | Yes (HND only) |
| 4 | ✅ | Yes (HND only) |

### 2.3 Semester Validation
| Semester | Valid | Access |
|----------|-------|--------|
| 1 | ✅ | Yes |
| 2 | ✅ | Yes |

### 2.4 Course Registration
| Status | Access |
|---------|--------|
| Registered | ✅ Show exam |
| Not Registered | ❌ Hide exam |

---

## 3. Access Denied Scenarios

### 3.1 Ineligible Student Banner
When a student is not eligible to take examinations, an error banner is displayed:

```
┌─────────────────────────────────────────────────────┐
│ ❌ Examination Access Restricted                     │
│                                                     │
│ Student status is "suspended". Only active students │
│ can take examinations.                               │
│                                                     │
│ [Dismiss]                                           │
└─────────────────────────────────────────────────────┘
```

### 3.2 Disabled Exam Buttons
Examination start buttons are disabled for ineligible students.

---

## 4. Verification Process

### 4.1 Identity Verification Step 1
- Display student information (auto-populated)
- Confirm admission number
- Verify identity

### 4.2 Identity Verification Step 2
- Display verification success
- Show examination details
- Confirm readiness

### 4.3 Final Confirmation
- Review instructions
- Accept terms
- Start examination

---

## 5. Error Messages

| Scenario | Error Message |
|----------|---------------|
| Inactive student | "Student status is 'suspended'. Only active students can take examinations." |
| Invalid level | "Invalid academic level: {level}" |
| Invalid semester | "Invalid semester: {semester}" |
| Registration issue | "Student record verification failed" |

---

**Report Version**: 1.0.0
**Last Updated**: 2024