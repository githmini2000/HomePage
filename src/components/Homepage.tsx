"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const Homepage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [visibleItemsSection1, setVisibleItemsSection1] = useState(4);
  const [visibleItemsSection2, setVisibleItemsSection2] = useState(4);

  useEffect(() => {
    fetch("http://localhost:8080/api/get-products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  const loadMoreSection1 = () => {
    setVisibleItemsSection1((prev) => Math.min(prev + 4, products.length));
  };

  const loadMoreSection2 = () => {
    setVisibleItemsSection2((prev) => Math.min(prev + 4, products.length));
  };

  const section3Products = products.slice(0, 4);

  return (
    <div>
      {/* Section 01 */}
      <div className="bg-gray-200 p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">
          Today's Featured Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleItemsSection1).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {visibleItemsSection1 < products.length && (
          <div className="text-center mt-6">
            <button
              onClick={loadMoreSection1}
              className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* Section 02 */}
      <div className="bg-gray-200 p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">
          Best Selling Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(4, visibleItemsSection2 + 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {visibleItemsSection2 < products.length && (
          <div className="text-center mt-6">
            <button
              onClick={loadMoreSection2}
              className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* Section 03 */}
      <div className="relative bg-gray-200 p-6 mb-6 shadow-lg rounded-lg">
        <div className="absolute top-7 right-10 space-x-10">
          <GoArrowLeft
            size={30}
            className="absolute rounded-full bg-gray-400 text-black cursor-pointer"
          />
          <GoArrowRight
            size={30}
            className="text-black rounded-full bg-gray-400 cursor-pointer"
          />
        </div>

        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">
          Today's Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {section3Products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showDiscount={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
