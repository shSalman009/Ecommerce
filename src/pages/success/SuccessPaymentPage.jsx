import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../features/order/orderApi";

export default function SuccessPaymentPage() {
  const { orderId } = useParams();

  const { data, isLoading, isError, error, isSuccess } =
    useGetOrderQuery(orderId);
  const orderData = data?.payload;

  const [realTime, setRealTime] = React.useState("");

  React.useEffect(() => {
    const time = parseInt(orderData?.createdAt);
    const date = new Date(time);
    setRealTime(date.toLocaleString());
  }, [orderData]);

  return (
    <div className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative p-4 text-center bg-slate-50 rounded-lg sm:p-5">
          <div className="w-12 h-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-3.5">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Success</span>
          </div>
          <p className="mb-8 text-xl font-semibold text-gray-900">
            Thank You, Your Order Has Been Placed!
          </p>

          {isSuccess && !isLoading && !isError ? (
            <div>
              <h4 className="text-start text-xl font-medium mb-2">
                Order Summary
              </h4>
              <ul className="text-lg font-medium border divide-y p-2 rounded-md">
                <li className="flex flex-wrap justify-between items-center py-2">
                  <p>Order Id:</p> <p>#{orderData.id}</p>
                </li>
                <li className="flex flex-wrap justify-between items-center py-2">
                  <p>Order Date:</p> <p>{realTime}</p>
                </li>
                <li className="flex flex-wrap justify-between items-center py-2">
                  <p>Order Status:</p> <p>{orderData.status}</p>
                </li>
                <li className="flex flex-wrap justify-between items-center py-2">
                  <p>Price:</p> <p>${orderData.total}.00</p>
                </li>
                <li className="flex flex-wrap justify-between items-center py-2">
                  <p>Shipping:</p> <p>${orderData.shippingCost}.00</p>
                </li>
                <li className="flex flex-wrap justify-between items-center py-2">
                  <p>Order Total:</p>{" "}
                  <p>${orderData.total + orderData.shippingCost}.00</p>
                </li>
              </ul>
            </div>
          ) : null}

          <Link
            to="/order"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            Go to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
