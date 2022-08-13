import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios, { axiosPrivate } from "../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../slices/Auth";
import jwtDecode from "jwt-decode";

export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await axiosPrivate.post("/api/auth/refresh", {});
    const decoded = jwtDecode(response.data.accessToken);
    const data = {
      role: response.data.role,
      accessToken: response.data.accessToken,
      user: decoded,
    };
    dispatch(setAuth(data));
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
