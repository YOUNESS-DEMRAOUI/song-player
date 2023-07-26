import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadSongsApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    getUploadedSongs: builder.query({ query: () => "/api/v2/upload" }),
    addSong: builder.mutation({
      query: (song) => ({
        url: "/api/v2/upload",
        method: "POST",
        body: song,
      }),
    }),
  }),
});

export const { useGetUploadedSongsQuery, useAddSongMutation } = uploadSongsApi;
