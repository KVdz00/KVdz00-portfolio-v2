import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("portfolio page", () => {
  it("renders the approved landmark and heading structure", () => {
    render(<App />);

    expect(document.querySelector("header.site-header")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: /engineering capabilities/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /looking for an internship or junior software role/i,
      }),
    ).toBeInTheDocument();
  });

  it("includes approved contact links and no resume action", () => {
    render(<App />);

    const contact = document.querySelector("#contact");
    expect(contact).toBeInTheDocument();

    const contactLinks = within(contact as HTMLElement);
    expect(contactLinks.getByRole("link", { name: /email kahfi/i })).toHaveAttribute(
      "href",
      "mailto:kahfiworks.id@gmail.com",
    );
    expect(contactLinks.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/KVdz00",
    );
    expect(contactLinks.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/muhammad-dzikrul-kahfi-0ba869386",
    );
    expect(screen.queryByText(/resume|cv/i)).not.toBeInTheDocument();
  });

  it("keeps navigation targets unique and present", () => {
    const { container } = render(<App />);
    for (const id of ["top", "work", "capabilities", "profile", "contact"]) {
      expect(container.querySelectorAll(`#${id}`)).toHaveLength(1);
    }
  });
});
