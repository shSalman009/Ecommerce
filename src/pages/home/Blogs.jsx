import React from "react";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import BlogCard from "../blogs/BlogCard";

export default function Blogs() {
  const { data: blogs, isLoading, isError, isSuccess } = useGetBlogsQuery();

  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
        </div>

        {/* Loading... */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <ColCardSkelton />
            <ColCardSkelton />
            <ColCardSkelton />
            <ColCardSkelton />
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="py-4">
            <Error />
          </div>
        )}

        {/* No blogs found */}
        {!isLoading && !isError && blogs?.length === 0 && (
          <NotFound message="No blogs found!" />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {!isLoading &&
            !isError &&
            isSuccess &&
            blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      </div>
    </div>
  );
}
