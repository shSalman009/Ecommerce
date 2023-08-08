import React, { useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import { Link } from "react-router-dom";
import img from "../../assets/1.png";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import RowCardSkelton from "../../components/skelton/RowCardSkelton";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";
import { encryptData } from "../../utils/Crypto";
import { createUrlWithTitleAndId } from "../../utils/generateUrl";

export default function Category() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center px-4 py-2 bg-white rounded-lg">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Categories</h2>
            <p className="font-medium">Select Your Category</p>
          </div>
          <div className="bg-indigo-900 text-white px-4 py-2 rounded-lg flex justify-center items-center cursor-pointer">
            <Link
              to="/categories"
              className="inline-block text-sm uppercase font-medium"
            >
              Show All Categories
            </Link>
            <ImArrowRight2 className="ml-2" />
          </div>
        </div>

        {/* Categories */}

        {/* Loading... */}
        {isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <RowCardSkelton />
            <RowCardSkelton />
            <RowCardSkelton />
            <RowCardSkelton />
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="py-4">
            <Error />
          </div>
        )}

        {/* No categories found */}
        {!isLoading && !isError && categories?.length === 0 && (
          <NotFound message="No categories found!" />
        )}

        {/* Content */}
        {!isLoading && !isError && categories?.length && (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {categories?.map((category) => {
              const { name, id } = category;

              return (
                <Link
                  key={category.id}
                  to={`category/${createUrlWithTitleAndId(
                    name,
                    encryptData(id)
                  )}`}
                  state={{ id: category.id }}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
                >
                  <img
                    className="object-cover rounded-t-lg h-auto w-1/2 md:rounded-none md:rounded-l-lg"
                    style={{ display: imageLoaded ? "block" : "none" }}
                    src={category.image ? category.image : img}
                    onLoad={() => setImageLoaded(true)}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 sm:text-2xl text-lg font-bold tracking-tight text-gray-800">
                      {category.name}
                    </h5>
                    <p className="sm:inline-block hidden mb-3 font-normal text-gray-700">
                      Here is the description of the category
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
