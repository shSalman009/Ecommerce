import React, { useEffect, useState } from "react";
import { BsCartCheckFill, BsCartPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartByIdQuery,
} from "../features/cart/CartApi";
import { success } from "../utils/Alert";
import { encryptData } from "../utils/Crypto";
export default function ProductCard({ product }) {
  const { name, id, image_urls, price, quantity, brand } = product;
  const url = name.replace(/\s+/g, "-").toLowerCase();

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

  // handle image load
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div
      key={id}
      className="w-full max-w-sm flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <Link to={`/products/${url}_${encryptData(id)}`}>
        <img
          className="p-8 rounded-t-lg"
          style={{ display: imageLoaded ? "block" : "none" }}
          src={image_urls[0]}
          onLoad={handleImageLoad}
          alt="Product"
        />

        {!imageLoaded && (
          <div className="p-6 animate-pulse">
            <div className="flex items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-700">
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
          </div>
        )}
      </Link>
      <div className="px-5 pb-5 flex flex-col">
        <Link to={`/products/${url}_${encryptData(id)}`}>
          <div className="two-line-text">
            <h5 className="md:text-xl sm:text-lg text-base font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </div>
        </Link>
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
        <div className="flex items-center justify-between">
          <span className="sm:text-2xl text-xl font-semibold text-gray-900 dark:text-white">
            ${price}
          </span>

          {/* Product is not added to cart yet */}
          {isSuccess && productInCart.length === 0 && (
            <button
              disabled={addingInCartLoading}
              onClick={handleAddToCart}
              type="button"
            >
              <span className="hidden md:block bg-blue-700 border-2 border-blue-700 text-gray-200 font-medium px-3 py-1.5 rounded-md">
                Add to Cart
              </span>
              <BsCartPlus size={25} className="md:hidden" />
            </button>
          )}
          {/* Product is already added in cart */}
          {isSuccess && productInCart.length === 1 && (
            <Link to="/cart">
              <span className="hidden md:block text-blue-700 font-medium px-3 py-1.5 rounded-md border-2 border-blue-700">
                View In Cart
              </span>{" "}
              <BsCartCheckFill size={25} className="md:hidden" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
