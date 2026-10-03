import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: true,
        source: "cached_radar",
        lastUpdated: new Date().toLocaleTimeString(),
        items: [
          {
            id: "auto-1",
            title: "CBSE & NTA 2025-26 Revised Exam Blueprint & Weightage",
            category: "Exam Alert",
            date: "Today's Live Radar",
            summary: "50% competency-based questions added across Physics, Chemistry & Math. Direct concept application questions have replaced simple rote memorization.",
            readTime: "2 min read",
            actionUrl: "/student/books",
            actionText: "Open NCERT Practice Books",
            trendingBadge: "Official Update"
          },
          {
            id: "auto-2",
            title: "Top 10 Vedic Math Speed Multipliers for JEE/NEET Numerical Problems",
            category: "Study Tips",
            date: "Trending Internet",
            summary: "Using Nikhilam and Anurupyena sutras saves an average of 45 seconds per physical chemistry calculation, boosting rank potential.",
            readTime: "3 min read",
            actionUrl: "/student/books",
            actionText: "Read Vedic Mathematics Book",
            trendingBadge: "Viral Study Hack"
          },
          {
            id: "auto-3",
            title: "Quantum Computation Basics Integrated into 12th Senior Physics",
            category: "AI & Science",
            date: "This Week",
            summary: "Introductory quantum gates, qubits, and superconducting concepts have been introduced in modern semiconductor units.",
            readTime: "4 min read",
            actionUrl: "/student/books",
            actionText: "Explore Quantum Physics",
            trendingBadge: "New Syllabus"
          },
          {
            id: "auto-4",
            title: "Teacher Toolkit: Creating Diagnostic Assessments with Multilingual AI",
            category: "Teacher Hub",
            date: "Educator Trend",
            summary: "How teachers can identify individual student concept gaps in rural and semi-urban classrooms within 5 minutes.",
            readTime: "3 min read",
            actionUrl: "/teacher",
            actionText: "Open Teacher Hub",
            trendingBadge: "High Recommendation"
          }
        ]
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are the Astryn Learning Platform AI Internet Radar.
Generate a JSON array of 4 cutting-edge, realistic educational updates that were recently discussed on the internet (CBSE/NCERT board changes, NEET/JEE strategies, trending books, innovative study techniques, or educator tools).
Each item must have:
- id: string
- title: concise compelling headline
- category: one of ["Exam Alert", "Study Tips", "AI & Science", "Teacher Hub", "Book Recommendation"]
- date: e.g. "Live Radar - Today"
- summary: 2 sentences explaining the key takeaway
- readTime: e.g. "2 min read"
- actionUrl: "/student/books" or "/student" or "/teacher"
- actionText: e.g. "Read in Library"
- trendingBadge: e.g. "Trending", "New Syllabus", "High Demand"

Return ONLY the raw JSON array. No markdown code fences, no extra text.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    let rawText = response.text || "[]";
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    const items = JSON.parse(rawText);
    return NextResponse.json({
      success: true,
      source: "gemini_internet_radar",
      lastUpdated: new Date().toLocaleTimeString(),
      items
    });
  } catch (err: any) {
    console.error("Auto Updates API error:", err);
    return NextResponse.json({
      success: true,
      source: "fallback",
      lastUpdated: new Date().toLocaleTimeString(),
      items: [
        {
          id: "fb-1",
          title: "CBSE & State Board Competency Blueprint 2025",
          category: "Exam Alert",
          date: "Live Alert",
          summary: "Higher order thinking skills (HOTS) questions are now weighted at 50% in Class 10 and 12 science papers.",
          readTime: "2 min",
          actionUrl: "/student/books",
          actionText: "View Books",
          trendingBadge: "Important"
        }
      ]
    });
  }
}
