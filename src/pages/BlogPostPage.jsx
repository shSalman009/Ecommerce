import React from "react";

export default function BlogPostPage() {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Title</h2>
        <img
          className="rounded-md w-full mb-0"
          src="https://picsum.photos/800/400"
          alt=""
        />
        <p className="text-gray-700 text-lg mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quae
          quod, voluptas, quia, voluptate quibusdam voluptates quidem quos quas
          quod, voluptatum quas. Quisquam quae quod, voluptas, quia, voluptate
          quibusdam voluptates quidem quos quas quod, voluptatum quas.
        </p>
      </div>
    </div>
  );
}
