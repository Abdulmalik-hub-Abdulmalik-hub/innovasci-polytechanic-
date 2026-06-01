'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Send,
  AlertTriangle,
  CheckCircle,
  BookOpen
} from 'lucide-react';

// Mock exam data
const examData = {
  id: 'exam1',
  title: 'AML 111 - Linear Algebra Mid-Term Examination',
  courseCode: 'AML 111',
  courseTitle: 'Linear Algebra for AI',
  duration: 60,
  totalQuestions: 10,
  passingMarks: 50,
  studentName: 'Chidi Okonkwo',
  admissionNumber: 'ISA/2024/001',
};

const questions = [
  { id: 'q1', type: 'multiple_choice', difficulty: 'easy', questionText: 'What is the determinant of a 2x2 matrix [[a,b],[c,d]]?', options: ['a+d', 'ad-bc', 'ab-cd', 'a*d'], marks: 2, topic: 'Matrix Operations' },
  { id: 'q2', type: 'multiple_choice', difficulty: 'medium', questionText: 'Which of the following is NOT a property of eigenvalues?', options: ['Product of eigenvalues = determinant', 'Sum of eigenvalues = trace', 'All eigenvalues are always positive', 'Eigenvalues can be complex'], marks: 2, topic: 'Eigenvalues' },
  { id: 'q3', type: 'true_false', difficulty: 'easy', questionText: 'The transpose of a matrix A is denoted by A^T.', marks: 1, topic: 'Matrix Operations' },
  { id: 'q4', type: 'true_false', difficulty: 'medium', questionText: 'A square matrix with all zeros is considered an identity matrix.', marks: 1, topic: 'Matrix Operations' },
  { id: 'q5', type: 'fill_blank', difficulty: 'medium', questionText: 'The identity matrix I has 1s on the ____ and 0s elsewhere.', marks: 2, topic: 'Matrix Operations' },
  { id: 'q6', type: 'multiple_choice', difficulty: 'hard', questionText: 'For a symmetric matrix A, which statement is TRUE?', options: ['A has only real eigenvalues', 'A is always positive definite', 'A has zero determinant', 'A has complex eigenvalues'], marks: 3, topic: 'Matrix Types' },
  { id: 'q7', type: 'fill_blank', difficulty: 'hard', questionText: 'The rank of a matrix represents the number of ____ linearly independent rows or columns.', marks: 2, topic: 'Matrix Properties' },
  { id: 'q8', type: 'short_answer', difficulty: 'medium', questionText: 'Define what an eigenvalue is in your own words.', marks: 5, topic: 'Eigenvalues' },
  { id: 'q9', type: 'multiple_choice', difficulty: 'medium', questionText: 'What is the result of multiplying a matrix by its inverse?', options: ['Zero Matrix', 'Identity Matrix', 'Transpose Matrix', 'Scalar'], marks: 2, topic: 'Matrix Operations' },
  { id: 'q10', type: 'essay', difficulty: 'hard', questionText: 'Explain the relationship between eigenvectors and eigenvalues. Provide an example of how eigenvalues are used in machine learning applications.', marks: 10, topic: 'Eigenvalues' },
];

interface Answer {
  questionId: string;
  answer: string | number | string[];
}

export default function ExaminationInterface({ params }: { params: { examId: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map());
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(examData.duration * 60);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    if (!examStarted) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: string | number | string[]) => {
    setAnswers(prev => {
      const newAnswers = new Map(prev);
      newAnswers.set(questionId, { questionId, answer });
      return newAnswers;
    });
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(questionId)) newFlagged.delete(questionId);
      else newFlagged.add(questionId);
      return newFlagged;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Exam submitted successfully! Your results will be available after grading.');
    window.location.href = '/portal/student/cbt';
  };

  const getAnsweredCount = () => Array.from(answers.values()).filter(a => a.answer !== '' && a.answer !== undefined).length;
  const getFlaggedCount = () => flaggedQuestions.size;

  const renderQuestionInput = (question: typeof questions[0]) => {
    const currentAnswer = answers.get(question.id);
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, idx) => (
              <label key={idx} className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${currentAnswer?.answer === idx ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                <input type="radio" name={`question-${question.id}`} checked={currentAnswer?.answer === idx} onChange={() => handleAnswer(question.id, idx)} className="w-5 h-5 text-blue-600" />
                <span className="ml-3 text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'true_false':
        return (
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex items-center justify-center p-6 border rounded-lg cursor-pointer ${currentAnswer?.answer === 'true' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
              <input type="radio" name={`question-${question.id}`} checked={currentAnswer?.answer === 'true'} onChange={() => handleAnswer(question.id, 'true')} className="w-5 h-5 text-green-600" />
              <span className="ml-3 text-lg font-medium text-gray-900">True</span>
            </label>
            <label className={`flex items-center justify-center p-6 border rounded-lg cursor-pointer ${currentAnswer?.answer === 'false' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
              <input type="radio" name={`question-${question.id}`} checked={currentAnswer?.answer === 'false'} onChange={() => handleAnswer(question.id, 'false')} className="w-5 h-5 text-red-600" />
              <span className="ml-3 text-lg font-medium text-gray-900">False</span>
            </label>
          </div>
        );
      case 'fill_blank':
      case 'short_answer':
        return <textarea value={(currentAnswer?.answer as string) || ''} onChange={(e) => handleAnswer(question.id, e.target.value)} placeholder="Type your answer here..." rows={question.type === 'fill_blank' ? 2 : 4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" />;
      case 'essay':
        return <textarea value={(currentAnswer?.answer as string) || ''} onChange={(e) => handleAnswer(question.id, e.target.value)} placeholder="Write your detailed answer here..." rows={8} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" />;
      default:
        return null;
    }
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{examData.title}</h1>
          <p className="text-gray-500 mb-8">{examData.courseTitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4"><Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">{examData.duration}</p><p className="text-sm text-gray-500">Minutes</p></div>
            <div className="bg-gray-50 rounded-lg p-4"><BookOpen className="w-6 h-6 text-gray-400 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">{examData.totalQuestions}</p><p className="text-sm text-gray-500">Questions</p></div>
            <div className="bg-gray-50 rounded-lg p-4"><CheckCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">{examData.passingMarks}%</p><p className="text-sm text-gray-500">Pass Mark</p></div>
            <div className="bg-gray-50 rounded-lg p-4"><AlertTriangle className="w-6 h-6 text-gray-400 mx-auto mb-2" /><p className="text-2xl font-bold text-gray-900">1</p><p className="text-sm text-gray-500">Attempts</p></div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-900">Important Instructions</h4>
                <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                  <li>• Do not switch tabs or windows during the exam</li>
                  <li>• Your answers are auto-saved every 30 seconds</li>
                  <li>• The exam will auto-submit when time runs out</li>
                  <li>• You can flag questions to review before submission</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="text-right">
              <p className="text-sm text-gray-500">Candidate</p>
              <p className="font-medium text-gray-900">{examData.studentName}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {examData.studentName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <button onClick={() => setExamStarted(true)} className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold text-lg">
            Start Examination
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">{examData.courseCode}</h1>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{examData.title}</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              {timeRemaining <= 300 && <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />}
              <Clock className={`w-5 h-5 ${timeRemaining <= 300 ? 'text-red-500' : 'text-gray-400'}`} />
              <span className={`text-xl font-bold font-mono ${timeRemaining <= 300 ? 'text-red-500' : 'text-gray-900'}`}>{formatTime(timeRemaining)}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="font-medium">{getAnsweredCount()}/{questions.length}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">Question {currentQuestion + 1} of {questions.length}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${currentQ.type === 'multiple_choice' ? 'bg-purple-100 text-purple-700' : currentQ.type === 'true_false' ? 'bg-green-100 text-green-700' : currentQ.type === 'fill_blank' ? 'bg-orange-100 text-orange-700' : currentQ.type === 'essay' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{currentQ.type.replace('_', ' ').toUpperCase()}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{currentQ.marks} marks</span>
            </div>
            <button onClick={() => toggleFlag(currentQ.id)} className={`flex items-center px-4 py-2 rounded-lg transition-colors ${flaggedQuestions.has(currentQ.id) ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <Flag className={`w-4 h-4 mr-2 ${flaggedQuestions.has(currentQ.id) ? 'fill-yellow-500' : ''}`} />
              {flaggedQuestions.has(currentQ.id) ? 'Flagged' : 'Flag for Review'}
            </button>
          </div>
          <div className="mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">Topic: {currentQ.topic}</span>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 leading-relaxed">{currentQ.questionText}</h2>
          </div>
          <div className="mb-8">{renderQuestionInput(currentQ)}</div>
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))} disabled={currentQuestion === 0} className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-5 h-5 mr-2" /> Previous
            </button>
            <div className="flex items-center space-x-2">
              {questions.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentQuestion(idx)} className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${idx === currentQuestion ? 'bg-blue-600 text-white' : answers.has(questions[idx].id) ? 'bg-green-100 text-green-700 border-2 border-green-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${flaggedQuestions.has(questions[idx].id) ? 'ring-2 ring-yellow-400' : ''}`}>{idx + 1}</button>
              ))}
            </div>
            {currentQuestion === questions.length - 1 ? (
              <button onClick={() => setShowReviewModal(true)} className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Review & Submit <Send className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))} className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Next <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((q, idx) => (
              <button key={q.id} onClick={() => setCurrentQuestion(idx)} className={`aspect-square rounded-lg font-medium text-sm flex items-center justify-center transition-colors ${idx === currentQuestion ? 'bg-blue-600 text-white' : answers.has(q.id) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} ${flaggedQuestions.has(q.id) ? 'ring-2 ring-yellow-400' : ''}`}>{idx + 1}</button>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center"><div className="w-4 h-4 bg-gray-100 rounded mr-2"></div><span>Unanswered</span></div>
            <div className="flex items-center"><div className="w-4 h-4 bg-green-100 border border-green-500 rounded mr-2"></div><span>Answered</span></div>
            <div className="flex items-center"><div className="w-4 h-4 bg-blue-600 rounded mr-2"></div><span>Current</span></div>
            <div className="flex items-center"><div className="w-4 h-4 bg-yellow-100 ring-2 ring-yellow-400 rounded mr-2"></div><span>Flagged</span></div>
          </div>
        </div>
      </div>
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Before Submit</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-blue-600">{getAnsweredCount()}</p><p className="text-sm text-blue-600">Answered</p></div>
              <div className="bg-red-50 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-red-600">{questions.length - getAnsweredCount()}</p><p className="text-sm text-red-600">Unanswered</p></div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-yellow-600">{getFlaggedCount()}</p><p className="text-sm text-yellow-600">Flagged for Review</p></div>
              <div className="bg-gray-50 rounded-lg p-4 text-center"><p className="text-3xl font-bold text-gray-600">{formatTime(timeRemaining)}</p><p className="text-sm text-gray-600">Time Remaining</p></div>
            </div>
            {getFlaggedCount() > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-yellow-900 mb-2">Flagged Questions</h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(flaggedQuestions).map(qId => {
                    const idx = questions.findIndex(q => q.id === qId);
                    return <button key={qId} onClick={() => { setCurrentQuestion(idx); setShowReviewModal(false); }} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Question {idx + 1}</button>;
                  })}
                </div>
              </div>
            )}
            <div className="flex space-x-4">
              <button onClick={() => setShowReviewModal(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Continue Reviewing</button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit Examination'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}