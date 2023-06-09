import React, { useContext } from 'react'
import { Bookmark, BookmarkAddOutlined, Favorite, FavoriteBorder } from '@mui/icons-material'
import { Avatar,Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import otherUserContext from "../context/otherUserContext/otherUserContext"

const PostCard = (props) => {
  const OtherUserContext = useContext(otherUserContext);
  const {setOtherUserId,fetchOtherUser} = OtherUserContext;
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{margin:"0.3rem 0 0.3rem 0"}}>
        <CardHeader 
          sx={{cursor:"pointer"}}
          onClick={()=>{
            navigate("/users/profile");
            fetchOtherUser(props.post.author.id);
            setOtherUserId(props.post.author.id);
            }}
          avatar={
            <Avatar src={props.post.author.profileUrl} alt={props.post.author.name} sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
            </Avatar>
          }
          // action={
          //   <IconButton >
          //     <Checkbox
          //       // {...label}
          //       icon={<BookmarkAddOutlined />}
          //       checkedIcon={<Bookmark />}
          //     />
          //   </IconButton>
          // }
          title={props.post.author.name}
        //   subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="300"
          image={props.post.postDetails.postUrl}
        />
        <CardContent>
          <Typography variant="p" color="text.secondary">
            {props.post.postDetails.postTextData}
          </Typography> 
          <br />
          <br />
          {props.post.postDetails.postLink !== "" && 
              <Typography variant="p" color="text.secondary">
                Added Link : 
                <a href={props.post.postDetails.postLink}>
                  {props.post.postDetails.postLink}
                </a>
              </Typography>
          }
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />
          </IconButton>
          <IconButton >
              <Checkbox
                // {...label}
                icon={<BookmarkAddOutlined />}
                checkedIcon={<Bookmark />}
              />
            </IconButton>
        </CardActions>
      </Card>  
    </>
  )
}

export default PostCard