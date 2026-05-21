# AGENTS.md

## Cursor Cloud specific instructions

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite dev server (excalidraw-app) | `yarn start` | 3001 | Only required service; fully client-side SPA with local storage persistence |

No databases, Docker, or external services are needed for core development. Firebase, WebSocket collab, and AI backend are optional external services that the app degrades gracefully without.

### Quick reference

Commands are documented in the root `package.json` and in `CLAUDE.md`. Key ones:

- **Dev server:** `yarn start` (runs Vite on port 3001)
- **Type check:** `yarn test:typecheck`
- **Lint:** `yarn test:code` (ESLint, zero warnings enforced)
- **Format check:** `yarn test:other` (Prettier)
- **Auto-fix lint + format:** `yarn fix`
- **Tests:** `yarn test:update` (vitest, also updates snapshots)
- **Single test run (no snapshots):** `yarn test:app --watch=false`

### Gotchas

- The `yarn start` script first runs `yarn` (re-validates deps) then `vite`, so it takes a few extra seconds on first start.
- The Vite checker plugin reports ESLint and TypeScript errors as "ERROR" banners in the terminal even when there are 0 errors/warnings—this is normal, not a failure.
- The pre-commit hook in `.husky/pre-commit` is commented out (does not run `lint-staged`), so there is no automatic pre-commit check.
- Tests use `jsdom` environment with `vitest-canvas-mock`; no browser or headed environment is needed for automated tests.
- Firebase config warnings (`Error JSON parsing firebase config`) appear in test output when `VITE_APP_FIREBASE_CONFIG` is not set—these are harmless and do not affect test results.
