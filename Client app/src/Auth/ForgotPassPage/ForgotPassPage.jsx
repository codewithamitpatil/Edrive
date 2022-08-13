import React, { useState } from "react";
import { MyTextField } from "../../Utils/MyTextField";
import { Formik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { forgotpass } from "../../slices/Auth";

import { RotatingLines } from "react-loader-spinner";

export const ForgotPassPage = () => {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isSucess, setIsSucess] = useState(false);

  const dispatch = useDispatch();

  const validate = yup.object({
    email: yup.string().email("Must Be Valid Email").required("Required"),
  });

  // to submit
  const handleSubmit = async (data, props) => {
    try {
      setIsError("");
      setIsLoading(true);
      const resultAction = await dispatch(forgotpass(data));
      const result = unwrapResult(resultAction);
      props.resetForm();
      setIsSucess(result?.message);
      setIsLoading(false);
    } catch (e) {
      setIsError(e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="MainLoginPageWrapper m-0 p-0">
      <div className="row justify-content-between m-0 p-0">
        <div className="col-12 p-1 pt-2 pb-5 ">
          {!isSucess ? (
            <Formik
              initialValues={{
                email: "amitwebdev2019@gmail.com",
              }}
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => {
                return (
                  <div className="container forgotPageWraper">
                    <div className="mb-3">
                      <p className="text-start p-3">
                        If You Are Forgoten Your Password ,you can reset it here
                        . When you fill in your registered email address, you
                        will be sent instructions on how to reset your password.
                      </p>

                      {isError && (
                        <span className="text-left error-messageTop">
                          {isError}
                        </span>
                      )}
                    </div>

                    <MyTextField
                      name="email"
                      label="Email"
                      placeholder="EmailName..."
                    />

                    {!isLoading && (
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn  btn-primary col-md-6 mt-2"
                      >
                        Submit
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
                      <Link to="/">Back To Login</Link>
                    </p>

                    <p className="text-center">
                      Not a member ?{" "}
                      <Link to="/signup" className="text-primary">
                        Signup
                      </Link>
                    </p>
                  </div>
                );
              }}
            </Formik>
          ) : (
            <div className="container mt-5">
              <div className="mb-3">
                <h2 className="mt-2 success-messageTop  ">Check Your Email</h2>
                <p className="text-start p-5">
                  {/* Check Your Email For Further Instructions ...
                   */}
                  {isSucess}
                </p>

                <p className="text-start text-primary bg-white">
                  <Link to="/">Back To Login</Link>
                </p>

                <p className="text-center">
                  Not a member ?{" "}
                  <Link to="/signup" className="text-primary">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
