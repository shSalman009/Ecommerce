import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartByIdQuery,
} from "../../features/cart/CartApi";
import { success } from "../../utils/Alert";
import { encryptData } from "../../utils/Crypto";
import { createUrlWithTitleAndId } from "../../utils/generateUrl";

export default function Description({ product }) {
  // get user from redux store
  const auth = useSelector((state) => state.auth) || {};

  // destructure product
  const { id, name, brand, price, specifications, quantity } = product || {};

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
    <div className="lg:w-1/2 w-full flex flex-col lg:items-start items-center lg:pl-10 lg:py-6 mt-20 lg:mt-0">
      <h2 className="text-sm title-font text-gray-500 tracking-widest mb-1">
        {brand}
      </h2>
      <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
        {name}
      </h1>
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
        {/* <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
          Button
        </button>
        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
          <MdOutlineFavoriteBorder size={25} />
        </button> */}
      </div>
      <div className="flex justify-start items-center gap-4 my-4">
        <Link
          to={`/checkout/${createUrlWithTitleAndId(name, encryptData(id))}`}
          className="bg-blue-700 border-2 border-blue-700 text-gray-200 font-medium px-4 py-2 rounded-md"
        >
          Buy Now
        </Link>

        {/* Product is not added to cart yet */}
        {isSuccess && productInCart.length === 0 && (
          <button
            disabled={addingInCartLoading}
            onClick={handleAddToCart}
            type="button"
            className="text-blue-700 font-medium px-4 py-2 rounded-md border-2 border-blue-700"
          >
            Add to Cart
          </button>
        )}
        {/* Product is already added in cart */}
        {isSuccess && productInCart.length === 1 && (
          <Link
            to="/cart"
            className="text-blue-700 font-medium px-4 py-2 rounded-md border-2 border-blue-700"
          >
            View In Cart
          </Link>
        )}
      </div>
    </div>
  );
}
