import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { productsApi } from "../features/products/productsApi";

export default function Search() {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(null);

  const timeOutIdRef = useRef(null);

  const debounceHandler = (fn, delay) => {
    return function (...args) {
      if (timeOutIdRef.current) {
        clearTimeout(timeOutIdRef.current);
      }
      timeOutIdRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const dispatch = useDispatch();
  const doSearch = async (value) => {
    if (!value) return setProducts(null);
    const res = await dispatch(
      productsApi.endpoints.getProducts.initiate({
        name: value,
      })
    );
    const result = res?.data?.payload || [];
    setProducts(result);
  };

  const handleSearch = debounceHandler(doSearch, 1000);

  const inputRef = useRef(null);
  let location = useLocation();

  useEffect(() => {
    if (focused) {
      inputRef.current.blur();
      setFocused(false);
    }
  }, [location]);

  return (
    <div className="relative w-full">
      <div className="w-full">
        <div className="flex rounded-md overflow-hidden w-full">
          <input
            ref={inputRef}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            type="text"
            className="w-full rounded-r-none px-2 py-2.5 focus:outline-none bg-slate-200"
            placeholder="Search..."
          />
          <button className="bg-indigo-600 text-gray-100 px-6 text-base font-medium py-2 rounded-r-sm">
            Search
          </button>
        </div>
      </div>

      {/* Search Result */}
      {products && search && focused && (
        <div className="absolute inset-x-0 top-12 rounded-md shadow-lg bg-white max-h-96 overflow-y-scroll custom-scrollbar">
          {products?.length > 0 ? (
            products.map((product) => {
              const { id, images, name, slug, price } = product || {};

              return (
                <Link
                  to={`/products/${slug}`}
                  onMouseDown={(e) => e.preventDefault()}
                  key={id}
                  className="flex items-center hover:bg-gray-100 px-6 py-4 first:rounded-t-md last:rounded-b-md"
                >
                  <div className="w-auto">
                    <img className="h-20" src={images[0]} alt={name} />
                  </div>
                  <div className="flex flex-col items-start justify-center ml-4 flex-grow">
                    <span className="font-bold text-sm">
                      {name.length > 50 ? name.substring(0, 50) + "..." : name}
                    </span>
                    <span className="text-red-500 text-xs">{price}</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="px-6 py-4">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
