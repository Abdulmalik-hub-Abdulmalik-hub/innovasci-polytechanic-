// InnovaSci AI Labs Polytechnic - Complete ND & HND Curriculum Structure

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
        ,
          {
            id: 'prog-hnd-1',
            code: 'AML-HND',
            name: 'HND in Applied Machine Learning',
            departmentId: 'dept-1',
            departmentName: 'Artificial Intelligence & Machine Learning',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-1-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-1-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'AML 311', title: 'Advanced Neural Architectures & Transformer Models', status: 'C', unit: 4 },
                { code: 'AML 312', title: 'Prompt Engineering for AI System Development', status: 'C', unit: 3 },
                { code: 'AML 313', title: 'AI-Assisted Full-Stack Engineering (Next.js/FastAPI)', status: 'C', unit: 4 },
                { code: 'AML 314', title: 'Mobile AI Environments (Termux, Pydroid, Acode)', status: 'C', unit: 3 },
                { code: 'AML 315', title: 'DevOps for AI: Docker & CI/CD Pipelines', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-1-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'AML 321', title: 'Generative AI Coding Workflows & Rapid Prototyping', status: 'C', unit: 4 },
                { code: 'AML 322', title: 'Reinforcement Learning & Autonomous Agents', status: 'C', unit: 4 },
                { code: 'AML 323', title: 'Cloud AI Deployment & Infrastructure (AWS/GCP)', status: 'C', unit: 4 },
                { code: 'AML 324', title: 'MLOps: Scalable Model Monitoring', status: 'C', unit: 3 },
                { code: 'AML 325', title: 'AI System Debugging & Optimization', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-1-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-1-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'AML 411', title: 'Large Language Model (LLM) Ops & Fine-Tuning', status: 'C', unit: 4 },
                { code: 'AML 412', title: 'Advanced Computer Vision & Multimodal AI', status: 'C', unit: 4 },
                { code: 'AML 413', title: 'Distributed AI Training & Edge Computing', status: 'C', unit: 4 },
                { code: 'AML 414', title: 'AI Product Engineering & Startup Innovation', status: 'C', unit: 3 },
                { code: 'AML 415', title: 'Ethical AI Governance & Algorithmic Fairness', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-1-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'AML 421', title: 'Advanced AI Research Methodology', status: 'C', unit: 3 },
                { code: 'AML 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-2',
            code: 'NLP-HND',
            name: 'HND in Natural Language Processing',
            departmentId: 'dept-1',
            departmentName: 'Artificial Intelligence & Machine Learning',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-2-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-2-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'NLP 311', title: 'Neural Machine Translation & Sequence Models', status: 'C', unit: 4 },
                { code: 'NLP 312', title: 'Advanced Prompt Engineering & Chain-of-Thought', status: 'C', unit: 3 },
                { code: 'NLP 313', title: 'Python for Computational Linguistics & LLMs', status: 'C', unit: 4 },
                { code: 'NLP 314', title: 'Mobile NLP IDEs & Cloud Workspaces (Replit/GitHub)', status: 'C', unit: 3 },
                { code: 'NLP 315', title: 'Vector Databases & RAG System Architecture', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-2-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'NLP 321', title: 'LLM Fine-Tuning & Parameter Efficient Tuning (PEFT)', status: 'C', unit: 4 },
                { code: 'NLP 322', title: 'Conversational AI & Advanced Chatbot Engineering', status: 'C', unit: 4 },
                { code: 'NLP 323', title: 'Sentiment Analysis & Opinion Mining at Scale', status: 'C', unit: 4 },
                { code: 'NLP 324', title: 'AI-Assisted Documentation & Tech Writing', status: 'C', unit: 3 },
                { code: 'NLP 325', title: 'Multilingual NLP & African Language Modeling', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-2-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-2-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'NLP 411', title: 'LLMOps: Monitoring, Scaling & Governance', status: 'C', unit: 4 },
                { code: 'NLP 412', title: 'Speech-to-Text & Multimodal NLP Systems', status: 'C', unit: 4 },
                { code: 'NLP 413', title: 'Semantic Search & Knowledge Graph Engineering', status: 'C', unit: 4 },
                { code: 'NLP 414', title: 'NLP Startup Product Development', status: 'C', unit: 3 },
                { code: 'NLP 415', title: 'Bias Mitigation in Language Models', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-2-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'NLP 421', title: 'Advanced NLP Research Methods', status: 'C', unit: 3 },
                { code: 'NLP 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-3',
            code: 'DLN-HND',
            name: 'HND in Deep Learning & Neural Systems',
            departmentId: 'dept-1',
            departmentName: 'Artificial Intelligence & Machine Learning',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-3-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-3-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'DLN 311', title: 'Advanced PyTorch & Neural Circuitry', status: 'C', unit: 4 },
                { code: 'DLN 312', title: 'Prompt Engineering for Model Architecture Design', status: 'C', unit: 3 },
                { code: 'DLN 313', title: 'CUDA Programming & GPU Optimization', status: 'C', unit: 4 },
                { code: 'DLN 314', title: 'Mobile Deep Learning Deployment (TensorFlow Lite)', status: 'C', unit: 3 },
                { code: 'DLN 315', title: 'Systems Programming for AI Accelerators', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-3-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'DLN 321', title: 'Generative Adversarial Networks & Diffusion Models', status: 'C', unit: 4 },
                { code: 'DLN 322', title: 'High-Performance Computing for Neural Systems', status: 'C', unit: 4 },
                { code: 'DLN 323', title: 'Neural Architecture Search (NAS) & Automation', status: 'C', unit: 4 },
                { code: 'DLN 324', title: 'Explainable AI (XAI) & Interpretability', status: 'C', unit: 3 },
                { code: 'DLN 325', title: 'Deep Reinforcement Learning in Simulation', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-3-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-3-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'DLN 411', title: 'Foundation Models & Multi-Agent Neural Systems', status: 'C', unit: 4 },
                { code: 'DLN 412', title: 'Neuromorphic Computing & Future Hardware', status: 'C', unit: 4 },
                { code: 'DLN 413', title: 'Edge AI & On-Device Training Systems', status: 'C', unit: 4 },
                { code: 'DLN 414', title: 'Federated Learning & Privacy-Preserving AI', status: 'C', unit: 3 },
                { code: 'DLN 415', title: 'Neural System Productization & Deployment', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-3-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'DLN 421', title: 'Advanced Computational Research Techniques', status: 'C', unit: 3 },
                { code: 'DLN 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
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
        ,
          {
            id: 'prog-hnd-4',
            code: 'DTS-HND',
            name: 'HND in Digital Twin Systems',
            departmentId: 'dept-2',
            departmentName: 'Computational Science & Simulation',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-4-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-4-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'DTS 311', title: 'Enterprise IoT Data Fabric & Integration', status: 'C', unit: 4 },
                { code: 'DTS 312', title: 'AI-Powered 3D Simulation Workflows', status: 'C', unit: 3 },
                { code: 'DTS 313', title: 'Advanced C++ for Real-time Simulation', status: 'C', unit: 4 },
                { code: 'DTS 314', title: 'Mobile SCADA & Twin Monitoring (Termux/MQTT)', status: 'C', unit: 3 },
                { code: 'DTS 315', title: 'Cloud-Native Twin Infrastructure (Azure/AWS)', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-4-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'DTS 321', title: 'Cyber-Physical System Modeling & Security', status: 'C', unit: 4 },
                { code: 'DTS 322', title: 'Predictive Analytics for Industrial Maintenance', status: 'C', unit: 4 },
                { code: 'DTS 323', title: 'Virtual Reality (VR) Engine Engineering (Unity/Unreal)', status: 'C', unit: 4 },
                { code: 'DTS 324', title: 'Prompt Engineering for Simulation Scripting', status: 'C', unit: 3 },
                { code: 'DTS 325', title: 'Digital Twin Interoperability Standards', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-4-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-4-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'DTS 411', title: 'Autonomous Digital Twins & Decision Engines', status: 'C', unit: 4 },
                { code: 'DTS 412', title: 'AR/XR Systems for Field Engineering', status: 'C', unit: 4 },
                { code: 'DTS 413', title: 'Massive-Scale Smart City Simulations', status: 'C', unit: 4 },
                { code: 'DTS 414', title: 'Twin-as-a-Service (TaaS) Business Models', status: 'C', unit: 3 },
                { code: 'DTS 415', title: 'Simulation Data Privacy & Encryption', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-4-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'DTS 421', title: 'Advanced Simulation Research Methodology', status: 'C', unit: 3 },
                { code: 'DTS 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-5',
            code: 'PMA-HND',
            name: 'HND in Predictive Modeling & Analytics',
            departmentId: 'dept-2',
            departmentName: 'Computational Science & Simulation',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-5-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-5-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'PMA 311', title: 'Advanced Time-Series Forecasting & Econometrics', status: 'C', unit: 4 },
                { code: 'PMA 312', title: 'Prompt Engineering for Statistical Code (R/Python)', status: 'C', unit: 3 },
                { code: 'PMA 313', title: 'Distributed Big Data Analytics (Spark/Flink)', status: 'C', unit: 4 },
                { code: 'PMA 314', title: 'Mobile Analytics Lab (JupyterLite & Pydroid)', status: 'C', unit: 3 },
                { code: 'PMA 315', title: 'Data Visualization Engineering (D3.js/Tableau)', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-5-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'PMA 321', title: 'Bayesian Statistics & Probabilistic Programming', status: 'C', unit: 4 },
                { code: 'PMA 322', title: 'Prescriptive Analytics & Decision Optimization', status: 'C', unit: 4 },
                { code: 'PMA 323', title: 'Risk Modeling & Monte Carlo Simulations', status: 'C', unit: 4 },
                { code: 'PMA 324', title: 'AI-Driven Market Intelligence Systems', status: 'C', unit: 3 },
                { code: 'PMA 325', title: 'Computational Linear Algebra for Analytics', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-5-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-5-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'PMA 411', title: 'Geospatial Intelligence & GIS Analytics', status: 'C', unit: 4 },
                { code: 'PMA 412', title: 'Behavioral Modeling & Consumer Psychology AI', status: 'C', unit: 4 },
                { code: 'PMA 413', title: 'Financial Engineering & High-Frequency Models', status: 'C', unit: 4 },
                { code: 'PMA 414', title: 'Analytics Product Management', status: 'C', unit: 3 },
                { code: 'PMA 415', title: 'Supply Chain Predictive Logic', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-5-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'PMA 421', title: 'Advanced Decision Science Research Methods', status: 'C', unit: 3 },
                { code: 'PMA 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-6',
            code: 'CPE-HND',
            name: 'HND in Computational Physics & Engineering',
            departmentId: 'dept-2',
            departmentName: 'Computational Science & Simulation',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-6-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-6-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'CPE 311', title: 'High Performance Computing (HPC) & MPI', status: 'C', unit: 4 },
                { code: 'CPE 312', title: 'Prompt Engineering for Scientific Simulation', status: 'C', unit: 3 },
                { code: 'CPE 313', title: 'Advanced Finite Element Analysis (FEA)', status: 'C', unit: 4 },
                { code: 'CPE 314', title: 'Mobile Numerical Workspaces (Termux/Octave)', status: 'C', unit: 3 },
                { code: 'CPE 315', title: 'Computational Fluid Dynamics (CFD) Mastery', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-6-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'CPE 321', title: 'Multiphysics Coupling & Simulation Pipelines', status: 'C', unit: 4 },
                { code: 'CPE 322', title: 'Parallel Programming in Go & Rust for Science', status: 'C', unit: 4 },
                { code: 'CPE 323', title: 'Stochastic Processes & Quantum Modeling', status: 'C', unit: 4 },
                { code: 'CPE 324', title: 'Scientific Data Visualization (VTK/ParaView)', status: 'C', unit: 3 },
                { code: 'CPE 325', title: 'Nonlinear Dynamics & Chaos Simulation', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-6-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-6-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'CPE 411', title: 'Deep Learning for Physical Sciences', status: 'C', unit: 4 },
                { code: 'CPE 412', title: 'Computational Material Science & Nano-Engineering', status: 'C', unit: 4 },
                { code: 'CPE 413', title: 'Renewable Energy System Simulation', status: 'C', unit: 4 },
                { code: 'CPE 414', title: 'Aerospace & Propulsion Computational Modeling', status: 'C', unit: 3 },
                { code: 'CPE 415', title: 'Applied Numerical Optimization', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-6-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'CPE 421', title: 'Advanced Computational Physics Research', status: 'C', unit: 3 },
                { code: 'CPE 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
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
        ,
          {
            id: 'prog-hnd-7',
            code: 'AVT-HND',
            name: 'HND in Autonomous Vehicle Technology',
            departmentId: 'dept-3',
            departmentName: 'Robotics & Autonomous Systems',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-7-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-7-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'AVT 311', title: 'SLAM (Simultaneous Localization and Mapping)', status: 'C', unit: 4 },
                { code: 'AVT 312', title: 'Prompt Engineering for Robotics Control Logic', status: 'C', unit: 3 },
                { code: 'AVT 313', title: 'Advanced ROS2 & Middleware Architecture', status: 'C', unit: 4 },
                { code: 'AVT 314', title: 'Mobile Robotics Prototyping (Replit/Termux)', status: 'C', unit: 3 },
                { code: 'AVT 315', title: 'Sensor Fusion & Lidar Perception Systems', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-7-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'AVT 321', title: 'Deep Learning for Perception & Navigation', status: 'C', unit: 4 },
                { code: 'AVT 322', title: 'V2X Communications & Cooperative Autonomy', status: 'C', unit: 4 },
                { code: 'AVT 323', title: 'Path Planning & Behavioral Decision Making', status: 'C', unit: 4 },
                { code: 'AVT 324', title: 'Vehicle Dynamics & Embedded Control Systems', status: 'C', unit: 3 },
                { code: 'AVT 325', title: 'AI-Powered Safety & Fail-Safe Protocols', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-7-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-7-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'AVT 411', title: 'Autonomous Drone Navigation & Aerial Robotics', status: 'C', unit: 4 },
                { code: 'AVT 412', title: 'Fleet Management AI & Logistics Optimization', status: 'C', unit: 4 },
                { code: 'AVT 413', title: 'Human-Machine Interface (HMI) for Vehicles', status: 'C', unit: 4 },
                { code: 'AVT 414', title: 'Hardware-in-the-Loop (HIL) Testing', status: 'C', unit: 3 },
                { code: 'AVT 415', title: 'Autonomous Vehicle Ethics & Policy', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-7-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'AVT 421', title: 'Advanced Autonomous Systems Research', status: 'C', unit: 3 },
                { code: 'AVT 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-8',
            code: 'IRA-HND',
            name: 'HND in Industrial Robotics & Automation',
            departmentId: 'dept-3',
            departmentName: 'Robotics & Autonomous Systems',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-8-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-8-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'IRA 311', title: 'Smart Factory & Industry 4.0 Architectures', status: 'C', unit: 4 },
                { code: 'IRA 312', title: 'Prompt Engineering for PLC & SCADA Scripting', status: 'C', unit: 3 },
                { code: 'IRA 313', title: 'Collaborative Robotics (Cobots) Programming', status: 'C', unit: 4 },
                { code: 'IRA 314', title: 'Mobile Industrial Monitoring (MQTT/Acode)', status: 'C', unit: 3 },
                { code: 'IRA 315', title: 'Advanced Mechanical Design & Fabrication', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-8-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'IRA 321', title: 'Machine Vision for Industrial Quality Control', status: 'C', unit: 4 },
                { code: 'IRA 322', title: 'Distributed Control Systems (DCS) & Networks', status: 'C', unit: 4 },
                { code: 'IRA 323', title: 'Predictive Maintenance using Industrial AI', status: 'C', unit: 4 },
                { code: 'IRA 324', title: 'Enterprise Resource Planning (ERP) Integration', status: 'C', unit: 3 },
                { code: 'IRA 325', title: 'Lean Six Sigma for Automated Manufacturing', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-8-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-8-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'IRA 411', title: 'AI-Driven Production Scheduling & Logistics', status: 'C', unit: 4 },
                { code: 'IRA 412', title: 'Robotics Safety Systems & Cybersecurity', status: 'C', unit: 4 },
                { code: 'IRA 413', title: 'Warehouse Automation & Mobile Robots (AMRs)', status: 'C', unit: 4 },
                { code: 'IRA 414', title: 'Technical Operations Management', status: 'C', unit: 3 },
                { code: 'IRA 415', title: 'Sustainability in Automated Systems', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-8-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'IRA 421', title: 'Advanced Automation Research Methodology', status: 'C', unit: 3 },
                { code: 'IRA 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-9',
            code: 'SIM-HND',
            name: 'HND in Swarm Intelligence & Multi-Agent Systems',
            departmentId: 'dept-3',
            departmentName: 'Robotics & Autonomous Systems',
            facultyId: 'fac-1',
            facultyName: 'School of Artificial Intelligence & Computational Intelligence',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-9-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-9-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'SIM 311', title: 'Decentralized Coordination & Swarm Logic', status: 'C', unit: 4 },
                { code: 'SIM 312', title: 'Prompt Engineering for Agent Simulation', status: 'C', unit: 3 },
                { code: 'SIM 313', title: 'Distributed Systems & Blockchain for Agents', status: 'C', unit: 4 },
                { code: 'SIM 314', title: 'Mobile Multi-Agent Simulation (Pydroid 3)', status: 'C', unit: 3 },
                { code: 'SIM 315', title: 'Collective Intelligence Architecture', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-9-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'SIM 321', title: 'Swarm Robotics: Planning & Hardware', status: 'C', unit: 4 },
                { code: 'SIM 322', title: 'Multi-Agent Reinforcement Learning (MARL)', status: 'C', unit: 4 },
                { code: 'SIM 323', title: 'Evolutionary Computation & Optimization', status: 'C', unit: 4 },
                { code: 'SIM 324', title: 'Emergent Behavior Analysis & Modeling', status: 'C', unit: 3 },
                { code: 'SIM 325', title: 'Game Theory for Autonomous Negotiations', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-9-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-9-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'SIM 411', title: 'Smart Grid & Infrastructure Swarm Models', status: 'C', unit: 4 },
                { code: 'SIM 412', title: 'Swarm Intelligence for Cybersecurity', status: 'C', unit: 4 },
                { code: 'SIM 413', title: 'Agent-Based Economic & Social Modeling', status: 'C', unit: 4 },
                { code: 'SIM 414', title: 'Search & Rescue Robotics Coordination', status: 'C', unit: 3 },
                { code: 'SIM 415', title: 'Multi-Agent Product Deployment', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-9-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'SIM 421', title: 'Advanced Multi-Agent Research Methods', status: 'C', unit: 3 },
                { code: 'SIM 422', title: 'HND Capstone Innovation Project & Defense', status: 'C', unit: 9 }
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
        ,
          {
            id: 'prog-hnd-10',
            code: 'CGM-HND',
            name: 'HND in Computational Genomics',
            departmentId: 'dept-4',
            departmentName: 'Bioinformatics & Genomic Data Science',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-10-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-10-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'CGM 311', title: 'Advanced NGS Pipeline Engineering', status: 'C', unit: 4 },
                { code: 'CGM 312', title: 'Prompt Engineering for Bio-Scripting & Data Wrangling', status: 'C', unit: 3 },
                { code: 'CGM 313', title: 'Cloud-Native Bioinformatics (AWS Omics/Google Life Sciences)', status: 'C', unit: 4 },
                { code: 'CGM 314', title: 'Mobile Lab: Genomic Analysis on Android (Termux/Python)', status: 'C', unit: 3 },
                { code: 'CGM 315', title: 'Population Genomics & GWAS at Scale', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-10-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'CGM 321', title: 'AI-Driven Functional Genomics', status: 'C', unit: 4 },
                { code: 'CGM 322', title: 'Single-Cell RNA-Seq Analysis', status: 'C', unit: 4 },
                { code: 'CGM 323', title: 'Epigenomic Data Integration', status: 'C', unit: 4 },
                { code: 'CGM 324', title: 'Proteomics & Metabolomics Informatics', status: 'C', unit: 3 },
                { code: 'CGM 325', title: 'Distributed Computing for Bio-Data', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-10-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-10-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'CGM 411', title: 'Foundation Models for Biological Sequences', status: 'C', unit: 4 },
                { code: 'CGM 412', title: 'Clinical Genomics & Personalized Medicine', status: 'C', unit: 4 },
                { code: 'CGM 413', title: 'Cancer Phylogeny & Evolution Modeling', status: 'C', unit: 4 },
                { code: 'CGM 414', title: 'Bio-Product Management & Bio-Entrepreneurship', status: 'C', unit: 3 },
                { code: 'CGM 415', title: 'Ethics of Germline Editing & Data Governance', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-10-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'CGM 421', title: 'Advanced Genomic Research Methodology', status: 'C', unit: 3 },
                { code: 'CGM 422', title: 'HND Capstone Innovation Project: Genomic Solution', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-11',
            code: 'MDD-HND',
            name: 'HND in Molecular Modeling & Drug Discovery',
            departmentId: 'dept-4',
            departmentName: 'Bioinformatics & Genomic Data Science',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 65,
            levels: [
            {
              id: 'prog-hnd-11-l1',
              number: 1,
              totalUnits: 35,
              semesters: [
              {
                id: 'prog-hnd-11-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'MDD 311', title: 'Advanced Molecular Dynamics & Force Fields', status: 'C', unit: 4 },
                { code: 'MDD 312', title: 'Prompt Engineering for De Novo Molecule Generation', status: 'C', unit: 3 },
                { code: 'MDD 313', title: 'High-Throughput Virtual Screening Pipelines', status: 'C', unit: 4 },
                { code: 'MDD 314', title: 'Mobile CADD: Drug Design via Web-based Cloud IDEs', status: 'C', unit: 3 },
                { code: 'MDD 315', title: 'Quantum Mechanics in Drug-Target Interaction', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-11-l1-s2',
                number: 2 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'MDD 321', title: 'Generative AI for Protein Folding & Design', status: 'C', unit: 4 },
                { code: 'MDD 322', title: 'Chemoinformatics & Big Data Mining', status: 'C', unit: 4 },
                { code: 'MDD 323', title: 'Pharmacogenomics & ADMET Prediction', status: 'C', unit: 4 },
                { code: 'MDD 324', title: 'Fragment-Based Drug Design (FBDD)', status: 'C', unit: 3 },
                { code: 'MDD 325', title: 'Molecular Graphics & Scientific Visualization', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-11-l2',
              number: 2,
              totalUnits: 30,
              semesters: [
              {
                id: 'prog-hnd-11-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 18,
                courses: [
                { code: 'MDD 411', title: 'AI in Clinical Trial Optimization', status: 'C', unit: 4 },
                { code: 'MDD 412', title: 'Structure-Based Drug Design for Viral Pathogens', status: 'C', unit: 4 },
                { code: 'MDD 413', title: 'Multi-Target Drug Design & Polypharmacology', status: 'C', unit: 4 },
                { code: 'MDD 414', title: 'Intellectual Property & Regulatory Bio-Science', status: 'C', unit: 3 },
                { code: 'MDD 415', title: 'Synthetic Routes Optimization with ML', status: 'C', unit: 3 }
                ]
              },
              {
                id: 'prog-hnd-11-l2-s2',
                number: 2 as 1 | 2,
                totalUnits: 12,
                courses: [
                { code: 'MDD 421', title: 'Advanced Medicinal Research Methods', status: 'C', unit: 3 },
                { code: 'MDD 422', title: 'HND Capstone Innovation Project: Novel Lead Discovery', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-12',
            code: 'SYB-HND',
            name: 'HND in Systems Biology',
            departmentId: 'dept-4',
            departmentName: 'Bioinformatics & Genomic Data Science',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 30,
            levels: [
            {
              id: 'prog-hnd-12-l1',
              number: 1,
              totalUnits: 17,
              semesters: [
              {
                id: 'prog-hnd-12-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'SYB 311', title: 'Multi-Scale Biological Modeling', status: 'C', unit: 4 },
                { code: 'SYB 312', title: 'Prompt Engineering for Biological Network Simulations', status: 'C', unit: 3 },
                { code: 'SYB 313', title: 'Integrative Omics Data Fusion', status: 'C', unit: 4 },
                { code: 'SYB 314', title: 'Mobile Systems Modeling (Julia/Python in Termux)', status: 'C', unit: 3 },
                { code: 'SYB 315', title: 'Computational Immunology', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-12-l2',
              number: 2,
              totalUnits: 13,
              semesters: [
              {
                id: 'prog-hnd-12-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 13,
                courses: [
                { code: 'SYB 411', title: 'Whole-Cell Modeling & Virtual Organisms', status: 'C', unit: 4 },
                { code: 'SYB 422', title: 'HND Capstone Innovation Project: System Model', status: 'C', unit: 9 }
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
        ,
          {
            id: 'prog-hnd-13',
            code: 'HIS-HND',
            name: 'HND in Health Information Systems',
            departmentId: 'dept-5',
            departmentName: 'Digital Health & Telemedicine',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 30,
            levels: [
            {
              id: 'prog-hnd-13-l1',
              number: 1,
              totalUnits: 17,
              semesters: [
              {
                id: 'prog-hnd-13-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'HIS 311', title: 'Enterprise Health Data Architecture', status: 'C', unit: 4 },
                { code: 'HIS 312', title: 'Prompt Engineering for Clinical Coding Automation', status: 'C', unit: 3 },
                { code: 'HIS 313', title: 'Advanced FHIR & HL7 Interoperability', status: 'C', unit: 4 },
                { code: 'HIS 314', title: 'Mobile Health Record Systems Development', status: 'C', unit: 3 },
                { code: 'HIS 315', title: 'Cybersecurity in Medical Data Systems', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-13-l2',
              number: 2,
              totalUnits: 13,
              semesters: [
              {
                id: 'prog-hnd-13-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 13,
                courses: [
                { code: 'HIS 411', title: 'AI for Population Health Management', status: 'C', unit: 4 },
                { code: 'HIS 422', title: 'HND Capstone Innovation Project: HIS Design', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-14',
            code: 'TRC-HND',
            name: 'HND in Telemedicine & Remote Care',
            departmentId: 'dept-5',
            departmentName: 'Digital Health & Telemedicine',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 30,
            levels: [
            {
              id: 'prog-hnd-14-l1',
              number: 1,
              totalUnits: 17,
              semesters: [
              {
                id: 'prog-hnd-14-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'TRC 311', title: 'Tele-Presence & Remote Surgical Assistance', status: 'C', unit: 4 },
                { code: 'TRC 312', title: 'Prompt Engineering for Virtual Health Assistants', status: 'C', unit: 3 },
                { code: 'TRC 313', title: '5G/6G Infrastructure for Real-Time Tele-Care', status: 'C', unit: 4 },
                { code: 'TRC 314', title: 'Mobile Diagnostic Tool Integration (mHealth)', status: 'C', unit: 3 },
                { code: 'TRC 315', title: 'Edge AI for Remote Patient Monitoring', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-14-l2',
              number: 2,
              totalUnits: 13,
              semesters: [
              {
                id: 'prog-hnd-14-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 13,
                courses: [
                { code: 'TRC 411', title: 'Virtual Hospitals & Decentralized Healthcare', status: 'C', unit: 4 },
                { code: 'TRC 422', title: 'HND Capstone Innovation Project: Remote Solution', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-15',
            code: 'MIV-HND',
            name: 'HND in Medical Imaging & Visualization',
            departmentId: 'dept-5',
            departmentName: 'Digital Health & Telemedicine',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 30,
            levels: [
            {
              id: 'prog-hnd-15-l1',
              number: 1,
              totalUnits: 17,
              semesters: [
              {
                id: 'prog-hnd-15-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'MIV 311', title: 'Advanced Computer Vision for Radiology', status: 'C', unit: 4 },
                { code: 'MIV 312', title: 'Prompt Engineering for Image Segmentation Tasks', status: 'C', unit: 3 },
                { code: 'MIV 313', title: 'Real-Time 3D Rendering for Surgical Navigation', status: 'C', unit: 4 },
                { code: 'MIV 314', title: 'Mobile DICOM Viewers & Cloud-PACS Integration', status: 'C', unit: 3 },
                { code: 'MIV 315', title: 'Radiomics & AI-Driven Biomarker Discovery', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-15-l2',
              number: 2,
              totalUnits: 13,
              semesters: [
              {
                id: 'prog-hnd-15-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 13,
                courses: [
                { code: 'MIV 411', title: 'Augmented Reality (AR) in the Operating Theater', status: 'C', unit: 4 },
                { code: 'MIV 422', title: 'HND Capstone Innovation Project: Imaging App', status: 'C', unit: 9 }
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
        ,
          {
            id: 'prog-hnd-16',
            code: 'SBE-HND',
            name: 'HND in Synthetic Biology Engineering',
            departmentId: 'dept-6',
            departmentName: 'Biotechnology & Synthetic Systems',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 30,
            levels: [
            {
              id: 'prog-hnd-16-l1',
              number: 1,
              totalUnits: 17,
              semesters: [
              {
                id: 'prog-hnd-16-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'SBE 311', title: 'Digital-to-Biological Manufacturing', status: 'C', unit: 4 },
                { code: 'SBE 312', title: 'Prompt Engineering for Genetic Circuit Design', status: 'C', unit: 3 },
                { code: 'SBE 313', title: 'Advanced CRISPR Systems & Base Editing', status: 'C', unit: 4 },
                { code: 'SBE 314', title: 'Mobile Bio-CAD (Web-based DNA Assembly)', status: 'C', unit: 3 },
                { code: 'SBE 315', title: 'Metabolic Pathway Engineering', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-16-l2',
              number: 2,
              totalUnits: 13,
              semesters: [
              {
                id: 'prog-hnd-16-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 13,
                courses: [
                { code: 'SBE 411', title: 'Xenobiology & Synthetic Life Forms', status: 'C', unit: 4 },
                { code: 'SBE 422', title: 'HND Capstone Innovation Project: Syn-Bio Design', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-17',
            code: 'BMP-HND',
            name: 'HND in Bio-Manufacturing & Processing',
            departmentId: 'dept-6',
            departmentName: 'Biotechnology & Synthetic Systems',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 30,
            levels: [
            {
              id: 'prog-hnd-17-l1',
              number: 1,
              totalUnits: 17,
              semesters: [
              {
                id: 'prog-hnd-17-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'BMP 311', title: 'Smart Bioprocess Control & Automation', status: 'C', unit: 4 },
                { code: 'BMP 312', title: 'Prompt Engineering for Bioreactor Optimization', status: 'C', unit: 3 },
                { code: 'BMP 313', title: 'Advanced Downstream Purification Technology', status: 'C', unit: 4 },
                { code: 'BMP 314', title: 'Mobile Monitoring for Bio-Production Plants', status: 'C', unit: 3 },
                { code: 'BMP 315', title: 'Sustainable Bio-Manufacturing & Circularity', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-17-l2',
              number: 2,
              totalUnits: 13,
              semesters: [
              {
                id: 'prog-hnd-17-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 13,
                courses: [
                { code: 'BMP 411', title: 'Digital Twins for Industrial Bio-Reactors', status: 'C', unit: 4 },
                { code: 'BMP 422', title: 'HND Capstone Innovation Project: Process Design', status: 'C', unit: 9 }
                ]
              }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-18',
            code: 'ABT-HND',
            name: 'HND in Agricultural Biotechnology',
            departmentId: 'dept-6',
            departmentName: 'Biotechnology & Synthetic Systems',
            facultyId: 'fac-2',
            facultyName: 'School of Bio-Digital Science & Health Informatics',
            totalUnits: 30,
            levels: [
            {
              id: 'prog-hnd-18-l1',
              number: 1,
              totalUnits: 17,
              semesters: [
              {
                id: 'prog-hnd-18-l1-s1',
                number: 1 as 1 | 2,
                totalUnits: 17,
                courses: [
                { code: 'ABT 311', title: 'Precision Agriculture AI & Drone Analytics', status: 'C', unit: 4 },
                { code: 'ABT 312', title: 'Prompt Engineering for Crop Yield Forecasting', status: 'C', unit: 3 },
                { code: 'ABT 313', title: 'Advanced Genetic Modification of Crops', status: 'C', unit: 4 },
                { code: 'ABT 314', title: 'Mobile Smart Farm Control Systems', status: 'C', unit: 3 },
                { code: 'ABT 315', title: 'Bio-Fortification & Functional Foods', status: 'C', unit: 3 }
                ]
              }
              ]
            },
            {
              id: 'prog-hnd-18-l2',
              number: 2,
              totalUnits: 13,
              semesters: [
              {
                id: 'prog-hnd-18-l2-s1',
                number: 1 as 1 | 2,
                totalUnits: 13,
                courses: [
                { code: 'ABT 411', title: 'Climate-Resilient Bio-Engineering', status: 'C', unit: 4 },
                { code: 'ABT 422', title: 'HND Capstone Innovation Project: Agri-Bio', status: 'C', unit: 9 }
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
  // FACULTY 3: School of Cyber-Security, Cloud Architecture & Quantum Systems
  // ============================================
  {
    id: 'fac-3',
    code: 'SCCAQS',
    name: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
    departments: [
      {
        id: 'dept-7',
        code: 'CND',
        name: 'Cybersecurity & Network Defense',
        facultyId: 'fac-3',
        facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
        programs: [
        {
          id: 'prog-19',
          code: 'EHP',
          name: 'Diploma in Ethical Hacking & Penetration Testing',
          departmentId: 'dept-7',
          departmentName: 'Cybersecurity & Network Defense',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-19-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-19-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'EHP 111', title: 'Foundations of Cybersecurity', status: 'C', unit: 3 },
              { code: 'EHP 112', title: 'Linux Administration & Shell Scripting', status: 'C', unit: 3 },
              { code: 'EHP 113', title: 'Introduction to Ethical Hacking', status: 'C', unit: 3 },
              { code: 'EHP 114', title: 'Network Fundamentals & TCP/IP', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 301', title: 'Digital Forensics Basics', status: 'E', unit: 2 },
              { code: 'ELE 302', title: 'Web Security Fundamentals', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-19-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'EHP 121', title: 'Vulnerability Assessment & Scanning', status: 'C', unit: 3 },
              { code: 'EHP 122', title: 'Python for Security Automation', status: 'C', unit: 3 },
              { code: 'EHP 123', title: 'Web Application Security (OWASP)', status: 'C', unit: 3 },
              { code: 'EHP 124', title: 'Cryptography Fundamentals', status: 'C', unit: 3 },
              { code: 'EHP 125', title: 'Cyber Law & Ethics', status: 'C', unit: 2 },
              { code: 'ELE 303', title: 'Operating System Security', status: 'E', unit: 2 },
              { code: 'ELE 304', title: 'Wireless Network Security', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-19-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-19-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'EHP 211', title: 'Advanced Penetration Testing', status: 'C', unit: 4 },
              { code: 'EHP 212', title: 'Malware Analysis & Reverse Engineering', status: 'C', unit: 3 },
              { code: 'EHP 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'EHP 214', title: 'Cloud Security Fundamentals', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 305', title: 'Incident Response & Forensics', status: 'E', unit: 2 },
              { code: 'ELE 306', title: 'Security Information & Event Management', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-19-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'EHP 221', title: 'Capstone Project (Security Audit)', status: 'C', unit: 6 },
              { code: 'EHP 222', title: 'Advanced Network Defense', status: 'C', unit: 3 },
              { code: 'EHP 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 307', title: 'Social Engineering & OSINT', status: 'E', unit: 2 },
              { code: 'ELE 308', title: 'Bug Bounty & Responsible Disclosure', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-20',
          code: 'BSC',
          name: 'Diploma in Blockchain Security & Cryptography',
          departmentId: 'dept-7',
          departmentName: 'Cybersecurity & Network Defense',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-20-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-20-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BSC 111', title: 'Introduction to Blockchain Technology', status: 'C', unit: 3 },
              { code: 'BSC 112', title: 'Programming Fundamentals (Solidity/JavaScript)', status: 'C', unit: 3 },
              { code: 'BSC 113', title: 'Cryptography Essentials', status: 'C', unit: 3 },
              { code: 'BSC 114', title: 'Distributed Systems Fundamentals', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 309', title: 'Smart Contract Basics', status: 'E', unit: 2 },
              { code: 'ELE 310', title: 'Web3 Ecosystem Overview', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-20-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BSC 121', title: 'Smart Contract Development', status: 'C', unit: 3 },
              { code: 'BSC 122', title: 'Blockchain Data Structures', status: 'C', unit: 3 },
              { code: 'BSC 123', title: 'DApp Development Fundamentals', status: 'C', unit: 3 },
              { code: 'BSC 124', title: 'Token Standards & Digital Assets', status: 'C', unit: 3 },
              { code: 'BSC 125', title: 'Ethics in Blockchain & Crypto', status: 'C', unit: 2 },
              { code: 'ELE 311', title: 'DeFi Protocol Basics', status: 'E', unit: 2 },
              { code: 'ELE 312', title: 'NFT Development', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-20-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-20-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'BSC 211', title: 'Advanced Smart Contract Security', status: 'C', unit: 4 },
              { code: 'BSC 212', title: 'Blockchain Architecture & Consensus', status: 'C', unit: 3 },
              { code: 'BSC 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'BSC 214', title: 'Cross-Chain Protocols', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 313', title: 'DAO Governance', status: 'E', unit: 2 },
              { code: 'ELE 314', title: 'Layer 2 Solutions', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-20-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'BSC 221', title: 'Capstone Project (Blockchain Security)', status: 'C', unit: 6 },
              { code: 'BSC 222', title: 'Zero-Knowledge Proofs Introduction', status: 'C', unit: 3 },
              { code: 'BSC 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 315', title: 'Crypto Regulation & Compliance', status: 'E', unit: 2 },
              { code: 'ELE 316', title: 'Blockchain for Enterprise', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-21',
          code: 'NDF',
          name: 'Diploma in Network Defense & Forensics',
          departmentId: 'dept-7',
          departmentName: 'Cybersecurity & Network Defense',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-21-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-21-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'NDF 111', title: 'Network Architecture & Design', status: 'C', unit: 3 },
              { code: 'NDF 112', title: 'System Administration (Windows/Linux)', status: 'C', unit: 3 },
              { code: 'NDF 113', title: 'Introduction to Digital Forensics', status: 'C', unit: 3 },
              { code: 'NDF 114', title: 'Firewall & Intrusion Detection Systems', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 317', title: 'Packet Analysis Basics', status: 'E', unit: 2 },
              { code: 'ELE 318', title: 'IT Governance & Compliance', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-21-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'NDF 121', title: 'Incident Response Fundamentals', status: 'C', unit: 3 },
              { code: 'NDF 122', title: 'Security Operations Center (SOC)', status: 'C', unit: 3 },
              { code: 'NDF 123', title: 'Evidence Collection & Chain of Custody', status: 'C', unit: 3 },
              { code: 'NDF 124', title: 'Endpoint Security & Hardening', status: 'C', unit: 3 },
              { code: 'NDF 125', title: 'Cybercrime Law & Investigations', status: 'C', unit: 2 },
              { code: 'ELE 319', title: 'Mobile Device Forensics', status: 'E', unit: 2 },
              { code: 'ELE 320', title: 'Threat Intelligence Basics', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-21-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-21-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'NDF 211', title: 'Advanced Network Defense Strategies', status: 'C', unit: 4 },
              { code: 'NDF 212', title: 'Malware Forensics & Analysis', status: 'C', unit: 3 },
              { code: 'NDF 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'NDF 214', title: 'Cloud Security Operations', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 321', title: 'SIEM Implementation', status: 'E', unit: 2 },
              { code: 'ELE 322', title: 'Vulnerability Management', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-21-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'NDF 221', title: 'Capstone Project (Network Defense)', status: 'C', unit: 6 },
              { code: 'NDF 222', title: 'Advanced Digital Forensics', status: 'C', unit: 3 },
              { code: 'NDF 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 323', title: 'Penetration Testing Basics', status: 'E', unit: 2 },
              { code: 'ELE 324', title: 'Disaster Recovery Planning', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-19',
          code: 'EHP-HND',
          name: 'HND in Ethical Hacking & Penetration Testing',
          departmentId: 'dept-7',
          departmentName: 'Cybersecurity & Network Defense',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-19-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-19-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'EHP 311', title: 'Advanced Exploit Development & Buffer Overflows', status: 'C', unit: 4 },
              { code: 'EHP 312', title: 'Prompt Engineering for Exploit Payloads & Fuzzing', status: 'C', unit: 3 },
              { code: 'EHP 313', title: 'Red Team Infrastructure Automation (Terraform/Ansible)', status: 'C', unit: 4 },
              { code: 'EHP 314', title: 'Mobile Pentesting Lab (Termux, Kali NetHunter)', status: 'C', unit: 3 },
              { code: 'EHP 315', title: 'Wireless & RF Hacking (SDR/Zigbee/Bluetooth)', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-19-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'EHP 321', title: 'AI-Powered Malware Analysis & Reverse Engineering', status: 'C', unit: 4 },
              { code: 'EHP 322', title: 'Cloud Penetration Testing (AWS/Azure/GCP)', status: 'C', unit: 4 },
              { code: 'EHP 323', title: 'Active Directory & Enterprise Network Attacks', status: 'C', unit: 4 },
              { code: 'EHP 324', title: 'DevSecOps: Security in the CI/CD Pipeline', status: 'C', unit: 3 },
              { code: 'EHP 325', title: 'Social Engineering Automation & OSINT Frameworks', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-19-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-19-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'EHP 411', title: 'Cyber Warfare Tactics & APT Simulation', status: 'C', unit: 4 },
              { code: 'EHP 412', title: 'Advanced Web App Hacking (GraphQL/Microservices)', status: 'C', unit: 4 },
              { code: 'EHP 413', title: 'Threat Hunting & Managed Detection/Response (MDR)', status: 'C', unit: 4 },
              { code: 'EHP 414', title: 'Cybersecurity Product Mgmt & MSSP Startup Logic', status: 'C', unit: 3 },
              { code: 'EHP 415', title: 'Digital Sovereignty & National Security Policy', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-19-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'EHP 421', title: 'Advanced Security Research Methodology', status: 'C', unit: 3 },
              { code: 'EHP 422', title: 'HND Capstone Innovation Project: Security Audit/Tool', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-20',
          code: 'BSC-HND',
          name: 'HND in Blockchain Security & Cryptography',
          departmentId: 'dept-7',
          departmentName: 'Cybersecurity & Network Defense',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-20-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-20-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'BSC 311', title: 'Advanced Smart Contract Auditing (Solidity/Rust)', status: 'C', unit: 4 },
              { code: 'BSC 312', title: 'Prompt Engineering for Secure Code & Formal Verification', status: 'C', unit: 3 },
              { code: 'BSC 313', title: 'Zero-Knowledge Proofs (ZKP) & Privacy Engineering', status: 'C', unit: 4 },
              { code: 'BSC 314', title: 'Mobile Web3 Development (Wallet/DApp Integration)', status: 'C', unit: 3 },
              { code: 'BSC 315', title: 'Cryptographic Protocol Design & Analysis', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-20-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-20-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'BSC 411', title: 'Post-Quantum Cryptography Implementation', status: 'C', unit: 4 },
              { code: 'BSC 422', title: 'HND Capstone Innovation Project: Blockchain Security', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        }
        ]
      },      {
        id: 'dept-8',
        code: 'CCV',
        name: 'Cloud Computing & Virtualization',
        facultyId: 'fac-3',
        facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
        programs: [
        {
          id: 'prog-22',
          code: 'CAE',
          name: 'Diploma in Cloud Architecture & Engineering',
          departmentId: 'dept-8',
          departmentName: 'Cloud Computing & Virtualization',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-22-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-22-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'CAE 111', title: 'Introduction to Cloud Computing', status: 'C', unit: 3 },
              { code: 'CAE 112', title: 'Linux Fundamentals for Cloud', status: 'C', unit: 3 },
              { code: 'CAE 113', title: 'Virtualization Technologies', status: 'C', unit: 3 },
              { code: 'CAE 114', title: 'Networking for Cloud Infrastructure', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 325', title: 'AWS Fundamentals', status: 'E', unit: 2 },
              { code: 'ELE 326', title: 'Azure Fundamentals', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-22-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'CAE 121', title: 'Cloud Service Models (IaaS/PaaS/SaaS)', status: 'C', unit: 3 },
              { code: 'CAE 122', title: 'Container Technologies (Docker)', status: 'C', unit: 3 },
              { code: 'CAE 123', title: 'Infrastructure as Code (Terraform)', status: 'C', unit: 3 },
              { code: 'CAE 124', title: 'Cloud Database Services', status: 'C', unit: 3 },
              { code: 'CAE 125', title: 'Cloud Security Fundamentals', status: 'C', unit: 2 },
              { code: 'ELE 327', title: 'GCP Fundamentals', status: 'E', unit: 2 },
              { code: 'ELE 328', title: 'Serverless Computing Basics', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-22-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-22-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'CAE 211', title: 'Kubernetes & Container Orchestration', status: 'C', unit: 4 },
              { code: 'CAE 212', title: 'Multi-Cloud Architecture Design', status: 'C', unit: 3 },
              { code: 'CAE 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'CAE 214', title: 'Cloud Monitoring & Observability', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 329', title: 'CI/CD Pipeline Design', status: 'E', unit: 2 },
              { code: 'ELE 330', title: 'Cloud Cost Optimization', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-22-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'CAE 221', title: 'Capstone Project (Cloud Solution)', status: 'C', unit: 6 },
              { code: 'CAE 222', title: 'Cloud Migration Strategies', status: 'C', unit: 3 },
              { code: 'CAE 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 331', title: 'Edge Computing', status: 'E', unit: 2 },
              { code: 'ELE 332', title: 'Cloud Compliance & Governance', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-23',
          code: 'SRE',
          name: 'Diploma in DevOps & Site Reliability Engineering',
          departmentId: 'dept-8',
          departmentName: 'Cloud Computing & Virtualization',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-23-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-23-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'SRE 111', title: 'Introduction to DevOps Culture', status: 'C', unit: 3 },
              { code: 'SRE 112', title: 'Version Control with Git', status: 'C', unit: 3 },
              { code: 'SRE 113', title: 'Linux System Administration', status: 'C', unit: 3 },
              { code: 'SRE 114', title: 'Scripting for Automation (Bash/Python)', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 333', title: 'Agile & Scrum Basics', status: 'E', unit: 2 },
              { code: 'ELE 334', title: 'Configuration Management', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-23-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'SRE 121', title: 'CI/CD Pipelines (Jenkins/GitHub Actions)', status: 'C', unit: 3 },
              { code: 'SRE 122', title: 'Containerization with Docker', status: 'C', unit: 3 },
              { code: 'SRE 123', title: 'Monitoring & Logging (Prometheus/Grafana)', status: 'C', unit: 3 },
              { code: 'SRE 124', title: 'Infrastructure Automation (Ansible)', status: 'C', unit: 3 },
              { code: 'SRE 125', title: 'DevSecOps Fundamentals', status: 'C', unit: 2 },
              { code: 'ELE 335', title: 'Test Automation', status: 'E', unit: 2 },
              { code: 'ELE 336', title: 'Release Management', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-23-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-23-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'SRE 211', title: 'Kubernetes for SRE', status: 'C', unit: 4 },
              { code: 'SRE 212', title: 'Reliability Engineering Practices', status: 'C', unit: 3 },
              { code: 'SRE 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'SRE 214', title: 'Incident Management & On-Call', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 337', title: 'Chaos Engineering Basics', status: 'E', unit: 2 },
              { code: 'ELE 338', title: 'Service Mesh Architecture', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-23-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'SRE 221', title: 'Capstone Project (DevOps Pipeline)', status: 'C', unit: 6 },
              { code: 'SRE 222', title: 'SLOs, SLAs & Error Budgets', status: 'C', unit: 3 },
              { code: 'SRE 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 339', title: 'Platform Engineering', status: 'E', unit: 2 },
              { code: 'ELE 340', title: 'GitOps Practices', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-24',
          code: 'VRT',
          name: 'Diploma in Virtualization Technology',
          departmentId: 'dept-8',
          departmentName: 'Cloud Computing & Virtualization',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-24-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-24-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'VRT 111', title: 'Introduction to Virtualization', status: 'C', unit: 3 },
              { code: 'VRT 112', title: 'Hypervisor Technologies (VMware/Hyper-V)', status: 'C', unit: 3 },
              { code: 'VRT 113', title: 'Virtual Networking Concepts', status: 'C', unit: 3 },
              { code: 'VRT 114', title: 'Storage Virtualization', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 341', title: 'Desktop Virtualization (VDI)', status: 'E', unit: 2 },
              { code: 'ELE 342', title: 'Server Consolidation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-24-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'VRT 121', title: 'Container Virtualization', status: 'C', unit: 3 },
              { code: 'VRT 122', title: 'Virtual Data Center Design', status: 'C', unit: 3 },
              { code: 'VRT 123', title: 'High Availability & Clustering', status: 'C', unit: 3 },
              { code: 'VRT 124', title: 'Backup & Disaster Recovery', status: 'C', unit: 3 },
              { code: 'VRT 125', title: 'Virtualization Security', status: 'C', unit: 2 },
              { code: 'ELE 343', title: 'Application Virtualization', status: 'E', unit: 2 },
              { code: 'ELE 344', title: 'Performance Tuning', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-24-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-24-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'VRT 211', title: 'Advanced Cloud-Native Architecture', status: 'C', unit: 4 },
              { code: 'VRT 212', title: 'Software-Defined Infrastructure', status: 'C', unit: 3 },
              { code: 'VRT 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'VRT 214', title: 'Hybrid Cloud Solutions', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 345', title: 'Network Function Virtualization', status: 'E', unit: 2 },
              { code: 'ELE 346', title: 'Edge Computing Infrastructure', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-24-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'VRT 221', title: 'Capstone Project (Virtual Infrastructure)', status: 'C', unit: 6 },
              { code: 'VRT 222', title: 'Microservices Architecture', status: 'C', unit: 3 },
              { code: 'VRT 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 347', title: 'Container Security', status: 'E', unit: 2 },
              { code: 'ELE 348', title: 'Infrastructure Automation', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-22',
          code: 'CAE-HND',
          name: 'HND in Cloud Architecture & Engineering',
          departmentId: 'dept-8',
          departmentName: 'Cloud Computing & Virtualization',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-22-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-22-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'CAE 311', title: 'High-Availability Multi-Cloud Design', status: 'C', unit: 4 },
              { code: 'CAE 312', title: 'Prompt Engineering for Infrastructure as Code (IaC)', status: 'C', unit: 3 },
              { code: 'CAE 313', title: 'Advanced Kubernetes Administration (CKS)', status: 'C', unit: 4 },
              { code: 'CAE 314', title: 'Mobile Cloud Mgmt (CLI/Mobile Terminals/Acode)', status: 'C', unit: 3 },
              { code: 'CAE 315', title: 'Enterprise Data Lake & Warehouse Architecture', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-22-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'CAE 321', title: 'Serverless Application Patterns & Event-Driven AI', status: 'C', unit: 4 },
              { code: 'CAE 322', title: 'Cloud FinOps: Cost Monitoring & Optimization', status: 'C', unit: 4 },
              { code: 'CAE 323', title: 'Site Reliability Engineering (SRE) Principles', status: 'C', unit: 4 },
              { code: 'CAE 324', title: 'Networking for Hybrid & Global Cloud Mesh', status: 'C', unit: 3 },
              { code: 'CAE 325', title: 'Identity Governance & Zero Trust Cloud', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-22-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-22-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'CAE 411', title: 'Cloud-Native AI/ML Ops (SageMaker/Vertex AI)', status: 'C', unit: 4 },
              { code: 'CAE 412', title: 'Disaster Recovery & Global Resilience Engineering', status: 'C', unit: 4 },
              { code: 'CAE 413', title: 'Edge-to-Cloud Integration & IoT Fabrics', status: 'C', unit: 4 },
              { code: 'CAE 414', title: 'Cloud Consultancy & Enterprise Sales Strategy', status: 'C', unit: 3 },
              { code: 'CAE 415', title: 'Regulatory Compliance (GDPR/SOC2) in Cloud', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-22-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'CAE 421', title: 'Advanced Cloud Research Methodology', status: 'C', unit: 3 },
              { code: 'CAE 422', title: 'HND Capstone Innovation Project: Cloud Build', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-23',
          code: 'SRE-HND',
          name: 'HND in DevOps & Site Reliability Engineering',
          departmentId: 'dept-8',
          departmentName: 'Cloud Computing & Virtualization',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-23-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-23-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'SRE 311', title: 'Continuous Delivery & Deployment Pipelines (Advanced)', status: 'C', unit: 4 },
              { code: 'SRE 312', title: 'Prompt Engineering for CI/CD Scripting & YAML', status: 'C', unit: 3 },
              { code: 'SRE 313', title: 'Observability Engineering (Prometheus/Grafana/ELK)', status: 'C', unit: 4 },
              { code: 'SRE 314', title: 'Mobile DevOps (GitHub Actions/CircleCI mobile)', status: 'C', unit: 3 },
              { code: 'SRE 315', title: 'Platform Engineering & Internal Dev Portals', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-23-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-23-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'SRE 411', title: 'Chaos Engineering & Resilience Testing', status: 'C', unit: 4 },
              { code: 'SRE 422', title: 'HND Capstone Innovation Project: DevOps Pipeline', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        }
        ]
      },      {
        id: 'dept-9',
        code: 'QCNGS',
        name: 'Quantum Computing & Next-Gen Systems',
        facultyId: 'fac-3',
        facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
        programs: [
        {
          id: 'prog-25',
          code: 'QPA',
          name: 'Diploma in Quantum Programming & Algorithms',
          departmentId: 'dept-9',
          departmentName: 'Quantum Computing & Next-Gen Systems',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-25-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-25-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'QPA 111', title: 'Quantum Mechanics for Computing', status: 'C', unit: 3 },
              { code: 'QPA 112', title: 'Linear Algebra for Quantum Systems', status: 'C', unit: 3 },
              { code: 'QPA 113', title: 'Introduction to Quantum Computing', status: 'C', unit: 3 },
              { code: 'QPA 114', title: 'Classical Programming for Quantum (Python/Qiskit)', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 349', title: 'History of Quantum Physics', status: 'E', unit: 2 },
              { code: 'ELE 350', title: 'Boolean Logic & Classical Gates', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-25-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'QPA 121', title: 'Quantum Gates & Circuits', status: 'C', unit: 3 },
              { code: 'QPA 122', title: 'Quantum Algorithms (Grover/Deutsch)', status: 'C', unit: 3 },
              { code: 'QPA 123', title: 'Quantum Error Correction Basics', status: 'C', unit: 3 },
              { code: 'QPA 124', title: 'Quantum Simulation Tools', status: 'C', unit: 3 },
              { code: 'QPA 125', title: 'Ethics in Quantum Technology', status: 'C', unit: 2 },
              { code: 'ELE 351', title: 'Quantum Cryptography Basics', status: 'E', unit: 2 },
              { code: 'ELE 352', title: 'Quantum Hardware Overview', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-25-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-25-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'QPA 211', title: 'Advanced Quantum Algorithms', status: 'C', unit: 4 },
              { code: 'QPA 212', title: 'Quantum Machine Learning Intro', status: 'C', unit: 3 },
              { code: 'QPA 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'QPA 214', title: 'Variational Quantum Methods', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 353', title: 'Quantum Chemistry Basics', status: 'E', unit: 2 },
              { code: 'ELE 354', title: 'Quantum Internet Concepts', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-25-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'QPA 221', title: 'Capstone Project (Quantum Application)', status: 'C', unit: 6 },
              { code: 'QPA 222', title: 'Post-Quantum Cryptography Intro', status: 'C', unit: 3 },
              { code: 'QPA 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 355', title: 'Quantum Finance Applications', status: 'E', unit: 2 },
              { code: 'ELE 356', title: 'Quantum Optimization', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-26',
          code: 'QHW',
          name: 'Diploma in Quantum Hardware & Engineering',
          departmentId: 'dept-9',
          departmentName: 'Quantum Computing & Next-Gen Systems',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-26-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-26-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'QHW 111', title: 'Physics of Quantum Devices', status: 'C', unit: 3 },
              { code: 'QHW 112', title: 'Cryogenics & Superconducting Systems', status: 'C', unit: 3 },
              { code: 'QHW 113', title: 'Introduction to Qubit Technologies', status: 'C', unit: 3 },
              { code: 'QHW 114', title: 'Electronic Instrumentation for Quantum', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 357', title: 'Material Science for Quantum', status: 'E', unit: 2 },
              { code: 'ELE 358', title: 'Signal Processing Basics', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-26-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'QHW 121', title: 'Trapped Ion & Photonic Systems', status: 'C', unit: 3 },
              { code: 'QHW 122', title: 'Microwave & RF Engineering for Quantum', status: 'C', unit: 3 },
              { code: 'QHW 123', title: 'Quantum Control Systems', status: 'C', unit: 3 },
              { code: 'QHW 124', title: 'Fabrication of Quantum Devices', status: 'C', unit: 3 },
              { code: 'QHW 125', title: 'Safety & Standards in Quantum Labs', status: 'C', unit: 2 },
              { code: 'ELE 359', title: 'FPGA Programming for Quantum', status: 'E', unit: 2 },
              { code: 'ELE 360', title: 'Noise Characterization', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-26-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-26-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'QHW 211', title: 'Advanced Qubit Architectures', status: 'C', unit: 4 },
              { code: 'QHW 212', title: 'Quantum System Integration', status: 'C', unit: 3 },
              { code: 'QHW 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'QHW 214', title: 'Quantum Calibration & Benchmarking', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 361', title: 'Quantum Interconnects', status: 'E', unit: 2 },
              { code: 'ELE 362', title: 'Dilution Refrigerators', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-26-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'QHW 221', title: 'Capstone Project (Quantum Hardware)', status: 'C', unit: 6 },
              { code: 'QHW 222', title: 'Scalable Quantum Architecture', status: 'C', unit: 3 },
              { code: 'QHW 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 363', title: 'Quantum Sensing Applications', status: 'E', unit: 2 },
              { code: 'ELE 364', title: 'Quantum Computing Industry', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-27',
          code: 'NGS',
          name: 'Diploma in Next-Generation Systems',
          departmentId: 'dept-9',
          departmentName: 'Quantum Computing & Next-Gen Systems',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-27-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-27-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'NGS 111', title: 'Introduction to Emerging Technologies', status: 'C', unit: 3 },
              { code: 'NGS 112', title: 'Neuromorphic Computing Basics', status: 'C', unit: 3 },
              { code: 'NGS 113', title: 'Optical Computing Fundamentals', status: 'C', unit: 3 },
              { code: 'NGS 114', title: 'Bio-Inspired Computing', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ELE 365', title: 'DNA Computing Overview', status: 'E', unit: 2 },
              { code: 'ELE 366', title: 'Molecular Electronics', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-27-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'NGS 121', title: 'Memristive Systems & Devices', status: 'C', unit: 3 },
              { code: 'NGS 122', title: 'Reconfigurable Computing (FPGA)', status: 'C', unit: 3 },
              { code: 'NGS 123', title: 'Energy-Efficient Computing', status: 'C', unit: 3 },
              { code: 'NGS 124', title: 'Nanoelectronics & Spintronics', status: 'C', unit: 3 },
              { code: 'NGS 125', title: 'Ethics in Advanced Technology', status: 'C', unit: 2 },
              { code: 'ELE 367', title: 'Reversible Computing', status: 'E', unit: 2 },
              { code: 'ELE 368', title: 'Photonic Circuits', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-27-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-27-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'NGS 211', title: 'Advanced Unconventional Computing', status: 'C', unit: 4 },
              { code: 'NGS 212', title: 'Spiking Neural Networks', status: 'C', unit: 3 },
              { code: 'NGS 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'NGS 214', title: 'Quantum-Classical Hybrid Systems', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ELE 369', title: 'Molecular Simulation', status: 'E', unit: 2 },
              { code: 'ELE 370', title: 'Advanced Materials for Computing', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-27-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'NGS 221', title: 'Capstone Project (Next-Gen System)', status: 'C', unit: 6 },
              { code: 'NGS 222', title: 'Future of Computing Paradigms', status: 'C', unit: 3 },
              { code: 'NGS 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ELE 371', title: 'Cognitive Computing', status: 'E', unit: 2 },
              { code: 'ELE 372', title: 'Technology Forecasting', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-25',
          code: 'QPA-HND',
          name: 'HND in Quantum Programming & Algorithms',
          departmentId: 'dept-9',
          departmentName: 'Quantum Computing & Next-Gen Systems',
          facultyId: 'fac-3',
          facultyName: 'School of Cyber-Security, Cloud Architecture & Quantum Systems',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-25-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-25-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'QPA 311', title: 'Advanced Quantum Gates & Circuit Synthesis', status: 'C', unit: 4 },
              { code: 'QPA 312', title: 'Prompt Engineering for Quantum Assembly (QASM/Q#)', status: 'C', unit: 3 },
              { code: 'QPA 313', title: 'Quantum Machine Learning (QML) Algorithms', status: 'C', unit: 4 },
              { code: 'QPA 314', title: 'Mobile Quantum Lab (IBM Quantum Mobile/Qiskit)', status: 'C', unit: 3 },
              { code: 'QPA 315', title: 'Quantum Fourier Transform & Grover\'s Search', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-25-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'QPA 321', title: 'Variational Quantum Eigensolver (VQE)', status: 'C', unit: 4 },
              { code: 'QPA 322', title: 'Quantum Error Mitigation & Noise Modeling', status: 'C', unit: 4 },
              { code: 'QPA 323', title: 'Shor\'s Algorithm & Cryptographic Impact', status: 'C', unit: 4 },
              { code: 'QPA 324', title: 'Hybrid Classical-Quantum System Design', status: 'C', unit: 3 },
              { code: 'QPA 325', title: 'Quantum Optimization for Finance & Logistics', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-25-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-25-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'QPA 411', title: 'Quantum Simulation of Chemical Systems', status: 'C', unit: 4 },
              { code: 'QPA 412', title: 'Advanced Tensor Networks for Quantum Systems', status: 'C', unit: 4 },
              { code: 'QPA 413', title: 'Distributed Quantum Computing & Networking', status: 'C', unit: 4 },
              { code: 'QPA 414', title: 'Quantum Startup Ecosystem & VC Strategy', status: 'C', unit: 3 },
              { code: 'QPA 415', title: 'Socio-Economic Impact of Quantum Supremacy', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-25-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'QPA 421', title: 'Advanced Quantum Research Methods', status: 'C', unit: 3 },
              { code: 'QPA 422', title: 'HND Capstone Innovation Project: Quantum Code', status: 'C', unit: 9 }
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
  // FACULTY 4: School of Fintech, Digital Economics & Tech Business
  // ============================================
  {
    id: 'fac-4',
    code: 'SFDETB',
    name: 'School of Fintech, Digital Economics & Tech Business',
    departments: [
      {
        id: 'dept-10',
        code: 'FT',
        name: 'Financial Technology (Fintech)',
        facultyId: 'fac-4',
        facultyName: 'School of Fintech, Digital Economics & Tech Business',
        programs: [
        {
          id: 'prog-28',
          code: 'ATF',
          name: 'Diploma in Algorithmic Trading & Finance',
          departmentId: 'dept-10',
          departmentName: 'Financial Technology (Fintech)',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-28-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-28-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'ATF 111', title: 'Foundations of Algorithmic Trading', status: 'C', unit: 3 },
              { code: 'ATF 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'ATF 113', title: 'Introduction to Algorithmic Trading', status: 'C', unit: 3 },
              { code: 'ATF 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ATF 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'ATF 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-28-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'ATF 121', title: 'Applied Algorithmic Trading Techniques', status: 'C', unit: 3 },
              { code: 'ATF 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'ATF 123', title: 'Practical Algorithmic Trading Applications', status: 'C', unit: 3 },
              { code: 'ATF 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'ATF 125', title: 'Ethics in Algorithmic Trading', status: 'C', unit: 2 },
              { code: 'ATF 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'ATF 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-28-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-28-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'ATF 211', title: 'Advanced Algorithmic Trading Systems', status: 'C', unit: 4 },
              { code: 'ATF 212', title: 'Industry Applications of Algorithmic Trading', status: 'C', unit: 3 },
              { code: 'ATF 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'ATF 214', title: 'Professional Practice in Algorithmic Trading', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ATF 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'ATF 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-28-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'ATF 221', title: 'Capstone Project (Algorithmic Trading)', status: 'C', unit: 6 },
              { code: 'ATF 222', title: 'Emerging Trends in Algorithmic Trading', status: 'C', unit: 3 },
              { code: 'ATF 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ATF 224', title: 'Algorithmic Trading for Business', status: 'E', unit: 2 },
              { code: 'ATF 225', title: 'Algorithmic Trading Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-29',
          code: 'DPS',
          name: 'Diploma in Digital Banking & Payment Systems',
          departmentId: 'dept-10',
          departmentName: 'Financial Technology (Fintech)',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-29-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-29-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DPS 111', title: 'Foundations of Digital Banking', status: 'C', unit: 3 },
              { code: 'DPS 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'DPS 113', title: 'Introduction to Digital Banking', status: 'C', unit: 3 },
              { code: 'DPS 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'DPS 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'DPS 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-29-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DPS 121', title: 'Applied Digital Banking Techniques', status: 'C', unit: 3 },
              { code: 'DPS 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'DPS 123', title: 'Practical Digital Banking Applications', status: 'C', unit: 3 },
              { code: 'DPS 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'DPS 125', title: 'Ethics in Digital Banking', status: 'C', unit: 2 },
              { code: 'DPS 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'DPS 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-29-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-29-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'DPS 211', title: 'Advanced Digital Banking Systems', status: 'C', unit: 4 },
              { code: 'DPS 212', title: 'Industry Applications of Digital Banking', status: 'C', unit: 3 },
              { code: 'DPS 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'DPS 214', title: 'Professional Practice in Digital Banking', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'DPS 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'DPS 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-29-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'DPS 221', title: 'Capstone Project (Digital Banking)', status: 'C', unit: 6 },
              { code: 'DPS 222', title: 'Emerging Trends in Digital Banking', status: 'C', unit: 3 },
              { code: 'DPS 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'DPS 224', title: 'Digital Banking for Business', status: 'E', unit: 2 },
              { code: 'DPS 225', title: 'Digital Banking Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-30',
          code: 'DFW',
          name: 'Diploma in Decentralized Finance (DeFi) & Web3',
          departmentId: 'dept-10',
          departmentName: 'Financial Technology (Fintech)',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-30-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-30-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DFW 111', title: 'Foundations of DeFi & Web3', status: 'C', unit: 3 },
              { code: 'DFW 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'DFW 113', title: 'Introduction to DeFi & Web3', status: 'C', unit: 3 },
              { code: 'DFW 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'DFW 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'DFW 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-30-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DFW 121', title: 'Applied DeFi & Web3 Techniques', status: 'C', unit: 3 },
              { code: 'DFW 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'DFW 123', title: 'Practical DeFi & Web3 Applications', status: 'C', unit: 3 },
              { code: 'DFW 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'DFW 125', title: 'Ethics in DeFi & Web3', status: 'C', unit: 2 },
              { code: 'DFW 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'DFW 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-30-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-30-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'DFW 211', title: 'Advanced DeFi & Web3 Systems', status: 'C', unit: 4 },
              { code: 'DFW 212', title: 'Industry Applications of DeFi & Web3', status: 'C', unit: 3 },
              { code: 'DFW 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'DFW 214', title: 'Professional Practice in DeFi & Web3', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'DFW 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'DFW 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-30-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'DFW 221', title: 'Capstone Project (DeFi & Web3)', status: 'C', unit: 6 },
              { code: 'DFW 222', title: 'Emerging Trends in DeFi & Web3', status: 'C', unit: 3 },
              { code: 'DFW 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'DFW 224', title: 'DeFi & Web3 for Business', status: 'E', unit: 2 },
              { code: 'DFW 225', title: 'DeFi & Web3 Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-28',
          code: 'ATF-HND',
          name: 'HND in Algorithmic Trading & Quantitative Finance',
          departmentId: 'dept-10',
          departmentName: 'Financial Technology (Fintech)',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-28-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-28-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'ATF 311', title: 'Stochastic Calculus, Martingales, & Asset Pricing', status: 'C', unit: 4 },
              { code: 'ATF 312', title: 'Prompt Engineering for Alpha Signals & Production Strategy Code', status: 'C', unit: 3 },
              { code: 'ATF 313', title: 'Low-Latency Architecture & High-Frequency Data Feed Ingestion', status: 'C', unit: 4 },
              { code: 'ATF 314', title: 'Mobile Quant Lab: Dynamic Strategy Management via Portable Shells', status: 'C', unit: 3 },
              { code: 'ATF 315', title: 'Volatility Surface Modeling & Advanced Exotic Derivatives', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-28-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'ATF 321', title: 'Deep Learning for Limit Order Books & Price Microstructure', status: 'C', unit: 4 },
              { code: 'ATF 322', title: 'Alternative Data Mining: NLP Sentiment & Satellite Stream Analysis', status: 'C', unit: 4 },
              { code: 'ATF 323', title: 'Reinforcement Learning Frameworks for Real-Time Execution', status: 'C', unit: 4 },
              { code: 'ATF 324', title: 'High-Frequency Backtesting Engine Design & Slippage Modeling', status: 'C', unit: 3 },
              { code: 'ATF 325', title: 'Risk Architecture: Extreme Value Theory & Liquidity Stress Testing', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-28-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-28-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'ATF 411', title: 'High-Frequency Execution & Market Making Strategies', status: 'C', unit: 4 },
              { code: 'ATF 412', title: 'Quantitative Macroeconomic Modeling & Regime-Switching Systems', status: 'C', unit: 4 },
              { code: 'ATF 413', title: 'Dark Pools, Block Execution Economics, & Order Routing Dynamics', status: 'C', unit: 4 },
              { code: 'ATF 414', title: 'Hedge Fund Design, Fund Structuring, & Capital Raising Strategy', status: 'C', unit: 3 },
              { code: 'ATF 415', title: 'Algorithmic Integrity, Market Manipulation Law, & Ethical Execution', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-28-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'ATF 421', title: 'Advanced Quantitative Finance Research Methodology', status: 'C', unit: 3 },
              { code: 'ATF 422', title: 'HND Capstone Innovation Project: Live Execution Trading Engine', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-29',
          code: 'DPS-HND',
          name: 'HND in Digital Banking & Payment Systems',
          departmentId: 'dept-10',
          departmentName: 'Financial Technology (Fintech)',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-29-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-29-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'DPS 311', title: 'Distributed Ledger Implementations for Core Banking Systems', status: 'C', unit: 4 },
              { code: 'DPS 312', title: 'Prompt Engineering for API Documentation & Bank Ledger Automation', status: 'C', unit: 3 },
              { code: 'DPS 313', title: 'High-Throughput Transaction Processing Engines & Message Queues', status: 'C', unit: 4 },
              { code: 'DPS 314', title: 'Mobile Banking Lab: Securing Local Wallets & Biometric Auth Rails', status: 'C', unit: 3 },
              { code: 'DPS 315', title: 'Real-Time Settlement Architecture & ISO 20022 Implementations', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-29-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DPS 321', title: 'Cross-Border Remittance Networks & FX Settlement Engines', status: 'C', unit: 4 },
              { code: 'DPS 322', title: 'Open Banking Frameworks, Consent Architecture, & OAuth Security', status: 'C', unit: 4 },
              { code: 'DPS 323', title: 'Automated Anti-Money Laundering (AML) Graph Analysis & Fraud ML', status: 'C', unit: 4 },
              { code: 'DPS 324', title: 'Microservice Design Patterns for Mission-Critical Financial Apps', status: 'C', unit: 3 },
              { code: 'DPS 325', title: 'Digital Banking Regulations: Basel III/IV & Open Finance Policy', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-29-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-29-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DPS 411', title: 'Central Bank Digital Currencies (CBDCs) & Retail Integration', status: 'C', unit: 4 },
              { code: 'DPS 412', title: 'Neobank Scaling: Multi-Currency Ledgers & Interbank Settlement', status: 'C', unit: 4 },
              { code: 'DPS 413', title: 'Biometric Infrastructure & Cryptographic Identity Management', status: 'C', unit: 4 },
              { code: 'DPS 414', title: 'Fintech Product Valuation, Unit Economics, & Customer Acquisition', status: 'C', unit: 3 },
              { code: 'DPS 415', title: 'Sovereign Financial Infrastructure Protection & Cyber-Resilience', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-29-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'DPS 421', title: 'Advanced Payment Systems Research Methodology', status: 'C', unit: 3 },
              { code: 'DPS 422', title: 'HND Capstone Innovation Project: Production-Grade Payment Gateway', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-30',
          code: 'DFW-HND',
          name: 'HND in Decentralized Finance (DeFi) & Web3',
          departmentId: 'dept-10',
          departmentName: 'Financial Technology (Fintech)',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-30-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-30-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'DFW 311', title: 'Advanced Solidity & Rust Contract Engineering for EVM/Wasm', status: 'C', unit: 4 },
              { code: 'DFW 312', title: 'Prompt Engineering for Formal Verification & Contract Fuzzing', status: 'C', unit: 3 },
              { code: 'DFW 313', title: 'Mathematical Models of Automated Market Makers (AMMs)', status: 'C', unit: 4 },
              { code: 'DFW 314', title: 'Mobile Web3 Lab: Mobile dApp Optimization & RPC Node Interaction', status: 'C', unit: 3 },
              { code: 'DFW 315', title: 'Cryptographic Primitives: Zero-Knowledge Proofs & FHE in DeFi', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-30-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DFW 321', title: 'EVM State Manipulation, Flash Loan Mechanics, & MEV Bots', status: 'C', unit: 4 },
              { code: 'DFW 322', title: 'Cross-Chain Interoperability Protocols & Bridge Architecture', status: 'C', unit: 4 },
              { code: 'DFW 323', title: 'Advanced Tokenomics Design: Game-Theoretic Incentive Frameworks', status: 'C', unit: 4 },
              { code: 'DFW 324', title: 'Decentralized Storage Systems & Content Addressing Infrastructure', status: 'C', unit: 3 },
              { code: 'DFW 325', title: 'Algorithmic Stablecoin Stability Engines & Collateral Models', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-30-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-30-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DFW 411', title: 'Multi-Tiered Liquidity Aggregation & Lending Protocol Primitives', status: 'C', unit: 4 },
              { code: 'DFW 412', title: 'DAO Governance Architecture, On-Chain Voting, & Attack Vectors', status: 'C', unit: 4 },
              { code: 'DFW 413', title: 'Synthetic Asset Engineering & Decentralized Derivative Protocols', status: 'C', unit: 4 },
              { code: 'DFW 414', title: 'Web3 Venture Incubation: Launching & Financing Decentralized Networks', status: 'C', unit: 3 },
              { code: 'DFW 415', title: 'Global Crypto Jurisprudence, Compliance Mixers, & SEC/MiCA Policy', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-30-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'DFW 421', title: 'Advanced Web3 Systems Research Methodology', status: 'C', unit: 3 },
              { code: 'DFW 422', title: 'HND Capstone Innovation Project: Audited Decentralized Protocol', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        }
        ]
      },      {
        id: 'dept-11',
        code: 'DEPM',
        name: 'Digital Economics & Predictive Markets',
        facultyId: 'fac-4',
        facultyName: 'School of Fintech, Digital Economics & Tech Business',
        programs: [
        {
          id: 'prog-31',
          code: 'DBE',
          name: 'Diploma in Data Science for Business Economics',
          departmentId: 'dept-11',
          departmentName: 'Digital Economics & Predictive Markets',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-31-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-31-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DBE 111', title: 'Foundations of Business Economics', status: 'C', unit: 3 },
              { code: 'DBE 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'DBE 113', title: 'Introduction to Business Economics', status: 'C', unit: 3 },
              { code: 'DBE 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'DBE 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'DBE 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-31-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DBE 121', title: 'Applied Business Economics Techniques', status: 'C', unit: 3 },
              { code: 'DBE 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'DBE 123', title: 'Practical Business Economics Applications', status: 'C', unit: 3 },
              { code: 'DBE 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'DBE 125', title: 'Ethics in Business Economics', status: 'C', unit: 2 },
              { code: 'DBE 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'DBE 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-31-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-31-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'DBE 211', title: 'Advanced Business Economics Systems', status: 'C', unit: 4 },
              { code: 'DBE 212', title: 'Industry Applications of Business Economics', status: 'C', unit: 3 },
              { code: 'DBE 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'DBE 214', title: 'Professional Practice in Business Economics', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'DBE 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'DBE 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-31-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'DBE 221', title: 'Capstone Project (Business Economics)', status: 'C', unit: 6 },
              { code: 'DBE 222', title: 'Emerging Trends in Business Economics', status: 'C', unit: 3 },
              { code: 'DBE 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'DBE 224', title: 'Business Economics for Business', status: 'E', unit: 2 },
              { code: 'DBE 225', title: 'Business Economics Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-32',
          code: 'EPO',
          name: 'Diploma in E-Commerce & Platform Operations',
          departmentId: 'dept-11',
          departmentName: 'Digital Economics & Predictive Markets',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-32-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-32-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'EPO 111', title: 'Foundations of E-Commerce Operations', status: 'C', unit: 3 },
              { code: 'EPO 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'EPO 113', title: 'Introduction to E-Commerce Operations', status: 'C', unit: 3 },
              { code: 'EPO 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'EPO 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'EPO 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-32-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'EPO 121', title: 'Applied E-Commerce Operations Techniques', status: 'C', unit: 3 },
              { code: 'EPO 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'EPO 123', title: 'Practical E-Commerce Operations Applications', status: 'C', unit: 3 },
              { code: 'EPO 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'EPO 125', title: 'Ethics in E-Commerce Operations', status: 'C', unit: 2 },
              { code: 'EPO 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'EPO 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-32-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-32-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'EPO 211', title: 'Advanced E-Commerce Operations Systems', status: 'C', unit: 4 },
              { code: 'EPO 212', title: 'Industry Applications of E-Commerce Operations', status: 'C', unit: 3 },
              { code: 'EPO 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'EPO 214', title: 'Professional Practice in E-Commerce Operations', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'EPO 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'EPO 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-32-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'EPO 221', title: 'Capstone Project (E-Commerce Operations)', status: 'C', unit: 6 },
              { code: 'EPO 222', title: 'Emerging Trends in E-Commerce Operations', status: 'C', unit: 3 },
              { code: 'EPO 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'EPO 224', title: 'E-Commerce Operations for Business', status: 'E', unit: 2 },
              { code: 'EPO 225', title: 'E-Commerce Operations Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-33',
          code: 'DAM',
          name: 'Diploma in Digital Asset Management',
          departmentId: 'dept-11',
          departmentName: 'Digital Economics & Predictive Markets',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-33-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-33-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DAM 111', title: 'Foundations of Digital Asset Management', status: 'C', unit: 3 },
              { code: 'DAM 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'DAM 113', title: 'Introduction to Digital Asset Management', status: 'C', unit: 3 },
              { code: 'DAM 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'DAM 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'DAM 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-33-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DAM 121', title: 'Applied Digital Asset Management Techniques', status: 'C', unit: 3 },
              { code: 'DAM 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'DAM 123', title: 'Practical Digital Asset Management Applications', status: 'C', unit: 3 },
              { code: 'DAM 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'DAM 125', title: 'Ethics in Digital Asset Management', status: 'C', unit: 2 },
              { code: 'DAM 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'DAM 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-33-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-33-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'DAM 211', title: 'Advanced Digital Asset Management Systems', status: 'C', unit: 4 },
              { code: 'DAM 212', title: 'Industry Applications of Digital Asset Management', status: 'C', unit: 3 },
              { code: 'DAM 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'DAM 214', title: 'Professional Practice in Digital Asset Management', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'DAM 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'DAM 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-33-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'DAM 221', title: 'Capstone Project (Digital Asset Management)', status: 'C', unit: 6 },
              { code: 'DAM 222', title: 'Emerging Trends in Digital Asset Management', status: 'C', unit: 3 },
              { code: 'DAM 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'DAM 224', title: 'Digital Asset Management for Business', status: 'E', unit: 2 },
              { code: 'DAM 225', title: 'Digital Asset Management Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-31',
          code: 'DBE-HND',
          name: 'HND in Data Science for Business Economics',
          departmentId: 'dept-11',
          departmentName: 'Digital Economics & Predictive Markets',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-31-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-31-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'DBE 311', title: 'Advanced Structural Econometrics & Causal Machine Learning', status: 'C', unit: 4 },
              { code: 'DBE 312', title: 'Prompt Engineering for Dynamic Macro Simulation & Synthetic Control', status: 'C', unit: 3 },
              { code: 'DBE 313', title: 'Big Data Processing Infrastructure (Spark/Flink) for Economists', status: 'C', unit: 4 },
              { code: 'DBE 314', title: 'Mobile Analytics: Deploying Local Data Processing Scripts on Android', status: 'C', unit: 3 },
              { code: 'DBE 315', title: 'Dynamic Pricing Analytics & Enterprise Revenue Maximization', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-31-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DBE 321', title: 'Behavioral Economics & Choice Architecture in Digital Platforms', status: 'C', unit: 4 },
              { code: 'DBE 322', title: 'Mechanism Design & Game-Theoretic Auction Systems', status: 'C', unit: 4 },
              { code: 'DBE 323', title: 'High-Dimensional Time-Series Economic Forecasting Models', status: 'C', unit: 4 },
              { code: 'DBE 324', title: 'Network Optimization & Spatial/GIS Economic Intelligence', status: 'C', unit: 3 },
              { code: 'DBE 325', title: 'Algorithmic Fair Lending, Bias Mitigation, & Information Asymmetry', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-31-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-31-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'DBE 411', title: 'Machine Learning for Policy Evaluation & Counterfactual Inference', status: 'C', unit: 4 },
              { code: 'DBE 412', title: 'Multi-Sided Marketplace Matching Optimization & Network Effects', status: 'C', unit: 4 },
              { code: 'DBE 413', title: 'Consumer Lifetime Value (CLV) Prediction & Churn Modeling', status: 'C', unit: 4 },
              { code: 'DBE 414', title: 'Virtual Asset Valuations, Metaverse Supply-Demand Economics', status: 'C', unit: 3 },
              { code: 'DBE 415', title: 'Data Privacy Regulation, Synthetic Data Generation, & Antitrust Policy', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-31-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'DBE 421', title: 'Advanced Business Economics Research Methodology', status: 'C', unit: 3 },
              { code: 'DBE 422', title: 'HND Capstone Innovation Project: Enterprise Predictive Market Model', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-32',
          code: 'EPO-HND',
          name: 'HND in E-Commerce & Platform Operations',
          departmentId: 'dept-11',
          departmentName: 'Digital Economics & Predictive Markets',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-32-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-32-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'EPO 311', title: 'Multi-Tenant Marketplace System Design & Headless E-Commerce', status: 'C', unit: 4 },
              { code: 'EPO 312', title: 'Prompt Engineering for Automated Product Catalog & Copy Generation', status: 'C', unit: 3 },
              { code: 'EPO 313', title: 'Global Supply Chain Logistics, Cross-Border Customs, & Freight Ops', status: 'C', unit: 4 },
              { code: 'EPO 314', title: 'Mobile Storefront Lab: Managing Cloud CMS and Inventories via App', status: 'C', unit: 3 },
              { code: 'EPO 315', title: 'Real-Time Payment Gateway & Escrow Settlement Systems', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-32-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-32-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'EPO 411', title: 'Platform Network Effects & Strategic Ecosystem Engineering', status: 'C', unit: 4 },
              { code: 'EPO 422', title: 'HND Capstone Innovation Project: Scalable Marketplace Deployment', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-33',
          code: 'DAM-HND',
          name: 'HND in Digital Asset Management',
          departmentId: 'dept-11',
          departmentName: 'Digital Economics & Predictive Markets',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-33-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-33-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'DAM 311', title: 'Institutional Alternative Investment Fund Configurations', status: 'C', unit: 4 },
              { code: 'DAM 312', title: 'Prompt Engineering for Portfolio Stress Rebalancing & Risk Scripts', status: 'C', unit: 3 },
              { code: 'DAM 313', title: 'Advanced Tokenization Mechanics: Real Estate & RWA Structuring', status: 'C', unit: 4 },
              { code: 'DAM 314', title: 'Mobile Portfolio Lab: Secure Cold-Storage and Custodial API Linking', status: 'C', unit: 3 },
              { code: 'DAM 315', title: 'Market Microstructure, Order Flow, & Liquidity Sourcing', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-33-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-33-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'DAM 411', title: 'Quantitative Portfolio Attribution & Risk-Adjusted Metrics', status: 'C', unit: 4 },
              { code: 'DAM 422', title: 'HND Capstone Innovation Project: Asset Tokenization Launchpad', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        }
        ]
      },      {
        id: 'dept-12',
        code: 'TEIM',
        name: 'Tech Entrepreneurship & Innovation Management',
        facultyId: 'fac-4',
        facultyName: 'School of Fintech, Digital Economics & Tech Business',
        programs: [
        {
          id: 'prog-34',
          code: 'TSM',
          name: 'Diploma in Tech Startup Management',
          departmentId: 'dept-12',
          departmentName: 'Tech Entrepreneurship & Innovation Management',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-34-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-34-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'TSM 111', title: 'Foundations of Tech Startup Management', status: 'C', unit: 3 },
              { code: 'TSM 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'TSM 113', title: 'Introduction to Tech Startup Management', status: 'C', unit: 3 },
              { code: 'TSM 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'TSM 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'TSM 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-34-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'TSM 121', title: 'Applied Tech Startup Management Techniques', status: 'C', unit: 3 },
              { code: 'TSM 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'TSM 123', title: 'Practical Tech Startup Management Applications', status: 'C', unit: 3 },
              { code: 'TSM 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'TSM 125', title: 'Ethics in Tech Startup Management', status: 'C', unit: 2 },
              { code: 'TSM 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'TSM 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-34-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-34-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'TSM 211', title: 'Advanced Tech Startup Management Systems', status: 'C', unit: 4 },
              { code: 'TSM 212', title: 'Industry Applications of Tech Startup Management', status: 'C', unit: 3 },
              { code: 'TSM 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'TSM 214', title: 'Professional Practice in Tech Startup Management', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'TSM 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'TSM 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-34-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'TSM 221', title: 'Capstone Project (Tech Startup Management)', status: 'C', unit: 6 },
              { code: 'TSM 222', title: 'Emerging Trends in Tech Startup Management', status: 'C', unit: 3 },
              { code: 'TSM 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'TSM 224', title: 'Tech Startup Management for Business', status: 'E', unit: 2 },
              { code: 'TSM 225', title: 'Tech Startup Management Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-35',
          code: 'PMS',
          name: 'Diploma in Product Management & Strategy',
          departmentId: 'dept-12',
          departmentName: 'Tech Entrepreneurship & Innovation Management',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-35-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-35-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'PMS 111', title: 'Foundations of Product Management', status: 'C', unit: 3 },
              { code: 'PMS 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'PMS 113', title: 'Introduction to Product Management', status: 'C', unit: 3 },
              { code: 'PMS 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'PMS 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'PMS 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-35-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'PMS 121', title: 'Applied Product Management Techniques', status: 'C', unit: 3 },
              { code: 'PMS 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'PMS 123', title: 'Practical Product Management Applications', status: 'C', unit: 3 },
              { code: 'PMS 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'PMS 125', title: 'Ethics in Product Management', status: 'C', unit: 2 },
              { code: 'PMS 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'PMS 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-35-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-35-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'PMS 211', title: 'Advanced Product Management Systems', status: 'C', unit: 4 },
              { code: 'PMS 212', title: 'Industry Applications of Product Management', status: 'C', unit: 3 },
              { code: 'PMS 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'PMS 214', title: 'Professional Practice in Product Management', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'PMS 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'PMS 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-35-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'PMS 221', title: 'Capstone Project (Product Management)', status: 'C', unit: 6 },
              { code: 'PMS 222', title: 'Emerging Trends in Product Management', status: 'C', unit: 3 },
              { code: 'PMS 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'PMS 224', title: 'Product Management for Business', status: 'E', unit: 2 },
              { code: 'PMS 225', title: 'Product Management Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-36',
          code: 'ABI',
          name: 'Diploma in AI-Driven Business Intelligence',
          departmentId: 'dept-12',
          departmentName: 'Tech Entrepreneurship & Innovation Management',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-36-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-36-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'ABI 111', title: 'Foundations of Business Intelligence', status: 'C', unit: 3 },
              { code: 'ABI 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'ABI 113', title: 'Introduction to Business Intelligence', status: 'C', unit: 3 },
              { code: 'ABI 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'ABI 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'ABI 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-36-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'ABI 121', title: 'Applied Business Intelligence Techniques', status: 'C', unit: 3 },
              { code: 'ABI 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'ABI 123', title: 'Practical Business Intelligence Applications', status: 'C', unit: 3 },
              { code: 'ABI 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'ABI 125', title: 'Ethics in Business Intelligence', status: 'C', unit: 2 },
              { code: 'ABI 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'ABI 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-36-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-36-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'ABI 211', title: 'Advanced Business Intelligence Systems', status: 'C', unit: 4 },
              { code: 'ABI 212', title: 'Industry Applications of Business Intelligence', status: 'C', unit: 3 },
              { code: 'ABI 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'ABI 214', title: 'Professional Practice in Business Intelligence', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'ABI 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'ABI 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-36-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'ABI 221', title: 'Capstone Project (Business Intelligence)', status: 'C', unit: 6 },
              { code: 'ABI 222', title: 'Emerging Trends in Business Intelligence', status: 'C', unit: 3 },
              { code: 'ABI 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'ABI 224', title: 'Business Intelligence for Business', status: 'E', unit: 2 },
              { code: 'ABI 225', title: 'Business Intelligence Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-34',
          code: 'TSM-HND',
          name: 'HND in Tech Startup Management',
          departmentId: 'dept-12',
          departmentName: 'Tech Entrepreneurship & Innovation Management',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-34-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-34-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'TSM 311', title: 'Post-Product-Market Fit Venture Scaling & Growth Frameworks', status: 'C', unit: 4 },
              { code: 'TSM 312', title: 'Prompt Engineering for Financial Cap Tables & VC Term Sheet Modeling', status: 'C', unit: 3 },
              { code: 'TSM 313', title: 'Venture Capital Term Sheet Mechanics & Seed-to-Series A Pitching', status: 'C', unit: 4 },
              { code: 'TSM 314', title: 'Mobile Office Lab: Running Sprints & Remote CRM via Handheld Environments', status: 'C', unit: 3 },
              { code: 'TSM 315', title: 'Advanced IP Law, International Patents, & Tech Licensing Strategies', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-34-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-34-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'TSM 411', title: 'Tech Mergers & Acquisitions (M&A) and Corporate Exit Strategies', status: 'C', unit: 4 },
              { code: 'TSM 422', title: 'HND Capstone Innovation Project: Venture Pitch & Functional MVP Demo', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-35',
          code: 'PMS-HND',
          name: 'HND in Product Management & Strategy',
          departmentId: 'dept-12',
          departmentName: 'Tech Entrepreneurship & Innovation Management',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-35-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-35-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'PMS 311', title: 'High-Growth Product Strategy, Monetization, & Value Metrics', status: 'C', unit: 4 },
              { code: 'PMS 312', title: 'Prompt Engineering for PRDs, Technical Specs, & User Stories', status: 'C', unit: 3 },
              { code: 'PMS 313', title: 'Enterprise Product Optimization: Statistical A/B Testing at Scale', status: 'C', unit: 4 },
              { code: 'PMS 314', title: 'Mobile PM Toolchains: Managing Sprints & Delivery on Handheld Terminals', status: 'C', unit: 3 },
              { code: 'PMS 315', title: 'Behavioral UX Design, Cognitive Psychology, & Product Friction Ops', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-35-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'PMS 321', title: 'Platform Product Management: SaaS Architecture & B2B Mechanics', status: 'C', unit: 4 },
              { code: 'PMS 322', title: 'Technical Fluency: Microservices, API Contract Design, & Data Models', status: 'C', unit: 4 },
              { code: 'PMS 323', title: 'Product Financial Modeling, Pricing Strategies, & Cohort Analytics', status: 'C', unit: 4 },
              { code: 'PMS 324', title: 'Go-To-Market (GTM) Strategy for Disruptive Tech & Emerging Markets', status: 'C', unit: 3 },
              { code: 'PMS 325', title: 'Influence Without Authority: Executive Stakeholder Leadership', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-35-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-35-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'PMS 411', title: 'AI Product Management: Designing LLM Chains and Agentic Workflows', status: 'C', unit: 4 },
              { code: 'PMS 412', title: 'Scaling Product Teams: Product Ops, Frameworks, & Team Topologies', status: 'C', unit: 4 },
              { code: 'PMS 413', title: 'Innovation Accounting, Growth Loops, & Product-Led Growth (PLG)', status: 'C', unit: 4 },
              { code: 'PMS 414', title: 'Algorithmic Ethics, Dark Patterns Avoidance, & Digital Safety Policy', status: 'C', unit: 3 },
              { code: 'PMS 415', title: 'Global Localization, Multilingual Product Shipping, & Expansion', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-35-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'PMS 421', title: 'Advanced Product Management Research Methodology', status: 'C', unit: 3 },
              { code: 'PMS 422', title: 'HND Capstone Innovation Project: Complete Product Specification & MVP', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-36',
          code: 'ABI-HND',
          name: 'HND in AI-Driven Business Intelligence',
          departmentId: 'dept-12',
          departmentName: 'Tech Entrepreneurship & Innovation Management',
          facultyId: 'fac-4',
          facultyName: 'School of Fintech, Digital Economics & Tech Business',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-36-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-36-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'ABI 311', title: 'Modern Data Warehouse Infrastructure & Automated ETL Pipelines', status: 'C', unit: 4 },
              { code: 'ABI 312', title: 'Prompt Engineering for Automated SQL Synthesis & Code Migration', status: 'C', unit: 3 },
              { code: 'ABI 313', title: 'Advanced SQL, Window Functions, & Analytics Database Optimization', status: 'C', unit: 4 },
              { code: 'ABI 314', title: 'Mobile BI Lab: Interfacing with Live Production Dashboards via Mobile App', status: 'C', unit: 3 },
              { code: 'ABI 315', title: 'Quantitative Business Data Visualization & Dashboard Design Theory', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-36-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-36-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'ABI 411', title: 'AI-Driven Strategic Business Diagnostics & Forecasting Models', status: 'C', unit: 4 },
              { code: 'ABI 422', title: 'HND Capstone Innovation Project: Enterprise Business Intelligence Suite', status: 'C', unit: 9 }
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
  // FACULTY 5: School of Biotech, Healthcare & Environmental Engineering
  // ============================================
  {
    id: 'fac-5',
    code: 'SBHEE',
    name: 'School of Biotech, Healthcare & Environmental Engineering',
    departments: [
      {
        id: 'dept-13',
        code: 'BGE',
        name: 'Biotechnology & Genetic Engineering',
        facultyId: 'fac-5',
        facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
        programs: [
        {
          id: 'prog-37',
          code: 'BCB',
          name: 'Diploma in Bioinformatics & Computational Biology',
          departmentId: 'dept-13',
          departmentName: 'Biotechnology & Genetic Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-37-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-37-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BCB 111', title: 'Foundations of Computational Biology', status: 'C', unit: 3 },
              { code: 'BCB 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'BCB 113', title: 'Introduction to Computational Biology', status: 'C', unit: 3 },
              { code: 'BCB 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'BCB 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'BCB 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-37-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BCB 121', title: 'Applied Computational Biology Techniques', status: 'C', unit: 3 },
              { code: 'BCB 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'BCB 123', title: 'Practical Computational Biology Applications', status: 'C', unit: 3 },
              { code: 'BCB 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'BCB 125', title: 'Ethics in Computational Biology', status: 'C', unit: 2 },
              { code: 'BCB 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'BCB 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-37-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-37-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'BCB 211', title: 'Advanced Computational Biology Systems', status: 'C', unit: 4 },
              { code: 'BCB 212', title: 'Industry Applications of Computational Biology', status: 'C', unit: 3 },
              { code: 'BCB 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'BCB 214', title: 'Professional Practice in Computational Biology', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'BCB 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'BCB 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-37-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'BCB 221', title: 'Capstone Project (Computational Biology)', status: 'C', unit: 6 },
              { code: 'BCB 222', title: 'Emerging Trends in Computational Biology', status: 'C', unit: 3 },
              { code: 'BCB 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'BCB 224', title: 'Computational Biology for Business', status: 'E', unit: 2 },
              { code: 'BCB 225', title: 'Computational Biology Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-38',
          code: 'SBG',
          name: 'Diploma in Synthetic Biology & Genetic Engineering',
          departmentId: 'dept-13',
          departmentName: 'Biotechnology & Genetic Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-38-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-38-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'SBG 111', title: 'Foundations of Synthetic Biology', status: 'C', unit: 3 },
              { code: 'SBG 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'SBG 113', title: 'Introduction to Synthetic Biology', status: 'C', unit: 3 },
              { code: 'SBG 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'SBG 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'SBG 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-38-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'SBG 121', title: 'Applied Synthetic Biology Techniques', status: 'C', unit: 3 },
              { code: 'SBG 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'SBG 123', title: 'Practical Synthetic Biology Applications', status: 'C', unit: 3 },
              { code: 'SBG 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'SBG 125', title: 'Ethics in Synthetic Biology', status: 'C', unit: 2 },
              { code: 'SBG 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'SBG 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-38-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-38-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'SBG 211', title: 'Advanced Synthetic Biology Systems', status: 'C', unit: 4 },
              { code: 'SBG 212', title: 'Industry Applications of Synthetic Biology', status: 'C', unit: 3 },
              { code: 'SBG 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'SBG 214', title: 'Professional Practice in Synthetic Biology', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'SBG 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'SBG 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-38-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'SBG 221', title: 'Capstone Project (Synthetic Biology)', status: 'C', unit: 6 },
              { code: 'SBG 222', title: 'Emerging Trends in Synthetic Biology', status: 'C', unit: 3 },
              { code: 'SBG 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'SBG 224', title: 'Synthetic Biology for Business', status: 'E', unit: 2 },
              { code: 'SBG 225', title: 'Synthetic Biology Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-39',
          code: 'GME',
          name: 'Diploma in Genetic Modification & Ethics',
          departmentId: 'dept-13',
          departmentName: 'Biotechnology & Genetic Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-39-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-39-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'GME 111', title: 'Foundations of Genetic Modification', status: 'C', unit: 3 },
              { code: 'GME 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'GME 113', title: 'Introduction to Genetic Modification', status: 'C', unit: 3 },
              { code: 'GME 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'GME 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'GME 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-39-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'GME 121', title: 'Applied Genetic Modification Techniques', status: 'C', unit: 3 },
              { code: 'GME 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'GME 123', title: 'Practical Genetic Modification Applications', status: 'C', unit: 3 },
              { code: 'GME 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'GME 125', title: 'Ethics in Genetic Modification', status: 'C', unit: 2 },
              { code: 'GME 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'GME 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-39-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-39-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'GME 211', title: 'Advanced Genetic Modification Systems', status: 'C', unit: 4 },
              { code: 'GME 212', title: 'Industry Applications of Genetic Modification', status: 'C', unit: 3 },
              { code: 'GME 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'GME 214', title: 'Professional Practice in Genetic Modification', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'GME 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'GME 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-39-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'GME 221', title: 'Capstone Project (Genetic Modification)', status: 'C', unit: 6 },
              { code: 'GME 222', title: 'Emerging Trends in Genetic Modification', status: 'C', unit: 3 },
              { code: 'GME 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'GME 224', title: 'Genetic Modification for Business', status: 'E', unit: 2 },
              { code: 'GME 225', title: 'Genetic Modification Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-37',
          code: 'BCB-HND',
          name: 'HND in Bioinformatics & Computational Biology',
          departmentId: 'dept-13',
          departmentName: 'Biotechnology & Genetic Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-37-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-37-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'BCB 311', title: 'Advanced Algorithms in Sequence Analysis', status: 'C', unit: 4 },
              { code: 'BCB 312', title: 'Prompt Engineering for Protein Folding & Structural Prediction', status: 'C', unit: 3 },
              { code: 'BCB 313', title: 'Statistical Genomics & Population Genetics', status: 'C', unit: 4 },
              { code: 'BCB 314', title: 'Mobile Lab: Cloud-based Genome Browsers & Linux Clusters', status: 'C', unit: 3 },
              { code: 'BCB 315', title: 'Molecular Biology & Gene Expression', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-37-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BCB 321', title: 'Machine Learning for Functional Genomics', status: 'C', unit: 4 },
              { code: 'BCB 322', title: 'Systems Biology & Metabolic Pathway Modeling', status: 'C', unit: 4 },
              { code: 'BCB 323', title: 'Next-Generation Sequencing (NGS) Data Pipelines', status: 'C', unit: 4 },
              { code: 'BCB 324', title: 'Ethics, Biosafety, & Intellectual Property in Biotech', status: 'C', unit: 3 },
              { code: 'BCB 325', title: 'Advanced Python for Biological Data Science', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-37-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-37-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BCB 411', title: 'Precision Medicine & Pharmacogenomics', status: 'C', unit: 4 },
              { code: 'BCB 412', title: 'Computational Immunology & Vaccine Design', status: 'C', unit: 4 },
              { code: 'BCB 413', title: 'High-Performance Computing (HPC) for Biologists', status: 'C', unit: 4 },
              { code: 'BCB 414', title: 'Biotech Venture Design: From Lab to Market', status: 'C', unit: 3 },
              { code: 'BCB 415', title: 'Structural Bioinformatics & Molecular Docking', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-37-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'BCB 421', title: 'Advanced Biotechnology Research Methodology', status: 'C', unit: 3 },
              { code: 'BCB 422', title: 'HND Capstone Innovation Project: Genomic Pipeline', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-38',
          code: 'SBG-HND',
          name: 'HND in Synthetic Biology & Genetic Engineering',
          departmentId: 'dept-13',
          departmentName: 'Biotechnology & Genetic Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-38-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-38-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'SBG 311', title: 'Advanced CRISPR-Cas9 & Genome Editing Tech', status: 'C', unit: 4 },
              { code: 'SBG 312', title: 'Prompt Engineering for DNA Synthesis & Circuit Design', status: 'C', unit: 3 },
              { code: 'SBG 313', title: 'Metabolic Engineering & Microbial Cell Factories', status: 'C', unit: 4 },
              { code: 'SBG 314', title: 'Mobile Lab: Remote Bioreactor Monitoring & IoT Sensors', status: 'C', unit: 3 },
              { code: 'SBG 315', title: 'Advanced Biochemistry & Enzymology', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-38-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-38-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'SBG 411', title: 'Industrial Fermentation & Scale-Up Engineering', status: 'C', unit: 4 },
              { code: 'SBG 422', title: 'HND Capstone Innovation Project: Synthetic Organism', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        }
        ]
      },      {
        id: 'dept-14',
        code: 'DHBE',
        name: 'Digital Healthcare & Biomedical Engineering',
        facultyId: 'fac-5',
        facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
        programs: [
        {
          id: 'prog-40',
          code: 'BER',
          name: 'Diploma in Biomedical Engineering & Robotics',
          departmentId: 'dept-14',
          departmentName: 'Digital Healthcare & Biomedical Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-40-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-40-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BER 111', title: 'Foundations of Biomedical Engineering', status: 'C', unit: 3 },
              { code: 'BER 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'BER 113', title: 'Introduction to Biomedical Engineering', status: 'C', unit: 3 },
              { code: 'BER 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'BER 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'BER 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-40-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BER 121', title: 'Applied Biomedical Engineering Techniques', status: 'C', unit: 3 },
              { code: 'BER 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'BER 123', title: 'Practical Biomedical Engineering Applications', status: 'C', unit: 3 },
              { code: 'BER 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'BER 125', title: 'Ethics in Biomedical Engineering', status: 'C', unit: 2 },
              { code: 'BER 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'BER 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-40-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-40-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'BER 211', title: 'Advanced Biomedical Engineering Systems', status: 'C', unit: 4 },
              { code: 'BER 212', title: 'Industry Applications of Biomedical Engineering', status: 'C', unit: 3 },
              { code: 'BER 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'BER 214', title: 'Professional Practice in Biomedical Engineering', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'BER 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'BER 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-40-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'BER 221', title: 'Capstone Project (Biomedical Engineering)', status: 'C', unit: 6 },
              { code: 'BER 222', title: 'Emerging Trends in Biomedical Engineering', status: 'C', unit: 3 },
              { code: 'BER 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'BER 224', title: 'Biomedical Engineering for Business', status: 'E', unit: 2 },
              { code: 'BER 225', title: 'Biomedical Engineering Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-41',
          code: 'HIT',
          name: 'Diploma in Health Informatics & Telemedicine',
          departmentId: 'dept-14',
          departmentName: 'Digital Healthcare & Biomedical Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-41-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-41-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'HIT 111', title: 'Foundations of Health Informatics', status: 'C', unit: 3 },
              { code: 'HIT 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'HIT 113', title: 'Introduction to Health Informatics', status: 'C', unit: 3 },
              { code: 'HIT 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'HIT 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'HIT 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-41-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'HIT 121', title: 'Applied Health Informatics Techniques', status: 'C', unit: 3 },
              { code: 'HIT 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'HIT 123', title: 'Practical Health Informatics Applications', status: 'C', unit: 3 },
              { code: 'HIT 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'HIT 125', title: 'Ethics in Health Informatics', status: 'C', unit: 2 },
              { code: 'HIT 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'HIT 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-41-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-41-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'HIT 211', title: 'Advanced Health Informatics Systems', status: 'C', unit: 4 },
              { code: 'HIT 212', title: 'Industry Applications of Health Informatics', status: 'C', unit: 3 },
              { code: 'HIT 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'HIT 214', title: 'Professional Practice in Health Informatics', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'HIT 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'HIT 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-41-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'HIT 221', title: 'Capstone Project (Health Informatics)', status: 'C', unit: 6 },
              { code: 'HIT 222', title: 'Emerging Trends in Health Informatics', status: 'C', unit: 3 },
              { code: 'HIT 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'HIT 224', title: 'Health Informatics for Business', status: 'E', unit: 2 },
              { code: 'HIT 225', title: 'Health Informatics Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-42',
          code: 'MDE',
          name: 'Diploma in Medical Device Engineering',
          departmentId: 'dept-14',
          departmentName: 'Digital Healthcare & Biomedical Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-42-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-42-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'MDE 111', title: 'Foundations of Medical Device Engineering', status: 'C', unit: 3 },
              { code: 'MDE 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'MDE 113', title: 'Introduction to Medical Device Engineering', status: 'C', unit: 3 },
              { code: 'MDE 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'MDE 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'MDE 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-42-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'MDE 121', title: 'Applied Medical Device Engineering Techniques', status: 'C', unit: 3 },
              { code: 'MDE 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'MDE 123', title: 'Practical Medical Device Engineering Applications', status: 'C', unit: 3 },
              { code: 'MDE 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'MDE 125', title: 'Ethics in Medical Device Engineering', status: 'C', unit: 2 },
              { code: 'MDE 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'MDE 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-42-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-42-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'MDE 211', title: 'Advanced Medical Device Engineering Systems', status: 'C', unit: 4 },
              { code: 'MDE 212', title: 'Industry Applications of Medical Device Engineering', status: 'C', unit: 3 },
              { code: 'MDE 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'MDE 214', title: 'Professional Practice in Medical Device Engineering', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'MDE 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'MDE 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-42-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'MDE 221', title: 'Capstone Project (Medical Device Engineering)', status: 'C', unit: 6 },
              { code: 'MDE 222', title: 'Emerging Trends in Medical Device Engineering', status: 'C', unit: 3 },
              { code: 'MDE 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'MDE 224', title: 'Medical Device Engineering for Business', status: 'E', unit: 2 },
              { code: 'MDE 225', title: 'Medical Device Engineering Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-40',
          code: 'BER-HND',
          name: 'HND in Biomedical Engineering & Robotics',
          departmentId: 'dept-14',
          departmentName: 'Digital Healthcare & Biomedical Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-40-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-40-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'BER 311', title: 'Advanced Biomechanics & Human-Machine Interfaces', status: 'C', unit: 4 },
              { code: 'BER 312', title: 'Prompt Engineering for Robotic Kinematics & Control', status: 'C', unit: 3 },
              { code: 'BER 313', title: 'Biomedical Signal Processing & Digital Filters', status: 'C', unit: 4 },
              { code: 'BER 314', title: 'Mobile Robotics Lab: Android-based Controller Design', status: 'C', unit: 3 },
              { code: 'BER 315', title: 'Anatomy & Physiology for Engineers', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-40-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BER 321', title: 'Medical Imaging Systems (MRI, CT, Ultrasound)', status: 'C', unit: 4 },
              { code: 'BER 322', title: 'Surgical Robotics & Haptic Feedback Systems', status: 'C', unit: 4 },
              { code: 'BER 323', title: 'Neural Engineering & Brain-Computer Interfaces (BCI)', status: 'C', unit: 4 },
              { code: 'BER 324', title: 'Clinical Engineering & Hospital Equipment Mgmt', status: 'C', unit: 3 },
              { code: 'BER 325', title: 'Biomaterials & Tissue Engineering', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-40-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-40-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'BER 411', title: 'Artificial Organs & Prosthetic Design', status: 'C', unit: 4 },
              { code: 'BER 412', title: 'Micro-Robotics & Nanomedicine Delivery Systems', status: 'C', unit: 4 },
              { code: 'BER 413', title: 'Embedded Systems for Medical Wearables', status: 'C', unit: 4 },
              { code: 'BER 414', title: 'Healthcare Product Design & FDA Regulatory Path', status: 'C', unit: 3 },
              { code: 'BER 415', title: 'Internet of Medical Things (IoMT) Security', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-40-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'BER 421', title: 'Advanced Biomedical Research Methodology', status: 'C', unit: 3 },
              { code: 'BER 422', title: 'HND Capstone Innovation Project: Medical Robot', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-41',
          code: 'HIT-HND',
          name: 'HND in Health Informatics & Telemedicine',
          departmentId: 'dept-14',
          departmentName: 'Digital Healthcare & Biomedical Engineering',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-41-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-41-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'HIT 311', title: 'Enterprise Health Information Systems (EHIS)', status: 'C', unit: 4 },
              { code: 'HIT 312', title: 'Prompt Engineering for Medical Scribing & NLP', status: 'C', unit: 3 },
              { code: 'HIT 313', title: 'Telehealth Architecture & High-Definition Video Protocols', status: 'C', unit: 4 },
              { code: 'HIT 314', title: 'Mobile Health Lab: mHealth App Dev & Remote Diagnostics', status: 'C', unit: 3 },
              { code: 'HIT 315', title: 'Medical Coding, Standards (HL7, FHIR) & Interoperability', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-41-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-41-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'HIT 411', title: 'AI Diagnostics & Clinical Decision Support Systems', status: 'C', unit: 4 },
              { code: 'HIT 422', title: 'HND Capstone Innovation Project: Telemedicine Platform', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        }
        ]
      },      {
        id: 'dept-15',
        code: 'ETRE',
        name: 'Environmental Tech & Renewable Energy',
        facultyId: 'fac-5',
        facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
        programs: [
        {
          id: 'prog-43',
          code: 'REE',
          name: 'Diploma in Renewable Energy Engineering',
          departmentId: 'dept-15',
          departmentName: 'Environmental Tech & Renewable Energy',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-43-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-43-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'REE 111', title: 'Foundations of Renewable Energy', status: 'C', unit: 3 },
              { code: 'REE 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'REE 113', title: 'Introduction to Renewable Energy', status: 'C', unit: 3 },
              { code: 'REE 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'REE 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'REE 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-43-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'REE 121', title: 'Applied Renewable Energy Techniques', status: 'C', unit: 3 },
              { code: 'REE 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'REE 123', title: 'Practical Renewable Energy Applications', status: 'C', unit: 3 },
              { code: 'REE 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'REE 125', title: 'Ethics in Renewable Energy', status: 'C', unit: 2 },
              { code: 'REE 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'REE 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-43-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-43-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'REE 211', title: 'Advanced Renewable Energy Systems', status: 'C', unit: 4 },
              { code: 'REE 212', title: 'Industry Applications of Renewable Energy', status: 'C', unit: 3 },
              { code: 'REE 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'REE 214', title: 'Professional Practice in Renewable Energy', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'REE 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'REE 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-43-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'REE 221', title: 'Capstone Project (Renewable Energy)', status: 'C', unit: 6 },
              { code: 'REE 222', title: 'Emerging Trends in Renewable Energy', status: 'C', unit: 3 },
              { code: 'REE 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'REE 224', title: 'Renewable Energy for Business', status: 'E', unit: 2 },
              { code: 'REE 225', title: 'Renewable Energy Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-44',
          code: 'CTM',
          name: 'Diploma in Climate Tech & Carbon Management',
          departmentId: 'dept-15',
          departmentName: 'Environmental Tech & Renewable Energy',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-44-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-44-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'CTM 111', title: 'Foundations of Climate Technology', status: 'C', unit: 3 },
              { code: 'CTM 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'CTM 113', title: 'Introduction to Climate Technology', status: 'C', unit: 3 },
              { code: 'CTM 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'CTM 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'CTM 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-44-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'CTM 121', title: 'Applied Climate Technology Techniques', status: 'C', unit: 3 },
              { code: 'CTM 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'CTM 123', title: 'Practical Climate Technology Applications', status: 'C', unit: 3 },
              { code: 'CTM 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'CTM 125', title: 'Ethics in Climate Technology', status: 'C', unit: 2 },
              { code: 'CTM 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'CTM 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-44-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-44-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'CTM 211', title: 'Advanced Climate Technology Systems', status: 'C', unit: 4 },
              { code: 'CTM 212', title: 'Industry Applications of Climate Technology', status: 'C', unit: 3 },
              { code: 'CTM 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'CTM 214', title: 'Professional Practice in Climate Technology', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'CTM 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'CTM 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-44-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'CTM 221', title: 'Capstone Project (Climate Technology)', status: 'C', unit: 6 },
              { code: 'CTM 222', title: 'Emerging Trends in Climate Technology', status: 'C', unit: 3 },
              { code: 'CTM 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'CTM 224', title: 'Climate Technology for Business', status: 'E', unit: 2 },
              { code: 'CTM 225', title: 'Climate Technology Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-45',
          code: 'WRM',
          name: 'Diploma in Water Resource Management',
          departmentId: 'dept-15',
          departmentName: 'Environmental Tech & Renewable Energy',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 71,
          levels: [
          {
            id: 'prog-45-l1',
            number: 1,
            totalUnits: 36,
            semesters: [
            {
              id: 'prog-45-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'WRM 111', title: 'Foundations of Water Resources', status: 'C', unit: 3 },
              { code: 'WRM 112', title: 'Programming Fundamentals & Problem Solving', status: 'C', unit: 3 },
              { code: 'WRM 113', title: 'Introduction to Water Resources', status: 'C', unit: 3 },
              { code: 'WRM 114', title: 'Mathematics for Technology', status: 'C', unit: 3 },
              { code: 'GEN 101', title: 'Communication Skills for Tech', status: 'C', unit: 2 },
              { code: 'WRM 115', title: 'Digital Literacy & Professional Tools', status: 'E', unit: 2 },
              { code: 'WRM 116', title: 'Logic & Critical Thinking', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-45-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'WRM 121', title: 'Applied Water Resources Techniques', status: 'C', unit: 3 },
              { code: 'WRM 122', title: 'Data Structures & Algorithms', status: 'C', unit: 3 },
              { code: 'WRM 123', title: 'Practical Water Resources Applications', status: 'C', unit: 3 },
              { code: 'WRM 124', title: 'Database Management Systems', status: 'C', unit: 3 },
              { code: 'WRM 125', title: 'Ethics in Water Resources', status: 'C', unit: 2 },
              { code: 'WRM 126', title: 'Cloud Computing Basics', status: 'E', unit: 2 },
              { code: 'WRM 127', title: 'Introduction to IoT', status: 'E', unit: 2 }
              ]
            }
            ]
          },
          {
            id: 'prog-45-l2',
            number: 2,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-45-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 19,
              courses: [
              { code: 'WRM 211', title: 'Advanced Water Resources Systems', status: 'C', unit: 4 },
              { code: 'WRM 212', title: 'Industry Applications of Water Resources', status: 'C', unit: 3 },
              { code: 'WRM 213', title: 'Applied Research & Innovation', status: 'C', unit: 3 },
              { code: 'WRM 214', title: 'Professional Practice in Water Resources', status: 'C', unit: 3 },
              { code: 'GEN 201', title: 'Entrepreneurship in Tech', status: 'C', unit: 2 },
              { code: 'WRM 215', title: 'Project Management Fundamentals', status: 'E', unit: 2 },
              { code: 'WRM 216', title: 'Technical Writing & Documentation', status: 'E', unit: 2 }
              ]
            },
            {
              id: 'prog-45-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 16,
              courses: [
              { code: 'WRM 221', title: 'Capstone Project (Water Resources)', status: 'C', unit: 6 },
              { code: 'WRM 222', title: 'Emerging Trends in Water Resources', status: 'C', unit: 3 },
              { code: 'WRM 223', title: 'Scientific Research Methods', status: 'C', unit: 3 },
              { code: 'WRM 224', title: 'Water Resources for Business', status: 'E', unit: 2 },
              { code: 'WRM 225', title: 'Water Resources Case Studies', status: 'E', unit: 2 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-43',
          code: 'REE-HND',
          name: 'HND in Renewable Energy Engineering',
          departmentId: 'dept-15',
          departmentName: 'Environmental Tech & Renewable Energy',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 65,
          levels: [
          {
            id: 'prog-hnd-43-l1',
            number: 1,
            totalUnits: 35,
            semesters: [
            {
              id: 'prog-hnd-43-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'REE 311', title: 'Solar Photovoltaic (PV) System Design & Integration', status: 'C', unit: 4 },
              { code: 'REE 312', title: 'Prompt Engineering for Wind Farm Optimization & Layout', status: 'C', unit: 3 },
              { code: 'REE 313', title: 'Smart Grid Technology & Distributed Energy Resources', status: 'C', unit: 4 },
              { code: 'REE 314', title: 'Mobile Lab: Solar Site Surveys & IR Imaging via Android', status: 'C', unit: 3 },
              { code: 'REE 315', title: 'Thermodynamics & Energy Conversion Systems', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-43-l1-s2',
              number: 2 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'REE 321', title: 'Wind Energy Physics & Turbine Engineering', status: 'C', unit: 4 },
              { code: 'REE 322', title: 'Hydrogen Fuel Cells & Electrolyzer Technology', status: 'C', unit: 4 },
              { code: 'REE 323', title: 'Battery Storage Systems & Management (BMS)', status: 'C', unit: 4 },
              { code: 'REE 324', title: 'Energy Policy, Carbon Markets, & Project Finance', status: 'C', unit: 3 },
              { code: 'REE 325', title: 'Hybrid Energy Systems & Microgrid Control', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-43-l2',
            number: 2,
            totalUnits: 30,
            semesters: [
            {
              id: 'prog-hnd-43-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 18,
              courses: [
              { code: 'REE 411', title: 'Geothermal & Biomass Energy Conversion', status: 'C', unit: 4 },
              { code: 'REE 412', title: 'Power Electronics for Renewable Energy', status: 'C', unit: 4 },
              { code: 'REE 413', title: 'AI for Energy Demand Forecasting & Management', status: 'C', unit: 4 },
              { code: 'REE 414', title: 'Green Building Design & Energy Auditing', status: 'C', unit: 3 },
              { code: 'REE 415', title: 'Environmental Impact Assessment (EIA)', status: 'C', unit: 3 }
              ]
            },
            {
              id: 'prog-hnd-43-l2-s2',
              number: 2 as 1 | 2,
              totalUnits: 12,
              courses: [
              { code: 'REE 421', title: 'Advanced Energy Systems Research Methodology', status: 'C', unit: 3 },
              { code: 'REE 422', title: 'HND Capstone Innovation Project: Renewable Grid', status: 'C', unit: 9 }
              ]
            }
            ]
          }
          ]
        },
        {
          id: 'prog-hnd-44',
          code: 'CTM-HND',
          name: 'HND in Climate Tech & Carbon Management',
          departmentId: 'dept-15',
          departmentName: 'Environmental Tech & Renewable Energy',
          facultyId: 'fac-5',
          facultyName: 'School of Biotech, Healthcare & Environmental Engineering',
          totalUnits: 30,
          levels: [
          {
            id: 'prog-hnd-44-l1',
            number: 1,
            totalUnits: 17,
            semesters: [
            {
              id: 'prog-hnd-44-l1-s1',
              number: 1 as 1 | 2,
              totalUnits: 17,
              courses: [
              { code: 'CTM 311', title: 'Carbon Capture, Utilization & Storage (CCUS) Tech', status: 'C', unit: 4 },
              { code: 'CTM 312', title: 'Prompt Engineering for Climate Modeling & Simulation', status: 'C', unit: 3 },
              { code: 'CTM 313', title: 'Greenhouse Gas (GHG) Accounting & Lifecycle Analysis', status: 'C', unit: 4 },
              { code: 'CTM 314', title: 'Mobile Lab: Remote Sensing & GIS Satellite Analysis', status: 'C', unit: 3 },
              { code: 'CTM 315', title: 'Atmospheric Science & Global Warming Physics', status: 'C', unit: 3 }
              ]
            }
            ]
          },
          {
            id: 'prog-hnd-44-l2',
            number: 2,
            totalUnits: 13,
            semesters: [
            {
              id: 'prog-hnd-44-l2-s1',
              number: 1 as 1 | 2,
              totalUnits: 13,
              courses: [
              { code: 'CTM 411', title: 'Circular Economy Strategy & Waste-to-Energy', status: 'C', unit: 4 },
              { code: 'CTM 422', title: 'HND Capstone Innovation Project: Carbon Sequestration', status: 'C', unit: 9 }
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

// Helper function to get all programs flattened
export function getAllPrograms(): Program[] {
  const programs: Program[] = [];
  curriculumData.forEach(faculty => {
    faculty.departments.forEach(dept => {
      programs.push(...dept.programs);
    });
  });
  return programs;
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

// Helper: get ND programs only
export function getNDPrograms(): Program[] {
  return getAllPrograms().filter(p => !p.code.endsWith('-HND'));
}

// Helper: get HND programs only
export function getHNDPrograms(): Program[] {
  return getAllPrograms().filter(p => p.code.endsWith('-HND'));
}

// Total statistics
export const curriculumStats = {
  totalFaculties: curriculumData.length,
  totalDepartments: curriculumData.reduce((acc, f) => acc + f.departments.length, 0),
  totalPrograms: curriculumData.reduce((acc, f) => acc + f.departments.reduce((a, d) => a + d.programs.length, 0), 0),
  totalCourses: getAllCourses().length,
  totalCredits: getAllCourses().reduce((acc, c) => acc + c.unit, 0),
};
