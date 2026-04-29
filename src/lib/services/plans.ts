import { prisma } from "@/lib/db";
import { baselineC25KPlan, PlanDto } from "@/lib/training/basePlan";

export async function savePlan(userId: string, profile: any, plan: PlanDto = baselineC25KPlan) {
  await prisma.runnerProfile.upsert({ where: { userId }, update: profile, create: { userId, ...profile } });
  const created = await prisma.trainingPlan.create({ data: { userId, title: plan.title, status: "ACTIVE", durationWeeks: plan.durationWeeks, sessionsPerWeek: plan.sessionsPerWeek, planJson: plan as any, safetyNotes: plan.safetyNotes, adaptationRules: { type: "deterministic" }, workouts: { create: plan.workouts.map((w) => ({ weekNumber: w.weekNumber, sessionNumber: w.sessionNumber, type: "EASY_INTERVALS", title: w.title, goal: w.goal, totalMinutes: w.totalMinutes, intervals: { create: w.intervals.map((i, idx) => ({ order: idx + 1, mode: i.mode, durationSec: i.durationSec, cue: i.cue })) } })) } } });
  return created;
}

export async function getActivePlan(userId: string) { return prisma.trainingPlan.findFirst({ where: { userId, status: "ACTIVE" }, include: { workouts: { include: { intervals: true }, orderBy: [{ weekNumber: 'asc' }, { sessionNumber: 'asc' }] } } }); }
