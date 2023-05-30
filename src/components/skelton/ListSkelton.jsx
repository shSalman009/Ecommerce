import React from "react";

export default function ListSkelton() {
  return (
    <div
      role="status"
      className="max-w-sm h-60 animate-pulse flex flex-col justify-evenly"
    >
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <div className="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-full"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
