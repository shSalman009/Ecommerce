import React from "react";

export default function Error({ message = "Something went wrong!" }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-20 rounded relative mx-auto text-center">
      <strong className="font-bold">Error!</strong>{" "}
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
