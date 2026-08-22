import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { applyTheme, readInitialTheme, type Theme } from "../lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(nextTheme)}
    >
      {theme === "dark" ? (
        <Moon aria-hidden="true" size={18} weight="bold" />
      ) : (
        <Sun aria-hidden="true" size={18} weight="bold" />
      )}
    </button>
  );
}
