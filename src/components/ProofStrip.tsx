import { proofItems } from "../data/portfolio";

export function ProofStrip() {
  return (
    <section className="proof-strip" aria-labelledby="proof-title">
      <h2 id="proof-title" className="sr-only">
        Technical focus
      </h2>
      {proofItems.map((item) => (
        <div className="proof-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}
