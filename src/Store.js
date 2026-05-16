import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import playerReducer from "./PlayerSlice";
import playlistReducer from "./PlaylistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    playlist: playlistReducer,
  },
  // Prevents serialization errors with Howler instances
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
