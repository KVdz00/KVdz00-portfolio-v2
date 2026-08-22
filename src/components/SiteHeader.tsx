import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  ["Work", "#work"],
  ["Capabilities", "#capabilities"],
  ["Profile", "#profile"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  function closeMenuAndRestoreFocus() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      window.setTimeout(() => menuToggleRef.current?.focus(), 0);
    }
  }

  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="KV / DZ00 home">
        <strong>KV</strong>
        <span>/ DZ00</span>
      </a>

      <div className="header-actions">
        <ThemeToggle />
        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close, close navigation" : "Menu, open navigation"}
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

      <nav
        id="primary-navigation"
        className={`site-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Primary navigation"
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenuAndRestoreFocus}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
