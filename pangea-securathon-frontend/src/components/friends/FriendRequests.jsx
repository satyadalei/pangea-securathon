import React, { useContext } from 'react'
import userContext from "../../context/userDetails/userContext";
import { Button, List } from '@mui/material';
import EachPersonItem from './EachPersonItem';
import alertContext from "../../context/alert/alertContext"


const FriendRequests = () => {
    const UserContext = useContext(userContext);
    const {user,fetchUser} = UserContext;

    const AlertContext = useContext(alertContext);
    const {setAlert} = AlertContext;

    const hostApi = process.env.REACT_APP_API_URL;
    const handleApprove = async (id)=>{
      const url = `${hostApi}/api/otherUser/addFriend`;
      //if approve button clicked add the user to his friend list
      const authToken = localStorage.getItem("authtoken");
      const timeStamp = new Date();
      const addFriend = await fetch(url,{
         method:"POST",
         headers:{
            "authtoken":authToken,
            "otheruserid":id,
            "timestamp":timeStamp
         }
      })

      const response = await addFriend.json();
      if(response.msg === "added friend successfully"){
        fetchUser();
        setAlert({
          alertMsg:response.detailMsg,
          alertType:"success"
        })
      }else{
        setAlert({
          alertMsg:response.detailMsg,
          alertType:"danger"
        })
      }
    }

  return (
    <div>
        <h1>This is friend requests page</h1>
        <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {Object.keys(user).length !== 0 && user.friendRequests.length === 0
          ? "You donot have any friends. Make one!"
          : Object.keys(user).length !== 0 &&
            user.friendRequests.map((request) => {
              return (
                <div key={request.sentBy} >
                  <EachPersonItem userId={request.sentBy} />
                  <Button onClick={()=>{handleApprove(request.sentBy)}} variant="outlined" size="small">
                    Approve
                  </Button>
                  <hr />
                </div>
              );
            })}
      </List>
    </div>
  )
}

export default FriendRequests