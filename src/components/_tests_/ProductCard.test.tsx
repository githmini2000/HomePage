import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";

const mockProduct = {
  id: 1,
  image: "/test-image.jpg",
  title: "Test Product",
  price: 1000,
  description: "This is a test product description.",
  rating: 4,
};

describe("ProductCard Component", () => {
  it("renders product details correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test product description.")
    ).toBeInTheDocument();
    expect(screen.getByText("LKR 1000.00")).toBeInTheDocument();

    expect(screen.getByAltText("Test Product")).toBeInTheDocument();

    expect(screen.getAllByText("★")).toHaveLength(4);

    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("displays discount price when showDiscount is true", () => {
    render(<ProductCard product={mockProduct} showDiscount />);

    expect(screen.getByText("LKR 1000.00")).toHaveClass("line-through");

    expect(screen.getByText("LKR 900.00")).toBeInTheDocument();
  });

  it("does not display discount price when showDiscount is false", () => {
    render(<ProductCard product={mockProduct} showDiscount={false} />);

    expect(screen.queryByText("LKR 900.00")).not.toBeInTheDocument();
  });

  it("handles heart icon click", () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    const heartIcon = container.querySelector("svg");

    fireEvent.click(heartIcon!);

    expect(heartIcon).toBeInTheDocument();
  });

  it('handles "Add to Cart" button click', () => {
    render(<ProductCard product={mockProduct} />);
    const button = screen.getByText("Add to Cart");

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
