import { Box, Typography } from '@mui/material'
import React from 'react'

const RightSideBar = () => {
  return (
    <>
      <Box flex={2}  sx={{
        display: {
          xs: "none", sm: "block"
        }
      }}>
        <Box sx={{ position: "fixed" }} >
          {/* <Typography variant='h6' fontWeight={100} >
            Your active Goals
          </Typography> */}
        </Box>
      </Box>
    </>
  )
}

export default RightSideBar