export type Interval = { mode: "walk" | "run" | "recovery"; durationSec: number; cue?: string };
export type WorkoutDto = { weekNumber: number; sessionNumber: number; title: string; goal: string; totalMinutes: number; intervals: Interval[] };
export type PlanDto = { title: string; durationWeeks: number; sessionsPerWeek: number; safetyNotes: string[]; workouts: WorkoutDto[] };

export const baselineC25KPlan: PlanDto = {
  title: "StrideAI Beginner 5K",
  durationWeeks: 8,
  sessionsPerWeek: 3,
  safetyNotes: ["This is not medical advice.", "Stop and seek medical guidance for chest pain, fainting, severe dizziness, severe breathlessness, neurological symptoms, or pain > 5/10."],
  workouts: Array.from({ length: 8 }).flatMap((_, w) =>
    Array.from({ length: 3 }).map((__, s) => {
      const runMin = Math.min(1 + w, 8);
      const walkMin = Math.max(1, 2 - Math.floor(w / 3));
      return {
        weekNumber: w + 1,
        sessionNumber: s + 1,
        title: `Week ${w + 1} Session ${s + 1}`,
        goal: "Easy conversational effort, finish feeling in control.",
        totalMinutes: 30,
        intervals: [
          { mode: "walk" as const, durationSec: 300, cue: "Warm up walk" },
          ...Array.from({ length: 6 }).flatMap(() => [
            { mode: "run" as const, durationSec: runMin * 60, cue: "Easy jog" },
            { mode: "walk" as const, durationSec: walkMin * 60, cue: "Recovery walk" },
          ]),
          { mode: "recovery" as const, durationSec: 300, cue: "Cool down walk" },
        ],
      };
    })
  ),
};
