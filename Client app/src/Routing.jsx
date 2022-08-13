import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import ChangePassPage from "./Auth/ChangePassPage/ChangePassPage";
import ForgotPassPage from "./Auth/ForgotPassPage/ForgotPassPage";
import LoginPage from "./Auth/LoginPage/LoginPage";
import ResetPassPage from "./Auth/ResetPassPage/ResetPassPage";
import SignupPage from "./Auth/SignupPage/SignupPage";
import VerifyOtpPage from "./Auth/VerifyOtpPage/VerifyOtpPage";
import NewPassPage from "./Auth/NewPassPage/NewPassPage";
import OtpPage from "./Auth/OtpPage/OtpPage";

import AuthLayout from "./Auth/AuthLayout/AuthLayout";
//import ProfileLayout from "./Profile/ProfileLayout/ProfileLayout";
import VerifyPage from "./Auth/VerifyPage/VerifyPage";

import HomePage from "./pages/HomePage/HomePage";

import RequireAuth from "./helpers/RequireAuth";

import PersistLogin from "./Utils/PersistLogin";

import LayOut1 from "./LayOuts/LayOut1";

import { useSelector, useDispatch } from "react-redux";

import UploadPage from "./pages/UploadPage/UploadPage";
import DownloadPage from "./pages/DownloadPage/DownloadPage";

export const Routing = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <div className="container-fluid mainBap">
        <Router>
          <Routes>
            {!isLoggedIn && (
              <Route exact path="/" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="forgot" element={<ForgotPassPage />} />
                <Route path="reset" element={<ResetPassPage />} />
                <Route path="verifyotp" element={<VerifyOtpPage />} />
                <Route path="change" element={<ChangePassPage />} />
                <Route path="new" element={<NewPassPage />} />
                <Route path="otp" element={<OtpPage />} />
                <Route path="verify/:msg" element={<VerifyPage />} />
              </Route>
            )}

            {/*  private routes */}
            {
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={"USER"} />}>
                  <Route path="/home" element={<LayOut1 />}>
                    <Route index element={<HomePage />}></Route>
                  </Route>
                  <Route path="/upload" element={<LayOut1 />}>
                    <Route index element={<UploadPage />}></Route>
                  </Route>
                  <Route path="/download" element={<LayOut1 />}>
                    <Route index element={<DownloadPage />}></Route>
                  </Route>
                </Route>
              </Route>
            }

            {/* <Route path="/home" element={<ProfileLayout />}></Route>
             */}
          </Routes>
        </Router>
      </div>
    </>
  );
};
export default Routing;
