import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "../api/axios";
import { axiosPrivate } from "../api/axios";

// intial state
const initialState = {
  searchResult: ["Channel", "CodingLab", "CodingNepal"],
  searchQuery: "",
  isError: "",
  isLoading: false,
  isSuccess: false,
};

// slice
const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    isLoading: (state, action) => {
      console.log(" search loading");
      return {
        ...state,
        searchQuery: "",
        isError: "",
        isLoading: true,
        isSuccess: false,
      };
    },
    isSuccess: (state, action) => {
      console.log(" search success");
      return {
        ...state,
        searchResult: action.payload,
        searchQuery: "",
        isError: "",
        isLoading: false,
        isSuccess: true,
      };
    },
    isError: (state, action) => {
      console.log(" search success");
      return {
        ...state,
        searchResult: [],
        searchQuery: "",
        isError: action.payload,
        isLoading: false,
        isSuccess: false,
      };
    },
  },
});

const { reducer } = SearchSlice;
export const { isLoading, isSuccess, isError } = SearchSlice.actions;
export default reducer;
