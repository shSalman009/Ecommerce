import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  const lastPath = location.pathname.split("/").pop();

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      let name = "";

      if (lastPath === crumb) {
        const originalPath = crumb.split("_").shift();
        name = originalPath
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }
      // console.log(crumb);

      return (
        <li key={crumb}>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <Link
              to={currentLink}
              className={`ml-1 text-sm font-medium md:ml-2${
                crumb === lastPath
                  ? "text-gray-400 pointer-events-none"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {lastPath === crumb ? name : crumb}
            </Link>
          </div>
        </li>
      );
    });

  return (
    <div className={`bg-white ${crumbs?.length ? "block" : "hidden"}`}>
      <div className="container mx-auto flex p-4">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 p-4 w-full rounded-lg">
          {crumbs?.length && (
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
          )}
          {crumbs}
        </ol>
      </div>
    </div>
  );
}
