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

export const featuredProjects: readonly FeaturedProject[] = [
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
] as const;

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
