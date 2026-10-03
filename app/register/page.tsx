"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, KeyRound, Shield, Zap, Check } from "lucide-react";
import Link from "next/link";
import { useAuth, DEVELOPER_EMAIL } from "@/context/AuthContext";
import UpiPaymentScanner, { Plan } from "@/components/UpiPaymentScanner";
import DeveloperBypassModal from "@/components/DeveloperBypassModal";

const REGISTER_PLANS: Plan[] = [
  {
    id: "trial",
    name: "7-Day Free Trial",
    price: 0,
    duration: "7 Days Free",
    desc: "Start exploring classes 1-12, sample test quizzes, and games without paying anything.",
    features: [
      "Access to all 1st to 12th subjects (first 10 lessons each)",
      "Daily diagnostic tests",
      "Game center levels 1-20 preview",
      "No payment or card required"
    ]
  },
  {
    id: "1m",
    name: "1 Month Pro",
    price: 199,
    duration: "1 Month (30 Days)",
    desc: "Full access to all subjects, digital library, and book/course upload for 1 month.",
    features: [
      "All 1st-12th curriculum",
      "50-Subject Digital Books Library",
      "Upload Books & Create Courses",
      "Multilingual AI Tutor"
    ]
  },
  {
    id: "3m",
    name: "3 Months Semester Pass",
    price: 299,
    duration: "3 Months (90 Days)",
    desc: "Most popular choice: full semester access, graduation streams, and books.",
    features: [
      "Everything in 1 Month",
      "90 Days extended validity",
      "Graduation Streams (BA, BSc, BCom, BTech)",
      "Offline Study Mode & Doubt Solver"
    ]
  },
  {
    id: "6m",
    name: "6 Months Master Pro",
    price: 499,
    duration: "6 Months (180 Days)",
    desc: "Full 180-day access for competitive exams (NEET, JEE, UPSC) & course publishing.",
    features: [
      "Everything in 3 Months",
      "All 1 to 500 Game Center Levels",
      "Complete Course Publishing Studio",
      "Priority AI Response"
    ]
  }
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, developerBypass } = useAuth();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [selectedPlanId, setSelectedPlanId] = useState<string>("trial");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isBypassModalOpen, setIsBypassModalOpen] = useState(false);

  const selectedPlan = REGISTER_PLANS.find(p => p.id === selectedPlanId) || REGISTER_PLANS[0];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all registration fields.");
      return;
    }
    setError("");

    // If developer email is entered, automatically bypass
    if (email.toLowerCase().trim() === DEVELOPER_EMAIL.toLowerCase()) {
      developerBypass(role, true, DEVELOPER_EMAIL);
      return;
    }

    setStep(2); // Go to Plan selection & PhonePe payment
  };

  const handleStartTrial = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await register(name.trim(), email.trim(), password, role, false); // hasPaid = false
    } catch (err: any) {
      setError(err?.message || "Failed to create free trial account. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className={`w-full transition-all duration-300 rounded-3xl bg-white p-8 md:p-10 shadow-2xl border border-slate-200 ${
        step === 2 && selectedPlanId !== 'trial' ? 'max-w-4xl' : 'max-w-xl'
      }`}>
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5f259f] text-white mb-3 shadow-md hover:bg-[#4a1c7c] transition-colors">
            <BookOpen size={26} />
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#5f259f] text-xs font-bold mb-2">
            <span>Step {step} of 2</span>
            <span>•</span>
            <span>{step === 1 ? "1. Create Account First" : "2. Choose Plan & PhonePe Payment"}</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {step === 1 ? "Register for Astryn Platform" : "Select Your Learning Subscription"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {step === 1 
              ? "First step: Create your profile. Free trial and PhonePe plans on the next screen!" 
              : "Choose 100% Free Trial or Pay via PhonePe QR (₹199, ₹299, or ₹499)."}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-800">
            {error}
          </div>
        )}

        {/* STEP 1: Registration Form */}
        {step === 1 ? (
          <form className="mt-8 space-y-5" onSubmit={handleNextStep}>
            {/* Role Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-bold transition-all ${
                    role === 'student'
                      ? 'bg-[#5f259f] text-white shadow-md'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-bold transition-all ${
                    role === 'teacher'
                      ? 'bg-[#5f259f] text-white shadow-md'
                      : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Teacher
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="regName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Full Name
              </label>
              <input
                id="regName"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-[#5f259f] focus:ring-2 focus:ring-[#5f259f]/20 focus:outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="regEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Email Address
              </label>
              <input
                id="regEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-[#5f259f] focus:ring-2 focus:ring-[#5f259f]/20 focus:outline-none text-sm"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Developer email <span className="font-mono text-[#5f259f] font-semibold">{DEVELOPER_EMAIL}</span> automatically receives full free VIP bypass.
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="regPass" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Create Password
              </label>
              <input
                id="regPass"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-[#5f259f] focus:ring-2 focus:ring-[#5f259f]/20 focus:outline-none text-sm"
              />
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <span>Continue to Plans &amp; PhonePe QR</span>
              <ArrowRight size={16} />
            </button>

            {/* Navigation to Login */}
            <div className="pt-4 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Already registered?{' '}
                <Link href="/login" className="font-bold text-[#5f259f] hover:underline">
                  Log in to your account
                </Link>
              </p>
            </div>

            {/* Quick Developer Bypass Modal Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsBypassModalOpen(true)}
                className="text-xs text-amber-600 hover:text-amber-700 font-bold inline-flex items-center gap-1.5"
              >
                <Zap size={14} />
                <span>Developer / Passcode Master Bypass (Any Device)</span>
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: Plan Selection & PhonePe Payment */
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-600 hover:text-[#5f259f] flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Back to Edit Details
              </button>
              <span className="text-xs text-slate-500">Registered as: <b className="text-slate-800">{email}</b></span>
            </div>

            {/* Plan Choice Cards (4 Options) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {REGISTER_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                const isFree = plan.price === 0;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-[#5f259f] bg-purple-50/50 shadow-md ring-2 ring-[#5f259f]/20"
                        : "border-slate-200 bg-white hover:border-purple-200"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`font-bold text-sm ${isSelected ? "text-[#5f259f]" : "text-slate-900"}`}>
                          {plan.name}
                        </span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          isSelected ? "bg-[#5f259f] border-[#5f259f] text-white" : "border-slate-300"
                        }`}>
                          {isSelected && <Check size={10} strokeWidth={3} />}
                        </div>
                      </div>

                      <div className="my-1.5">
                        <span className="text-xl font-black text-slate-900">
                          {isFree ? "Free (₹0)" : `₹${plan.price}`}
                        </span>
                        <span className="text-[11px] text-slate-500 ml-1">/ {plan.duration}</span>
                      </div>

                      <p className="text-[11px] text-slate-600 mb-2 leading-tight">{plan.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 space-y-1 text-[11px] text-slate-700">
                      {plan.features?.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <CheckCircle2 size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* If Free Trial is chosen */}
            {selectedPlanId === "trial" ? (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900">Start Your 7-Day Free Trial Instantly</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                    No payment required. You will be redirected right into your personalized student portal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleStartTrial}
                  disabled={isSubmitting}
                  className="w-full max-w-sm mx-auto bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Creating Free Account...</span>
                  ) : (
                    <>
                      <span>Activate Free Trial Now</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* If Pro Plan is chosen: show the Official PhonePe QR Scanner */
              <div className="pt-2">
                <UpiPaymentScanner 
                  plan={selectedPlan} 
                  onSuccess={() => router.push(`/${role}`)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <DeveloperBypassModal 
        isOpen={isBypassModalOpen} 
        onClose={() => setIsBypassModalOpen(false)} 
      />
    </div>
  );
}
