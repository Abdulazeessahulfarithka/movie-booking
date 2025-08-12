import axios from 'axios';
import "./Auth.css";
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from "../../Global.js";
import toast from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = 'Please enter a name';
      if (!values.email) errors.email = 'Please enter an email';
      if (!values.password) errors.password = 'Please enter a password';
      if (!values.phone) errors.phone = 'Please enter a phone number';
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const register = await axios.post(`${API}/api/user/register`, values);
        if (register && register.data.success) {
          toast.success(register.data.success);
          navigate("/login");
        } else {
          toast.error(register.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="auth-container">
      <ul className="nav nav-pills nav-justified mb-3 justify-content-lg-end" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="tab-register" href="#pills-register" role="tab" aria-selected="true">
            Register
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active" id="pills-register" role="tabpanel">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}

            <input
              type="email"
              className="form-control mt-3"
              placeholder="Email"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}

            <input
              type="password"
              className="form-control mt-3"
              placeholder="Password"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}

            <input
              type="tel"
              className="form-control mt-3"
              placeholder="Phone Number"
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-danger">{formik.errors.phone}</div>
            )}

            <button type="submit" className="btn btn-primary btn-block mt-4">
              Register
            </button>

            <div className="text-center mt-3">
              <p>
                Already a member? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
