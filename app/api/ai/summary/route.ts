import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || text.length < 10) {
    return new Response(JSON.stringify({ summary: "" }), { status: 200 });
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You summarize educational content clearly and concisely.",
      },
      {
        role: "user",
        content: `Summarize the following content in 3–4 concise lines:\n\n${text}`,
      },
    ],
    temperature: 0.4,
  });

  return Response.json({
    summary: completion.choices[0].message.content,
  });
}
