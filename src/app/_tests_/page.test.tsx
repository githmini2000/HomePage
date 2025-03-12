import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductsPage from "../products/page";

describe("ProductsPage", () => {
  it("renders products after successful fetch", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "Product1", category: { id: 1, name: "Category1" } },
        { id: 2, name: "Product2", category: { id: 2, name: "Category2" } },
      ],
    });
    render(<ProductsPage />);
  });
});
