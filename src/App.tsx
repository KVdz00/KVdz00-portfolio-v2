import {
  ArrowDown,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

type Project = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  outcome: string;
  status: string;
  preview: "utility" | "arindra" | "medan" | "portfolio" | "modtoggle";
};

const projects: Project[] = [
  {
    id: "01",
    name: "Liquid Utility",
    summary:
      "Tauri utility shell with AppShell navigation, Game Launcher, Hardware Monitor, Media Studio, Settings, and theme or density preferences.",
    stack: ["Tauri", "React", "TypeScript", "Rust"],
    outcome: "Desktop control shell",
    status: "Private Tauri app",
    preview: "utility",
  },
  {
    id: "02",
    name: "Arindra Production Web",
    summary:
      "Laravel Blade production-house website with a dark hero, showreel selector, service sections, client logos, process, and CTA flow.",
    stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js"],
    outcome: "Production-house site",
    status: "Client-facing build",
    preview: "arindra",
  },
  {
    id: "03",
    name: "Website Kota Medan",
    summary:
      "PHP public site for Medan with a cinematic hero, landmark cards, culture, tourism, local products, reviews, users, and admin workflows.",
    stack: ["PHP", "MySQL", "JavaScript", "CSS"],
    outcome: "City content platform",
    status: "School project",
    preview: "medan",
  },
  {
    id: "04",
    name: "Portfolio",
    summary:
      "Personal portfolio experiment with cyber typography, scanline and particle layers, theme and language switches, BGM control, and searchable project filtering.",
    stack: ["HTML", "CSS", "JavaScript", "Canvas"],
    outcome: "Interactive profile site",
    status: "Previous portfolio",
    preview: "portfolio",
  },
  {
    id: "05",
    name: "ModToggle",
    summary:
      "Minecraft Fabric client mod with an O keybind, searchable in-game screen, /modtoggle commands, JSON persistence, and soft suppression strategies.",
    stack: ["Java", "Fabric API", "Gradle"],
    outcome: "Client mod controller",
    status: "Minecraft utility",
    preview: "modtoggle",
  },
];

const processSteps = [
  {
    id: "01",
    title: "Map the real task",
    body: "Start from the user's workflow, the content that must exist, and the constraints that can break the experience.",
  },
  {
    id: "02",
    title: "Shape the interface",
    body: "Turn the task into layout, hierarchy, states, and responsive behavior before chasing visual effects.",
  },
  {
    id: "03",
    title: "Build the working version",
    body: "Implement with maintainable components, readable structure, accessible controls, and practical data boundaries.",
  },
  {
    id: "04",
    title: "Verify and refine",
    body: "Run checks, inspect real browser screenshots, fix awkward spacing, and keep the final result deployable.",
  },
];

const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "PHP", "Java", "HTML", "CSS", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React", "Tailwind CSS", "Alpine.js", "Vite", "Blade"],
  },
  {
    title: "Backend",
    items: ["Laravel", "PHP", "MySQL", "SQLite"],
  },
  {
    title: "Desktop & Tools",
    items: ["Tauri", "Rust", "Fabric API", "Gradle"],
  },
  {
    title: "Creative",
    items: ["Figma", "Blender 3D", "Game Dev", "UI/UX"],
  },
];

function ProjectPreview({ type }: { type: Project["preview"] }) {
  return (
    <div className={`project-preview ${type}`} aria-hidden="true">
      {type === "utility" && (
        <>
          <div className="liquid-rail">
            <strong>LU</strong>
            {["Dashboard", "Games", "Hardware", "Media", "Settings"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="liquid-main">
            <div className="liquid-topbar">
              <div>
                <span>Liquid Utility</span>
                <strong>Game Launcher</strong>
              </div>
              <b>Add Game</b>
            </div>
            <p className="liquid-description">Launch and manage local Windows games.</p>
            <div className="liquid-library-summary">
              <span>
                <small>Library</small>
                <strong>6 games</strong>
              </span>
              <span>
                <small>Visible</small>
                <strong>4 shown</strong>
              </span>
              <span>
                <small>Sort</small>
                <strong>Title</strong>
              </span>
            </div>
            <div className="liquid-controls">
              <span>Search: Title, path, or notes</span>
              <span>Sort by Title</span>
            </div>
            <div className="liquid-games">
              {["Minecraft", "Valorant", "Stardew"].map((item) => (
                <span key={item}>
                  <b>{item.slice(0, 2).toUpperCase()}</b>
                  <strong>{item}</strong>
                  <small>Play / Edit / Remove</small>
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      {type === "arindra" && (
        <>
          <div className="arindra-nav">
            <strong>ARINDRA PRODUCTION</strong>
            <span>Layanan</span>
            <span>Portofolio</span>
            <span>Showreel</span>
            <span>Kontak</span>
          </div>
          <div className="arindra-hero">
            <span className="arindra-kicker">Surabaya / Since 2014</span>
            <strong>Produksi visual yang membuat brand lebih dipercaya.</strong>
            <div className="arindra-actions">
              <span>Tonton Showreel</span>
              <span>Konsultasi Proyek</span>
            </div>
          </div>
          <div className="arindra-showreel">
            <div className="arindra-video">
              <span>REC</span>
              <b />
            </div>
            <div className="arindra-tabs">
              <strong>PILIH PORTOFOLIO</strong>
              <span>Company Profile</span>
              <span>Product Video</span>
              <span>Live Streaming</span>
            </div>
          </div>
          <div className="arindra-services">
            <span>PRODUKSI VIDEO</span>
            <span>FOTOGRAFI</span>
            <span>LIVE STREAMING</span>
          </div>
        </>
      )}
      {type === "medan" && (
        <>
          <div className="medan-nav">
            <strong>Kota <b>Medan</b></strong>
            <span>Landmark</span>
            <span>Kuliner</span>
            <span>Budaya</span>
          </div>
          <div className="medan-copy">
            <span>Ibukota Sumatera Utara</span>
            <strong>
              Selamat Datang di <b>Kota Medan</b>
            </strong>
            <i>Jelajahi Medan / Lihat Landmark</i>
            <div className="medan-stats">
              <b>2.4Jt+ Penduduk</b>
              <b>265 km2 Luas</b>
              <b>13+ Suku</b>
            </div>
          </div>
          <div className="medan-cards">
            <span>Istana Maimun</span>
            <span>Masjid Raya</span>
            <span>Bika Ambon</span>
          </div>
          <div className="medan-marquee">MULTIKULTURAL / KULINER LEGENDARIS / WARISAN BUDAYA</div>
        </>
      )}
      {type === "portfolio" && (
        <>
          <div className="cyber-topbar">
            <strong>DK_</strong>
            <i>Home</i>
            <i>About</i>
            <i>Skills</i>
            <i>Projects</i>
            <span>DARK</span>
            <span>EN</span>
            <span>BGM</span>
          </div>
          <div className="cyber-hero">
            <span>Hello World! I'm</span>
            <strong>Dzikrul Kahfi</strong>
            <i>Frontend Developer / Game Dev / Designer</i>
          </div>
          <div className="cyber-filter">
            <span>Search projects</span>
            <span>Category</span>
            <span>Status</span>
          </div>
        </>
      )}
      {type === "modtoggle" && (
        <>
          <div className="modtoggle-window">
            <div className="modtoggle-title">ModToggle</div>
            <div className="modtoggle-search">Search...</div>
            <div className="modtoggle-list">
              {[
                ["Sodium (sodium)", "[ ON]"],
                ["Minimap (minimap)", "[OFF]"],
                ["Utility Mod (utility_mod)", "[ ON]"],
              ].map(([name, state]) => (
                <span key={name}>
                  {name}
                  <b>{state}</b>
                </span>
              ))}
            </div>
            <button type="button" tabIndex={-1}>
              Done
            </button>
            <div className="modtoggle-command">O keybind / /modtoggle list</div>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Muhammad Dzikrul Kahfi home">
          <span>KV</span>
          <small>/ DZ00</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#process">Process</a>
          <a href="#connect">Connect</a>
        </nav>
        <div className="availability">
          <span />
          Available for projects
        </div>
      </header>

      <main id="main">
        <section className="hero-section" id="top" aria-labelledby="hero-title">
          <div className="section-label">
            <span>Developer</span>
            <span>Builder</span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">
                Muhammad
                <br />
                Dzikrul Kahfi
              </h1>
              <p>
                I build practical web apps, desktop utilities, and tools with clean
                interfaces, maintainable code, and purposeful details.
              </p>
              <div className="hero-actions" aria-label="Primary actions">
                <a className="primary-link" href="#work">
                  View work
                  <ArrowDown size={16} weight="bold" />
                </a>
                <a className="secondary-link" href="mailto:kahfiworks.id@gmail.com">
                  Start a conversation
                </a>
              </div>
            </div>

            <aside className="hero-note" aria-label="Portfolio summary">
              <p>
                Focused on websites, admin workflows, Windows utilities, and small
                tools that solve real user problems.
              </p>
              <div>
                <span>Based in Indonesia</span>
                <strong>UTC +7</strong>
              </div>
            </aside>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="section-label">
            <span>About</span>
            <span>Manifesto</span>
          </div>
          <div className="about-content">
            <h2 id="about-title">Software should feel honest, useful, and respectful of the people using it.</h2>
            <p>
              I value clarity over cleverness, maintainability over trend-chasing,
              and interfaces that help people move through real tasks without friction.
            </p>
            <ol className="principle-list" aria-label="Working principles">
              <li>
                <span>01</span>
                Solve real problems
              </li>
              <li>
                <span>02</span>
                Write code that can be changed
              </li>
              <li>
                <span>03</span>
                Design for people, not screenshots
              </li>
              <li>
                <span>04</span>
                Iterate, ship, improve
              </li>
            </ol>
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-label sticky-label">
            <span>Selected</span>
            <span>Work</span>
          </div>
          <div className="work-list">
            <h2 id="work-title" className="sr-only">
              Selected Work
            </h2>
            {projects.map((project) => (
              <article className="project-row" key={project.name}>
                <div className="project-index">{project.id}</div>
                <div className="project-copy">
                  <h3>
                    {project.name}
                  </h3>
                  <p>{project.summary}</p>
                  <ul aria-label={`${project.name} stack`}>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <dl className="project-facts">
                    <div>
                      <dt>Outcome</dt>
                      <dd>{project.outcome}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{project.status}</dd>
                    </div>
                  </dl>
                </div>
                <ProjectPreview type={project.preview} />
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-label">
            <span>Skills</span>
            <span>Toolkit</span>
          </div>
          <div className="skills-grid">
            <h2 id="skills-title" className="sr-only">
              Skills and Toolkit
            </h2>
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="process-section" id="process" aria-labelledby="process-title">
          <div className="section-label">
            <span>Process</span>
            <span>How I work</span>
          </div>
          <div className="process-content">
            <div>
              <h2 id="process-title">A practical build rhythm for projects that need clarity, not noise.</h2>
              <p>
                The goal is to make the right thing understandable, then make it
                reliable enough to hand over, improve, and keep shipping.
              </p>
            </div>
            <ol className="process-list">
              {processSteps.map((step) => (
                <li key={step.id}>
                  <span>{step.id}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="connect-section" id="connect" aria-labelledby="connect-title">
          <div className="section-label">
            <span>Connect</span>
            <span>Let's build</span>
          </div>
          <div className="connect-content">
            <div>
              <h2 id="connect-title">Open to practical projects and meaningful collaborations.</h2>
              <p>Bring a clear problem, a rough idea, or an existing product that needs sharper execution.</p>
            </div>
            <div className="contact-links" aria-label="Social links">
              <a href="https://www.instagram.com/dzikv_/" target="_blank" rel="noreferrer">
                <InstagramLogo size={22} weight="bold" />
                <span>@dzikv_</span>
              </a>
              <a href="https://github.com/KVdz00" target="_blank" rel="noreferrer">
                <GithubLogo size={22} weight="bold" />
                <span>github.com/KVdz00</span>
              </a>
              <a href="mailto:kahfiworks.id@gmail.com">
                <EnvelopeSimple size={22} weight="bold" />
                <span>kahfiworks.id@gmail.com</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Copyright 2026 Muhammad Dzikrul Kahfi</span>
        <span>KV</span>
      </footer>
    </>
  );
}

export default App;
