"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2, Zap, KeyRound, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useAuth, DEVELOPER_EMAIL } from "@/context/AuthContext";
import DeveloperBypassModal from "@/components/DeveloperBypassModal";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'student';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBypassModalOpen, setIsBypassModalOpen] = useState(false);

  const { login, developerBypass, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(`/${user.role}`);
    }
  }, [user, isLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.message || "Failed to login. If you are new, please register first!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInstantDevLogin = () => {
    developerBypass("student", true, DEVELOPER_EMAIL);
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-3xl bg-white p-8 md:p-10 shadow-2xl border border-slate-200">
      {/* Top Banner recommending Registration First */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#5f259f] shrink-0" />
          <span className="text-[#5f259f] font-bold">New to Astryn?</span>
        </div>
        <Link 
          href="/register" 
          className="bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
        >
          <span>Register First</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="flex flex-col items-center text-center">
        <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5f259f] text-white mb-3 shadow-md hover:bg-[#4a1c7c] transition-colors">
          <BookOpen size={26} />
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          Sign In to Astryn
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Access your courses, 50-subject books library, and AI tutor.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs font-medium text-rose-800">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="loginEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Email Address
          </label>
          <input
            id="loginEmail"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 text-sm focus:border-[#5f259f] focus:ring-2 focus:ring-[#5f259f]/20 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="loginPass" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </label>
          </div>
          <input
            id="loginPass"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 text-sm focus:border-[#5f259f] focus:ring-2 focus:ring-[#5f259f]/20 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#5f259f] hover:bg-[#4a1c7c] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
          <span>Log In</span>
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-slate-400 uppercase font-medium">Or</span>
          </div>
        </div>

        {/* Master Developer Bypass Button */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleInstantDevLogin}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Zap size={14} className="fill-slate-950" />
            <span>Developer One-Click Bypass (Abhishek)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsBypassModalOpen(true)}
            className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <KeyRound size={14} className="text-slate-500" />
            <span>Enter Master Passcode / Grant Free Access</span>
          </button>
        </div>
        
        <p className="text-center text-xs text-slate-600 pt-3 border-t border-slate-100">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-bold text-[#5f259f] hover:underline">
            Register for 7-Day Free Trial
          </Link>
        </p>
      </form>

      <DeveloperBypassModal 
        isOpen={isBypassModalOpen} 
        onClose={() => setIsBypassModalOpen(false)} 
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="flex h-32 w-full items-center justify-center"><Loader2 className="animate-spin text-[#5f259f]" size={32} /></div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
