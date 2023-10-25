import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import ProductCard from "../../components/ProductCard";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetCategoryProductsQuery } from "../../features/products/productsApi";

export default function CategoryProducts() {
  const { category } = useParams();

  const { data, isLoading, isError, error } =
    useGetCategoryProductsQuery(category);

  const products = data?.payload;

  return (
    <>
      <div>
        <div className="custom-container">
          {/* Loading... */}
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
              <ColCardSkelton />
            </div>
          )}

          {/* Error */}
          {isError && <Error message={error?.data?.message} />}

          {/* Not Found */}
          {!isLoading && !isError && products?.length === 0 && (
            <NotFound message="Products Not Found in this Category" />
          )}

          {/* Content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {!isLoading &&
              !isError &&
              products?.length > 0 &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
