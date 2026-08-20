import { processSteps } from "../data/process";

export function Process() {
  return (
    <section className="process-section" id="process" aria-labelledby="process-title">
      <div className="section-label">
        <span>Process</span>
        <span>How I work</span>
      </div>
      <div className="process-content">
        <div>
          <h2 id="process-title">
            The workflow changes with the project, but these four steps show up often.
          </h2>
          <p>
            The point is to get the real path working, keep risky boundaries visible, and verify what
            can break before calling it done.
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
  );
}
