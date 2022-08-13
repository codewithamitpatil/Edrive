import React, { useState } from "react";
import { MyTextField } from "../../Utils/MyTextField";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { omit } from "lodash";
export const NewPassPage = () => {
  const [temp, setTemp] = useState(true);

  const validate = yup.object({
    newPass: yup
      .string()
      .min(8, "Password Must Be Atleast 8 Character")
      .max(16, "Password Must Be Less Than 16 Characters")
      .required("Required"),
    conPass: yup
      .string()
      .oneOf([yup.ref("newPass"), null], "Passwords must match")
      .required("Required"),
  });

  // to submit
  const handleSubmit = async (data) => {
    try {
      data = omit(data, "conpassword");
      data.role = "USER";
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="MainLoginPageWrapper m-0 p-0">
        <div className="row justify-content-between m-0 p-0">
          <div className="col-12 newPageWraper p-1 pt-2 pb-5 ">
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
                        <h2 className="mt-2 text-muted">New Password Form</h2>
                        <p className="text-start p-2">
                          Set Your New Password Here
                        </p>
                      </div>
                      <MyTextField
                        name="newPass"
                        type="password"
                        label="New Password"
                        placeholder="New Password..."
                      />
                      <MyTextField
                        name="conPass"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm Password..."
                      />
                      <button
                        type="button"
                        className="btn  btn-primary col-md-6 mt-2"
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
                    New Password Set SuccessFully. Now You Can Login
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </>
  );
};

export default NewPassPage;
