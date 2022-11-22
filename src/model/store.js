import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import statusReducer from "./statusSlice";
import phoneConnectReducer from "./phoneConnectSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    status: statusReducer,
    phoneConnec: phoneConnectReducer,
  },
});
