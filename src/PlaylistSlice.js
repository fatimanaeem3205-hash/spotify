import { createSlice } from "@reduxjs/toolkit";
import { mockSongs } from "./MockSongs";

const initialState = {
  playlists: [
    { id: "p1", title: "Pink Chill Beats", tracks: mockSongs },
    { id: "p2", title: "Vaporwave Horizon", tracks: mockSongs },
  ],
  albums: [
    {
      id: "a1",
      title: "Cyber Resonance",
      artist: "SynthWave Pulse",
      cover:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500",
    },
    {
      id: "a2",
      title: "Outrun Legend",
      artist: "Retro Shifter",
      cover:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500",
    },
  ],
  likedTrackIds: [1],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    toggleLikeTrack: (state, action) => {
      const trackId = action.payload;
      if (state.likedTrackIds.includes(trackId)) {
        state.likedTrackIds = state.likedTrackIds.filter(
          (id) => id !== trackId,
        );
      } else {
        state.likedTrackIds.push(trackId);
      }
    },
  },
});

export const { toggleLikeTrack } = playlistSlice.actions;
export default playlistSlice.reducer;
