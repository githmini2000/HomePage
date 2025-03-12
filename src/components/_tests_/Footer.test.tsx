import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("should render the footer with quick links, contact section, and email input", () => {
    render(<Footer />);

    const contactHeading = screen.getByRole("heading", {
      level: 3,
      name: /contact us/i,
    });
    expect(contactHeading).toBeInTheDocument();

    const contactLink = screen.getByRole("link", { name: /contact us/i });
    expect(contactLink).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/your email address/i);
    expect(emailInput).toBeInTheDocument();
  });

  it("should have icons next to each link", () => {
    render(<Footer />);

    const svgIcons = document.querySelectorAll("svg");
    expect(svgIcons.length).toBeGreaterThan(0);
  });
});
