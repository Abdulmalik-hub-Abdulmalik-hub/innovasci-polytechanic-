# QUESTION BANK REPORT

**InnovaSci AI Labs Polytechnic**
**CBT Examination Engine**

---

## 1. Question Bank Structure

### 1.1 Organization Hierarchy

```
Question Bank
├── Entry Category (ND / HND)
├── Faculty (5 Schools)
├── Department (15)
├── Programme (45)
├── Level (ND1, ND2, HND1, HND2)
├── Semester (1, 2)
├── Course
└── Topic/Difficulty/Type
```

### 1.2 Question Types

| Type | Count | Auto-Grading |
|------|-------|-------------|
| Multiple Choice | 750 | ✅ |
| True/False | 300 | ✅ |
| Fill in Blank | 120 | ✅ |
| Short Answer | 50 | ⚠️ Manual |
| Essay | 20 | ⚠️ Manual |
| Matching | 25 | ✅ |
| Scenario-based | 10 | ⚠️ Manual |

---

## 2. Question Metadata

### 2.1 Required Fields

- Question ID (unique)
- Question Text
- Question Type
- Options (for MCQ, Matching)
- Correct Answer
- Marks
- Difficulty Level (Easy/Medium/Hard)
- Topic
- Course Reference
- Programme Reference
- Level/Semester
- Moderation Status

### 2.2 Optional Fields

- Explanation
- Image URL
- Hints
- Time Allocation

---

## 3. Question Bank Statistics

### 3.1 By Faculty

| Faculty | Questions | Active | Pending |
|---------|----------|--------|---------|
| School of AI & Computational Intelligence | 350 | 320 | 30 |
| School of Engineering | 420 | 390 | 30 |
| School of Business | 280 | 260 | 20 |
| School of Applied Sciences | 150 | 140 | 10 |
| School of Cybersecurity & Cloud Computing | 50 | 45 | 5 |
| **Total** | **1,250** | **1,155** | **95** |

### 3.2 By Difficulty

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 500 | 40% |
| Medium | 500 | 40% |
| Hard | 250 | 20% |

### 3.3 By Type

| Type | Count | Percentage |
|------|-------|------------|
| Multiple Choice | 750 | 60% |
| True/False | 300 | 24% |
| Fill in Blank | 120 | 9.6% |
| Others | 80 | 6.4% |

---

## 4. Question Creation Workflow

### 4.1 Creation Steps

1. **Select Course**: Choose from curriculum
2. **Enter Question**: Type question text
3. **Select Type**: Choose question type
4. **Add Options**: Enter choices (if MCQ)
5. **Set Correct Answer**: Mark correct option
6. **Assign Marks**: Set question value
7. **Set Difficulty**: Easy/Medium/Hard
8. **Add Topic**: Categorize question
9. **Submit for Moderation**: Send for review

### 4.2 Moderation Status

| Status | Description |
|--------|-------------|
| Pending | Awaiting review |
| Approved | Reviewed and approved |
| Rejected | Needs revision |

---

## 5. Question Bank Usage

### 5.1 Exam Generation

- Random selection from question pool
- Difficulty-based selection
- Topic coverage requirements
- Time allocation calculation

### 5.2 Question Pooling

Each exam draws questions from:
- 30% Easy questions
- 50% Medium questions
- 20% Hard questions

---

**Report Version**: 1.0.0
**Last Updated**: 2024