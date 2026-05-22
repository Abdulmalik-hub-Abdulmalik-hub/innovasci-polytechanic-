"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, AlertTriangle, ChevronLeft, ChevronRight, Flag, CheckCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const mockQuestions = [
  { id: "1", question: "What is the time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 2, marks: 5 },
  { id: "2", question: "Which data structure uses LIFO principle?", options: ["Queue", "Stack", "Linked List", "Tree"], correctAnswer: 1, marks: 5 },
  { id: "3", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Makeup Language"], correctAnswer: 0, marks: 5 },
  { id: "4", question: "Which of the following is NOT a valid CSS selector?", options: [".class", "#id", "@media", "$variable"], correctAnswer: 3, marks: 5 },
  { id: "5", question: "What is the purpose of the 'useEffect' hook in React?", options: ["To manage state", "To handle side effects", "To create components", "To style components"], correctAnswer: 1, marks: 5 },
  { id: "6", question: "Which protocol does HTTPS use?", options: ["HTTP", "SSL/TLS", "FTP", "SMTP"], correctAnswer: 1, marks: 5 },
  { id: "7", question: "What is a foreign key in database?", options: ["A key that encrypts data", "A key that links two tables", "A primary key duplicate", "An index key"], correctAnswer: 1, marks: 5 },
  { id: "8", question: "Which sorting algorithm has the best average case time complexity?", options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], correctAnswer: 2, marks: 5 },
  { id: "9", question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Protocol Interface", "Application Process Integration"], correctAnswer: 0, marks: 5 },
  { id: "10", question: "Which of these is a valid way to declare a variable in JavaScript?", options: ["var myVar", "let myVar", "const myVar", "All of the above"], correctAnswer: 3, marks: 5 },
]

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600)
  const [showReview, setShowReview] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isSubmitted) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) { clearInterval(timer); handleSubmit(); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isSubmitted])

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
  const handleAnswer = (questionId: string, answer: number) => setAnswers(prev => ({ ...prev, [questionId]: answer }))
  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => { const newSet = new Set(prev); newSet.has(questionId) ? newSet.delete(questionId) : newSet.add(questionId); return newSet })
  }
  const handleSubmit = () => setIsSubmitted(true)

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Exam Submitted!</h1>
          <p className="text-xl text-muted-foreground mb-8">Your answers have been recorded. Results will be available after grading.</p>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card><CardContent className="p-6 text-center"><p className="text-3xl font-bold text-blue-600">{mockQuestions.length}</p><p className="text-sm text-muted-foreground">Total</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><p className="text-3xl font-bold text-green-600">{Object.keys(answers).length}</p><p className="text-sm text-muted-foreground">Answered</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><p className="text-3xl font-bold text-purple-600">{mockQuestions.length - Object.keys(answers).length}</p><p className="text-sm text-muted-foreground">Skipped</p></CardContent></Card>
          </div>
          <Button onClick={() => window.location.href = '/dashboard'} size="lg">Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  const question = mockQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="fixed top-0 left-0 right-0 bg-slate-800 border-b border-slate-700 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">Data Structures & Algorithms - Mid Semester</h1>
          <Badge variant="warning" className="hidden md:flex"><AlertTriangle className="h-3 w-3 mr-1" />Proctored</Badge>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2"><Clock className={cn("h-5 w-5", timeLeft < 300 && "text-red-500 animate-pulse")} /><span className={cn("font-mono text-lg", timeLeft < 300 && "text-red-500")}>{formatTime(timeLeft)}</span></div>
          <Button variant="outline" size="sm" onClick={() => setShowReview(!showReview)}><Eye className="h-4 w-4 mr-2" />Review</Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">Submit Exam</Button>
        </div>
      </div>

      <div className="pt-20 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
        {showReview ? (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader><CardTitle>Question Navigator</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {mockQuestions.map((q, index) => (
                  <button key={q.id} onClick={() => { setCurrentQuestion(index); setShowReview(false) }} className={cn("aspect-square rounded-lg font-medium flex items-center justify-center transition-all", index === currentQuestion ? "ring-2 ring-white" : "", answers[q.id] !== undefined ? flaggedQuestions.has(q.id) ? "bg-green-500 text-white" : "bg-blue-600 text-white" : flaggedQuestions.has(q.id) ? "bg-amber-500 text-white" : "bg-slate-700 hover:bg-slate-600")}>{index + 1}</button>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-600" /><span>Answered</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-500" /><span>Flagged</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-700" /><span>Unanswered</span></div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-600 text-white border-0">Question {currentQuestion + 1} of {mockQuestions.length}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => toggleFlag(question.id)} className={flaggedQuestions.has(question.id) ? "text-amber-400" : "text-slate-400"}><Flag className={cn("h-4 w-4", flaggedQuestions.has(question.id) && "fill-current")} /></Button>
                </div>
                <CardTitle className="text-xl text-white">{question.question}</CardTitle>
                <p className="text-sm text-slate-400">{question.marks} marks</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {question.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(question.id, index)} className={cn("w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4", answers[question.id] === index ? "border-blue-500 bg-blue-500/20 text-white" : "border-slate-600 bg-slate-700/50 hover:border-slate-500 text-slate-300")}>
                    <div className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium", answers[question.id] === index ? "border-blue-500 bg-blue-500 text-white" : "border-slate-500")}>{String.fromCharCode(65 + index)}</div>
                    <span>{option}</span>
                    {answers[question.id] === index && <CheckCircle className="ml-auto h-5 w-5 text-blue-400" />}
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="border-slate-600 text-slate-300"><ChevronLeft className="h-4 w-4 mr-2" />Previous</Button>
          <div className="flex items-center gap-2">
            {mockQuestions.slice(Math.max(0, currentQuestion - 2), currentQuestion + 3).map((q, index) => (
              <button key={q.id} onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 2) + index)} className={cn("w-8 h-8 rounded-full text-sm font-medium transition-all", Math.max(0, currentQuestion - 2) + index === currentQuestion ? "bg-blue-500 text-white" : answers[q.id] !== undefined ? "bg-green-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600")}>{Math.max(0, currentQuestion - 2) + index + 1}</button>
            ))}
          </div>
          <Button variant="outline" onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))} disabled={currentQuestion === mockQuestions.length - 1} className="border-slate-600 text-slate-300">Next<ChevronRight className="h-4 w-4 ml-2" /></Button>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-4"><Progress value={(Object.keys(answers).length / mockQuestions.length) * 100} className="h-1" /></div>
      </div>
    </div>
  )
}