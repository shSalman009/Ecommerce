import React, { useState } from "react";
import { BsImageAlt } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { id, title, description, image } = blog || {};
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
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
            <div className="flex items-center justify-center h-48 bg-gray-300 rounded-t">
              <BsImageAlt size={50} className="text-gray-200" />
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <Link to={`/blogs/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title.length > 45 ? title.slice(0, 45) + "..." : title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">
          {description.length > 120
            ? description.slice(0, 120) + "..."
            : description}
        </p>
        <Link to={`/blogs/${id}`} className="button-two text-sm">
          Read more
        </Link>
      </div>
    </div>
  );
}
