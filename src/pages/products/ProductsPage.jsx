import React from "react";
import AllProducts from "./AllProducts";
import Sort from "./Sort";
import Filter from "./filter/Filter";

export default function ProductsPage() {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10 flex gap-4">
        <div className="w-2/12">
          <Filter />
        </div>
        <div className="w-10/12">
          <Sort />
          <AllProducts />
        </div>
      </div>
    </div>
  );
}
