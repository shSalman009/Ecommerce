import React, { useEffect, useState } from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useRemoveCartMutation } from "../../features/cart/CartApi";
import { useCreateOrderMutation } from "../../features/order/orderApi";
import { error as errorAlert } from "../../utils/Alert";

export default function CheckoutForm({ price, data, isCart }) {
  // get user
  const user = useSelector((state) => state.auth?.user) || null;

  const shipping_cost = 10;
  const total = price + shipping_cost;

  // form states
  const [email, setEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [billing, setBilling] = useState({
    address: "",
    state: "",
    zip: "",
  });
  const [shipping, setShipping] = useState({
    address: "",
    state: "",
    zip: "",
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [orderId, setorderId] = useState(null);

  // Queries and Mutations
  const [removeCart] = useRemoveCartMutation();

  const [createOrder, { isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();

  // Handle form submit to create order
  const handleSubmit = (e) => {
    e.preventDefault();

    const id = uuidv4();
    setorderId(id);

    // order object
    const order = {
      id: id,
      user_id: user?.id,
      email,
      shipping_cost,
      order_total: total,
      order_status: "pending",
      timestamp: Date.now(),
      payment: {
        card_holder_name: cardHolder,
        card_number: cardDetails.cardNumber,
        expiry_date: cardDetails.expiryDate,
        cvc: cardDetails.cvc,
        payment_status: "paid",
      },
      billing_address: {
        street: billing.address,
        state: billing.state,
        zip: billing.zip,
      },
      shipping_address: {
        street: sameAsBilling ? billing.address : shipping.address,
        state: sameAsBilling ? billing.state : shipping.state,
        zip: sameAsBilling ? billing.zip : shipping.zip,
      },

      order_items: data.map((item) => {
        const { id, quantity, price, name, image } = item;
        return {
          product_id: id,
          name: name,
          quantity: quantity,
          price: price,
          discount: 0,
          image: image,
        };
      }),
    };
    createOrder(order);
  };

  // Effect for handling successful or failed order submission
  const navigate = useNavigate();
  useEffect(() => {
    // remove cart and navigate to success page if order is created
    if (isSuccess) {
      if (isCart) {
        data?.map((cart) => {
          removeCart({
            id: cart?.id,
            user_id: user?.id,
            product_id: cart?.product_id,
          });
        });
      }

      resetForm();
      navigate(`/order-success/${orderId}`);
    }

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
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
    >
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
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="your.email@gmail.com"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
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
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your full name here"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
              />
            </svg>
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
              className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
              </svg>
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
            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
            className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="CVC"
          />
        </div>
        <label
          htmlFor="billing-address"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Billing Address
        </label>
        <div className="flex gap-2 flex-col sm:flex-row">
          <div className="relative flex-shrink-0 sm:w-7/12">
            <input
              required
              type="text"
              id="billing-address"
              name="billing-address"
              value={billing.address}
              onChange={(e) =>
                setBilling({ ...billing, address: e.target.value })
              }
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Street Address"
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
            name="billing-state"
            value={billing.state}
            onChange={(e) => setBilling({ ...billing, state: e.target.value })}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="State"
          />

          <input
            required
            type="text"
            name="billing-zip"
            value={billing.zip}
            onChange={(e) => setBilling({ ...billing, zip: e.target.value })}
            className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="ZIP"
          />
        </div>

        {/* checkbok */}
        <div className="flex items-center my-4">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded0"
            value={sameAsBilling}
            onChange={(e) => setSameAsBilling(!sameAsBilling)}
          />
          <label className="ml-2 text-sm font-medium text-gray-900">
            Shipping address is same as my billing address
          </label>
        </div>

        {/* shipping address */}
        {!sameAsBilling && (
          <>
            {" "}
            <label
              htmlFor="shipping-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Shipping Address
            </label>
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  required
                  type="text"
                  id="shipping-address"
                  name="shipping-address"
                  value={shipping.address}
                  onChange={(e) =>
                    setShipping({ ...shipping, address: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <MdOutlineLocalShipping className="h-4 w-4 object-contain" />
                </div>
              </div>
              <input
                required
                type="text"
                name="shipping-state"
                value={shipping.state}
                onChange={(e) =>
                  setShipping({ ...shipping, state: e.target.value })
                }
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>
          </>
        )}

        {/* <!-- Total --> */}
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">${price}.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">${shipping_cost}.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">${total}.00</p>
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white flex justify-center items-center"
      >
        {isLoading ? spinner : "Place Order"}
      </button>
    </form>
  );
}

const spinner = (
  <div>
    <svg
      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);
