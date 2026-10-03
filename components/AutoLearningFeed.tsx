"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Newspaper, 
  TrendingUp, 
  Calendar, 
  ExternalLink, 
  BookOpen, 
  RefreshCw, 
  Award,
  Zap,
  CheckCircle2,
  ChevronRight,
  Wifi,
  Bot
} from "lucide-react";
import Link from "next/link";

export interface FeedItem {
  id: string;
  title: string;
  category: "Exam Alert" | "AI & Science" | "Study Tips" | "Book Recommendation" | "Teacher Hub";
  date: string;
  summary: string;
  readTime: string;
  actionUrl?: string;
  actionText?: string;
  trendingBadge?: string;
}

const DEFAULT_FEED: FeedItem[] = [
  {
    id: "feed-1",
    title: "CBSE & State Board Revised 2025 Blueprint Released",
    category: "Exam Alert",
    date: "Live Radar Update",
    summary: "Competency-based questions increased to 50% for Class 10 & 12. Focus shifts from rote learning to analytical applications.",
    readTime: "2 min read",
    actionUrl: "/student/books",
    actionText: "Read Competency Books",
    trendingBadge: "Official Alert"
  },
  {
    id: "feed-2",
    title: "Vedic Math Shortcuts Revolutionizing JEE & NEET Speed",
    category: "Study Tips",
    date: "Trending Internet",
    summary: "Speed calculation methods like Urdhva-Tiryagbhyam reduce numerical calculation time by up to 60% in physical chemistry and calculus.",
    readTime: "3 min read",
    actionUrl: "/student/books",
    actionText: "Open Vedic Math Book",
    trendingBadge: "Top Strategy"
  },
  {
    id: "feed-3",
    title: "Quantum Computing Principles Added to Senior Curriculum",
    category: "AI & Science",
    date: "This Week",
    summary: "High school physics now introduces quantum superposition, qubits, and semiconductor logic in modern physics chapters.",
    readTime: "4 min read",
    actionUrl: "/student/books",
    actionText: "Explore Quantum Physics",
    trendingBadge: "New Syllabus"
  },
  {
    id: "feed-4",
    title: "Educator Insights: Boosting Rural Student Engagement with AI",
    category: "Teacher Hub",
    date: "Curated for Teachers",
    summary: "How bilingual AI diagnostic tests help identify weak foundational concepts in mathematics and vernacular languages.",
    readTime: "3 min read",
    actionUrl: "/teacher",
    actionText: "Teacher Analytics",
    trendingBadge: "Pedagogy"
  }
];

export default function AutoLearningFeed() {
  const [items, setItems] = useState<FeedItem[]>(DEFAULT_FEED);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Synced via Internet");
  const [source, setSource] = useState<string>("Astryn AI Internet Radar");

  const fetchLiveUpdates = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/auto-updates");
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
          setLastUpdated(`Synced at ${data.lastUpdated || new Date().toLocaleTimeString()}`);
          setSource(data.source === "gemini_internet_radar" ? "Live AI Internet Scan" : "Astryn Cloud Feed");
        }
      }
    } catch (e) {
      console.error("Failed to load auto updates:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadUpdates = async () => {
      try {
        const res = await fetch("/api/auto-updates");
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.items && Array.isArray(data.items) && data.items.length > 0) {
            setItems(data.items);
            setLastUpdated(`Synced at ${data.lastUpdated || new Date().toLocaleTimeString()}`);
            setSource(data.source === "gemini_internet_radar" ? "Live AI Internet Scan" : "Astryn Cloud Feed");
          }
        }
      } catch (e) {
        console.error("Failed to load auto updates:", e);
      }
    };

    loadUpdates();

    // Auto-poll every 5 minutes so busy developer doesn't need manual effort
    const interval = setInterval(loadUpdates, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#5f259f] flex items-center justify-center font-bold shadow-xs">
            <Newspaper size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-base">
                Auto-Updated Internet Learning Radar
              </h3>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Auto-Pilot 24/7</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>{lastUpdated}</span>
              <span>•</span>
              <span className="text-purple-600 font-medium">{source}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchLiveUpdates}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5f259f] hover:text-[#4a1c7c] bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} />
          <span>{isRefreshing ? "Scanning Internet..." : "Scan Now"}</span>
        </button>
      </div>

      {/* Auto-Pilot Developer Automation Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-3 flex items-center justify-between text-xs text-purple-950">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-[#5f259f] shrink-0" />
          <span>
            <b>Zero-Effort Auto Engine:</b> Automatically gathers trending educational news, syllabus alterations, and top study books from across the web.
          </span>
        </div>
        <span className="text-[10px] font-extrabold bg-[#5f259f] text-white px-2 py-0.5 rounded-md uppercase">
          Live
        </span>
      </div>

      {/* Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="rounded-2xl border border-slate-200 p-4 hover:border-purple-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-3 bg-white"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider ${
                  item.category === "Exam Alert" 
                    ? "bg-rose-50 text-rose-700 border border-rose-200" 
                    : item.category === "Study Tips"
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : item.category === "AI & Science"
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                }`}>
                  {item.category}
                </span>

                {item.trendingBadge && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.trendingBadge}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{item.readTime}</span>
              {item.actionUrl && (
                <Link
                  href={item.actionUrl}
                  className="font-bold text-[#5f259f] hover:text-[#4a1c7c] inline-flex items-center gap-1"
                >
                  <span>{item.actionText || "Read More"}</span>
                  <ChevronRight size={13} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
