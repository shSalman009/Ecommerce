import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const { id, title, content, image, created_at } = blog || {};
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img className="rounded-t-lg h-40 object-cover" src={image} alt="" />
      </div>
      <div className="p-5">
        <Link to={`/blogs/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title.length > 45 ? title.slice(0, 45) + "..." : title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {content.length > 120 ? content.slice(0, 120) + "..." : content}
        </p>
        <Link
          to={`/blogs/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <BsArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}
