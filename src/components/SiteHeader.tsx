import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  ["Work", "#work"],
  ["Capabilities", "#capabilities"],
  ["Profile / More work", "#profile"],
  ["Contact", "#contact"],
] as const;

const DESKTOP_LAYOUT_QUERY = "(min-width: 46rem)";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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

  // Crossing into the desktop layout resets the temporary mobile menu
  // state, so returning to a narrow viewport starts from a closed menu.
  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const layoutQuery = window.matchMedia(DESKTOP_LAYOUT_QUERY);
    if (layoutQuery.matches) {
      setIsMenuOpen(false);
    }

    function resetOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    }

    layoutQuery.addEventListener("change", resetOnDesktop);
    return () => layoutQuery.removeEventListener("change", resetOnDesktop);
  }, []);

  // While the mobile menu is open, the page behind its backdrop is inert
  // so pointer and keyboard interaction stay inside the header layer.
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) {
      return;
    }

    if (isMenuOpen) {
      main.setAttribute("inert", "");
    } else {
      main.removeAttribute("inert");
    }
    return () => main.removeAttribute("inert");
  }, [isMenuOpen]);

  // Track which section is in view so the sticky navigation can expose
  // the current location visually and programmatically.
  useEffect(() => {
    if (typeof IntersectionObserver !== "function") {
      return;
    }

    const sections = navigation
      .map(([, href]) => document.querySelector(href))
      .filter((element) => element instanceof HTMLElement);
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  function handleNavigationChoice(href: string) {
    if (!isMenuOpen) {
      return;
    }

    setIsMenuOpen(false);
    const destination = document.querySelector(href);
    window.setTimeout(() => {
      if (destination instanceof HTMLElement) {
        destination.focus({ preventScroll: true });
      } else {
        menuToggleRef.current?.focus();
      }
    }, 0);
  }

  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="KV / DZ00 home">
        <strong>KV</strong>
        <span>/ DZ00</span>
      </a>

      <button
        ref={menuToggleRef}
        className="menu-toggle"
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        aria-label={
          isMenuOpen ? "Close primary navigation" : "Open primary navigation"
        }
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        {isMenuOpen ? (
          <X aria-hidden="true" size={18} weight="bold" />
        ) : (
          <List aria-hidden="true" size={18} weight="bold" />
        )}
        <span>{isMenuOpen ? "Close" : "Menu"}</span>
      </button>

      {isMenuOpen ? (
        <div
          className="nav-backdrop"
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}

      <nav
        id="primary-navigation"
        className={`site-nav${isMenuOpen ? " is-open" : ""}`}
        aria-label="Primary navigation"
      >
        {navigation.map(([label, href]) => (
          <a
            key={href}
            href={href}
            aria-current={activeSection === href ? "location" : undefined}
            onClick={() => handleNavigationChoice(href)}
          >
            {label}
          </a>
        ))}
      </nav>

      <ThemeToggle />
    </header>
  );
}
