import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const { id, title, content, image, created_at } = blog || {};
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img
          className="rounded-t-lg h-40 object-cover"
          style={{ display: imageLoaded ? "block" : "none" }}
          src={image}
          onLoad={() => setImageLoaded(true)}
          alt=""
        />
        {!imageLoaded && (
          <div className="animate-pulse">
            <div className="flex items-center justify-center h-48 bg-gray-300 rounded-t dark:bg-gray-700">
              <svg
                className="w-12 h-12 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
          </div>
        )}
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
