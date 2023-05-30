import React from "react";
import { useSelector } from "react-redux";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import Product from "../../components/ProductCard";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetProductsQuery } from "../../features/products/productsApi";

const filterByCategory = (products, categories) => {
  if (categories.length === 0) return products;
  return products.filter((product) => categories.includes(product.category_id));
};
const filterByBrand = (products, brands) => {
  if (brands.length === 0) return products;
  return products.filter((product) => brands.includes(product.brand));
};

const filterByPrice = (products, price) => {
  if (price.min === 0 && price.max === 0) return products;
  return products.filter(
    (product) => product.price >= price.min && product.price <= price.max
  );
};

export default function AllProducts() {
  const { categories, brands, price } = useSelector((state) => state.filter);

  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  return (
    <>
      {/* Loading... */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(15)
            .fill("")
            .map((_, i) => (
              <ColCardSkelton key={i} />
            ))}
        </div>
      )}

      {/* Error */}
      {isError && <Error message={error?.data} />}

      {/* Not Found */}
      {!isLoading && !isError && products?.length === 0 && <NotFound />}

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {!isLoading &&
          !isError &&
          products?.length &&
          filterByPrice(
            filterByCategory(filterByBrand(products, brands), categories),
            price
          ).map((product) => <Product key={product.id} product={product} />)}
      </div>
    </>
  );
}
