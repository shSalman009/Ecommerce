import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  useRemoveCartMutation,
  useUpdateQuantityMutation,
} from "../../features/cart/CartApi";

export default function CartItem({ item }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Event handler function to update the state on window resize
  const handleResize = () => {
    const width = window.innerWidth;
    setIsMobile(width < 640);
  };

  // Add event listener on component mount and remove it on unmount
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { name, brand, images, price, stock } = item.product || {};
  const quantity = item.quantity;

  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeCart] = useRemoveCartMutation();

  // update quantity
  const handleQuantityChange = (qty) => {
    // quantity can't be less than 0 or greater than stock
    if (qty > stock) return;

    // if quantity is 0, remove from cart
    if (qty === 0) {
      removeCart(item.id);
      return;
    }

    // update quantity
    updateQuantity({ id: item.id, quantity: qty });
  };

  // remove from cart
  const handleRemove = () => {
    removeCart(item.id);
  };

  return !isMobile ? (
    <div className="flex items-center hover:bg-gray-100 py-5">
      <div className="w-2/5 flex gap-4 pr-2">
        <div className="w-1/4">
          <img
            className="w-full h-full object-cover"
            src={images[0]}
            alt={name}
          />
        </div>

        <div className="w-3/4 flex flex-col items-start justify-between flex-grow">
          <span className="font-bold text-sm two-line-text">{name}</span>
          <span className="text-red-500 text-xs">{brand}</span>
          <button
            onClick={handleRemove}
            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-1/5">
        <BiMinus
          size={20}
          className="mx-2 cursor-pointer"
          onClick={() => handleQuantityChange(quantity - 1)}
        />

        <span className="mx-2 inline-block text-center w-8 select-none font-medium">
          {quantity}
        </span>

        <BiPlus
          size={20}
          className="mx-2 cursor-pointer"
          onClick={() => handleQuantityChange(quantity + 1)}
        />
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">${price}</span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${price * quantity}
      </span>
    </div>
  ) : (
    <div className="flex gap-4 hover:bg-gray-100 py-5">
      <div className="xs:w-1/4 w-1/5">
        <img className="" src={images[0]} alt={name} />
      </div>
      <div className="xs:w-3/4 w-4/5 py-2 flex flex-col justify-start">
        <span className="font-bold text-base two-line-text mb-4">{name}</span>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-red-500 text-xs"> {brand}</span>
            <button
              onClick={handleRemove}
              className="font-semibold hover:text-red-500 text-gray-500 text-xs"
            >
              Remove
            </button>
          </div>

          <div className="flex justify-center items-center">
            <BiMinus
              size={20}
              className="mx-2 cursor-pointer"
              onClick={() => handleQuantityChange(quantity - 1)}
            />

            <span className="mx-2 inline-block text-center w-8 select-none font-medium">
              {quantity}
            </span>

            <BiPlus
              size={20}
              className="mx-2 cursor-pointer"
              onClick={() => handleQuantityChange(quantity + 1)}
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-center w-full font-semibold text-sm">
              Price : ${price}
            </span>
            <span className="text-center w-full font-semibold text-sm">
              Total : ${price * quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
