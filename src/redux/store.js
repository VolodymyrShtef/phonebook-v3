import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import phbReducer from "./phonebook/phbReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({ contacts: phbReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);

// const rootReducer = combineReducers({ contacts: phbReducer });
// ще розберися з обєктом у редусері
// const rootReducer = combineReducers({ contacts: phbReducer });
// const store = configureStore({ reducer: rootReducer });

// export default store;
