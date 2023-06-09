import { Avatar, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const EachPersonItem = (props) => {
    // fetch user by id & show data
    const hostApi = process.env.REACT_APP_API_URL;
    const [otherUserById, setOtherUserById] = useState({
        name: "",
        profileUrl: ""
    });
    const fetchOtherUserById = async () => {
        const url = `${hostApi}/api/otherUser/smallDetails`;
        const authToken = localStorage.getItem("authtoken");
        const fetchOtherUserByIds = await fetch(url, {
            method: "GET",
            headers: {
                "authtoken": authToken,
                "otheruserid": props.userId
            }
        })
        const response = await fetchOtherUserByIds.json();
        console.log(response);
        if (response.msg === "user data sent") {
            setOtherUserById({
                name: response.smallDetails.name,
                img: response.smallDetails.profileImageUrl
            })
        }
    }
    useEffect(() => {
        fetchOtherUserById();
    }, [])
    return (
        <>
            <div >
            <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} alignItems="flex-start">
                <ListItemAvatar>
                    {otherUserById.name === "" ?
                        <Skeleton variant="circular" width={40} height={40} /> :
                        <Avatar alt={otherUserById.name} src={otherUserById.img} />
                    }
                </ListItemAvatar>
                {otherUserById.name === "" ?
                    <Skeleton width={180} variant="text" sx={{ fontSize: '1rem' }} /> :
                    <>
                        <ListItemText primary={otherUserById.name} />
                    </>
                }
            </ListItem>
            </div>
        </>
    )
}

export default EachPersonItem