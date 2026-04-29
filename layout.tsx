import { NextResponse } from "next/server";
import { getOpenAIClient, OPENAI_MODEL } from "@/lib/ai/client";
import { onboardingInputSchema, trainingPlanJsonSchema } from "@/lib/ai/schemas";
import { PLAN_GENERATION_PROMPT, RUN_COACH_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { baselineC25KPlan } from "@/lib/training/basePlan";

export const runtime = "nodejs";

type JsonObject = Record<string, unknown>;

export async function POST(request: Request) {
  const input = onboardingInputSchema.parse(await request.json());

  if (!process.env.OPENAI_API_KEY) {
    // Developer-friendly fallback so the UI works before the API key is configured.
    return NextResponse.json(baselineC25KPlan);
  }

  const client = getOpenAIClient();
  const response = await client.responses.create({
    model: OPENAI_MODEL,
    instructions: `${RUN_COACH_SYSTEM_PROMPT}\n${PLAN_GENERATION_PROMPT}`,
    input: `User onboarding JSON:\n${JSON.stringify(input, null, 2)}\n\nGenerate the best Couch-to-5K plan for this user.`,
    text: {
      format: {
        type: "json_schema",
        name: "training_plan",
        strict: true,
        schema: trainingPlanJsonSchema as JsonObject,
      },
    },
  });

  const parsed = JSON.parse(response.output_text);
  return NextResponse.json(parsed);
}
