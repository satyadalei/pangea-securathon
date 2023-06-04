import React, { useContext, useEffect } from "react";
import "../css/home.css";
import landingPageImage from "../images/home-landing-page-img.jpg"
import landingPageRighDemonstartion from "../images/landing-page-right-demonstration.png"
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";
import loginContext from "../context/loginStatus/loginContext";


const Home = () => {
  const navigate = useNavigate();
  const LoginContext = useContext(loginContext);
  const {loginStatus} = LoginContext;
  useEffect(()=>{
    if (loginStatus) {
      navigate("/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loginStatus]);
  return (
    <>
      <div className="home-landing-page-container">
        <div className="main-conatiner">
          <div className="left">
            <img  src={landingPageImage} alt="Be kind" />
          </div>
          <div className="right-hero">
               <div className="right-main-container">
                  <div className="right-illustration">
                    <img src={landingPageRighDemonstartion} alt="" />
                  </div>
                  <div className="description-content">
                      <h1 style={{textAlign:"center",marginBottom:"1rem"}}>Happy You</h1>
                      <p style={{textAlign:"center",marginBottom:"0.5rem"}} >Choose your moode, We will make it better</p>
                      <div className="buttons">
                      <Button sx={{margin:"0rem 0.5rem 0 0.5rem"}}
                      onClick={e=>{navigate("/login")}}  variant="contained">Login</Button>
                      <Button onClick={e=>{navigate("/registration")}}  variant="outlined">Register</Button>
                      </div>
                  </div>
               </div>
          </div>
        </div>
      </div>  
    </>
  );
};

export default Home;