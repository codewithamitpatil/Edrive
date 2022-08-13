import React, { useState } from "react";
import * as yup from "yup";

import { Link } from "react-router-dom";
import { omit } from "lodash";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { unwrapResult } from "@reduxjs/toolkit";

import "./SignupPage.css";

import { MyTextField } from "../../Utils/MyTextField";

import { signup } from "../../slices/Auth";
import { motion } from "framer-motion";
export const SignupPage = () => {
  const [isError, setIsError] = useState("");
  const [isSucess, setIsSucess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState();

  const dispatch = useDispatch();

  //validation
  const validate = yup.object({
    uname: yup
      .string()
      .max(10, "Username Must be less than 10 Characters")
      .required("Required"),
    email: yup.string().email("Must Be A Valid Email").required("Required"),
    password: yup
      .string()
      .min(8, "Password Must Be Minimum 8 Character Long")
      .max(16, "Password Can Not Be More Than 16 Character")
      .required("Required"),
    conpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  // to submit
  const handleSubmit = async (data, onSubmitProps) => {
    try {
      setIsError("");
      setIsSucess("");
      setIsLoading(true);

      const payload = omit(data, "conpassword");

      const resultAction = await dispatch(signup(payload));
      const result = unwrapResult(resultAction);

      // for sucess
      setIsSucess(result.message);
      // to empty values
      onSubmitProps.resetForm();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsError(e.message);
      console.log(e);
    }
  };

  return (
    <motion.div
      className="container-fluid "
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="MainLoginPageWrapper  m-0 p-0">
        <div className="row justify-content-between m-0 p-0">
          <div className="col-12  p-1 pt-0">
            <Formik
              initialValues={{
                uname: "",
                email: "",
                password: "",
                conpassword: "",
              }}
              validationSchema={validate}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ handleSubmit, handleReset }) => {
                return (
                  <div className="container signupPageWraper">
                    <div className="mb-3">
                      <h1 className=" text-muted">Signup Here!</h1>

                      {isError && (
                        <span className="text-left error-messageTop">
                          {isError}
                        </span>
                      )}
                      {isSucess && (
                        <span className="text-left success-messageTop">
                          {isSucess}
                        </span>
                      )}
                    </div>
                    <MyTextField
                      name="uname"
                      placeholder="Username..."
                      label="Username"
                      type="text"
                    />
                    <MyTextField
                      name="email"
                      placeholder="Email..."
                      label="Email"
                      type="text"
                    />
                    <MyTextField
                      name="password"
                      placeholder="Password..."
                      label="Password"
                      type="text"
                    />
                    <MyTextField
                      name="conpassword"
                      placeholder="Confirm Password..."
                      label="Confirm Password"
                      type="text"
                    />

                    {!isLoading && (
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn 
                         btn-primary col-md-6 "
                      >
                        Signup
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

                    <p className="text-end text-primary">
                      <Link to="/forgot">Forgot Password</Link>
                    </p>

                    <p className="text-center">
                      Have a member ?&nbsp;
                      <Link to="/" className="text-primary">
                        Signin
                      </Link>
                    </p>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
