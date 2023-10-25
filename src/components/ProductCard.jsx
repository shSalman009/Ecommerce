import React, { useEffect, useState } from "react";
import {
  BsCartCheckFill,
  BsCartPlus,
  BsImageAlt,
  BsStarFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetUserCartsQuery,
} from "../features/cart/CartApi";
import { success } from "../utils/Alert";

export default function ProductCard({ product }) {
  const { name, slug, id, images, price } = product;

  // get user from redux store
  const { user } = useSelector((state) => state.auth) || {};
  const userId = user?.id;

  const { data, isLoading, isSuccess } = useGetUserCartsQuery(userId, {
    skip: !userId,
  });

  // if product is already added in cart
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
    if (!userId) {
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
  return (
    <div
      key={id}
      className="w-full max-w-sm flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow"
    >
      <Link to={`/products/${slug}`}>
        <img
          className="p-8 rounded-t-lg"
          style={{ display: imageLoaded ? "block" : "none" }}
          src={images[0]}
          onLoad={handleImageLoad}
          alt="Product"
        />

        {!imageLoaded && (
          <div className="p-6 animate-pulse">
            <div className="flex items-center justify-center h-48 bg-gray-300 rounded">
              <BsImageAlt size={50} className="text-gray-200" />
            </div>
          </div>
        )}
      </Link>
      <div className="px-5 pb-5 flex flex-col">
        <Link to={`/products/${slug}`}>
          <div className="two-line-text">
            <h4 className="md:text-xl sm:text-lg text-base font-semibold tracking-tight text-gray-900">
              {name}
            </h4>
          </div>
        </Link>
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
        <div className="flex items-center justify-between">
          <span className="sm:text-2xl text-xl font-semibold text-gray-900">
            ${price}
          </span>

          {/* Product is not added to cart yet */}
          {!user || !isProductInCart ? (
            <button
              disabled={addingInCartLoading}
              onClick={handleAddToCart}
              type="button"
              className="button-two text-sm hidden md:block"
            >
              Add to Cart
              <BsCartPlus size={25} className="md:hidden" />
            </button>
          ) : null}
          {/* Product is already added in cart */}
          {user && isSuccess && isProductInCart ? (
            <Link to="/cart">
              <span className="hidden md:block button-two-outline text-sm">
                View In Cart
              </span>{" "}
              <BsCartCheckFill size={25} className="md:hidden" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
