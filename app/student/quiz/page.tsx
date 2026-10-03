"use client";

import { useState } from "react";
import { BrainCircuit, Loader2, CheckCircle2, XCircle, ArrowRight, Play } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LockedFeature from "@/components/LockedFeature";
import FeedbackWidget from "@/components/FeedbackWidget";
import EducationalVideoPlayerModal from "@/components/EducationalVideoPlayerModal";
import { EducationalVideo, getVideosForCategory } from "@/lib/video-recommendations";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export default function AIQuizGenerator() {
  const { user } = useAuth();
  const [step, setStep] = useState<'setup' | 'loading' | 'quiz' | 'results'>('setup');
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [selectedVideo, setSelectedVideo] = useState<EducationalVideo | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const [error, setError] = useState("");

  if (user && !user.hasPaid) {
    return <LockedFeature featureName="AI Quiz Generator" />;
  }

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    
    setStep('loading');
    setError("");
    
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, questionCount: 5 }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setQuestions(data.questions);
      setStep('quiz');
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz.");
      setStep('setup');
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    // Evaluate current answer
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };

  const handleProceedToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setStep('results');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {step === 'setup' && (
        <div className="rounded-2xl border bg-white p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <BrainCircuit size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Infinite AI Quizzes</h1>
              <p className="text-sm text-slate-500">Generate a custom quiz on any topic instantly using Gemini AI.</p>
            </div>
          </div>

          <form onSubmit={handleGenerateQuiz} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 text-rose-800 rounded-lg text-sm">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">
                What do you want to learn today?
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Photosynthesis, Algebra, World War II..."
                className="block w-full rounded-md border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="block w-full rounded-md border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600"
              >
                <option value="Beginner">Beginner (10th Grade)</option>
                <option value="Intermediate">Intermediate (12th Grade)</option>
                <option value="Advanced">Advanced (College)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              <BrainCircuit size={18} />
              Generate Magic Quiz
            </button>
          </form>
        </div>
      )}

      {step === 'loading' && (
        <div className="rounded-2xl border bg-white p-16 shadow-sm flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <h2 className="text-xl font-bold text-slate-900">Crafting your custom quiz...</h2>
          <p className="text-slate-500">Astryn AI is generating questions about &quot;{topic}&quot;.</p>
        </div>
      )}

      {step === 'quiz' && questions.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 md:p-10 shadow-sm">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <span className="text-sm font-semibold text-slate-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">{topic}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {questions[currentQuestionIndex].question}
          </h2>

          <div className="space-y-3 mb-8">
            {questions[currentQuestionIndex].options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
              
              if (showExplanation) {
                if (idx === questions[currentQuestionIndex].correctIndex) {
                  btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                } else if (isSelected) {
                  btnClass += "border-rose-500 bg-rose-50 text-rose-900";
                } else {
                  btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-50";
                }
              } else {
                if (isSelected) {
                  btnClass += "border-indigo-600 bg-indigo-50 text-indigo-900";
                } else {
                  btnClass += "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleAnswerSelect(idx)}
                  className={btnClass}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{option}</span>
                    {showExplanation && idx === questions[currentQuestionIndex].correctIndex && <CheckCircle2 className="text-emerald-500" size={20} />}
                    {showExplanation && isSelected && idx !== questions[currentQuestionIndex].correctIndex && <XCircle className="text-rose-500" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="rounded-2xl bg-slate-50 p-5 mb-8 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">AI Explanation</h3>
                <button
                  type="button"
                  onClick={() => {
                    const vids = getVideosForCategory(topic);
                    if (vids.length > 0) {
                      setSelectedVideo(vids[0]);
                      setIsVideoModalOpen(true);
                    }
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play size={12} className="fill-red-600 text-red-600" />
                  <span>Watch Video Lecture</span>
                </button>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{questions[currentQuestionIndex].explanation}</p>
            </div>
          )}

          <div className="flex justify-end">
            {!showExplanation ? (
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleProceedToNextQuestion}
                className="flex items-center gap-2 rounded-lg bg-indigo-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'results' && (
        <div className="rounded-2xl border bg-white p-10 shadow-sm text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
          <p className="text-lg text-slate-600 mb-6">You scored <span className="font-bold text-indigo-600">{score}</span> out of {questions.length} on {topic}.</p>
          
          {/* Connected YouTube Video Recommendation Box */}
          <div className="max-w-md mx-auto mb-8 bg-gradient-to-r from-red-50 to-slate-50 border border-red-200/80 rounded-2xl p-4 text-left flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Play size={16} className="fill-white translate-x-0.5" />
              </span>
              <div>
                <span className="text-[10px] font-black uppercase text-red-600 block">Master this Concept</span>
                <span className="text-xs font-bold text-slate-900 block truncate">YouTube Video Lectures on {topic}</span>
                <span className="text-[11px] text-slate-500">Verified educational walkthroughs &amp; notes</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const vids = getVideosForCategory(topic);
                if (vids.length > 0) {
                  setSelectedVideo(vids[0]);
                  setIsVideoModalOpen(true);
                }
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
            >
              <Play size={12} className="fill-white" />
              <span>Watch</span>
            </button>
          </div>

          <button
            onClick={() => setStep('setup')}
            className="inline-flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Generate Another Quiz
          </button>
          
          <div className="mt-10 pt-8 border-t border-slate-100">
            <FeedbackWidget context="Quiz Quality" />
          </div>
        </div>
      )}

      {/* Embedded Educational Video Player Modal */}
      <EducationalVideoPlayerModal
        video={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setSelectedVideo(null);
        }}
      />
    </div>
  );
}
