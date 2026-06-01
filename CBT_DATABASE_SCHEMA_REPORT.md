# CBT DATABASE SCHEMA REPORT

**InnovaSci AI Labs Polytechnic**
**CBT Examination Engine**

---

## 1. Database Schema Overview

The CBT Examination Engine uses the following tables integrated with the existing seeded curriculum:

```
question_banks
questions
examinations
exam_approval_workflow
exam_sessions
exam_attempts
exam_results
exam_statistics
exam_security_logs
exam_incidents
exam_verification_forms
question_moderation
```

---

## 2. Table Definitions

### 2.1 question_banks

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Bank name |
| course_id | UUID | FK to courses |
| course_code | VARCHAR(50) | Course code |
| course_title | VARCHAR(255) | Course title |
| programme_id | UUID | FK to programmes |
| department_id | UUID | FK to departments |
| faculty_id | UUID | FK to faculties |
| level | INTEGER | Level (1-4) |
| semester | INTEGER | Semester (1-2) |
| entry_category | ENUM | ND/HND |
| total_questions | INTEGER | Total questions count |
| active_questions | INTEGER | Active questions count |
| created_by | UUID | FK to users |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes**: course_id, programme_id, department_id, faculty_id

---

### 2.2 questions

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| question_bank_id | UUID | FK to question_banks |
| course_id | UUID | FK to courses |
| course_code | VARCHAR(50) | Course code |
| type | ENUM | Question type |
| difficulty | ENUM | Easy/Medium/Hard |
| question_text | TEXT | Question content |
| options | JSONB | Options array (MCQ) |
| correct_answer | JSONB | Correct answer(s) |
| explanation | TEXT | Answer explanation |
| image_url | VARCHAR(500) | Image if any |
| topic | VARCHAR(100) | Topic name |
| marks | INTEGER | Question marks |
| is_active | BOOLEAN | Active status |
| moderation_status | ENUM | Pending/Approved/Rejected |
| moderated_by | UUID | FK to users |
| moderated_at | TIMESTAMP | Moderation timestamp |
| created_by | UUID | FK to users |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes**: course_id, type, difficulty, moderation_status

---

### 2.3 examinations

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR(255) | Exam title |
| course_id | UUID | FK to courses |
| question_bank_id | UUID | FK to question_banks |
| programme_id | UUID | FK to programmes |
| department_id | UUID | FK to departments |
| faculty_id | UUID | FK to faculties |
| level | INTEGER | Level |
| semester | INTEGER | Semester |
| entry_category | ENUM | ND/HND |
| academic_status | JSONB | Array of eligible statuses |
| duration | INTEGER | Minutes |
| total_questions | INTEGER | Question count |
| passing_marks | INTEGER | Pass mark percentage |
| marks_per_question | DECIMAL | Mark per question |
| negative_marking | BOOLEAN | Negative marking enabled |
| negative_marking_value | DECIMAL | Negative mark value |
| exam_date | DATE | Examination date |
| start_time | TIME | Start time |
| end_time | TIME | End time |
| availability_window | INTEGER | Window in minutes |
| max_attempts | INTEGER | Maximum attempts |
| allow_retake | BOOLEAN | Retake allowed |
| retake_delay | INTEGER | Hours between retakes |
| status | ENUM | Draft/Pending/Approved/Published/Active/Completed/Cancelled |
| approval_status | ENUM | Pending/Approved/Rejected |
| created_by | UUID | FK to users |
| created_at | TIMESTAMP | Creation timestamp |
| published_at | TIMESTAMP | Publish timestamp |

**Indexes**: course_id, programme_id, status, exam_date

---

### 2.4 exam_approval_workflow

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| examination_id | UUID | FK to examinations |
| level | ENUM | Approval level |
| order | INTEGER | Sequence |
| status | ENUM | Pending/Approved/Rejected |
| approved_by | UUID | FK to users |
| approved_at | TIMESTAMP | Approval timestamp |
| comments | TEXT | Comments/reason |

**Indexes**: examination_id, level

---

### 2.5 exam_sessions

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| examination_id | UUID | FK to examinations |
| student_id | UUID | FK to users |
| admission_number | VARCHAR(50) | Student admission no. |
| student_name | VARCHAR(255) | Student name |
| started_at | TIMESTAMP | Session start |
| ended_at | TIMESTAMP | Session end |
| remaining_time | INTEGER | Seconds remaining |
| status | ENUM | In_Progress/Paused/Completed/Submitted/Expired |
| ip_address | VARCHAR(45) | Student IP |
| device_info | TEXT | Device information |
| browser_info | TEXT | Browser details |
| current_question_index | INTEGER | Current question |
| answered_questions | JSONB | Array of answered indices |
| flagged_questions | JSONB | Array of flagged indices |
| auto_saved_at | TIMESTAMP | Last auto-save |

**Indexes**: examination_id, student_id, status

---

### 2.6 exam_attempts

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| session_id | UUID | FK to exam_sessions |
| examination_id | UUID | FK to examinations |
| student_id | UUID | FK to users |
| attempt_number | INTEGER | Attempt count |
| answers | JSONB | Student answers |
| objective_score | DECIMAL | Auto-graded score |
| subjective_score | DECIMAL | Manual graded score |
| total_score | DECIMAL | Combined score |
| percentage | DECIMAL | Percentage |
| grade | VARCHAR(5) | Letter grade |
| status | ENUM | In_Progress/Completed/Submitted/Graded/Published |
| submitted_at | TIMESTAMP | Submission time |
| graded_at | TIMESTAMP | Grading time |
| review_requested | BOOLEAN | Review requested |
| review_comments | TEXT | Review comments |

**Indexes**: examination_id, student_id, status

---

### 2.7 exam_results

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| attempt_id | UUID | FK to exam_attempts |
| examination_id | UUID | FK to examinations |
| student_id | UUID | FK to users |
| admission_number | VARCHAR(50) | Student admission no. |
| student_name | VARCHAR(255) | Student name |
| score | DECIMAL | Total score |
| total_marks | DECIMAL | Maximum marks |
| percentage | DECIMAL | Percentage |
| grade | VARCHAR(5) | Letter grade |
| status | ENUM | Pass/Fail |
| correct_answers | INTEGER | Correct count |
| wrong_answers | INTEGER | Wrong count |
| unattempted | INTEGER | Unattempted count |
| time_taken | INTEGER | Minutes taken |
| submitted_at | TIMESTAMP | Submission time |
| is_published | BOOLEAN | Published status |
| published_at | TIMESTAMP | Publish time |

**Indexes**: examination_id, student_id, is_published

---

### 2.8 exam_statistics

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| examination_id | UUID | FK to examinations |
| total_attempts | INTEGER | Total attempts |
| completed_attempts | INTEGER | Completed count |
| avg_score | DECIMAL | Average score |
| highest_score | DECIMAL | Highest score |
| lowest_score | DECIMAL | Lowest score |
| pass_count | INTEGER | Pass count |
| fail_count | INTEGER | Fail count |
| pass_rate | DECIMAL | Pass percentage |
| avg_time_taken | DECIMAL | Average time |
| calculated_at | TIMESTAMP | Calculation time |

---

### 2.9 exam_security_logs

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| session_id | UUID | FK to exam_sessions |
| event_type | ENUM | Event type |
| description | TEXT | Event description |
| severity | ENUM | Info/Warning/Critical |
| ip_address | VARCHAR(45) | IP address |
| device_info | TEXT | Device information |
| timestamp | TIMESTAMP | Event time |

**Indexes**: session_id, event_type, severity

---

### 2.10 exam_incidents

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| session_id | UUID | FK to exam_sessions |
| student_id | UUID | FK to users |
| examination_id | UUID | FK to examinations |
| type | ENUM | Incident type |
| description | TEXT | Incident details |
| resolution | TEXT | Resolution notes |
| resolved_by | UUID | FK to users |
| resolved_at | TIMESTAMP | Resolution time |
| status | ENUM | Open/Investigating/Resolved |

**Indexes**: examination_id, student_id, status

---

## 3. Foreign Key Relationships

```
question_banks.course_id → courses.id
question_banks.programme_id → programmes.id
question_banks.department_id → departments.id
question_banks.faculty_id → faculties.id

questions.question_bank_id → question_banks.id
questions.moderated_by → users.id

examinations.course_id → courses.id
examinations.question_bank_id → question_banks.id

exam_sessions.examination_id → examinations.id
exam_sessions.student_id → users.id

exam_attempts.session_id → exam_sessions.id
exam_attempts.examination_id → examinations.id

exam_results.attempt_id → exam_attempts.id
exam_results.examination_id → examinations.id
```

---

## 4. Curriculum Integration

All tables are linked to the existing seeded curriculum structure:
- Courses from curriculum
- Programmes from curriculum
- Departments from curriculum
- Faculties from curriculum
- Levels and semesters from curriculum

---

**Report Version**: 1.0.0
**Last Updated**: 2024