import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../../Global.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";
import { useAuth } from "../../Context/auth.js";

function Login() {
  const navigate = useNavigate();
const[auth,setAuth]= useAuth()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Please enter your email";
      }
      if (!values.password) {
        errors.password = "Please enter your password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const login = await axios.post(`${API}/api/user/login`, values);
        if (login && login.data.success) {
          toast.success("Login successful!");
          setAuth({
            ...auth,
            user: login.data.user,
            token: login.data.token,
          });
     localStorage.setItem("auth", JSON.stringify(login.data));
          navigate("/"); 
         
        } else {
          toast.error(login.data.message || "Login failed");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.warn("Please register first");
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    },
  });

  return (
    <div className="auth-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="tab-login" href="#pills-login" role="tab">
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-outline mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="row mb-4">
              <div className="col-md-6 d-flex justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                  <input className="form-check-input" type="checkbox" id="loginCheck" defaultChecked />
                  <label className="form-check-label" htmlFor="loginCheck">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="col-md-6 d-flex justify-content-center">
                <button type="button" className="btn btn-link p-0">
                  Forgot password?
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
