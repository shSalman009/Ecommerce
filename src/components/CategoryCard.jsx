import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const { slug, name, image } = category;
  return (
    <Link
      to={`/category/${slug}`}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow xl:flex-row hover:bg-gray-100"
    >
      <img
        className="object-cover rounded-t-lg h-auto w-1/2 md:rounded-none md:rounded-l-lg"
        src={image}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h4 className="title-one">{name}</h4>
        <p className="mb-3 font-normal text-gray-700">
          Here are the biggest enterprise technology acquisitions of 2021
        </p>
      </div>
    </Link>
  );
}
