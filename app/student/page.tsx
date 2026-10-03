"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  BookOpen, 
  AlertCircle, 
  PlayCircle, 
  Lock, 
  Book, 
  FileQuestion, 
  ChevronRight, 
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import Link from 'next/link';
import { STUDENT_CURRICULUM } from '@/lib/student-curriculum-data';
import { motion, AnimatePresence } from 'motion/react';
import AutoLearningFeed from '@/components/AutoLearningFeed';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  // Default to School, Class 10
  const [activeCategory, setActiveCategory] = useState(STUDENT_CURRICULUM[0].id);
  const [activeSection, setActiveSection] = useState(STUDENT_CURRICULUM[0].sections[9].id);

  const currentCategory = STUDENT_CURRICULUM.find(c => c.id === activeCategory) || STUDENT_CURRICULUM[0];
  const currentSection = currentCategory.sections.find(s => s.id === activeSection) || currentCategory.sections[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const category = STUDENT_CURRICULUM.find(c => c.id === catId);
    if (category) {
      setActiveSection(category.sections[0].id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Welcome & Validity Status Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Welcome, {user?.name?.split(' ')[0] || 'Student'}!</h1>
            {user?.hasPaid && (
              <span className="inline-flex items-center gap-1 bg-purple-50 text-[#5f259f] border border-purple-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                <ShieldCheck size={14} />
                <span>{user.subscriptionPlan || "Pro Active"}</span>
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">Pick up where you left off, explore new books, or create your own courses.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user?.hasPaid && user?.subscriptionExpiresAt && (
            <div className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 font-medium">
              <Calendar size={14} className="text-[#5f259f]" />
              <span>Valid till: <b>{new Date(user.subscriptionExpiresAt).toLocaleDateString()}</b> ({user.daysRemaining || 30} days left)</span>
            </div>
          )}

          <Link 
            href="/student/upgrade" 
            className="bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <RefreshCw size={14} />
            <span>{user?.hasPaid ? "Extend Validity (तारीख बढ़ाएं)" : "Upgrade to Pro"}</span>
          </Link>

          <Link 
            href="/student/books" 
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <BookOpen size={15} />
            <span>Digital Library (1,000+ Books)</span>
          </Link>
        </div>
      </div>

      {/* Featured Digital Library Highlight */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
              50 Categories Library &amp; AI Auto-Finder
            </span>
            <span className="text-xs text-purple-200">
              Students &amp; Teachers can upload books
            </span>
          </div>
          <h3 className="text-xl font-black">
            Digital Library: Math, Physics, Chemistry, English, Hindi, Sanskrit, Novels, Comics &amp; Thrillers
          </h3>
          <p className="text-xs text-purple-200 leading-relaxed">
            Search any book from the internet — AI will automatically locate, format, and generate downloadable PDFs, or upload your own notes and chapters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/student/books"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
          >
            <BookOpen size={15} />
            <span>Open Library &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Auto-Updated Internet Feed Component */}
      <AutoLearningFeed />

      {user && !user.hasPaid && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-4 items-start shadow-xs">
          <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={22} />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-amber-900">7-Day Free Trial Active</h3>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Your free trial gives you access to basic lessons and limited previews. To unlock unlimited AI doubt solving, full 50-subject books, and course publishing, upgrade via PhonePe.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <Link 
                href="/student/upgrade" 
                className="bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
              >
                Upgrade to Pro (₹199 / ₹299 / ₹499) &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Navigator */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Top Level Categories */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50 p-2 gap-2">
          {STUDENT_CURRICULUM.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-[#5f259f] text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? "text-purple-100" : "text-slate-400"} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Sub Sections (Classes / Semesters) */}
        <div className="flex overflow-x-auto border-b border-slate-100 p-2 gap-2 bg-white scrollbar-thin">
          {currentCategory.sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-purple-100 text-[#5f259f]' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {sec.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${activeSection}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-100 pb-4 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{currentSection.name}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Explore subjects, test banks, and interactive course material.</p>
                </div>
                <Link 
                  href={`/student/quiz`}
                  className="bg-purple-50 text-[#5f259f] hover:bg-purple-100 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <FileQuestion size={14} />
                  <span>Start Practice Test</span>
                </Link>
              </div>

              {/* Grid of Subjects */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Subjects Column */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen size={18} className="text-[#5f259f]" />
                    <span>Subjects &amp; Modules</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentSection.subjects.map((sub: any, idx: number) => {
                      const chapters: string[] = Array.isArray(sub.chapters) && sub.chapters.length > 0
                        ? sub.chapters
                        : [
                            `${sub.name} Foundations & Concepts`,
                            'Key Principles & Derivations',
                            'Solved Examples & Practice Sets',
                            'Board & Exam Revision Notes'
                          ];
                      const lessonsCount = sub.lessonsCount || Math.round(10 + ((sub.progress || 50) % 15));

                      return (
                        <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 hover:border-purple-300 hover:bg-purple-50/20 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-slate-900 text-sm">{sub.name}</h4>
                              <span className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-medium">
                                {lessonsCount} Lessons
                              </span>
                            </div>
                            
                            <div className="space-y-1 mb-4">
                              {chapters.slice(0, 3).map((chap: string, cIdx: number) => (
                                <div key={cIdx} className="text-xs text-slate-500 flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                                  <span className="truncate">{chap}</span>
                                </div>
                              ))}
                              {chapters.length > 3 && (
                                <div className="text-[11px] text-purple-600 font-medium">
                                  +{chapters.length - 3} more chapters
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Link 
                            href={`/student/lesson?topic=${encodeURIComponent(sub.name)}`} 
                            className="text-xs font-bold text-[#5f259f] hover:text-[#4a1c7c] flex items-center justify-between pt-2 border-t border-slate-200/60 group"
                          >
                            <span>Start Lesson</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Books & Feedback */}
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Book size={16} className="text-[#5f259f]" />
                      <span>Recommended Books</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {(currentSection.books || []).map((book, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="mt-0.5 w-5 h-5 rounded bg-purple-50 text-[#5f259f] flex items-center justify-center shrink-0">
                            <BookOpen size={12} />
                          </div>
                          <span className="text-xs text-slate-700 font-medium leading-tight">{book}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <Link 
                        href="/student/books"
                        className="text-xs font-bold text-[#5f259f] hover:underline flex items-center gap-1"
                      >
                        <span>Browse 50-Category Library &rarr;</span>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-2xl border border-purple-100 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1.5">
                      <MessageSquare size={16} className="text-[#5f259f]" />
                      <span>Course Feedback</span>
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      Have you completed {currentSection.name}? Share suggestions to help improve questions &amp; explanations.
                    </p>
                    <button className="w-full bg-white border border-purple-200 text-[#5f259f] py-2 rounded-xl font-bold text-xs hover:bg-purple-50 transition-colors">
                      Submit Course Feedback
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
