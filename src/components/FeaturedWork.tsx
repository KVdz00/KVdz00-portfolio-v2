import {
  featuredProjects,
  profile,
  type FeaturedProject as FeaturedProjectData,
} from "../data/portfolio";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

export function FeaturedWork({
  projects = featuredProjects,
}: {
  projects?: readonly FeaturedProjectData[];
}) {
  return (
    <section className="featured-work" id="work" aria-labelledby="work-title">
      <header className="section-heading">
        <p className="section-kicker">Selected work / 2026</p>
        <h2 id="work-title">Projects that show how I build.</h2>
        <p>
          Three products, each presented through responsibility and engineering
          evidence.
        </p>
      </header>
      {projects.length > 0 ? (
        <div className="case-study-list">
          {projects.map((project) => (
            <ProjectCaseStudy key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="work-empty" role="status">
          Project details are being reviewed.{" "}
          <a href={`mailto:${profile.email}`}>Email me</a> for current work
          samples.
        </p>
      )}
    </section>
  );
}
