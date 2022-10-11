import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import statusReducer from "./statusSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    status: statusReducer,
  },
});
