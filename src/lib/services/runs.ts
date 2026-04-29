import { prisma } from "@/lib/db";
import { adaptAfterRun } from "@/lib/training/adapt";

export async function logRun(userId: string, data: any) {
  const adaptation = adaptAfterRun(data);
  const log = await prisma.runLog.create({ data: { userId, ...data, adaptationDecision: adaptation.decision as any, adaptationReason: adaptation.reason } });
  if (data.workoutId && data.completed) await prisma.workout.update({ where: { id: data.workoutId }, data: { status: "COMPLETED" } });
  return { log, adaptation };
}
