import { Box, Typography } from '@mui/material'
import React from 'react'

const RightSideBar = () => {
  return (
    <>
      <Box flex={2} bgcolor="skyblue" sx={{
        display: {
          xs: "none", sm: "block"
        },
        minHeight:"100vh"
      }}>
        <Box sx={{ position: "fixed" }} >
          <Typography variant='h6' fontWeight={100} >
            Your active Goals
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default RightSideBar