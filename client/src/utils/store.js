import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSllice";

const store = configureStore({
  reducer: {
    toggleSlice: toggleSlice,
  },
});

export default store;
