# Portfolio V2 Evidence-First Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing one-page portfolio into an accessible, recruiter-focused developer dossier that uses the approved GitHub-DNA visual system and presents Liquid Utility, Filsafit, and Arindra Production Web as evidence-rich case studies.

**Architecture:** Keep the React/Vite single-page application and split the current monolithic view into focused semantic components backed by typed local content. Limit client state to theme selection, mobile navigation, and avatar fallback; avoid runtime APIs, routers, animation libraries, and content services.

**Tech Stack:** React 19, TypeScript 5.8, Vite 7, plain CSS, Phosphor Icons, Vitest, React Testing Library, Testing Library user-event.

**Spec:** `docs/superpowers/specs/2026-08-22-portfolio-overhaul-design.md`

## Global Constraints

- Primary audience: recruiters evaluating internship, vocational placement, and junior software developer candidates.
- Positioning: Grade 12 vocational student and Software Developer.
- Language: English only.
- Primary CTA: `mailto:kahfiworks.id@gmail.com`.
- Secondary URLs: `https://github.com/KVdz00` and `https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386`.
- Featured case studies: Liquid Utility, Filsafit, and Arindra Production Web only.
- Do not render a resume action, empty project action, fabricated metric, or fabricated public URL.
- Preserve React, TypeScript, Vite, plain CSS, and Phosphor Icons.
- Do not add a router, styling framework, state library, animation library, CMS, or runtime content API.
- Dark is the first-visit default; light mode must retain identical hierarchy.
- Use system sans and system mono stacks without remote font loading.
- Target WCAG 2.1 AA, visible keyboard focus, logical headings, reduced motion, and 320-1440 px layouts.
- Do not add emoji to code, comments, UI copy, logs, tests, assets, or commits.
- Use local typed content and a local profile image; no GitHub hotlink or third-party widget at runtime.
- Every task must finish with fresh focused tests before its commit.
- Apply Agent Skills frontend engineering, Caveman, Anti Slop UI, Impeccable, Anti Slop Code, Anti Slop Copywriting, and Anti Slop Layout Mobile throughout implementation in `DURING` mode.
- Design read: recruiter dossier, evidence-first GitHub DNA, `ENERGY 2`, `RHYTHM 3`, `MOTION 1`.
- Use OKLCH for CSS color tokens and avoid pure black or white. Reviewed sRGB values remain allowed in metadata and generated assets where renderer compatibility requires them.
- Build mobile-first with content-driven breakpoints, a visible `Menu` or `Close` label, 44 px minimum targets, tap equivalents, and no accidental horizontal clipping.
- Public copy must be factual and specific. Do not use em dashes, double-hyphen asides, inflated claims, vague opportunity copy, or decorative arrows.
- Draft, audit, and finalize public copy against source facts before commit.
- Add code comments only for non-obvious constraints or implementation reasons.

## Design Decision Reasons

- GitHub-like density supports technical credibility without turning the portfolio into a dashboard clone.
- System sans and mono typography preserve the approved identity while keeping recruiter reading fast.
- Flat surfaces and thin rules organize evidence; cards appear only where grouping or interaction needs a boundary.
- Blue means action, teal means identity, and green means explicit availability.
- Motion is limited to control feedback and state changes so scanning remains stable.
- Purpose-built interface fragments show product character without claiming unsupported screenshots or metrics.

## File Structure

### Create

- `src/data/portfolio.ts` — typed profile, project, capability, proof, and additional-work content.
- `src/test/setup.ts` — Testing Library and DOM cleanup setup.
- `src/data/portfolio.test.ts` — content contract and verified-link tests.
- `src/lib/theme.ts` — theme types, storage read, and DOM application.
- `src/components/ThemeToggle.tsx` — theme control and persisted theme state.
- `src/components/SiteHeader.tsx` — brand, desktop navigation, mobile disclosure, and theme control.
- `src/components/SiteHeader.test.tsx` — header, theme, keyboard, and menu behavior.
- `src/components/ProfileCard.tsx` — compact identity panel with local-avatar fallback.
- `src/components/Hero.tsx` — recruiter positioning and primary actions.
- `src/components/ProofStrip.tsx` — fast technical capability summary.
- `src/components/Hero.test.tsx` — hero truth, CTA, profile, and fallback behavior.
- `src/components/project-previews/LiquidUtilityPreview.tsx` — decorative Liquid Utility product preview.
- `src/components/project-previews/FilsafitPreview.tsx` — decorative Filsafit product preview.
- `src/components/project-previews/ArindraPreview.tsx` — decorative Arindra product preview.
- `src/components/ProjectPreview.tsx` — exhaustive preview-key dispatch.
- `src/components/ProjectCaseStudy.tsx` — one semantic evidence-rich project section.
- `src/components/FeaturedWork.tsx` — selected-work section composition.
- `src/components/FeaturedWork.test.tsx` — project ordering, evidence, and optional-link behavior.
- `src/components/Capabilities.tsx` — engineering capability groups.
- `src/components/ProfileAndMoreWork.tsx` — short personal profile and compact additional-work index.
- `src/components/Contact.tsx` — final recruiter CTA and secondary links.
- `src/components/SiteFooter.tsx` — copyright and brand close.
- `src/App.test.tsx` — page composition, navigation targets, and public copy contract.
- `src/styles.contract.test.ts` — required tokens, focus, breakpoints, and reduced-motion CSS contract.
- `src/metadata.test.ts` — canonical, social metadata, JSON-LD, and public-asset contract.
- `scripts/generate-brand-assets.ps1` — deterministic OG and Apple touch icon generation.
- `public/profile-avatar.png` — local copy of the approved GitHub avatar.

### Replace or modify

- `src/App.tsx:1-543` — replace monolithic content with section composition.
- `src/styles.css:1-1710` — replace the current agency-style rules with the approved design system.
- `src/main.tsx:1-10` — keep StrictMode boot and imports; no structural change expected unless test-driven composition requires it.
- `vite.config.ts:1-6` — add Vitest configuration.
- `package.json:1-24` — add test script and test dependencies.
- `package-lock.json` — lock test dependency versions.
- `index.html:1-72` — update canonical URL, metadata, theme boot values, and JSON-LD.
- `public/favicon.svg:1-5` — replace with the `KV` monogram.
- `public/apple-touch-icon.png` — regenerate to match the new monogram.
- `public/og-image.png` — regenerate at 1200 by 630.
- `README.md:1-26` — document test command and component architecture.
- `.gitignore` — ignore `.superpowers/` brainstorming artifacts.

---

### Task 1: Establish the Test Harness and Typed Portfolio Content

**Files:**
- Modify: `package.json:1-24`
- Modify: `package-lock.json`
- Modify: `vite.config.ts:1-6`
- Modify: `.gitignore`
- Create: `src/test/setup.ts`
- Create: `src/data/portfolio.test.ts`
- Create: `src/data/portfolio.ts`

**Interfaces:**
- Produces: `Profile`, `FeaturedProject`, `Capability`, `ProofItem`, and `AdditionalWork` types.
- Produces: `profile`, `proofItems`, `featuredProjects`, `capabilities`, and `additionalWork` readonly collections.
- Produces: Vitest `jsdom` environment and `npm test` script used by every later task.

- [ ] **Step 1: Install the test dependencies and add the test script**

Run:

```powershell
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add this script to `package.json`:

```json
"test": "vitest"
```

Expected: `package.json` and `package-lock.json` include the five test dependencies and npm exits `0`.

- [ ] **Step 2: Configure Vitest and deterministic DOM cleanup**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.style.removeProperty("color-scheme");
});
```

Append this exact entry to `.gitignore`:

```text
.superpowers/
```

- [ ] **Step 3: Write the failing typed-content contract test**

Create `src/data/portfolio.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  additionalWork,
  capabilities,
  featuredProjects,
  profile,
  proofItems,
} from "./portfolio";

describe("portfolio content", () => {
  it("uses the approved recruiter positioning and contact routes", () => {
    expect(profile.role).toBe("Software Developer");
    expect(profile.education).toContain("Grade 12");
    expect(profile.email).toBe("kahfiworks.id@gmail.com");
    expect(profile.github).toBe("https://github.com/KVdz00");
    expect(profile.linkedin).toBe(
      "https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386",
    );
  });

  it("keeps exactly the three approved featured projects in order", () => {
    expect(featuredProjects.map((project) => project.name)).toEqual([
      "Liquid Utility",
      "Filsafit",
      "Arindra Production Web",
    ]);
  });

  it("requires evidence and does not expose unverified project links", () => {
    for (const project of featuredProjects) {
      expect(project.evidence.length).toBeGreaterThanOrEqual(2);
      expect(project.contributions.length).toBeGreaterThanOrEqual(2);
      expect(project.href).toBeUndefined();
    }
  });

  it("contains all approved proof, capability, and additional-work groups", () => {
    expect(proofItems).toHaveLength(4);
    expect(capabilities).toHaveLength(4);
    expect(additionalWork.map((project) => project.name)).toEqual([
      "Toggle-Mod",
      "QuickDL",
      "Website Kota Medan",
    ]);
  });
});
```

- [ ] **Step 4: Run the content test and confirm the red state**

Run:

```powershell
npm test -- --run src/data/portfolio.test.ts
```

Expected: FAIL because `src/data/portfolio.ts` does not exist.

- [ ] **Step 5: Implement the typed local content**

Create `src/data/portfolio.ts` with these public types and collections:

```ts
export type ProjectPreviewKey = "liquid-utility" | "filsafit" | "arindra";

export type Profile = {
  name: string;
  handle: string;
  role: string;
  education: string;
  availability: string;
  location: string;
  timezone: string;
  email: string;
  github: string;
  linkedin: string;
};

export type FeaturedProject = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  context: string;
  role: string;
  contributions: readonly string[];
  evidence: readonly string[];
  outcome: string;
  stack: readonly string[];
  preview: ProjectPreviewKey;
  href?: string;
};

export type ProofItem = {
  label: string;
  value: string;
};

export type Capability = {
  title: string;
  description: string;
  evidence: string;
};

export type AdditionalWork = {
  name: string;
  stack: string;
  summary: string;
};

export const profile: Profile = {
  name: "Muhammad Dzikrul Kahfi",
  handle: "KVdz00",
  role: "Software Developer",
  education: "Grade 12 vocational student",
  availability: "Open to internships and junior roles",
  location: "Sidoarjo, Indonesia",
  timezone: "UTC +7",
  email: "kahfiworks.id@gmail.com",
  github: "https://github.com/KVdz00",
  linkedin:
    "https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386",
};

export const proofItems = [
  { label: "Web", value: "React / Next.js / Laravel" },
  { label: "Desktop", value: "Tauri / Rust" },
  { label: "Data", value: "Supabase / PostgreSQL / SQL" },
  { label: "Delivery", value: "Tests / CI / Docs / Packaged checks" },
] as const satisfies readonly ProofItem[];

export const featuredProjects = [
  {
    id: "01",
    slug: "liquid-utility",
    name: "Liquid Utility",
    summary:
      "A Windows utility that brings game launching, hardware snapshots, system care, local media preview, and application settings into one desktop shell.",
    context:
      "The product coordinates interface-heavy workflows with native Windows and system-level operations.",
    role:
      "I shape the React interface architecture and keep native responsibilities behind typed Rust commands in Tauri.",
    contributions: [
      "Built modular workflows for games, hardware, system care, media, and settings.",
      "Kept UI state separate from native commands and system boundaries.",
      "Added verification paths for packaged behavior instead of relying only on development mode.",
    ],
    evidence: [
      "Typed Tauri command boundaries",
      "Packaged smoke checks",
      "Release checks and maintained project documentation",
    ],
    outcome:
      "A maintainable desktop shell whose interface and native responsibilities stay explicit.",
    stack: ["Tauri", "React", "TypeScript", "Rust"],
    preview: "liquid-utility",
  },
  {
    id: "02",
    slug: "filsafit",
    name: "Filsafit",
    summary:
      "A philosophy learning platform with an encyclopedia, school comparison, scored quiz, profiles, authentication, history, and shareable result cards.",
    context:
      "The application needs clear learning flows while protecting user data and keeping quiz scoring trustworthy.",
    role:
      "I work across product UI, application flows, domain logic, and Supabase-backed data and authentication.",
    contributions: [
      "Designed encyclopedia, comparison, quiz, profile, history, and result-sharing flows.",
      "Separated quiz scoring into testable domain logic.",
      "Integrated authenticated Postgres data with row-level security.",
    ],
    evidence: [
      "Supabase Auth and RLS",
      "Isolated quiz tests",
      "Type, lint, and production-build CI checks",
    ],
    outcome:
      "A testable learning experience with authenticated history and shareable quiz results.",
    stack: ["Next.js", "React", "TypeScript", "Supabase"],
    preview: "filsafit",
  },
  {
    id: "03",
    slug: "arindra-production",
    name: "Arindra Production Web",
    summary:
      "A responsive production-house website with client-facing content, authentication, forms, and administrative content workflows.",
    context:
      "The site has to present production services clearly while supporting maintainable content operations behind the public experience.",
    role:
      "I implemented the responsive interface and connected public pages with Laravel-backed admin, authentication, form, and content flows.",
    contributions: [
      "Built responsive marketing and portfolio sections.",
      "Implemented admin authentication and structured content workflows.",
      "Documented the application so future changes remain easier to trace.",
    ],
    evidence: [
      "Laravel application structure",
      "Authenticated admin workflows",
      "Data-backed forms and responsive pages",
    ],
    outcome:
      "A coherent client and admin experience around structured production content.",
    stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js"],
    preview: "arindra",
  },
] as const satisfies readonly FeaturedProject[];

export const capabilities = [
  {
    title: "Interface engineering",
    description:
      "Responsive systems, accessible controls, and interfaces organized around real tasks.",
    evidence: "React, Next.js, Blade, Tailwind CSS, and plain CSS",
  },
  {
    title: "Application architecture",
    description:
      "Clear boundaries across interface state, domain logic, backend services, and native commands.",
    evidence: "Tauri commands, Laravel services, and testable domain modules",
  },
  {
    title: "Data and authentication",
    description:
      "SQL-backed products with authentication, permissions, and row-level security.",
    evidence: "Supabase, PostgreSQL, MySQL, and SQLite",
  },
  {
    title: "Delivery discipline",
    description:
      "Type checks, automated tests, CI, documentation, and packaged verification.",
    evidence: "GitHub Actions, Vitest, Cargo, and release checks",
  },
] as const satisfies readonly Capability[];

export const additionalWork = [
  {
    name: "Toggle-Mod",
    stack: "Java / Fabric",
    summary:
      "Minecraft client tooling for soft-disabling selected mods through a GUI and commands.",
  },
  {
    name: "QuickDL",
    stack: "Utility tooling",
    summary: "A focused downloader utility built around a small practical workflow.",
  },
  {
    name: "Website Kota Medan",
    stack: "PHP / MySQL / JavaScript",
    summary:
      "An earlier information platform covering tourism, culture, local products, accounts, and admin workflows.",
  },
] as const satisfies readonly AdditionalWork[];
```

- [ ] **Step 6: Run the focused test and typecheck**

Run:

```powershell
npm test -- --run src/data/portfolio.test.ts
npm run typecheck
```

Expected: both commands exit `0`; Vitest reports four passing tests.

- [ ] **Step 7: Commit the test foundation and content contract**

```powershell
git add .gitignore package.json package-lock.json vite.config.ts src/test/setup.ts src/data/portfolio.ts src/data/portfolio.test.ts
git commit -m "test: add portfolio content contract"
```

---

### Task 2: Implement Theme State and Accessible Site Navigation

**Files:**
- Create: `src/lib/theme.ts`
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteHeader.test.tsx`

**Interfaces:**
- Consumes: `profile.github` and `profile.linkedin` from `src/data/portfolio.ts`.
- Produces: `Theme`, `THEME_STORAGE_KEY`, `readInitialTheme()`, and `applyTheme(theme)`.
- Produces: `ThemeToggle` and `SiteHeader` components for `App.tsx`.

- [ ] **Step 1: Write failing header, theme, and keyboard tests**

Create `src/components/SiteHeader.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";
import { THEME_STORAGE_KEY } from "../lib/theme";

describe("SiteHeader", () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="theme-color" content="#010409">';
  });

  it("shows the approved navigation and exposes mobile menu state", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /kv \/ dz00 home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");

    const menu = screen.getByRole("button", { name: /open navigation/i });
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveTextContent("Menu");

    await user.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveTextContent("Close");
    expect(screen.getByRole("navigation", { name: /primary/i })).toHaveClass("is-open");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(menu).toHaveAttribute("aria-expanded", "false");
  });

  it("persists and applies the selected theme", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    render(<SiteHeader />);

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("dark");
    });

    await user.click(screen.getByRole("button", { name: /switch to light theme/i }));

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#f6f8fa",
    );
  });

  it("closes the mobile menu after a navigation choice", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const menu = screen.getByRole("button", { name: /open navigation/i });
    await user.click(menu);
    await user.click(screen.getByRole("link", { name: "Capabilities" }));

    expect(menu).toHaveAttribute("aria-expanded", "false");
  });
});
```

- [ ] **Step 2: Run the header test and confirm the red state**

Run:

```powershell
npm test -- --run src/components/SiteHeader.test.tsx
```

Expected: FAIL because `SiteHeader` and `theme` do not exist.

- [ ] **Step 3: Implement the theme contract**

Create `src/lib/theme.ts`:

```ts
export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "kvdz00-portfolio-theme";

const themeColors: Record<Theme, string> = {
  dark: "#010409",
  light: "#f6f8fa",
};

export function readInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" || saved === "dark" ? saved : "dark";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColors[theme]);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
```

- [ ] **Step 4: Implement the theme control**

Create `src/components/ThemeToggle.tsx`:

```tsx
import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { applyTheme, readInitialTheme, type Theme } from "../lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
    >
      {theme === "dark" ? (
        <Moon aria-hidden="true" size={18} weight="bold" />
      ) : (
        <Sun aria-hidden="true" size={18} weight="bold" />
      )}
    </button>
  );
}
```

- [ ] **Step 5: Implement the accessible site header**

Create `src/components/SiteHeader.tsx`:

```tsx
import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  ["Work", "#work"],
  ["Capabilities", "#capabilities"],
  ["Profile", "#profile"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="KV / DZ00 home">
        <strong>KV</strong>
        <span>/ DZ00</span>
      </a>

      <nav
        id="primary-navigation"
        className={`site-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Primary navigation"
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={18} weight="bold" />
          ) : (
            <List aria-hidden="true" size={18} weight="bold" />
          )}
          <span>{isMenuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 6: Run focused tests and typecheck**

Run:

```powershell
npm test -- --run src/components/SiteHeader.test.tsx
npm run typecheck
```

Expected: three passing header tests and typecheck exit `0`.

- [ ] **Step 7: Commit navigation and theme behavior**

```powershell
git add src/lib/theme.ts src/components/ThemeToggle.tsx src/components/SiteHeader.tsx src/components/SiteHeader.test.tsx
git commit -m "feat: add accessible portfolio navigation"
```

---

### Task 3: Build the Recruiter Hero and Technical Proof Strip

**Files:**
- Create: `public/profile-avatar.png`
- Create: `src/components/ProfileCard.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/ProofStrip.tsx`
- Create: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `Profile`, `profile`, and `proofItems` from `src/data/portfolio.ts`.
- Produces: `ProfileCard`, `Hero`, and `ProofStrip`.
- `ProfileCard` takes `{ profile: Profile }` and changes to a text monogram after image failure.

- [ ] **Step 1: Write the failing hero and fallback tests**

Create `src/components/Hero.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";
import { ProofStrip } from "./ProofStrip";

describe("recruiter introduction", () => {
  it("states the approved role, student status, and actions", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /i build useful software for real workflows/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/grade 12 vocational student/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute(
      "href",
      "mailto:kahfiworks.id@gmail.com",
    );
    expect(screen.getByRole("link", { name: /view selected work/i })).toHaveAttribute(
      "href",
      "#work",
    );
  });

  it("replaces a failed local avatar with the KV monogram", () => {
    render(<Hero />);
    fireEvent.error(screen.getByRole("img", { name: /muhammad dzikrul kahfi/i }));
    expect(screen.getByText("KV")).toBeInTheDocument();
  });

  it("shows the four approved proof categories", () => {
    render(<ProofStrip />);
    for (const label of ["Web", "Desktop", "Data", "Delivery"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run the hero test and confirm the red state**

Run:

```powershell
npm test -- --run src/components/Hero.test.tsx
```

Expected: FAIL because `Hero` and `ProofStrip` do not exist.

- [ ] **Step 3: Download and verify the approved local avatar**

Run:

```powershell
Invoke-WebRequest -Uri "https://github.com/KVdz00.png?size=240" -OutFile "public/profile-avatar.png"
Add-Type -AssemblyName System.Drawing
$avatar = [System.Drawing.Image]::FromFile((Resolve-Path "public/profile-avatar.png"))
try {
  if ($avatar.Width -lt 96 -or $avatar.Height -lt 96) {
    throw "Avatar is smaller than 96 by 96 pixels."
  }
  "$($avatar.Width)x$($avatar.Height)"
} finally {
  $avatar.Dispose()
}
```

Expected: the request succeeds and the printed dimensions are at least `96x96`.

- [ ] **Step 4: Implement the compact profile card**

Create `src/components/ProfileCard.tsx`:

```tsx
import { useState } from "react";
import type { Profile } from "../data/portfolio";

export function ProfileCard({ profile }: { profile: Profile }) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <aside className="profile-card" aria-label="Profile summary">
      <div className="profile-card__identity">
        {avatarFailed ? (
          <span className="profile-card__fallback" aria-hidden="true">
            KV
          </span>
        ) : (
          <img
            src="/profile-avatar.png"
            alt={profile.name}
            onError={() => setAvatarFailed(true)}
          />
        )}
        <div>
          <strong>{profile.name}</strong>
          <span className="availability">
            <i aria-hidden="true" />
            {profile.availability}
          </span>
        </div>
      </div>
      <dl className="profile-card__facts">
        <div><dt>Based</dt><dd>{profile.location}</dd></div>
        <div><dt>Current</dt><dd>Grade 12 SMK</dd></div>
        <div><dt>Focus</dt><dd>{profile.role}</dd></div>
        <div><dt>Timezone</dt><dd>{profile.timezone}</dd></div>
      </dl>
      <div className="profile-card__links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </aside>
  );
}
```

- [ ] **Step 5: Implement the hero and proof strip**

Create `src/components/Hero.tsx`:

```tsx
import { EnvelopeSimple } from "@phosphor-icons/react";
import { profile } from "../data/portfolio";
import { ProfileCard } from "./ProfileCard";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">Software developer / Student</p>
        <h1 id="hero-title">I build useful software for real workflows.</h1>
        <p className="hero__summary">
          I am a Grade 12 vocational student building web applications,
          Windows utilities, and developer tools with clear interfaces and
          reliable delivery.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href={`mailto:${profile.email}`}>
            <EnvelopeSimple aria-hidden="true" size={16} weight="bold" /> Email me
          </a>
          <a className="button button--secondary" href="#work">
            View selected work
          </a>
        </div>
      </div>
      <ProfileCard profile={profile} />
    </section>
  );
}
```

Create `src/components/ProofStrip.tsx`:

```tsx
import { proofItems } from "../data/portfolio";

export function ProofStrip() {
  return (
    <section className="proof-strip" aria-labelledby="proof-title">
      <h2 id="proof-title" className="sr-only">Technical focus</h2>
      {proofItems.map((item) => (
        <div className="proof-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 6: Run focused tests and typecheck**

Run:

```powershell
npm test -- --run src/components/Hero.test.tsx
npm run typecheck
```

Expected: three passing hero tests and typecheck exit `0`.

- [ ] **Step 7: Commit the recruiter introduction**

```powershell
git add public/profile-avatar.png src/components/ProfileCard.tsx src/components/Hero.tsx src/components/ProofStrip.tsx src/components/Hero.test.tsx
git commit -m "feat: add recruiter-focused portfolio hero"
```

---

### Task 4: Build the Featured Case Studies and Product Previews

**Files:**
- Create: `src/components/project-previews/LiquidUtilityPreview.tsx`
- Create: `src/components/project-previews/FilsafitPreview.tsx`
- Create: `src/components/project-previews/ArindraPreview.tsx`
- Create: `src/components/ProjectPreview.tsx`
- Create: `src/components/ProjectCaseStudy.tsx`
- Create: `src/components/FeaturedWork.tsx`
- Create: `src/components/FeaturedWork.test.tsx`

**Interfaces:**
- Consumes: `FeaturedProject`, `ProjectPreviewKey`, and `featuredProjects`.
- Produces: `ProjectPreview({ type })`, `ProjectCaseStudy({ project })`, and `FeaturedWork`.
- Preview components are decorative and expose no focusable elements.

- [ ] **Step 1: Write the failing selected-work tests**

Create `src/components/FeaturedWork.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedWork } from "./FeaturedWork";

describe("FeaturedWork", () => {
  it("renders the three approved case studies in order", () => {
    render(<FeaturedWork />);
    const articles = screen.getAllByRole("article");

    expect(articles).toHaveLength(3);
    expect(
      articles.map((article) => within(article).getByRole("heading", { level: 3 }).textContent),
    ).toEqual(["Liquid Utility", "Filsafit", "Arindra Production Web"]);
  });

  it("renders responsibility, evidence, outcome, and stack for every project", () => {
    render(<FeaturedWork />);

    for (const article of screen.getAllByRole("article")) {
      expect(within(article).getByText("My role")).toBeInTheDocument();
      expect(within(article).getByText("Engineering evidence")).toBeInTheDocument();
      expect(within(article).getByText("Outcome")).toBeInTheDocument();
      expect(within(article).getByRole("list", { name: /technology stack/i })).toBeInTheDocument();
    }
  });

  it("does not render project actions without verified URLs", () => {
    render(<FeaturedWork />);
    expect(screen.queryByRole("link", { name: /visit project/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /view repository/i })).not.toBeInTheDocument();
  });

  it("shows a useful fallback when featured work is empty", () => {
    render(<FeaturedWork projects={[]} />);
    expect(screen.getByText(/project details are being reviewed/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute(
      "href",
      "mailto:kahfiworks.id@gmail.com",
    );
  });
});
```

- [ ] **Step 2: Run the selected-work tests and confirm the red state**

Run:

```powershell
npm test -- --run src/components/FeaturedWork.test.tsx
```

Expected: FAIL because `FeaturedWork` does not exist.

- [ ] **Step 3: Implement the three decorative preview components**

Create `LiquidUtilityPreview.tsx` with this structure:

```tsx
export function LiquidUtilityPreview() {
  return (
    <div className="product-preview preview-liquid" aria-hidden="true">
      <div className="preview-window__bar"><span>Liquid Utility</span><i /><i /></div>
      <div className="preview-liquid__layout">
        <div className="preview-liquid__rail">
          <strong>LU</strong>
          <span className="is-active">Games</span>
          <span>Hardware</span>
          <span>System care</span>
          <span>Media</span>
        </div>
        <div className="preview-liquid__main">
          <small>Game launcher</small>
          <b>Your Windows library</b>
          <div className="preview-liquid__cards">
            <span>Steam library</span><span>Manual game</span><span>Recent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Create `FilsafitPreview.tsx`:

```tsx
export function FilsafitPreview() {
  return (
    <div className="product-preview preview-filsafit" aria-hidden="true">
      <div className="preview-window__bar"><span>Filsafit</span><i /><i /></div>
      <div className="preview-filsafit__hero">
        <small>Philosophy explorer</small>
        <b>Compare ideas. Test your perspective.</b>
      </div>
      <div className="preview-filsafit__grid">
        <span>Encyclopedia</span><span>School comparison</span><span>Scored quiz</span>
      </div>
      <div className="preview-filsafit__result">
        <small>Result profile</small><strong>Stoicism</strong>
      </div>
    </div>
  );
}
```

Create `ArindraPreview.tsx`:

```tsx
export function ArindraPreview() {
  return (
    <div className="product-preview preview-arindra" aria-hidden="true">
      <div className="preview-window__bar"><span>Arindra Production</span><i /><i /></div>
      <div className="preview-arindra__hero">
        <small>Surabaya / Production house</small>
        <b>Production services in one clear view.</b>
        <span>Showreel</span>
      </div>
      <div className="preview-arindra__services">
        <span>Video</span><span>Photography</span><span>Live streaming</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement exhaustive preview dispatch**

Create `src/components/ProjectPreview.tsx`:

```tsx
import type { ProjectPreviewKey } from "../data/portfolio";
import { ArindraPreview } from "./project-previews/ArindraPreview";
import { FilsafitPreview } from "./project-previews/FilsafitPreview";
import { LiquidUtilityPreview } from "./project-previews/LiquidUtilityPreview";

export function ProjectPreview({ type }: { type: ProjectPreviewKey }) {
  switch (type) {
    case "liquid-utility":
      return <LiquidUtilityPreview />;
    case "filsafit":
      return <FilsafitPreview />;
    case "arindra":
      return <ArindraPreview />;
  }
}
```

- [ ] **Step 5: Implement the semantic project case study**

Create `src/components/ProjectCaseStudy.tsx`:

```tsx
import type { FeaturedProject as FeaturedProjectData } from "../data/portfolio";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectCaseStudy({ project }: { project: FeaturedProjectData }) {
  return (
    <article className="case-study" aria-labelledby={`${project.slug}-title`}>
      <div className="case-study__index">{project.id}</div>
      <div className="case-study__content">
        <p className="section-kicker">Featured work</p>
        <h3 id={`${project.slug}-title`}>{project.name}</h3>
        <p className="case-study__summary">{project.summary}</p>

        <dl className="case-study__facts">
          <div><dt>Context</dt><dd>{project.context}</dd></div>
          <div><dt>My role</dt><dd>{project.role}</dd></div>
          <div>
            <dt>Key contributions</dt>
            <dd><ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul></dd>
          </div>
          <div>
            <dt>Engineering evidence</dt>
            <dd><ul>{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul></dd>
          </div>
          <div><dt>Outcome</dt><dd>{project.outcome}</dd></div>
        </dl>

        <ul className="stack-list" aria-label={`${project.name} technology stack`}>
          {project.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>

        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer">Visit project</a>
        ) : null}
      </div>
      <ProjectPreview type={project.preview} />
    </article>
  );
}
```

- [ ] **Step 6: Implement the featured-work section**

Create `src/components/FeaturedWork.tsx`:

```tsx
import {
  featuredProjects,
  profile,
  type FeaturedProject as FeaturedProjectData,
} from "../data/portfolio";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

export function FeaturedWork({
  projects = featuredProjects,
}: {
  projects?: readonly FeaturedProjectData[];
}) {
  return (
    <section className="featured-work" id="work" aria-labelledby="work-title">
      <header className="section-heading">
        <p className="section-kicker">Selected work / 2026</p>
        <h2 id="work-title">Projects that show how I build.</h2>
        <p>Three products, each presented through responsibility and engineering evidence.</p>
      </header>
      {projects.length > 0 ? (
        <div className="case-study-list">
          {projects.map((project) => (
            <ProjectCaseStudy key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="work-empty" role="status">
          Project details are being reviewed. <a href={`mailto:${profile.email}`}>Email me</a>
          for current work samples.
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 7: Run focused tests and typecheck**

Run:

```powershell
npm test -- --run src/components/FeaturedWork.test.tsx
npm run typecheck
```

Expected: four passing selected-work tests and typecheck exit `0`.

- [ ] **Step 8: Commit the featured project system**

```powershell
git add src/components/FeaturedWork.tsx src/components/FeaturedWork.test.tsx src/components/ProjectCaseStudy.tsx src/components/ProjectPreview.tsx src/components/project-previews
git commit -m "feat: add evidence-rich project case studies"
```

---

### Task 5: Complete the Recruiter Sections and Compose the Page

**Files:**
- Create: `src/components/Capabilities.tsx`
- Create: `src/components/ProfileAndMoreWork.tsx`
- Create: `src/components/Contact.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/App.test.tsx`
- Modify: `src/App.tsx:1-543`

**Interfaces:**
- Consumes: `capabilities`, `additionalWork`, and `profile`.
- Consumes: all components produced by Tasks 2-4.
- Produces: the final semantic page tree rendered by `App`.

- [ ] **Step 1: Write the failing page-composition test**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("portfolio page", () => {
  it("renders the approved landmark and heading structure", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: /engineering capabilities/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /open to the next opportunity/i })).toBeInTheDocument();
  });

  it("includes approved contact links and no resume action", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /email kahfi/i })).toHaveAttribute(
      "href",
      "mailto:kahfiworks.id@gmail.com",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/KVdz00",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386",
    );
    expect(screen.queryByText(/resume|cv/i)).not.toBeInTheDocument();
  });

  it("keeps navigation targets unique and present", () => {
    const { container } = render(<App />);
    for (const id of ["top", "work", "capabilities", "profile", "contact"]) {
      expect(container.querySelectorAll(`#${id}`)).toHaveLength(1);
    }
  });
});
```

- [ ] **Step 2: Run the page test and confirm the red state**

Run:

```powershell
npm test -- --run src/App.test.tsx
```

Expected: FAIL because the approved page composition does not yet exist.

- [ ] **Step 3: Implement capabilities and profile sections**

Create `Capabilities.tsx`:

```tsx
import { capabilities } from "../data/portfolio";

export function Capabilities() {
  return (
    <section className="capabilities" id="capabilities" aria-labelledby="capabilities-title">
      <header className="section-heading">
        <p className="section-kicker">Repeated strengths</p>
        <h2 id="capabilities-title">Engineering capabilities</h2>
      </header>
      <div className="capability-grid">
        {capabilities.map((capability, index) => (
          <article key={capability.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
            <small>{capability.evidence}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `ProfileAndMoreWork.tsx`:

```tsx
import { additionalWork } from "../data/portfolio";

export function ProfileAndMoreWork() {
  return (
    <section className="profile-section" id="profile" aria-labelledby="profile-title">
      <div className="profile-section__intro">
        <p className="section-kicker">Profile / More work</p>
        <h2 id="profile-title">Learning by building and maintaining real projects.</h2>
        <p>
          I am a Grade 12 vocational student in Indonesia. I work across interfaces,
          application logic, data, native desktop boundaries, testing, and delivery,
          then document decisions so each project is easier to continue.
        </p>
      </div>
      <div className="more-work">
        {additionalWork.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <span>{project.stack}</span>
            <p>{project.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement contact and footer**

Create `Contact.tsx`:

```tsx
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "../data/portfolio";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="section-kicker">Contact / UTC +7</p>
        <h2 id="contact-title">Looking for an internship or junior software role.</h2>
        <p>
          I am available for internship, vocational placement, and junior software
          developer conversations.
        </p>
      </div>
      <div className="contact__actions">
        <a className="contact__primary" href={`mailto:${profile.email}`}>
          <EnvelopeSimple aria-hidden="true" size={20} weight="bold" />
          <span><small>Email Kahfi</small>{profile.email}</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <LinkedinLogo aria-hidden="true" size={20} weight="bold" />
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <GithubLogo aria-hidden="true" size={20} weight="bold" />
          GitHub
        </a>
      </div>
    </section>
  );
}
```

Create `SiteFooter.tsx`:

```tsx
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>Copyright 2026 Muhammad Dzikrul Kahfi</span>
      <a href="#top" aria-label="Back to top">KV / DZ00</a>
    </footer>
  );
}
```

- [ ] **Step 5: Replace `App.tsx` with focused page composition**

Use this exact component order:

```tsx
import { Capabilities } from "./components/Capabilities";
import { Contact } from "./components/Contact";
import { FeaturedWork } from "./components/FeaturedWork";
import { Hero } from "./components/Hero";
import { ProfileAndMoreWork } from "./components/ProfileAndMoreWork";
import { ProofStrip } from "./components/ProofStrip";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofStrip />
        <FeaturedWork />
        <Capabilities />
        <ProfileAndMoreWork />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
```

- [ ] **Step 6: Run page and full component tests**

Run:

```powershell
npm test -- --run src/App.test.tsx src/components/Hero.test.tsx src/components/FeaturedWork.test.tsx src/components/SiteHeader.test.tsx
npm run typecheck
```

Expected: all focused tests pass and typecheck exits `0`.

- [ ] **Step 7: Commit the composed recruiter page**

```powershell
git add src/App.tsx src/App.test.tsx src/components/Capabilities.tsx src/components/ProfileAndMoreWork.tsx src/components/Contact.tsx src/components/SiteFooter.tsx
git commit -m "feat: compose recruiter portfolio sections"
```

---

### Task 6: Implement the GitHub-DNA Visual System and Responsive Layout

**Files:**
- Create: `src/styles.contract.test.ts`
- Modify: `src/styles.css:1-1710`

**Interfaces:**
- Consumes: every class name produced by Tasks 2-5.
- Produces: dark/light tokens, component presentation, responsive layouts, focus states, and reduced-motion behavior.

- [ ] **Step 1: Write the failing stylesheet contract**

Create `src/styles.contract.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

describe("visual system contract", () => {
  it("defines the approved semantic color tokens", () => {
    for (const token of [
      "--canvas: oklch(13% 0.015 255)",
      "--surface: oklch(21% 0.02 255)",
      "--border: oklch(32% 0.025 255)",
      "--text: oklch(96% 0.008 250)",
      "--action: oklch(62% 0.19 255)",
      "--identity: oklch(78% 0.13 183)",
      "--status: oklch(72% 0.18 145)",
    ]) {
      expect(styles).toContain(token);
    }
  });

  it("defines light mode, visible focus, mobile layout, and reduced motion", () => {
    expect(styles).toContain('html[data-theme="light"]');
    expect(styles).toContain(":focus-visible");
    expect(styles).toContain("@media (min-width: 46rem)");
    expect(styles).toContain("@media (min-width: 64rem)");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });
});
```

- [ ] **Step 2: Run the stylesheet test and confirm the red state**

Run:

```powershell
npm test -- --run src/styles.contract.test.ts
```

Expected: FAIL because the current stylesheet uses the old token names and breakpoints.

- [ ] **Step 3: Replace the global tokens and foundations**

Start `src/styles.css` with this exact foundation:

```css
:root {
  color-scheme: dark;
  --canvas: oklch(13% 0.015 255);
  --base: oklch(17% 0.018 255);
  --surface: oklch(21% 0.02 255);
  --surface-muted: oklch(25% 0.022 255);
  --border: oklch(32% 0.025 255);
  --border-strong: oklch(43% 0.03 255);
  --text: oklch(96% 0.008 250);
  --text-muted: oklch(68% 0.025 250);
  --action: oklch(62% 0.19 255);
  --action-hover: oklch(73% 0.14 250);
  --identity: oklch(78% 0.13 183);
  --status: oklch(72% 0.18 145);
  --header: oklch(17% 0.018 255 / 90%);
  --max-width: 1440px;
  --page-pad: clamp(1rem, 3vw, 2.5rem);
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --mono: "Cascadia Mono", "SFMono-Regular", Consolas, monospace;
}

html[data-theme="light"] {
  color-scheme: light;
  --canvas: oklch(97.5% 0.006 250);
  --base: oklch(99% 0.004 250);
  --surface: oklch(96% 0.01 250);
  --surface-muted: oklch(92.5% 0.015 250);
  --border: oklch(83% 0.02 250);
  --border-strong: oklch(68% 0.03 250);
  --text: oklch(24% 0.025 250);
  --text-muted: oklch(47% 0.035 250);
  --action: oklch(52% 0.2 255);
  --action-hover: oklch(43% 0.18 255);
  --identity: oklch(47% 0.11 183);
  --status: oklch(48% 0.16 145);
  --header: oklch(99% 0.004 250 / 92%);
}

* {
  box-sizing: border-box;
}

html {
  background: var(--canvas);
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

body {
  min-width: 320px;
  margin: 0;
  background: var(--canvas);
  color: var(--text);
  font-family: var(--sans);
  line-height: 1.5;
  text-rendering: optimizeLegibility;
}

p,
li,
dd {
  max-width: 70ch;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

:focus-visible {
  outline: 2px solid var(--action-hover);
  outline-offset: 3px;
}

::selection {
  background: color-mix(in oklch, var(--action) 34%, transparent);
}
```

- [ ] **Step 4: Implement component and section layout rules**

Add rules for every selector in this table. Use only the listed radius and motion values.

| Selector group | Required layout and behavior |
| --- | --- |
| `.skip-link` | Fixed above viewport; moves to `top: 1rem` on focus |
| `.site-header` | Sticky narrow-first grid, 1 px bottom border, solid `--header` separation without glass blur |
| `.brand-mark`, `.site-nav`, `.header-actions` | Mono metadata, visible labels, and 44 px controls with at least 8 px target separation |
| `.menu-toggle` | Visible labeled control in the base layout; hidden only after the navigation row fits at 46 rem |
| `.hero` | One-column base layout, restrained blue-teal atmosphere tied to the GitHub banner, two columns only at wide content pressure |
| `.profile-card` | 8 px radius, 1 px border, compact identity row and two-column facts |
| `.button` | 6 px radius, 44 px minimum height, blue filled primary and bordered secondary |
| `.proof-strip` | One-column base flow, two intermediate columns, four equal wide columns with structural borders |
| `.section-heading` | Left-aligned bounded copy and mono kicker |
| `.case-study` | Index rail, evidence copy, and preview columns; square structural band |
| `.case-study__facts` | Two-column definition grid, lists with visible bullets, no decorative cards |
| `.stack-list` | Wrapped mono labels separated by structural rules, not pills |
| `.product-preview` | 8 px inner radius, intentional `overflow: clip` for mock-window cropping, no focusable content |
| `.capability-grid` | One-column base flow, two columns when content width permits, 1 px grid separators |
| `.profile-section`, `.contact` | One-column base flow and two-column wide editorial grids |
| `.contact__primary` | Strong blue action; secondary links remain bordered text actions |
| `.site-footer` | Compact two-ended close with border top |

Implement project-preview differentiation with these color roles:

```css
.preview-liquid {
  --preview-accent: oklch(55% 0.2 255);
  background: oklch(96% 0.025 255);
  color: oklch(26% 0.035 255);
}

.preview-filsafit {
  --preview-accent: oklch(47% 0.11 183);
  background: oklch(95% 0.025 92);
  color: oklch(27% 0.025 75);
}

.preview-arindra {
  --preview-accent: oklch(58% 0.2 255);
  background: oklch(24% 0.07 260);
  color: oklch(96% 0.012 250);
}

.preview-window__bar {
  min-height: 2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.75rem;
  border-bottom: 1px solid color-mix(in oklch, currentColor 18%, transparent);
  font-family: var(--mono);
  font-size: 0.65rem;
  font-weight: 700;
}

.preview-window__bar span {
  margin-right: auto;
}

.preview-window__bar i {
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
}
```

Use `transform: translateY(-1px)` and `transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), background-color 180ms cubic-bezier(0.16, 1, 0.3, 1)` for hoverable actions. Do not animate layout properties or apply a blanket transition to all descendants.

- [ ] **Step 5: Implement the exact responsive and motion contracts**

Add:

```css
.site-header {
  grid-template-columns: 1fr auto;
  min-height: 4rem;
  padding-inline: 1rem;
}

.site-nav {
  position: absolute;
  inset: calc(100% + 1px) 0 auto;
  display: none;
  padding: 0.75rem 1rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--base);
}

.site-nav.is-open {
  display: grid;
}

.site-nav a,
.menu-toggle,
.theme-toggle {
  min-height: 44px;
}

.site-nav a {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.menu-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.hero,
.case-study,
.profile-section,
.contact,
.proof-strip,
.capability-grid,
.case-study__facts,
.contact__actions {
  grid-template-columns: 1fr;
}

.hero {
  padding: 3.5rem 1rem 2rem;
}

.hero h1 {
  font-size: clamp(2.25rem, 10vw, 3rem);
}

.case-study {
  padding-inline: 1rem;
}

.case-study__index {
  padding-top: 1.5rem;
}

.product-preview {
  min-height: 18rem;
}

@media (min-width: 46rem) {
  .site-header {
    grid-template-columns: auto 1fr auto;
    padding-inline: var(--page-pad);
  }

  .site-nav {
    position: static;
    display: flex;
    justify-content: center;
    padding: 0;
    border: 0;
    background: transparent;
  }

  .site-nav a {
    border: 0;
  }

  .menu-toggle {
    display: none;
  }

  .proof-strip,
  .capability-grid,
  .case-study__facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero,
  .case-study {
    padding-inline: var(--page-pad);
  }
}

@media (min-width: 64rem) {
  .hero,
  .profile-section,
  .contact {
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
  }

  .case-study {
    grid-template-columns: 4rem minmax(0, 1fr) minmax(22rem, 0.9fr);
  }

  .proof-strip {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .product-preview {
    min-height: 22rem;
  }
}

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

- [ ] **Step 6: Run the stylesheet contract, component tests, and build**

Run:

```powershell
npm test -- --run src/styles.contract.test.ts src/App.test.tsx
npm run typecheck
npm run build
```

Expected: stylesheet and page tests pass; typecheck and production build exit `0`.

- [ ] **Step 7: Commit the visual system**

```powershell
git add src/styles.css src/styles.contract.test.ts
git commit -m "feat: apply GitHub-inspired visual system"
```

---

### Task 7: Refresh Metadata and Deterministic Brand Assets

**Files:**
- Create: `src/metadata.test.ts`
- Create: `scripts/generate-brand-assets.ps1`
- Modify: `index.html:1-72`
- Modify: `public/favicon.svg:1-5`
- Modify: `public/apple-touch-icon.png`
- Modify: `public/og-image.png`

**Interfaces:**
- Produces: canonical public URL `https://dzikrulkahfi.my.id/`.
- Produces: 1200 by 630 OG image and 180 by 180 Apple touch icon.
- Preserves: pre-render theme initialization using `kvdz00-portfolio-theme`.

- [ ] **Step 1: Write the failing metadata and asset contract**

Create `src/metadata.test.ts`:

```ts
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");

describe("public metadata", () => {
  it("uses the public custom domain and approved positioning", () => {
    expect(html).toContain('href="https://dzikrulkahfi.my.id/"');
    expect(html).toContain('content="https://dzikrulkahfi.my.id/"');
    expect(html).toContain("Grade 12 vocational student");
    expect(html).toContain('"jobTitle": "Software Developer"');
  });

  it("references local social assets with useful alt text", () => {
    expect(html).toContain("https://dzikrulkahfi.my.id/og-image.png");
    expect(html).toContain("Muhammad Dzikrul Kahfi portfolio");

    for (const asset of ["og-image.png", "apple-touch-icon.png", "favicon.svg"]) {
      const path = resolve(root, "public", asset);
      expect(existsSync(path)).toBe(true);
      expect(statSync(path).size).toBeGreaterThan(100);
    }
  });
});
```

- [ ] **Step 2: Run the metadata test and confirm the red state**

Run:

```powershell
npm test -- --run src/metadata.test.ts
```

Expected: FAIL because `index.html` still uses the Vercel canonical URL and old positioning.

- [ ] **Step 3: Update `index.html` metadata and theme boot**

Use these exact public values:

```html
<meta
  name="description"
  content="Muhammad Dzikrul Kahfi is a Grade 12 vocational student and software developer building practical web apps, Windows utilities, and developer tools."
/>
<meta name="author" content="Muhammad Dzikrul Kahfi" />
<meta name="theme-color" content="#010409" />
<link rel="canonical" href="https://dzikrulkahfi.my.id/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="KVdz00 Portfolio" />
<meta property="og:title" content="Muhammad Dzikrul Kahfi | Software Developer" />
<meta
  property="og:description"
  content="Grade 12 vocational student building practical web apps, Windows utilities, and developer tools."
/>
<meta property="og:url" content="https://dzikrulkahfi.my.id/" />
<meta property="og:image" content="https://dzikrulkahfi.my.id/og-image.png" />
<meta
  property="og:image:alt"
  content="Muhammad Dzikrul Kahfi portfolio with recruiter-focused software project highlights."
/>
```

Set the document title to:

```html
<title>Muhammad Dzikrul Kahfi | Software Developer</title>
```

Update the theme boot's dark and light colors to `#010409` and `#f6f8fa`.

Use this JSON-LD identity:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muhammad Dzikrul Kahfi",
  "alternateName": "KVdz00",
  "url": "https://dzikrulkahfi.my.id/",
  "image": "https://dzikrulkahfi.my.id/profile-avatar.png",
  "sameAs": [
    "https://github.com/KVdz00",
    "https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386"
  ],
  "email": "mailto:kahfiworks.id@gmail.com",
  "jobTitle": "Software Developer",
  "description": "Grade 12 vocational student building practical web applications, Windows utilities, and developer tools."
}
```

- [ ] **Step 4: Replace the favicon with the approved monogram**

Replace `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#010409"/>
  <path d="M14 14h8v14l12-14h10L30 30l15 20H35L24 35l-2 2v13h-8V14Z" fill="#f0f6fc"/>
  <path d="M47 14h5v36h-5z" fill="#2dd4bf"/>
</svg>
```

- [ ] **Step 5: Add the deterministic brand-asset generator**

Create `scripts/generate-brand-assets.ps1`:

```powershell
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path $PSScriptRoot -Parent
$publicDir = Join-Path $projectRoot "public"

function New-TextBrush([string]$color) {
  return [System.Drawing.SolidBrush]::new(
    [System.Drawing.ColorTranslator]::FromHtml($color)
  )
}

$og = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($og)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  [System.Drawing.Rectangle]::new(0, 0, 1200, 630),
  [System.Drawing.ColorTranslator]::FromHtml("#010409"),
  [System.Drawing.ColorTranslator]::FromHtml("#0f2c4b"),
  20
)
$blueGlow = [System.Drawing.SolidBrush]::new(
  [System.Drawing.Color]::FromArgb(95, 47, 129, 247)
)
$tealGlow = [System.Drawing.SolidBrush]::new(
  [System.Drawing.Color]::FromArgb(80, 45, 212, 191)
)
$borderPen = [System.Drawing.Pen]::new(
  [System.Drawing.ColorTranslator]::FromHtml("#30363d"),
  2
)
$displayFont = [System.Drawing.Font]::new(
  "Segoe UI",
  58,
  [System.Drawing.FontStyle]::Bold,
  [System.Drawing.GraphicsUnit]::Pixel
)
$bodyFont = [System.Drawing.Font]::new(
  "Segoe UI",
  25,
  [System.Drawing.FontStyle]::Regular,
  [System.Drawing.GraphicsUnit]::Pixel
)
$monoFont = [System.Drawing.Font]::new(
  "Consolas",
  18,
  [System.Drawing.FontStyle]::Bold,
  [System.Drawing.GraphicsUnit]::Pixel
)
$textBrush = New-TextBrush "#f0f6fc"
$mutedBrush = New-TextBrush "#8b949e"
$tealBrush = New-TextBrush "#2dd4bf"

try {
  $graphics.FillRectangle($background, 0, 0, 1200, 630)
  $graphics.FillEllipse($blueGlow, 710, -260, 700, 700)
  $graphics.FillEllipse($tealGlow, 930, -110, 360, 360)
  $graphics.DrawRectangle($borderPen, 44, 44, 1112, 542)

  $graphics.DrawString(
    "SOFTWARE DEVELOPER / GRADE 12",
    $monoFont,
    $tealBrush,
    78,
    92
  )
  $graphics.DrawString(
    "I build useful software",
    $displayFont,
    $textBrush,
    74,
    164
  )
  $graphics.DrawString(
    "for real workflows.",
    $displayFont,
    $textBrush,
    74,
    232
  )
  $graphics.DrawString(
    "Web apps / Windows utilities / Developer tools",
    $bodyFont,
    $mutedBrush,
    80,
    346
  )
  $graphics.DrawString(
    "LIQUID UTILITY   /   FILSAFIT   /   ARINDRA PRODUCTION",
    $monoFont,
    $textBrush,
    80,
    468
  )
  $graphics.DrawString(
    "KV / DZ00",
    $monoFont,
    $tealBrush,
    974,
    524
  )

  $og.Save(
    (Join-Path $publicDir "og-image.png"),
    [System.Drawing.Imaging.ImageFormat]::Png
  )
} finally {
  $textBrush.Dispose()
  $mutedBrush.Dispose()
  $tealBrush.Dispose()
  $displayFont.Dispose()
  $bodyFont.Dispose()
  $monoFont.Dispose()
  $borderPen.Dispose()
  $blueGlow.Dispose()
  $tealGlow.Dispose()
  $background.Dispose()
  $graphics.Dispose()
  $og.Dispose()
}

$icon = [System.Drawing.Bitmap]::new(180, 180)
$iconGraphics = [System.Drawing.Graphics]::FromImage($icon)
$iconGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$iconBackground = New-TextBrush "#010409"
$iconText = New-TextBrush "#f0f6fc"
$iconAccent = New-TextBrush "#2dd4bf"
$iconFont = [System.Drawing.Font]::new(
  "Segoe UI",
  72,
  [System.Drawing.FontStyle]::Bold,
  [System.Drawing.GraphicsUnit]::Pixel
)

try {
  $iconGraphics.FillRectangle($iconBackground, 0, 0, 180, 180)
  $iconGraphics.DrawString("KV", $iconFont, $iconText, 22, 43)
  $iconGraphics.FillRectangle($iconAccent, 148, 32, 8, 116)
  $icon.Save(
    (Join-Path $publicDir "apple-touch-icon.png"),
    [System.Drawing.Imaging.ImageFormat]::Png
  )
} finally {
  $iconFont.Dispose()
  $iconBackground.Dispose()
  $iconText.Dispose()
  $iconAccent.Dispose()
  $iconGraphics.Dispose()
  $icon.Dispose()
}
```

- [ ] **Step 6: Generate assets and verify exact dimensions**

Run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1
Add-Type -AssemblyName System.Drawing
$expected = @{
  "public/og-image.png" = "1200x630"
  "public/apple-touch-icon.png" = "180x180"
}
foreach ($entry in $expected.GetEnumerator()) {
  $image = [System.Drawing.Image]::FromFile((Resolve-Path $entry.Key))
  try {
    $actual = "$($image.Width)x$($image.Height)"
    if ($actual -ne $entry.Value) {
      throw "$($entry.Key) is $actual, expected $($entry.Value)."
    }
    "$($entry.Key): $actual"
  } finally {
    $image.Dispose()
  }
}
```

Expected: both paths print their exact expected dimensions.

- [ ] **Step 7: Run metadata tests and build**

Run:

```powershell
npm test -- --run src/metadata.test.ts
npm run typecheck
npm run build
```

Expected: metadata tests pass; typecheck and production build exit `0`.

- [ ] **Step 8: Commit metadata and brand assets**

```powershell
git add index.html public/favicon.svg public/apple-touch-icon.png public/og-image.png scripts/generate-brand-assets.ps1 src/metadata.test.ts
git commit -m "feat: refresh portfolio metadata and brand assets"
```

---

### Task 8: Document the Architecture and Run Full Acceptance Verification

**Files:**
- Modify: `README.md:1-26`
- Verify: all source, test, public, and configuration files from Tasks 1-7

**Interfaces:**
- Produces: documented development and test commands.
- Produces: final evidence that the implementation satisfies the approved spec.

- [ ] **Step 1: Update README commands and architecture**

Replace README with:

```markdown
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
npm test -- --run
npm run typecheck
npm run build
```

## Architecture

- `src/data/portfolio.ts` owns typed public content.
- `src/components/` contains focused page sections and interactive controls.
- `src/styles.css` owns design tokens, layout, responsive behavior, themes, and reduced motion.
- Core portfolio content is local and has no runtime API dependency.
```

- [ ] **Step 2: Run the complete automated verification suite**

Run in this order:

```powershell
npm test -- --run
npm run typecheck
npm run build
git diff --check
```

Expected:

- Vitest reports zero failing tests.
- TypeScript exits `0`.
- Vite production build exits `0`.
- `git diff --check` prints no whitespace errors.

- [ ] **Step 3: Start the local site for browser verification**

Run:

```powershell
npm run dev -- --host 127.0.0.1
```

Keep the returned local URL and process session active for Steps 4-7.

- [ ] **Step 4: Verify the 320 px mobile contract**

Run with the same named Playwright CLI session:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check open http://127.0.0.1:5173
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check resize 320 900
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check screenshot --filename=portfolio-320.png --full-page
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check eval "() => ({ width: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth })"
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check resize 360 900
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check eval "() => ({ width: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth, undersizedTargets: [...document.querySelectorAll('a,button')].filter(node => { const box = node.getBoundingClientRect(); const style = getComputedStyle(node); return style.visibility !== 'hidden' && style.display !== 'none' && (box.width < 44 || box.height < 44); }).map(node => node.textContent?.trim() || node.getAttribute('aria-label')) })"
```

Expected:

- Screenshot shows no clipped heading, project, navigation, or contact control.
- Both evaluations return equal `width` and `viewport`.
- `undersizedTargets` is empty for visible interactive controls.
- Mobile menu button visibly says `Menu`, exposes `Close` when expanded, and the desktop link row is collapsed.

- [ ] **Step 5: Verify mobile keyboard navigation and theme persistence**

Use `snapshot` to obtain the current menu and theme element references, then execute:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check snapshot
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check press Tab
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check press Enter
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check press Escape
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check localstorage-set kvdz00-portfolio-theme light
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check reload
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check eval "() => document.documentElement.dataset.theme"
```

Expected:

- Skip link is the first keyboard target.
- Menu controls are reachable and Escape closes an open menu.
- The final evaluation returns `"light"`.
- Focus rings remain visible in the light theme.

- [ ] **Step 6: Verify tablet and desktop layouts**

Run:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check resize 768 1024
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check screenshot --filename=portfolio-768.png --full-page
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check resize 1024 900
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check screenshot --filename=portfolio-1024.png --full-page
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check resize 1440 1000
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check screenshot --filename=portfolio-1440.png --full-page
```

Expected:

- 768 px has no horizontal overflow and preserves readable project order.
- 1024 px transitions cleanly into the editorial project grid.
- 1440 px keeps bounded text measures and does not stretch previews beyond their content.
- Resizing continuously around 46 rem and 64 rem produces no clipped or overlapping intermediate state.

- [ ] **Step 7: Verify console, network, links, headings, and reduced motion**

Run:

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check console error
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check requests
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check run-code "async page => { const headings = await page.locator('h1,h2,h3').evaluateAll(nodes => nodes.map(node => ({ level: Number(node.tagName.slice(1)), text: node.textContent?.trim() }))); const links = await page.locator('a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))); return { headings, links }; }"
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check run-code "async page => { await page.emulateMedia({ reducedMotion: 'reduce' }); return page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior); }"
```

Expected:

- Console has no error entries.
- Core assets return successful responses; no third-party widget request exists.
- There is exactly one `h1`, heading levels do not skip, and no link has `null`, `""`, or `"#"` as its href.
- Reduced-motion evaluation returns `auto`.

- [ ] **Step 8: Run a final content and repository audit**

Run:

```powershell
rg -n "resume|download cv|github-readme-stats|shields.io|komarev|lorem|TO[D]O|TB[D]" src index.html README.md
$longDash = [char]0x2014
rg -n $longDash src/components src/data src/App.tsx index.html README.md
rg -n "seamless|cutting-edge|world-class|innovative solution|next opportunity" src/components src/data src/App.tsx index.html README.md
rg -n "^[[:space:]]*(//|/\*|\*|<!--)" src scripts
git status --short --branch
git log --oneline -8
```

Expected:

- The text scan finds no resume CTA, third-party widget, placeholder copy, or unresolved marker.
- The public-copy scans find no long-dash aside, inflated phrase, or vague contact heading. Manually audit final strings for double-hyphen asides and unsupported facts.
- Every reported code comment explains a non-obvious constraint or reason; remove narration and section-label comments.
- The branch contains the planned task commits.
- Only expected implementation files remain modified before the final documentation commit.

- [ ] **Step 9: Run the requested skill delivery gates**

Run the Impeccable context loader again:

```powershell
node C:\Users\UserBaru\.agents\skills\impeccable\scripts\load-context.mjs
```

Then review the live page and source against:

- Agent Skills frontend engineering: semantic production structure, WCAG AA intent, correct controls, keyboard behavior, and responsive coverage at 320, 768, 1024, and 1440 px.
- Anti Slop UI: no generic gradient, decorative glow, excessive radius or shadow, nested card grid, fake metric, dead link, decorative arrow, or unlabeled mobile menu.
- Anti Slop Copywriting: every public claim maps to profile or project evidence; no filler, inflated authority, generic CTA, forced cadence, long-dash aside, or double-hyphen aside.
- Anti Slop Code: comments exist only for non-obvious reasons or constraints and do not narrate the code.
- Anti Slop Layout Mobile: layout reflows instead of shrinking, content drives the 46 rem and 64 rem transitions, all visible targets are at least 44 px, tap behavior matches hover behavior, and no accidental overflow exists.
- Impeccable: register brand remains intact; typography, color, shape, motion, icons, background treatment, and previews each retain the documented purpose.
- Caveman: completion report is terse, factual, and includes files, behavior, checks, and remaining risk.

Record the Anti Slop Delivery Gate as one `PASS` line per applicable rule with concrete test, source, or browser evidence. For the static-data state rule, record that runtime loading is not applicable, the featured-work empty state is explicit, and avatar failure has a monogram fallback. Do not deliver while any line is `FAIL`.

Expected: loader reports product and design context available, every requested skill check is satisfied, and the Delivery Gate contains no `FAIL` line.

- [ ] **Step 10: Commit README and verified final fixes**

If Steps 2-9 reveal a defect, fix it in the owning component and rerun the exact failed check before staging.

Then run:

```powershell
git add README.md
git add src public index.html package.json package-lock.json vite.config.ts scripts .gitignore
git diff --cached --check
git commit -m "docs: document portfolio architecture and checks"
```

Expected: commit succeeds and contains only README plus any explicitly verified final fixes.

- [ ] **Step 11: Capture final completion evidence**

Run:

```powershell
npm test -- --run
npm run typecheck
npm run build
git diff --check
git status --short --branch
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check close
```

Expected:

- Tests, typecheck, build, and diff check exit `0`.
- Git status has no unexpected source changes.
- The browser session closes.
