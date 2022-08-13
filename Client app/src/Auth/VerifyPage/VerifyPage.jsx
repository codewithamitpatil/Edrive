import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { MyTextField } from "../../Utils/MyTextField";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { accountverification } from "../../slices/Auth";

import { RotatingLines } from "react-loader-spinner";

export const VerifyPage = () => {
  const navigate = useNavigate();
  const { msg } = useParams();
  const [sec, setSec] = useState(false);
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
      const resultAction = await dispatch(accountverification(data));
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
        {sec && (
          <div className="col-12 p-1 pt-2 pb-5 ">
            {!isSucess ? (
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={validate}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit }) => {
                  return (
                    <div className="container forgotPageWraper">
                      <div className="mb-3">
                        <p className="text-start p-2">
                          When you fill in your registered email address, you
                          will be sent verification link to your email address.
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
                  <h2 className="mt-2 success-messageTop  ">
                    Check Your Email
                  </h2>
                  <p className="text-start p-5">
                    Verification link has been send on your registered email id
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
        )}

        {!sec && (
          <div className="container forgotPageWraper">
            <div className="mb-3">
              {msg == "sucess" && (
                <p className="text-start p-5">
                  MyTube will inform you that your account has been successfully
                  verified , now you can signin .
                  <br />
                  If you have any questions, please reply to this email. We
                  always happy to help!
                </p>
              )}
              {msg == "fail" && (
                <p className="text-start error-messageTop p-5">
                  Link Has Been Expired Or Invalid. Account Verification Has
                  been Failed.
                  <button
                    onClick={() => {
                      setSec(true);
                    }}
                    className="btn btn-secondary mt-4"
                  >
                    Send Verification Link
                  </button>
                </p>
              )}
            </div>

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
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
