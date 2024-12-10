import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    address: "",
    dataObject:{},
    login:false,
    currentSlotNumber:"",
    userSlotNumber:"",
    isUserSR:false,
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
    },
    setCurrentSlotNumber:(state, action) => {
      state.currentSlotNumber = action.payload;
    },
    setUserSlotNumber:(state, action) => {
      state.userSlotNumber = action.payload;
    },
    setIsUserSR: (state, action) => {
      state.isUserSR = action.payload;
    },
  },
});

export const { setWalletAddress, setDataObject, setLogin, setCurrentSlotNumber, setUserSlotNumber, setIsUserSR} = walletSlice.actions;
export default walletSlice.reducer;
