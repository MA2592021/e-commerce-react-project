import React, { useState } from "react";
import "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

export default function Register() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  //native validation

  // function validateForm(values) {
  //   console.log(values);

  //   let errors = {};
  //   let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   let phoneRegex = /^(?:\+?20)?1[0-9]{9}$/;
  //   let passwordRegex = /[A-Z][a-z0-9]{3,}/;

  //   if (values.name === "") {
  //     errors.name = "Name is Required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name must be at least 3 characters";
  //   }

  //   if (values.email === "") {
  //     errors.email = "Email is required";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "Email is invalid";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required";
  //   } else if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "phone is invalid";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (!passwordRegex.test(values.password)) {
  //     errors.password = "password is invalid";
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "repassword is required";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "repassword doesn't match password";
  //   }

  //   return errors;
  // }

  //YUP validation

  let validationSchema = Yup.object({
    name: Yup.string().required("name is required").min(3),
    email: Yup.string().required().email(),
    phone: Yup.string()
      .required()
      .matches(/^(?:\+?0)?1[0-9]{9}$/, "phone number is invalid"),
    password: Yup.string()
      .required()
      .matches(/[A-Z][a-z0-9]{3,}/, "password is invalid"),
    rePassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "repassword doesn't match password"),
  });

  let navigate = useNavigate();
  async function submitRegisterForm(values) {
    // console.log(values);
    setLoader(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setLoader(false);
        setError(err.response.data.message);
      });

    // console.log(data);
    if (data.message === "success") {
      setLoader(false);
      setError(null);
      navigate("/login");
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: submitRegisterForm,
    validationSchema,
  });
  return (
    <div className="w-75 mx-auto p-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h1>Register Now :</h1>

      <form action="" onSubmit={formik.handleSubmit}>
        <div class="mb-3">
          <label for="" class="form-label">
            Name
          </label>
          <input
            value={formik.values.name} //change value
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name" //lazm nafs el esm fe initial values
            id="name"
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />

          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger">{formik.errors.name}</div>
          )}
        </div>

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
            Phone
          </label>
          <input
            value={formik.values.phone} //change value
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone" //lazm nafs el esm fe initial values
            id="phone"
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />

          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger">{formik.errors.phone}</div>
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

        <div class="mb-3">
          <label for="" class="form-label">
            Re-Password
          </label>
          <input
            value={formik.values.rePassword} //change value
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword" //lazm nafs el esm fe initial values
            id="rePassword"
            class="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          )}
        </div>

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
      </form>
    </div>
  );
}

