import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleIcon from '@mui/icons-material/People';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MoodIcon from '@mui/icons-material/Mood';
import {useLocation, useNavigate } from 'react-router-dom';

const LeftSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
       <Box flex={2}  sx={{display:{
      xs : "none", sm : "block",
    }}} >
    <Box sx={{position:"fixed"}} >
        <List>

          <ListItem className={`${location.pathname === '/dashboard' && 'active-nav-item' }`} onClick={()=>{navigate("/dashboard")}} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GridViewIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          {/* <ListItem className={`${location.pathname === '/friend' && 'active-nav-item' }`}  onClick={()=>{navigate("/friends")}} disablePadding>
            <ListItemButton >
              <ListItemIcon>
              <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem> */}

          {/* <ListItem className={`${location.pathname === '/goals' && 'active-nav-item' }`} onClick={()=>{navigate("/goals")}} disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <SportsScoreIcon />
              </ListItemIcon>
              <ListItemText primary="Goals" />
            </ListItemButton>
          </ListItem> */}
          
          <ListItem className={`${location.pathname === '/profile' && 'active-nav-item' }`} onClick={()=>{navigate("/profile")}} disablePadding>
            <ListItemButton >
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          
          <ListItem className={`${location.pathname === '/trackemotions' && 'active-nav-item' }`} onClick={()=>{navigate("/trackemotions")}} disablePadding>
            <ListItemButton  >
              <ListItemIcon>
                <MoodIcon />
              </ListItemIcon>
              <ListItemText primary="Track Emotions" />
            </ListItemButton>
          </ListItem>

        </List>
    </Box>
    </Box>
    </>
  )
}

export default LeftSideBar