import type { ProcessStep } from "../types/portfolio";

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Define the actual flow",
    body: "Write down the screens, data, native actions, or failure cases that need to work.",
  },
  {
    id: "02",
    title: "Separate the risky boundaries",
    body: "Keep browser UI, server and data work, and native system access explicit when the stack crosses those lines.",
  },
  {
    id: "03",
    title: "Build the end-to-end path",
    body: "Get the real workflow working before adding extra polish or secondary states.",
  },
  {
    id: "04",
    title: "Run the checks and inspect it",
    body: "Typecheck, build, smoke-test the paths that matter, then inspect desktop and mobile layouts.",
  },
];
