import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import { loggedOut } from "../features/auth/authSlice";
import { useGetUserCartsQuery } from "../features/cart/CartApi";
import Search from "./Search";

export default function Header() {
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
        <div className="flex justify-start gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-10">
            <img src={logo} className="h-8 mr-2" alt="logo" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-gray-100 uppercase">
              Brand
            </span>
          </Link>

          {/* Search bar */}
          <Search />
        </div>

        {/* Add Products */}
        <div className="flex justify-end items-center gap-8 divide-x">
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
              className="px-4 text-sm font-medium tracking-tighter text-gray-100 flex gap-2 items-center"
            >
              <FaRegUser size={25} />
              <span className="inline-block text-lg">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
