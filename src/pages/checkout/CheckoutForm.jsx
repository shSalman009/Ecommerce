import React, { useEffect, useState } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { HiOutlineAtSymbol, HiOutlineCreditCard } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useClearCartMutation } from "../../features/cart/CartApi";
import { useCreateOrderMutation } from "../../features/order/orderApi";
import { error as errorAlert } from "../../utils/Alert";

export default function CheckoutForm({ totalPrice, data, isCart }) {
  // get user
  const { user } = useSelector((state) => state.auth) || {};
  const userId = user?.id;

  const shippingCost = 10;
  const total = totalPrice + shippingCost;

  // form states
  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [billing, setBilling] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [shipping, setShipping] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  // Queries and Mutations
  const [clearCart] = useClearCartMutation();

  const [
    createOrder,
    { data: newOrder, isLoading, isSuccess, isError, error },
  ] = useCreateOrderMutation();

  // Handle form submit to create order
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      email,
      shippingCost,
      total,
      paymentDetails: {
        cardHolder,
        cardNumber: cardDetails.cardNumber,
        cardExpiration: cardDetails.expiryDate,
        cardCVC: cardDetails.cvc,
      },
      billingAddress: {
        street: billing.street,
        city: billing.city,
        state: billing.state,
        zip: billing.zip,
      },
      shippingAddress: {
        street: sameAsBilling ? billing.street : shipping.street,
        city: sameAsBilling ? billing.city : shipping.city,
        state: sameAsBilling ? billing.state : shipping.state,
        zip: sameAsBilling ? billing.zip : shipping.zip,
      },

      products: data.map((item) => {
        return {
          product: item.product.id,
          quantity: item.quantity,
        };
      }),
    };

    createOrder(orderData);
  };

  // Effect for handling successful or failed order submission
  const navigate = useNavigate();
  useEffect(() => {
    // remove cart and navigate to success page if order is created
    if (isSuccess) {
      clearCart(userId);
      resetForm();
      navigate(`/order-success/${newOrder.payload.id}`);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    // show error alert if error
    if (isError) {
      const message =
        error?.data?.message || "Checkout Failed, Please try again";
      errorAlert(message);
    }
  }, [isError, isSuccess]);

  // reset form
  const resetForm = () => {
    setEmail("");
    setCardHolder("");
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    });
    setBilling({
      address: "",
      state: "",
      zip: "",
    });
    setShipping({
      address: "",
      state: "",
      zip: "",
    });
    setSameAsBilling(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 bg-gray-50 px-4 lg:mt-0">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <div className="">
        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
          Email
        </label>
        <div className="relative">
          <input
            required
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full input-icon"
            placeholder="your.email@gmail.com"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <HiOutlineAtSymbol className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <label
          htmlFor="card-holder"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Card Holder
        </label>
        <div className="relative">
          <input
            required
            type="text"
            id="card-holder"
            name="card-holder"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full input-icon uppercase"
            placeholder="Your full name here"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <FaRegIdCard className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <label
          htmlFor="card-no"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Card Details
        </label>
        <div className="flex gap-2">
          <div className="relative w-7/12 flex-shrink-0">
            <input
              required
              type="text"
              id="card-no"
              name="card-no"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
              className="w-full input-icon"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <HiOutlineCreditCard className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <input
            required
            type="text"
            name="credit-expiry"
            value={cardDetails.expiryDate}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, expiryDate: e.target.value })
            }
            className="w-full input"
            placeholder="MM/YY"
          />
          <input
            required
            type="text"
            name="credit-cvc"
            value={cardDetails.cvc}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cvc: e.target.value })
            }
            className="w-1/6 flex-shrink-0 input"
            placeholder="CVC"
          />
        </div>

        {/* billing address */}
        <label
          htmlFor="billing-address"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Billing Address
        </label>
        <div className="flex gap-2 flex-col sm:flex-row">
          <div className="relative flex-shrink-0 sm:w-6/12">
            <input
              required
              type="text"
              id="billing-street"
              name="billing-street"
              value={billing.street}
              onChange={(e) =>
                setBilling({ ...billing, street: e.target.value })
              }
              className="w-full input-icon"
              placeholder="Street"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-4 w-4 object-contain"
                src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                alt=""
              />
            </div>
          </div>
          <input
            required
            type="text"
            name="billing-city"
            value={billing.city}
            onChange={(e) => setBilling({ ...billing, city: e.target.value })}
            className="w-full input"
            placeholder="City"
          />
          <input
            required
            type="text"
            name="billing-state"
            value={billing.state}
            onChange={(e) => setBilling({ ...billing, state: e.target.value })}
            className="w-full input"
            placeholder="State"
          />

          <input
            required
            type="text"
            name="billing-zip"
            value={billing.zip}
            onChange={(e) => setBilling({ ...billing, zip: e.target.value })}
            className="w-full input"
            placeholder="ZIP"
          />
        </div>

        {/* checkbok */}
        <div className="flex items-center my-4">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded0"
            value={sameAsBilling}
            onChange={(e) => setSameAsBilling(e.target.checked)}
          />
          <label className="ml-2 text-sm font-medium text-gray-900">
            Same as billing address?
          </label>
        </div>

        {/* shipping address */}
        {!sameAsBilling && (
          <>
            <label
              htmlFor="shipping-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Shipping Address
            </label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-6/12">
                <input
                  required
                  type="text"
                  id="shipping-street"
                  name="shipping-street"
                  value={shipping.street}
                  onChange={(e) =>
                    setShipping({ ...shipping, street: e.target.value })
                  }
                  className="w-full input-icon"
                  placeholder="Street"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <MdOutlineLocalShipping className="h-4 w-4 object-contain" />
                </div>
              </div>
              <input
                required
                type="text"
                name="shipping-city"
                value={shipping.city}
                onChange={(e) =>
                  setShipping({ ...shipping, city: e.target.value })
                }
                className="w-full input"
                placeholder="City"
              />
              <input
                required
                type="text"
                name="shipping-state"
                value={shipping.state}
                onChange={(e) =>
                  setShipping({ ...shipping, state: e.target.value })
                }
                className="w-full input"
                placeholder="State"
              />

              <input
                required
                type="text"
                name="shipping-zip"
                value={shipping.zip}
                onChange={(e) =>
                  setShipping({ ...shipping, zip: e.target.value })
                }
                className="flex-shrink-0 sm:w-1/6 input"
                placeholder="ZIP"
              />
            </div>
          </>
        )}

        {/* <!-- Total --> */}
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">${totalPrice}.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">${shippingCost}.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">${total}.00</p>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading || data?.length === 0}
        className="button-one mt-4"
      >
        {isLoading ? spinner : "Place Order"}
      </button>
    </form>
  );
}

const spinner = (
  <div className="flex justify-center items-center">
    <ImSpinner2 className="w-8 h-8 mr-2 animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
);
