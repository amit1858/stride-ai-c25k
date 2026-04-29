# StrideAI Codex Instructions

## Project mission
Build StrideAI into a production-grade, AI-native Couch-to-5K full-stack app. The app should onboard beginner runners, generate a personalized plan, persist plans and run logs, adapt future workouts using deterministic safety rules plus AI coaching, and be deployable on Vercel with Postgres and OpenAI or Azure OpenAI.

## Product priorities
1. Safety before performance. Beginner runners should progress conservatively.
2. Habit formation before optimization. The app should help users recover from missed runs without shame.
3. Structured data before clever prose. Plans, workouts, intervals, and run logs must be valid, persistable, and testable.
4. Keep AI behind server routes. Never expose provider API keys or privileged prompts to the browser.
5. Degrade gracefully when no AI key is present by using the deterministic baseline Couch-to-5K plan.

## Technical stack
- Next.js App Router with TypeScript.
- Prisma ORM with Postgres.
- Zod for request validation and structured AI output validation.
- OpenAI SDK, supporting both OpenAI and Azure OpenAI through `OPENAI_BASE_URL`.
- Tailwind CSS for UI.
- Vercel deployment target.

## Required build checks
Run these before considering work complete:

```bash
npm install
npx prisma generate
npm run build
```

If tests are added, also run:

```bash
npm test
```

## Architecture rules
- Keep domain logic in `src/lib`, not inside React components.
- Keep AI prompts in `src/lib/ai/prompts.ts` or adjacent dedicated prompt files.
- Keep plan adaptation deterministic in `src/lib/training/adapt.ts`; do not rely on the model for red-flag safety decisions.
- Keep API route handlers thin: validate input, authorize user, call domain services, return typed JSON.
- Prefer small, composable components.
- Use server components where possible; use client components only for interactivity.
- Add typed DTOs for API inputs/outputs.

## Safety and privacy rules
- Never log raw health notes, injury notes, medical concerns, or OpenAI/Azure keys.
- If user reports chest pain, fainting, severe dizziness, severe breathlessness, neurological symptoms, acute injury, or pain > 5/10, the app must instruct them to stop running and seek appropriate medical guidance.
- The product is not medical advice. Keep disclaimers visible during onboarding and before starting plans.
- Store only necessary health-adjacent data and allow future export/deletion.

## AI behavior requirements
- Plan generation must return structured JSON and be validated before storage.
- If structured AI generation fails, fall back to the deterministic baseline plan.
- Coach chat should use the user profile, active plan, latest workout, and latest run log where available.
- Coach chat must keep responses concise, practical, and supportive.
- Add deterministic regex/rule pre-checks for red flags before any model call.

## UI requirements
- Landing page: clear value proposition, safety disclaimer, CTA to onboarding.
- Onboarding: goal, current fitness, walking ability, weekly availability, injury notes, medical concern, coaching tone.
- Dashboard: active plan summary, next workout, week progress, recent run logs.
- Plan page: week/session cards with intervals and status.
- Log run page/modal: completed, duration, distance optional, RPE, soreness, pain, notes.
- Coach chat: current context-aware AI running coach.
- Settings: profile, env/deployment guidance is not shown to end users.

## Review guidelines
When reviewing code, treat these as P1 issues:
- Any API key exposure to client code.
- Missing red-flag safety handling in coach or run-log flows.
- AI JSON accepted without schema validation.
- API routes that mutate user data without authorization checks.
- Build failures, TypeScript errors, or Prisma generation failures.
- UI paths that silently fail without user feedback.

## Handoff expectation
When implementing, work in phases. After each phase, summarize changed files, commands run, and remaining risks. Prefer one focused pull request per phase.
