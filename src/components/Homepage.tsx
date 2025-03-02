"use client";
import React from "react";
import Featuredproducts from "./FeaturedProducts";
import BestSellingProducts from "./BestSellingProducts";
import TodaysDeals from "./TodaysDeals";

const Homepage = () => {
  return (
    <div>
      <Featuredproducts />
      <BestSellingProducts />
      <TodaysDeals />
    </div>
  );
};

export default Homepage;
