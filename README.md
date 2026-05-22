# InnovaSci AI Labs Polytechnic Platform

A production-ready, scalable, university-grade SaaS platform combining LMS, CBT Examination System, Academic Governance, Payment System, and more.

## 🚀 Features

### Core Systems
- **Learning Management System (LMS)** - Full-featured course management, materials, and progress tracking
- **CBT Examination System** - Professional exam engine with timer, question palette, and anti-cheat
- **Academic Governance** - Complete RBAC with 10+ user roles
- **Payment & Access Control** - Paystack integration with semester-based access control
- **Transcript & Certification Engine** - Dynamic document generation with institutional branding

### User Roles
- Student
- Lecturer
- HOD (Head of Department)
- Exam Officer
- Finance Officer
- Admission Officer
- Student Affairs
- System Admin
- Super Admin (Permanent owner: webuildandtarinbuilders@gmail.com)

### Academic Structure
- Faculty → Department → Program → Level → Semester → Courses
- Automatic GPA/CGPA calculation
- Carryover management
- Semester progression

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Custom Shadcn-style components
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Form Handling:** React Hook Form + Zod

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Abdulmalik-hub-Abdulmalik-hub/innovasci-platform.git

# Navigate to project directory
cd innovasci-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🏃‍♀️ Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Protected dashboard pages
│   ├── auth/               # Authentication pages
│   ├── admission/          # Public admission system
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Sidebar, Header)
│   └── shared/             # Shared components
├── lib/                    # Utilities and helpers
├── store/                  # Zustand state management
├── types/                  # TypeScript type definitions
├── features/               # Feature-based modules
└── hooks/                  # Custom React hooks
```

## 🎨 Design System

- Modern SaaS aesthetics (Vercel/Linear style)
- Glassmorphism effects
- Smooth Framer Motion animations
- Responsive design (mobile-first)
- Dark/Light mode support

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | student@innovasci.edu | any |
| Lecturer | lecturer@innovasci.edu | any |
| Admin | admin@innovasci.edu | any |
| Super Admin | super@innovasci.edu | any |

## 📝 License

This project is part of InnovaSci AI Labs Polytechnic.

---

Built with ❤️ for future-ready education.