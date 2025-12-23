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
Detect:
- action: add | increase | decrease | remove
- product name
- quantity (number)
- unit (kg, g, litre, ml, pcs, packet, dozen)
Rules:
- If unit not spoken, use "pcs"
- Hindi units mapping: kilo=kg, litre=litre, gram=g, piece=pcs, etc.
Return ONLY JSON like:
{
 "action":"increase",
 "product":"rice",
 "quantity":2,
 "unit":"kg"
}`
      },
      { role: "user", content: text }
    ]
  });

  // Parse and return the AI command
  return JSON.parse(response.choices[0].message.content);
}
