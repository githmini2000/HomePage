import Image from "next/image";
import React from "react";
import { FaHeart } from "react-icons/fa";

interface ProductCardProps {
  product: {
    id: number;
    image: string;
    title: string;
    price: number;
    description: string;
    rating: number;
  };

  showDiscount?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDiscount = false,
}) => {
  const discount = 0.1;
  const discountPrice = (product.price * (1 - discount)).toFixed(2);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-start flex flex-col items-center relative">
      <FaHeart
        onClick={() => {}}
        className="absolute top-2 right-2 cursor-pointer fill-white stroke-black"
        size={30}
        strokeWidth={25}
      />
      <div className="w-full h-48 relative">
        <Image
            src={`http://localhost:8080${product.image}`}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <div className="mt-4 w-full flex justify-between border-b border-gray-300 pb-2">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <div className="flex flex-col items-end">
          {showDiscount && (
            <>
              <span className="text-gray-500 line-through text-sm">
                LKR {product.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-bold">
                LKR {discountPrice}
              </span>
            </>
          )}
          {!showDiscount && (
            <span className="text-black font-bold">
              LKR {product.price.toFixed(2)}
            </span>
          )}
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
};

export default ProductCard;
