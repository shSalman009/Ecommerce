import React from "react";
import ProductCard from "../../components/ProductCard";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetProductsQuery } from "../../features/products/productsApi";

export default function Products() {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  // content to be displayed
  const content = isLoading ? (
    <>
      {Array(12)
        .fill("")
        .map((_, i) => (
          <ColCardSkelton key={i} />
        ))}
    </>
  ) : isError ? (
    <div>{error?.data}</div>
  ) : (
    products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  );

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Just For You</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
          {content}
        </div>
      </div>
    </div>
  );
}
