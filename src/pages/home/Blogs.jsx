import React from "react";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import BlogCard from "../blogs/BlogCard";

export default function Blogs() {
  const {
    data: blogs,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetBlogsQuery();

  const content = isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>{error?.data}</div>
  ) : (
    blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)
  );

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {content}
        </div>
      </div>
    </div>
  );
}
