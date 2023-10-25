import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get products
    getProducts: builder.query({
      query: (queryParams) => {
        const { name, discount } = queryParams || {};

        const params = new URLSearchParams();

        if (name) {
          params.append("name", name);
        }

        if (discount) {
          params.append("discount", discount);
        }

        const queryString = params.toString();
        return `/products${queryString ? `?${queryString}` : ""}`;
      },
    }),

    // get category products
    getCategoryProducts: builder.query({
      query: (categorySlug) => `/products/category/${categorySlug}`,
    }),

    // get a single product by slug
    getProduct: builder.query({
      query: (productSlug) => `/products/${productSlug}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoryProductsQuery,
  useGetProductQuery,
} = productsApi;
