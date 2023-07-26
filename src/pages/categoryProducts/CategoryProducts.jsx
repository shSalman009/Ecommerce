import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import ProductCard from "../../components/ProductCard";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetProductsByCategoryQuery } from "../../features/products/productsApi";

export default function CategoryProducts() {
  const { category } = useParams();
  // Extract the category name and ID from the URL
  const [categoryName, encodedId] = category.split("_");
  const categoryId = Number(atob(encodedId));

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsByCategoryQuery(categoryId);

  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-10">
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
          {isError && <Error message={error?.data} />}

          {/* Not Found */}
          {!isLoading && !isError && products?.length === 0 && <NotFound />}

          {/* Content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {!isLoading &&
              !isError &&
              products?.length &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
