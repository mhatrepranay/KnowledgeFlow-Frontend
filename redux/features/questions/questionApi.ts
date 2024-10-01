import { apiSlice } from "../api/apiSlice";

export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllQuestion: builder.query({
      query: (type: any) => ({
        url: "questions",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createQuestions: builder.mutation({
      query: (data: any) => ({
        url: "create-quiz",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});
export const { useGetAllQuestionQuery, useCreateQuestionsMutation } =
  questionApi;
