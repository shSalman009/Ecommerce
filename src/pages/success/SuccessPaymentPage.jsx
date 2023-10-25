import React from "react";
import { GiConfirmed } from "react-icons/gi";
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
            <GiConfirmed className="w-8 h-8 text-green-500" />
            <span className="sr-only">Success</span>
          </div>
          <h2 className="mb-8 text-xl md:text-2xl font-semibold text-gray-900 uppercase">
            Thank You, Your Order Has Been Placed!
          </h2>

          {isSuccess && !isLoading && !isError ? (
            <div>
              <h4 className="title-two">Order Summary</h4>
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

          <Link to="/order" type="button" class="button-one mt-2">
            Go to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
