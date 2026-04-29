import { NextResponse } from "next/server";
import { OPENAI_REALTIME_MODEL } from "@/lib/ai/client";

export const runtime = "nodejs";

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });

  if (process.env.OPENAI_BASE_URL) {
    return NextResponse.json(
      { error: "This starter uses OpenAI's Realtime endpoint for browser voice. Use text coaching for Azure OpenAI or add Azure-specific voice support." },
      { status: 400 }
    );
  }

  const sessionConfig = {
    session: {
      type: "realtime",
      model: OPENAI_REALTIME_MODEL,
      instructions:
        "You are StrideAI, a safe beginner running coach. Give short spoken cues. Prioritize safety, easy pacing, and confidence.",
      audio: {
        output: { voice: "alloy" },
      },
    },
  };

  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionConfig),
  });

  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  return NextResponse.json(await response.json());
}
