import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api", // Your API base URL
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ message, history }) => ({
        url: "/chat/ask",
        method: "POST",
        body: { message, history },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApi;
