import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import phbReducer from "./phonebook/phbReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ contacts: phbReducer });
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
