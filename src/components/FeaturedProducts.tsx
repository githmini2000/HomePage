"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ section }: { section: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const pageSize = 4;

  const fetchProducts = () => {
    fetch(
      `http://localhost:3001/items?section=featuredItems&page=${page}&size=${pageSize}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prev) => [...prev, ...data]);
          setPage((prev) => prev + 1);
        }
      })
      .catch((error) =>
        console.error("Error loading Best Selling Products:", error)
      );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="bg-gray-200 p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">
          Today's Featured Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore && !loading && (
          <div className="text-center mt-6">
            <button
              onClick={fetchProducts}
              className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              View More
            </button>
          </div>
        )}
        {loading && (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
