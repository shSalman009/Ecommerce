import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all categories
    getCategories: builder.query({
      query: () => `/categories`,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
