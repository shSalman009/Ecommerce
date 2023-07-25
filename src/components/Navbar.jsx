import React from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const navLinks = ["Home", "Products", "Blogs", "Contact"];

export default function Navbar({ extend }) {
  const location = useLocation();
  // get first part of the url
  const path = location.pathname.split("/")[1];

  return (
    <div
      className={`bg-slate-700 md:static fixed top-[68px] inset-x-0 ${
        extend ? "block" : "md:block hidden"
      }`}
    >
      <div className="container mx-auto px-4 flex md:flex-row flex-col justify-start items-center">
        {/* Nav */}
        <div className="md:w-auto w-full">
          <ul className="font-medium flex md:items-center items-start px-0 md:py-0 py-4  md:flex-row flex-col mt-0 h-full">
            {navLinks.map((link) => {
              const isHome = path === "";
              const to = link === "Home" ? "/" : `/${link.toLowerCase()}`;

              const bg =
                path === link.toLowerCase() || (isHome && link === "Home")
                  ? "bg-slate-900"
                  : "";

              return (
                <li
                  key={link}
                  className="md:w-auto w-full md:border-none border-b border-spacing-1 border-slate-500"
                >
                  <Link
                    to={to}
                    className={`block py-2 px-6 text-gray-100 transition-all rounded-sm ${bg}`}
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Searchbar */}
        <div className="md:hidden w-full">
          <Search />
        </div>

        <Link className="md:ml-auto ml-0 md:mr-0 mr-auto">
          <span className="float-left inline-block cursor-pointer rounded-md md:my-0 my-2 md:py-1 py-2 md:px-2 px-4 font-medium text-slate-100 md:bg-transparent bg-indigo-600">
            Becoma a seller
          </span>
        </Link>
      </div>
    </div>
  );
}
