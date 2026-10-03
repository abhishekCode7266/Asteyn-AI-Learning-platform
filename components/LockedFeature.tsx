import Link from "next/link";
import { Lock } from "lucide-react";

export default function LockedFeature({ featureName }: { featureName: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
      <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
        <Lock size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">{featureName} is Locked</h2>
      <p className="text-slate-600 max-w-md mb-8">
        Free trial accounts are limited to the first 10 basic lessons. 
        Upgrade to <b>Astryn AI Pro</b> to unlock {featureName}, unlimited quizzes, interactive coding environments, and the AI Tutor.
      </p>
      <Link href="/student/upgrade" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-500 transition-colors shadow-sm">
        Upgrade to Pro
      </Link>
    </div>
  );
}
