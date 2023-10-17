import React from "react";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import BlogCard from "./BlogCard";

export default function Blogs() {
  const { data, isLoading, isError, error, isSuccess } = useGetBlogsQuery();
  const blogs = data?.payload;

  return (
    <>
      {/* Loading... */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {Array(8)
            .fill("")
            .map((_, i) => (
              <ColCardSkelton key={i} />
            ))}
        </div>
      )}

      {/* Error */}
      {isError && <Error message={error?.data?.message} />}

      {/* Not Found */}
      {!isLoading && !isError && blogs?.length === 0 && (
        <NotFound message="Blogs Not Found" />
      )}

      {/* blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {!isLoading &&
          !isError &&
          blogs?.length > 0 &&
          blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </>
  );
}
