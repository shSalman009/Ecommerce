import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";

export default function Sort({ handleFilterExtend }) {
  const [extend, setExtend] = useState(false);

  const handleExtend = () => {
    setExtend(!extend);
  };

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
          className="border font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Dropdown button
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
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
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
