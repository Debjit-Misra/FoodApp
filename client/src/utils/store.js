import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice.js";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice,
    cartSlice: cartSlice,
    filterSlice: filterSlice,
    authSlice: authSlice,
  },
});

export default store;
