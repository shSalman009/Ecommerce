import { apiSlice } from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get orders
    getOrders: builder.query({
      query: (user_id) => `/orders?user_id_like=${user_id}`,
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

      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          if (result?.data) {
            dispatch(
              orderApi.util.updateQueryData(
                "getOrders",
                result.data.user_id,
                (draft) => {
                  draft.push(result);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    // remove an order
    removeOrder: builder.mutation({
      query: ({ id, user_id }) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(
        { id, user_id },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              orderApi.util.updateQueryData("getOrders", user_id, (draft) => {
                const index = draft.findIndex((order) => order.id === id);
                draft.splice(index, 1);
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
