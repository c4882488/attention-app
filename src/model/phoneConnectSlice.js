import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mqtt: 0,
    location: 0,
}

export const phoneConnectSlice = createSlice({
  name: "phoneConnect",
  initialState,
  reducers: {
    changeMqtt: (state, status) => {
      state.mqtt = status.payload;
    },
    changeLocation: (state, status) => {
      state.location = status.payload;
    },
  },
});

export const { changeMqtt, changeLocation } = phoneConnectSlice.actions;

export default phoneConnectSlice.reducer;