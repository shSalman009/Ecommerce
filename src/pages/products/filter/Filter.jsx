import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import BrandsFilter from "./BrandsFilter";
import CategoriesFilter from "./CategoriesFilter";
import PriceFilter from "./PriceFilter";

export default function Filter() {
  const [extendedCategories, setExtendedCategories] = useState(true);
  const [extendedBrands, setExtendedBrands] = useState(true);
  const [extendedPrice, setExtendedPrice] = useState(true);

  return (
    <div className="space-y-4 w-full">
      {/* Categories */}
      <div className="bg-white rounded-md">
        <h3 className="text-lg pt-4 px-4 mb-4 font-semibold text-gray-900 uppercase flex justify-between items-center select-none">
          Category
          <button
            onClick={() => setExtendedCategories(!extendedCategories)}
            className="inline-block cursor-pointer"
          >
            {extendedCategories ? <FiMinus size={25} /> : <FiPlus size={25} />}
          </button>
        </h3>
        <div
          className={`px-4 mb-4
        ${
          extendedCategories
            ? "max-h-60 overflow-y-scroll custom-scrollbar"
            : "max-h-0 overflow-hidden"
        }
        `}
        >
          <CategoriesFilter />
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-md">
        <h3 className="text-lg pt-4 px-4 mb-4 font-semibold text-gray-900 uppercase flex justify-between items-center select-none">
          Brands
          <button
            onClick={() => setExtendedBrands(!extendedBrands)}
            className="inline-block cursor-pointer"
          >
            {extendedBrands ? <FiMinus size={25} /> : <FiPlus size={25} />}
          </button>
        </h3>
        <div
          className={`px-4 mb-4
        ${
          extendedBrands
            ? "max-h-60 overflow-y-scroll custom-scrollbar"
            : "max-h-0 overflow-hidden"
        }
        `}
        >
          <BrandsFilter />
        </div>
      </div>

      {/* Price */}
      <div className="bg-white rounded-md">
        <h3 className="text-lg pt-4 px-4 mb-4 font-semibold text-gray-900 uppercase flex justify-between items-center select-none">
          Price
          <button
            onClick={() => setExtendedPrice(!extendedPrice)}
            className="inline-block cursor-pointer"
          >
            {extendedPrice ? <FiMinus size={25} /> : <FiPlus size={25} />}
          </button>
        </h3>
        <div
          className={`px-4
        ${
          extendedPrice
            ? "max-h-60 overflow-y-scroll custom-scrollbar"
            : "max-h-0 overflow-hidden"
        }
        `}
        >
          <PriceFilter />
        </div>
      </div>
    </div>
  );
}
