import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: "",
    dataObject:{},
  },
  reducers: {
    setWalletAddress: (state, action) => {
      state.address = action.payload;
    },
    setDataObject: (state, action) => {
      state.dataObject = action.payload;
    },
  },
});

export const { setWalletAddress, setDataObject } = walletSlice.actions;
export default walletSlice.reducer;
