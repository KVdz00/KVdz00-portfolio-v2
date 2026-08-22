# Portfolio V2 Evidence-First Overhaul Design

## Status

Approved in conversation on 2026-08-22. Implementation has not started.

## Context

The current portfolio is a single-page React application with a strong amount of project content, but its presentation is broad, agency-like, and no longer aligned with the current GitHub profile. It also omits Filsafit, which is now one of the strongest projects described on the profile.

The overhaul should use the visual DNA of the `KVdz00` GitHub profile without cloning GitHub's interface. The result must help recruiters quickly understand the candidate, see credible engineering evidence, and start a conversation.

## Applied Design Read

This is a recruiter portfolio for internship and junior software roles. The visual direction is evidence-first GitHub DNA with `ENERGY 2`, `RHYTHM 3`, and `MOTION 1`.

- GitHub-like density supports technical credibility without turning the page into a dashboard clone.
- System sans and mono typography keep the site fast, readable, and consistent with the existing identity.
- Flat surfaces and thin rules organize evidence; cards appear only when an element needs a clear interaction or grouping affordance.
- Blue is reserved for actions, teal for identity, and green for explicit availability so color retains meaning.
- Motion is limited to control feedback and state changes because the page should feel stable during recruiter scanning.
- Project previews use purpose-built interface fragments instead of decorative illustrations because the work itself is the evidence.

## Product Positioning

### Primary audience

Recruiters evaluating candidates for internships, vocational placements, and junior software developer roles.

### Positioning statement

Muhammad Dzikrul Kahfi is a Grade 12 vocational student and software developer who builds practical web applications, Windows utilities, and developer tools with clear interfaces and reliable delivery practices.

The portfolio must not frame him as only a student learning to code. Student status is stated honestly, while shipped project work and engineering discipline carry the page.

### Language

English only. The copy should be direct, specific, and readable to both technical and non-technical recruiters.

### Primary action

Email `kahfiworks.id@gmail.com`.

Secondary actions are:

- GitHub: `https://github.com/KVdz00`
- LinkedIn: `https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386`

There is no resume link because no English resume PDF currently exists. The interface must not render a placeholder or dead resume action.

## Goals

- Establish the target role, Grade 12 status, location, and availability in the first viewport.
- Lead with credible project evidence instead of autobiographical copy or decoration.
- Feature Liquid Utility, Filsafit, and Arindra Production Web as substantial case studies.
- Show repeated engineering strengths across interface work, architecture, data, authentication, testing, CI, documentation, and packaged delivery.
- Preserve dark and light themes with accessible, consistent hierarchy.
- Work cleanly from 320 px through large desktop layouts.
- Keep runtime behavior reliable by avoiding live profile APIs and third-party stat widgets.

## Non-Goals

- A blog, CMS, or project detail routing system.
- Live GitHub statistics, contribution graphs, visitor counters, or third-party README cards.
- A language switcher.
- Heavy animation, parallax, custom cursors, scroll hijacking, or fake terminal typing.
- Fabricated repository, demo, result, employment, or client links.
- A literal clone of GitHub's profile page.

## Selected Approach

Use an evidence-first developer dossier.

The page combines GitHub-like flat surfaces, crisp borders, mono metadata, and blue-teal accents with a custom editorial hierarchy built for recruiter scanning.

### Alternatives considered

#### Recruiter landing page

A short hero, skills list, project grid, about section, and contact section would be easy to scan, but it would resemble generic portfolio templates and provide less engineering depth.

#### Expanded GitHub profile

A direct translation of a profile sidebar, README sections, tabs, and pinned repository cards would feel familiar and technically aligned, but it would look derivative and would constrain the project storytelling.

#### Evidence-first developer dossier

The selected approach keeps GitHub's design DNA while giving project evidence, responsibility, and delivery quality their own hierarchy. It is longer than a minimal landing page, but every section answers a recruiter question.

## Information Architecture

The page order is fixed:

1. Sticky site header
2. Hero and compact profile panel
3. Technical proof strip
4. Selected work
5. Engineering capabilities
6. Profile and additional work
7. Contact call to action
8. Footer

### Site header

The desktop header contains:

- `KV / DZ00` brand mark
- Work
- Capabilities
- Profile
- Contact
- Dark/light theme control

On narrow screens, the links move into an accessible disclosure menu. The control visibly says `Menu` or `Close`, exposes its expanded state, closes after a navigation choice, and supports Escape to close. The theme control remains directly available.

### Hero

Primary headline:

> I build useful software for real workflows.

Supporting copy must state:

- Grade 12 vocational student
- Software developer
- Web applications, Windows utilities, and developer tools
- Clear interfaces and reliable delivery

Primary action: `Email me`.

Secondary action: `View selected work`.

The compact profile panel contains:

- Local copy of the current GitHub avatar
- Muhammad Dzikrul Kahfi
- Open to internships and junior roles
- Sidoarjo, Indonesia
- Grade 12 SMK
- UTC +7
- GitHub and LinkedIn links

The avatar is supporting identity, not the visual center of the hero.

### Technical proof strip

The proof strip gives a ten-second capability summary:

- Web: React, Next.js, Laravel
- Desktop: Tauri, Rust
- Data: Supabase, PostgreSQL, MySQL, SQLite
- Delivery: tests, CI, documentation, packaged checks

This is not a badge collection. Each item is plain text with a clear category label.

### Selected work

Three case studies carry the page:

#### Liquid Utility

- Stack: Tauri, React, TypeScript, Rust
- Context: Windows desktop utility for game launching, hardware monitoring, system care, local media preview, and application settings.
- Responsibility: React interface architecture plus typed coordination with native and system work exposed through Rust commands.
- Engineering evidence: packaged smoke checks, release checks, system boundaries, and module-oriented workflows.
- Presentation: one faithful interface preview and concise evidence labels.
- Link behavior: do not render a repository or demo link unless a real public URL is supplied.

#### Filsafit

- Stack: Next.js, React, TypeScript, Supabase
- Context: philosophy application with an encyclopedia, school comparison, scored quiz, profiles, authentication, history, and shareable result cards.
- Responsibility: product UI, application flows, and integration with Supabase services.
- Engineering evidence: PostgreSQL, authentication, row-level security, isolated quiz domain logic with tests, and CI checks for types, lint, and production builds.
- Presentation: a product preview focused on the encyclopedia or quiz result workflow.
- Link behavior: do not render a repository or demo link unless a real public URL is supplied.

#### Arindra Production Web

- Stack: Laravel, Blade, Tailwind CSS, Alpine.js
- Context: responsive production-house website with client-facing content and administrative workflows.
- Responsibility: interface implementation, authentication, forms, and content-management flows.
- Engineering evidence: Laravel application structure, admin access, data-backed content, responsive pages, and project documentation.
- Presentation: a preview showing the client-facing site and a small admin-workflow cue.
- Link behavior: do not render a repository or demo link unless a real public URL is supplied.

Every case study follows the same evidence order:

1. Context
2. Responsibility
3. Key contribution
4. Engineering evidence
5. Outcome
6. Stack

No outcome may invent numeric impact, adoption, client approval, or production status.

### Engineering capabilities

Summarize repeated strengths after the case studies have demonstrated them:

- Interface engineering: responsive systems, accessible controls, and task-first UI.
- Application architecture: boundaries across UI, domain logic, backend services, and native commands.
- Data and authentication: SQL-backed products, Supabase authentication, permissions, and RLS.
- Delivery discipline: type checks, automated tests, CI, documentation, and packaged verification.

### Profile and additional work

Use a short personal paragraph. It should explain that Muhammad is a Grade 12 vocational student who learns through building and maintaining real projects. It should not repeat the hero or become a long manifesto.

Additional work appears as a compact index rather than more case studies:

- Toggle-Mod
- QuickDL
- Website Kota Medan and other earlier PHP/MySQL work

The index may state the stack and one-line purpose. It must not create empty demo actions.

### Contact

Closing headline:

> Looking for an internship or junior software role.

The supporting copy invites internship, vocational placement, and junior software role conversations.

Email is the only filled primary action. LinkedIn and GitHub are secondary text actions.

## Visual System

### Design character

GitHub DNA without copying GitHub: flat surfaces, thin rules, practical states, and restrained technical accents. Only the hero may use a subtle atmospheric reference to the profile banner.

### Dark theme tokens

- Canvas: `oklch(13% 0.015 255)`
- Base: `oklch(17% 0.018 255)`
- Surface: `oklch(21% 0.02 255)`
- Border: `oklch(32% 0.025 255)`
- Primary text: `oklch(96% 0.008 250)`
- Muted text: `oklch(68% 0.025 250)`
- Action blue: `oklch(62% 0.19 255)`
- Identity teal: `oklch(78% 0.13 183)`
- Availability green: `oklch(72% 0.18 145)`

CSS color tokens use OKLCH and avoid pure black or white. Metadata and generated binary assets may use reviewed sRGB values where renderer compatibility requires them.

### Light theme

The light theme uses the same hierarchy with a warm-white canvas, softly tinted surfaces, ink text, GitHub blue actions, and a darker teal identity accent. Light mode is a token substitution, not a separate layout.

### Color semantics

- Blue means action or active navigation.
- Teal marks identity, labels, and section accents.
- Green only indicates availability.
- Color never communicates state without text, focus treatment, or another cue.

### Typography

- Display and headings: system sans stack.
- Body: system sans for recruiter-readable narrative.
- Metadata, labels, stacks, and evidence: system mono stack.
- One `h1`, sequential heading levels, and no heading styles on non-heading content.
- No remote font dependency.

### Shape and depth

- Controls and chips use a 6 px radius.
- Panels use an 8 px radius.
- The avatar is the only circular content element.
- Case-study bands remain structural and mostly square.
- Shadows are subtle and reserved for the floating profile panel or sticky header separation.

### Motion

- Interaction durations: 140-220 ms.
- Animate opacity and transform only.
- Hover movement is limited to approximately 1 px.
- No mandatory entrance animation.
- `prefers-reduced-motion` disables non-essential transitions and smooth scrolling.

## Component Architecture

`App.tsx` composes the page and does not own section markup or content arrays.

Planned structure:

```text
src/
  components/
    SiteHeader.tsx
    Hero.tsx
    ProofStrip.tsx
    FeaturedWork.tsx
    ProjectCaseStudy.tsx
    Capabilities.tsx
    ProfileAndMoreWork.tsx
    Contact.tsx
    SiteFooter.tsx
  data/
    portfolio.ts
  App.tsx
  main.tsx
  styles.css
```

Components remain focused and use semantic HTML. Shared content lives in typed local data rather than being duplicated across JSX.

### Project data contract

Each featured project contains:

- `id`
- `slug`
- `name`
- `summary`
- `context`
- `role`
- `contributions`
- `evidence`
- `outcome`
- `stack`
- `preview`
- Optional verified `href`

Optional links are rendered only when defined.

## State and Data Flow

All portfolio content is local, typed, and available at build time. There is no runtime fetch or remote loading state.

Application state is limited to:

- Theme selection
- Mobile navigation disclosure
- Avatar fallback state if the local image cannot load

Theme selection is stored in `localStorage`. Dark is the default for first-time visitors. The existing pre-render theme boot script remains responsible for avoiding a visible theme flash.

## Error and Fallback Behavior

- A failed profile image switches to a text monogram instead of showing a broken image.
- Undefined project links do not render interactive controls.
- External links use safe `target` and `rel` attributes where a new tab is appropriate.
- The email action uses a direct `mailto:` URL.
- The site must not depend on GitHub, shields, visitor counters, or third-party cards at runtime.
- Runtime loading UI is unnecessary because core content is static. An empty featured-project collection shows a concise status and email path instead of a blank section.

## Responsive Behavior

Breakpoints follow content pressure instead of named device classes. The implementation starts with the narrow layout and adds wider arrangements only when navigation, line length, or evidence columns need more room.

### Narrow layout

- Compact sticky header with disclosure navigation.
- Single-column hero.
- Profile data remains concise and does not force horizontal scrolling.
- Proof items use a compact grid.
- Each project shows copy before its preview.
- Capability and contact content stack in source order.
- The mobile type scale keeps the `h1` near 36 px, section headings near 28 px, body text near 16 px, and metadata near 12 px.
- Interactive controls use at least 44 px targets with enough separation to avoid adjacent mis-taps.

### Intermediate layout

- Hero may use one or two columns depending on available width.
- Project copy and preview use a balanced stacked or two-column layout.
- Navigation remains readable without clipped actions.

### Wide layout

- Editorial grid with section rails and case-study bands.
- Hero text and profile panel share the first viewport.
- Project evidence and preview sit side by side.
- Content width remains bounded for readability on 1440 px and wider screens.

## Accessibility

- Target WCAG 2.1 AA contrast.
- Include a skip link.
- All controls use semantic buttons or anchors.
- The mobile disclosure exposes its accessible name and expanded state.
- Visible focus rings must work in both themes.
- Navigation and theme selection must be fully keyboard usable.
- Section headings follow a logical order.
- Decorative preview details use `aria-hidden` where appropriate.
- Meaningful images have useful alternative text.
- Touch targets should reach 44 px where layout permits.
- The page must remain understandable without hover.

## Metadata and Public Assets

Update:

- Document title
- Meta description
- Open Graph title, description, image, and alt text
- Twitter card metadata
- JSON-LD person description and job title
- Theme colors
- Favicon and Apple touch icon if the brand mark changes
- Social preview image to match the new hero and positioning

Store a local copy of the approved GitHub avatar under `public/`. The public site must not hotlink the profile image at runtime.

## Test Strategy

### Automated component checks

Add a lightweight Vitest and React Testing Library setup because the overhaul introduces interactive behavior and reorganizes public content.

Cover:

- Recruiter positioning and all three featured project names render.
- Email, GitHub, and LinkedIn URLs are correct.
- Undefined project links do not create anchors.
- Theme control updates document state and persisted preference.
- Mobile navigation exposes and updates its expanded state.
- Avatar failure reveals the monogram fallback.
- An empty featured-project collection reveals the status and email fallback.

### Build checks

- `npm run typecheck`
- `npm test -- --run`
- `npm run build`
- `git diff --check`

### Browser acceptance checks

Inspect at 320, 768, 1024, and 1440 px:

- No horizontal overflow or clipped navigation.
- Dark and light themes preserve hierarchy and contrast.
- Theme selection survives reload.
- Keyboard tab order and focus states are visible.
- Mobile menu opens, closes, and returns to a coherent focus position.
- Anchors reach the intended sections without sticky-header obstruction.
- Reduced-motion mode removes non-essential motion.
- No console errors or failed core assets.
- External links and email actions use the approved URLs.

Run an accessibility scan if the available browser tooling supports it.

### Requested skill gates

- Agent Skills frontend engineering: verify production semantics, WCAG AA intent, responsive states, keyboard behavior, and 320, 768, 1024, and 1440 px coverage.
- Anti Slop UI: reject generic gradients, decorative glow, excessive rounding, nested cards, fake metrics, dead navigation, and icon-only mobile navigation labels.
- Anti Slop Copywriting: audit every public sentence for generic claims, inflated language, unsupported facts, filler, em dashes, and double-hyphen asides.
- Anti Slop Code: keep comments only where they explain a non-obvious constraint or reason.
- Anti Slop Layout Mobile: verify reflow rather than shrinkage, 44 px touch targets, tap equivalents, no accidental clipping, and a visible `Menu` label.
- Impeccable: re-run context and brand checks, preserve the approved register identity, and document the purpose of typography, color, shape, motion, icons, and project previews.
- Anti Slop Delivery Gate: report each applicable rule as `PASS` with concrete evidence before delivery. Static content has no loading lifecycle; featured-work empty state and avatar failure remain explicit fallbacks.

## Implementation Scope

Expected changes include:

- Split the existing monolithic `App.tsx` into focused components.
- Replace the current project and process content with the approved information architecture.
- Replace the existing stylesheet with the approved visual system and responsive behavior.
- Add typed portfolio data.
- Add the local profile image and refreshed public brand assets.
- Update metadata and structured data in `index.html`.
- Add component test tooling and tests.
- Update README commands and architecture notes if test commands or structure change.

The implementation must preserve the current React, TypeScript, Vite, and Phosphor stack. It must not add a styling framework, state library, animation library, runtime content service, or router.

## Acceptance Criteria

The overhaul is complete only when:

- The page follows the approved evidence-first architecture.
- The approved GitHub-DNA visual system works in dark and light themes.
- The hero accurately states Grade 12 status and internship/junior availability.
- Liquid Utility, Filsafit, and Arindra Production Web are the only full case studies.
- Email is primary; GitHub and LinkedIn are secondary; no resume action exists.
- No dead project link or fabricated outcome is present.
- The page works from 320 px through 1440 px without horizontal overflow.
- Keyboard navigation, focus, heading order, and reduced motion are verified.
- Automated tests, typecheck, and production build pass.
- Browser inspection shows no console errors or failed core assets.
- Metadata and social preview represent the new positioning.
