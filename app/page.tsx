"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  BrainCircuit, 
  Globe, 
  TrendingUp, 
  WifiOff, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Target, 
  Shield, 
  QrCode, 
  KeyRound, 
  Zap, 
  Sparkles, 
  X,
  ArrowRight,
  Newspaper,
  Calendar,
  Clock
} from 'lucide-react';
import UpiPaymentScanner, { Plan } from '@/components/UpiPaymentScanner';
import DeveloperBypassModal from '@/components/DeveloperBypassModal';

const PREVIEW_PLANS: Record<string, Plan> = {
  "1m": {
    id: "1m",
    name: "1 Month Pro",
    price: 199,
    duration: "1 Month (30 Days)",
    desc: "1 Month complete access to all school & graduation subjects, 50-category books library, and book/course uploads.",
  },
  "3m": {
    id: "3m",
    name: "3 Months Semester Pass",
    price: 299,
    duration: "3 Months (90 Days)",
    desc: "Most popular: 90 days full platform access, graduation streams, 500 game levels, and unlimited AI tutor.",
  },
  "6m": {
    id: "6m",
    name: "6 Months Master Pro",
    price: 499,
    duration: "6 Months (180 Days)",
    desc: "Best value for competitive exams (NEET, JEE, UPSC) & complete course publishing studio for 180 days.",
  }
};

export default function HomePage() {
  const [isBypassModalOpen, setIsBypassModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [selectedPreviewKey, setSelectedPreviewKey] = useState<string>("3m");

  const openScannerWithPlan = (key: string) => {
    setSelectedPreviewKey(key);
    setIsScannerModalOpen(true);
  };

  const currentPreviewPlan = PREVIEW_PLANS[selectedPreviewKey] || PREVIEW_PLANS["3m"];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 md:px-8 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5f259f] text-white shadow-sm font-bold">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">Astryn</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="#features" className="hover:text-[#5f259f] transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-[#5f259f] transition-colors">Plans &amp; Pricing</Link>
          <Link href="/register" className="text-[#5f259f] font-bold hover:underline transition-colors">Free Trial</Link>
          <Link href="/student/books" className="hover:text-[#5f259f] transition-colors">5000+ Books</Link>
          <Link href="#about" className="hover:text-[#5f259f] transition-colors">About Us</Link>
          <Link href="#contact" className="hover:text-[#5f259f] transition-colors">Contact</Link>
        </nav>

        {/* Action Buttons: 1st Register (Free Trial), 2nd Login, 3rd Dev Bypass */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* 1st: Register First */}
          <Link 
            href="/register" 
            className="rounded-xl bg-[#5f259f] px-3.5 py-2 text-xs md:text-sm font-bold text-white transition-all hover:bg-[#4a1c7c] shadow-sm flex items-center gap-1.5"
          >
            <span>Register (Free Trial)</span>
          </Link>

          {/* 2nd: Login Second */}
          <Link 
            href="/login" 
            className="rounded-xl border border-slate-300 px-3 py-2 text-xs md:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Log In
          </Link>

          {/* 3rd: Master Developer / VIP Bypass */}
          <button
            type="button"
            onClick={() => setIsBypassModalOpen(true)}
            className="rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 hover:bg-amber-500/20 px-2.5 py-2 text-xs font-bold transition-colors flex items-center gap-1"
            title="Master Developer Bypass (Any Device)"
          >
            <Zap size={14} className="fill-amber-500 text-amber-600" />
            <span className="hidden sm:inline">Bypass</span>
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#5f259f] text-xs font-bold mb-6">
              <Sparkles size={14} />
              <span>Classes 1-12 • Graduation (BTech, BSc, BA, BCom) • NEET &amp; UPSC • Digital Library</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-tight">
              Personalized Learning for <span className="text-[#5f259f]">Every Student, Anywhere.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-600">
              Astryn bridges educational gaps with adaptive AI diagnostics, offline capabilities, a 50-subject digital library with AI book finder, course uploads, and multilingual doubt solving.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-[#5f259f] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#4a1c7c] transition-all flex items-center gap-2"
              >
                <span>Start 7-Day Free Trial (1-Click)</span>
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={() => openScannerWithPlan("3m")}
                className="rounded-xl border-2 border-purple-200 bg-purple-50/50 px-5 py-3.5 text-sm font-bold text-[#5f259f] hover:bg-purple-100 transition-colors flex items-center gap-2"
              >
                <QrCode size={18} />
                <span>PhonePe Payment Stand (Live QR)</span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <span className="text-xs uppercase font-extrabold text-[#5f259f] tracking-wider">Comprehensive Features</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-1">
                Built for High Impact Learning
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Everything required for academic success, from primary education to graduation and competitive exams.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <dt className="flex items-center gap-x-3 text-base font-bold text-slate-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#5f259f] text-white">
                      <BookOpen className="h-5 w-5" aria-hidden="true" />
                    </div>
                    50-Subject Digital Library
                  </dt>
                  <dd className="mt-3 flex flex-auto flex-col text-sm text-slate-600 leading-relaxed">
                    <p className="flex-auto">Over 1,000+ books covering Math, Science, English, Hindi, Sanskrit, Novels, Comics, and Thrillers with instant AI internet auto-finder and PDF download.</p>
                  </dd>
                </div>
                <div className="flex flex-col bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <dt className="flex items-center gap-x-3 text-base font-bold text-slate-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#5f259f] text-white">
                      <Newspaper className="h-5 w-5" aria-hidden="true" />
                    </div>
                    24/7 Internet Auto-Update Radar
                  </dt>
                  <dd className="mt-3 flex flex-auto flex-col text-sm text-slate-600 leading-relaxed">
                    <p className="flex-auto">Platform automatically scans the web for revised CBSE/NCERT blueprints, exam updates, study hacks, and trending educational books without developer effort.</p>
                  </dd>
                </div>
                <div className="flex flex-col bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                  <dt className="flex items-center gap-x-3 text-base font-bold text-slate-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#5f259f] text-white">
                      <Globe className="h-5 w-5" aria-hidden="true" />
                    </div>
                    Multilingual AI Doubt Solver
                  </dt>
                  <dd className="mt-3 flex flex-auto flex-col text-sm text-slate-600 leading-relaxed">
                    <p className="flex-auto">Ask questions in English, Hindi, or Hinglish. Our AI tutor provides step-by-step guidance and formulas, not just flat answers.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Pricing & Free Trial Section (Public) */}
        <section id="pricing" className="bg-white py-20 sm:py-28 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <span className="text-xs uppercase font-extrabold text-[#5f259f] tracking-wider">Transparent Subscriptions</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-1">
                Flexible Plans &amp; Official PhonePe Payment
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Start with our 7-Day Free Trial (₹0) or upgrade to Pro via PhonePe QR for ₹199 (1 Month), ₹299 (3 Months), or ₹499 (6 Months).
              </p>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => openScannerWithPlan("3m")}
                  className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 hover:bg-purple-100 text-[#5f259f] font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  <QrCode size={16} />
                  <span>Preview Official PhonePe Payment Stand (Live QR)</span>
                </button>
              </div>
            </div>

            <div className="isolate mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Card 0: 7-Day Free Trial */}
              <div className="rounded-3xl p-6 ring-2 ring-emerald-500 bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-emerald-800">7-Day Free Trial</h3>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Free Access
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">Explore AI features, sample lessons, and diagnostic tests.</p>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">₹0</span>
                    <span className="text-xs text-slate-500 ml-1">/ 7 days</span>
                  </div>

                  <Link 
                    href="/register" 
                    className="mt-5 block w-full rounded-xl bg-emerald-600 px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-emerald-500 shadow-sm transition-colors"
                  >
                    Start Free Trial (1-Click)
                  </Link>

                  <ul className="mt-6 space-y-2 text-xs text-slate-600">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Classes 1-12 basic lessons</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Daily practice quizzes</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Game center levels 1-20</li>
                  </ul>
                </div>
              </div>

              {/* Card 1: 1 Month */}
              <div className="rounded-3xl p-6 ring-1 ring-slate-200 bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
                <div>
                  <h3 className="text-base font-bold text-slate-900">1 Month Pro</h3>
                  <p className="mt-2 text-xs text-slate-600">Complete access for 1 full month (30 days).</p>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">₹199</span>
                    <span className="text-xs text-slate-500 ml-1">/ 30 days</span>
                  </div>

                  <button 
                    type="button"
                    onClick={() => openScannerWithPlan("1m")}
                    className="mt-5 block w-full rounded-xl bg-slate-900 px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition-colors"
                  >
                    Pay with PhonePe
                  </button>

                  <ul className="mt-6 space-y-2 text-xs text-slate-600">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Full 50-Subject Books Library</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Upload Books &amp; Courses</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> 24/7 Multilingual AI Tutor</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Game center levels 1-100</li>
                  </ul>
                </div>
              </div>

              {/* Card 2: 3 Months (Most Popular) */}
              <div className="rounded-3xl p-6 ring-2 ring-[#5f259f] bg-white shadow-xl flex flex-col justify-between relative scale-100 lg:scale-105 z-10">
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-[#5f259f] to-purple-800 text-white font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#5f259f]">3 Months Semester</h3>
                  <p className="mt-2 text-xs text-slate-600">Complete semester preparation &amp; graduation courses.</p>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">₹299</span>
                    <span className="text-xs text-slate-500 ml-1">for 90 days</span>
                  </div>

                  <button 
                    type="button"
                    onClick={() => openScannerWithPlan("3m")}
                    className="mt-5 block w-full rounded-xl bg-[#5f259f] px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-[#4a1c7c] shadow-md transition-colors"
                  >
                    Pay with PhonePe
                  </button>

                  <ul className="mt-6 space-y-2 text-xs text-slate-600">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Everything in 1 Month Plan</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> All Graduation Streams (BA, BSc, BCom, BTech)</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Unlimited Book &amp; Course Upload</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Offline study sync &amp; doubt solver</li>
                  </ul>
                </div>
              </div>

              {/* Card 3: 6 Months */}
              <div className="rounded-3xl p-6 ring-1 ring-slate-200 bg-white shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
                <div>
                  <h3 className="text-base font-bold text-slate-900">6 Months Master Pro</h3>
                  <p className="mt-2 text-xs text-slate-600">Full competitive exams (NEET, JEE, UPSC, SSC).</p>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-slate-900">₹499</span>
                    <span className="text-xs text-slate-500 ml-1">for 180 days</span>
                  </div>

                  <button 
                    type="button"
                    onClick={() => openScannerWithPlan("6m")}
                    className="mt-5 block w-full rounded-xl bg-slate-900 px-3 py-2.5 text-center text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition-colors"
                  >
                    Pay with PhonePe
                  </button>

                  <ul className="mt-6 space-y-2 text-xs text-slate-600">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> 3,000 - 5,000+ Question Bank</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Complete 1 to 500 Game Levels</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Full Digital Books &amp; PDF Notes</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#5f259f] shrink-0" /> Educator Course Publishing Studio</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-slate-50 py-20 sm:py-28 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase font-extrabold text-[#5f259f] tracking-wider">About Astryn</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Empowering Learners Across India
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Astryn is dedicated to leveling the educational playing field. Whether a student is in a metropolitan classroom or a rural community with intermittent connectivity, our platform adapts to their pace, curriculum, and language.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <span className="text-2xl font-black text-[#5f259f]">50+</span>
                    <p className="text-xs text-slate-600 mt-1">Book &amp; Subject Domains</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <span className="text-2xl font-black text-emerald-600">100%</span>
                    <p className="text-xs text-slate-600 mt-1">Safe Official PhonePe Payments</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg">Our Core Pillars</h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-50 text-[#5f259f] shrink-0">
                      <Target size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Targeted Concept Remediation</h4>
                      <p className="mt-0.5">We don&apos;t just test; we pinpoint the exact misconception and guide students back to mastery.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-50 text-[#5f259f] shrink-0">
                      <Users size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Student &amp; Teacher Collaboration</h4>
                      <p className="mt-0.5">Both students and teachers can upload study material, notes, and courses to build a rich open library.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="bg-white py-20 sm:py-28 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <span className="text-xs uppercase font-extrabold text-[#5f259f] tracking-wider">Get in Touch</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mt-1">
                Contact Astryn Team
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Have questions regarding institutional partnerships, subscriptions, or developer support? Reach out anytime.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-xl bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#5f259f] shrink-0" />
                  <div className="flex flex-wrap items-center gap-2">
                    <a href="mailto:support@astryn.org" className="hover:text-[#5f259f] hover:underline font-bold transition-colors">
                      support@astryn.org
                    </a>
                    <span className="text-slate-400">•</span>
                    <a href="mailto:helpdesk@astryn.com" className="hover:text-[#5f259f] hover:underline text-slate-600 transition-colors">
                      helpdesk@astryn.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#5f259f]" />
                  <span>PhonePe Merchant Helpline: Available 24/7 for UTR confirmations</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#5f259f]" />
                  <span>India • Accessible on Web, Tablet &amp; Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center space-x-6 md:order-2 text-xs">
              <Link href="#pricing" className="text-slate-500 hover:text-[#5f259f]">Subscriptions</Link>
              <Link href="/register" className="text-slate-500 hover:text-[#5f259f]">Free Trial</Link>
              <Link href="/student/books" className="text-slate-500 hover:text-[#5f259f]">Books Library</Link>
            </div>
            <div className="mt-6 md:order-1 md:mt-0 flex flex-col md:flex-row items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5f259f] text-white">
                  <BookOpen size={14} />
                </div>
                <span className="text-sm font-bold text-slate-900">Astryn</span>
              </div>
              <p className="text-xs text-slate-500">
                &copy; {new Date().getFullYear()} Astryn Learning Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Master Developer Bypass Modal */}
      <DeveloperBypassModal 
        isOpen={isBypassModalOpen} 
        onClose={() => setIsBypassModalOpen(false)} 
      />

      {/* Public PhonePe Payment Scanner Preview Modal */}
      {isScannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-2 md:p-6 my-auto">
            <div className="flex justify-between items-center mb-4 px-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5f259f] flex items-center justify-center font-black text-lg">
                  पे
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Astryn Official PhonePe Payment Stand</h3>
                  <p className="text-xs text-slate-500">Select any of the 3 official plans to view the QR code</p>
                </div>
              </div>
              <button 
                onClick={() => setIsScannerModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Plan switcher inside modal */}
            <div className="flex flex-wrap gap-2 px-4 mb-4">
              {Object.keys(PREVIEW_PLANS).map((k) => {
                const p = PREVIEW_PLANS[k];
                const active = selectedPreviewKey === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSelectedPreviewKey(k)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? "bg-[#5f259f] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {p.name} (₹{p.price})
                  </button>
                );
              })}
            </div>

            <UpiPaymentScanner plan={currentPreviewPlan} />
          </div>
        </div>
      )}
    </div>
  );
}
