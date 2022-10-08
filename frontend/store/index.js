import { configureStore } from "@reduxjs/toolkit";
import { publicReducer } from "./reducers/publicReducer";
import { userReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    bank_list: publicReducer.bank,
    toggle_menu: publicReducer.menu,
    user: userReducer.profile,
    userAccount: userReducer.account,
    accountSelected: userReducer.accountSelect,
    userPortfolio: userReducer.portfolio,
    userDetails: userReducer.details,
  },
});

export default store;
