import React, { useContext, useEffect } from 'react'
import UploadProfileImage from './uploads/UploadProfileImage'
import { Box, Typography } from '@mui/material'
import userContext from '../context/userDetails/userContext'

const ProfileContent = () => {
  const UserContext = useContext(userContext);
  const {user,fetchUser} = UserContext;
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <div>
        <UploadProfileImage/>
        {Object.keys(user).length !== 0 &&
          <Box>
            <Typography variant="p" color="initial">
              Email : {user.email}
            </Typography> <br />
            <Typography variant="p" color="initial">
                Name : {user.userDetails.fName + " " + user.userDetails.lName}
            </Typography>
          </Box>
      }
    </div>
  )
}

export default ProfileContent