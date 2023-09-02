import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadSongsApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  tagTypes: ["Songs"],
  endpoints: (builder) => ({
    getUploadedSongs: builder.query({
      query: () => "/api/v2/upload",
      providesTags: ["Songs"],
    }),
    addSong: builder.mutation({
      query: (song) => ({
        url: "/api/v2/upload",
        method: "POST",
        body: song,
      }),
      invalidatesTags: ["Songs"],
    }),
    removeSong: builder.mutation({
      query: (song) => ({
        url: `/api/v2/upload/${song}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Songs"],
    }),
  }),
});

export const { useGetUploadedSongsQuery, useAddSongMutation } = uploadSongsApi;
