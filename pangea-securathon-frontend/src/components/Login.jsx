import React from "react";
import "../css/login-registration.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="main-container">
      <div className="left-illustration">
        <div className="illustration-box">
          <h2 style={{ textAlign: "center" }}>
            This is your happy <br /> space
          </h2>
          <div className="illustration-img">
            <img src="" alt="An illustraion of happy environment" />
          </div>
        </div>
      </div>
      <div className="right-form">
        <div className="form-box">
          <div className="logo m-2">Happy You</div>
          <h3 className="my-2 text-center">Hey! Welcome Back</h3>
          <div className="actual-form">
            <form>
              <div className="email-input my-3">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" autoComplete="off" />
              </div>
              <div className="password-input my-3">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
              </div>
              <p className="forget-password">
                <a href="/">Forget Password?</a>
              </p>
              <button className="login my-2">Login</button>
            </form>
            <p className="register my-2">
              Is this your first time?
              <Link to="/registration">Register Now!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
