import React, { useContext } from 'react'
import PostCard from './PostCard'
import { Box } from '@mui/material'
import ChooseMode from './ChooseMode'
import userContext from "../context/userDetails/userContext";
const Feeds = () => {
   const UserContext = useContext(userContext);
   const {user} = UserContext;
   console.log(user);
   const today = new Date();
   let usersModeLastUpdated;
   if ( Object.keys(user).length !== 0) {
     if (user.modeLists.length !== 0) {
      usersModeLastUpdated = new Date(user.modeLists[user.modeLists.length-1].lastUpdated) ;
     }
   }
   function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
      );
    }
  return (
    <Box flex={4} >
    {/* check moode is selecetd for today or not - if not selected today then show choosemode box*/}
    { 
      Object.keys(user).length !== 0 && 
       (
        user.modeLists.length === 0 ? 
        <ChooseMode/> : 
        (
          !isSameDate(today,usersModeLastUpdated) && <ChooseMode/>
        ) 
       )
    }
    {/* <ChooseMode/> */}
    <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/>
  </Box>
  )
}

export default Feeds