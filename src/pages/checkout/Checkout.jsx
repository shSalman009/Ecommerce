import React from "react";
import { useParams } from "react-router-dom";
import useGetCheckoutProduct from "../../hooks/useGetCheckoutProduct";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

export default function Checkout() {
  const { id: productSlug } = useParams();

  const { data, totalPrice, isLoading, isSuccess } =
    useGetCheckoutProduct(productSlug);

  return (
    <div className="custom-container">
      <div className="grid sm:px-10 grid-cols-1 xl:grid-cols-2 xl:px-20 2xl:px-32 xl:items-start">
        <OrderSummary
          data={data}
          totalPrice={totalPrice}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <CheckoutForm
          totalPrice={totalPrice}
          data={data}
          isCart={productSlug ? false : true}
        />
      </div>
    </div>
  );
}
