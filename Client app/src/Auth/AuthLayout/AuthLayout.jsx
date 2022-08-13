import React from "react";

import { Outlet, NavLink } from "react-router-dom";

import { Link } from "react-router-dom";

import "./AuthLayout.css";
import LoginPage from "../LoginPage/LoginPage";
export const AuthLayout = () => {
  return (
    <>
      <div className="row authLayout">
        <div className="col-md-5 p-4 col-sm-12 rightDisplay">
          <h1 className="shadowText">Youtube</h1>
          {/* <LoginPage /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
