import React, { useContext, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext"
import loadingContext from "../context/loading/loadingContext";
import Loading from "./Loading";
import logInContext from "../context/loginStatus/loginContext";
import userContext from "../context/userDetails/userContext";

const Registration = () => {
  const navigate = useNavigate();
  const AlertContext = useContext(alertContext);
  const {setAlert} = AlertContext;

  const LoadingContext = useContext(loadingContext);
  const LoginContext = useContext(logInContext);

  const UserContext = useContext(userContext);
  const {fetchUser} = UserContext;

  const {setLoginStatus} = LoginContext;
  const {setLoading,loading} = LoadingContext;
  const [credentials, setCredentials] = useState({
    fName:"",
    lName:"",
    email:"",
    password:"",
    cPassword:""
  });
  const handleChange = (e)=>{
     setCredentials((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
   })
  }
  const hostApi = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e)=>{
    e.preventDefault();
    // check if cpassword & password are same
    if (credentials.password !== credentials.cPassword) {
       setAlert({
        alertMsg:"Password and confirm password did not matched",
        alertType:"danger"
       })
       
    }else{
      //apply fetch api
      const url = `${hostApi}/api/user/createUser`;
      const {email,fName,lName,password} = credentials;
      setLoading(true)
      const createUser = await fetch(url,{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({email,fName,lName,password})
      })
      const createUserResponse = await createUser.json();
      if (createUserResponse.msg === "new user created") {
        setLoading(false);
        localStorage.setItem("authtoken",createUserResponse.token);
        setLoginStatus(true)
        setAlert({
          alertMsg:"You have successfully registered",
          alertType:"success"
        });
        fetchUser()
        navigate("/dashboard");
      }else if(createUserResponse.msg === "invalid credentials"){
        setLoading(false);
        setAlert({
          alertMsg:createUserResponse.msg + " Password must be atleast 6 character, there must be avalid email",
          alertType:"warning"
        });
      }else if(createUserResponse.msg  === "email breached"){
        setLoading(false);
        setAlert({
          alertMsg:"There is some error creating ur account. "+ createUserResponse.detailMsg ,
          alertType: "danger"
        });
        setCredentials({...credentials, email:""})
      }else if(createUserResponse.msg  === "new user created with breached email"){
        setLoading(false);
        localStorage.setItem("authtoken",createUserResponse.token)
        setAlert({
          alertMsg: createUserResponse.detailMsg ,
          alertType: "warning"
        });
        setCredentials({...credentials, email:""})  ;
        setLoginStatus(true)
        fetchUser();
        navigate("/dashboard");
      }else{
        setLoading(false);
        setAlert({
          alertMsg: "there is some error creating your account" ,
          alertType: "dabger"
        });
        setCredentials({...credentials, email:""})  ;
      }
    }
  }
  return (
    <>
    {loading && <Loading/> }
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
                 {/* fname */}
                 <div className="fname">
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={handleChange} value={credentials.fName} type="text" name="fName" autoComplete="of" required />
                 </div>
                 {/* lName */}
                 <div className="lname">
                    <label htmlFor="firstName">Last Name</label>
                    <input onChange={handleChange} value={credentials.lName} type="text" name="lName" autoComplete="of" required />
                 </div>
              </div>
              {/* email */}
              <div className="email-input my-3">
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} value={credentials.email} type="email" name="email" autoComplete="of" required  />
              </div>
              {/* password */}
              <div className="password-input my-3" id="registration-password-inputs" >
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} value={credentials.password} type="password" name="password" required  />
                </div>
                {/* confirmpassword */}
                <div className="cpassword">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input onChange={handleChange} value={credentials.cPassword} type="password" name="cPassword" required  />
                </div>
              </div>
              <button onClick={handleSubmit} className="login my-2">
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
    </>
  );
};

export default Registration;
