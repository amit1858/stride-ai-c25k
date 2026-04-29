# StrideAI Couch-to-5K MVP

Full-stack Next.js + Prisma beginner running app with onboarding, personalized baseline plan, dashboard, run logging adaptation, coach chat, and demo mode.

## What is implemented
- Landing page with safety-first positioning.
- Onboarding flow that persists profile + active plan.
- Deterministic baseline Couch-to-5K plan generation.
- Dashboard + plan pages reading persisted plan data.
- Run logging API with deterministic adaptation decisions.
- Coach chat API with red-flag pre-check and demo response when no OpenAI key is configured.
- Prisma persistence for users, profiles, plans, workouts, intervals, run logs, and coach messages.
- Demo mode local user (`demo@strideai.app`) to run without auth/OpenAI.

## Run locally
```bash
cp .env.example .env.local
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Deploy to Vercel
1. Push repo to GitHub.
2. Import project in Vercel.
3. Provision Postgres (Vercel Postgres/Neon/Supabase).
4. Set env vars from `.env.example`.
5. Run migration command against production DB:
   ```bash
   npx prisma migrate deploy
   ```
6. Deploy.

## Notes
- If `OPENAI_API_KEY` is absent, app uses deterministic demo behavior.
- For Azure OpenAI set `OPENAI_BASE_URL` and `OPENAI_MODEL` deployment name.
- Product is not medical advice; red-flag symptoms trigger pause-and-refer guidance.
