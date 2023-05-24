import React from "react";
import { useSelector } from "react-redux";
import { useGetUserCartsQuery } from "../../features/cart/CartApi";
import CartItem from "./CartItem";
import CartSummery from "./CartSummery";

export default function CartPage() {
  // get user from redux store
  const { auth } = useSelector((state) => state) || {};

  // get user cart products from api
  const {
    data: cartItems,
    isLoading,
    isError,
    error,
  } = useGetUserCartsQuery(auth?.user?.id);

  // data to be displayed
  const content = isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>{error?.data}</div>
  ) : cartItems?.length ? (
    cartItems?.map((item) => <CartItem key={item.id} item={item} />)
  ) : (
    <div>No items in cart</div>
  );

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <div className="flex">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">3 Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
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

            <a
              href="#"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
          </div>

          <CartSummery />
        </div>
      </div>
    </div>
  );
}
