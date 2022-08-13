import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "../api/axios";
import { axiosPrivate } from "../api/axios";

//let stateStatus = getAccessToken();
let loadFromLocal = JSON.parse(localStorage.getItem("myData"));
// intial state
const initialState = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
  role: null,
  email: null,
};

// login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const payload = JSON.stringify(data);
      const result = await axios.post("/api/auth/signin", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const decoded = jwtDecode(result?.data?.accessToken);

      let dataDoc = {
        user: decoded,
        accessToken: result?.data?.accessToken,
        refreshToken: result?.data?.refreshToken,
        isLoggedIn: true,
        email: decoded.email,
      };

      localStorage.setItem("myData", JSON.stringify(dataDoc));
      return dataDoc;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// signup
export const signup = createAsyncThunk(
  "/auth/signup",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const payload = JSON.stringify(data);
      const result = await axios.post("/api/auth/signup", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// forogt password
export const forgotpass = createAsyncThunk(
  "auth/forgot",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const payload = JSON.stringify(data);
      const result = await axios.post("/api/auth/forgetpass", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// reset password
export const resetpass = createAsyncThunk(
  "/auth/resetpass",
  async (data, { rejectWithValue }) => {
    try {
      const payload = JSON.stringify(data.payload);
      const token = data?.token;
      const result = await axios.post(`/api/auth/reset/${token}`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      return result?.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e?.response?.data);
    }
  }
);

// send ac verification
export const accountverification = createAsyncThunk(
  "/auth/verifyac",
  async (data, { rejectWithValue }) => {
    try {
      const payload = JSON.stringify(data);
      const result = await axios.post("/api/auth/verifyLink", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });
      return result?.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);

// slice
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log("set auth is called");
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
      };
    },
    setLogout: () => {
      console.log("set logout is called");
      return {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.role = action.payload.user.role;
    },
    [login.rejected]: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      state.role = null;
    },
  },
});

const { reducer } = AuthSlice;
export const { setAuth, setLogout, setPersist } = AuthSlice.actions;
export default reducer;
