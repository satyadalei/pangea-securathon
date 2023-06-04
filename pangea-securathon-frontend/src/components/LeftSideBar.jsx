import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleIcon from '@mui/icons-material/People';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const LeftSideBar = () => {
  return (
    <>
       <Box flex={2}  sx={{display:{
      xs : "none", sm : "block",
    }}} >
    <Box sx={{position:"fixed"}} >
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GridViewIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
              <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <SportsScoreIcon />
              </ListItemIcon>
              <ListItemText primary="Goals" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  >
              <ListItemIcon>
                <SettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
    </Box>
    </Box>
    </>
  )
}

export default LeftSideBar