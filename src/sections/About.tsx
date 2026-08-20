const evidence = [
  "React UI and Rust native commands in Liquid Utility",
  "Typecheck, lint, and build CI in Filsafit",
  "Auth, content, and admin workflows in Laravel projects",
  "Responsive browser checks in this portfolio",
];

export function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="section-label">
        <span>About</span>
        <span>In practice</span>
      </div>
      <div className="about-content">
        <div>
          <h2 id="about-title">
            I work across browser UI, backend workflows, and native desktop
            boundaries.
          </h2>
          <p>
            When a project grows past a simple page, I keep the important
            decisions in the repo: architecture notes, task plans, CI checks,
            and smoke tests for behavior that is easy to break.
          </p>
        </div>
        <ol className="principle-list" aria-label="Project evidence">
          {evidence.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
