import React from "react";
import { useParams } from "react-router-dom";

import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { useGetProductQuery } from "../../features/products/productsApi";
import About from "./About";
import Carousel from "./Carousel";
import Description from "./Description";

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
          <div className="container px-5 pb-24 mx-auto">
            <div className="lg:w-4/5 w-full mx-auto justify-center items-center flex flex-wrap pb-20">
              <Carousel images={images} />
              <Description product={product} />
            </div>
            <div className="w-full flex">
              <About product={product} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
