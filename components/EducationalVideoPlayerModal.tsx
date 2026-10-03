"use client";

import React, { useState } from "react";
import { 
  X, 
  Play, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Award, 
  Clock, 
  Eye, 
  Globe, 
  Check, 
  RotateCcw,
  ExternalLink,
  Share2
} from "lucide-react";
import { EducationalVideo } from "@/lib/video-recommendations";
import ShareVideoModal from "@/components/ShareVideoModal";

interface EducationalVideoPlayerModalProps {
  video: EducationalVideo | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBook?: (bookTitle: string) => void;
}

export default function EducationalVideoPlayerModal({
  video,
  isOpen,
  onClose,
  onOpenBook
}: EducationalVideoPlayerModalProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "quiz">("notes");
  const [isShareOpen, setIsShareOpen] = useState(false);

  if (!isOpen || !video) return null;

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optIndex
    }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowQuizResults(false);
  };

  const mcqs = video.mcqs || [];
  const correctCount = mcqs.reduce((acc, mcq, idx) => {
    return acc + (selectedAnswers[idx] === mcq.correctIndex ? 1 : 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl w-full max-w-4xl max-h-[94vh] shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-red-600/90 text-white flex items-center justify-center shadow-xs">
              <Play size={16} className="fill-white translate-x-0.5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  YouTube Educational Lecture
                </span>
                <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                  • {video.category}
                </span>
              </div>
              <h3 className="font-extrabold text-sm md:text-base text-slate-100 line-clamp-1">
                {video.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Share this video lecture"
            >
              <Share2 size={13} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto space-y-5 p-4 md:p-6">
          
          {/* 16:9 YouTube Video Embed Player */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Video Metadata Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  {video.channel}
                  <CheckCircle2 size={15} className="text-blue-400 fill-blue-400/20" />
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                  <Eye size={13} className="text-slate-400" />
                  {video.views}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                  <Clock size={13} className="text-slate-400" />
                  {video.duration}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="inline-flex items-center gap-1 text-amber-300 font-black bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <Star size={12} className="fill-amber-300 text-amber-300" />
                  {video.rating} Lecture Rating
                </span>
                <span className="inline-flex items-center gap-1 text-indigo-300 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  <Globe size={12} />
                  {video.language}
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {video.difficulty} Level
                </span>
              </div>
            </div>

            {/* Direct Link to YouTube in new tab */}
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-300 hover:text-white bg-slate-700/70 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Watch on YouTube</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Navigation Tabs: Concept Notes vs Interactive MCQ Quiz */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "notes"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Sparkles size={14} />
              <span>Concept Notes &amp; Connected Books</span>
            </button>

            {mcqs.length > 0 && (
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "quiz"
                    ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                <HelpCircle size={14} />
                <span>Test Video Understanding ({mcqs.length} MCQs)</span>
              </button>
            )}
          </div>

          {/* Tab 1: Concept Notes & Connected Books */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/60 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>Educational Summary</span>
                </h4>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {video.summary}
                </p>
              </div>

              {/* Key Concept Bullets */}
              {video.keyConcepts && video.keyConcepts.length > 0 && (
                <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/60 space-y-2.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Award size={14} className="text-amber-400" />
                    <span>Key Takeaways &amp; Exam Highlights</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {video.keyConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Connected Books in Library */}
              {video.connectedBookTitles && video.connectedBookTitles.length > 0 && (
                <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-indigo-400" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-indigo-200">
                        Connected Textbooks in Astryn Library
                      </h4>
                    </div>
                    <span className="text-[10px] text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded">
                      Sync Reading
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {video.connectedBookTitles.map((bookTitle, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <span className="text-xs font-bold text-slate-200 line-clamp-1">
                          {bookTitle}
                        </span>
                        {onOpenBook && (
                          <button
                            type="button"
                            onClick={() => onOpenBook(bookTitle)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                          >
                            Read Book
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Interactive Video Quiz MCQs */}
          {activeTab === "quiz" && mcqs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-800/50 p-3 px-4 rounded-xl border border-slate-700 text-xs">
                <span className="text-slate-300 font-semibold">
                  Test what you learned from this video lecture:
                </span>
                {showQuizResults ? (
                  <button
                    onClick={resetQuiz}
                    className="text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Try Again</span>
                  </button>
                ) : (
                  <button
                    disabled={Object.keys(selectedAnswers).length === 0}
                    onClick={() => setShowQuizResults(true)}
                    className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black px-3.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Check Answers
                  </button>
                )}
              </div>

              {showQuizResults && (
                <div className="bg-emerald-950/60 border border-emerald-600/50 p-3.5 rounded-2xl flex items-center justify-between text-xs text-emerald-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span>
                      Score: <strong className="text-white text-sm">{correctCount} / {mcqs.length}</strong> correct!
                    </span>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                    {correctCount === mcqs.length ? "Mastery Achieved!" : "Keep Reviewing Video"}
                  </span>
                </div>
              )}

              {/* MCQs List */}
              <div className="space-y-4">
                {mcqs.map((mcq, qIdx) => {
                  const selected = selectedAnswers[qIdx];
                  const isAnswered = selected !== undefined;
                  const isCorrect = selected === mcq.correctIndex;

                  return (
                    <div
                      key={qIdx}
                      className="bg-slate-800/40 border border-slate-700/70 rounded-2xl p-4 space-y-3"
                    >
                      <p className="text-xs md:text-sm font-extrabold text-white">
                        <span className="text-indigo-400 mr-1.5">Q{qIdx + 1}.</span>
                        {mcq.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mcq.options.map((opt, optIdx) => {
                          const isOptSelected = selected === optIdx;
                          let optStyle = "bg-slate-800 border-slate-700 hover:border-indigo-400 text-slate-200";

                          if (showQuizResults) {
                            if (optIdx === mcq.correctIndex) {
                              optStyle = "bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold";
                            } else if (isOptSelected && !isCorrect) {
                              optStyle = "bg-rose-900/60 border-rose-500 text-rose-200";
                            }
                          } else if (isOptSelected) {
                            optStyle = "bg-indigo-600 border-indigo-500 text-white font-bold";
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => !showQuizResults && handleSelectOption(qIdx, optIdx)}
                              className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {showQuizResults && optIdx === mcq.correctIndex && (
                                <Check size={14} className="text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {showQuizResults && (
                        <div className="bg-slate-900/70 p-2.5 rounded-xl text-[11px] text-slate-300 border border-slate-800 mt-2">
                          <strong className="text-indigo-300">Explanation: </strong>
                          {mcq.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>YouTube Educational Video Integration • Astryn Learning Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer transition-colors"
          >
            Close Video
          </button>
        </div>
      </div>

      {/* Share Video Modal inside Player */}
      <ShareVideoModal
        video={video}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </div>
  );
}
