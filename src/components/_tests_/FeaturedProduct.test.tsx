import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import FeaturedProducts from "../FeaturedProducts";
import { CategoryProvider, useCategory } from "@/context/CategoryContext";
import "@testing-library/jest-dom";

global.fetch = jest.fn();

describe("FeaturedProducts Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays no products if there are no featured items", async () => {
    const mockUseCategory = jest.spyOn(
      require("@/context/CategoryContext"),
      "useCategory"
    );
    mockUseCategory.mockReturnValue({ selectedCategory: "all" });

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    });

    render(
      <CategoryProvider>
        <FeaturedProducts section="featuredItems" />
      </CategoryProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText("Product 1")).not.toBeInTheDocument()
    );

    expect(screen.queryByText("View More")).not.toBeInTheDocument();
  });

  it("handles loading state correctly", async () => {
    const mockUseCategory = jest.spyOn(
      require("@/context/CategoryContext"),
      "useCategory"
    );
    mockUseCategory.mockReturnValue({ selectedCategory: "all" });

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    });

    render(
      <CategoryProvider>
        <FeaturedProducts section="featuredItems" />
      </CategoryProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );
  });

  it("handles errors in fetch correctly", async () => {
    const mockUseCategory = jest.spyOn(
      require("@/context/CategoryContext"),
      "useCategory"
    );
    mockUseCategory.mockReturnValue({ selectedCategory: "all" });

    fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <CategoryProvider>
        <FeaturedProducts section="featuredItems" />
      </CategoryProvider>
    );

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );
  });
});
