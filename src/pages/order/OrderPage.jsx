import React from "react";
import { useSelector } from "react-redux";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import { useGetOrdersQuery } from "../../features/order/orderApi";
import OrderItem from "./OrderItem";

export default function OrderPage() {
  const user = useSelector((state) => state.auth.user);

  // get user orders
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery(user.id);

  return (
    <>
      <div className="py-14  container mx-auto">
        {isLoading && <Loading />}

        {!isLoading && isError && (
          <Error message={error?.data || "Something went wrong"} />
        )}

        {!isLoading && !isError && orders?.length === 0 && (
          <NotFound text="No orders" />
        )}

        {!isLoading &&
          isSuccess &&
          orders?.map((order) => <OrderItem key={order.id} order={order} />)}
      </div>
    </>
  );
}
