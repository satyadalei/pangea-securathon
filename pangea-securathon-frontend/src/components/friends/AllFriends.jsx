import { Button, List } from "@mui/material";
import React, { useContext } from "react";
import EachPersonItem from "./EachPersonItem";
import userContext from "../../context/userDetails/userContext";

const AllFriends = () => {
  const UserContext = useContext(userContext);
  const { user } = UserContext;
  return (
    <div>
      <h1>All your friends.</h1>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {Object.keys(user).length !== 0 && user.friendListIds.length === 0
          ? "You donot have any friends. Make one!"
          : Object.keys(user).length !== 0 &&
            user.friendListIds.map((id) => {
              return (
                <div key={id} >
                  <EachPersonItem userId={id} />
                  <hr />
                </div>
              );
            })}
      </List>
    </div>
  );
};

export default AllFriends;
