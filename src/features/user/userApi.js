import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // forgot password
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: email,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/users/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = userApi;
