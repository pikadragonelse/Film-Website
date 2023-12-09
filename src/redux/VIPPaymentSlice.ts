import { createSlice } from '@reduxjs/toolkit';


const VIPPaymentSlice = createSlice({
  name: 'VIPPayment',
  initialState: {
    subscriptionTypeId: 0,
  },
  reducers: {
    setIdSelectedInfoPackage: (state, action) => {
      state.subscriptionTypeId = action.payload;
    },
   
  },
});

export const { setIdSelectedInfoPackage } = VIPPaymentSlice.actions;

export default  VIPPaymentSlice.reducer ;