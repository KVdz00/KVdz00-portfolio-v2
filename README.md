# KVdz00 Portfolio V2

Recruiter-focused personal portfolio for Muhammad Dzikrul Kahfi. The page presents selected work through evidence-rich case studies and a GitHub-inspired visual system.

## Stack

- React
- TypeScript
- Vite
- Plain CSS
- Phosphor Icons
- Vitest and React Testing Library

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm audit --omit=dev --audit-level=high
npm run lint
npm run format:check
npm test -- --run --maxWorkers=1
npm run typecheck
npm run build
npm run test:e2e
```

## Architecture

- `src/data/portfolio.ts` owns typed public content.
- `src/components/` contains focused page sections and interactive controls.
- `src/styles.css` owns design tokens, layout, responsive behavior, themes, and reduced motion.
- Core portfolio content is local and has no runtime API dependency.
