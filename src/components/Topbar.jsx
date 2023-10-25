import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
import { useLogoutMutation } from "../features/auth/authApi";
import { useGetUserCartsQuery } from "../features/cart/CartApi";
import { useGetOrdersQuery } from "../features/order/orderApi";
import Search from "./Search";

export default function Topbar({ handleNavExtended }) {
  const [totalCarts, setTotalCarts] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  const { user } = useSelector((state) => state.auth) || {};
  const userId = user?.id;

  // get user cart items to calculate total quantity
  const { data: cartData } = useGetUserCartsQuery(userId, {
    skip: !userId,
  });
  const cartItems = cartData?.payload;
  useEffect(() => {
    if (cartItems) {
      const totalCarts = cartItems?.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setTotalCarts(totalCarts);
    }
  }, [cartItems]);

  // get user orders to calculate total order
  const { data: orderData } = useGetOrdersQuery(userId, {
    skip: !userId,
  });

  const orderItems = orderData?.payload;

  useEffect(() => {
    if (orderItems) {
      setTotalOrder(orderItems?.length);
    }
  }, [orderItems]);

  const [logout] = useLogoutMutation();

  const handleLogOut = () => {
    logout();
  };

  return (
    <nav className=" border-gray-200 bg-slate-900">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center mr-10">
          <img src={logo} className="xs:h-8 h-6 mr-2" alt="logo" />
          <span className="xs:inline-block hidden self-center xs:text-3xl text-2xl font-semibold whitespace-nowrap text-gray-100 uppercase">
            Brand
          </span>
        </Link>

        {/* Search bar */}
        <div className="w-full lg:w-[600px] order-1 lg:order-none pt-2 lg:pt-0 md:block hidden">
          <Search />
        </div>

        {/* Cart */}
        <div className="flex justify-end items-center sm:gap-4 xs:gap-2 gap-1">
          <div className="flex justify-end items-center gap-4 text-2xl text-gray-100">
            <Link to="/cart" className="relative">
              <HiOutlineShoppingCart size={25} />

              {userId ? (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-gray-100 text-xs font-medium">
                  {totalCarts}
                </span>
              ) : null}
            </Link>{" "}
            <Link to="/order" className="relative">
              <BiShoppingBag size={25} />

              {userId ? (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-gray-100 text-xs font-medium">
                  {totalOrder}
                </span>
              ) : null}
            </Link>
          </div>
          {/* User */}
          {userId ? (
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
              <FaRegUser size={20} />
              <span className="hidden sm:inline-block text-lg">Sign In</span>
            </Link>
          )}{" "}
          <button
            className="px-1 py-0.5 border rounded-md mr-2 md:hidden"
            onClick={handleNavExtended}
          >
            <GiHamburgerMenu size={20} color="white" />
          </button>
        </div>
      </div>
    </nav>
  );
}
