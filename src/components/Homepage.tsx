import Image from "next/image";
import React from "react";

const products = [
  {
    id: 1,
    image: "/Image1.jpg",
    title: "Cammera",
    price: "LKR 100,500.00",
    description: "description about camera",
    rating: 5,
  },
  {
    id: 2,
    image: "/Image2.jpg",
    title: "Fan",
    price: "LKR 22,500.00",
    description: "description about fan",
    rating: 5,
  },
  {
    id: 3,
    image: "/Image3.jpg",
    title: "Kettle",
    price: "LKR 6,500.00",
    description: "description about kettle",
    rating: 4,
  },
  {
    id: 4,
    image: "/Image4.jpg",
    title: "Digital Watch",
    price: "LKR 2,500.00",
    description: "description about digital watch",
    rating: 5,
  },
  {
    id: 5,
    image: "/Image5.jpg",
    title: "HeadPhone",
    price: "LKR 22,500.00",
    description: "description about cheadphone",
    rating: 3,
  },
  {
    id: 6,
    image: "/Image6.jpg",
    title: "JBL",
    price: "LKR 22,500.00",
    description: "description about JBL",
    rating: 5,
  },
];
const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-start mb-6 text-gray-800">
        Today's Featured Items
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-lg text-start flex flex-col items-center"
          >
           
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
              <p className="text-black-400 font-bold">{product.price}</p>
            </div>

            <p className="text-black-600 mt-2 text-left">{product.description}</p>

            <div className="flex justify-start mt-2">
              {[...Array(product.rating)].map((_, i) => (
                <span key={i} className="text-green-800  text-lg">★</span>
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
  );
};

export default Homepage;