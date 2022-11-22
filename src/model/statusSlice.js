import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  circleColor: "#2C7BF6",
  circleSpeed: 0.5,
  color: "#3E82D0",
  title: "連接中...",
  img: 1,
  otherImger: "",
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      const { color, title, img } = action.payload;
      state.circleColor = color.circleColor;
      state.color = color.color;
      state.img = img;
      state.title = title;
    },
    changeOtherImage: (state, action) => {
      state.otherImger = action.payload;
    },
  },
});

export const { changeStatus, changeOtherImage } = statusSlice.actions;

export default statusSlice.reducer