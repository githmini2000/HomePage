import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "../Header";
import { useCategory } from "../../context/CategoryContext";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: "1", name: "Electronics" },
        { id: "2", name: "Clothing" },
        { id: "3", name: "Home Appliances" },
      ]),
  })
);

jest.mock("../../context/CategoryContext", () => ({
  useCategory: jest.fn(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    (useCategory as jest.Mock).mockReturnValue({
      selectedCategory: "all",
      setSelectedCategory: jest.fn(),
    });
  });

  test("renders category dropdown with correct options", async () => {
    render(<Header />);

    await waitFor(() => {
      expect(screen.getByText("All Categories")).toBeInTheDocument();
      expect(screen.getByText("Electronics")).toBeInTheDocument();
      expect(screen.getByText("Clothing")).toBeInTheDocument();
      expect(screen.getByText("Home Appliances")).toBeInTheDocument();
    });
  });

  test("renders search input with a placeholder", () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText("Search Product");
    expect(searchInput).toBeInTheDocument();
  });

  test("renders the Products link", () => {
    render(<Header />);

    const productsLink = screen.getByRole("link", { name: /products/i });
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute("href", "/products");
  });
});
