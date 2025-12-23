import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function parseCommand(text){
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are an inventory voice assistant.
Return ONLY valid JSON.

Actions:
- add
- increase
- decrease
- remove

JSON format:
{
  "action": "add|increase|decrease|remove",
  "product": "string",
  "quantity": number,
  "unit": "kg|g|ltr|pcs"
}

Support Hindi + English.
`
      },
      { role: "user", content: text }
    ],
    temperature: 0.2
  });

  return JSON.parse(completion.choices[0].message.content);
}
