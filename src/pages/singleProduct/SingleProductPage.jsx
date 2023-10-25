import React from "react";
import { useParams } from "react-router-dom";

import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { useGetProductQuery } from "../../features/products/productsApi";
import Carousel from "./Carousel";
import FeaturesAndSpecifications from "./FeaturesAndSpecifications";
import ProductDetails from "./ProductDetails";

export default function SingleProductPage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useGetProductQuery(slug);
  const product = data?.payload;

  const { images } = product || {};

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isError && <Error message={error?.data?.message} />}

      {!isLoading && !isError && product?.id && (
        <div className="text-gray-600 body-font overflow-hidden">
          <div className="custom-container">
            <div className="lg:w-4/5 w-full mx-auto justify-center items-center flex flex-wrap pb-20">
              <Carousel images={images} />
              <ProductDetails product={product} />
            </div>
            <div className="w-full flex">
              <FeaturesAndSpecifications product={product} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
