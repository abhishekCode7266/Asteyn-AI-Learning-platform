"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Play, 
  Search, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Globe, 
  Clock, 
  Eye, 
  Layers, 
  SlidersHorizontal, 
  ChevronRight,
  RotateCcw,
  Loader2,
  ExternalLink,
  ArrowUpDown,
  Share2
} from "lucide-react";
import { 
  CURATED_EDUCATIONAL_VIDEOS, 
  EducationalVideo, 
  searchEducationalVideos, 
  getVideosForCategory 
} from "@/lib/video-recommendations";
import EducationalVideoPlayerModal from "@/components/EducationalVideoPlayerModal";
import ShareVideoModal from "@/components/ShareVideoModal";
import { SUBJECT_50_CATEGORIES } from "@/lib/books-data";

export default function EducationalVideosHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Subjects");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  
  // Sorting State: 'Highest Rated', 'Most Viewed', 'Newest'
  const [sortBy, setSortBy] = useState<"Highest Rated" | "Most Viewed" | "Newest">("Highest Rated");

  // Active Video Player Modal state
  const [activeVideo, setActiveVideo] = useState<EducationalVideo | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Video Sharing Modal state
  const [sharingVideo, setSharingVideo] = useState<EducationalVideo | null>(null);

  // Dynamic AI Auto-Discovery state
  const [aiDiscoveredVideos, setAiDiscoveredVideos] = useState<EducationalVideo[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryTopic, setDiscoveryTopic] = useState("");

  const languageOptions = [
    "All Languages",
    "English & Hindi Subtitles",
    "English (Multilingual Captions)",
    "Hindi Audio / Captions"
  ];

  const difficultyOptions = [
    "All Levels",
    "Beginner",
    "Intermediate",
    "Advanced"
  ];

  // Distinct subjects list from categories
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    CURATED_EDUCATIONAL_VIDEOS.forEach((v) => set.add(v.category));
    return ["All Subjects", ...Array.from(set)];
  }, []);

  // Filtered educational videos
  const allVideos = useMemo(() => {
    return [...aiDiscoveredVideos, ...CURATED_EDUCATIONAL_VIDEOS];
  }, [aiDiscoveredVideos]);

  // Helper to parse human-readable view counts (e.g. "18.5M views", "890K views")
  const parseViewCount = (viewsStr: string): number => {
    if (!viewsStr) return 0;
    const clean = viewsStr.toUpperCase().replace(/[^0-9.KMB]/g, "");
    let multiplier = 1;
    if (clean.includes("B")) multiplier = 1_000_000_000;
    else if (clean.includes("M")) multiplier = 1_000_000;
    else if (clean.includes("K")) multiplier = 1_000;
    const num = parseFloat(clean.replace(/[KMB]/g, ""));
    return isNaN(num) ? 0 : num * multiplier;
  };

  const filteredVideos = useMemo(() => {
    let list = allVideos;

    if (selectedCategory !== "All Subjects") {
      list = list.filter((v) => v.category === selectedCategory || v.domain === selectedCategory);
    }

    if (selectedLanguage !== "All Languages") {
      list = list.filter((v) => v.language.includes(selectedLanguage.split(" ")[0]));
    }

    if (selectedDifficulty !== "All Levels") {
      list = list.filter((v) => v.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((v) =>
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q) ||
        v.summary.toLowerCase().includes(q) ||
        v.keyConcepts.some((c) => c.toLowerCase().includes(q)) ||
        v.connectedBookTitles.some((b) => b.toLowerCase().includes(q))
      );
    }

    // Apply Sorting: 'Highest Rated', 'Most Viewed', or 'Newest'
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sortBy === "Highest Rated" || (sortBy as string) === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "Most Viewed" || (sortBy as string) === "views") {
        return parseViewCount(b.views) - parseViewCount(a.views);
      }
      if (sortBy === "Newest" || (sortBy as string) === "newest") {
        // AI newly discovered videos prioritize first, then by video identifier
        const aIsAi = aiDiscoveredVideos.some((v) => v.id === a.id);
        const bIsAi = aiDiscoveredVideos.some((v) => v.id === b.id);
        if (bIsAi !== aIsAi) return (bIsAi ? 1 : 0) - (aIsAi ? 1 : 0);
        return b.id.localeCompare(a.id);
      }
      return 0;
    });

    return sorted;
  }, [allVideos, selectedCategory, selectedLanguage, selectedDifficulty, searchQuery, sortBy, aiDiscoveredVideos]);

  // Deep link support for shared videos (?videoId=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const videoId = params.get("videoId");
      if (videoId) {
        const found = allVideos.find((v) => v.id === videoId);
        if (found) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setActiveVideo(found);
          setIsVideoModalOpen(true);
        }
      }
    }
  }, [allVideos]);

  // AI Auto-Discovery of New Educational Videos for Any Topic
  const handleAutoDiscover = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!discoveryTopic.trim()) return;

    setIsDiscovering(true);
    try {
      const res = await fetch("/api/videos/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: discoveryTopic.trim(),
          category: selectedCategory !== "All Subjects" ? selectedCategory : undefined,
          language: selectedLanguage !== "All Languages" ? selectedLanguage : "English & Hindi"
        })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.videos)) {
        setAiDiscoveredVideos((prev) => {
          const existingIds = new Set(prev.map((v) => v.id));
          const newVids = data.videos.filter((v: EducationalVideo) => !existingIds.has(v.id));
          return [...newVids, ...prev];
        });
        setDiscoveryTopic("");
      }
    } catch (err) {
      console.error("Auto discovery error:", err);
    } finally {
      setIsDiscovering(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-slate-950 to-indigo-950 text-white p-6 md:p-10 shadow-2xl border border-red-500/20">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <Play size={16} className="fill-white translate-x-0.5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30">
              Astryn YouTube Educational Video Hub
            </span>
            <span className="text-xs text-indigo-300 font-semibold bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              Connected with Books &amp; MCQs
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
            Curated Educational Video Lectures Across All Subjects
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Watch genuine, peer-reviewed educational videos from world-renowned creators like 3Blue1Brown, Kurzgesagt, CrashCourse, Khan Academy, and MIT OpenCourseWare. Every lecture is synchronized with Astryn library textbooks and includes concept quizzes.
          </p>

          {/* Quick AI Video Auto-Finder Form */}
          <form onSubmit={handleAutoDiscover} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Sparkles size={16} className="absolute left-3.5 top-3 text-amber-400" />
              <input
                type="text"
                value={discoveryTopic}
                onChange={(e) => setDiscoveryTopic(e.target.value)}
                placeholder="Ask AI to find genuine video lectures (e.g. Black Holes, Quantum Entanglement)..."
                className="w-full pl-10 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isDiscovering || !discoveryTopic.trim()}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              {isDiscovering ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} className="fill-white" />}
              <span>Find Lectures</span>
            </button>
          </form>
        </div>
      </div>

      {/* Discovery & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 sm:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lectures by topic, channel, concept, or connected book..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-600 cursor-pointer"
            >
              {difficultyOptions.map((diff) => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs">
              <ArrowUpDown size={13} className="text-red-600 shrink-0" />
              <label htmlFor="videoSortSelect" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 hidden sm:inline">
                Sort by:
              </label>
              <select
                id="videoSortSelect"
                name="videoSortSelect"
                aria-label="Sort lecture videos"
                data-testid="video-sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "Highest Rated" | "Most Viewed" | "Newest")}
                className="bg-transparent font-extrabold text-slate-800 text-xs focus:outline-none cursor-pointer"
              >
                <option value="Highest Rated">Highest Rated</option>
                <option value="Most Viewed">Most Viewed</option>
                <option value="Newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Subject & Sort Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-800">
              Showing {filteredVideos.length} {filteredVideos.length === 1 ? "Educational Lecture" : "Educational Lectures"}
            </span>
            <span>•</span>
            <span className="text-red-600 font-semibold">{selectedCategory}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-bold text-red-700 bg-red-50 border border-red-200/80 px-2.5 py-0.5 rounded-full text-[10px]">
              {(sortBy === "Highest Rated" || (sortBy as string) === "rating") && (
                <>
                  <Star size={10} className="fill-amber-400 text-amber-500" />
                  <span>Sorted: Highest Rated</span>
                </>
              )}
              {(sortBy === "Most Viewed" || (sortBy as string) === "views") && (
                <>
                  <Eye size={10} className="text-red-600" />
                  <span>Sorted: Most Viewed</span>
                </>
              )}
              {(sortBy === "Newest" || (sortBy as string) === "newest") && (
                <>
                  <Sparkles size={10} className="text-indigo-600" />
                  <span>Sorted: Newest</span>
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/student/books" 
              className="text-indigo-600 hover:underline font-bold flex items-center gap-1"
            >
              <BookOpen size={13} />
              <span>Browse 1,000+ Textbooks</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group bg-white rounded-3xl border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1.5 hover:scale-[1.025] flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Top Video Preview Header */}
            <div>
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                {/* Fallback preview with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-5 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-red-600/90 px-2 py-0.5 rounded text-white shadow-xs">
                      {video.channel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSharingVideo(video);
                        }}
                        className="p-1 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Share this video lecture"
                      >
                        <Share2 size={12} />
                      </button>
                      <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-slate-200">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="self-center my-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveVideo(video);
                        setIsVideoModalOpen(true);
                      }}
                      className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer"
                      title="Play Lecture & Take Quiz"
                    >
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 z-10">
                    <span className="truncate">{video.category}</span>
                    <span className="flex items-center gap-1 font-bold text-amber-300">
                      <Star size={11} className="fill-amber-300 text-amber-300" />
                      {video.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Content Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {video.domain}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {video.views}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm md:text-base text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {video.summary}
                </p>

                {/* Key Concepts Chips */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Core Concepts:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {video.keyConcepts.slice(0, 2).map((c, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded truncate max-w-[200px]">
                        • {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Footer */}
            <div className="p-5 pt-0 space-y-2">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {video.difficulty}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSharingVideo(video)}
                    className="p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                    title="Share video lecture (Link, WhatsApp, Telegram, Twitter)"
                  >
                    <Share2 size={13} />
                    <span className="text-xs font-bold hidden sm:inline">Share</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveVideo(video);
                      setIsVideoModalOpen(true);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play size={12} className="fill-white" />
                    <span>Watch &amp; Quiz ({video.mcqs?.length || 0})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Player Modal with Concept Notes & MCQs */}
      <EducationalVideoPlayerModal
        video={activeVideo}
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setActiveVideo(null);
        }}
      />

      {/* Dedicated Video Sharing Modal */}
      <ShareVideoModal
        video={sharingVideo}
        isOpen={!!sharingVideo}
        onClose={() => setSharingVideo(null)}
      />
    </div>
  );
}
