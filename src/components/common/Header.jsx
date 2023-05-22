import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdLogout, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";
import { loggedOut } from "../../features/auth/authSlice";
import { useGetUserCartsQuery } from "../../features/cart/CartApi";

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
            <img src={logo} className="h-8 mr-3" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-100">
              Brand.
            </span>
          </Link>

          {/* Search bar */}
          <form>
            <div className="w-96">
              <div className="flex rounded-sm overflow-hidden w-full">
                <input
                  type="text"
                  className="w-full rounded-sm rounded-r-none p-2"
                  placeholder="Search..."
                />
                <button className="bg-indigo-600 text-gray-100 px-6 text-sm font-medium py-2 rounded-r-sm">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Add Products */}
        <div className="flex justify-end items-center gap-8 divide-x">
          <div className="flex justify-end items-center gap-4 text-2xl text-gray-100">
            <div>
              <MdOutlineFavoriteBorder size={30} />
            </div>

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
            <div className="px-4 text-sm font-medium tracking-tighter text-gray-100 flex gap-2 items-center">
              <FaRegUser size={25} />
              <div className="flex flex-col">
                <Link
                  to="/login"
                  className="hover:underline hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:underline hover:text-blue-600"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
