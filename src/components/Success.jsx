import React from "react";

export default function Success({ message = "Success!" }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 m-20 rounded relative mx-auto text-center">
      <strong className="font-bold">Success!</strong>{" "}
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
