export type PreviewKind =
  "utility" | "arindra" | "medan" | "filsafit" | "modtoggle";

export type Project = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  status: string;
  problem: string;
  technicalDecision: string;
  result: string;
  preview: PreviewKind;
};

export type ProcessStep = {
  id: string;
  title: string;
  body: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};
