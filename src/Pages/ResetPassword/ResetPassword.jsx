import React, { useState } from "react";
import "./ResetPassword.module.css";
import { Audio } from "react-loader-spinner";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
export default function ResetPassword() {
  const [emailLoad, setEmailLoad] = useState(false);
  const [codeLoad, setcodeLoad] = useState(false);
  const [resetLoad, setresetLoad] = useState(false);
  const [resetPassword, setresetPassword] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const submitEmail = ({ email }) => {
    console.log(email);
    setEmailLoad(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((res) => {
        console.log(res);
        setIsSubmited(true);
      })
      .always(() => {
        setEmailLoad(false);
      });
  };
  const submitCode = ({ code }) => {
    setcodeLoad(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: code,
      })
      .then((res) => {
        console.log(res);
        setCodeSuccess(true);
      })
      .always(() => {
        setcodeLoad(false);
      });
  };
  const submitResetPassword = ({ email, password }) => {
    setresetLoad(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword: password,
      })
      .then((res) => {
        setresetPassword(true);
        console.log(res);
      })
      .always(() => {
        setresetLoad(false);
      });
  };

  let UpdatePasswordScehma = Yup.object({
    email: Yup.string().required().email(),

    password: Yup.string()
      .required()
      .matches(/[A-Z][a-z0-9]{3,}/, "password is invalid"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitResetPassword,
    UpdatePasswordScehma,
  });
  let emailScehma = Yup.object({
    email: Yup.string().required().email(),
  });
  let emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submitEmail,
    emailScehma,
  });
  let code = Yup.object({
    email: Yup.string().required(),
  });
  let codeFormik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: submitCode,
    code,
  });

  return (
    <>
      {!isSubmited && (
        <div className="d-flex justify-content-center">
          <form action="" className="w-50" onSubmit={emailFormik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                value={emailFormik.values.email} //change value
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
                type="email"
                name="email" //lazm nafs el esm fe initial values
                id="email"
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />

              {emailFormik.errors.email && emailFormik.touched.email && (
                <div className="alert alert-danger">
                  {emailFormik.errors.email}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                disabled={!emailFormik.isValid}
                className="btn bg-main"
              >
                {emailLoad ? (
                  <Audio
                    height="50"
                    width="50"
                    color="#fff"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      {isSubmited && !codeSuccess && (
        <>
          <div className="d-flex justify-content-center">
            <form action="" className="w-50" onSubmit={codeFormik.handleSubmit}>
              <h3>A code has been sent to your email successfully</h3>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Code
                </label>
                <input
                  value={codeFormik.values.code} //change value
                  onChange={codeFormik.handleChange}
                  onBlur={codeFormik.handleBlur}
                  type="code"
                  name="code" //lazm nafs el esm fe initial values
                  id="code"
                  className="form-control"
                  placeholder=""
                  aria-describedby="helpId"
                />

                {codeFormik.errors.code && codeFormik.touched.code && (
                  <div className="alert alert-danger">
                    {codeFormik.errors.code}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  disabled={!codeFormik.isValid}
                  className="btn bg-main"
                >
                  {codeLoad ? (
                    <Audio
                      height="50"
                      width="50"
                      color="#fff"
                      ariaLabel="audio-loading"
                      wrapperStyle={{}}
                      wrapperClass="wrapper-class"
                      visible={true}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {isSubmited && codeSuccess && !resetPassword && (
        <div className="d-flex justify-content-center">
          <form action="" className="w-50" onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Email
              </label>
              <input
                value={formik.values.email} //change value
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                name="email" //lazm nafs el esm fe initial values
                id="email"
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />

              {formik.errors.email && formik.touched.email && (
                <div className="alert alert-danger">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="" className="form-label">
                New password
              </label>
              <input
                value={formik.values.password} //change value
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="password" //lazm nafs el esm fe initial values
                id="password"
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
              />

              {formik.errors.password && formik.touched.password && (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="btn bg-main"
              >
                {resetLoad ? (
                  <Audio
                    height="50"
                    width="50"
                    color="#fff"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      {isSubmited && codeSuccess && resetPassword && (
        <>
          <h1 className="text-center">
            your Password has been reset successfully
          </h1>
          <h3 className="text-center">
            <Link to={"/login"}>Go To Login</Link>
          </h3>
        </>
      )}
    </>
  );
}
