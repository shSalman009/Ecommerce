import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const navLinks = ["Home", "Products", "Blogs", "Contact"];

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const location = useLocation();
  // get first part of the url
  const path = location.pathname.split("/")[1];

  return (
    <div className="bg-slate-700">
      <div className="container mx-auto px-4 flex justify-start items-center">
        {/* Dropdown */}
        <div className="border-r border-slate-600 relative">
          <button
            onClick={toggleDropdown}
            className="font-medium rounded-sm text-sm px-4 py-2.5 text-center inline-flex items-center text-slate-100 bg-transparent uppercase"
            type="button"
          >
            Dropdown button <IoIosArrowDown className="ml-10" />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className={`absolute inset-x-0 z-10 bg-white divide-y divide-gray-100 rounded-sm shadow w-full ${
              dropdown ? "block" : "hidden"
            }`}
          >
            <ul
              className="py-2 text-sm text-gray-700 "
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Earnings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Nav */}
        <div className="w-auto">
          <ul className="font-medium flex items-center p-4 md:p-0 mt-4 flex-row md:mt-0 h-full">
            {navLinks.map((link) => {
              const isHome = path === "";
              const to = link === "Home" ? "/" : `/${link.toLowerCase()}`;

              const bg =
                path === link.toLowerCase() || (isHome && link === "Home")
                  ? "bg-slate-900"
                  : "";

              return (
                <li key={link}>
                  <Link
                    to={to}
                    className={`block py-2 px-6 text-gray-100 transition-all ${bg}`}
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Link className="ml-auto">
          <span className="cursor-pointer rounded-sm py-1 px-2 font-medium text-slate-100">
            Becoma a seller
          </span>
        </Link>
      </div>
    </div>
  );
}
