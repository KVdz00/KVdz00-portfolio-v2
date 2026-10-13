import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ProjectPreviewKey } from "../data/portfolio";
import { ProjectPreview } from "./ProjectPreview";

describe("ProjectPreview", () => {
  it.each([
    ["liquid-utility", "preview-liquid"],
    ["filsafit", "preview-filsafit"],
    ["arindra", "preview-arindra"],
  ] satisfies readonly [ProjectPreviewKey, string][])(
    "renders the %s preview",
    (type, className) => {
      const { container } = render(<ProjectPreview type={type} />);
      expect(container.querySelector(`.${className}`)).toBeInTheDocument();
    },
  );

  it("labels the visual as an illustrative preview, not a screenshot", () => {
    const { container } = render(<ProjectPreview type="filsafit" />);
    expect(container.querySelector(".preview-caption")).toHaveTextContent(
      /illustrative preview/i,
    );
  });
});
