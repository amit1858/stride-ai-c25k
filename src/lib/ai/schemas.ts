import { z } from "zod";

export const onboardingInputSchema = z.object({
  goal: z.string().min(2),
  experienceLevel: z.string(),
  canWalkMinutes: z.number().int().min(5).max(120),
  availableDays: z.array(z.string()).min(2).max(7),
  sessionsPerWeek: z.number().int().min(2).max(6),
  preferredCoachTone: z.string().default("calm"),
  injuryNotes: z.string().optional(),
  medicalConcern: z.boolean().default(false),
});

export const runLogSchema = z.object({
  workoutId: z.string().optional(),
  completed: z.boolean(),
  durationSec: z.number().int().positive(),
  distanceMeters: z.number().int().positive().optional(),
  rpe: z.number().int().min(1).max(10),
  soreness: z.number().int().min(0).max(10).optional(),
  painScore: z.number().int().min(0).max(10).optional(),
  notes: z.string().optional(),
});
