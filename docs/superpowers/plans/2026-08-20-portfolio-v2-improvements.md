# Portfolio V2 Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the existing portfolio without redesigning it by making project evidence more concrete, copy more specific, source files easier to maintain, accessibility stronger, and quality checks reproducible.

**Architecture:** Keep React 19 + Vite and the existing visual system. First add browser characterization tests, then extract data/components, split CSS by responsibility, replace generic copy with repo-backed case-study content, and audit project repositories for safe real screenshots before deciding whether each preview stays generated or becomes image-based.

**Tech Stack:** React 19, TypeScript 5.8, Vite 7, plain CSS, Phosphor Icons, ESLint, Prettier, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-20-portfolio-v2-improvement-design.md`

## Global Constraints

- Keep the current visual language, responsive layout, dark/light theme, project-row composition, typography direction, and overall site structure.
- No framework migration.
- No CMS, database, authentication, or backend.
- No full visual redesign.
- No animation library.
- No invented metrics, impact claims, client results, or project facts.
- No forced public links for private repositories.
- Use real screenshots only when a safe existing asset is available and legible at portfolio scale.
- Keep repo-informed generated previews when no suitable screenshot exists.
- Do not use em dashes in user-facing portfolio copy.
- Avoid generic manifesto language and generic AI-style portfolio slogans.

---

## File Map

### New files

- `eslint.config.js` - flat ESLint config for TypeScript and React.
- `.prettierignore` - generated/vendor paths excluded from formatting checks.
- `playwright.config.ts` - browser smoke-test configuration.
- `tests/portfolio.spec.ts` - desktop, mobile, theme, navigation, contact, and reduced-motion smoke tests.
- `src/types/portfolio.ts` - portfolio domain types.
- `src/data/projects.ts` - selected project case-study data.
- `src/data/skills.ts` - primary and secondary skill groups.
- `src/data/process.ts` - concrete process steps.
- `src/components/ThemeToggle.tsx` - theme state control.
- `src/components/Header.tsx` - site header/navigation.
- `src/components/ProjectRow.tsx` - one selected-work row.
- `src/components/ProjectPreview.tsx` - generated preview router, with real-image rendering only if the asset audit justifies it.
- `src/sections/Hero.tsx` - hero section.
- `src/sections/About.tsx` - factual about section.
- `src/sections/Work.tsx` - selected work section.
- `src/sections/Skills.tsx` - skills section.
- `src/sections/Process.tsx` - concrete process section.
- `src/sections/Connect.tsx` - contact section.
- `src/styles/base.css` - theme tokens, reset, base typography, focus, reduced motion.
- `src/styles/layout.css` - header, sections, project-row layout, responsive rules.
- `src/styles/projects.css` - generated project-preview visuals.

### Modified files

- `package.json` - scripts and dev dependencies.
- `package-lock.json` - dependency lock update from `npm install`.
- `src/App.tsx` - reduced to top-level composition.
- `src/main.tsx` - import split CSS files.
- `index.html` - metadata copy aligned with the rewritten portfolio.
- `README.md` - document checks and project structure.

### Removed file

- `src/styles.css` - removed only after all rules are moved into the three focused stylesheet files and visual checks pass.

---

### Task 1: Add quality tooling and browser characterization tests

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `eslint.config.js`
- Create: `.prettierignore`
- Create: `playwright.config.ts`
- Create: `tests/portfolio.spec.ts`

**Interfaces:**
- Produces scripts: `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build`, `npm run test:e2e`.
- Produces a browser regression suite used by every later task.

- [ ] **Step 1: Install focused dev tooling**

Run:

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals prettier @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Add scripts to `package.json`**

Use this scripts block:

```json
{
  "dev": "vite --host 127.0.0.1",
  "build": "tsc -b && vite build",
  "preview": "vite preview --host 127.0.0.1",
  "lint": "eslint .",
  "format:check": "prettier --check .",
  "typecheck": "tsc -b --pretty false",
  "test:e2e": "playwright test"
}
```

- [ ] **Step 3: Create `eslint.config.js`**

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "playwright-report", "test-results"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
);
```

- [ ] **Step 4: Create `.prettierignore`**

```text
node_modules
dist
playwright-report
test-results
public/*.png
```

- [ ] **Step 5: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
```

- [ ] **Step 6: Write characterization tests in `tests/portfolio.spec.ts`**

```ts
import { expect, test } from "@playwright/test";

test("renders core portfolio sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Muhammad Dzikrul Kahfi/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected Work" })).toBeAttached();
  await expect(page.getByText("Liquid Utility", { exact: true })).toBeVisible();
  await expect(page.getByText("ModToggle", { exact: true })).toBeVisible();
});

test("primary navigation reaches sections", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/#about$/);
});

test("theme toggle persists the selected theme", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to light mode/i });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("contact destinations are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /github.com\/KVdz00/i })).toHaveAttribute(
    "href",
    "https://github.com/KVdz00",
  );
  await expect(page.getByRole("link", { name: /kahfiworks.id@gmail.com/i })).toHaveAttribute(
    "href",
    "mailto:kahfiworks.id@gmail.com",
  );
});

test("document does not overflow horizontally", async ({ page }) => {
  await page.goto("/");
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});
```

- [ ] **Step 7: Run the baseline suite**

Run:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Expected: existing code may need formatting/lint cleanup before all five pass, but no visual or content change is allowed in this task.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json eslint.config.js .prettierignore playwright.config.ts tests/portfolio.spec.ts
git commit -m "test: add portfolio quality gates"
```

---

### Task 2: Extract portfolio data and types without changing visible content

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/process.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces `Project`, `PreviewKind`, `ProcessStep`, and `SkillGroup` types.
- Produces `projects`, `skillGroups`, and `processSteps` arrays for later section components.

- [ ] **Step 1: Run characterization tests before refactor**

```bash
npm run test:e2e
```

Expected: PASS.

- [ ] **Step 2: Create `src/types/portfolio.ts`**

```ts
export type PreviewKind = "utility" | "arindra" | "medan" | "portfolio" | "modtoggle";

export type Project = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  outcome: string;
  status: string;
  preview: PreviewKind;
};

export type ProcessStep = {
  id: string;
  title: string;
  body: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};
```

- [ ] **Step 3: Move the existing arrays unchanged**

Move `projects` to `src/data/projects.ts`, `skillGroups` to `src/data/skills.ts`, and `processSteps` to `src/data/process.ts`. Preserve every visible string in this task.

Example export shape:

```ts
import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  // Copy the current five project objects exactly.
];
```

Do the same with `SkillGroup` and `ProcessStep`.

- [ ] **Step 4: Import the extracted data into `App.tsx`**

```ts
import { processSteps } from "./data/process";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import type { Project } from "./types/portfolio";
```

Keep `ProjectPreview` behavior unchanged for now.

- [ ] **Step 5: Verify behavior did not change**

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/types src/data src/App.tsx
git commit -m "refactor: extract portfolio data"
```

---

### Task 3: Split `App.tsx` into focused components and sections

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/ProjectRow.tsx`
- Create: `src/components/ProjectPreview.tsx`
- Create: `src/sections/Hero.tsx`
- Create: `src/sections/About.tsx`
- Create: `src/sections/Work.tsx`
- Create: `src/sections/Skills.tsx`
- Create: `src/sections/Process.tsx`
- Create: `src/sections/Connect.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- `ThemeToggle` owns local-storage theme state and updates `document.documentElement` plus `theme-color`.
- `Header` renders brand, nav, theme control, and availability text.
- `ProjectRow` consumes `Project`.
- `ProjectPreview` consumes `PreviewKind`.
- Each section owns one semantic `<section>` only.

- [ ] **Step 1: Extract `ThemeToggle` first**

Move `Theme`, `themeStorageKey`, `getInitialTheme`, the state, and the effect from `App.tsx` into `src/components/ThemeToggle.tsx`.

The component API is intentionally zero-prop:

```ts
export function ThemeToggle() {
  // existing theme behavior unchanged
}
```

- [ ] **Step 2: Extract `Header`**

`Header.tsx` imports `ThemeToggle` and preserves the existing nav anchors exactly: `#work`, `#about`, `#skills`, `#process`, `#connect`.

- [ ] **Step 3: Extract `ProjectPreview`**

Move all existing generated preview markup out of `App.tsx` without changing class names or strings.

Signature:

```ts
import type { PreviewKind } from "../types/portfolio";

export function ProjectPreview({ type }: { type: PreviewKind }) {
  // existing generated preview switch/branches
}
```

- [ ] **Step 4: Extract `ProjectRow`**

Signature:

```ts
import type { Project } from "../types/portfolio";

export function ProjectRow({ project }: { project: Project }) {
  // existing article markup
}
```

- [ ] **Step 5: Extract six section components**

Each component owns the existing markup for its section. `Work` imports `projects` and maps to `ProjectRow`; `Skills` imports `skillGroups`; `Process` imports `processSteps`.

- [ ] **Step 6: Reduce `App.tsx` to composition**

Target shape:

```tsx
import { Header } from "./components/Header";
import { About } from "./sections/About";
import { Connect } from "./sections/Connect";
import { Hero } from "./sections/Hero";
import { Process } from "./sections/Process";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Process />
        <Connect />
      </main>
      <footer className="site-footer">
        <span>Copyright 2026 Muhammad Dzikrul Kahfi</span>
        <span>KV</span>
      </footer>
    </>
  );
}

export default App;
```

- [ ] **Step 7: Verify the refactor**

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: PASS, with no intended visual or copy changes.

- [ ] **Step 8: Commit**

```bash
git add src/components src/sections src/App.tsx
git commit -m "refactor: split portfolio components"
```

---

### Task 4: Split CSS and add reduced-motion support

**Files:**
- Create: `src/styles/base.css`
- Create: `src/styles/layout.css`
- Create: `src/styles/projects.css`
- Modify: `src/main.tsx`
- Delete after verification: `src/styles.css`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- Import order must be `base.css`, then `layout.css`, then `projects.css`.
- Generated preview class names must remain unchanged during the split.

- [ ] **Step 1: Add a reduced-motion browser test that fails on current CSS**

Append to `tests/portfolio.spec.ts`:

```ts
test("reduced motion disables smooth scrolling and long transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const values = await page.evaluate(() => {
    const html = getComputedStyle(document.documentElement);
    const body = getComputedStyle(document.body);
    return {
      scrollBehavior: html.scrollBehavior,
      bodyTransitionDuration: body.transitionDuration,
    };
  });

  expect(values.scrollBehavior).toBe("auto");
  expect(values.bodyTransitionDuration).not.toContain("0.42s");
});
```

- [ ] **Step 2: Run the new test and verify failure**

```bash
npm run test:e2e -- --grep "reduced motion"
```

Expected: FAIL because the current stylesheet forces smooth scrolling and global transitions.

- [ ] **Step 3: Move base rules to `src/styles/base.css`**

Move theme variables, resets, `html`, `body`, anchors, focus-visible, selection, skip link, and `.sr-only` into `base.css`.

Remove this rule completely:

```css
:where(body, body *) {
  transition-property: color, background-color, border-color, box-shadow, fill, stroke;
  transition-duration: 420ms;
  transition-timing-function: ease;
}
```

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

Keep explicit transitions only on interactive components that already define them, such as `.theme-switch`, nav links, project rows, and contact links.

- [ ] **Step 4: Move layout rules to `src/styles/layout.css`**

Move header, hero, about, work-row layout, skills, process, connect, footer, and responsive layout rules. Do not move generated preview internals here.

- [ ] **Step 5: Move generated preview rules to `src/styles/projects.css`**

Move `.project-preview` plus all `.utility`, `.liquid-*`, `.arindra-*`, `.medan-*`, `.portfolio`, `.cyber-*`, `.modtoggle*` rules and their preview-specific responsive overrides.

- [ ] **Step 6: Update `src/main.tsx` imports**

```ts
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/projects.css";
```

- [ ] **Step 7: Run checks before deleting the old stylesheet**

```bash
npm run typecheck
npm run build
npm run test:e2e
```

Expected: PASS.

- [ ] **Step 8: Delete `src/styles.css` and rerun checks**

```bash
rm src/styles.css
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/styles src/main.tsx tests/portfolio.spec.ts src/styles.css
git commit -m "refactor: split styles and respect reduced motion"
```

---

### Task 5: Replace generic copy with concrete project evidence

**Files:**
- Modify: `src/types/portfolio.ts`
- Modify: `src/data/projects.ts`
- Modify: `src/data/skills.ts`
- Modify: `src/data/process.ts`
- Modify: `src/sections/Hero.tsx`
- Modify: `src/sections/About.tsx`
- Modify: `src/sections/Process.tsx`
- Modify: `src/sections/Connect.tsx`
- Modify: `src/components/ProjectRow.tsx`
- Modify: `tests/portfolio.spec.ts`

**Interfaces:**
- `Project` changes from `outcome` to the case-study fields `problem`, `technicalDecision`, and `result`.
- Replace the self-referential previous `Portfolio` project with `Filsafit`.

- [ ] **Step 1: Add failing content assertions**

Append to `tests/portfolio.spec.ts`:

```ts
test("shows concrete case-study evidence", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Filsafit", { exact: true })).toBeVisible();
  await expect(page.getByText("Problem", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Technical decision", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Result", { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/clarity over cleverness/i)).toHaveCount(0);
  await expect(page.getByText(/meaningful collaborations/i)).toHaveCount(0);
});
```

- [ ] **Step 2: Run the test and verify failure**

```bash
npm run test:e2e -- --grep "concrete case-study evidence"
```

Expected: FAIL because `Filsafit` and the new case-study labels do not exist yet.

- [ ] **Step 3: Update the `Project` type**

```ts
export type PreviewKind = "utility" | "arindra" | "medan" | "filsafit" | "modtoggle";

export type Project = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  status: string;
  problem: string;
  technicalDecision: string;
  result: string;
  preview: PreviewKind;
};
```

- [ ] **Step 4: Replace project data with these verified case-study strings**

Use these five projects in this order:

```ts
export const projects: Project[] = [
  {
    id: "01",
    name: "Liquid Utility",
    summary: "Windows utility that combines game launching, hardware monitoring, system cleanup, local media tools, and app settings.",
    stack: ["Tauri", "React", "TypeScript", "Rust"],
    status: "Private Tauri app",
    problem: "Put several Windows maintenance and launcher workflows behind one consistent desktop shell.",
    technicalDecision: "Keep the interface in React, route native operations through Tauri and Rust commands, and verify packaged builds with smoke checks.",
    result: "A packaged desktop app with native-backed modules instead of a browser-only mock.",
    preview: "utility",
  },
  {
    id: "02",
    name: "Filsafit",
    summary: "Philosophy web app with an encyclopedia, school comparison, a scored quiz, profiles, history, auth, and shareable result cards.",
    stack: ["Next.js", "React", "TypeScript", "Supabase"],
    status: "Private web app",
    problem: "Combine philosophy content with interactive scoring and account-backed history without turning every route into a client-heavy page.",
    technicalDecision: "Use Next.js App Router server and client boundaries, Supabase Postgres, Auth and RLS, and separate tested quiz-scoring logic.",
    result: "A working full-stack product with CI covering TypeScript, lint, and production builds.",
    preview: "filsafit",
  },
  {
    id: "03",
    name: "Arindra Production Web",
    summary: "Laravel production-house website with service pages, portfolio and showreel content, forms, authentication, and admin workflows.",
    stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js"],
    status: "Client-facing build",
    problem: "Present production work publicly while keeping content and inquiries manageable from the application.",
    technicalDecision: "Use Laravel and Blade for the server-rendered app, Tailwind CSS for layout, and Alpine.js for small interactive pieces.",
    result: "A client-facing site with public presentation and administration workflows in one codebase.",
    preview: "arindra",
  },
  {
    id: "04",
    name: "Website Kota Medan",
    summary: "PHP and MySQL city information site covering landmarks, tourism, culture, local products, reviews, users, and admin workflows.",
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
    status: "School project",
    problem: "Organize a broad set of city content into a public site with account and administration features.",
    technicalDecision: "Keep the stack simple with server-rendered PHP, MySQL persistence, and JavaScript and CSS for interaction and presentation.",
    result: "A complete school project with public content, user features, and admin management.",
    preview: "medan",
  },
  {
    id: "05",
    name: "ModToggle",
    summary: "Minecraft Fabric client mod for controlling selected mod behavior from an in-game UI and commands.",
    stack: ["Java", "Fabric API", "Gradle"],
    status: "Minecraft utility",
    problem: "Make mod toggling manageable without editing files or leaving the normal game workflow.",
    technicalDecision: "Use a client-side Fabric mod with Java, an O-key screen, slash commands, JSON persistence, and soft suppression where hard unloading is not possible.",
    result: "A working in-game controller for persisted mod-toggle state.",
    preview: "modtoggle",
  },
];
```

- [ ] **Step 5: Update `ProjectRow` to render compact case-study facts**

Replace the two-item `Outcome/Status` block with:

```tsx
<dl className="project-facts">
  <div>
    <dt>Problem</dt>
    <dd>{project.problem}</dd>
  </div>
  <div>
    <dt>Technical decision</dt>
    <dd>{project.technicalDecision}</dd>
  </div>
  <div>
    <dt>Result</dt>
    <dd>{project.result}</dd>
  </div>
  <div>
    <dt>Status</dt>
    <dd>{project.status}</dd>
  </div>
</dl>
```

Adjust `.project-facts` spacing only as much as needed to keep rows readable and not excessively tall.

- [ ] **Step 6: Replace hero copy**

Use:

```text
I build web apps, Windows utilities, and small tools. The work here comes from private codebases, client-facing sites, school projects, and experiments I still use to test ideas.
```

Replace the hero note with:

```text
Recent work includes a Tauri Windows utility, a Next.js and Supabase philosophy app, Laravel sites with admin workflows, and a Fabric client mod.
```

Keep `Based in Indonesia` and `UTC +7`.

- [ ] **Step 7: Replace the About manifesto with factual copy**

Use heading:

```text
I work across browser UI, backend workflows, and native desktop boundaries.
```

Use paragraph:

```text
When a project grows past a simple page, I keep the important decisions in the repo: architecture notes, task plans, CI checks, and smoke tests for behavior that is easy to break.
```

Replace the current principle list with this evidence list:

```text
01  React UI and Rust native commands in Liquid Utility
02  Typecheck, lint, and build CI in Filsafit
03  Auth, content, and admin workflows in Laravel projects
04  Responsive browser checks in this portfolio
```

Change the section label from `Manifesto` to `In practice`.

- [ ] **Step 8: Replace process data with concrete steps**

```ts
export const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Define the actual flow",
    body: "Write down the screens, data, native actions, or failure cases that need to work.",
  },
  {
    id: "02",
    title: "Separate the risky boundaries",
    body: "Keep browser UI, server and data work, and native system access explicit when the stack crosses those lines.",
  },
  {
    id: "03",
    title: "Build the end-to-end path",
    body: "Get the real workflow working before adding extra polish or secondary states.",
  },
  {
    id: "04",
    title: "Run the checks and inspect it",
    body: "Typecheck, build, smoke-test the paths that matter, then inspect desktop and mobile layouts.",
  },
];
```

Use process heading:

```text
The workflow changes with the project, but these four steps show up often.
```

Use intro paragraph:

```text
The point is to get the real path working, keep risky boundaries visible, and verify what can break before calling it done.
```

- [ ] **Step 9: Rebalance skills**

Use only two groups:

```ts
export const skillGroups: SkillGroup[] = [
  {
    title: "Primary",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tauri",
      "Rust",
      "Laravel",
      "PHP",
      "Supabase",
      "SQL",
      "GitHub Actions",
    ],
  },
  {
    title: "Also used",
    items: [
      "JavaScript",
      "Tailwind CSS",
      "Alpine.js",
      "Vite",
      "Java",
      "Fabric API",
      "Gradle",
      "Figma",
      "Blender",
    ],
  },
];
```

Update `.skills-grid` to two balanced columns on desktop and one on mobile.

- [ ] **Step 10: Replace Connect copy**

Use heading:

```text
Have a web app, internal tool, or desktop utility that needs building or cleaning up?
```

Use paragraph:

```text
Email me with the problem, the current state, and what you want the finished version to do.
```

- [ ] **Step 11: Run checks**

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Expected: PASS.

- [ ] **Step 12: Commit**

```bash
git add src tests/portfolio.spec.ts
git commit -m "feat: strengthen portfolio case studies"
```

---

### Task 6: Replace the old portfolio preview with Filsafit and audit real screenshots

**Files:**
- Modify: `src/components/ProjectPreview.tsx`
- Modify: `src/styles/projects.css`
- Conditionally create only when a verified safe screenshot exists: `public/projects/<project-slug>.<ext>`
- Conditionally modify: `src/types/portfolio.ts`, `src/data/projects.ts`

**Interfaces:**
- `filsafit` must have a generated preview even if no real image asset is suitable.
- Do not add unused screenshot abstraction if the audit finds no real image worth shipping.

- [ ] **Step 1: Audit visual assets before coding image support**

Inspect these repositories for existing `.png`, `.jpg`, `.jpeg`, or `.webp` screenshots or README-linked screenshots:

```text
KVdz00/liquid-utility
KVdz00/filsafit
KVdz00/arindra-production-web
KVdz00/medan
KVdz00/Toggle-Mod
```

Accept an asset only if all are true:

1. It shows the real project UI.
2. It contains no secrets, tokens, private user data, or private customer data.
3. It remains understandable when cropped into the existing project-preview area.
4. It is not a logo, stock image, or decorative asset being misrepresented as a screenshot.

If no asset meets all four conditions, keep generated previews for all projects and do not add dead screenshot-rendering code.

- [ ] **Step 2: Replace the old cyber portfolio preview branch with a Filsafit preview**

Use generated markup that communicates the actual product surfaces without pretending to be a screenshot:

```tsx
{type === "filsafit" && (
  <>
    <div className="filsafit-nav">
      <strong>FILSAFIT</strong>
      <span>Encyclopedia</span>
      <span>Compare</span>
      <span>Quiz</span>
      <span>Profile</span>
    </div>
    <div className="filsafit-body">
      <div className="filsafit-copy">
        <small>Philosophy encyclopedia</small>
        <strong>Explore schools, compare ideas, then take the quiz.</strong>
        <div>
          <span>16 schools</span>
          <span>30 questions</span>
        </div>
      </div>
      <div className="filsafit-result">
        <small>Quiz result</small>
        <strong>Stoicism</strong>
        <div className="filsafit-bars">
          <i style={{ width: "82%" }} />
          <i style={{ width: "68%" }} />
          <i style={{ width: "74%" }} />
        </div>
      </div>
    </div>
  </>
)}
```

Keep the existing `Repo-informed preview` label for this generated preview.

- [ ] **Step 3: Add Filsafit preview styling**

Replace the old `.portfolio`, `.cyber-*` block with `.filsafit-*` rules using the existing portfolio palette, not a new site-wide design system. Use warm neutral/museum-like tones inside the preview so it is visually distinct from Liquid Utility while remaining contained inside `.project-preview`.

- [ ] **Step 4: If and only if the audit found a suitable real screenshot, add image preview support**

Extend the type:

```ts
export type Preview =
  | { kind: "generated"; type: PreviewKind }
  | { kind: "image"; src: string; alt: string };
```

Change `Project.preview` to `Preview`, update generated projects to `preview: { kind: "generated", type: "utility" }`, and render an actual `<img>` for `kind === "image"`.

Image markup:

```tsx
<div className="project-preview project-preview-image">
  <img src={preview.src} alt={preview.alt} loading="lazy" />
</div>
```

For real images, do not render the `Repo-informed preview` label.

- [ ] **Step 5: Verify previews at desktop and mobile widths**

Run:

```bash
npm run test:e2e
```

Then manually inspect Chromium at approximately `1440x900`, `1024x768`, `760x900`, and `390x844`. There must be no clipped text that hides essential project information and no document-level horizontal overflow.

- [ ] **Step 6: Commit**

If generated previews only:

```bash
git add src/components/ProjectPreview.tsx src/styles/projects.css
git commit -m "feat: add Filsafit project preview"
```

If at least one real screenshot is integrated, include the corresponding `public/projects/*` asset and type/data changes in the same commit.

---

### Task 7: Align metadata and repository documentation, then run the full release gate

**Files:**
- Modify: `index.html`
- Modify: `README.md`
- Modify if needed: `.gitignore`

**Interfaces:**
- Metadata must describe the same portfolio positioning as the visible hero.
- README must document all quality commands added by Task 1.

- [ ] **Step 1: Replace generic metadata description**

Use this description consistently for standard meta, Open Graph, and Twitter:

```text
Portfolio of Muhammad Dzikrul Kahfi, featuring web apps, Windows utilities, backend workflows, and selected developer projects.
```

Keep canonical URL, Open Graph image URL, Twitter card type, JSON-LD, favicon, Apple touch icon, and theme-color behavior unchanged.

- [ ] **Step 2: Update README checks section**

Use:

```markdown
## Checks

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```
```

Also update the opening description so it says the portfolio uses concise project case studies and repo-informed previews, with real screenshots used only where suitable assets are available.

- [ ] **Step 3: Run the complete verification gate**

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Expected: all commands exit 0.

- [ ] **Step 4: Check production output**

Run:

```bash
npm run preview
```

Open `http://127.0.0.1:4173` and verify:

1. Dark theme loads without a flash that makes content unreadable.
2. Light theme works and persists after reload.
3. Work, About, Skills, Process, and Connect links reach their sections.
4. Filsafit appears in Selected Work and the old previous-portfolio project does not.
5. Project rows remain readable on desktop and mobile.
6. Contact links point to GitHub, Instagram, and email correctly.
7. No horizontal scrollbar appears at 390px viewport width.

- [ ] **Step 5: Commit**

```bash
git add index.html README.md .gitignore
git commit -m "docs: align portfolio metadata and checks"
```

---

## Final Self-Review Checklist

Before calling implementation complete, confirm every item:

- [ ] The existing visual identity is preserved rather than redesigned.
- [ ] `App.tsx` is composition-level only.
- [ ] Project, skill, and process data are outside component implementation.
- [ ] `Portfolio` has been replaced by `Filsafit` in selected work.
- [ ] Every featured project has `problem`, `technicalDecision`, `result`, and `status`.
- [ ] Generic manifesto wording is gone.
- [ ] User-facing copy contains no em dash.
- [ ] No metric or result was invented.
- [ ] Reduced-motion behavior exists.
- [ ] The broad global transition rule is gone.
- [ ] Screenshot use follows the four acceptance rules, or generated previews remain because no safe screenshot qualified.
- [ ] `npm run lint` passes.
- [ ] `npm run format:check` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] `npm run test:e2e` passes.
- [ ] Mobile Chromium has no document-level horizontal overflow.
