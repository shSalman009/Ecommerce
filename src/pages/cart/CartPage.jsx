import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import { useGetUserCartsQuery } from "../../features/cart/CartApi";
import CartItem from "./CartItem";
import CartSummery from "./CartSummery";

export default function CartPage() {
  // get user from redux store
  const { auth } = useSelector((state) => state) || {};

  // get user cart products from api
  const { data, isLoading, isError, error, isSuccess } = useGetUserCartsQuery(
    auth?.user?.id
  );
  const cartItems = data?.payload;

  const [totalCartItems, setTotalCartItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // calculate total products quantity and total price
  useEffect(() => {
    if (cartItems) {
      const total = cartItems?.reduce((acc, item) => acc + item.quantity, 0);
      const price = cartItems?.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );
      setTotalPrice(price);
      setTotalCartItems(total);
    }
  }, [cartItems]);

  // data to be displayed
  const content = isLoading ? (
    <Loading />
  ) : isError ? (
    <Error message={error?.data?.message || "Something went wrong"} />
  ) : cartItems?.length > 0 ? (
    cartItems?.map((item) => <CartItem key={item.id} item={item} />)
  ) : (
    <NotFound message="Product Not Added in Cart" />
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex xl:flex-row flex-col">
        <div className="xl:w-3/4 w-full bg-white py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{totalCartItems} Items</h2>
          </div>
          <div className="sm:flex hidden mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {content}

          <Link
            to={-1}
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
        {isSuccess && <CartSummery total={totalCartItems} price={totalPrice} />}
      </div>
    </div>
  );
}
