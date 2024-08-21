import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slice/walletslice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

const persistConfig = {
  key: "root",
  storage,
};

const persistedWalletReducer = persistReducer(persistConfig, walletReducer);

const store = configureStore({
  reducer: {
    wallet: persistedWalletReducer,
  },
});

const persistor = persistStore(store);


export { store, persistor };

