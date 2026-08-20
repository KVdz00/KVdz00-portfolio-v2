import type { Project } from "../types/portfolio";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="project-row">
      <div className="project-index">{project.id}</div>
      <div className="project-copy">
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <ul aria-label={`${project.name} stack`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <dl className="project-facts">
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>Technical decision</dt>
            <dd>{project.technicalDecision}</dd>
          </div>
          <div>
            <dt>Result</dt>
            <dd>{project.result}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
        </dl>
      </div>
      <ProjectPreview type={project.preview} />
    </article>
  );
}
