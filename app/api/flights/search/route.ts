import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { from, to, date, passengers } = await req.json();

    const prompt = `You are a futuristic travel concierge for AeroPulse. 
    User is looking for a flight from ${from} to ${to} on ${date} for ${passengers} passengers.
    
    Provide a list of 5 creative, futuristic flight options in JSON format.
    Include:
    - airlineName (futuristic names like 'Aura Air', 'Nebula Express', 'Quantum Wings')
    - flightNumber
    - departureTime (ISO string)
    - arrivalTime (ISO string)
    - price (in USD, between 300 and 1500)
    - features (array of strings, e.g., 'Gravity Deck', 'Neural Wi-Fi', 'Zero-G Pods')
    - aircraftModel (e.g., 'Aeon v.4', 'Stellar Glide')

    Return ONLY the JSON array.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return NextResponse.json(JSON.parse(response.text || "[]"));
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Failed to fetch flights", details: error.message }, { status: 500 });
  }
}
