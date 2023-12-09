import { createSlice } from '@reduxjs/toolkit';

export interface VideoWatching {
    played: number,
    playedSeconds: number,
    loadedSeconds: number,
}

export const videoWatchingSlice = createSlice({
  name: 'videoWatching',
  initialState: {
    played: 0,
    playedSeconds: 0,
    loadedSeconds: 0,
  },
  reducers: {
    setDataVideoWatching: (state, action) => {
      state.played = action.payload.played;
      state.playedSeconds = action.payload.playedSeconds;
      state.loadedSeconds = action.payload.loadedSeconds;
    },

  },
});

export const { setDataVideoWatching } = videoWatchingSlice.actions;
export default videoWatchingSlice.reducer;
