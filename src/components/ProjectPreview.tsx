import type { ProjectPreviewKey } from "../data/portfolio";
import { ArindraPreview } from "./project-previews/ArindraPreview";
import { FilsafitPreview } from "./project-previews/FilsafitPreview";
import { LiquidUtilityPreview } from "./project-previews/LiquidUtilityPreview";

export function ProjectPreview({ type }: { type: ProjectPreviewKey }) {
  switch (type) {
    case "liquid-utility":
      return <LiquidUtilityPreview />;
    case "filsafit":
      return <FilsafitPreview />;
    case "arindra":
      return <ArindraPreview />;
  }
}
