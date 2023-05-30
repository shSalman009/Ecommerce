import React from "react";

export default function NotFount({ text = "No data found" }) {
  return (
    <div className="w-full text-center">
      <h2 className="text-5xl my-10 font-medium text-gray-500 capitalize">
        {text}
      </h2>
    </div>
  );
}
