import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get user carts
    getUserCarts: builder.query({
      query: (id) => `/carts?user_id_like=${id}`,
    }),

    // get cart by id
    getCartById: builder.query({
      query: ({ userId, productId }) =>
        `/carts?user_id_like=${userId}&product_id_like=${productId}`,
    }),

    // update quantity
    updateQuantity: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/carts/${id}`,
        method: "PATCH",
        body: { quantity },
      }),

      async onQueryStarted({ id, quantity }, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data) {
            dispatch(
              cartApi.util.updateQueryData(
                "getUserCarts",
                result.data?.user_id,
                (draft) => {
                  const index = draft.findIndex((cart) => cart.id === id);
                  draft[index].quantity = quantity;
                }
              )
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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data) {
            dispatch(
              cartApi.util.updateQueryData(
                "getUserCarts",
                result.data?.user_id,
                (draft) => {
                  draft.push(result.data);
                }
              )
            );
            dispatch(
              cartApi.util.updateQueryData(
                "getCartById",
                {
                  userId: result.data?.user_id,
                  productId: result.data?.product_id,
                },
                (draft) => {
                  draft.push(result.data);
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
      query: ({ id, user_id, product_id }) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
      // how to get data that's being deleted?

      async onQueryStarted(
        { id, user_id, product_id },
        { dispatch, queryFulfilled, getState }
      ) {
        try {
          const result = await queryFulfilled;

          if (result.data) {
            dispatch(
              cartApi.util.updateQueryData("getUserCarts", user_id, (draft) => {
                const index = draft.findIndex((cart) => cart.id === id);
                draft.splice(index, 1);
              })
            );

            dispatch(
              cartApi.util.updateQueryData(
                "getCartById",
                {
                  userId: user_id,
                  productId: product_id,
                },
                (draft) => {
                  const index = draft.findIndex(
                    (cart) => cart.id === id && cart.user_id === user_id
                  );
                  draft.splice(index, 1);
                }
              )
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
} = cartApi;
