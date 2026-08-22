import type { FeaturedProject as FeaturedProjectData } from "../data/portfolio";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectCaseStudy({
  project,
}: {
  project: FeaturedProjectData;
}) {
  return (
    <article className="case-study" aria-labelledby={`${project.slug}-title`}>
      <div className="case-study__index">{project.id}</div>
      <div className="case-study__content">
        <p className="section-kicker">Featured work</p>
        <h3 id={`${project.slug}-title`}>{project.name}</h3>
        <p className="case-study__summary">{project.summary}</p>

        <dl className="case-study__facts">
          <div>
            <dt>Context</dt>
            <dd>{project.context}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Key contributions</dt>
            <dd>
              <ul>
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Engineering evidence</dt>
            <dd>
              <ul>
                {project.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd>{project.outcome}</dd>
          </div>
        </dl>

        <ul className="stack-list" aria-label={`${project.name} technology stack`}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {project.href ? (
          <a href={project.href} target="_blank" rel="noreferrer">
            Visit project
          </a>
        ) : null}
      </div>
      <ProjectPreview type={project.preview} />
    </article>
  );
}
