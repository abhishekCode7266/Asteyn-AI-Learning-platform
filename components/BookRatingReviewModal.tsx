"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  Sparkles, 
  UserCheck, 
  Tag, 
  Clock, 
  Send,
  Trash2,
  Edit3
} from "lucide-react";
import { BookItem } from "@/lib/books-data";
import { 
  BookReview, 
  REVIEW_TAGS, 
  calculateRatingStats, 
  getBookReviews,
  saveLocalBookReview, 
  deleteLocalBookReview, 
  syncReviewToFirestore,
  generateReviewId
} from "@/lib/reviews-data";
import { useAuth } from "@/context/AuthContext";

interface BookRatingReviewModalProps {
  book: BookItem | null;
  isOpen: boolean;
  onClose: () => void;
  allReviews: BookReview[];
  onReviewsUpdated: (updatedReviews: BookReview[]) => void;
}

const STAR_LABELS: { [key: number]: string } = {
  1: "Needs Improvement",
  2: "Fair & Basic",
  3: "Good & Informative",
  4: "Very Good & Recommended",
  5: "Exceptional / Must Read!"
};

export default function BookRatingReviewModal({
  book,
  isOpen,
  onClose,
  allReviews,
  onReviewsUpdated
}: BookRatingReviewModalProps) {
  const { user } = useAuth();

  // Filter reviews for this book
  const bookReviews = book ? getBookReviews(book.id, allReviews) : [];
  const stats = book ? calculateRatingStats(book.id, allReviews, book.rating) : { average: 5, totalReviews: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };

  // Check if current student has already reviewed this book
  const currentUserId = user?.id || "student-guest";
  const userExistingReview = bookReviews.find((r) => r.userId === currentUserId);

  const [selectedRating, setSelectedRating] = useState<number>(() => userExistingReview?.rating || 5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState(() => userExistingReview?.reviewText || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(() => userExistingReview?.tags || ["Clear Concepts", "Must Read"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(() => userExistingReview?.id || null);

  if (!isOpen || !book) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmitting(true);

    const newReview: BookReview = {
      id: editingReviewId || generateReviewId(),
      bookId: book.id,
      bookTitle: book.title,
      userId: currentUserId,
      userName: user?.name || "Student",
      userRole: user?.role || "student",
      rating: selectedRating,
      reviewText: reviewText.trim(),
      tags: selectedTags,
      createdAt: new Date().toISOString(),
      verifiedReader: true,
      helpfulCount: userExistingReview?.helpfulCount || 1
    };

    // 1. Save to local storage for immediate persistence
    const updated = saveLocalBookReview(newReview);
    onReviewsUpdated(updated);

    // 2. Sync to Firestore in background
    syncReviewToFirestore(newReview);

    setIsSubmitting(false);
    setSuccessMessage(editingReviewId ? "Review updated successfully!" : "Thank you! Your rating and review have been published.");
    setEditingReviewId(newReview.id);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("Are you sure you want to remove your review?")) {
      const updated = deleteLocalBookReview(reviewId);
      onReviewsUpdated(updated);
      setEditingReviewId(null);
      setReviewText("");
      setSelectedRating(5);
      setSelectedTags([]);
      setSuccessMessage("Your review was removed.");
      setTimeout(() => setSuccessMessage(""), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5f259f] text-white flex items-center justify-center shadow-sm">
              <Star size={20} className="fill-amber-300 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base md:text-lg text-slate-900 line-clamp-1">
                  Rate &amp; Review: {book.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                By {book.author} • {book.category}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/50 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Rating Summary & Breakdown Banner */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Overall Score */}
            <div className="md:col-span-4 text-center md:border-r border-slate-200 pr-0 md:pr-4">
              <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {stats.average}
              </div>
              
              <div className="flex items-center justify-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={
                      star <= Math.round(stats.average)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300"
                    }
                  />
                ))}
              </div>

              <span className="text-xs text-slate-500 font-semibold block">
                Based on {stats.totalReviews} student review{stats.totalReviews === 1 ? "" : "s"}
              </span>
            </div>

            {/* Star Distribution Bars */}
            <div className="md:col-span-8 space-y-1.5 text-xs">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = stats.distribution[stars] || 0;
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-7 font-bold text-slate-600 flex items-center gap-0.5 justify-end">
                      {stars} <Star size={11} className="fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-[#5f259f] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-medium text-slate-500">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rate & Review Form */}
          <div className="bg-white border-2 border-purple-100 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#5f259f]">
                  Student Feedback
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  {userExistingReview ? "Edit Your Review" : "How would you rate this book?"}
                </h4>
              </div>

              {userExistingReview && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>You reviewed this</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Interactive 5-Star Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Your Star Rating
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = hoveredRating ? star <= hoveredRating : star <= selectedRating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => setSelectedRating(star)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                        >
                          <Star
                            size={32}
                            className={`transition-colors ${
                              isFilled
                                ? "text-amber-400 fill-amber-400 drop-shadow-xs"
                                : "text-slate-300 hover:text-amber-200"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <span className="text-sm font-extrabold text-[#5f259f] bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                    {STAR_LABELS[hoveredRating || selectedRating]}
                  </span>
                </div>
              </div>

              {/* Quick Feedback Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Tag size={13} className="text-[#5f259f]" />
                  <span>Quick Feedback Highlights (Select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {REVIEW_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#5f259f] text-white border-[#5f259f] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Written Review */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Detailed Review &amp; Learning Experience
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share what stood out to you. Which chapters were most helpful? Did it help you prepare for exams or solve difficult questions?"
                  className="w-full p-3.5 text-sm rounded-2xl border border-slate-300 focus:border-[#5f259f] focus:ring-2 focus:ring-[#5f259f]/20 outline-hidden leading-relaxed text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <UserCheck size={14} className="text-emerald-600" />
                  <span>Posting as: <strong>{user?.name || "Student"}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  {userExistingReview && (
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(userExistingReview.id)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !reviewText.trim()}
                    className="bg-[#5f259f] hover:bg-[#4a1c7c] disabled:opacity-60 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{editingReviewId ? "Update Review" : "Submit Rating & Review"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Student Reviews Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <MessageSquare size={17} className="text-[#5f259f]" />
                <span>Student Community Reviews ({bookReviews.length})</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Verified Student Readers
              </span>
            </div>

            {bookReviews.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                <Star size={28} className="mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-bold text-slate-700">No reviews yet for this title.</p>
                <p className="text-xs text-slate-500 mt-0.5">Be the first student to read and share your rating!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookReviews.map((rev) => {
                  const isCurrentUser = rev.userId === currentUserId;
                  return (
                    <div 
                      key={rev.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isCurrentUser 
                          ? "bg-purple-50/50 border-purple-200" 
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          {/* Student Avatar */}
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5f259f] to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                            {rev.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-xs text-slate-900">
                                {rev.userName}
                              </span>
                              {isCurrentUser && (
                                <span className="text-[10px] bg-purple-200/80 text-[#5f259f] font-bold px-1.5 py-0.2 rounded">
                                  You
                                </span>
                              )}
                              {rev.verifiedReader && (
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                  <CheckCircle2 size={10} />
                                  <span>Verified Reader</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                              <Clock size={11} />
                              <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={12}
                              className={
                                s <= rev.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-300"
                              }
                            />
                          ))}
                          <span className="text-xs font-black text-amber-900 ml-1">{rev.rating}.0</span>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed pl-10">
                        {rev.reviewText}
                      </p>

                      {/* Review Tags */}
                      {rev.tags && rev.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pl-10">
                          {rev.tags.map((t, tidx) => (
                            <span 
                              key={tidx}
                              className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Student Rating Platform • Astryn Learning</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
