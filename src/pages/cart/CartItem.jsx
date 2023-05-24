import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  useRemoveCartMutation,
  useUpdateQuantityMutation,
} from "../../features/cart/CartApi";

export default function CartItem({ item }) {
  const {
    id,
    name,
    brand,
    image,
    price,
    quantity,
    available_quantity,
    user_id,
    product_id,
  } = item || {};

  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeCart] = useRemoveCartMutation();

  // update quantity
  const handleQuantityChange = (qty) => {
    // check if quantity is less than 1 or greater than available quantity
    if (qty > available_quantity) return;

    // if quantity is 0, remove from cart
    if (qty === 0) {
      removeCart({ id, user_id, product_id });
      return;
    }

    // update quantity
    updateQuantity({ id, quantity: qty });
  };

  // remove from cart
  const handleRemove = () => {
    removeCart({ id, user_id, product_id });
  };

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <img className="h-24" src={image} alt={name} />
        </div>
        <div className="flex flex-col items-start justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">
            {name.length > 50 ? name.substring(0, 50) + "..." : name}
          </span>
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
  );
}
