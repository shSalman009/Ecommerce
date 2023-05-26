import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartByIdQuery,
} from "../../features/cart/CartApi";
import { success } from "../../utils/Alert";

export default function DiscountProductCard({ product }) {
  const {
    name,
    id,
    image_urls,
    price,
    quantity,
    brand,
    description,
    discount,
  } = product;
  const url = name.replace(/\s+/g, "-").toLowerCase();

  const discountPrice = price - (price * discount) / 100;

  // get user from redux store
  const auth = useSelector((state) => state.auth) || {};

  // get current product from cart
  const {
    data: productInCart,
    isLoading,
    isSuccess,
  } = useGetCartByIdQuery({
    userId: auth?.user?.id,
    productId: id,
  });

  // add to cart mutation
  const [
    addToCart,
    { isSuccess: addedInCartSuccess, isLoading: addingInCartLoading },
  ] = useAddToCartMutation();

  const navigate = useNavigate();
  // add to cart
  const handleAddToCart = () => {
    if (!auth?.user?.id) {
      navigate("/login");
      return;
    }
    const cartData = {
      user_id: auth?.user?.id,
      product_id: id,
      quantity: 1,
      available_quantity: quantity,
      name,
      brand,
      price,
      image: product?.image_urls[0],
    };
    addToCart(cartData);
  };

  // show success alert after adding product in cart successfully
  useEffect(() => {
    if (addedInCartSuccess) {
      success("Product added to cart successfully");
    }
  }, [addedInCartSuccess]);

  return (
    <div
      key={id}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl"
    >
      <img
        className="object-cover rounded-t-lg h-auto w-2/5 md:rounded-none md:rounded-l-lg"
        src={image_urls?.[0]}
        alt={name}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <p className="mb-3 font-normal text-gray-700">{name}</p>
        <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
          {description}
        </h5>
        <div className="flex items-center my-2.5">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            5.0
          </span>
        </div>
        <div className="mb-2.5">
          {/* Discounted Prize */}
          <span className="text-lg font-medium text-red-500 block">
            ${discountPrice}
          </span>

          {/* Original Price */}
          <span className="text-lg font-medium text-gray-500 line-through">
            ${price}
          </span>

          {/* Discount */}
          <span className="ml-3 text-lg font-medium text-gray-700">
            -{discount}%
          </span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <Link
            to={`/products/${url}_${btoa(id)}`}
            className="text-gray-900 border bg-slate-300 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            View
          </Link>{" "}
          {/* Product is not added to cart yet */}
          {isSuccess && productInCart.length === 0 && (
            <button
              disabled={addingInCartLoading}
              onClick={handleAddToCart}
              type="button"
              className="text-gray-900 border bg-slate-300 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add to Cart
            </button>
          )}
          {/* Product is already added in cart */}
          {isSuccess && productInCart.length === 1 && (
            <Link
              to="/cart"
              className="text-gray-900 border bg-slate-300 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              View In Cart
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
