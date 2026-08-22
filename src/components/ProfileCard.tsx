import { useState } from "react";
import type { Profile } from "../data/portfolio";

export function ProfileCard({ profile }: { profile: Profile }) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <aside className="profile-card" aria-label="Profile summary">
      <div className="profile-card__identity">
        {avatarFailed ? (
          <span className="profile-card__fallback" aria-hidden="true">
            KV
          </span>
        ) : (
          <img
            src="/profile-avatar.png"
            alt={profile.name}
            onError={() => setAvatarFailed(true)}
          />
        )}
        <div>
          <strong>{profile.name}</strong>
          <span className="availability">
            <i aria-hidden="true" />
            {profile.availability}
          </span>
        </div>
      </div>
      <dl className="profile-card__facts">
        <div>
          <dt>Based</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>Current</dt>
          <dd>Grade 12 SMK</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd>{profile.role}</dd>
        </div>
        <div>
          <dt>Timezone</dt>
          <dd>{profile.timezone}</dd>
        </div>
      </dl>
      <div className="profile-card__links">
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </aside>
  );
}
