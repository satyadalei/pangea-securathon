import React from "react";
import {Link } from "react-router-dom";
const Registration = () => {
  return (
    <div className="main-container">
      <div className="left-illustration">
        <div className="illustration-box">
          <h2 style={{ textAlign: "center" }}>
            A happy space is a <br />
            free space!
          </h2>
          <div className="illustration-img">
            <img src="" alt="An illustraion of happy environment" />
          </div>
        </div>
      </div>
      <div className="right-form">
        <div className="form-box">
        {/* Logo */}
          <div className="logo m-2">Happy You</div>
          <h3 className="my-2 text-center">
             Register to join us now :)
          </h3>
          <div className="actual-form">
            <form>
             <div className="name-input my-3">
                 <div className="fname">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="fName" autoComplete="off"/>
                 </div>
                 <div className="lname">
                    <label htmlFor="firstName">Last Name</label>
                    <input type="text" name="lName" autoComplete="off"/>
                 </div>
              </div>
              <div className="email-input my-3">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" autoComplete="off" />
              </div>
              <div className="password-input my-3" id="registration-password-inputs" >
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <div className="cpassword">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="cpassword" />
                </div>
              </div>
              <button className="login my-2">
                Register
              </button>
            </form>
            <p className="register my-2">
              Already Registered? 
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
