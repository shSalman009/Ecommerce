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
    <div className="container mx-auto">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
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
