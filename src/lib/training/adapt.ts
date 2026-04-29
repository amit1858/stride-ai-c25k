export type RunLogInput = { completed: boolean; rpe: number; soreness?: number; painScore?: number; notes?: string };
export function hasRedFlagText(text?: string) {
  return !!text && /chest pain|faint|severe dizziness|severe breathlessness|can.t breathe|numbness|acute injury/i.test(text);
}
export function adaptAfterRun(log: RunLogInput) {
  if ((log.painScore ?? 0) > 5 || hasRedFlagText(log.notes)) return { decision: "PAUSE_AND_REFER", reason: "Red-flag symptoms detected. Stop running and seek medical guidance." };
  if (!log.completed || log.rpe >= 8 || (log.soreness ?? 0) >= 7) return { decision: "REPEAT_WORKOUT", reason: "Repeat this session to rebuild consistency safely." };
  if (log.rpe <= 4 && (log.soreness ?? 0) <= 3) return { decision: "PROGRESS", reason: "Good recovery and manageable effort. Progress as planned." };
  return { decision: "REPEAT_WEEK", reason: "Hold steady for one more week before progressing." };
}
