"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const products = [
  {
    id: 1,
    image: "/Image1.jpg",
    title: "Camera",
    price: 100500.0,
    description: "description about camera",
    rating: 5,
  },
  {
    id: 2,
    image: "/Image2.jpg",
    title: "Fan",
    price: 10500.0,
    description: "description about fan",
    rating: 5,
  },
  {
    id: 3,
    image: "/Image3.jpg",
    title: "Kettle",
    price: 6500.0,
    description: "description about kettle",
    rating: 4,
  },
  {
    id: 4,
    image: "/Image4.jpg",
    title: "Digital Watch",
    price: 2500.0,
    description: "description about digital watch",
    rating: 5,
  },
  {
    id: 5,
    image: "/Image5.jpg",
    title: "HeadPhone",
    price: 22500.0,
    description: "description about headphone",
    rating: 3,
  },
  {
    id: 6,
    image: "/Image6.jpg",
    title: "JBL",
    price: 25500.0,
    description: "description about JBL",
    rating: 5,
  },
  {
    id: 7,
    image: "/Image7.jpg",
    title: "Electrical Iorn",
    price: 3500.0,
    description: "description about electrical iorn",
    rating: 5,
  },
  {
    id: 8,
    image: "/Image8.jpg",
    title: "Rice Cooker",
    price: 16500.0,
    description: "description about rice cooker",
    rating: 5,
  },
  {
    id: 9,
    image: "/Image9.jpg",
    title: "Blender",
    price: 12000.0,
    description: "description about blender",
    rating: 4,
  },
  {
    id: 10,
    image: "/Image10.jpg",
    title: "Oven",
    price: 85000.0,
    description: "description about digital Oven",
    rating: 5,
  },
  {
    id: 11,
    image: "/Image11.jpg",
    title: "Fridge",
    price: 225000.0,
    description: "description about Fridge",
    rating: 3,
  },
  {
    id: 12,
    image: "/Image12.jpg",
    title: "Television",
    price: 90000.0,
    description: "description about television",
    rating: 5,
  },
  {
    id: 13,
    image: "/Image13.jpg",
    title: "Laptop",
    price: 265000.0,
    description: "description about laptop",
    rating: 4,
  },
  {
    id: 14,
    image: "/Image14.jpg",
    title: "Electrical Oven",
    price: 225000.0,
    description: "description about digital electrical oven",
    rating: 5,
  },
  {
    id: 15,
    image: "/Image15.jpg",
    title: "Gas Cooker",
    price: 20000.0,
    description: "description about Gas Cooker",
    rating: 3,
  },
  {
    id: 16,
    image: "/Image6.jpg",
    title: "Portable Speaker",
    price: 15000.0,
    description: "description about portable speaker",
    rating: 5,
  },
];

const section3Products = [
  products[0], // Camera
  products[1], // Fan
  products[2], // Kettle
  products[3], // Digital Watch
];

const Homepage = () => {
  const [visibleItemsSection1, setVisibleItemsSection1] = useState(4);
  const [visibleItemsSection2, setVisibleItemsSection2] = useState(4);

  const loadMoreSection1 = () => {
    setVisibleItemsSection1((prev) => Math.min(prev + 4, products.length));
  };

  const loadMoreSection2 = () => {
    setVisibleItemsSection2((prev) => Math.min(prev + 4, products.length));
  };

  return (
    <div className="min-h-screen bg-white p-6">
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
