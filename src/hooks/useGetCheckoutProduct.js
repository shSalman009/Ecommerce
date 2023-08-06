import { useSelector } from "react-redux";
import { useGetUserCartsQuery } from "../features/cart/CartApi";
import { useGetProductQuery } from "../features/products/productsApi";

export default function useGetCheckoutProduct(id = null) {
  const user = useSelector((state) => state.auth.user) || {};

  // get user cart products
  const {
    data: cartProducts,
    isLoading: isCartProductsLoading,
    isSuccess: isCartProductsSuccess,
  } = useGetUserCartsQuery(user?.id, {
    skip: id ? true : false,
  });

  // get single product
  const {
    data: singleProduct,

    isLoading: isSingleProductLoading,
    isSuccess: isSingleProductSuccess,
  } = useGetProductQuery(id, {
    skip: !id,
  });

  const cartProductsPrice = cartProducts?.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const singleProductPrice = singleProduct?.price;

  // The 'id' represents the product ID provided in the URL parameters. If the ID is provided, it means the user is purchasing a single product, so we return single product and price. If the ID is not provided, it means the user is purchasing cart products, so we return cart products and price.

  const product = [
    {
      ...singleProduct,
      quantity: 1,
      available_quantity: singleProduct?.quantity || undefined,
      image: singleProduct?.image_urls[0],
    },
  ];

  const data = {
    data: id ? product : cartProducts,
    price: id ? singleProductPrice : cartProductsPrice,
    isLoading: id ? isSingleProductLoading : isCartProductsLoading,
    isSuccess: id ? isSingleProductSuccess : isCartProductsSuccess,
  };

  return data;
}
