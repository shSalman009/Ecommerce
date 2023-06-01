import React from "react";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import RowCardSkelton from "../../components/skelton/RowCardSkelton";
import { useGetDiscountProductsQuery } from "../../features/products/productsApi";
import DiscountProductCard from "./DiscountProductCard";

export default function DiscountProducts() {
  const { data: products, isLoading, isError } = useGetDiscountProductsQuery();

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Discount Products
          </h2>
        </div>

        {/* Loading... */}
        {isLoading && (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <RowCardSkelton />
            <RowCardSkelton />
            <RowCardSkelton />
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="py-4">
            <Error />
          </div>
        )}

        {/* No products found */}
        {!isLoading && !isError && products?.length === 0 && (
          <NotFound message="No products found!" />
        )}

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {!isLoading &&
            !isError &&
            products?.length &&
            products?.map((product) => (
              <DiscountProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
