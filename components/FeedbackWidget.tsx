"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";

export default function FeedbackWidget({ context = "Experience" }: { context?: string }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 flex flex-col items-center justify-center text-center w-full max-w-md mx-auto mt-8">
        <CheckCircle2 className="text-emerald-500 mb-2" size={32} />
        <h3 className="font-bold text-emerald-900">Thank you for your feedback!</h3>
        <p className="text-emerald-700 text-sm mt-1">Your rating helps us improve Astryn AI.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm max-w-md w-full mx-auto mt-8">
      <h3 className="font-bold text-slate-900 mb-1">Rate this {context}</h3>
      <p className="text-xs text-slate-500 mb-4">Your feedback helps our AI learn and improve.</p>
      
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
            className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
          >
            <Star
              size={32}
              className={`${
                star <= (hovered || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200 hover:text-amber-200"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
      
      {rating > 0 && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you liked or what could be better..."
            className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none mb-4 resize-none h-24 text-slate-700"
          />
          <button
            onClick={() => setSubmitted(true)}
            className="w-full bg-indigo-600 text-white rounded-lg py-2.5 font-semibold text-sm hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Send size={16} /> Submit Rating
          </button>
        </div>
      )}
    </div>
  );
}
