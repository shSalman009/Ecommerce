import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSkelton from "../../../components/skelton/ListSkelton";
import { useGetBrandsQuery } from "../../../features/brand/brandApi";
import { addBrand, removeBrand } from "../../../features/filter/filterSlice";

export default function BrandsFilter() {
  // Get brands
  const { data, isLoading, isError, error } = useGetBrandsQuery();
  const brands = data?.payload;

  const { brands: filterBrands } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const selectBrand = (event, brand) => {
    if (event.target.checked) {
      dispatch(addBrand(brand));
    } else {
      dispatch(removeBrand(brand));
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
      {!isLoading && !isError && brands?.length === 0 && (
        <h4 className="text-sm font-medium mb-2">There is no Brand</h4>
      )}
      {!isLoading && !isError && brands?.length > 0 && (
        <div className="mt-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-start my-2">
              <input
                onChange={(event) => selectBrand(event, brand.name)}
                id={brand.name}
                type="checkbox"
                checked={filterBrands.includes(brand.name)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded mt-1"
              />
              <label
                htmlFor={brand.name}
                className="ml-2 text-gray-700 leading-5 select-none"
              >
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
