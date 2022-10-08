import { createSlice } from "@reduxjs/toolkit";
import { initialValueArray, initialDataBoolean } from "./initialData";

export const bankList = createSlice({
  name: "bankList",
  initialState: initialValueArray,
  reducers: {
    getBankList: (state, action) => {
      state.loading = false;
      state.data = [...action.payload];
    },
  },
});

export const menuToggler = createSlice({
  name: "menuToggle",
  initialState: initialDataBoolean,
  reducers: {
    toggleMenu: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { getBankList } = bankList.actions;
export const { toggleMenu } = menuToggler.actions;

export const publicReducer = {
  bank: bankList.reducer,
  menu: menuToggler.reducer,
};
