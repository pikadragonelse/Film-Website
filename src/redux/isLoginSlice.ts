import { createSlice } from '@reduxjs/toolkit';

export const isLoginSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    accessToken: null,
    username: null,
  },
  reducers: {
    setIslogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setIslogin, setAccessToken, setUsername } = isLoginSlice.actions;
export default isLoginSlice.reducer;
