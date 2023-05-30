import React from "react";
import RowCardSkelton from "../../components/skelton/RowCardSkelton";
import { useGetDiscountProductsQuery } from "../../features/products/productsApi";
import DiscountProductCard from "./DiscountProductCard";

export default function DiscountProducts() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetDiscountProductsQuery();

  // content to be displayed
  const content = isLoading ? (
    <>
      <RowCardSkelton />
      <RowCardSkelton />
      <RowCardSkelton />
    </>
  ) : isError ? (
    <div>{error?.data}</div>
  ) : (
    products?.map((product) => (
      <DiscountProductCard key={product.id} product={product} />
    ))
  );

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Discount Products
          </h2>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {content}
        </div>
      </div>
    </div>
  );
}
