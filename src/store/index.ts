import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import itemsReducer from "../features/items/itemsSlice";
import createDebugMiddleware from "./middlewares/debugMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: import.meta.env.DEV,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>{
    const base = getDefaultMiddleware({ serializableCheck: false });

    return import.meta.env.MODE === "development" ? base.concat(createDebugMiddleware()) : base;
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
