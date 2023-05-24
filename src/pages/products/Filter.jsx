import React from "react";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";
import {
  addCategories,
  removeCategories,
} from "../../features/filter/filterSlice";

export default function Filter() {
  const { data: categories, isLoading, isSuccess } = useGetCategoriesQuery();

  const dispatch = useDispatch();

  const selectCategory = (event, id) => {
    if (event.target.checked) {
      dispatch(addCategories(id));
    } else {
      dispatch(removeCategories(id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg mb-4 font-semibold text-gray-900 uppercase">
          Category
        </h3>
        <div className="mt-2">
          {isSuccess &&
            categories?.length &&
            categories.map((category) => (
              <div key={category.id} className="flex items-start my-2">
                <input
                  onChange={(event) => selectCategory(event, category.id)}
                  id={category.name}
                  type="checkbox"
                  value=""
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
      </div>

      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg mb-4 font-semibold text-gray-900 uppercase">
          Brands
        </h3>
        <div className="mt-2">
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md">
        <h3 className="text-lg mb-4 font-semibold text-gray-900 uppercase">
          Price
        </h3>
        <div className="mt-2">
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-gray-800">
              Checkbox
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
