# Codex Handoff: Build StrideAI Full-Stack App

## One-sentence brief
Turn this starter scaffold into a production-grade full-stack AI running coach for beginner Couch-to-5K users.

## Current repo status
This repo already contains:

- Next.js App Router starter.
- Prisma schema for users, profiles, training plans, workouts, intervals, logs, check-ins, coach messages, subscriptions, and integrations.
- Baseline Couch-to-5K plan in `src/lib/training/basePlan.ts`.
- Deterministic adaptation rules in `src/lib/training/adapt.ts`.
- AI prompts and structured output schemas in `src/lib/ai`.
- API route scaffolds for onboarding, run logging, coach chat, and Realtime session creation.
- Basic landing page, onboarding wizard, plan preview, and coach chat components.

## Desired MVP outcome
A user should be able to:

1. Land on the homepage.
2. Start onboarding.
3. Enter beginner-runner details.
4. Generate or receive a personalized Couch-to-5K plan.
5. Persist that profile and plan in Postgres.
6. View the active plan in a dashboard.
7. See the next workout.
8. Log a run with RPE, soreness, pain, notes, and completion status.
9. Receive an adaptation decision.
10. Chat with an AI coach that uses their current profile, plan, and latest run.
11. Deploy the app on Vercel.

## Non-negotiable acceptance criteria

### Build and reliability
- `npm install` succeeds.
- `npx prisma generate` succeeds.
- `npm run build` succeeds.
- All TypeScript errors are resolved.
- Any tests added pass.

### Data persistence
- Onboarding persists `RunnerProfile`, `TrainingPlan`, `Workout`, and `WorkoutInterval` records.
- Run logging persists `RunLog` and updates relevant workout status.
- Coach messages are stored or at least can be stored via a service layer.
- Active plan lookup works from server routes/pages.

### Authentication
Choose one production-appropriate path:

Option A, preferred: Auth.js with Prisma adapter and OAuth provider support.
Option B: Clerk with clear env documentation.
Option C: Temporary local demo user only, but mark as MVP demo mode and leave clear TODOs.

Do not leave mutating API routes unauthenticated in production mode.

### AI and safety
- Server routes call AI providers only from the server.
- Use `OPENAI_API_KEY`, optional `OPENAI_BASE_URL`, and `OPENAI_MODEL`.
- Structured plan output is schema-validated.
- Fallback to deterministic plan if AI is unavailable or invalid.
- Deterministic safety checks run before AI calls and before adaptation.
- Red-flag symptoms stop training progression.

### UX
- Mobile-first UI.
- Clear loading, success, and error states.
- No dead buttons.
- Plan cards show intervals clearly.
- Dashboard shows the next best action.
- Safety disclaimer appears in onboarding and run logging.

### Deployment
- README includes Vercel deploy steps.
- `.env.example` is complete.
- Prisma migration instructions are clear.
- Add notes for OpenAI and Azure OpenAI usage.

## Suggested implementation phases

### Phase 1: Stabilize repo
- Run install/build.
- Fix any Next.js, Tailwind, TypeScript, ESLint, or Prisma issues.
- Add missing lockfile.
- Add basic test runner if useful.

### Phase 2: Persistence services
Create service modules:

- `src/lib/services/plans.ts`
- `src/lib/services/runs.ts`
- `src/lib/services/users.ts`
- `src/lib/services/coach.ts`

Expected behavior:

- Convert generated plan JSON to Prisma records.
- Reconstruct plan DTOs from Prisma records for UI.
- Determine next workout.
- Persist adaptation decision after run logging.

### Phase 3: Auth
- Implement selected auth provider.
- Add helper like `requireUser()` for route handlers and server pages.
- Ensure mutating API routes require authentication.
- Allow demo/development mode only if explicitly configured.

### Phase 4: Product UI
Add pages:

- `/onboarding`
- `/dashboard`
- `/plan`
- `/coach`
- `/settings`

Keep homepage as marketing + CTA.

### Phase 5: API completion
Complete:

- `POST /api/onboarding`: validate, generate/fallback plan, persist profile and plan, return plan.
- `GET /api/plans/active`: return active plan and next workout.
- `POST /api/runs`: persist log, adapt next workout, return decision.
- `POST /api/coach`: fetch user context, apply safety pre-checks, call AI, return response.
- `POST /api/realtime/session`: keep as server-only, document browser client integration.

### Phase 6: Tests and evals
Add tests for:

- `adaptAfterRun` red flags.
- `adaptAfterRun` progress/repeat/deload decisions.
- Plan JSON schema validation.
- Plan-to-Prisma mapping.
- Red-flag coach pre-check.

### Phase 7: Deployment hardening
- Add README production guide.
- Add Vercel env list.
- Add database migration instructions.
- Add rate-limiting TODO or lightweight implementation.
- Add logging without sensitive health notes.

## Recommended file additions

```txt
src/app/onboarding/page.tsx
src/app/dashboard/page.tsx
src/app/plan/page.tsx
src/app/coach/page.tsx
src/app/settings/page.tsx
src/app/api/plans/active/route.ts
src/lib/auth.ts
src/lib/services/plans.ts
src/lib/services/runs.ts
src/lib/services/users.ts
src/lib/services/coach.ts
src/lib/training/planMapper.ts
src/lib/training/nextWorkout.ts
src/components/WorkoutCard.tsx
src/components/RunLogForm.tsx
src/components/DashboardSummary.tsx
src/components/SafetyNotice.tsx
```

## Suggested implementation prompt for Codex
Use the contents of `CODEX_FIRST_PROMPT.md` as the first task prompt.

## Product edge cases to handle
- User cannot walk 20 minutes: create a pre-C25K walking base plan.
- User reports injury notes: warn and generate more conservative plan.
- User has medical concern: include clinician check reminder and conservative plan.
- User misses workout: do not shame; repeat/resume safely.
- AI call fails: return baseline plan and helpful message.
- JSON schema fails: retry once, then fallback.
- Pain > 5/10: stop progression.

## Definition of done for first complete MVP
- A new user can complete onboarding and see a stored plan.
- A returning user can open `/dashboard` and see active plan state from DB.
- User can log a run and receive stored adaptation feedback.
- User can ask coach chat for guidance and get context-aware response.
- App builds successfully and can be deployed to Vercel.
