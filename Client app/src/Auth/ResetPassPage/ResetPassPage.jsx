import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { omit } from "lodash";

import { MyTextField } from "../../Utils/MyTextField";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { unwrapResult } from "@reduxjs/toolkit";
import { resetpass } from "../../slices/Auth";

export const ResetPassPage = () => {
  const [temp, setTemp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSucess, setIsSucess] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();

  const dispatch = useDispatch();

  // form validation
  const validate = yup.object({
    password: yup
      .string()
      .min(8, "Password Must Be Atleast 8 Character")
      .max(16, "Password Must Be Less Than 16 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
    newpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  // to submit form
  const handleSubmit = async (data, props) => {
    try {
      setIsError("");
      setIsLoading(true);
      const payload = omit(data, "newpassword");
      const token = searchParam.get("token");
      const resultAction = await dispatch(resetpass({ payload, token }));
      const result = unwrapResult(resultAction);

      setIsSucess(true);
      setIsLoading(false);
      props.resetForm();
    } catch (e) {
      setIsError(e.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="MainLoginPageWrapper m-0 p-0">
      <div className="row justify-content-between m-0 p-0">
        <div className="col-12 resetPageWraper p-1 pt-2 pb-5 ">
          {!isSucess ? (
            <Formik
              initialValues={{
                password: "",
                newpassword: "",
              }}
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => {
                return (
                  <div className="container">
                    <div className="mb-3">
                      <p className="text-start1 p-2">
                        Reset Your Password Here
                      </p>
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
                      name="password"
                      type="password"
                      label="New Password"
                      placeholder="New Password..."
                    />
                    <MyTextField
                      name="newpassword"
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm Password..."
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
                      Become a member ?{" "}
                      <Link to="/signup" className="text-primary">
                        Signup
                      </Link>
                    </p>
                  </div>
                );
              }}
            </Formik>
          ) : (
            <div className="container">
              <div className="mb-3">
                <p className="mt-2 text-start  p-2">
                  Password Updated SuccessFully. Now You Can Login With New
                  Password.
                </p>
                <p className="text-end text-primary">
                  <Link to="/">Back To Login</Link>
                </p>

                <p className="text-center">
                  Become a member ?{" "}
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

export default ResetPassPage;
