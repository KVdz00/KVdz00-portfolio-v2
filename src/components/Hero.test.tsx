import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";
import { ProofStrip } from "./ProofStrip";

describe("recruiter introduction", () => {
  it("states the approved role, student status, and actions", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /i build useful software for real workflows/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/grade 12 vocational student/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute(
      "href",
      "mailto:kahfiworks.id@gmail.com",
    );
    expect(screen.getByRole("link", { name: /view selected work/i })).toHaveAttribute(
      "href",
      "#work",
    );
  });

  it("replaces a failed local avatar with the KV monogram", () => {
    render(<Hero />);
    fireEvent.error(screen.getByRole("img", { name: /muhammad dzikrul kahfi/i }));
    expect(screen.getByText("KV")).toBeInTheDocument();
  });

  it("shows the four approved proof categories", () => {
    render(<ProofStrip />);
    for (const label of ["Web", "Desktop", "Data", "Delivery"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
