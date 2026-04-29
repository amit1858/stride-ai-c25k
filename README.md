# StrideAI Couch-to-5K

AI-native Couch-to-5K runner onboarding, plan generation, adaptive coaching, and voice-session scaffolding.

## Run locally

```bash
cp .env.example .env.local
npm install
npx prisma generate
npm run dev
```

## Database

```bash
npx prisma migrate dev --name init
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add the env vars from `.env.example` in Project Settings → Environment Variables.
4. Deploy.

## OpenAI vs Azure OpenAI

For OpenAI, set `OPENAI_API_KEY` and `OPENAI_MODEL`.

For Azure OpenAI v1 compatibility, set `OPENAI_API_KEY`, `OPENAI_BASE_URL=https://YOUR-RESOURCE.openai.azure.com/openai/v1/`, and set `OPENAI_MODEL` to your Azure deployment name.

## Product safety

This app is not medical advice. It includes beginner-running guardrails, red-flag handling, and conservative deload/repeat logic. Users with medical concerns should consult a clinician before starting.

## Codex handoff

This repo includes Codex-ready project instructions:

- `AGENTS.md` — durable repo instructions and review rules.
- `CODEX_HANDOFF.md` — full build brief and acceptance criteria.
- `CODEX_FIRST_PROMPT.md` — paste this into Codex as the first build task.
- `README_CODEX.md` — how to run the handoff locally or through GitHub.
