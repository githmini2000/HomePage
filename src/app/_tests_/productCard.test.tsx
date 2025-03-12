import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../products/productCard";

describe("ProductCard Component", () => {
  const product = {
    id: 1,
    image: "sample.jpg",
    title: "Sample Product",
    price: 1000,
    description: "This is a sample product.",
    rating: 4,
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(
      <ProductCard
        product={product}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
  });

  it("renders product details correctly", () => {
    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("LKR 1000.00")).toBeInTheDocument();
    expect(screen.getByText("This is a sample product.")).toBeInTheDocument();
    expect(screen.getByAltText("Sample Product")).toBeInTheDocument();
  });

  it("renders the correct number of stars based on rating", () => {
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(4);
  });

  it("calls onEdit when the Edit button is clicked", () => {
    fireEvent.click(screen.getByText("Edit"));
    expect(mockOnEdit).toHaveBeenCalledWith(product);
  });

  it("calls onDelete when the Delete button is clicked", () => {
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(product.id);
  });
});
