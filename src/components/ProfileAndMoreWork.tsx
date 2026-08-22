import { additionalWork } from "../data/portfolio";

export function ProfileAndMoreWork() {
  return (
    <section
      className="profile-section"
      id="profile"
      aria-labelledby="profile-title"
    >
      <div className="profile-section__intro">
        <p className="section-kicker">Profile / More work</p>
        <h2 id="profile-title">
          Learning by building and maintaining real projects.
        </h2>
        <p>
          I am a Grade 12 vocational student in Indonesia. I work across
          interfaces, application logic, data, native desktop boundaries,
          testing, and delivery, then document decisions so each project is
          easier to continue.
        </p>
      </div>
      <div className="more-work">
        {additionalWork.map((project) => (
          <article key={project.name}>
            <h3>{project.name}</h3>
            <span>{project.stack}</span>
            <p>{project.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
