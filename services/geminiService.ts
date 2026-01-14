import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateSuccessStory = async (topic: string, keyPoints: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API_KEY is missing. Returning mock response.");
    return `(Mock) Here is an inspiring story about ${topic}. The community came together to achieve great things, specifically: ${keyPoints}. This is a placeholder because the API key is missing.`;
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are a PR manager for a non-profit called "RiseRoot".
      Write a short, inspiring success story blog post (max 150 words) about: ${topic}.
      Include these key details: ${keyPoints}.
      Tone: Uplifting, transparent, and gratitude-filled.
      Do not use markdown formatting like **bold** or headers, just plain text paragraphs.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Failed to generate story.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again later.";
  }
};

export const summarizeImpact = async (donations: any[]): Promise<string> => {
    if (!apiKey) return "Impact summary unavailable (No API Key).";
    
    try {
        const dataStr = JSON.stringify(donations.slice(0, 10)); // Limit data
        const prompt = `Summarize the impact of these recent donations in one inspiring sentence for the dashboard: ${dataStr}`;
         const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text || "Together we are making a difference.";
    } catch (e) {
        return "Together we are making a difference.";
    }
}
