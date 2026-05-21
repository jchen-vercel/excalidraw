# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Excalidraw is a Yarn workspaces monorepo. The main web application lives in `excalidraw-app/` and runs on **port 3001** via Vite. All development commands are in the root `package.json` and documented in `CLAUDE.md`.

### Running the dev server

```bash
yarn start          # starts Vite dev server at http://localhost:3001
```

The `yarn start` script internally runs `yarn --cwd ./excalidraw-app start`, which first runs `yarn` (to ensure workspace deps are linked) then starts Vite. The app works fully client-side; no external services are required for core drawing functionality.

### Key commands reference

See `CLAUDE.md` and root `package.json` scripts. Quick summary:

| Task | Command |
|---|---|
| Lint (ESLint) | `yarn test:code` |
| Format check (Prettier) | `yarn test:other` |
| TypeScript check | `yarn test:typecheck` |
| Run tests | `yarn test:update` (updates snapshots) or `yarn test:app --watch=false` |
| Auto-fix lint+format | `yarn fix` |
| Full CI-equivalent check | `yarn test:all` |

### Non-obvious caveats

- The `vite-plugin-checker` plugin runs ESLint and TypeScript checks inside the Vite dev server. You will see `ERROR [ESLint] Found 0 error and 0 warning` and `ERROR [TypeScript] Found 0 errors` in the terminal output — these are **not actual errors**, just the plugin's output format when zero issues are found.
- Firebase config warnings (`Error JSON parsing firebase config`) appear during tests and in the dev server console. These are benign — the app gracefully degrades without Firebase.
- The pre-commit hook in `.husky/pre-commit` is commented out (lint-staged is not active).
- Tests use `vitest` with `jsdom` environment and `vitest-canvas-mock`.
