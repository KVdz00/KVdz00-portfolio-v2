/// <reference types="vite/client" />

import { describe, expect, it } from "vitest";
import styles from "./styles.css?raw";

describe("visual system contract", () => {
  it("defines the approved semantic color tokens", () => {
    for (const token of [
      "--canvas: oklch(13% 0.015 255)",
      "--surface: oklch(21% 0.02 255)",
      "--border: oklch(32% 0.025 255)",
      "--text: oklch(96% 0.008 250)",
      "--action: oklch(62% 0.19 255)",
      "--identity: oklch(78% 0.13 183)",
      "--status: oklch(72% 0.18 145)",
    ]) {
      expect(styles).toContain(token);
    }
  });

  it("defines light mode, visible focus, mobile layout, and reduced motion", () => {
    expect(styles).toContain('html[data-theme="light"]');
    expect(styles).toContain(":focus-visible");
    expect(styles).toContain("@media (min-width: 46rem)");
    expect(styles).toContain("@media (min-width: 64rem)");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("keeps the sticky header visually opaque without glass blur", () => {
    expect(styles).toMatch(/\.site-header\s*\{[^}]*background: var\(--base\)/s);
    expect(styles).toMatch(/\.site-header::before\s*\{[^}]*background: var\(--header\)/s);
    expect(styles).not.toContain("backdrop-filter");
  });

  it("hides collapsed mobile navigation targets and restores desktop links", () => {
    expect(styles).toMatch(/\.site-nav:not\(\.is-open\) a\s*\{[^}]*visibility: hidden/s);
    expect(styles).toMatch(
      /@media \(min-width: 46rem\)[\s\S]*?\.site-nav:not\(\.is-open\) a\s*\{[^}]*visibility: visible/s,
    );
  });

  it("keeps the small primary-contact label at full text contrast", () => {
    expect(styles).toMatch(/\.contact__primary small\s*\{[^}]*color: currentColor/s);
  });

  it("counts proof items independently from the hidden heading at tablet widths", () => {
    expect(styles).toMatch(
      /@media \(min-width: 46rem\)[\s\S]*?\.proof-item:nth-of-type\(2n\)\s*\{[^}]*border-right: 0/s,
    );
    expect(styles).not.toContain(".proof-item:nth-child(2n)");
  });
});
