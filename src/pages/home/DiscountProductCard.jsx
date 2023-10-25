import React, { useEffect, useState } from "react";
import { BsImageAlt, BsStarFill } from "react-icons/bs";
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
        <div className="animate-pulse w-60 h-full flex items-center justify-center bg-gray-300 rounded-l">
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded">
            <BsImageAlt size={50} className="text-gray-200" />
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between p-4 leading-normal">
        <p className="mb-3 font-normal text-gray-700">{name}</p>
        <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
          {description}
        </h5>
        <div className="flex items-center mt-2.5 mb-5 space-x-1">
          <BsStarFill className="text-yellow-500" />
          <BsStarFill className="text-yellow-500" />
          <BsStarFill className="text-yellow-500" />
          <BsStarFill className="text-yellow-500" />
          <BsStarFill className="text-yellow-500" />
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
          <Link to={`/products/${slug}`} className="button-two-outline">
            View
          </Link>{" "}
          {/* Product is not added to cart yet */}
          {!user || !isProductInCart ? (
            <button
              disabled={addingInCartLoading}
              onClick={handleAddToCart}
              type="button"
              className="button-two"
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
    </div>
  );
}
