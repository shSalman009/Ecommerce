import React from "react";
import { Link } from "react-router-dom";

export default function CartSummery({ total, price }) {
  return (
    <div className="xl:w-1/4 w-full px-8">
      <div className="border-b pb-8">
        <h1 className="title-one">Order Summary</h1>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">Items {total}</span>
        <span className="font-semibold text-sm">{price}$</span>
      </div>
      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">
          Shipping
        </label>
        <select className="block p-2 text-gray-600 w-full text-sm border-2 focus:outline-none rounded-md">
          <option>Standard shipping - $00.00</option>
        </select>
      </div>
      <div className="py-10">
        <label
          htmlFor="promo"
          className="font-semibold inline-block mb-3 text-sm uppercase"
        >
          Promo Code
        </label>
        <input
          type="text"
          id="promo"
          placeholder="Not implemented yet"
          className="p-2 text-sm w-full border-2 focus:outline-none rounded-md"
        />
      </div>
      <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded-md">
        Apply
      </button>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>${price}</span>
        </div>
        <Link to="/checkout" className="button-one">
          Checkout
        </Link>
      </div>
    </div>
  );
}
