"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const TodaysDeals = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/items?section=todaysDeals&page=1&size=4")
      .then((res) => res.json())
      .then((data) => {
        console.log("Section 3 Data:", data.items);
        setProducts(data);
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  return (
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showDiscount={true} />
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals;
