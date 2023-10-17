import { useSelector } from "react-redux";
import { useGetUserCartsQuery } from "../features/cart/CartApi";
import { useGetProductQuery } from "../features/products/productsApi";

export default function useGetCheckoutProduct(productSlug = null) {
  const user = useSelector((state) => state.auth.user) || {};

  // get user cart products
  const {
    data: cartProductsData,
    isLoading: isCartProductsLoading,
    isSuccess: isCartProductsSuccess,
  } = useGetUserCartsQuery(user?.id, {
    skip: productSlug ? true : false,
  });

  const cartProducts = cartProductsData?.payload?.map((item) => {
    const { user, id, ...rest } = item;
    return rest;
  });

  // get single product
  const {
    data: singleProductData,
    isLoading: isSingleProductLoading,
    isSuccess: isSingleProductSuccess,
  } = useGetProductQuery(productSlug, {
    skip: !productSlug,
  });
  const singleProduct = singleProductData?.payload;

  const cartProductsPrice = cartProducts?.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  const singleProductPrice = singleProduct?.price;

  // The 'id' represents the product ID provided in the URL parameters. If the ID is provided, it means the user is purchasing a single product, so we return single product and price. If the ID is not provided, it means the user is purchasing cart products, so we return cart products and price.

  const product = [
    {
      product: singleProduct,
      quantity: 1,
    },
  ];

  const result = {
    data: productSlug ? product : cartProducts,
    totalPrice: productSlug ? singleProductPrice : cartProductsPrice,
    isLoading: productSlug ? isSingleProductLoading : isCartProductsLoading,
    isSuccess: productSlug ? isSingleProductSuccess : isCartProductsSuccess,
  };

  return result;
}
