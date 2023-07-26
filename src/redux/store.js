import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { shazamApi } from "./services/shazamCore";
import { uploadSongsApi } from "./services/uploadSongs";

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    [uploadSongsApi.reducerPath]: uploadSongsApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shazamApi.middleware)
      .concat(uploadSongsApi.middleware),
});
