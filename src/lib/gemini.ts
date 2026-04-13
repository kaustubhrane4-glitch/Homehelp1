import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getHomeHelpAIResponse(prompt: string, history: { role: string, content: string }[]) {
  const contents = history.map(msg => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }]
  }));

  // Add the current prompt
  contents.push({
    role: "user",
    parts: [{ text: prompt }]
  });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      systemInstruction: "You are HomeHelp AI for a premium home services app in India. Services: Deep Cleaning ₹499, Laundry ₹299, Window Cleaning ₹349, Bathroom ₹399, Kitchen ₹449, Sofa/Carpet ₹599, Plumbing ₹199, Electrical ₹249, Pest Control ₹699, AC Service ₹549, Ironing ₹149, Garden ₹399, Dishwashing ₹149, Meal Prep ₹299, Elder Care ₹599, Baby Sitting ₹499. Be warm, concise, helpful. Use emojis naturally.",
    },
  });

  return response.text || "I'm sorry, I couldn't process that. Please try again!";
}
