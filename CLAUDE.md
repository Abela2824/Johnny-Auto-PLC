# Working rules for this repository

## File creation and editing
- Create and edit every file with the **Write** and **Edit** tools only.
- Never write files from Bash (no `cat <<EOF`, `echo >`, `sed -i`, `tee`, `printf >` or similar).
- Use **Bash only** for: installing dependencies, builds, the dev server, tests, screenshots/verification commands, and git.

## Git
- Commit locally and often, one commit per meaningful step.
- Never push, add or change remotes, or run `gh` commands that publish, unless explicitly asked in the conversation.
- No destructive git commands (`reset --hard`, `clean -fd`, force operations, history rewrites) without asking.

## Project
- Vite + React 19 + TypeScript + Tailwind v4 + motion. `npm run dev`, `npm run build`, `npm run typecheck`.
- All backend-dependent UI goes through `src/api/api.ts` (documented API boundary) and is served by `src/api/mock/` until a real backend exists.
- Use only facts from johnnyautoplc.com or the client brief; anything unverified is rendered with the `Placeholder` component as `[… — TO CONFIRM]`.
