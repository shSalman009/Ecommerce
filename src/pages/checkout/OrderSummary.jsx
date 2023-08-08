import React from "react";

export default function OrderSummary({ data, price, isLoading, isSuccess }) {
  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {!isLoading &&
          isSuccess &&
          data?.map((product) => {
            const { id, name, quantity, brand, image } = product;

            return (
              <div
                key={id}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={image}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{name}</span>
                  <div className="flex gap-6">
                    <span className="float-right text-gray-400">
                      Brand : {brand}
                    </span>
                    <span className="float-right text-gray-400">
                      Qty : {quantity}
                    </span>
                  </div>

                  <p className="text-lg font-medium">
                    {quantity > 1
                      ? `$${price.toLocaleString()} x ${quantity} = $${(
                          price * quantity
                        ).toLocaleString()}`
                      : `$${price.toLocaleString()}`}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <form className="mt-5 grid gap-6">
        <div className="relative">
          <input
            className="peer hidden"
            id="radio_1"
            type="radio"
            name="radio"
            checked
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_1"
          >
            <img
              className="w-14 object-contain"
              src="/images/naorrAeygcJzX0SyNI4Y0.png"
              alt=""
            />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Standard Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery: 2-4 Days
              </p>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
}
