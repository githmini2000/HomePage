import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "../products/productList";

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

const products = [
  {
    id: 1,
    title: "Laptop",
    price: 1500,
    description: "High-end gaming laptop",
    image: "laptop.jpg",
    rating: 5,
    category: { id: 1, name: "Electronics" },
  },
  {
    id: 2,
    title: "Book",
    price: 20,
    description: "A science fiction book",
    image: "book.jpg",
    rating: 4,
    category: { id: 2, name: "Books" },
  },
];

jest.mock("../products/productCard", () => ({
  __esModule: true,
  default: ({ product, onEdit, onDelete }: any) => (
    <div data-testid="product-card">
      <h2>{product.title}</h2>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  ),
}));

describe("ProductList Component", () => {
  beforeEach(() => {
    render(
      <ProductList
        products={products}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
  });

  it("renders the correct number of product cards", () => {
    const productCards = screen.getAllByTestId("product-card");
    expect(productCards.length).toBe(products.length);
  });

  it("displays product titles correctly", () => {
    products.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it("calls onEdit when the edit button is clicked", () => {
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(products[0]);
  });

  it("calls onDelete when the delete button is clicked", () => {
    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[1]);
    expect(mockOnDelete).toHaveBeenCalledWith(products[1].id);
  });
});
