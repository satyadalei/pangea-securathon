import React, { useContext, useState } from "react";
import "../css/login-registration.css";
import { Link, useNavigate } from "react-router-dom";
import logInContext from "../context/loginStatus/loginContext";
import alertContext from "../context/alert/alertContext";
import loadingContext from "../context/loading/loadingContext";


const Login = () => {
  const navigate = useNavigate();
  const LogIncontext = useContext(logInContext);
  const {setLoginStatus } = LogIncontext;
  const LoadingContext = useContext(loadingContext);
  const {setLoading} = LoadingContext;
  const AlertContext = useContext(alertContext);
  const {setAlert} = AlertContext;
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setLoginCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const hostApi = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${hostApi}/api/user/loginUser`
    const logInUser = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(loginCredentials)
    })
    const loginResponse = await logInUser.json();
    // console.log(loginResponse);
    if (loginResponse.success && loginResponse.msg === "user logedin") {
      localStorage.setItem("authtoken", loginResponse.token);
      setLoginStatus(true);
      setAlert({
        alertMsg:"You are logedIn successfully",
        alertType:"success"
      });
      navigate("/dashboard")
      setLoading(false);
    } else {
      // give alert message keeping credentials in form
      setAlert({
        alertMsg:loginResponse.msg,
        alertType:"danger"
      })
      setLoading(false);
    }
  }


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
                <input onChange={handleChange} type="email" value={loginCredentials.email} name="email" autoComplete="of" />
              </div>
              <div className="password-input my-3">
                <label htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" value={loginCredentials.password} name="password" />
              </div>
              <p className="forget-password">
                <a href="/">Forget Password?</a>
              </p>
              <button onClick={handleSubmit} className="login my-2">Login</button>
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
