import { beforeEach, describe, expect, it, vi } from "vitest";
import { applyTheme, readInitialTheme } from "./theme";

describe("theme helpers", () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="theme-color" content="#010409">';
  });

  it("defaults to dark when persisted theme cannot be read", () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage read blocked");
    });

    try {
      expect(readInitialTheme()).toBe("dark");
    } finally {
      getItem.mockRestore();
    }
  });

  it("applies the DOM theme when persistence fails", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage write blocked");
    });

    try {
      expect(() => applyTheme("light")).not.toThrow();
      expect(document.documentElement.dataset.theme).toBe("light");
      expect(document.documentElement.style.colorScheme).toBe("light");
      expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
        "content",
        "#f6f8fa",
      );
    } finally {
      setItem.mockRestore();
    }
  });
});
