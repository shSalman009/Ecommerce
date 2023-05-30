import React from "react";
import Error from "../../components/Error";
import NotFound from "../../components/NotFound";
import ColCardSkelton from "../../components/skelton/ColCardSkelton";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import BlogCard from "./BlogCard";

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
      {isError && <Error message={error?.data} />}

      {/* Not Found */}
      {!isLoading && !isError && blogs?.length === 0 && <NotFound />}

      {/* blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {!isLoading &&
          !isError &&
          blogs?.length &&
          blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </>
  );
}
