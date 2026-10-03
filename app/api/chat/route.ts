import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        text: "API Key not configured. (Demo mode: Photosynthesis is the process by which green plants make their food using sunlight, water, and carbon dioxide. Would you like me to explain it step-by-step?)" 
      });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemPrompt = `You are the Astryn AI Tutor, a helpful, patient, and encouraging tutor for students in rural/low-income areas.
    - Explain concepts in very simple language.
    - Provide step-by-step explanations.
    - Give relatable examples.
    - Do NOT simply give answers to test questions; explain how to solve them.
    - Keep responses concise but educational.
    - If the user asks in Hindi or Hinglish, respond appropriately in that language.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `${systemPrompt}\n\nStudent asks: ${message}`,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { text: "I'm having a little trouble connecting to my brain right now. Please try again in a moment!" },
      { status: 500 }
    );
  }
}
