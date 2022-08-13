import React, { useState } from "react";
import { MyTextField } from "../../Utils/MyTextField";
import { Form, Formik } from "formik";
import * as yup from "yup";

export const OtpPage = () => {
  const [temp, setTemp] = useState(true);
  const validate = yup.object({
    otp: yup.string().required("Required"),
  });
  return (
    <div className="MainLoginPageWrapper m-0 p-0">
      <div className="row justify-content-between m-0 p-0">
        <div className="col-12 otpPageWraper  p-1 pt-2 pb-5 ">
          {temp ? (
            <Formik
              initialValues={{
                newPass: "",
                conPass: "",
              }}
              validationSchema={validate}
            >
              {({ handleSubmit }) => {
                return (
                  <div className="container">
                    <div className="mb-3">
                      <h2 className="mt-2 text-muted">OtpPagePage Form</h2>
                      <p className="text-start p-2">
                        If You Are Forgoten Your Password ,you can reset it here
                      </p>
                    </div>

                    <MyTextField
                      type="text"
                      name="otp"
                      label="Otp"
                      placeholder="Otp..."
                    />

                    <button
                      type="button"
                      className="btn 
              btn-primary col-md-6 mt-2"
                    >
                      Submit
                    </button>
                  </div>
                );
              }}
            </Formik>
          ) : (
            <div className="container">
              <div className="mb-3">
                <h2 className="mt-2 text-muted">Check Your Email</h2>
                <p className="mt-2 text-dark bg-light pt-2">
                  If You Are Forgoten Your Password ,you can reset it here
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

export default OtpPage;
