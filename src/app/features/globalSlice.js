import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};
const globalSlice = createSlice({
  name: "globsl",
  initialState,
  reducers: {
    isOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = !state.isOpenCartDrawer;
    },
    onOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = true;
      state.onOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.isOpenCartDrawer = false;
      state.onCloseCartDrawer = false;
    },
  },
});

export default globalSlice.reducer;
export const selectGlobal = ({ global }) => global;
export const {
  isOpenCartDrawerAction,
  onOpenCartDrawerAction,
  onCloseCartDrawerAction,
} = globalSlice.actions;
