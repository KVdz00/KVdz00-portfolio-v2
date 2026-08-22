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
