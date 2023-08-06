import React from "react";
import { useParams } from "react-router-dom";
import useGetCheckoutProduct from "../../hooks/useGetCheckoutProduct";
import { decryptData } from "../../utils/Crypto";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
export default function Checkout() {
  const { id } = useParams();
  const splitted = id?.split("_");
  const decryptedId = id && decryptData(splitted[1]);

  const { data, price, isLoading, isSuccess } =
    useGetCheckoutProduct(decryptedId);

  return (
    <div className="container mx-auto">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <OrderSummary
          data={data}
          price={price}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        <CheckoutForm price={price} data={data} />
      </div>
    </div>
  );
}
