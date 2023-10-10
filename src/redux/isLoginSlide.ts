import { createSlice } from '@reduxjs/toolkit';

const isLoginSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: true, 
  },
  reducers: {
    setIslogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setIslogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;