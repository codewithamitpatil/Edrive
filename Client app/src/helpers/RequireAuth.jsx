import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const { role, isLoogedIn } = useSelector((state) => state.auth);

  const location = useLocation();
  //unotherized
  return role && role == allowedRoles ? (
    <Outlet />
  ) : isLoogedIn ? (
    <Navigate to="/unotherized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
