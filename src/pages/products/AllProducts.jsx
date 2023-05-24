import React from "react";
import { useSelector } from "react-redux";
import Product from "../../components/ProductCard";
import { useGetProductsQuery } from "../../features/products/productsApi";

const filterByCategory = (products, categories) => {
  return products.filter((product) => categories.includes(product.category_id));
};

export default function AllProducts() {
  const { categories } = useSelector((state) => state.filter);

  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  // content to be displayed
  const content = isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>{error?.data}</div>
  ) : products?.length && categories?.length ? (
    filterByCategory(products, categories).map((product) => (
      <Product key={product.id} product={product} />
    ))
  ) : (
    products?.length &&
    products.map((product) => <Product key={product.id} product={product} />)
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {content}
      {content?.length === 0 && <div>No products found</div>}
    </div>
  );
}
