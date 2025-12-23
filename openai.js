// openai.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handleVoice(text) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are an inventory command parser.
User may speak Hindi, English, or Hinglish.
You MUST detect:
- action: add | increase | decrease | remove
- product name
- quantity (integer)
- unit (kg, g, litre, ml, pcs, packet, dozen)

Rules:
- If unit is not spoken, use "pcs"
- Hindi numbers: ek=1, do=2, teen=3, char=4, paanch=5, das=10
- Hindi units mapping: kilo=kg, gram=g, litre=litre, piece=pcs
- Treat words like "sold" as decrease
- Always return JSON ONLY, no text, no explanation

Example input/output:

Input: "add 2 kilo rice"
Output: {"action":"add","product":"rice","quantity":2,"unit":"kg"}

Input: "1 kilo oil sold"
Output: {"action":"decrease","product":"oil","quantity":1,"unit":"kg"}

Input: "char packets sugar"
Output: {"action":"add","product":"sugar","quantity":4,"unit":"packet"}
`
      },
      { role: "user", content: text }
    ]
  });

  // Parse and return the AI command
  return JSON.parse(response.choices[0].message.content);
}
