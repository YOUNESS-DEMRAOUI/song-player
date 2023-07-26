import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadSongsApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    getUploadedSongs: builder.query({ query: () => "/api/v2/upload" }),
  }),
});

export const { useGetUploadedSongsQuery } = uploadSongsApi;
