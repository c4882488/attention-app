import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    circleColor: "#DCD7D7",
    circleSpeed:0.5,
    color:"#FFFFFF",
    title:"執行中...",
    img:0,
    otherImger:"",
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