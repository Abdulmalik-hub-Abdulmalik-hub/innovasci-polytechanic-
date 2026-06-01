# ADMISSION NUMBER GENERATION REPORT

**InnovaSci Open Polytechnic**
**Admission Processing Engine**

---

## 1. Admission Number Format

### 1.1 Format Structure

```
INS/ND/CSC/2026/0001
```

| Segment | Description | Example |
|---------|-------------|---------|
| INS | Institution Code | InnovaSci |
| ND/HND | Entry Category | ND or HND |
| CSC | Programme Code | Computer Science |
| 2026 | Admission Year | 4 digits |
| 0001 | Sequential Number | 4 digits |

### 1.2 Format Configuration

The format is fully configurable:
- Institution Code: `INS` (default)
- Separator: `/` (default)
- Year Format: `YYYY` (4 digits)
- Sequence Padding: 4 digits

---

## 2. Programme Code Engine

### 2.1 Auto-Derivation

Programme codes are automatically derived from seeded programme data:

| Programme | Code |
|-----------|------|
| Computer Science | CSC |
| Software Engineering | SWE |
| Cyber Security | CYB |
| Business Administration | BAM |
| Electrical/Electronic Engineering | ELE |
| Science Laboratory Technology | SLT |
| Statistics | STA |
| Mass Communication | MAC |

### 2.2 Code Generation Rules

1. Take first 3 letters of each significant word
2. Remove common words (and, the, of)
3. Uppercase all letters
4. Maximum 6 characters

### 2.3 Fallback Mechanism

If programme not found in seeded data:
1. Generate code from programme name
2. Cache generated code
3. Use consistently across system

---

## 3. Sequential Number Management

### 3.1 Numbering Strategy

- Unique per programme + year + category
- INS/ND/CSC/2026/0001
- INS/ND/EEE/2026/0001
- INS/HND/CSC/2026/0001

### 3.2 Sequence Tracking

System maintains counters for each combination:
- Programme Code
- Entry Category (ND/HND)
- Admission Year

### 3.3 Duplicate Prevention

- Check existing numbers before generation
- Use atomic increment operations
- Log all generated numbers

---

## 4. Admission Number Generation Process

### 4.1 Generation Flow

```
Application Approved
    ↓
Get Programme Code
    ↓
Get Current Year
    ↓
Get Next Sequence Number
    ↓
Generate Admission Number
    ↓
Store in Database
    ↓
Log Generation Event
```

### 4.2 Example Generation

For Computer Science ND student in 2026:
1. Programme Code: `CSC`
2. Entry Category: `ND`
3. Admission Year: `2026`
4. Sequence: `0001`
5. Result: `INS/ND/CSC/2026/0001`

---

## 5. Validation

### 5.1 Format Validation

Regex pattern: `^[A-Z]{2,4}\/(ND|HND)\/[A-Z]{3,6}\/\d{2,4}\/\d{4}$`

### 5.2 Component Validation

| Component | Validation |
|-----------|------------|
| Institution Code | 2-4 uppercase letters |
| Entry Category | ND or HND |
| Programme Code | 3-6 uppercase letters |
| Year | 2-4 digits |
| Sequence | 4 digits |

---

## 6. Usage Examples

### 6.1 ND Admissions

```
INS/ND/CSC/2026/0001 - Computer Science
INS/ND/SWE/2026/0002 - Software Engineering
INS/ND/BAM/2026/0003 - Business Administration
INS/ND/ELE/2026/0004 - Electrical Engineering
```

### 6.2 HND Admissions

```
INS/HND/CSC/2026/0001 - Computer Science (HND)
INS/HND/BAM/2026/0002 - Business Administration (HND)
INS/HND/CYB/2026/0003 - Cyber Security (HND)
```

### 6.3 Year Variation

```
INS/ND/CSC/2025/0001 - 2025 admission
INS/ND/CSC/2026/0001 - 2026 admission (new sequence)
```

---

## 7. Integration

### 7.1 With Student Records

Each admission number is linked to:
- Student profile
- Academic record
- Programme enrollment
- Curriculum structure

### 7.2 With Admission Offers

Admission offers contain:
- Generated admission number
- Student information
- Programme details
- Admission year

---

**Report Version**: 1.0.0
**Last Updated**: 2024