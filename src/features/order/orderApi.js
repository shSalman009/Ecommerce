import { apiSlice } from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get user orders
    getOrders: builder.query({
      query: (userId) => `/orders/user/${userId}`,
    }),

    // get a single order by order id
    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
    }),

    // create an order
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        try {
          const result = await queryFulfilled;
          const userId = getState().auth.user.id;

          if (result?.data.success && result?.data.payload) {
            dispatch(
              orderApi.util.updateQueryData("getOrders", userId, (draft) => {
                draft.payload.push(result.data.payload);
              })
            );
          }
        } catch (error) {}
      },
    }),

    // remove an order
    removeOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),

      async onQueryStarted(orderId, { dispatch, queryFulfilled, getState }) {
        try {
          const result = await queryFulfilled;
          const userId = getState().auth.user.id;

          if (result.data.success) {
            dispatch(
              orderApi.util.updateQueryData("getOrders", userId, (draft) => {
                const index = draft.payload.findIndex(
                  (order) => order.id === orderId
                );
                draft.payload.splice(index, 1);
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useRemoveOrderMutation,
} = orderApi;
