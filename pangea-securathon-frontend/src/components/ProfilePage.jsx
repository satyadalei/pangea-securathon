import { Box, Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import logInContext from "../context/loginStatus/loginContext";
import { useNavigate } from "react-router-dom";
import ProfileContent from "./ProfileContent";
const ProfilePage = () => {
  const LoginContext = useContext(logInContext);
  const { loginStatus } = LoginContext;

  const navigate = useNavigate();
  useEffect(() => {
    if (loginStatus === false) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  return (
    <div>
      <Box>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <LeftSideBar />
          <Box flex={4} >
             <ProfileContent/>
          </Box>
          <RightSideBar />
        </Stack>
      </Box>
    </div>
  );
};

export default ProfilePage;
