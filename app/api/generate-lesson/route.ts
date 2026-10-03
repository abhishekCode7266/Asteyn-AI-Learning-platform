import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, language } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API Key not configured. Please add GEMINI_API_KEY to your environment variables to enable Smart Content Generation." },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const prompt = `You are an expert AI teacher powering the Astryn platform. 
Generate a short, engaging, and personalized learning lesson about "${topic}".
Difficulty level: ${difficulty || 'Beginner'}.
Language: ${language || 'English'}.

Please format the response strictly in Markdown:
# [Lesson Title]

## Introduction
[Brief 2-3 paragraph explanation of the concept, keeping it very simple and easy to understand for a student.]

## Real-World Example
[Provide a relatable, real-world example of this concept.]

## Practice Questions
[Provide 3 multiple choice questions to test understanding, formatted clearly.]
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    return NextResponse.json({ content: response.text });
  } catch (error) {
    console.error("Generate Lesson API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate smart content. Please try again." },
      { status: 500 }
    );
  }
}
