import { apiSlice } from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all brands
    getBrands: builder.query({
      query: () => `/brands`,
    }),
    // add new brand
    addBrand: builder.mutation({
      query: (body) => ({
        url: `/brands`,
        method: "POST",
        body,
      }),
    }),
    // remove a brand
    removeBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useRemoveBrandMutation,
} = brandApi;
