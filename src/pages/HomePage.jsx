import React from "react";
import Category from "../components/home/Category";
import DiscountProducts from "../components/home/DiscountProducts";
import Hero from "../components/home/Hero";
import News from "../components/home/News";
import Products from "../components/home/Products";

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
