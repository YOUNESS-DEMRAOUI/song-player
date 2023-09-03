import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { shazamApi } from "./services/shazamCore";
import { uploadSongsApi } from "./services/uploadSongs";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    [uploadSongsApi.reducerPath]: uploadSongsApi.reducer,
    player: playerReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shazamApi.middleware)
      .concat(uploadSongsApi.middleware),
});
