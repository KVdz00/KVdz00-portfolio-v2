import { describe, expect, it } from "vitest";
import {
  additionalWork,
  capabilities,
  featuredProjects,
  profile,
  proofItems,
} from "./portfolio";

describe("portfolio content", () => {
  it("uses the approved recruiter positioning and contact routes", () => {
    expect(profile.role).toBe("Software Developer");
    expect(profile.education).toContain("Grade 12");
    expect(profile.email).toBe("kahfiworks.id@gmail.com");
    expect(profile.github).toBe("https://github.com/KVdz00");
    expect(profile.linkedin).toBe(
      "https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386",
    );
  });

  it("keeps exactly the three approved featured projects in order", () => {
    expect(featuredProjects.map((project) => project.name)).toEqual([
      "Liquid Utility",
      "Filsafit",
      "Arindra Production Web",
    ]);
  });

  it("requires evidence and does not expose unverified project links", () => {
    for (const project of featuredProjects) {
      expect(project.evidence.length).toBeGreaterThanOrEqual(2);
      expect(project.contributions.length).toBeGreaterThanOrEqual(2);
      expect(project.href).toBeUndefined();
    }
  });

  it("contains all approved proof, capability, and additional-work groups", () => {
    expect(proofItems).toHaveLength(4);
    expect(capabilities).toHaveLength(4);
    expect(additionalWork.map((project) => project.name)).toEqual([
      "Toggle-Mod",
      "QuickDL",
      "Website Kota Medan",
    ]);
  });
});
