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
});
