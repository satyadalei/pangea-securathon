import React, { useContext, useEffect, useState } from 'react'
import PostCard from './PostCard'
import { Box } from '@mui/material'
import ChooseMode from './ChooseMode'
import userContext from "../context/userDetails/userContext";
import CreatePost from './CreatePost';


const Feeds = () => {
 
  const [posts, setPosts] = useState([]);

  const hostApi = process.env.REACT_APP_API_URL;
   const UserContext = useContext(userContext);
   const {user} = UserContext;
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

    const fetchPosts = async ()=>{
      const url = `${hostApi}/api/posts/fetchPosts`;
      const authToken = localStorage.getItem("authtoken");
      const fetchPost = await fetch(url,{
        method:"GET",
        headers:{
          "authtoken": authToken
        }
      })
      const fetchPostResponse = await fetchPost.json();
      console.log(fetchPostResponse);
      if (fetchPostResponse.msg === "posts send") {
        setPosts(fetchPostResponse.posts);
      }else{
        console.log("There is some error");
      }

    }
    useEffect(() => {
      fetchPosts()
    }, [])
    
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
    <CreatePost/>
    <br></br>
    <br></br>
    <br></br>
    {posts.map((post)=>{
       return (
        <div key={post._id} >
          <PostCard post={post} />
        </div>
       )
    })}
    {/* <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/>
    <PostCard/> */}
  </Box>
  )
}

export default Feeds