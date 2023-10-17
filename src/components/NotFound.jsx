import React from "react";

export default function NotFound({ message = "Data Not Found" }) {
  return (
    <div className="w-full text-center">
      <h2 className="text-5xl my-20 font-medium text-gray-500 capitalize">
        {message}
      </h2>
    </div>
  );
}
