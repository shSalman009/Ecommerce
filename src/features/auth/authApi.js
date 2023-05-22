import { apiSlice } from "../api/apiSlice";
import { loggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create a new user
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("auth", JSON.stringify(result.data));
          dispatch(loggedIn(result.data));
        } catch (error) {}
      },
    }),

    // login as user
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem("auth", JSON.stringify(result.data));
          dispatch(loggedIn(result.data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
