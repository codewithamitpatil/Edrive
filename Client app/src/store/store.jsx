import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/Auth";
import searchReducer from "../slices/Search";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});
