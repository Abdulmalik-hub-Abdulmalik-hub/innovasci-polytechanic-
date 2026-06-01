# PROGRAMME CODE MAPPING REPORT

**InnovaSci AI Labs Polytechnic**
**Admission Processing Engine**

---

## 1. Programme Code Mapping Overview

All programme codes are automatically derived from the seeded academic structure. No manual entry required.

---

## 2. Faculty Programme Mapping

### 2.1 School of AI & Computational Intelligence (SAI)

| Programme | Code | Type |
|-----------|------|------|
| Artificial Intelligence & Machine Learning | AIML | ND |
| Applied Machine Learning | AML | HND |
| Data Science | DSC | ND |
| Data Analytics | DAN | HND |
| Robotics & Intelligent Systems | RIS | ND |
| Robotics Engineering | RBE | HND |

### 2.2 School of Engineering (SOE)

| Programme | Code | Type |
|-----------|------|------|
| Electrical/Electronic Engineering | ELE | ND |
| Electrical Engineering | EEN | HND |
| Computer Engineering | CPE | ND |
| Computer Systems Engineering | CSE | HND |
| Telecommunications Engineering | TCE | ND |
| Mechatronics Engineering | MCE | ND |

### 2.3 School of Business (SOB)

| Programme | Code | Type |
|-----------|------|------|
| Business Administration | BAM | ND |
| Business Management | BMG | HND |
| Accounting | ACC | ND |
| Accounting Technology | ACT | HND |
| Banking & Finance | BFI | ND |
| Finance & Banking | FNB | HND |

### 2.4 School of Applied Sciences (SAS)

| Programme | Code | Type |
|-----------|------|------|
| Science Laboratory Technology | SLT | ND |
| Laboratory Science | LBS | HND |
| Statistics | STA | ND |
| Statistics & Data Science | SDS | HND |
| Biotechnology | BIT | ND |
| Industrial Biotechnology | IBT | HND |

### 2.5 School of Cybersecurity & Cloud Computing (SCC)

| Programme | Code | Type |
|-----------|------|------|
| Cyber Security | CYB | ND |
| Information Security | IFS | HND |
| Cloud Computing | CLO | ND |
| Cloud Systems | CLS | HND |

---

## 3. Code Generation Algorithm

### 3.1 Algorithm Steps

1. Remove prefixes (ND, HND, Diploma, Certificate)
2. Split into words
3. Take first 3 letters of significant words
4. Concatenate
5. Uppercase
6. Trim to 6 characters max

### 3.2 Examples

| Programme Name | Generated Code |
|----------------|----------------|
| Computer Science | CSC |
| Software Engineering | SWE |
| Business Administration | BAM |
| Electrical/Electronic Engineering | ELE |
| Science Laboratory Technology | SLT |
| Artificial Intelligence & Machine Learning | AIML |

---

## 4. Code Validation

### 4.1 Validation Rules

- Length: 3-6 characters
- Format: Uppercase letters only
- No numbers or special characters
- No spaces

### 4.2 Duplicate Prevention

System checks for:
- Duplicate codes within same faculty
- Similar codes across faculties
- Conflicting abbreviations

---

**Report Version**: 1.0.0
**Last Updated**: 2024