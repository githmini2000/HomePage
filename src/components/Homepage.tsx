"use client";
import React from "react";
import FeaturedProducts from "./FeaturedProducts";
import BestSellingProducts from "./BestSellingProducts";
import TodaysDeals from "./TodaysDeals";

const Homepage = () => {
  return (
    <div>
      <FeaturedProducts />
      <BestSellingProducts />
      <TodaysDeals />
    </div>
  );
};

export default Homepage;
