import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

import { useSelector } from "react-redux";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  //const { auth } = useAuth();
  console.log("persist loging is called");
  const auth = useSelector((state) => state.auth);

  const [persist] = useLocalStorage("persist", true);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        console.log("verif y called");
        await refresh();
      } catch (e) {
        console.log(e);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, [auth]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
