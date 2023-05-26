import React from "react";
import Blogs from "./Blogs";
import Category from "./Category";
import DiscountProducts from "./DiscountProducts";
import Hero from "./Hero";
import Products from "./Products";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Category />
      <Products />
      <DiscountProducts />
      <Blogs />
    </div>
  );
}
