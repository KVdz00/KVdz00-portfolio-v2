import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { applyTheme, readInitialTheme, THEME_STORAGE_KEY } from "./theme";

function stubColorScheme(scheme: "light" | "dark") {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: query.includes(scheme),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

describe("theme helpers", () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="theme-color" content="#010409">';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("follows the light system preference on first visit", () => {
    stubColorScheme("light");
    expect(readInitialTheme()).toBe("light");
  });

  it("follows the dark system preference on first visit", () => {
    stubColorScheme("dark");
    expect(readInitialTheme()).toBe("dark");
  });

  it("lets a saved theme override the system preference", () => {
    stubColorScheme("light");
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(readInitialTheme()).toBe("dark");
  });

  it("defaults to dark when persisted theme cannot be read", () => {
    const getItem = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("storage read blocked");
      });

    try {
      expect(readInitialTheme()).toBe("dark");
    } finally {
      getItem.mockRestore();
    }
  });

  it("applies the DOM theme when persistence fails", () => {
    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("storage write blocked");
      });

    try {
      expect(() => applyTheme("light")).not.toThrow();
      expect(document.documentElement.dataset.theme).toBe("light");
      expect(document.documentElement.style.colorScheme).toBe("light");
      expect(
        document.querySelector('meta[name="theme-color"]'),
      ).toHaveAttribute("content", "#f6f8fa");
    } finally {
      setItem.mockRestore();
    }
  });
});
