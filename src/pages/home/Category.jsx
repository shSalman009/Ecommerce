import React, { useState } from "react";
import { ImArrowRight2 } from "react-icons/im";
import { Link } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import RowCardSkelton from "../../components/skelton/RowCardSkelton";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";

export default function Category() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const categories = data?.payload;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div>
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
          <Error message={error?.data?.message} />
        </div>
      )}

      {/* No categories found */}
      {!isLoading && !isError && categories?.length === 0 && (
        <NotFound message="No categories found!" />
      )}

      {/* Content */}
      {!isLoading && !isError && categories?.length ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
