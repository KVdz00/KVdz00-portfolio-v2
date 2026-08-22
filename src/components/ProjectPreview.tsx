import type { ComponentType } from "react";
import type { ProjectPreviewKey } from "../data/portfolio";
import { ArindraPreview } from "./project-previews/ArindraPreview";
import { FilsafitPreview } from "./project-previews/FilsafitPreview";
import { LiquidUtilityPreview } from "./project-previews/LiquidUtilityPreview";

const projectPreviews = {
  "liquid-utility": LiquidUtilityPreview,
  filsafit: FilsafitPreview,
  arindra: ArindraPreview,
} satisfies Record<ProjectPreviewKey, ComponentType>;

export function ProjectPreview({ type }: { type: ProjectPreviewKey }) {
  const Preview = projectPreviews[type];
  return <Preview />;
}
