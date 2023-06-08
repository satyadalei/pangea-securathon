import { Avatar, Box, Stack } from '@mui/material'
import React, { useContext } from 'react'
import Navbar from '../Navbar'
import LeftSideBar from '../LeftSideBar'
import RightSideBar from '../RightSideBar'
import otherUserContext from '../../context/otherUserContext/otherUserContext'

const OtherUserProfilePage = () => {
  const OtherUserContext = useContext(otherUserContext);
  const {otherUser} = OtherUserContext;
  console.log(otherUser);
  return (
    <div>
      <Box>
      <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between" >
          <LeftSideBar />
          <Box flex={4} >
              {/* Other users profile content will be shown below */}
              <h1>This is user profile page</h1>
              <h1>{otherUser.userDetails.fName} {otherUser.userDetails.fName}</h1>
              <br />
              <Avatar src={otherUser.profileImg.url} >

              </Avatar>
              {/* Other users profile content will be shown above */}
          </Box>
          <RightSideBar />
        </Stack>
      </Box>
    </div>
  )
}

export default OtherUserProfilePage