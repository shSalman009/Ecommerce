import React from "react";
import Filter from "../components/products/Filter";
import Products from "../components/products/Products";
import Sort from "../components/products/Sort";

export default function ProductPage() {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10 flex gap-4">
        <div className="w-2/12">
          <Filter />
        </div>
        <div className="w-10/12">
          <Sort />
          <Products />
        </div>
      </div>
    </div>
  );
}
