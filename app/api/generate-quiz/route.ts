import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, questionCount } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API Key not configured." },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `Generate a ${questionCount || 5}-question multiple-choice quiz about "${topic}" at a ${difficulty || 'Beginner'} level.
    
    Return the response ONLY as a JSON array of objects. Do not include markdown formatting or any other text.
    
    The JSON structure MUST be exactly like this:
    [
      {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "correctIndex": 1,
        "explanation": "2 plus 2 equals 4."
      }
    ]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return NextResponse.json({ questions: JSON.parse(response.text) });
  } catch (error) {
    console.error("Generate Quiz API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz." },
      { status: 500 }
    );
  }
}
