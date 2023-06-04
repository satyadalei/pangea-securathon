import React from 'react'
import { Bookmark, BookmarkAddOutlined, Favorite, FavoriteBorder } from '@mui/icons-material'
import { Avatar,Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
const PostCard = () => {
  return (
    <>
      <Card sx={{margin:"0.3rem 0 0.3rem 0"}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton >
              <Checkbox
                // {...label}
                icon={<BookmarkAddOutlined />}
                checkedIcon={<Bookmark />}
              />
            </IconButton>
          }
          title="Shrimp Mark"
        //   subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="300"
          image="https://images.pexels.com/photos/16952093/pexels-photo-16952093/free-photo-of-young-woman-in-a-hat-against-a-clear-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />
          </IconButton>
          <IconButton aria-label="share">
            {/* <ShareIcon /> */}
          </IconButton>
        </CardActions>
      </Card>  
    </>
  )
}

export default PostCard