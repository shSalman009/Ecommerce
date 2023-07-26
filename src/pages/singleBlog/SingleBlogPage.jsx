import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlogQuery } from "../../features/blog/blogApi";

export default function SingleBlogPage() {
  const { blogId } = useParams();

  const { data: blog, isLoading, isError, error } = useGetBlogQuery(blogId);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div>{error?.data}</div>}

      {!isLoading && !isError && blog?.id && (
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {blog?.title}
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            {new Date(blog?.created_at).toLocaleDateString()}
          </p>
          <img
            className="rounded-md w-full mb-6"
            src={blog?.image}
            alt={blog?.title}
          />
          <p className="text-gray-700 text-lg mt-4">{blog?.content}</p>
        </div>
      )}
    </>
  );
}
