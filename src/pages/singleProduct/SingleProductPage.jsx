import React from "react";
import { useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/products/productsApi";
import About from "./About";
import Carousel from "./Carousel";
import Description from "./Description";

export default function SingleProductPage() {
  const { slug } = useParams();

  // Extract the product name and ID from the URL
  const [productName, encodedId] = slug.split("_");
  const productId = Number(atob(encodedId));

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductQuery(productId);

  const { name, price, description, image_urls, specifications } =
    product || {};

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div>{error?.data}</div>}

      {!isLoading && !isError && product?.id && (
        <div className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap pb-20">
              <Carousel image_urls={image_urls} />
              <Description product={product} />
            </div>
            <div className="w-full flex">
              <About product={product} />
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
