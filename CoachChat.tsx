import { NextResponse } from "next/server";
import { runLogSchema } from "@/lib/ai/schemas";
import { adaptAfterRun } from "@/lib/training/adapt";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const log = runLogSchema.parse(await request.json());
  const adaptation = adaptAfterRun(log);

  // Production path:
  // 1. Authenticate user.
  // 2. Insert RunLog.
  // 3. Update Workout.status.
  // 4. Mutate next scheduled workout if adaptation requires repeat/deload.
  // 5. Persist CoachMessage.

  return NextResponse.json({ log, adaptation });
}
