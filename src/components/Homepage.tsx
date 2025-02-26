'use client'; 
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

const products = [
  {
    id: 1,
    image: "/Image1.jpg",
    title: "Camera",
    price: 100500.00,
    description: "description about camera",
    rating: 5,
  },
  {
    id: 2,
    image: "/Image2.jpg",
    title: "Fan",
    price: 10500.00,
    description: "description about fan",
    rating: 5,
  },
  {
    id: 3,
    image: "/Image3.jpg",
    title: "Kettle",
    price: 6500.00,
    description: "description about kettle",
    rating: 4,
  },
  {
    id: 4,
    image: "/Image4.jpg",
    title: "Digital Watch",
    price: 2500.00,
    description: "description about digital watch",
    rating: 5,
  },
  {
    id: 5,
    image: "/Image5.jpg",
    title: "HeadPhone",
    price: 22500.00,
    description: "description about headphone",
    rating: 3,
  },
  {
    id: 6,
    image: "/Image6.jpg",
    title: "JBL",
    price: 25500.00,
    description: "description about JBL",
    rating: 5,
  },
];

const Homepage = () => {
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/*section 01*/}
      <div className = "bg-gray-200 p-6 mb-6 shadow-lg rounded-lg"> 
        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">Today's Featured Items</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg text-start flex flex-col items-center relative" >
            
              <FaHeart
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-2 right-2 cursor-pointer ${
                favorites[product.id] ? "fill-red-500 stroke-black" : "fill-white stroke-black"
              }`}
              size={30}
              strokeWidth={25}
              />
              
              <div className="w-full h-48 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              
              <div className="mt-4 w-full flex justify-between border-b border-gray-300 pb-2">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-black-400 font-bold">LKR {product.price.toFixed(2)}</p>
              </div>

              <p className="text-black-600 mt-2 text-left">{product.description}</p>

              <div className="flex justify-start mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <span key={i} className="text-green-800 text-lg">
                    ★
                  </span>
                ))}
              </div>

              <button className="mt-4 bg-white border-2 border-green-900 text-green-900 font-bold px-4 py-1 rounded-sm hover:bg-green-500 hover:text-white transition self-start">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
            View More
          </button>
        </div>
      </div>

      {/*section 02*/}
      <div className = "bg-gray-200 p-6 mb-6 shadow-lg rounded-lg"> 
        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">Best Selling Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[products[0],products[2],products[3]].map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg text-start flex flex-col items-center relative" >
            
              <FaHeart
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-2 right-2 cursor-pointer ${
                favorites[product.id] ? "fill-red-500 stroke-black" : "fill-white stroke-black"
              }`}
              size={30}
              strokeWidth={25}
              />
              
              <div className="w-full h-48 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              
              <div className="mt-4 w-full flex justify-between border-b border-gray-300 pb-2">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-black-400 font-bold">LKR {product.price.toFixed(2)}</p>
              </div>

              <p className="text-black-600 mt-2 text-left">{product.description}</p>

              <div className="flex justify-start mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <span key={i} className="text-green-800 text-lg">
                    ★
                  </span>
                ))}
              </div>

              <button className="mt-4 bg-white border-2 border-green-900 text-green-900 font-bold px-4 py-1 rounded-sm hover:bg-green-500 hover:text-white transition self-start">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
            View More
          </button>
        </div>
      </div>
      
      {/*section 03*/}
      <div className = "relative bg-gray-200 p-6 mb-6 shadow-lg rounded-lg"> 
        <div className="absolute  top-7 right-10 space-x-10">
        <GoArrowLeft size={30} className="absolute rounded-full bg-gray-400  text-black cursor-pointer"/>
        <GoArrowRight size={30} className="text-black rounded-full bg-gray-400  cursor-pointer"/>
        </div>

        <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">Today's Deals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[products[0],products[2],products[3]].map((product) => {
           
          const discount=0.1;
          const discountPrice= (product.price* (1 - discount)).toFixed(2); 
          
          return(
           <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg text-start flex flex-col items-center relative" >
            
              <FaHeart
              onClick={() => toggleFavorite(product.id)}
              className={`absolute top-2 right-2 cursor-pointer ${
                favorites[product.id] ? "fill-red-500 stroke-black" : "fill-white stroke-black"
              }`}
              size={30}
              strokeWidth={25}
              />
              
              <div className="mt-4 w-full flex h-48 relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
              
              <div className="mt-4 w-full flex justify-between border-b border-gray-300 pb-2">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <div className="flex flex-col item-end">
                  <span className="text-gray-500 line-through text-sm">LKR {product.price.toFixed(2)}</span>
                  <span className ="text-red-500 font-bold">LKR {discountPrice}</span>
                </div>
              </div>

              <p className="text-black-600 mt-2 text-left">{product.description}</p>

              <div className="flex justify-start mt-2">
                {[...Array(product.rating)].map((_, i) => (
                  <span key={i} className="text-green-800 text-lg">
                    ★
                  </span>
                ))}
              </div>

              <button className="mt-4 bg-white border-2 border-green-900 text-green-900 font-bold px-4 py-1 rounded-sm hover:bg-green-500 hover:text-white transition self-start">
                Add to Cart
              </button>
            </div>
            );
            } )}

        </div>

        <div className="text-center mt-6">
          <button className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-600 transition">
            View More
          </button>
        </div>
      </div>

    </div>
  );
};

export default Homepage;
