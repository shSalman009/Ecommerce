import React from "react";
import { useSelector } from "react-redux";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import Product from "../../components/ProductCard";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetProductsQuery } from "../../features/products/productsApi";

const filterProducts = (products, filters) => {
  return filters.reduce((filteredProducts, filter) => {
    return filter(filteredProducts);
  }, products);
};

const filterByCategory = (categories) => (products) => {
  return categories.length === 0
    ? products
    : products.filter((product) => categories.includes(product.category));
};

const filterByBrand = (brands) => (products) => {
  return brands.length === 0
    ? products
    : products.filter((product) =>
        brands
          .map((brand) => brand.toLowerCase())
          .includes(product.brand.toLowerCase())
      );
};

const filterByPrice = (priceRange) => (products) => {
  return priceRange.min === 0 && priceRange.max === 0
    ? products
    : products.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      );
};

// sort by price
const sortByPrice = (sort) => (products) => {
  switch (sort) {
    case "Lowest Price":
      return [...products].sort((a, b) => a.price - b.price);
    case "Highest Price":
      return [...products].sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};

export default function AllProducts() {
  const { categories, brands, price, sort } = useSelector(
    (state) => state.filter
  );

  const { data, isLoading, isError, error } = useGetProductsQuery();

  const products = data?.payload;

  const filteredProducts = filterProducts(products, [
    filterByCategory(categories),
    filterByBrand(brands),
    filterByPrice(price),
    sortByPrice(sort),
  ]);

  return (
    <>
      {/* Loading... */}
      {isLoading && (
        <div className="grid sm:place-items-stretch grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {Array(15)
            .fill("")
            .map((_, i) => (
              <ColCardSkelton key={i} />
            ))}
        </div>
      )}

      {/* Error */}
      {isError && <Error message={error?.data?.message} />}

      {/* Not Found */}
      {!isLoading && !isError && products?.length === 0 && (
        <NotFound message="Products Not Found" />
      )}

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {!isLoading &&
          !isError &&
          products?.length > 0 &&
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </>
  );
}
