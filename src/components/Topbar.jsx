import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import { loggedOut } from "../features/auth/authSlice";
import { useGetUserCartsQuery } from "../features/cart/CartApi";
import Search from "./Search";

export default function Topbar({ handleNavExtended }) {
  const [quantity, setQuantity] = useState(0);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // get user cart items to calculate total quantity
  const { data: cartItems } = useGetUserCartsQuery(auth?.user?.id);
  useEffect(() => {
    if (cartItems) {
      const totalQuantity = cartItems?.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setQuantity(totalQuantity);
    }
  }, [cartItems]);

  // user logout
  const handleLogOut = () => {
    localStorage.removeItem("auth");
    dispatch(loggedOut());
  };

  return (
    <nav className=" border-gray-200 bg-slate-900">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-10">
          <img src={logo} className="h-8 mr-2" alt="logo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap text-gray-100 uppercase">
            Brand
          </span>
        </Link>

        {/* Search bar */}
        <div className="w-full lg:w-[600px] order-1 lg:order-none pt-2 lg:pt-0 md:block hidden">
          <Search />
        </div>

        {/* Add Products */}
        <div className="flex justify-end items-center sm:gap-4 xs:gap-3 gap-2">
          <div className="flex justify-end items-center gap-4 text-2xl text-gray-100">
            <Link to="/cart" className="relative">
              <HiOutlineShoppingCart size={30} />

              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-gray-100 text-xs font-medium">
                {quantity}
              </span>
            </Link>
          </div>
          {/* User */}
          {auth?.user ? (
            <div className="px-4 text-sm text-gray-100">
              <MdLogout
                size={25}
                className="cursor-pointer"
                onClick={handleLogOut}
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 text-sm font-medium tracking-tighter text-gray-100 flex sm:gap-2 items-center"
            >
              <FaRegUser size={25} />
              <span className="hidden sm:inline-block text-lg">Sign In</span>
            </Link>
          )}{" "}
          <button
            className="px-1 py-0.5 border rounded-md mr-2 md:hidden"
            onClick={handleNavExtended}
          >
            <GiHamburgerMenu size={25} color="white" />
          </button>
        </div>
      </div>
    </nav>
  );
}