"use client";

import Link from 'next/link';
import { 
  BookOpen, 
  User, 
  Home, 
  Book, 
  MessageCircle, 
  BarChart, 
  Settings, 
  Wifi, 
  LogOut, 
  CheckCircle2, 
  Gamepad2, 
  Sparkles,
  Library,
  BookMarked,
  RefreshCw,
  QrCode,
  Play
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  const userName = user?.name || "Student";
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white flex flex-col hidden md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5f259f] text-white">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900">Astryn</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col justify-between">
          <nav className="space-y-1 px-4">
            <Link href="/student" className="flex items-center gap-3 rounded-lg bg-purple-50 px-3 py-2 text-[#5f259f] font-medium">
              <Home size={20} />
              Dashboard
            </Link>

            <Link href="/student/books" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 hover:bg-purple-50 hover:text-[#5f259f] font-bold transition-colors">
              <BookMarked size={20} className="text-[#5f259f]" />
              Books &amp; Library
            </Link>

            <Link href="/student/videos" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-700 hover:bg-red-50 hover:text-red-700 font-bold transition-colors">
              <Play size={18} className="text-red-600 fill-red-600" />
              <span>Video Lectures</span>
            </Link>

            <Link href="/student/coding" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <Book size={20} />
              Coding Lab (Pro)
            </Link>

            <Link href="/student/quiz" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <CheckCircle2 size={20} />
              AI Quiz Generator
            </Link>

            <Link href="/student/tutor" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <MessageCircle size={20} />
              AI Tutor
            </Link>

            <Link href="/student/games" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <Gamepad2 size={20} />
              Game Center (500 Lvl)
            </Link>

            <Link href="/student/upgrade" className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#5f259f] bg-purple-50/70 hover:bg-purple-100 font-bold transition-colors">
              <Sparkles size={20} className="text-amber-500 fill-amber-400" />
              <span>Upgrade &amp; PhonePe</span>
            </Link>

            <Link href="/student/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <Settings size={20} />
              Settings
            </Link>
          </nav>

          <div className="px-4 mt-8">
             <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-rose-600 hover:bg-rose-50 font-medium transition-colors">
              <LogOut size={20} />
              Log Out
             </button>
          </div>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-[#5f259f]">
              <User size={20} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-xs text-slate-500 truncate">{user?.email || "student@astryn.app"}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-end">
          <div className="flex items-center gap-4">
             {user?.hasPaid ? (
               <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-[#5f259f] ring-1 ring-inset ring-purple-600/20">
                   <Sparkles size={12} className="text-amber-500" /> 
                   <span>{user.subscriptionPlan || "PRO Plan Active"}</span>
                 </div>
                 <Link 
                   href="/student/upgrade" 
                   className="text-xs font-bold text-slate-500 hover:text-[#5f259f] underline flex items-center gap-1"
                   title="Extend subscription validity"
                 >
                   <RefreshCw size={12} />
                   <span>Extend Date</span>
                 </Link>
               </div>
             ) : (
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                   Free Trial
                 </div>
                 <Link href="/student/upgrade" className="text-xs font-bold text-[#5f259f] hover:underline flex items-center gap-1">
                   <QrCode size={13} />
                   <span>Upgrade (PhonePe)</span>
                 </Link>
               </div>
             )}
             <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
               <Wifi size={14} />
               Online
             </div>
             <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
               🔥 14 Day Streak
             </div>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
