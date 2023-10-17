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
  const { data, isLoading, isSuccess, isError, error } = useGetOrdersQuery(
    user.id
  );
  const orders = data?.payload || [];

  return (
    <>
      <div className="py-14 container mx-auto">
        {isLoading && <Loading />}

        {!isLoading && isError && (
          <Error message={error?.data?.message || "Something went wrong"} />
        )}

        {!isLoading && !isError && orders?.length === 0 && (
          <NotFound message="No orders" />
        )}

        {!isLoading &&
          isSuccess &&
          orders?.length > 0 &&
          orders?.map((order) => <OrderItem key={order.id} order={order} />)}
      </div>
    </>
  );
}
