import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetUserCartsQuery,
} from "../../features/cart/CartApi";
import { success } from "../../utils/Alert";

export default function DiscountProductCard({ product }) {
  const { name, slug, id, images, price, description, discount } = product;

  // get user from redux store
  const { user } = useSelector((state) => state.auth) || {};
  const userId = user?.id;

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

  // handle image load
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const discountPrice = price - (price * discount) / 100;

  return (
    <div
      key={id}
      className="flex xl:flex-row flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl"
    >
      <img
        className="object-cover rounded-t-lg h-auto xl:w-2/5 w-full md:rounded-none md:rounded-l-lg"
        src={images?.[0]}
        style={{ display: imageLoaded ? "block" : "none" }}
        onLoad={handleImageLoad}
        alt={name}
      />
      {!imageLoaded && (
        <div className="animate-pulse w-60 h-full flex items-center justify-center bg-gray-300 rounded-l dark:bg-gray-700">
          <svg
            className="w-12 h-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
      )}
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
            to={`/products/${slug}`}
            className="text-gray-900 border bg-slate-300 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            View
          </Link>{" "}
          {/* Product is not added to cart yet */}
          {!user || !isProductInCart ? (
            <button
              disabled={addingInCartLoading}
              onClick={handleAddToCart}
              type="button"
              className="text-gray-900 border bg-slate-300 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add to Cart
            </button>
          ) : null}
          {/* Product is already added in cart */}
          {user && isSuccess && isProductInCart ? (
            <Link
              to="/cart"
              className="text-gray-900 border bg-slate-300 hover:bg-slate-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              View In Cart
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
