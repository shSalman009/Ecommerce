import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdHome } from "react-icons/md";
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
      return (
        <li key={crumb}>
          <div className="flex items-center">
            <IoIosArrowForward className="w-4 h-4 text-gray-400" />

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
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <MdHome className="w-4 h-4 mr-2" />
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
