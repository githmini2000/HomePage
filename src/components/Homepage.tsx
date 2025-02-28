"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const Homepage = () => {
  const [productsSection1, setProductsSection1] = useState<any[]>([]);
  const [page1, setPage1] = useState(0);
  const [hasMore1, setHasMore1] = useState(true);

  const [productsSection2, setProductsSection2] = useState<any[]>([]);
  const [page2, setPage2] = useState(0);
  const [hasMore2, setHasMore2] = useState(true);

  const [productsSection3, setProductsSection3] = useState<any[]>([]);

  const pageSize = 4;

  // Fetch paginated data for Section 1
  const fetchSection1Products = () => {
    fetch(
      `http://localhost:8080/api/get-products?page=${page1}&size=${pageSize}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore1(false); // No more products to load
        } else {
          setProductsSection1((prev) => [...prev, ...data]);
          setPage1((prev) => prev + 1);
        }
      })
      .catch((error) => console.error("Error loading products:", error));
  };

  // Fetch  products for Sections 2
  const fetchSection2Products = () => {
    fetch(
      `http://localhost:8080/api/get-best-selling-products?page=${page2}&size=${pageSize}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore2(false);
        } else {
          setProductsSection2((prev) => [...prev, ...data]);
          setPage2((prev) => prev + 1);
        }
      })
      .catch((error) =>
        console.error("Error loading Section 2 products:", error)
      );
  };

  // Fetch products for Section 3
  useEffect(() => {
    fetch("http://localhost:8080/api/get-section3-products?limit=4")
      .then((res) => res.json())
      .then((data) => {
        console.log("Section 3 Data:", data);
        setProductsSection3(data);
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  useEffect(() => {
    fetchSection1Products();
    fetchSection2Products();
  }, []);

  return (
    <div>
      {/* Section 01 - Backend Pagination */}
      <div className="bg-gray-200 p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">
          Today's Featured Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsSection1.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore1 && (
          <div className="text-center mt-6">
            <button
              onClick={fetchSection1Products}
              className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* Section 02 - Best Selling Products */}
      <div className="bg-gray-200 p-6 mb-6 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">
          Best Selling Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsSection2.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore2 && (
          <div className="text-center mt-6">
            <button
              onClick={fetchSection2Products}
              className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {/* Section 03 - Today's Deals */}
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
          {productsSection3.map((product) => (
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
