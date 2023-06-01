import React from "react";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import ProductCard from "../../components/ProductCard";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetProductsQuery } from "../../features/products/productsApi";

export default function Products() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Just For You</h2>
        </div>

        {/* Loading... */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
            {Array(12)
              .fill("")
              .map((_, i) => (
                <ColCardSkelton key={i} />
              ))}
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

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
          {!isLoading &&
            !isError &&
            products?.length &&
            products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
