import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient, OPENAI_MODEL } from "@/lib/ai/client";
import { CHAT_COACH_PROMPT, RUN_COACH_SYSTEM_PROMPT } from "@/lib/ai/prompts";

export const runtime = "nodejs";

const requestSchema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).min(1),
  profile: z.record(z.unknown()).optional(),
  latestRun: z.record(z.unknown()).optional(),
});

const RED_FLAG_RE = /chest pain|faint|severe dizziness|severe breathlessness|can't breathe|acute injury|stroke|numbness|pain.*(6|7|8|9|10)\/10/i;

export async function POST(request: Request) {
  const body = requestSchema.parse(await request.json());
  const latestUserText = [...body.messages].reverse().find((m) => m.role === "user")?.content ?? "";

  if (RED_FLAG_RE.test(latestUserText)) {
    return NextResponse.json({
      message:
        "Pause running now. Because you mentioned a possible red-flag symptom or significant pain, stop exercise and seek appropriate medical guidance before continuing. I can help you restart conservatively once you’re cleared.",
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      message:
        "For your first run, aim for easy, almost-too-slow jogging. The goal is not speed; it is finishing with confidence. Keep effort around RPE 4-6/10 and take the walk breaks fully.",
    });
  }

  const client = getOpenAIClient();
  const response = await client.responses.create({
    model: OPENAI_MODEL,
    instructions: `${RUN_COACH_SYSTEM_PROMPT}\n${CHAT_COACH_PROMPT}`,
    input: JSON.stringify({
      profile: body.profile ?? null,
      latestRun: body.latestRun ?? null,
      conversation: body.messages,
    }),
  });

  return NextResponse.json({ message: response.output_text });
}
