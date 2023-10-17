import { apiSlice } from "../api/apiSlice";

// ompleted
// cache updated

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get user carts
    getUserCarts: builder.query({
      query: (userId) => `/carts/${userId}`,
    }),

    // get cart by id
    getCartById: builder.query({
      query: ({ userId, productId }) =>
        `/carts?user=${userId}&product=${productId}`,
    }),

    // update quantity
    updateQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/carts/${id}`,
        method: "PATCH",
        body: { quantity },
      }),

      async onQueryStarted(
        { id, quantity },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const result = await queryFulfilled;
          const userId = getState().auth.user.id;

          if (result.data.success && result.data.payload) {
            dispatch(
              cartApi.util.updateQueryData("getUserCarts", userId, (draft) => {
                const index = draft.payload.findIndex((cart) => cart.id === id);
                draft.payload[index].quantity = quantity;
              })
            );
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/carts",
        method: "POST",
        body: data,
      }),
      // update cache
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        try {
          const result = await queryFulfilled;
          const userId = getState().auth.user.id;

          if (result.data.success && result.data.payload) {
            dispatch(
              cartApi.util.updateQueryData("getUserCarts", userId, (draft) => {
                draft.payload.push(result.data.payload);
              })
            );
            dispatch(
              cartApi.util.updateQueryData(
                "getCartById",
                {
                  userId,
                  productId: result.data.payload.product.id,
                },
                (draft) => {
                  draft.payload.push(result.data.payload);
                }
              )
            );
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // remove a single cart item
    removeCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),

      async onQueryStarted(cartId, { dispatch, queryFulfilled, getState }) {
        try {
          const result = await queryFulfilled;
          const userId = getState().auth.user.id;

          if (result.data.success) {
            dispatch(
              cartApi.util.updateQueryData("getUserCarts", userId, (draft) => {
                const index = draft.payload.findIndex(
                  (cart) => cart.id === cartId
                );
                draft.payload.splice(index, 1);
              })
            );
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),

    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/carts/clear/${userId}`,
        method: "DELETE",
      }),

      async onQueryStarted(userId, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.success) {
            dispatch(
              cartApi.util.updateQueryData("getUserCarts", userId, (draft) => {
                return {
                  payload: [],
                };
              })
            );
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetUserCartsQuery,
  useGetCartByIdQuery,
  useUpdateQuantityMutation,
  useAddToCartMutation,
  useRemoveCartMutation,
  useClearCartMutation,
} = cartApi;
