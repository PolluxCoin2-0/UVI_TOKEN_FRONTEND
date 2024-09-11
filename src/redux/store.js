import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./slice/walletslice";
import slotsReducer from "./slice/SlotsSlice";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// Configuration for persisting walletReducer in session storage
const persistConfigSession = {
  key: "wallet",
  storage: storageSession,
};

// Configuration for persisting slotsReducer in local storage
const persistConfigLocal = {
  key: "slots",
  storage: storageSession,
};

// Persist reducers with their respective configurations
const persistedWalletReducer = persistReducer(persistConfigSession, walletReducer);
const persistedSlotsReducer = persistReducer(persistConfigLocal, slotsReducer);

// Configure store with persisted reducers
const store = configureStore({
  reducer: {
    wallet: persistedWalletReducer,
    slots: persistedSlotsReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
