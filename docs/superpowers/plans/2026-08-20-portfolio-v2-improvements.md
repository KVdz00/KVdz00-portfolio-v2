# Portfolio V2 Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the existing portfolio without redesigning it by making project evidence more concrete, copy more specific, source files easier to maintain, accessibility stronger, and quality checks reproducible.

**Architecture:** Keep React 19 + Vite and the existing visual system. Add characterization tests first, then extract data/components, split CSS by responsibility, replace generic copy with repo-backed case-study content, and audit project repositories for safe real screenshots before deciding whether each preview stays generated or becomes image-based.

**Tech Stack:** React 19, TypeScript 5.8, Vite 7, plain CSS, Phosphor Icons, ESLint, Prettier, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-20-portfolio-v2-improvement-design.md`

## Global Constraints

- Keep the current visual language, responsive layout, dark/light theme, project-row composition, typography direction, and overall site structure.
- No framework migration, CMS, database, authentication, backend, animation library, or full visual redesign.
- No invented metrics, impact claims, client results, or project facts.
- No forced public links for private repositories.
- Use a real screenshot only when an existing asset is safe, genuinely shows the project UI, and remains legible at portfolio scale.
- Keep repo-informed generated previews when no suitable screenshot exists.
- Do not use em dashes in user-facing portfolio copy.
- Avoid manifesto language, motivational slogans, and generic AI-style portfolio copy.

## File Map

Create: `eslint.config.js`, `.prettierignore`, `playwright.config.ts`, `tests/portfolio.spec.ts`, `src/types/portfolio.ts`, `src/data/{projects,skills,process}.ts`, `src/components/{ThemeToggle,Header,ProjectRow,ProjectPreview}.tsx`, `src/sections/{Hero,About,Work,Skills,Process,Connect}.tsx`, `src/styles/{base,layout,projects}.css`.

Modify: `package.json`, `package-lock.json`, `src/App.tsx`, `src/main.tsx`, `index.html`, `README.md`.

Delete after successful verification: `src/styles.css`.

---

### Task 1: Add quality tooling and browser characterization tests

**Files:** `package.json`, `package-lock.json`, `eslint.config.js`, `.prettierignore`, `playwright.config.ts`, `tests/portfolio.spec.ts`

**Produces:** `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm run build`, `npm run test:e2e`.

- [ ] **Step 1: Install tooling**

```bash
npm install -D eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals prettier @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Replace the scripts block in `package.json`**

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
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
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
  use: { baseURL: "http://127.0.0.1:5173", trace: "retain-on-failure" },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
});
```

- [ ] **Step 6: Create `tests/portfolio.spec.ts`**

```ts
import { expect, test } from "@playwright/test";

test("renders core portfolio content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Muhammad Dzikrul Kahfi/i })).toBeVisible();
  await expect(page.getByText("Liquid Utility", { exact: true })).toBeVisible();
  await expect(page.getByText("ModToggle", { exact: true })).toBeVisible();
});

test("primary navigation changes the hash", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/#about$/);
});

test("theme toggle persists", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /switch to light mode/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("contact destinations are correct", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /github.com\/KVdz00/i })).toHaveAttribute("href", "https://github.com/KVdz00");
  await expect(page.getByRole("link", { name: /kahfiworks.id@gmail.com/i })).toHaveAttribute("href", "mailto:kahfiworks.id@gmail.com");
});

test("document does not overflow horizontally", async ({ page }) => {
  await page.goto("/");
  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});
```

- [ ] **Step 7: Format once and run the gate**

```bash
npx prettier --write .
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Expected: all commands exit 0. Resolve any reported lint issue without changing visible copy or layout.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json eslint.config.js .prettierignore playwright.config.ts tests src index.html vite.config.ts tsconfig*.json
git commit -m "test: add portfolio quality gates"
```

---

### Task 2: Extract data and types with no visible change

**Files:** `src/types/portfolio.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/process.ts`, `src/App.tsx`

- [ ] **Step 1: Confirm the characterization suite is green**

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

export type ProcessStep = { id: string; title: string; body: string };
export type SkillGroup = { title: string; items: string[] };
```

- [ ] **Step 3: Create `src/data/projects.ts` with the exact current values**

```ts
import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  { id: "01", name: "Liquid Utility", summary: "Tauri utility shell with AppShell navigation, Game Launcher, Hardware Monitor, Media Studio, Settings, and theme or density preferences.", stack: ["Tauri", "React", "TypeScript", "Rust"], outcome: "Desktop control shell", status: "Private Tauri app", preview: "utility" },
  { id: "02", name: "Arindra Production Web", summary: "Laravel Blade production-house website with a dark hero, showreel selector, service sections, client logos, process, and CTA flow.", stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js"], outcome: "Production-house site", status: "Client-facing build", preview: "arindra" },
  { id: "03", name: "Website Kota Medan", summary: "PHP public site for Medan with a cinematic hero, landmark cards, culture, tourism, local products, reviews, users, and admin workflows.", stack: ["PHP", "MySQL", "JavaScript", "CSS"], outcome: "City content platform", status: "School project", preview: "medan" },
  { id: "04", name: "Portfolio", summary: "Personal portfolio experiment with cyber typography, scanline and particle layers, theme and language switches, BGM control, and searchable project filtering.", stack: ["HTML", "CSS", "JavaScript", "Canvas"], outcome: "Interactive profile site", status: "Previous portfolio", preview: "portfolio" },
  { id: "05", name: "ModToggle", summary: "Minecraft Fabric client mod with an O keybind, searchable in-game screen, /modtoggle commands, JSON persistence, and soft suppression strategies.", stack: ["Java", "Fabric API", "Gradle"], outcome: "Client mod controller", status: "Minecraft utility", preview: "modtoggle" },
];
```

- [ ] **Step 4: Create `src/data/process.ts` and `src/data/skills.ts` with the exact current values**

```ts
// src/data/process.ts
import type { ProcessStep } from "../types/portfolio";
export const processSteps: ProcessStep[] = [
  { id: "01", title: "Map the real task", body: "Start from the user's workflow, the content that must exist, and the constraints that can break the experience." },
  { id: "02", title: "Shape the interface", body: "Turn the task into layout, hierarchy, states, and responsive behavior before chasing visual effects." },
  { id: "03", title: "Build the working version", body: "Implement with maintainable components, readable structure, accessible controls, and practical data boundaries." },
  { id: "04", title: "Verify and refine", body: "Run checks, inspect real browser screenshots, fix awkward spacing, and keep the final result deployable." },
];
```

```ts
// src/data/skills.ts
import type { SkillGroup } from "../types/portfolio";
export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "PHP", "Java", "HTML", "CSS", "SQL"] },
  { title: "Frontend", items: ["React", "Tailwind CSS", "Alpine.js", "Vite", "Blade"] },
  { title: "Backend", items: ["Laravel", "PHP", "MySQL", "SQLite"] },
  { title: "Desktop & Tools", items: ["Tauri", "Rust", "Fabric API", "Gradle"] },
  { title: "Creative", items: ["Figma", "Blender 3D", "Game Dev", "UI/UX"] },
];
```

- [ ] **Step 5: Remove the inline arrays from `App.tsx` and import the modules**

```ts
import { processSteps } from "./data/process";
import { projects } from "./data/projects";
import { skillGroups } from "./data/skills";
import type { Project } from "./types/portfolio";
```

Keep all markup and strings unchanged.

- [ ] **Step 6: Verify and commit**

```bash
npm run typecheck
npm run build
npm run test:e2e
git add src/types src/data src/App.tsx
git commit -m "refactor: extract portfolio data"
```

---

### Task 3: Split `App.tsx` into focused components and sections

**Files:** `src/components/{ThemeToggle,Header,ProjectRow,ProjectPreview}.tsx`, `src/sections/{Hero,About,Work,Skills,Process,Connect}.tsx`, `src/App.tsx`

- [ ] **Step 1: Extract `ThemeToggle.tsx`**

Move the current `Theme` type, storage key, initial-theme function, state, effect, and exact `.theme-switch` button markup into a zero-prop exported `ThemeToggle()`. No behavior or accessible-label change.

- [ ] **Step 2: Extract `Header.tsx`**

Move the exact current `<header className="site-header">` markup into `Header()`. Replace the inline theme button with `<ThemeToggle />`. Preserve anchors `#work`, `#about`, `#skills`, `#process`, `#connect` and the current availability text.

- [ ] **Step 3: Extract `ProjectPreview.tsx`**

Move the complete current `ProjectPreview` function byte-for-byte, then make it exported and import `PreviewKind` from `src/types/portfolio.ts`. No preview markup, class, or text changes.

- [ ] **Step 4: Create `ProjectRow.tsx` with the exact current article structure**

```tsx
import type { Project } from "../types/portfolio";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="project-row">
      <div className="project-index">{project.id}</div>
      <div className="project-copy">
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <ul aria-label={`${project.name} stack`}>
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <dl className="project-facts">
          <div><dt>Outcome</dt><dd>{project.outcome}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
        </dl>
      </div>
      <ProjectPreview type={project.preview} />
    </article>
  );
}
```

- [ ] **Step 5: Extract the six section blocks by existing id**

```text
#top     -> Hero.tsx
#about   -> About.tsx
#work    -> Work.tsx
#skills  -> Skills.tsx
#process -> Process.tsx
#connect -> Connect.tsx
```

`Work.tsx` renders:

```tsx
{projects.map((project) => <ProjectRow project={project} key={project.name} />)}
```

`Skills.tsx` imports `skillGroups`. `Process.tsx` imports `processSteps`. All other section markup and strings remain identical to the current `App.tsx`.

- [ ] **Step 6: Replace `App.tsx` with composition-only markup**

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
      <main id="main"><Hero /><About /><Work /><Skills /><Process /><Connect /></main>
      <footer className="site-footer"><span>Copyright 2026 Muhammad Dzikrul Kahfi</span><span>KV</span></footer>
    </>
  );
}

export default App;
```

- [ ] **Step 7: Verify and commit**

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
git add src/components src/sections src/App.tsx
git commit -m "refactor: split portfolio components"
```

---

### Task 4: Split CSS and add reduced-motion support

**Files:** `src/styles/{base,layout,projects}.css`, `src/main.tsx`, `tests/portfolio.spec.ts`, delete `src/styles.css`

- [ ] **Step 1: Add a failing reduced-motion test**

```ts
test("reduced motion disables smooth scrolling and long body transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const values = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    bodyTransitionDuration: getComputedStyle(document.body).transitionDuration,
  }));
  expect(values.scrollBehavior).toBe("auto");
  expect(values.bodyTransitionDuration).not.toContain("0.42s");
});
```

- [ ] **Step 2: Verify failure**

```bash
npm run test:e2e -- --grep "reduced motion"
```

Expected: FAIL on the current stylesheet.

- [ ] **Step 3: Create `base.css`**

Move theme variables, reset/base rules, focus/selection, skip link, and `.sr-only`. Delete the broad `:where(body, body *)` transition rule. Add:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Create `layout.css` and `projects.css`**

`layout.css` receives header, hero, section, project-row, skills, process, connect, footer, and their responsive layout rules. `projects.css` receives `.project-preview` and every `.utility`, `.liquid-*`, `.arindra*`, `.medan*`, `.portfolio`, `.cyber-*`, `.modtoggle*` rule plus their preview-specific responsive overrides. Preserve each moved rule exactly in this task.

- [ ] **Step 5: Update `main.tsx`**

```ts
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/projects.css";

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
```

- [ ] **Step 6: Delete the old stylesheet, verify, commit**

```bash
rm src/styles.css
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
git add src/styles src/main.tsx tests/portfolio.spec.ts src/styles.css
git commit -m "refactor: split styles and respect reduced motion"
```

Expected: all checks pass, including reduced motion.

---

### Task 5: Replace generic copy with concrete case studies

**Files:** portfolio types/data, `ProjectRow.tsx`, Hero/About/Process/Connect, `layout.css`, tests

- [ ] **Step 1: Add a failing case-study test**

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

- [ ] **Step 2: Verify failure**

```bash
npm run test:e2e -- --grep "concrete case-study evidence"
```

- [ ] **Step 3: Replace the project type**

```ts
export type PreviewKind = "utility" | "arindra" | "medan" | "filsafit" | "modtoggle";
export type Project = {
  id: string; name: string; summary: string; stack: string[]; status: string;
  problem: string; technicalDecision: string; result: string; preview: PreviewKind;
};
```

- [ ] **Step 4: Replace project data**

```ts
export const projects: Project[] = [
  { id: "01", name: "Liquid Utility", summary: "Windows utility that combines game launching, hardware monitoring, system cleanup, local media tools, and app settings.", stack: ["Tauri", "React", "TypeScript", "Rust"], status: "Private Tauri app", problem: "Put several Windows maintenance and launcher workflows behind one consistent desktop shell.", technicalDecision: "Keep the interface in React, route native operations through Tauri and Rust commands, and verify packaged builds with smoke checks.", result: "A packaged desktop app with native-backed modules instead of a browser-only mock.", preview: "utility" },
  { id: "02", name: "Filsafit", summary: "Philosophy web app with an encyclopedia, school comparison, a scored quiz, profiles, history, auth, and shareable result cards.", stack: ["Next.js", "React", "TypeScript", "Supabase"], status: "Private web app", problem: "Combine philosophy content with interactive scoring and account-backed history without turning every route into a client-heavy page.", technicalDecision: "Use Next.js App Router server and client boundaries, Supabase Postgres, Auth and RLS, and separate tested quiz-scoring logic.", result: "A working full-stack product with CI covering TypeScript, lint, and production builds.", preview: "filsafit" },
  { id: "03", name: "Arindra Production Web", summary: "Laravel production-house website with service pages, portfolio and showreel content, forms, authentication, and admin workflows.", stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js"], status: "Client-facing build", problem: "Present production work publicly while keeping content and inquiries manageable from the application.", technicalDecision: "Use Laravel and Blade for the server-rendered app, Tailwind CSS for layout, and Alpine.js for small interactive pieces.", result: "A client-facing site with public presentation and administration workflows in one codebase.", preview: "arindra" },
  { id: "04", name: "Website Kota Medan", summary: "PHP and MySQL city information site covering landmarks, tourism, culture, local products, reviews, users, and admin workflows.", stack: ["PHP", "MySQL", "JavaScript", "CSS"], status: "School project", problem: "Organize a broad set of city content into a public site with account and administration features.", technicalDecision: "Keep the stack simple with server-rendered PHP, MySQL persistence, and JavaScript and CSS for interaction and presentation.", result: "A complete school project with public content, user features, and admin management.", preview: "medan" },
  { id: "05", name: "ModToggle", summary: "Minecraft Fabric client mod for controlling selected mod behavior from an in-game UI and commands.", stack: ["Java", "Fabric API", "Gradle"], status: "Minecraft utility", problem: "Make mod toggling manageable without editing files or leaving the normal game workflow.", technicalDecision: "Use a client-side Fabric mod with Java, an O-key screen, slash commands, JSON persistence, and soft suppression where hard unloading is not possible.", result: "A working in-game controller for persisted mod-toggle state.", preview: "modtoggle" },
];
```

- [ ] **Step 5: Render the new project facts**

```tsx
<dl className="project-facts">
  <div><dt>Problem</dt><dd>{project.problem}</dd></div>
  <div><dt>Technical decision</dt><dd>{project.technicalDecision}</dd></div>
  <div><dt>Result</dt><dd>{project.result}</dd></div>
  <div><dt>Status</dt><dd>{project.status}</dd></div>
</dl>
```

Keep the existing project-row visual treatment. Only spacing/heading scale may change to keep four facts readable.

- [ ] **Step 6: Replace hero and About copy**

Hero paragraph:

```text
I build web apps, Windows utilities, and small tools. The work here comes from private codebases, client-facing sites, school projects, and experiments I still use to test ideas.
```

Hero note:

```text
Recent work includes a Tauri Windows utility, a Next.js and Supabase philosophy app, Laravel sites with admin workflows, and a Fabric client mod.
```

About second label: `In practice`

About heading:

```text
I work across browser UI, backend workflows, and native desktop boundaries.
```

About paragraph:

```text
When a project grows past a simple page, I keep the important decisions in the repo: architecture notes, task plans, CI checks, and smoke tests for behavior that is easy to break.
```

Evidence list:

```text
01  React UI and Rust native commands in Liquid Utility
02  Typecheck, lint, and build CI in Filsafit
03  Auth, content, and admin workflows in Laravel projects
04  Responsive browser checks in this portfolio
```

- [ ] **Step 7: Replace process data and copy**

```ts
export const processSteps: ProcessStep[] = [
  { id: "01", title: "Define the actual flow", body: "Write down the screens, data, native actions, or failure cases that need to work." },
  { id: "02", title: "Separate the risky boundaries", body: "Keep browser UI, server and data work, and native system access explicit when the stack crosses those lines." },
  { id: "03", title: "Build the end-to-end path", body: "Get the real workflow working before adding extra polish or secondary states." },
  { id: "04", title: "Run the checks and inspect it", body: "Typecheck, build, smoke-test the paths that matter, then inspect desktop and mobile layouts." },
];
```

Heading: `The workflow changes with the project, but these four steps show up often.`

Paragraph: `The point is to get the real path working, keep risky boundaries visible, and verify what can break before calling it done.`

- [ ] **Step 8: Rebalance skills**

```ts
export const skillGroups: SkillGroup[] = [
  { title: "Primary", items: ["TypeScript", "React", "Next.js", "Tauri", "Rust", "Laravel", "PHP", "Supabase", "SQL", "GitHub Actions"] },
  { title: "Also used", items: ["JavaScript", "Tailwind CSS", "Alpine.js", "Vite", "Java", "Fabric API", "Gradle", "Figma", "Blender"] },
];
```

Set `.skills-grid` to two columns on desktop and retain one column on mobile.

- [ ] **Step 9: Replace Connect copy**

Heading: `Have a web app, internal tool, or desktop utility that needs building or cleaning up?`

Paragraph: `Email me with the problem, the current state, and what you want the finished version to do.`

- [ ] **Step 10: Verify and commit**

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
git add src tests/portfolio.spec.ts
git commit -m "feat: strengthen portfolio case studies"
```

---

### Task 6: Add Filsafit preview and audit real screenshots

**Files:** `ProjectPreview.tsx`, `projects.css`, conditional `public/projects/*`, conditional preview type/data changes

- [ ] **Step 1: Audit these repositories for existing screenshots**

```text
KVdz00/liquid-utility
KVdz00/filsafit
KVdz00/arindra-production-web
KVdz00/medan
KVdz00/Toggle-Mod
```

A screenshot qualifies only when all four are true: real project UI, no sensitive/private data, readable in the current preview area, and not a decorative/stock/logo asset. If none qualifies, keep all previews generated and do not add unused image-preview code.

- [ ] **Step 2: Replace the old `portfolio` preview branch with this Filsafit generated preview**

```tsx
{type === "filsafit" && (
  <>
    <div className="filsafit-nav">
      <strong>FILSAFIT</strong><span>Encyclopedia</span><span>Compare</span><span>Quiz</span><span>Profile</span>
    </div>
    <div className="filsafit-body">
      <div className="filsafit-copy">
        <small>Philosophy encyclopedia</small>
        <strong>Explore schools, compare ideas, then take the quiz.</strong>
        <div><span>16 schools</span><span>30 questions</span></div>
      </div>
      <div className="filsafit-result">
        <small>Example result</small><strong>Stoicism</strong>
        <div className="filsafit-bars"><i style={{ width: "82%" }} /><i style={{ width: "68%" }} /><i style={{ width: "74%" }} /></div>
      </div>
    </div>
  </>
)}
```

- [ ] **Step 3: Replace `.portfolio` and `.cyber-*` rules with exact Filsafit preview CSS**

```css
.filsafit {
  display: grid;
  grid-template-rows: auto 1fr;
  background: oklch(94% 0.018 78);
  color: oklch(24% 0.035 55);
}

.filsafit-nav {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid oklch(82% 0.035 72);
  color: oklch(38% 0.07 55);
  font-family: var(--mono);
  font-size: 0.6rem;
  text-transform: uppercase;
}

.filsafit-nav strong { margin-right: auto; font-size: 0.78rem; }

.filsafit-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(10rem, 0.65fr);
  gap: 1rem;
  align-items: center;
  padding: 1.2rem;
}

.filsafit-copy { display: grid; gap: 0.65rem; }
.filsafit-copy small, .filsafit-result small { color: oklch(48% 0.07 60); font-family: var(--mono); font-size: 0.62rem; text-transform: uppercase; }
.filsafit-copy > strong { max-width: 18ch; font-size: clamp(1.35rem, 2.7vw, 2.7rem); line-height: 1; }
.filsafit-copy > div { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.filsafit-copy > div span { border: 1px solid oklch(78% 0.045 70); border-radius: 999px; padding: 0.32rem 0.5rem; font-family: var(--mono); font-size: 0.58rem; }
.filsafit-result { display: grid; gap: 0.65rem; border: 1px solid oklch(80% 0.04 70); border-radius: 12px; padding: 1rem; background: oklch(98% 0.01 78); }
.filsafit-result > strong { font-size: 1.25rem; }
.filsafit-bars { display: grid; gap: 0.45rem; }
.filsafit-bars i { display: block; height: 0.45rem; border-radius: 999px; background: oklch(55% 0.11 55); }

@media (max-width: 500px) {
  .filsafit-nav span { display: none; }
  .filsafit-body { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: If a screenshot qualified, add image support; otherwise skip this step**

```ts
export type Preview =
  | { kind: "generated"; type: PreviewKind }
  | { kind: "image"; src: string; alt: string };
```

Change `Project.preview` to `Preview`; convert generated entries to the generated object shape; use the qualifying asset for the image entry. Render:

```tsx
if (preview.kind === "image") {
  return <div className="project-preview project-preview-image"><img src={preview.src} alt={preview.alt} loading="lazy" /></div>;
}
```

```css
.project-preview-image::before { content: none; }
.project-preview-image img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center; }
```

- [ ] **Step 5: Verify desktop/mobile and commit**

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Inspect `1440x900`, `1024x768`, `760x900`, `390x844`; no essential text clipped and no document-level horizontal overflow.

```bash
git add src public/projects
git commit -m "feat: add Filsafit project preview"
```

If `public/projects` was not created because no screenshot qualified, omit that path from `git add`.

---

### Task 7: Align metadata and documentation, then run the release gate

**Files:** `index.html`, `README.md`

- [ ] **Step 1: Replace standard, Open Graph, and Twitter descriptions with**

```text
Portfolio of Muhammad Dzikrul Kahfi, featuring web apps, Windows utilities, backend workflows, and selected developer projects.
```

Keep canonical URL, OG image, Twitter card type, JSON-LD, favicon, Apple touch icon, and theme-color logic unchanged.

- [ ] **Step 2: Update README opening and checks**

Opening:

```text
Personal portfolio for Muhammad Dzikrul Kahfi, built around concise project case studies, repo-informed previews, and real project screenshots when a safe, readable asset is available.
```

Checks:

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

- [ ] **Step 3: Run final gate**

```bash
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run test:e2e
```

Expected: all commands exit 0.

- [ ] **Step 4: Run production preview and manually verify**

```bash
npm run preview
```

At `http://127.0.0.1:4173`: dark/light theme works and persists, all nav anchors work, Filsafit appears and the previous Portfolio item does not, project rows remain readable, contact links are correct, and 390px width has no document-level horizontal scrollbar.

- [ ] **Step 5: Commit**

```bash
git add index.html README.md
git commit -m "docs: align portfolio metadata and checks"
```

---

## Final Self-Review

- [ ] Existing visual identity preserved.
- [ ] `App.tsx` composition-only.
- [ ] Project, skill, process data outside components.
- [ ] Filsafit replaces previous Portfolio item.
- [ ] Every featured project renders Problem, Technical decision, Result, Status.
- [ ] Generic manifesto wording removed.
- [ ] User-facing copy has no em dash.
- [ ] No invented metric/result.
- [ ] Reduced motion supported and broad global transition removed.
- [ ] Screenshot use passes all four evidence/safety checks, or generated previews remain.
- [ ] `lint`, `format:check`, `typecheck`, `build`, `test:e2e` all pass.
- [ ] Mobile Chromium has no document-level horizontal overflow.
