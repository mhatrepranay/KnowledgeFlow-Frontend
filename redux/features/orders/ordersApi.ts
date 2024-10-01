import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllOrders: builder.query({
      query: (type: any) => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "payment/stripepublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPayementIntent: builder.mutation({
      query: (amount: any) => ({
        url: "payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }: any) => ({
        url: "create-order",
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetStripePublishableKeyQuery,
  useCreatePayementIntentMutation,
} = ordersApi;
