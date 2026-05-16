import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  volume: 0.7,
  isShuffle: false,
  isRepeat: false, // false, 'all', 'one'
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    setPlayingState: (state, action) => {
      state.isPlaying = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
      // If a track is active, find its matching index location inside the queue layout list
      if (state.currentTrack) {
        state.currentIndex = action.payload.findIndex(
          (track) => track.id === state.currentTrack.id,
        );
      }
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
      state.currentTrack = state.queue[action.payload];
    },
    setVolumeLevel: (state, action) => {
      state.volume = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    toggleRepeat: (state) => {
      if (!state.isRepeat) state.isRepeat = "all";
      else if (state.isRepeat === "all") state.isRepeat = "one";
      else state.isRepeat = false;
    },
    playNextTrack: (state) => {
      if (state.queue.length === 0) return;

      if (state.isShuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.currentIndex = randomIndex;
        state.currentTrack = state.queue[randomIndex];
      } else {
        const nextIndex = state.currentIndex + 1;
        if (nextIndex < state.queue.length) {
          state.currentIndex = nextIndex;
          state.currentTrack = state.queue[nextIndex];
        } else if (state.isRepeat === "all") {
          state.currentIndex = 0;
          state.currentTrack = state.queue[0];
        } else {
          state.isPlaying = false;
        }
      }
    },
    playPreviousTrack: (state) => {
      if (state.queue.length === 0) return;

      const prevIndex = state.currentIndex - 1;
      if (prevIndex >= 0) {
        state.currentIndex = prevIndex;
        state.currentTrack = state.queue[prevIndex];
      } else if (state.isRepeat === "all") {
        state.currentIndex = state.queue.length - 1;
        state.currentTrack = state.queue[state.queue.length - 1];
      }
    },
  },
});

export const {
  setTrack,
  setPlayingState,
  setQueue,
  setCurrentIndex,
  setVolumeLevel,
  toggleShuffle,
  toggleRepeat,
  playNextTrack,
  playPreviousTrack,
} = playerSlice.actions;

export default playerSlice.reducer;
