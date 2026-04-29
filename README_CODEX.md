# Using Codex on this repo

## Local Codex CLI path

```bash
unzip stride-ai-c25k-codex-handoff.zip
cd stride-ai-c25k
npm install
npx prisma generate
codex
```

Paste the contents of `CODEX_FIRST_PROMPT.md` into Codex.

## GitHub Codex path

1. Push this repo to GitHub.
2. Enable Codex for the repository.
3. Open an issue using `.github/ISSUE_TEMPLATE/codex-build.md` or open a PR.
4. Comment with:

```txt
@codex implement this issue. Read AGENTS.md and CODEX_HANDOFF.md first. Make the smallest coherent production-grade change, run the required checks, and summarize changed files plus remaining risks.
```

## Recommended first task

Ask Codex to implement the MVP end-to-end before optimizing voice, payments, or wearable integrations.

## Recommended next task after MVP

Ask Codex to add:

- CI workflow.
- Auth.js/Clerk production auth if not already implemented.
- Stripe billing.
- Realtime voice client page.
- Wearable/GPS integration stubs.
