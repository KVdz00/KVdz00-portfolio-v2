import { skillGroups } from "../data/skills";

export function Skills() {
  return (
    <section
      className="skills-section"
      id="skills"
      aria-labelledby="skills-title"
    >
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
  );
}
