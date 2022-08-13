import React, { useEffect, useContext, useState, useRef } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

import { unwrapResult } from "@reduxjs/toolkit";

import "./LoginPage.css";

import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import { MyTextField } from "../../Utils/MyTextField";

import useToggle from "../../hooks/useToggle";
import { login } from "../../slices/Auth";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [persist, togglePersist] = useToggle("persist", false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const validate = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required("required"),
  });

  // initialFormValues
  const initialValues = {
    email: "amitwebdev2019@gmail.com",
    password: "amit12345",
  };

  // to submit form
  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      const resultAction = await dispatch(login(data));
      const result = unwrapResult(resultAction);
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (e) {
      setIsLoading(false);
      setIsError(e.message);
      console.log(e);
    }
  };

  return (
    <>
      <div className="MainLoginPageWrapper m-0 p-0">
        <div className="row justify-content-between m-0 p-0">
          <div className="col-md-12 signinPageWraper  p-1 ">
            <Formik
              initialValues={initialValues}
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleSubmit,
                isValid,
                handleChange,
                handleBlur,
                isValidating,
                isSubmitting,
              }) => {
                return (
                  <div className="container col-md-12">
                    <div className="mb-3">
                      <h1 className="mt-2 text-muted">Signin Form</h1>

                      {isError && (
                        <span className="text-left error-messageTop">
                          {isError}
                        </span>
                      )}
                    </div>

                    <MyTextField
                      label="Email"
                      name="email"
                      type="text"
                      placeholder="Email..."
                    />

                    <MyTextField
                      label="Password"
                      name="password"
                      type="text"
                      placeholder="Password..."
                    />

                    {!isLoading && (
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn 
                         btn-primary col-md-6 "
                      >
                        Login
                      </button>
                    )}

                    {isLoading && (
                      <RotatingLines
                        width="60"
                        strokeWidth="4"
                        strokeColor="black"
                        animationDuration="3"
                      />
                    )}
                    <div className="form-check mb-3 mt-4">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          checked={persist}
                          onChange={togglePersist}
                        />{" "}
                        Remember me
                      </label>
                    </div>
                    <p className="text-end text-primary">
                      <Link to="/forgot">Forgot Password</Link>
                    </p>

                    <p className="text-center">
                      Not a member ?{" "}
                      <Link to="signup" className="text-primary">
                        Signup
                      </Link>
                    </p>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
