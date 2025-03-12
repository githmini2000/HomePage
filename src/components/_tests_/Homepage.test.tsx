import { render, screen } from "@testing-library/react";
import Homepage from "../Homepage";
import { CategoryProvider } from "../../context/CategoryContext";

jest.mock("../FeaturedProducts", () => {
  return jest.fn(() => <div>Featured Products Component</div>);
});

describe("Homepage Component", () => {
  it("renders Homepage and FeaturedProducts component", () => {
    render(
      <CategoryProvider>
        <Homepage />
      </CategoryProvider>
    );
    expect(screen.getByText("Featured Products Component")).toBeInTheDocument();
  });
});
