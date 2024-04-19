import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { Axios } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setUserToken } = useContext(UserContext);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  //YUP validation

  let validationSchema = Yup.object({
    email: Yup.string().required().email(),

    password: Yup.string()
      .required()
      .matches(/[A-Z][a-z0-9]{3,}/, "password is invalid"),
  });

  let navigate = useNavigate();
  async function submitLoginForm(values) {
    // console.log(values);
    setLoader(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setLoader(false);
        setError(err.response.data.message);
      });

    // console.log(data);
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      setLoader(false);
      setError(null);
      navigate("/");
      window.location.reload();
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",

      password: "",
    },
    onSubmit: submitLoginForm,
    validationSchema,
  });
  return (
    <div className="w-75 mx-auto p-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h1>Login Now :</h1>

      <form action="" onSubmit={formik.handleSubmit}>
        <div class="mb-3">
          <label for="" class="form-label">
            Email
          </label>
          <input
            value={formik.values.email} //change value
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email" //lazm nafs el esm fe initial values
            id="email"
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />

          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}
        </div>

        <div class="mb-3">
          <label for="" class="form-label">
            Password
          </label>
          <input
            value={formik.values.password} //change value
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password" //lazm nafs el esm fe initial values
            id="password"
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />

          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            disabled={!formik.isValid}
            className="btn bg-main"
          >
            {loader ? (
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
          <Link to={"/resetPassword"}>Forgot Password ?</Link>
        </div>
      </form>
    </div>
  );
}
