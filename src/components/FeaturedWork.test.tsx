import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedWork } from "./FeaturedWork";

describe("FeaturedWork", () => {
  it("renders the three approved case studies in order", () => {
    render(<FeaturedWork />);
    const articles = screen.getAllByRole("article");

    expect(articles).toHaveLength(3);
    expect(
      articles.map(
        (article) =>
          within(article).getByRole("heading", { level: 3 }).textContent,
      ),
    ).toEqual(["Liquid Utility", "Filsafit", "Arindra Production Web"]);
  });

  it("renders responsibility, evidence, outcome, and stack for every project", () => {
    render(<FeaturedWork />);

    for (const article of screen.getAllByRole("article")) {
      expect(within(article).getByText("My role")).toBeInTheDocument();
      expect(
        within(article).getByText("Engineering evidence"),
      ).toBeInTheDocument();
      expect(within(article).getByText("Outcome")).toBeInTheDocument();
      expect(
        within(article).getByRole("list", { name: /technology stack/i }),
      ).toBeInTheDocument();
    }
  });

  it("does not render project actions without verified URLs", () => {
    render(<FeaturedWork />);
    expect(
      screen.queryByRole("link", { name: /visit project/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /view repository/i }),
    ).not.toBeInTheDocument();
  });

  it("shows a useful fallback when featured work is empty", () => {
    render(<FeaturedWork projects={[]} />);
    expect(
      screen.getByText(/project details are being reviewed/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute(
      "href",
      "mailto:kahfiworks.id@gmail.com",
    );
  });
});
