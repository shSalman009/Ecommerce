import React from "react";
import Category from "./Category";
import DiscountProducts from "./DiscountProducts";
import Hero from "./Hero";
import News from "./News";
import Products from "./Products";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Category />
      <Products />
      <DiscountProducts />
      <News />
    </div>
  );
}
