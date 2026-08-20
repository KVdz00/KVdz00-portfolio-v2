import {
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

export function Connect() {
  return (
    <section
      className="connect-section"
      id="connect"
      aria-labelledby="connect-title"
    >
      <div className="section-label">
        <span>Connect</span>
        <span>Contact</span>
      </div>
      <div className="connect-content">
        <div>
          <h2 id="connect-title">
            Have a web app, internal tool, or desktop utility that needs
            building or cleaning up?
          </h2>
          <p>
            Email me with the problem, the current state, and what you want the
            finished version to do.
          </p>
        </div>
        <div className="contact-links" aria-label="Social links">
          <a
            href="https://www.instagram.com/dzikv_/"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramLogo size={22} weight="bold" />
            <span>@dzikv_</span>
          </a>
          <a href="https://github.com/KVdz00" target="_blank" rel="noreferrer">
            <GithubLogo size={22} weight="bold" />
            <span>github.com/KVdz00</span>
          </a>
          <a href="mailto:kahfiworks.id@gmail.com">
            <EnvelopeSimple size={22} weight="bold" />
            <span>kahfiworks.id@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
