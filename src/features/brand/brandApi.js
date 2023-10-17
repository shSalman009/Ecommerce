import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all brands
    getBrands: builder.query({
      query: () => `/brands`,
    }),
  }),
});

export const { useGetBrandsQuery } = brandApi;
