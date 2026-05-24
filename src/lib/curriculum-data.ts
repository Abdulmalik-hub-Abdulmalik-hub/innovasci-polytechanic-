// InnovaSci AI Labs Polytechnic - Complete ND Curriculum Structure

export interface Course {
  code: string;
  title: string;
  status: 'C' | 'E'; // Compulsory or Elective
  unit: number;
}

export interface Semester {
  id: string;
  number: 1 | 2;
  courses: Course[];
  totalUnits: number;
}

export interface Level {
  id: string;
  number: number;
  semesters: Semester[];
  totalUnits: number;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  departmentName: string;
  facultyId: string;
  facultyName: string;
  levels: Level[];
  totalUnits: number;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  facultyId: string;
  facultyName: string;
  programs: Program[];
}

export interface Faculty {
  id: string;
  code: string;
  name: string;
  departments: Department[];
}

// Complete Curriculum Data
export const curriculumData: Faculty[] = [
  // ============================================
  // FACULTY 1: School of Artificial Intelligence & Computational Intelligence
  // ============================================
  {
    id: 'fac-1',
    code: 'SAICI',
    name: 'School of Artificial Intelligence & Computational Intelligence',
    departments: [
      {
        id: 'dept-1',
        code: 'AIML',
        name: 'Artificial Intelligence & Machine Learning',
        facultyId: 'fac-1',
        facultyName: 'School of Artificial Intelligence & Computational Intelligence',
        programs: [
          {
            id: 'prog-1',
            code: 'AML',
            name: 'Diploma in Applied Machine Learning',
            departmentId: 'dept-1',
            departmentName: 'Artificial Intelligence & Machine Learning',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'AML 111', title: 'Linear Algebra for AI', status: 'C', unit: 3 },
                      { code: 'AML 112', title: 'Programming Foundations in Python', status: 'C', unit: 3 },
                      { code: 'AML 113', title: 'Introduction to Machine Learning', status: 'C', unit: 3 },
                      { code: 'AML 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 101', title: 'Logic & Critical Thinking', status: 'E', unit: 2 },
                      { code: 'ELE 102', title: 'Digital Literacy & Tools', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'AML 121', title: 'Supervised & Unsupervised Learning', status: 'C', unit: 3 },
                      { code: 'AML 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
                      { code: 'AML 123', title: 'Exploratory Data Analysis', status: 'C', unit: 3 },
                      { code: 'AML 124', title: 'Database Management Systems (SQL)', status: 'C', unit: 3 },
                      { code: 'AML 125', title: 'Ethics in Artificial Intelligence', status: 'C', unit: 2 },
                      { code: 'ELE 103', title: 'Cloud Infrastructure Basics', status: 'E', unit: 2 },
                      { code: 'ELE 104', title: 'Introduction to IoT', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'AML 211', title: 'Neural Networks & Deep Learning', status: 'C', unit: 4 },
                      { code: 'AML 212', title: 'MLOps: Machine Learning Operations', status: 'C', unit: 3 },
                      { code: 'AML 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'AML 214', title: 'Computer Vision Fundamentals', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 201', title: 'Advanced Excel for Data', status: 'E', unit: 2 },
                      { code: 'ELE 202', title: 'Reinforcement Learning', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'AML 221', title: 'Capstone Project (ML Application)', status: 'C', unit: 6 },
                      { code: 'AML 222', title: 'Natural Language Processing', status: 'C', unit: 3 },
                      { code: 'AML 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 203', title: 'AI for Finance', status: 'E', unit: 2 },
                      { code: 'ELE 204', title: 'AI for Healthcare', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-2',
            code: 'NLP',
            name: 'Diploma in Natural Language Processing',
            departmentId: 'dept-1',
            departmentName: 'Artificial Intelligence & Machine Learning',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'NLP 111', title: 'Introduction to Linguistics for AI', status: 'C', unit: 3 },
                      { code: 'NLP 112', title: 'Python for Text Processing', status: 'C', unit: 3 },
                      { code: 'NLP 113', title: 'Statistical Modeling for Language', status: 'C', unit: 3 },
                      { code: 'NLP 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 105', title: 'History of Computing', status: 'E', unit: 2 },
                      { code: 'ELE 106', title: 'Social Media Analytics', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'NLP 121', title: 'Syntax & Semantics in NLP', status: 'C', unit: 3 },
                      { code: 'NLP 122', title: 'Vector Space Models & Embeddings', status: 'C', unit: 3 },
                      { code: 'NLP 123', title: 'Regular Expressions & Automata', status: 'C', unit: 3 },
                      { code: 'NLP 124', title: 'Data Scraping & Preprocessing', status: 'C', unit: 3 },
                      { code: 'NLP 125', title: 'Ethics in Language Modeling', status: 'C', unit: 2 },
                      { code: 'ELE 107', title: 'Information Retrieval', status: 'E', unit: 2 },
                      { code: 'ELE 108', title: 'Web Development Basics', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'NLP 211', title: 'Large Language Models (LLMs)', status: 'C', unit: 4 },
                      { code: 'NLP 212', title: 'Sequence-to-Sequence Models', status: 'C', unit: 3 },
                      { code: 'NLP 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'NLP 214', title: 'Speech Recognition Systems', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 205', title: 'Translation Technologies', status: 'E', unit: 2 },
                      { code: 'ELE 206', title: 'Sentiment Analysis', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'NLP 221', title: 'Capstone Project (NLP Solution)', status: 'C', unit: 6 },
                      { code: 'NLP 222', title: 'Conversational AI & Chatbots', status: 'C', unit: 3 },
                      { code: 'NLP 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 207', title: 'AI Policy & Law', status: 'E', unit: 2 },
                      { code: 'ELE 208', title: 'Knowledge Graphs', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-3',
            code: 'DLN',
            name: 'Diploma in Deep Learning & Neural Systems',
            departmentId: 'dept-1',
            departmentName: 'Artificial Intelligence & Machine Learning',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'DLN 111', title: 'Calculus for Deep Learning', status: 'C', unit: 3 },
                      { code: 'DLN 112', title: 'Advanced Python & PyTorch', status: 'C', unit: 3 },
                      { code: 'DLN 113', title: 'Introduction to Neural Networks', status: 'C', unit: 3 },
                      { code: 'DLN 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 109', title: 'Cognitive Psychology', status: 'E', unit: 2 },
                      { code: 'ELE 110', title: 'Computer Architecture', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'DLN 121', title: 'Convolutional Neural Networks', status: 'C', unit: 3 },
                      { code: 'DLN 122', title: 'Recurrent Neural Networks', status: 'C', unit: 3 },
                      { code: 'DLN 123', title: 'Optimization Algorithms', status: 'C', unit: 3 },
                      { code: 'DLN 124', title: 'GPU Computing Fundamentals', status: 'C', unit: 3 },
                      { code: 'DLN 125', title: 'AI Fairness and Bias', status: 'C', unit: 2 },
                      { code: 'ELE 111', title: 'Linux System Admin', status: 'E', unit: 2 },
                      { code: 'ELE 112', title: 'Signal Processing', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'DLN 211', title: 'Generative Adversarial Networks (GANs)', status: 'C', unit: 4 },
                      { code: 'DLN 212', title: 'Transformer Architectures', status: 'C', unit: 3 },
                      { code: 'DLN 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'DLN 214', title: 'Hardware for AI Acceleration', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 209', title: 'Edge AI', status: 'E', unit: 2 },
                      { code: 'ELE 210', title: 'Bio-inspired Computing', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'DLN 221', title: 'Capstone Project (Neural Design)', status: 'C', unit: 6 },
                      { code: 'DLN 222', title: 'Deep Reinforcement Learning', status: 'C', unit: 3 },
                      { code: 'DLN 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 211', title: 'Federated Learning', status: 'E', unit: 2 },
                      { code: 'ELE 212', title: 'Explainable AI (XAI)', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'dept-2',
        code: 'CSS',
        name: 'Computational Science & Simulation',
        facultyId: 'fac-1',
        facultyName: 'School of Artificial Intelligence & Computational Intelligence',
        programs: [
          {
            id: 'prog-4',
            code: 'DTS',
            name: 'Diploma in Digital Twin Systems',
            departmentId: 'dept-2',
            departmentName: 'Computational Science & Simulation',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'DTS 111', title: 'Foundations of System Modeling', status: 'C', unit: 3 },
                      { code: 'DTS 112', title: 'Introduction to CAD & 3D Modeling', status: 'C', unit: 3 },
                      { code: 'DTS 113', title: 'Numerical Methods for Engineers', status: 'C', unit: 3 },
                      { code: 'DTS 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 113', title: 'Physics for Simulation', status: 'E', unit: 2 },
                      { code: 'ELE 114', title: 'Industrial IoT Sensors', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'DTS 121', title: 'Real-time Data Integration', status: 'C', unit: 3 },
                      { code: 'DTS 122', title: 'Sensors & Actuators in Digital Twins', status: 'C', unit: 3 },
                      { code: 'DTS 123', title: 'Simulation Programming in C++', status: 'C', unit: 3 },
                      { code: 'DTS 124', title: 'Cloud Infrastructure for Simulations', status: 'C', unit: 3 },
                      { code: 'DTS 125', title: 'Virtual Reality Environments', status: 'C', unit: 2 },
                      { code: 'ELE 115', title: 'Material Science Basics', status: 'E', unit: 2 },
                      { code: 'ELE 116', title: 'Cyber-Physical Systems', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'DTS 211', title: 'Predictive Maintenance Modeling', status: 'C', unit: 4 },
                      { code: 'DTS 212', title: 'Augmented Reality for Maintenance', status: 'C', unit: 3 },
                      { code: 'DTS 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'DTS 214', title: 'Big Data Analytics for Digital Twins', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 213', title: 'Smart City Simulation', status: 'E', unit: 2 },
                      { code: 'ELE 214', title: 'Network Security', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'DTS 221', title: 'Capstone Project (Digital Twin Build)', status: 'C', unit: 6 },
                      { code: 'DTS 222', title: 'System Lifecycle Management', status: 'C', unit: 3 },
                      { code: 'DTS 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 215', title: 'Robotics Integration', status: 'E', unit: 2 },
                      { code: 'ELE 216', title: 'Sustainable Engineering', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-5',
            code: 'PMA',
            name: 'Diploma in Predictive Modeling & Analytics',
            departmentId: 'dept-2',
            departmentName: 'Computational Science & Simulation',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'PMA 111', title: 'Principles of Forecasting', status: 'C', unit: 3 },
                      { code: 'PMA 112', title: 'Advanced Statistical Inference', status: 'C', unit: 3 },
                      { code: 'PMA 113', title: 'Data Visualization with Tableau/R', status: 'C', unit: 3 },
                      { code: 'PMA 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 117', title: 'Discrete Mathematics', status: 'E', unit: 2 },
                      { code: 'ELE 118', title: 'Business Intelligence', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'PMA 121', title: 'Time Series Analysis', status: 'C', unit: 3 },
                      { code: 'PMA 122', title: 'Econometrics for Data Science', status: 'C', unit: 3 },
                      { code: 'PMA 123', title: 'Optimization in Decision Making', status: 'C', unit: 3 },
                      { code: 'PMA 124', title: 'Programming for Analytics (R)', status: 'C', unit: 3 },
                      { code: 'PMA 125', title: 'Risk Analysis and Management', status: 'C', unit: 2 },
                      { code: 'ELE 119', title: 'Survey Methodology', status: 'E', unit: 2 },
                      { code: 'ELE 120', title: 'Marketing Analytics', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'PMA 211', title: 'Monte Carlo Simulation Methods', status: 'C', unit: 4 },
                      { code: 'PMA 212', title: 'Advanced Predictive Algorithms', status: 'C', unit: 3 },
                      { code: 'PMA 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'PMA 214', title: 'Geospatial Analytics', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 217', title: 'Healthcare Forecasting', status: 'E', unit: 2 },
                      { code: 'ELE 218', title: 'Game Theory', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'PMA 221', title: 'Capstone Project (Predictive Model)', status: 'C', unit: 6 },
                      { code: 'PMA 222', title: 'Operational Research', status: 'C', unit: 3 },
                      { code: 'PMA 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 219', title: 'Supply Chain Analytics', status: 'E', unit: 2 },
                      { code: 'ELE 220', title: 'Financial Engineering', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-6',
            code: 'CPE',
            name: 'Diploma in Computational Physics & Engineering',
            departmentId: 'dept-2',
            departmentName: 'Computational Science & Simulation',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'CPE 111', title: 'Classical Mechanics for Computing', status: 'C', unit: 3 },
                      { code: 'CPE 112', title: 'Computational Mathematics I', status: 'C', unit: 3 },
                      { code: 'CPE 113', title: 'Intro to Finite Element Analysis', status: 'C', unit: 3 },
                      { code: 'CPE 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 121', title: 'Thermodynamic Systems', status: 'E', unit: 2 },
                      { code: 'ELE 122', title: 'Electromagnetism Basics', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'CPE 121', title: 'Computational Fluid Dynamics (CFD)', status: 'C', unit: 3 },
                      { code: 'CPE 122', title: 'Multiphysics Simulation', status: 'C', unit: 3 },
                      { code: 'CPE 123', title: 'Parallel Programming (MPI/OpenMP)', status: 'C', unit: 3 },
                      { code: 'CPE 124', title: 'Structural Mechanics Modeling', status: 'C', unit: 3 },
                      { code: 'CPE 125', title: 'Scientific Visualization (ParaView)', status: 'C', unit: 2 },
                      { code: 'ELE 123', title: 'Numerical Linear Algebra', status: 'E', unit: 2 },
                      { code: 'ELE 124', title: 'Aerospace Simulation', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'CPE 211', title: 'High Performance Computing (HPC)', status: 'C', unit: 4 },
                      { code: 'CPE 212', title: 'Advanced Finite Element Methods', status: 'C', unit: 3 },
                      { code: 'CPE 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'CPE 214', title: 'Stochastic Processes in Physics', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 221', title: 'Quantum Mechanics Intro', status: 'E', unit: 2 },
                      { code: 'ELE 222', title: 'Renewable Energy Systems', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'CPE 221', title: 'Capstone Project (Eng. Simulation)', status: 'C', unit: 6 },
                      { code: 'CPE 222', title: 'Nonlinear Dynamics & Chaos', status: 'C', unit: 3 },
                      { code: 'CPE 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 223', title: 'Automotive Simulation', status: 'E', unit: 2 },
                      { code: 'ELE 224', title: 'Material Characterization', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'dept-3',
        code: 'RAS',
        name: 'Robotics & Autonomous Systems',
        facultyId: 'fac-1',
        facultyName: 'School of Artificial Intelligence & Computational Intelligence',
        programs: [
          {
            id: 'prog-7',
            code: 'AVT',
            name: 'Diploma in Autonomous Vehicle Technology',
            departmentId: 'dept-3',
            departmentName: 'Robotics & Autonomous Systems',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'AVT 111', title: 'Introduction to Autonomous Systems', status: 'C', unit: 3 },
                      { code: 'AVT 112', title: 'Robotics Programming (C++/Python)', status: 'C', unit: 3 },
                      { code: 'AVT 113', title: 'Kinematics & Dynamics', status: 'C', unit: 3 },
                      { code: 'AVT 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 125', title: 'Mechatronics Basics', status: 'E', unit: 2 },
                      { code: 'ELE 126', title: 'Embedded Systems Intro', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'AVT 121', title: 'Sensor Fusion (Lidar, Radar, Sonar)', status: 'C', unit: 3 },
                      { code: 'AVT 122', title: 'Computer Vision for Vehicles', status: 'C', unit: 3 },
                      { code: 'AVT 123', title: 'Control Systems Engineering', status: 'C', unit: 3 },
                      { code: 'AVT 124', title: 'Path Planning Algorithms', status: 'C', unit: 3 },
                      { code: 'AVT 125', title: 'Vehicle Safety Standards', status: 'C', unit: 2 },
                      { code: 'ELE 127', title: 'Battery Technology', status: 'E', unit: 2 },
                      { code: 'ELE 128', title: 'Real-time Operating Systems', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'AVT 211', title: 'Simultaneous Localization & Mapping', status: 'C', unit: 4 },
                      { code: 'AVT 212', title: 'Deep Learning for Robotics', status: 'C', unit: 3 },
                      { code: 'AVT 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'AVT 214', title: 'V2X (Vehicle-to-Everything) Comms', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 225', title: 'Fleet Management Systems', status: 'E', unit: 2 },
                      { code: 'ELE 226', title: 'Human-Robot Interaction', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'AVT 221', title: 'Capstone Project (AV Prototype)', status: 'C', unit: 6 },
                      { code: 'AVT 222', title: 'Ethics & Law of Autonomy', status: 'C', unit: 3 },
                      { code: 'AVT 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 227', title: 'Drone Navigation', status: 'E', unit: 2 },
                      { code: 'ELE 228', title: 'Advanced ROS (Robot OS)', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-8',
            code: 'IRA',
            name: 'Diploma in Industrial Robotics & Automation',
            departmentId: 'dept-3',
            departmentName: 'Robotics & Autonomous Systems',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'IRA 111', title: 'History of Industrial Automation', status: 'C', unit: 3 },
                      { code: 'IRA 112', title: 'PLC Programming Foundations', status: 'C', unit: 3 },
                      { code: 'IRA 113', title: 'Mechanical Design for Robotics', status: 'C', unit: 3 },
                      { code: 'IRA 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 129', title: 'Electrical Circuits', status: 'E', unit: 2 },
                      { code: 'ELE 130', title: 'Technical Drawing', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'IRA 121', title: 'Robotic Arm Kinematics', status: 'C', unit: 3 },
                      { code: 'IRA 122', title: 'SCADA Systems', status: 'C', unit: 3 },
                      { code: 'IRA 123', title: 'Hydraulics & Pneumatics', status: 'C', unit: 3 },
                      { code: 'IRA 124', title: 'Industrial Networking Protocols', status: 'C', unit: 3 },
                      { code: 'IRA 125', title: 'Workplace Safety in Automation', status: 'C', unit: 2 },
                      { code: 'ELE 131', title: 'Manufacturing Processes', status: 'E', unit: 2 },
                      { code: 'ELE 132', title: 'Quality Control', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'IRA 211', title: 'Collaborative Robots (Cobots)', status: 'C', unit: 4 },
                      { code: 'IRA 212', title: 'Smart Factory Architectures', status: 'C', unit: 3 },
                      { code: 'IRA 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'IRA 214', title: 'Machine Vision for Quality Insp.', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 229', title: 'ERP Systems', status: 'E', unit: 2 },
                      { code: 'ELE 230', title: 'Lean Six Sigma', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'IRA 221', title: 'Capstone Project (Robot Cell)', status: 'C', unit: 6 },
                      { code: 'IRA 222', title: 'Maintenance of Robotic Systems', status: 'C', unit: 3 },
                      { code: 'IRA 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 231', title: 'Warehouse Automation', status: 'E', unit: 2 },
                      { code: 'ELE 232', title: 'AI in Manufacturing', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-9',
            code: 'SIM',
            name: 'Diploma in Swarm Intelligence & Multi-Agent Systems',
            departmentId: 'dept-3',
            departmentName: 'Robotics & Autonomous Systems',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'SIM 111', title: 'Intro to Multi-Agent Systems', status: 'C', unit: 3 },
                      { code: 'SIM 112', title: 'Programming for Agent Simulation', status: 'C', unit: 3 },
                      { code: 'SIM 113', title: 'Biology-inspired Algorithms', status: 'C', unit: 3 },
                      { code: 'SIM 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 133', title: 'Cellular Automata', status: 'E', unit: 2 },
                      { code: 'ELE 134', title: 'Social Network Analysis', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'SIM 121', title: 'Swarm Robotics Foundations', status: 'C', unit: 3 },
                      { code: 'SIM 122', title: 'Distributed Computing Basics', status: 'C', unit: 3 },
                      { code: 'SIM 123', title: 'Game Theory for Agents', status: 'C', unit: 3 },
                      { code: 'SIM 124', title: 'Optimization via Swarm Models', status: 'C', unit: 3 },
                      { code: 'SIM 125', title: 'Ethics of Collective Intelligence', status: 'C', unit: 2 },
                      { code: 'ELE 135', title: 'Graph Theory', status: 'E', unit: 2 },
                      { code: 'ELE 136', title: 'Decentralized Storage', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'SIM 211', title: 'Coordination in Decentralized Sys', status: 'C', unit: 4 },
                      { code: 'SIM 212', title: 'Emergent Behavior Analysis', status: 'C', unit: 3 },
                      { code: 'SIM 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'SIM 214', title: 'Agent-Based Economic Modeling', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 233', title: 'Smart Grid Simulations', status: 'E', unit: 2 },
                      { code: 'ELE 234', title: 'Traffic Flow Modeling', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'SIM 221', title: 'Capstone Project (Swarm Design)', status: 'C', unit: 6 },
                      { code: 'SIM 222', title: 'Security in Multi-Agent Networks', status: 'C', unit: 3 },
                      { code: 'SIM 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 235', title: 'Evolutionary Computation', status: 'E', unit: 2 },
                      { code: 'ELE 236', title: 'Search & Rescue Robotics', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  // ============================================
  // FACULTY 2: School of Bio-Digital Science & Health Informatics
  // ============================================
  {
    id: 'fac-2',
    code: 'SBSHI',
    name: 'School of Bio-Digital Science & Health Informatics',
    departments: [
      {
        id: 'dept-4',
        code: 'BGD',
        name: 'Bioinformatics & Genomic Data Science',
        facultyId: 'fac-2',
        facultyName: 'School of Bio-Digital Science & Health Informatics',
        programs: [
          {
            id: 'prog-10',
            code: 'CGM',
            name: 'Diploma in Computational Genomics',
            departmentId: 'dept-4',
            departmentName: 'Bioinformatics & Genomic Data Science',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'CGM 111', title: 'Introduction to Molecular Biology', status: 'C', unit: 3 },
                      { code: 'CGM 112', title: 'Python for Bioinformatics', status: 'C', unit: 3 },
                      { code: 'CGM 113', title: 'Genetics and Heredity', status: 'C', unit: 3 },
                      { code: 'CGM 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 101', title: 'Chemistry for Life Sciences', status: 'E', unit: 2 },
                      { code: 'ELE 102', title: 'History of Science', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'CGM 121', title: 'Sequence Analysis Algorithms', status: 'C', unit: 3 },
                      { code: 'CGM 122', title: 'Bioinformatics Databases (NCBI/EBI)', status: 'C', unit: 3 },
                      { code: 'CGM 123', title: 'Statistical Genomics', status: 'C', unit: 3 },
                      { code: 'CGM 124', title: 'PERL & R for Biologists', status: 'C', unit: 3 },
                      { code: 'CGM 125', title: 'Bioethics & Data Privacy', status: 'C', unit: 2 },
                      { code: 'ELE 103', title: 'Microbial Genetics', status: 'E', unit: 2 },
                      { code: 'ELE 104', title: 'Linux for Bio-computing', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'CGM 211', title: 'Next-Generation Sequencing (NGS)', status: 'C', unit: 4 },
                      { code: 'CGM 212', title: 'Structural Bioinformatics', status: 'C', unit: 3 },
                      { code: 'CGM 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'CGM 214', title: 'Comparative Genomics', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 201', title: 'Population Genetics', status: 'E', unit: 2 },
                      { code: 'ELE 202', title: 'Epigenetics', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'CGM 221', title: 'Capstone Project (Genomic Analysis)', status: 'C', unit: 6 },
                      { code: 'CGM 222', title: 'Functional Genomics', status: 'C', unit: 3 },
                      { code: 'CGM 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 203', title: 'Cancer Genomics', status: 'E', unit: 2 },
                      { code: 'ELE 204', title: 'Plant Bioinformatics', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-11',
            code: 'MDD',
            name: 'Diploma in Molecular Modeling & Drug Discovery',
            departmentId: 'dept-4',
            departmentName: 'Bioinformatics & Genomic Data Science',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'MDD 111', title: 'Organic Chemistry Foundations', status: 'C', unit: 3 },
                      { code: 'MDD 112', title: 'Computational Chemistry I', status: 'C', unit: 3 },
                      { code: 'MDD 113', title: 'Molecular Mechanics', status: 'C', unit: 3 },
                      { code: 'MDD 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 105', title: 'Physical Chemistry', status: 'E', unit: 2 },
                      { code: 'ELE 106', title: 'Laboratory Safety', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'MDD 121', title: 'Protein Structure & Function', status: 'C', unit: 3 },
                      { code: 'MDD 122', title: 'Molecular Docking Techniques', status: 'C', unit: 3 },
                      { code: 'MDD 123', title: 'Computer-Aided Drug Design (CADD)', status: 'C', unit: 3 },
                      { code: 'MDD 124', title: 'Quantum Chemistry Basics', status: 'C', unit: 3 },
                      { code: 'MDD 125', title: 'Pharmacokinetics & Dynamics', status: 'C', unit: 2 },
                      { code: 'ELE 107', title: 'Medicinal Chemistry', status: 'E', unit: 2 },
                      { code: 'ELE 108', title: 'Scientific Scripting', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'MDD 211', title: 'Virtual Screening & Lead Opt.', status: 'C', unit: 4 },
                      { code: 'MDD 212', title: 'Molecular Dynamics Simulations', status: 'C', unit: 3 },
                      { code: 'MDD 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'MDD 214', title: 'Chemoinformatics', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 205', title: 'Toxicology Simulation', status: 'E', unit: 2 },
                      { code: 'ELE 206', title: 'Enzyme Kinetics', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'MDD 221', title: 'Capstone Project (Drug Design)', status: 'C', unit: 6 },
                      { code: 'MDD 222', title: 'AI in Pharmaceutical Research', status: 'C', unit: 3 },
                      { code: 'MDD 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 207', title: 'Clinical Trial Design', status: 'E', unit: 2 },
                      { code: 'ELE 208', title: 'Regulatory Affairs', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-12',
            code: 'SYB',
            name: 'Diploma in Systems Biology',
            departmentId: 'dept-4',
            departmentName: 'Bioinformatics & Genomic Data Science',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'SYB 111', title: 'Intro to Biological Systems', status: 'C', unit: 3 },
                      { code: 'SYB 112', title: 'Mathematical Modeling in Biology', status: 'C', unit: 3 },
                      { code: 'SYB 113', title: 'Network Theory', status: 'C', unit: 3 },
                      { code: 'SYB 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 109', title: 'Cell Biology', status: 'E', unit: 2 },
                      { code: 'ELE 110', title: 'Python for Science', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'SYB 121', title: 'Metabolic Pathway Analysis', status: 'C', unit: 3 },
                      { code: 'SYB 122', title: 'Signaling Networks', status: 'C', unit: 3 },
                      { code: 'SYB 123', title: 'Ordinary Differential Equations', status: 'C', unit: 3 },
                      { code: 'SYB 124', title: 'Flux Balance Analysis', status: 'C', unit: 3 },
                      { code: 'SYB 125', title: 'Robustness in Biological Systems', status: 'C', unit: 2 },
                      { code: 'ELE 111', title: 'Evolutionary Biology', status: 'E', unit: 2 },
                      { code: 'ELE 112', title: 'Nonlinear Dynamics', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'SYB 211', title: 'Dynamic Modeling of Cells', status: 'C', unit: 4 },
                      { code: 'SYB 212', title: 'Proteomics and Metabolomics', status: 'C', unit: 3 },
                      { code: 'SYB 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'SYB 214', title: 'Stochastic Modeling in Bio', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 209', title: 'Synthetic Biology', status: 'E', unit: 2 },
                      { code: 'ELE 210', title: 'High-Throughput Data', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'SYB 221', title: 'Capstone Project (System Model)', status: 'C', unit: 6 },
                      { code: 'SYB 222', title: 'Integrative Bioinformatics', status: 'C', unit: 3 },
                      { code: 'SYB 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 211', title: 'Personalized Medicine', status: 'E', unit: 2 },
                      { code: 'ELE 212', title: 'Microbiome Analysis', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'dept-5',
        code: 'DHT',
        name: 'Digital Health & Telemedicine',
        facultyId: 'fac-2',
        facultyName: 'School of Bio-Digital Science & Health Informatics',
        programs: [
          {
            id: 'prog-13',
            code: 'HIS',
            name: 'Diploma in Health Information Systems',
            departmentId: 'dept-5',
            departmentName: 'Digital Health & Telemedicine',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'HIS 111', title: 'Intro to Health Informatics', status: 'C', unit: 3 },
                      { code: 'HIS 112', title: 'Electronic Health Records (EHR)', status: 'C', unit: 3 },
                      { code: 'HIS 113', title: 'Database Design for Healthcare', status: 'C', unit: 3 },
                      { code: 'HIS 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 113', title: 'Healthcare Management', status: 'E', unit: 2 },
                      { code: 'ELE 114', title: 'Medical Terminology', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'HIS 121', title: 'Interoperability Standards (HL7)', status: 'C', unit: 3 },
                      { code: 'HIS 122', title: 'Health Data Privacy & Security', status: 'C', unit: 3 },
                      { code: 'HIS 123', title: 'Clinical Decision Support Systems', status: 'C', unit: 3 },
                      { code: 'HIS 124', title: 'Healthcare Workflow Analysis', status: 'C', unit: 3 },
                      { code: 'HIS 125', title: 'Medical Coding (ICD-10/SNOMED)', status: 'C', unit: 2 },
                      { code: 'ELE 115', title: 'Public Health Informatics', status: 'E', unit: 2 },
                      { code: 'ELE 116', title: 'IT Project Management', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'HIS 211', title: 'Population Health Analytics', status: 'C', unit: 4 },
                      { code: 'HIS 212', title: 'Health Information Exchange (HIE)', status: 'C', unit: 3 },
                      { code: 'HIS 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'HIS 214', title: 'Medical Imaging Informatics', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 213', title: 'Telehealth Regulation', status: 'E', unit: 2 },
                      { code: 'ELE 214', title: 'Big Data in Medicine', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'HIS 221', title: 'Capstone Project (HIS Design)', status: 'C', unit: 6 },
                      { code: 'HIS 222', title: 'Quality Improvement in Health IT', status: 'C', unit: 3 },
                      { code: 'HIS 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 215', title: 'Pharmacy Informatics', status: 'E', unit: 2 },
                      { code: 'ELE 216', title: 'Nursing Informatics', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-14',
            code: 'TRC',
            name: 'Diploma in Telemedicine & Remote Care',
            departmentId: 'dept-5',
            departmentName: 'Digital Health & Telemedicine',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'TRC 111', title: 'Foundations of Telemedicine', status: 'C', unit: 3 },
                      { code: 'TRC 112', title: 'Networking for Health Systems', status: 'C', unit: 3 },
                      { code: 'TRC 113', title: 'Digital Communication Devices', status: 'C', unit: 3 },
                      { code: 'TRC 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 117', title: 'Patient Psychology', status: 'E', unit: 2 },
                      { code: 'ELE 118', title: 'Intro to Web Portals', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'TRC 121', title: 'Remote Patient Monitoring (RPM)', status: 'C', unit: 3 },
                      { code: 'TRC 122', title: 'Videoconferencing Technologies', status: 'C', unit: 3 },
                      { code: 'TRC 123', title: 'Mobile Health (mHealth) Apps', status: 'C', unit: 3 },
                      { code: 'TRC 124', title: 'IoT in Remote Healthcare', status: 'C', unit: 3 },
                      { code: 'TRC 125', title: 'Ethics of Distance Care', status: 'C', unit: 2 },
                      { code: 'ELE 119', title: 'Cloud Computing for Health', status: 'E', unit: 2 },
                      { code: 'ELE 120', title: 'Wireless Sensor Networks', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'TRC 211', title: 'Wearable Health Technology', status: 'C', unit: 4 },
                      { code: 'TRC 212', title: 'Virtual Care Implementation', status: 'C', unit: 3 },
                      { code: 'TRC 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'TRC 214', title: 'Cybersecurity for Telemedicine', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 217', title: 'Geriatric Remote Care', status: 'E', unit: 2 },
                      { code: 'ELE 218', title: 'Disaster Recovery in IT', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'TRC 221', title: 'Capstone Project (Remote Solution)', status: 'C', unit: 6 },
                      { code: 'TRC 222', title: 'Global Health Telemedicine', status: 'C', unit: 3 },
                      { code: 'TRC 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 219', title: 'AI Diagnostics', status: 'E', unit: 2 },
                      { code: 'ELE 220', title: 'Business of Telehealth', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-15',
            code: 'MIV',
            name: 'Diploma in Medical Imaging & Visualization',
            departmentId: 'dept-5',
            departmentName: 'Digital Health & Telemedicine',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'MIV 111', title: 'Physics of Medical Imaging', status: 'C', unit: 3 },
                      { code: 'MIV 112', title: 'Digital Image Fundamentals', status: 'C', unit: 3 },
                      { code: 'MIV 113', title: 'Human Anatomy for Imaging', status: 'C', unit: 3 },
                      { code: 'MIV 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 121', title: 'Radiation Safety', status: 'E', unit: 2 },
                      { code: 'ELE 122', title: 'Math for Imaging', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'MIV 121', title: 'Computed Tomography (CT) Imaging', status: 'C', unit: 3 },
                      { code: 'MIV 122', title: 'MRI & Ultrasound Principles', status: 'C', unit: 3 },
                      { code: 'MIV 123', title: 'Image Processing in Python/C++', status: 'C', unit: 3 },
                      { code: 'MIV 124', title: 'DICOM Standards & PACS', status: 'C', unit: 3 },
                      { code: 'MIV 125', title: 'Contrast Agents & Bio-markers', status: 'C', unit: 2 },
                      { code: 'ELE 123', title: 'Signal Processing', status: 'E', unit: 2 },
                      { code: 'ELE 124', title: 'Pattern Recognition', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'MIV 211', title: '3D Medical Visualization', status: 'C', unit: 4 },
                      { code: 'MIV 212', title: 'Deep Learning for Radiology', status: 'C', unit: 3 },
                      { code: 'MIV 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'MIV 214', title: 'Virtual Surgical Planning', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 221', title: 'Nuclear Medicine', status: 'E', unit: 2 },
                      { code: 'ELE 222', title: 'Microscopy Imaging', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'MIV 221', title: 'Capstone Project (Imaging App)', status: 'C', unit: 6 },
                      { code: 'MIV 222', title: 'Radiomics & Quantitative Imaging', status: 'C', unit: 3 },
                      { code: 'MIV 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 223', title: 'Tele-radiology', status: 'E', unit: 2 },
                      { code: 'ELE 224', title: 'AR/VR in Surgery', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'dept-6',
        code: 'BSS',
        name: 'Biotechnology & Synthetic Systems',
        facultyId: 'fac-2',
        facultyName: 'School of Bio-Digital Science & Health Informatics',
        programs: [
          {
            id: 'prog-16',
            code: 'SBE',
            name: 'Diploma in Synthetic Biology Engineering',
            departmentId: 'dept-6',
            departmentName: 'Biotechnology & Synthetic Systems',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'SBE 111', title: 'Intro to Synthetic Biology', status: 'C', unit: 3 },
                      { code: 'SBE 112', title: 'DNA Design and Synthesis', status: 'C', unit: 3 },
                      { code: 'SBE 113', title: 'Lab Automation & Robotics', status: 'C', unit: 3 },
                      { code: 'SBE 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 125', title: 'Microbiology', status: 'E', unit: 2 },
                      { code: 'ELE 126', title: 'Bio-programming', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'SBE 121', title: 'Genetic Circuit Design', status: 'C', unit: 3 },
                      { code: 'SBE 122', title: 'CRISPR & Gene Editing Tools', status: 'C', unit: 3 },
                      { code: 'SBE 123', title: 'Metabolic Engineering', status: 'C', unit: 3 },
                      { code: 'SBE 124', title: 'Software for Bio-design', status: 'C', unit: 3 },
                      { code: 'SBE 125', title: 'Dual-Use Research & Security', status: 'C', unit: 2 },
                      { code: 'ELE 127', title: 'Industrial Biotech', status: 'E', unit: 2 },
                      { code: 'ELE 128', title: 'Microfluidics', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'SBE 211', title: 'Bio-manufacturing Systems', status: 'C', unit: 4 },
                      { code: 'SBE 212', title: 'Engineered Micro-organisms', status: 'C', unit: 3 },
                      { code: 'SBE 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'SBE 214', title: 'Standards in Syn-Bio (SBOL)', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 225', title: 'Bio-energy Systems', status: 'E', unit: 2 },
                      { code: 'ELE 226', title: 'Intellectual Property', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'SBE 221', title: 'Capstone Project (Syn-Bio Design)', status: 'C', unit: 6 },
                      { code: 'SBE 222', title: 'Ethics of Life Engineering', status: 'C', unit: 3 },
                      { code: 'SBE 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 227', title: 'Nanotechnology', status: 'E', unit: 2 },
                      { code: 'ELE 228', title: 'Bio-material Science', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-17',
            code: 'BMP',
            name: 'Diploma in Bio-Manufacturing & Processing',
            departmentId: 'dept-6',
            departmentName: 'Biotechnology & Synthetic Systems',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'BMP 111', title: 'Principles of Bioprocessing', status: 'C', unit: 3 },
                      { code: 'BMP 112', title: 'Fluid Mechanics for Bio-reactors', status: 'C', unit: 3 },
                      { code: 'BMP 113', title: 'Bioprocess Calculations', status: 'C', unit: 3 },
                      { code: 'BMP 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 129', title: 'General Biology', status: 'E', unit: 2 },
                      { code: 'ELE 130', title: 'Excel for Engineers', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'BMP 121', title: 'Upstream Processing', status: 'C', unit: 3 },
                      { code: 'BMP 122', title: 'Downstream Processing', status: 'C', unit: 3 },
                      { code: 'BMP 123', title: 'Heat & Mass Transfer', status: 'C', unit: 3 },
                      { code: 'BMP 124', title: 'Instrumentation & Control', status: 'C', unit: 3 },
                      { code: 'BMP 125', title: 'GMP (Good Manufacturing Practice)', status: 'C', unit: 2 },
                      { code: 'ELE 131', title: 'Quality Assurance', status: 'E', unit: 2 },
                      { code: 'ELE 132', title: 'Bio-safety Protocols', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'BMP 211', title: 'Scaling-up Bio-processes', status: 'C', unit: 4 },
                      { code: 'BMP 212', title: 'Bio-reactor Design & Opt.', status: 'C', unit: 3 },
                      { code: 'BMP 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'BMP 214', title: 'Data Analytics in Manufacturing', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 229', title: 'Supply Chain in Pharma', status: 'E', unit: 2 },
                      { code: 'ELE 230', title: 'Environmental Biotech', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'BMP 221', title: 'Capstone Project (Process Design)', status: 'C', unit: 6 },
                      { code: 'BMP 222', title: 'Sustainability in Bio-processing', status: 'C', unit: 3 },
                      { code: 'BMP 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 231', title: 'Waste Treatment', status: 'E', unit: 2 },
                      { code: 'ELE 232', title: 'Lean Manufacturing', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'prog-18',
            code: 'ABT',
            name: 'Diploma in Agricultural Biotechnology',
            departmentId: 'dept-6',
            departmentName: 'Biotechnology & Synthetic Systems',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 72,
            levels: [
              {
                id: 'l1-s1',
                number: 1,
                totalUnits: 19,
                semesters: [
                  {
                    id: 's1',
                    number: 1,
                    totalUnits: 19,
                    courses: [
                      { code: 'ABT 111', title: 'Intro to Plant Biotechnology', status: 'C', unit: 3 },
                      { code: 'ABT 112', title: 'Soil Science & Microbiology', status: 'C', unit: 3 },
                      { code: 'ABT 113', title: 'Agricultural Systems Design', status: 'C', unit: 3 },
                      { code: 'ABT 114', title: 'Computational Statistics', status: 'C', unit: 3 },
                      { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
                      { code: 'ELE 133', title: 'Crop Physiology', status: 'E', unit: 2 },
                      { code: 'ELE 134', title: 'Weather Data Analysis', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's2',
                    number: 2,
                    totalUnits: 19,
                    courses: [
                      { code: 'ABT 121', title: 'Genetic Improvement of Crops', status: 'C', unit: 3 },
                      { code: 'ABT 122', title: 'Precision Agriculture & Sensors', status: 'C', unit: 3 },
                      { code: 'ABT 123', title: 'Plant Tissue Culture', status: 'C', unit: 3 },
                      { code: 'ABT 124', title: 'Digital Mapping for Agriculture', status: 'C', unit: 3 },
                      { code: 'ABT 125', title: 'Food Security & Ethics', status: 'C', unit: 2 },
                      { code: 'ELE 135', title: 'Pest Management', status: 'E', unit: 2 },
                      { code: 'ELE 136', title: 'Drone Apps in Farming', status: 'E', unit: 2 },
                    ]
                  }
                ]
              },
              {
                id: 'l2-s1',
                number: 2,
                totalUnits: 34,
                semesters: [
                  {
                    id: 's3',
                    number: 1,
                    totalUnits: 20,
                    courses: [
                      { code: 'ABT 211', title: 'Bio-fortification & Nutrition', status: 'C', unit: 4 },
                      { code: 'ABT 212', title: 'Smart Irrigation Systems', status: 'C', unit: 3 },
                      { code: 'ABT 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
                      { code: 'ABT 214', title: 'Livestock Genomics', status: 'C', unit: 3 },
                      { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
                      { code: 'ELE 233', title: 'Vertical Farming', status: 'E', unit: 2 },
                      { code: 'ELE 234', title: 'Ag-FinTech', status: 'E', unit: 2 },
                    ]
                  },
                  {
                    id: 's4',
                    number: 2,
                    totalUnits: 14,
                    courses: [
                      { code: 'ABT 221', title: 'Capstone Project (Agri-Bio)', status: 'C', unit: 6 },
                      { code: 'ABT 222', title: 'Ag-Business Management', status: 'C', unit: 3 },
                      { code: 'ABT 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
                      { code: 'ELE 235', title: 'Climate-Smart Agri', status: 'E', unit: 2 },
                      { code: 'ELE 236', title: 'Food Processing Tech', status: 'E', unit: 2 },
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

// Helper function to get all courses flattened
export function getAllCourses(): Course[] {
  const courses: Course[] = [];
  curriculumData.forEach(faculty => {
    faculty.departments.forEach(dept => {
      dept.programs.forEach(program => {
        program.levels.forEach(level => {
          level.semesters.forEach(semester => {
            courses.push(...semester.courses);
          });
        });
      });
    });
  });
  return courses;
}

// Helper function to get program by code
export function getProgramByCode(code: string): Program | undefined {
  for (const faculty of curriculumData) {
    for (const dept of faculty.departments) {
      const program = dept.programs.find(p => p.code === code);
      if (program) return program;
    }
  }
  return undefined;
}

// Helper function to get department by code
export function getDepartmentByCode(code: string): Department | undefined {
  for (const faculty of curriculumData) {
    const dept = faculty.departments.find(d => d.code === code);
    if (dept) return dept;
  }
  return undefined;
}

// Helper function to get faculty by code
export function getFacultyByCode(code: string): Faculty | undefined {
  return curriculumData.find(f => f.code === code);
}

// Total statistics
export const curriculumStats = {
  totalFaculties: curriculumData.length,
  totalDepartments: curriculumData.reduce((acc, f) => acc + f.departments.length, 0),
  totalPrograms: curriculumData.reduce((acc, f) => acc + f.departments.reduce((a, d) => a + d.programs.length, 0), 0),
  totalCourses: getAllCourses().length,
  totalCredits: getAllCourses().reduce((acc, c) => acc + c.unit, 0),
};