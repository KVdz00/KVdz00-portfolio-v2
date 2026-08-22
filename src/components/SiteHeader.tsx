import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  ["Work", "#work"],
  ["Capabilities", "#capabilities"],
  ["Profile", "#profile"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="KV / DZ00 home">
        <strong>KV</strong>
        <span>/ DZ00</span>
      </a>

      <nav
        id="primary-navigation"
        className={`site-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Primary navigation"
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={18} weight="bold" />
          ) : (
            <List aria-hidden="true" size={18} weight="bold" />
          )}
          <span>{isMenuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>
    </header>
  );
}
