import React, { useContext } from 'react'
import Navbar from './Navbar'
import { Box, Stack, Typography } from '@mui/material'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import ChooseMode from './ChooseMode'
import userContext from '../context/userDetails/userContext'
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  margin: theme.spacing(1),
  marginLeft: theme.spacing(0),
}));

const TrackEmotionsPage = () => {
  const UserContext = useContext(userContext);
  const { user } = UserContext;

  function convertTolacaldate(dateStamp){
    const date = new Date(dateStamp);
    const localDate = date.toLocaleDateString();
    return localDate
  }
  return (
    <div>
      <Box>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <LeftSideBar />
          <Box flex={4} >
            {/* all modes related data will be here */}
            <ChooseMode />
            {/* all previous modes */}
            <hr></hr>
            <Div sx={{margin:"0.5rem 0 0.5rem 0",color:"#1976D2",fontWeight:"bolder"}} >Your prvious Modes</Div>
            <div>
              {Object.keys(user).length !== 0 ?
                user.modeLists.map((modeDetails, index) => {
                  return (
                    <div key={index} >
                      <Typography sx={{margin:"0.1rem 0 0.1rem 0"}} variant='p' key={index} > 
                        { convertTolacaldate(modeDetails.lastUpdated)} : {modeDetails.mode}
                      </Typography>
                      <hr></hr>
                    </div>
                  )
                })
                : ""}
            </div>
          </Box>
          <RightSideBar />
        </Stack>
      </Box>
    </div>
  )
}

export default TrackEmotionsPage