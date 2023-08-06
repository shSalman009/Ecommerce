import React, { useState } from "react";
import Modal from "./Modal";

export default function OrderItem({ order }) {
  const {
    id,
    timestamp,
    order_items,
    shipping_address,
    billing_address,
    order_total,
    shipping_cost,
    order_status,
  } = order || {};

  const [modal, setModal] = useState(false);

  const time = parseInt(timestamp);
  const date = new Date(time);
  const realTime = date.toLocaleString();

  return (
    <>
      {/* Confirmation modal */}
      {modal && <Modal setModal={setModal} id={order.id} />}

      <div className="mb-10">
        <div className="flex justify-start item-start space-y-2 flex-col px-4">
          <div className="flex justify-between">
            <h1 className="text-lg lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Order #{id}
            </h1>
            <div className="flex items-end flex-col">
              <button
                onClick={() => setModal(true)}
                className="text-lg uppercase bg-gray-50 rounded-md px-4 py-2 cursor-pointer font-medium leading-6 text-gray-600"
              >
                Cancel Order
              </button>{" "}
              <p className="text-base font-medium leading-6 uppercase text-yellow-400">
                {order_status}
              </p>
            </div>
          </div>
          <p className="text-base font-medium leading-6 text-gray-600">
            {realTime}
          </p>
        </div>
        <div className="mt-4 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start bg-gray-50 p-4 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s Cart
            </p>
            {order_items?.map((item, index) => (
              <div
                key={index}
                className="mt-4 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
              >
                <div className="pb-4 w-full md:w-32">
                  <img
                    className="w-full hidden md:block"
                    src={item?.image}
                    alt="dress"
                  />
                  <img
                    className="w-full md:hidden"
                    src={item?.image}
                    alt="dress"
                  />
                </div>
                <div className="md:flex-row flex-col flex justify-between items-start w-full pb-4 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                      {item?.name}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-sm leading-none text-gray-800">
                        <span className="text-gray-300">Style: </span> Italic
                        Minimal Design
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                      ${item?.price}{" "}
                      {item?.discount ? (
                        <span className="text-red-300 line-through">
                          ${item?.discount}.00
                        </span>
                      ) : null}
                    </p>
                    <p className="text-base xl:text-lg leading-6 text-gray-800">
                      {item?.quantity}
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                      ${item?.price * item?.quantity}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex xs:flex-row flex-col xs:gap-2 gap-4 bg-gray-50 p-4">
            <div className="w-full xl:w-96 flex justify-between items-center md:items-start flex-col xl:h-full mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Shipping Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {shipping_address?.street}, {shipping_address?.state},
                    {shipping_address?.zip}
                  </p>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                    Billing Address
                  </p>
                  <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                    {billing_address?.street}, {billing_address?.state},{" "}
                    {billing_address?.zip}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base leading-4 text-gray-600">
                    ${order_total}.00
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Discount </p>
                  <p className="text-base leading-4 text-gray-600">00</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 text-gray-800">Shipping</p>
                  <p className="text-base leading-4 text-gray-600">
                    ${shipping_cost}.00
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 text-gray-800">
                  Total
                </p>
                <p className="text-base font-semibold leading-4 text-gray-600">
                  ${order_total + shipping_cost}.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
