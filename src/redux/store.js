import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slice/walletslice";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export default store;
