import React from 'react'
import PostCard from './PostCard'
import { Box } from '@mui/material'
import ChooseMode from './ChooseMode'

const Feeds = () => {
  return (
    <Box flex={4} >
    <ChooseMode/>
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