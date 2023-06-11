import { Avatar, Box, Checkbox, IconButton, Stack } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import LeftSideBar from '../LeftSideBar'
import RightSideBar from '../RightSideBar'
import otherUserContext from '../../context/otherUserContext/otherUserContext'
import Loading from '../Loading'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import alertContext from "../../context/alert/alertContext";
const OtherUserProfilePage = () => {
  const OtherUserContext = useContext(otherUserContext);
  const { otherUser } = OtherUserContext;

  const AlertContext = useContext(alertContext);
  const {setAlert} = AlertContext;


  const hostApi = process.env.REACT_APP_API_URL;
  const handleFreindRequest = async () => {
    console.log("hello");
    const url = `${hostApi}/api/otherUser/sendFriendRequest`;
    const authToken = localStorage.getItem("authtoken");
    //handle request 
    const now = new Date();
    const handleRequest = await fetch(url, {
      method: "POST",
      headers: {
        "authtoken": authToken,
        "otheruserid": otherUser._doc._id,
        "timestamp": now
      }
    });
    const response = await handleRequest.json();
    if (response.success) {
      setAlert({
        alertMsg:"Friend Request sent successfully",
        alertType:"success"
      })
    }
  }
  console.log(otherUser.isFreiend);
  return (
    <div>
      {Object.keys(otherUser).length === 0 && <Loading />}
      <Box>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between" >
          <LeftSideBar />
          <Box flex={4} p={3}>
            {/* Other users profile content will be shown below */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }} >
              {
                Object.keys(otherUser).length !== 0 && <Avatar sx={{ width: 150, height: 150 }} src={otherUser._doc.profileImg.url} />
              }
            </div>
            <hr />
            <h5 style={{ textAlign: "center" }} >
              {Object.keys(otherUser).length !== 0 &&
                <>
                  {otherUser._doc.userDetails.fName} {otherUser._doc.userDetails.lName}
                </>
              }
            </h5>
            <p style={{ textAlign: "center", marginBottom: "0" }}>
              {Object.keys(otherUser).length !== 0 &&
                <>
                  {otherUser._doc.email}
                </>
              }
            </p>
            {/* friend request button */}
            {
              otherUser.isFriend === false &&
              (<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
              {/* this dive will be show if not frind */}
                <IconButton aria-label="add to favorites">
                  {otherUser.isRequestSent ? <HowToRegIcon sx={{ color: "green" }} /> :
                    <div onClick={handleFreindRequest} >
                      <Checkbox
                        icon={<PersonAddIcon/>}
                        checkedIcon={<HowToRegIcon sx={{ color: "green" }} />}>
                      </Checkbox>
                    </div>
                  }
                </IconButton>
                <p style={{ marginBottom: "0" }} >
                {otherUser.isRequestSent ? "freiend request already sent" :
                   "Send Freiend Request"
                }
                </p>
              </div>)
            }
            {/* users posts */}
            <hr />
            {/* Other users profile content will be shown above */}
          </Box>
          <RightSideBar />
        </Stack>
      </Box>
    </div>
  )
}

export default OtherUserProfilePage