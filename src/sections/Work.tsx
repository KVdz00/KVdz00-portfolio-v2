import { ProjectRow } from "../components/ProjectRow";
import { projects } from "../data/projects";

export function Work() {
  return (
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
          <ProjectRow project={project} key={project.name} />
        ))}
      </div>
    </section>
  );
}
