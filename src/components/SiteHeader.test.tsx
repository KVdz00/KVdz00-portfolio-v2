import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "./SiteHeader";
import { THEME_STORAGE_KEY } from "../lib/theme";

describe("SiteHeader", () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="theme-color" content="#010409">';
  });

  it("shows the approved navigation and exposes mobile menu state", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /kv \/ dz00 home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");

    const menu = screen.getByRole("button", { name: /menu.*open navigation/i });
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveTextContent("Menu");

    await user.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveTextContent("Close");
    expect(menu).toHaveAccessibleName(/close.*navigation/i);
    expect(screen.getByRole("navigation", { name: /primary/i })).toHaveClass("is-open");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(menu).toHaveAttribute("aria-expanded", "false");
  });

  it("moves forward from a keyboard-opened menu to the first navigation link", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const menu = screen.getByRole("button", { name: /menu.*open navigation/i });
    menu.focus();
    await user.keyboard("{Enter}");
    await user.tab();

    expect(screen.getByRole("link", { name: "Work" })).toHaveFocus();
  });

  it("returns focus to the visible menu control after Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const menu = screen.getByRole("button", { name: /menu.*open navigation/i });
    menu.focus();
    await user.keyboard("{Enter}");
    await user.tab();
    await user.keyboard("{Escape}");

    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveFocus();
  });

  it("persists and applies the selected theme", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    render(<SiteHeader />);

    await waitFor(() => {
      expect(document.documentElement.dataset.theme).toBe("dark");
    });

    await user.click(screen.getByRole("button", { name: /switch to light theme/i }));

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#f6f8fa",
    );
  });

  it("closes the mobile menu after a keyboard navigation choice", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const menu = screen.getByRole("button", { name: /menu.*open navigation/i });
    menu.focus();
    await user.keyboard("{Enter}");
    await user.tab();
    await user.tab();
    expect(screen.getByRole("link", { name: "Capabilities" })).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(menu).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(menu).toHaveFocus());
  });

  it("defaults to dark and keeps theme switching usable when storage throws", async () => {
    const user = userEvent.setup();
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage read blocked");
    });
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage write blocked");
    });

    try {
      expect(() => render(<SiteHeader />)).not.toThrow();

      await waitFor(() => {
        expect(document.documentElement.dataset.theme).toBe("dark");
      });

      await user.click(screen.getByRole("button", { name: /switch to light theme/i }));
      expect(document.documentElement.dataset.theme).toBe("light");
    } finally {
      getItem.mockRestore();
      setItem.mockRestore();
    }
  });
});
