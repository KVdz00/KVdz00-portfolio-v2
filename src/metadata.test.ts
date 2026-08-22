// @ts-expect-error The frontend TypeScript project intentionally omits Node types; Vitest supplies these runtime modules.
import { existsSync, readFileSync, statSync } from "node:fs";
// @ts-expect-error The frontend TypeScript project intentionally omits Node types; Vitest supplies these runtime modules.
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// @ts-expect-error Vitest exposes import.meta.dirname while the browser-focused app typecheck does not declare it.
const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");

describe("public metadata", () => {
  it("uses the public custom domain and approved positioning", () => {
    expect(html).toContain('href="https://dzikrulkahfi.my.id/"');
    expect(html).toContain('content="https://dzikrulkahfi.my.id/"');
    expect(html).toContain("Grade 12 vocational student");
    expect(html).toContain('"jobTitle": "Software Developer"');
  });

  it("references local social assets with useful alt text", () => {
    expect(html).toContain("https://dzikrulkahfi.my.id/og-image.png");
    expect(html).toContain("Muhammad Dzikrul Kahfi portfolio");

    for (const asset of ["og-image.png", "apple-touch-icon.png", "favicon.svg"]) {
      const path = resolve(root, "public", asset);
      expect(existsSync(path)).toBe(true);
      expect(statSync(path).size).toBeGreaterThan(100);
    }
  });
});
