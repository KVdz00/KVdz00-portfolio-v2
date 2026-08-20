import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="Muhammad Dzikrul Kahfi home">
        <span>KV</span>
        <small>/ DZ00</small>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#process">Process</a>
        <a href="#connect">Connect</a>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <div className="availability">
          <span />
          Available for projects
        </div>
      </div>
    </header>
  );
}
