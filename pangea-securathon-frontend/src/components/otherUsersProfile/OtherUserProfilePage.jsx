import { Box, Stack } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar'
import LeftSideBar from '../LeftSideBar'
import RightSideBar from '../RightSideBar'

const OtherUserProfilePage = () => {
  return (
    <div>
      <Box>
      <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between" >
          <LeftSideBar />
          <Box flex={4} >
              {/* Other users profile content will be shown below */}
              <h1>This is user profile page</h1>
              {/* Other users profile content will be shown above */}
          </Box>
          <RightSideBar />
        </Stack>
      </Box>
    </div>
  )
}

export default OtherUserProfilePage