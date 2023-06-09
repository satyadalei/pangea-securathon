import React, { useContext } from 'react'
import userContext from "../../context/userDetails/userContext";
import { Button, List } from '@mui/material';
import EachPersonItem from './EachPersonItem';

const FriendRequests = () => {
    const UserContext = useContext(userContext);
    const {user} = UserContext;
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
                  <Button variant="outlined" size="small">
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