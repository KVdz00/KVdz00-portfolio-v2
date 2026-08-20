import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const themeStorageKey = "kvdz00-portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem(themeStorageKey);
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const isLight = theme === "light";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isLight ? "#f4f8fb" : "#071014");
    window.localStorage.setItem(themeStorageKey, theme);
  }, [isLight, theme]);

  return (
    <button
      className="theme-switch"
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? (
        <Sun size={18} weight="bold" />
      ) : (
        <Moon size={18} weight="bold" />
      )}
    </button>
  );
}
