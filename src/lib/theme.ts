export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "kvdz00-portfolio-theme";

const themeColors: Record<Theme, string> = {
  dark: "#010409",
  light: "#f6f8fa",
};

export function readInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeColors[theme]);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
}
