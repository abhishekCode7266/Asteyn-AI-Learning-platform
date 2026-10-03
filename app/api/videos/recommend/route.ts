import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { CURATED_EDUCATIONAL_VIDEOS, EducationalVideo } from "@/lib/video-recommendations";

export async function POST(req: NextRequest) {
  try {
    const { topic, category, language } = await req.json();

    const queryTopic = topic || category || "General Science & Mathematics";
    const selectedLang = language || "English & Hindi";

    // 1. First check curated library for exact or partial matches
    const qLower = queryTopic.toLowerCase();
    const curatedMatches = CURATED_EDUCATIONAL_VIDEOS.filter((v) => {
      return (
        v.title.toLowerCase().includes(qLower) ||
        v.category.toLowerCase().includes(qLower) ||
        v.domain.toLowerCase().includes(qLower) ||
        v.keyConcepts.some((c) => c.toLowerCase().includes(qLower))
      );
    });

    if (curatedMatches.length >= 2) {
      return NextResponse.json({
        success: true,
        source: "curated_verified_library",
        videos: curatedMatches
      });
    }

    // 2. Use Gemini 3.8 Flash to discover authentic educational YouTube video references
    if (process.env.GEMINI_API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are the Astryn YouTube Educational Video Recommendation Engine.
The student wants to watch genuine, high-quality, verified educational YouTube video lectures on: "${queryTopic}".
Subject/Category: "${category || "Academic Knowledge"}".
Language preference: "${selectedLang}".

Recommend 2 to 3 genuine, highly acclaimed educational YouTube videos from verified channels (e.g. 3Blue1Brown, Kurzgesagt, CrashCourse, Khan Academy, MIT OpenCourseWare, PBS Space Time, Osmosis, Stanford, Veritasium, CS50).

Return ONLY a JSON array of objects with this schema:
[
  {
    "id": "A standard real or representative 11-char YouTube ID like '3pAnRKD4raY', 'WUvTyaaNkzM', 'aircAruvnKk', 'q3MWRvLndzs', 'fNk_zzaMoSs', or similar authentic educational video ID",
    "title": "Exact or descriptive video title",
    "channel": "Channel name (e.g. 3Blue1Brown, Kurzgesagt, CrashCourse)",
    "category": "${category || "Science & Mathematics"}",
    "domain": "Domain Name",
    "duration": "e.g. 14:30",
    "views": "e.g. 2.4M views",
    "rating": 4.9,
    "language": "${selectedLang}",
    "difficulty": "Beginner" | "Intermediate" | "Advanced",
    "summary": "2-3 sentences explaining what students learn in this video.",
    "keyConcepts": ["Concept 1", "Concept 2", "Concept 3"],
    "connectedBookTitles": ["Related Book Title"],
    "mcqs": [
      {
        "question": "Clear conceptual multiple-choice question testing the video concept",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctIndex": 0,
        "explanation": "Clear explanation of why this answer is correct."
      }
    ]
  }
]
No markdown code fences, no extra text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      let raw = response.text?.trim() || "[]";
      raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();
      const generatedVideos: EducationalVideo[] = JSON.parse(raw);

      if (Array.isArray(generatedVideos) && generatedVideos.length > 0) {
        return NextResponse.json({
          success: true,
          source: "gemini_educational_radar",
          videos: [...generatedVideos, ...curatedMatches.slice(0, 1)]
        });
      }
    }

    // Fallback: curated collection
    return NextResponse.json({
      success: true,
      source: "curated_fallback",
      videos: CURATED_EDUCATIONAL_VIDEOS.slice(0, 3)
    });
  } catch (err: any) {
    console.error("Video recommendation API error:", err);
    return NextResponse.json({
      success: true,
      source: "fallback",
      videos: CURATED_EDUCATIONAL_VIDEOS.slice(0, 3)
    });
  }
}
