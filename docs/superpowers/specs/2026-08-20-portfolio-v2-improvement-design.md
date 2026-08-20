# Portfolio V2 Improvement Design

Date: 2026-08-20
Branch: `portfolio-v2-improvements`

## Goal

Raise the portfolio from a strong visual presentation into a stronger developer portfolio by improving project evidence, copy specificity, maintainability, accessibility, and lightweight engineering checks without redesigning the site from scratch.

## Scope

Keep the current visual language, responsive layout, dark/light theme, project-row composition, typography direction, and overall site structure.

Change the following areas:

- Rewrite generic portfolio copy so it describes actual work and decisions.
- Turn selected work into tighter mini case studies.
- Use a hybrid visual strategy: real screenshots where suitable assets exist, repo-informed previews where they remain the better presentation.
- Split the current monolithic `App.tsx` into focused data, section, and reusable UI modules.
- Split CSS enough to isolate base/layout styling from project-preview styling.
- Add reduced-motion support and narrow overly broad transitions.
- Add lint, formatting checks, and a lightweight Playwright smoke suite.
- Rebalance the skills section toward technologies with stronger project evidence.

## Non-goals

- No framework migration.
- No CMS, database, authentication, or backend.
- No full visual redesign.
- No animation library.
- No large testing framework beyond focused browser smoke checks.
- No invented metrics, impact claims, client results, or project facts.
- No forced public links for private repositories.

## Content Strategy

### Hero

Replace generic language such as broad claims about clean interfaces and maintainable code with a concise description of what is actually built.

The hero should communicate three things quickly:

1. The work spans web applications, Windows utilities, and smaller tools.
2. The portfolio contains both private and public project evidence.
3. The user can go directly to selected work or contact.

The copy should stay short. No manifesto language, motivational slogans, or generic engineering values.

### About

Reduce the current manifesto-style section. The replacement should explain practical working habits that are visible in the repositories, such as architecture notes, explicit native/web boundaries, CI checks, and iterative UI refinement.

Do not claim qualities that can instead be demonstrated by projects.

### Selected Work

Each featured project should expose a compact case-study model:

- `name`
- `summary`
- `stack`
- `status`
- `problem`
- `technicalDecision`
- `result`
- `preview`
- optional `links`

The UI should not become much taller than the current project rows. The case-study fields should be compact and scannable.

For results, use only verifiable statements such as delivered features, implemented architecture, packaging checks, or completed workflows. Do not fabricate business metrics.

### Process

Keep the section only if it becomes concrete. Process steps should describe actual repository workflow rather than generic design philosophy.

Recommended direction:

1. Inspect the task and constraints.
2. Write or update the relevant plan/architecture notes when scope warrants it.
3. Implement and review the actual behavior.
4. Run checks, inspect responsive behavior, and refine.

If the rewritten section still adds little beyond the project evidence, remove it instead of filling space.

### Connect

Use direct, practical language. Avoid generic phrases such as "meaningful collaborations" or "clarity, not noise."

## Project Evidence and Preview Strategy

Use a hybrid model.

### Real screenshots

Prefer a real screenshot when:

- the project has a mature interface worth showing,
- a screenshot can be shown without exposing private data,
- the asset is visually clear at portfolio-card scale.

Screenshots may be cropped or sanitized. A screenshot does not imply the repository is public.

### Repo-informed previews

Keep the existing generated preview when:

- no suitable screenshot is available,
- the current preview communicates the product better at small size,
- a real screenshot would be unreadable or expose information that should remain private.

The `Repo-informed preview` label should remain on generated previews only. Real screenshots should not use that label.

### Asset discovery

During implementation, inspect relevant project repositories for existing screenshots or visual assets before creating new ones. Do not invent screenshots.

## Source Architecture

Target structure:

```text
src/
  components/
    Header.tsx
    ThemeToggle.tsx
    ProjectRow.tsx
    ProjectPreview.tsx
  sections/
    Hero.tsx
    About.tsx
    Work.tsx
    Skills.tsx
    Process.tsx
    Connect.tsx
  data/
    projects.ts
    skills.ts
    process.ts
  types/
    portfolio.ts
  styles/
    base.css
    layout.css
    projects.css
  App.tsx
  main.tsx
```

This is a target, not a requirement to create a file for every trivial fragment. Components should only be split when they have a clear responsibility.

### Responsibilities

`App.tsx`
- Compose top-level sections only.
- Keep theme state wiring minimal or delegate it to the header/theme control.

`data/projects.ts`
- Hold portfolio project content and case-study metadata.

`ProjectRow.tsx`
- Render one project consistently.
- Remain unaware of repository internals.

`ProjectPreview.tsx`
- Route to screenshot or generated preview based on project data.

Section components
- Own semantic section markup and section-specific layout only.

## Styling Strategy

Preserve the current tokens and visual system.

Split CSS into:

- `base.css`: tokens, reset, body, focus states, reduced motion.
- `layout.css`: header, hero, sections, project-row layout, responsive rules.
- `projects.css`: generated project preview visuals.

Do not introduce CSS-in-JS or a new styling framework.

## Accessibility

Keep the current strengths:

- skip link,
- semantic landmarks,
- focus-visible states,
- accessible theme button,
- meaningful section labelling.

Add:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Also replace the current broad `:where(body, body *)` transition rule with transitions on the components that actually need them.

## Skills Presentation

Group skills by evidence and current use rather than giving every skill equal visual weight.

Suggested structure:

### Primary

- TypeScript
- React
- Tauri
- Rust
- Laravel
- PHP
- SQL / relational data
- Git / GitHub Actions

### Also used

- Java / Fabric
- Vite
- Tailwind CSS
- Alpine.js
- Figma
- Blender

The final list should reflect the repositories inspected during implementation.

## Quality Gates

Keep the existing:

- `npm run typecheck`
- `npm run build`

Add:

- ESLint
- Prettier or equivalent formatting check
- Playwright browser smoke tests

Expected scripts:

```text
lint
format:check
typecheck
build
test:e2e
```

### Browser smoke coverage

At minimum verify:

1. Page loads without runtime error.
2. Primary navigation anchors work.
3. Theme toggle changes and persists theme.
4. Contact links render with expected destinations.
5. Mobile viewport has no document-level horizontal overflow.
6. A reduced-motion emulation path does not depend on animation for access to content.

Do not add unit tests simply to increase test count.

## SEO

Keep the existing canonical, Open Graph, Twitter card, JSON-LD, favicon, Apple touch icon, and theme-color setup.

Update title/description copy only if the portfolio copy changes enough to make the current metadata inaccurate.

## Validation

Implementation is complete when:

- `App.tsx` is reduced to composition-level responsibilities.
- Project content lives outside component implementation.
- Selected projects show concrete technical evidence.
- Generic manifesto copy is removed or rewritten.
- Hybrid real/generated previews are used where appropriate.
- Reduced-motion handling exists.
- Broad global transitions are removed.
- `lint`, `format:check`, `typecheck`, `build`, and `test:e2e` pass.
- Desktop and mobile layouts preserve the existing visual identity without horizontal overflow.
- No project claim or metric has been invented.

## Implementation Order

1. Refactor data and component boundaries without intentional visual change.
2. Add reduced-motion support and quality tooling.
3. Rewrite portfolio copy and project case-study data.
4. Inspect project repositories for usable real screenshots and integrate the hybrid preview strategy.
5. Run browser checks at desktop and mobile widths.
6. Fix regressions and make only targeted visual refinements.
