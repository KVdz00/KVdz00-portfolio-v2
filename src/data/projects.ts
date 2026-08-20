import type { Project } from "../types/portfolio";

export const projects: Project[] = [
  {
    id: "01",
    name: "Liquid Utility",
    summary:
      "Windows utility that combines game launching, hardware monitoring, system cleanup, local media tools, and app settings.",
    stack: ["Tauri", "React", "TypeScript", "Rust"],
    status: "Private Tauri app",
    problem:
      "Put several Windows maintenance and launcher workflows behind one consistent desktop shell.",
    technicalDecision:
      "Keep the interface in React, route native operations through Tauri and Rust commands, and verify packaged builds with smoke checks.",
    result:
      "A packaged desktop app with native-backed modules instead of a browser-only mock.",
    preview: "utility",
  },
  {
    id: "02",
    name: "Filsafit",
    summary:
      "Philosophy web app with an encyclopedia, school comparison, a scored quiz, profiles, history, auth, and shareable result cards.",
    stack: ["Next.js", "React", "TypeScript", "Supabase"],
    status: "Private web app",
    problem:
      "Combine philosophy content with interactive scoring and account-backed history without turning every route into a client-heavy page.",
    technicalDecision:
      "Use Next.js App Router server and client boundaries, Supabase Postgres, Auth and RLS, and separate tested quiz-scoring logic.",
    result:
      "A working full-stack product with CI covering TypeScript, lint, and production builds.",
    preview: "filsafit",
  },
  {
    id: "03",
    name: "Arindra Production Web",
    summary:
      "Laravel production-house website with service pages, portfolio and showreel content, forms, authentication, and admin workflows.",
    stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js"],
    status: "Client-facing build",
    problem:
      "Present production work publicly while keeping content and inquiries manageable from the application.",
    technicalDecision:
      "Use Laravel and Blade for the server-rendered app, Tailwind CSS for layout, and Alpine.js for small interactive pieces.",
    result:
      "A client-facing site with public presentation and administration workflows in one codebase.",
    preview: "arindra",
  },
  {
    id: "04",
    name: "Website Kota Medan",
    summary:
      "PHP and MySQL city information site covering landmarks, tourism, culture, local products, reviews, users, and admin workflows.",
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
    status: "School project",
    problem:
      "Organize a broad set of city content into a public site with account and administration features.",
    technicalDecision:
      "Keep the stack simple with server-rendered PHP, MySQL persistence, and JavaScript and CSS for interaction and presentation.",
    result:
      "A complete school project with public content, user features, and admin management.",
    preview: "medan",
  },
  {
    id: "05",
    name: "ModToggle",
    summary:
      "Minecraft Fabric client mod for controlling selected mod behavior from an in-game UI and commands.",
    stack: ["Java", "Fabric API", "Gradle"],
    status: "Minecraft utility",
    problem:
      "Make mod toggling manageable without editing files or leaving the normal game workflow.",
    technicalDecision:
      "Use a client-side Fabric mod with Java, an O-key screen, slash commands, JSON persistence, and soft suppression where hard unloading is not possible.",
    result: "A working in-game controller for persisted mod-toggle state.",
    preview: "modtoggle",
  },
];
