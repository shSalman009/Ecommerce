import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { useGetProductsByCategoryQuery } from "../features/products/productsApi";

export default function SingleCategoryProducts() {
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

  const content = isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>{error?.data}</div>
  ) : products?.length ? (
    products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  ) : (
    <div>Products Not Found</div>
  );

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {content}
        </div>
      </div>
    </div>
  );
}
