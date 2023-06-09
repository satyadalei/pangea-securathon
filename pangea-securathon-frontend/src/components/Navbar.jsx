import React, { useContext, useEffect, useState } from "react";
import { AppBar, Avatar, Badge, Box, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InputBase from '@mui/material/InputBase';
import { Mail, Notifications } from "@mui/icons-material";
import userContext from '../context/userDetails/userContext'
import { useLocation, useNavigate } from "react-router-dom";
import loginContext from "../context/loginStatus/loginContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Search = styled("div")(
  ({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "5px",
    width: "40%"
  })
)
const Icons = styled(Box)(
  ({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px"
  })
)

const UserBox = styled(Box)(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px"
  })
)

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const UserContext = useContext(userContext);
  const { user, setUser, fetchUser } = UserContext;

  const LoginContext = useContext(loginContext);
  const {setLoginStatus} = LoginContext; 

  const [open, setOpen] = useState(false);
  
  const logOut = ()=>{
    localStorage.clear();
    setLoginStatus(false);
    navigate("/")
  }

  return (
    <AppBar position="sticky">
      <StyledToolbar sx={{margin:"0.2rem"}} >
        <Typography variant="h6">
          Happy You &nbsp;
        <InsertEmoticonIcon />
        </Typography>
        {/* <Search >
          <InputBase fullWidth placeholder="Search.." />
        </Search> */}
        <Icons sx={{ display: { xs: "none", sm: "flex" } }} >
          {/* <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={3} color="error">
            <Notifications />
          </Badge> */}
          <Typography variant="div" sx={{ display: "block" }} >
            {Object.keys(user).length === 0 ? "" : user.userDetails.fName + " " + user.userDetails.lName}
          </Typography>
          <Avatar sx={{ width: "30", height: "30" }}
            alt={Object.keys(user).length === 0 ? "" : user.userDetails.fName}
            src={Object.keys(user).length === 0 ? "" : user.profileImg ? user.profileImg.url : ""}
            onClick={e => { setOpen(true) }} />
        </Icons>
        <UserBox onClick={e => { setOpen(true) }} sx={{ display: { xs: "flex", sm: "none" } }} >
          <Typography variant="div" sx={{ display: "block" }} >
            {Object.keys(user).length === 0 ? "" : user.userDetails.fName}
          </Typography>
          <Avatar sx={{ width: "30", height: "30", marginRight:"0.4rem"}}
            // to check whether there is empty object or not -> coz if is is empty object then user.userDetails.fName can not be accessed
            alt={Object.keys(user).length === 0 ? "" : user.userDetails.fName}
            src={Object.keys(user).length === 0 ? "" : user.profileImg ? user.profileImg.url : ""}
          />
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e => { setOpen(false) }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          className={`${location.pathname === '/dashboard' && 'active-nav-item-mob'}`}
          onClick={() => { navigate("/dashboard") }} >
          Dashboard
        </MenuItem>

        <MenuItem
          className={`${location.pathname === '/profile' && 'active-nav-item-mob'}`}
          onClick={() => { navigate("/profile") }} >
          Profile
        </MenuItem>

        <MenuItem
          className={`${location.pathname === '/trackemotions' && 'active-nav-item-mob'}`}
          onClick={() => { navigate("/trackemotions") }} >
          Track Emotions
        </MenuItem>

        <MenuItem
          className={`${location.pathname === '/friends' && 'active-nav-item-mob'}`}
          onClick={() => { navigate("/friends") }} >
          Friends
        </MenuItem>

        <MenuItem onClick={() => { logOut() }} >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
