import React, { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSort } from "../../features/filter/filterSlice";

const sortOptions = ["Default", "Lowest Price", "Highest Price"];

export default function Sort({ handleFilterExtend }) {
  const [extend, setExtend] = useState(false);

  const handleExtend = () => {
    setExtend(!extend);
  };

  const [sortValue, setSortValue] = useState("Default");

  const handleSort = (value) => {
    setSortValue(value);
    setExtend(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSort(sortValue));
  }, [sortValue, dispatch]);

  return (
    <div className="bg-white p-4 rounded-md mb-4 flex justify-between items-center">
      <div className="flex gap-4">
        <h3 className="text-lg font-semibold text-gray-900 uppercase">Sort</h3>{" "}
        <button className="lg:hidden block" onClick={handleFilterExtend}>
          <BiFilterAlt size={25} />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={handleExtend}
          className="border font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-center w-40"
          type="button"
        >
          {sortValue}
          <MdKeyboardArrowDown className="w-4 h-4 ml-2" />
        </button>

        <div
          className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute inset-x-0 ${
            extend ? "block" : "hidden"
          }`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {sortOptions.map((value, index) => (
              <li
                onClick={() => handleSort(value)}
                key={index}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
