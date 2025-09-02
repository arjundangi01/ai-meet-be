import { Injectable } from '@nestjs/common';
import {
  GoogleGenAI,
  createPartFromUri,
  createUserContent,
  CachedContent,
} from '@google/genai';
import envConfig from 'src/lib/config/env-config';

@Injectable()
export class GeminiService {
  private readonly GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;
  private readonly gemini = new GoogleGenAI({
    apiKey: envConfig.GEMINI_API_KEY,
  });
  private readonly geminiModalName = 'gemini-2.5-pro';

  async generateSummary(transcript: string) {
    const prompt = `
      You are a professional meeting summarizer AI.

You will be given a raw transcript of a meeting.  
Your job is to produce a **structured summary**.

  Rules:
  1. Use numbered headings for each major topic that was actually discussed in the meeting.  
    - Example: “1. Agenda”, “2. Employee Teams & Working Hours”, “3. PTO & Attendance Integration”.  
    - The topics should come from the meeting itself, not a fixed template.  
  2. Under each heading, use bullet points to explain key points, agreements, or issues.  
  3. If any decisions were made, add a **“Decisions”** section at the end.  
  4. If there are tasks or follow-ups, add an **“Action Items”** section at the end.  
  5. Keep the tone professional, concise, and easy to scan.  
  6. Do not force sections that were not discussed.

        Now summarize the following transcript:
      ${transcript}
    `;
    const response = await this.gemini.models.generateContent({
      model: this.geminiModalName,
      contents: [createUserContent(prompt)],
    });

    return response.candidates[0].content.parts?.join('\n');
  }
}
