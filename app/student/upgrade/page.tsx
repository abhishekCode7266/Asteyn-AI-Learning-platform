"use client";

import { useState } from "react";
import { Check, Sparkles, Shield, ArrowLeft, Calendar, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import UpiPaymentScanner, { Plan } from "@/components/UpiPaymentScanner";

const PLANS: Plan[] = [
  { 
    id: "1m", 
    name: "1 Month Pro", 
    price: 199, 
    duration: "1 Month (30 Days)", 
    desc: "1 Month complete platform access for students & teachers with book and course uploads.",
    features: [
      "Access to all 1st to 12th subjects & syllabus",
      "Full 50-Subject Digital Books Library",
      "Multilingual AI Tutor 24/7",
      "Upload Books & Create Courses",
      "Game Center Levels 1-100"
    ]
  },
  { 
    id: "3m", 
    name: "3 Months Semester Pass", 
    price: 299, 
    duration: "3 Months (90 Days)", 
    desc: "Most popular choice for semester exams and continuous learning.",
    features: [
      "Everything in 1 Month Plan",
      "90 Days extended platform validity",
      "Graduation Streams (BA, BSc, BCom, BTech)",
      "Upload Unlimited Study Material & Books",
      "Game Center Levels 1-300",
      "Offline Study Mode & Doubt Solver"
    ]
  },
  { 
    id: "6m", 
    name: "6 Months Master Pro", 
    price: 499, 
    duration: "6 Months (180 Days)", 
    desc: "Best value for competitive exams (NEET, JEE, UPSC, SSC) & full course publishing.",
    features: [
      "Everything in 3 Months Plan",
      "180 Days maximum validity",
      "All 1 to 500 Game Center Levels",
      "Full Educator Course Publishing Studio",
      "Competitive Exam Special Notes & Books",
      "Priority AI Response & Live Teacher Insights"
    ]
  },
];

export default function UpgradePage() {
  const { user } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState("3m");

  const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[1];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link 
              href="/student" 
              className="text-xs font-semibold text-slate-500 hover:text-[#5f259f] flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Astryn Platform Subscription</span>
            <Sparkles size={24} className="text-amber-500 fill-amber-400" />
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Official PhonePe Payment Stand: Pay ₹199 (1M), ₹299 (3M), or ₹499 (6M) to unlock full learning access, book library, and course upload.
          </p>
        </div>

        {user?.hasPaid ? (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-xs">
            <Shield size={18} className="text-emerald-600" />
            <div>
              <div>Active Subscription ({user.subscriptionPlan || "Pro"})</div>
              {user.subscriptionExpiresAt && (
                <div className="text-[11px] text-emerald-700 font-normal">
                  Expires: {new Date(user.subscriptionExpiresAt).toLocaleDateString()} ({user.daysRemaining || 30} days left)
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2">
            <Clock size={16} className="text-amber-600" />
            <span>Select a plan below to activate access</span>
          </div>
        )}
      </div>

      {/* Subscription Extension Banner if already active */}
      {user?.hasPaid && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5f259f] text-white flex items-center justify-center font-bold">
              <RefreshCw size={18} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">Need to extend your subscription? (तारीख बढ़ाएं)</h4>
              <p className="text-slate-600">
                You can add 1, 3, or 6 months to your existing subscription anytime. The new days will be added to your current validity!
              </p>
            </div>
          </div>
          <span className="bg-white border border-indigo-200 text-[#5f259f] font-bold px-3 py-1 rounded-xl">
            Choose Plan Below &amp; Pay
          </span>
        </div>
      )}

      {/* Plan Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isPopular = plan.id === "3m";

          return (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative cursor-pointer rounded-3xl p-6 transition-all border-2 flex flex-col justify-between ${
                isSelected 
                  ? "border-[#5f259f] bg-purple-50/40 shadow-lg ring-2 ring-[#5f259f]/20" 
                  : "border-slate-200 bg-white hover:border-purple-300 shadow-sm"
              }`}
            >
              {isPopular && (
                <span className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] px-3 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-bold text-lg ${isSelected ? "text-[#5f259f]" : "text-slate-900"}`}>
                    {plan.name}
                  </h3>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    isSelected ? "bg-[#5f259f] border-[#5f259f] text-white" : "border-slate-300"
                  }`}>
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>

                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/ {plan.duration}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">{plan.desc}</p>
              </div>

              {/* Plan Features List */}
              <div className="pt-4 border-t border-slate-200/80 space-y-2">
                {plan.features?.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* The Official PhonePe Payment Scanner Card */}
      <div className="pt-4">
        <UpiPaymentScanner plan={selectedPlan} />
      </div>
    </div>
  );
}
