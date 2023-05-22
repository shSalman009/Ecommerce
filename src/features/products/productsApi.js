import { apiSlice } from "../api/apiSlice";

export const porductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all products
    getProducts: builder.query({
      query: () => `/products`,
    }),

    // get cart products
    getCartProducts: builder.query({
      query: (ids) => {
        return `/products?${ids.map((id) => `id=${id}`).join("&")}`;
      },
    }),

    // get products by category
    getProductsByCategory: builder.query({
      query: (categoryId) => `/products?category_id_like=${categoryId}`,
    }),

    // get discount products
    getDiscountProducts: builder.query({
      query: () => `/products?discount_gte=1`,
    }),

    // get a product by id
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCartProductsQuery,
  useGetProductsByCategoryQuery,
  useGetDiscountProductsQuery,
  useGetProductQuery,
} = porductsApi;
