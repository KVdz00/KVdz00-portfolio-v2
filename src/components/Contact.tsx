import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "../data/portfolio";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="section-kicker">Contact / UTC +7</p>
        <h2 id="contact-title">Looking for an internship or junior software role.</h2>
        <p>
          I am available for internship, vocational placement, and junior software
          developer conversations.
        </p>
      </div>
      <div className="contact__actions">
        <a className="contact__primary" href={`mailto:${profile.email}`}>
          <EnvelopeSimple aria-hidden="true" size={20} weight="bold" />
          <span><small>Email Kahfi</small>{profile.email}</span>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <LinkedinLogo aria-hidden="true" size={20} weight="bold" />
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <GithubLogo aria-hidden="true" size={20} weight="bold" />
          GitHub
        </a>
      </div>
    </section>
  );
}
