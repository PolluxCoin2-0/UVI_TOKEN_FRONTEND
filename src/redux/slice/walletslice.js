import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: "",
    dataObject:{},
    login:false,
  },
  reducers: {
    setWalletAddress: (state, action) => {
      state.address = action.payload;
    },
    setDataObject: (state, action) => {
      state.dataObject = action.payload;
    },
    setLogin:(state, action) => {
      state.login = action.payload;
    }
  },
});

export const { setWalletAddress, setDataObject, setLogin } = walletSlice.actions;
export default walletSlice.reducer;
