import React from "react";
import Blog from "./Blog";

export default function Blogs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Blog key={item} />
      ))}
    </div>
  );
}
