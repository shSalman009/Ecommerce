import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetUserCartsQuery,
} from "../../features/cart/CartApi";
import { success } from "../../utils/Alert";

export default function ProductDetails({ product }) {
  const { id, name, slug, brand, price } = product || {};

  // get user from redux store
  const { user } = useSelector((state) => state.auth) || {};
  const userId = user?.id;

  // get user cart
  const { data, isLoading, isSuccess } = useGetUserCartsQuery(userId, {
    skip: !userId,
  });

  // check if product is already added in cart
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const cartItems = data.payload || [];

      cartItems.forEach((item) => {
        if (item.product.id === id) {
          setIsProductInCart(true);
        }
      });
    }
  }, [isLoading, isSuccess, id, data]);

  // add to cart mutation
  const [
    addToCart,
    { isSuccess: addedInCartSuccess, isLoading: addingInCartLoading },
  ] = useAddToCartMutation();

  const navigate = useNavigate();
  // add to cart
  const handleAddToCart = () => {
    if (!user?.id) {
      navigate("/login");
      return;
    }
    const cartData = {
      product: id,
      quantity: 1,
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
    <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center lg:pl-10 lg:py-6 mt-20 lg:mt-0">
      <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">
        {brand}
      </h2>
      <h1 className="title-one">{name}</h1>
      <div className="flex items-center mt-2.5 mb-5">
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
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          5.0
        </span>
      </div>
      <p className="leading-relaxed">{product?.description}</p>

      <div className="flex">
        <span className="title-font font-bold text-2xl text-gray-900">
          ${price}
        </span>
      </div>
      <div className="flex justify-start items-center gap-4 my-4">
        <Link to={`/checkout/${slug}`} className="button-two">
          Buy Now
        </Link>

        {/* Product is not added to cart yet */}
        {!user || !isProductInCart ? (
          <button
            disabled={addingInCartLoading}
            onClick={handleAddToCart}
            type="button"
            className="button-two-outline"
          >
            Add to Cart
          </button>
        ) : null}
        {/* Product is already added in cart */}
        {user && isSuccess && isProductInCart ? (
          <Link to="/cart" className="button-two-outline">
            View In Cart
          </Link>
        ) : null}
      </div>
    </div>
  );
}
