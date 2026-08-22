import { EnvelopeSimple } from "@phosphor-icons/react";
import { profile } from "../data/portfolio";
import { ProfileCard } from "./ProfileCard";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">Software developer / Student</p>
        <h1 id="hero-title">I build useful software for real workflows.</h1>
        <p className="hero__summary">
          I am a Grade 12 vocational student building web applications, Windows utilities, and
          developer tools with clear interfaces and reliable delivery.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href={`mailto:${profile.email}`}>
            <EnvelopeSimple aria-hidden="true" size={16} weight="bold" /> Email me
          </a>
          <a className="button button--secondary" href="#work">
            View selected work
          </a>
        </div>
      </div>
      <ProfileCard profile={profile} />
    </section>
  );
}
