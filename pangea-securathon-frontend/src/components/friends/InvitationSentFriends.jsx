import React, { useContext, useEffect } from 'react'
import userContext from "../../context/userDetails/userContext";
import { List } from '@mui/material';
import EachPersonItem from './EachPersonItem';


const InvitationSentFriends = () => {
    const UserContext = useContext(userContext);
    const {user} = UserContext;
   
  return (
    <div>
        <h1>Invitations sent by you</h1>
        <List
                sx={{
                    width: "100%", maxWidth: 360,
                    bgcolor: "background.paper"
                }}
            >
            { Object.keys(user).length !== 0 && user.invitationsSent.length === 0 ? 
            "You have not sent any friend requests yet." :
            Object.keys(user).length !== 0 && user.invitationsSent.map((invitation)=>{
              return (
                <div key={invitation.to} >
                  <EachPersonItem userId={invitation.to} />
                </div>
              )
            })
            }    
            </List>
    </div>
  )
}

export default InvitationSentFriends