import { apiSlice } from "../api/apiSlice";
import { loggedIn, loggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // login
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const userData = result.data.payload;
          dispatch(loggedIn(userData));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // logout
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(loggedOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // authCheck
    authCheck: builder.query({
      query: () => "auth/check",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useAuthCheckQuery,
} = authApi;
