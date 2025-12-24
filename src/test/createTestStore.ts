import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import itemsReducer from "../features/items/itemsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
});

export const createTestStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (gdm) => gdm({ serializableCheck: false }),
  });

export type TestStore = ReturnType<typeof createTestStore>;
