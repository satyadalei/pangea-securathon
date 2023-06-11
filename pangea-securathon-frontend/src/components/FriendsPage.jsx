import { Box, Button, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import InvitationSentFriends from './friends/InvitationSentFriends'
import AllFriends from './friends/AllFriends'
import FriendRequests from './friends/FriendRequests'
import userContext from '../context/userDetails/userContext'

const FriendsPage = () => {
  const [current, setCurrent] = useState("all-friend");
  const UserContext = useContext(userContext);
  const {fetchUser} = UserContext;
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>
        <Box>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <LeftSideBar />
          <Box flex={4} >
            <Box sx={{margin:"1rem 0 1rem 0"}} >
                <Button onClick={()=>{setCurrent("all-friend")}} 
                variant={current === "all-friend" ? "contained" : "outlined"}
                sx={{marginRight:"1rem"}} >
                  Friends
                </Button>

                <Button onClick={()=>{setCurrent("invitations")}} 
                variant={current === "invitations" ? "contained" : "outlined"}
                sx={{marginRight:"1rem"}} >
                  Invitations
                </Button>
                <Button onClick={()=>{setCurrent("friend-request")}} 
                variant={current === "friend-request" ? "contained" : "outlined"}
                >
                  Frnd Req
                </Button>
            </Box>
            <Box>
              <div id='all-friend' className={` frnd-box ${current === "all-friend" && "active-box"}`}>
                  <AllFriends/>
              </div>

              <div id='invitations' className={`frnd-box ${current === "invitations" && "active-box"}`}>
                 <InvitationSentFriends/>
              </div>

              <div id='friend-request' className={`frnd-box ${current === "friend-request" && "active-box"}`} >
                 <FriendRequests/>
              </div>
            </Box>
          </Box>
          <RightSideBar />
        </Stack>
      </Box>
    </div>
  )
}

export default FriendsPage