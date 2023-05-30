import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrice } from "../../../features/filter/filterSlice";

// list of price ranges
const priceRanges = [
  {
    id: 1,
    value: { min: 0, max: 100 },
    name: "Under $100",
  },
  {
    id: 2,
    value: { min: 100, max: 500 },
    name: "$100 to $500",
  },
  {
    id: 3,
    value: { min: 500, max: 1000 },
    name: "$500 to $1000",
  },
  {
    id: 4,
    value: { min: 1000, max: 2000 },
    name: "$1000 to $2000",
  },
  {
    id: 5,
    value: { min: 2000, max: 5000 },
    name: "$2000 to $5000",
  },
  {
    id: 6,
    value: { min: 5000, max: 100000 },
    name: "Above $5000",
  },
];
export default function PriceFilter() {
  const { price: filterPeice } = useSelector((state) => state.filter);

  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();
  const handlePriceRange = (id, value) => {
    // value should be an object with min and max properties

    if (selected === id) {
      dispatch(setPrice({ min: 0, max: 0 }));
    } else {
      dispatch(setPrice(value));
    }
  };

  useEffect(() => {
    priceRanges.map((price) => {
      if (
        price.value.min === filterPeice.min &&
        price.value.max === filterPeice.max
      ) {
        setSelected(price.id);
      } else if (filterPeice.min === 0 && filterPeice.max === 0) {
        setSelected(null);
      }
    });
  }, [filterPeice]);

  return (
    <div className="mt-2 mb-4 flex gap-2 flex-wrap">
      {priceRanges.map((price) => (
        <button
          key={price.id}
          onClick={() => handlePriceRange(price?.id, price?.value)}
          type="button"
          className={`flex-grow py-2 px-4 text-sm font-medium focus:outline-none rounded-lg border  focus:z-10 ${
            selected === price?.id
              ? "bg-blue-700 text-white border-transparent hover:bg-blue-800"
              : "bg-white text-gray-900 dark:bg-gray-800 border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          }`}
        >
          {price?.name}
        </button>
      ))}
    </div>
  );
}
