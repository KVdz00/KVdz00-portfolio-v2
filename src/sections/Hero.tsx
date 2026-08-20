import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  return (
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
            I build web apps, Windows utilities, and small tools. The work here
            comes from private codebases, client-facing sites, school projects,
            and experiments I still use to test ideas.
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
            Recent work includes a Tauri Windows utility, a Next.js and Supabase
            philosophy app, Laravel sites with admin workflows, and a Fabric
            client mod.
          </p>
          <div>
            <span>Based in Indonesia</span>
            <strong>UTC +7</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
