import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSkelton from "../../../components/skelton/ListSkelton";
import { useGetCategoriesQuery } from "../../../features/category/categoryApi";
import {
  addCategory,
  removeCategory,
} from "../../../features/filter/filterSlice";

export default function CategoriesFilter() {
  // Get categories
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const categories = data?.payload;

  const { categories: filterCategories } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const selectCategory = (event, id) => {
    if (event.target.checked) {
      dispatch(addCategory(id));
    } else {
      dispatch(removeCategory(id));
    }
  };

  return (
    <>
      {isLoading && (
        <div>
          <ListSkelton />
        </div>
      )}
      {!isLoading && isError && <div>{error?.data}</div>}
      {!isLoading && !isError && categories?.length === 0 && (
        <h4 className="text-sm font-medium mb-2">There is no Category</h4>
      )}
      {!isLoading && !isError && categories?.length > 0 && (
        <div className="mt-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-start my-2">
              <input
                onChange={(event) => selectCategory(event, category.id)}
                id={category.name}
                type="checkbox"
                checked={filterCategories.includes(category.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded mt-1"
              />
              <label
                htmlFor={category.name}
                className="ml-2 text-gray-700 leading-5 select-none"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
