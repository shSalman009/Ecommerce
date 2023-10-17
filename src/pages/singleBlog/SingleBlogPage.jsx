import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useGetBlogQuery } from "../../features/blog/blogApi";

export default function SingleBlogPage() {
  const { blogId } = useParams();

  const { data, isLoading, isError, error } = useGetBlogQuery(blogId);
  const blog = data?.payload;
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && isError && <div>{error?.data?.message}</div>}

      {!isLoading && !isError && blog?.id && (
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {blog?.title}
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            {new Date(blog?.createdAt).toLocaleDateString()}
          </p>
          <img
            className="rounded-md w-full mb-6"
            src={blog?.image}
            alt={blog?.title}
          />
          <p className="text-gray-700 text-lg mt-4">{blog?.description}</p>
        </div>
      )}
    </>
  );
}
