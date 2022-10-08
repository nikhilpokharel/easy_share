import { createSlice } from "@reduxjs/toolkit";
import {
  initialValueObject,
  initialValueArray,
  initialValueString,
} from "./initialData";

export const userProfile = createSlice({
  name: "userProfile",
  initialState: initialValueObject,
  reducers: {
    getProfile: (state, action) => {
      state.loading = action.payload.loading;
      state.data = action.payload.data;
    },
  },
});

export const userAccount = createSlice({
  name: "userAccount",
  initialState: initialValueArray,
  reducers: {
    getAccount: (state, action) => {
      state.loading = action.payload.loading;
      state.data = action.payload.data;
      state.error = action.payload?.error || false;
      state.errorMessage = action.payload?.errorMessage || "";
    },
    createAccount: (state, action) => {
      state.loading = action.payload.loading;
      Object.entries(action.payload.data).length > 0
        ? (state.data = [action.payload.data, ...state.data])
        : null;
      state.error = action.payload?.error || false;
      state.errorMessage = action.payload?.errorMessage || "";
    },
    updateAccount: (state, action) => {
      let accounts = [...state.data];
      let index = accounts.findIndex(
        (account) => account._id === action.payload.data._id
      );
      index >= 0 ? accounts.splice(index, 1, { ...action.payload.data }) : null;
      state.data = [...accounts];
      state.loading = action.payload.loading;
      state.error = action.payload?.error || false;
      state.errorMessage = action.payload?.errorMessage || "";
    },
    deleteAccount: (state, action) => {
      state.loading = action.payload.loading;
      Object.entries(action.payload.data).length > 0
        ? (state.data = [
            ...state.data.filter(
              (account) => account._id != action.payload.data._id
            ),
          ])
        : null;
      state.error = action.payload?.error || false;
      state.errorMessage = action.payload?.errorMessage || "";
    },
  },
});

export const userPortfolio = createSlice({
  name: "userPortfolio",
  initialState: initialValueObject,
  reducers: {
    getPortfolio: (state, action) => {
      state.loading = action.payload.loading;
      state.data = action.payload.data;
      state.error = action.payload?.error || false;
      state.errorMessage = action.payload?.errorMessage || "";
    },
  },
});

export const userDetails = createSlice({
  name: "userDetails",
  initialState: initialValueObject,
  reducers: {
    getUserDetails: (state, action) => {
      state.loading = action.payload.loading;
      state.data = action.payload.data;
      state.error = action.payload?.error || false;
      state.errorMessage = action.payload?.errorMessage || "";
    },
  },
});

export const userAccountSelection = createSlice({
  name: "userAccountSelection",
  initialState: initialValueString,
  reducers: {
    getSelected: (state) => {
      const getSelected = localStorage.getItem("selected_account");
      state.data = getSelected;
    },
    saveSelected: (state, action) => {
      localStorage.setItem("selected_account", action.payload);
      state.data = action.payload;
    },
  },
});

export const { getProfile } = userProfile.actions;
export const { getAccount, createAccount, updateAccount, deleteAccount } =
  userAccount.actions;
export const { getPortfolio } = userPortfolio.actions;
export const { getUserDetails } = userDetails.actions;
export const { getSelected, saveSelected } = userAccountSelection.actions;

export const userReducer = {
  profile: userProfile.reducer,
  account: userAccount.reducer,
  accountSelect: userAccountSelection.reducer,
  portfolio: userPortfolio.reducer,
  details: userDetails.reducer,
};
