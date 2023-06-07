import {useEffect, useState } from "react";
import otherUserContext from "./otherUserContext";


const OtherUserStates = (props)=>{
    const [otherUserId, setOtherUserId] = useState("");
    const [otherUser, setOtherUser] = useState({});

    const hostApi = process.env.REACT_APP_API_URL;
    const url = `${hostApi}/api/otherUser/fetchUser`;
    const fetchOtherUser = async ()=>{
        if (otherUserId === "") {
            // means OtherUserId is not set yet
            return
        }else{
            // user Id set now fetch user
            const authToken = localStorage.getItem("authtoken");
            if (authToken) {
                const fetchOtherUserDetails = await fetch(url,{
                    method:"GET",
                    headers:{
                        "authtoken": authToken,
                        "otheruserid": otherUserId
                    }
                });
                const response = await fetchOtherUserDetails.json();
                console.log(response);
                //if successfull then set otherUsers data to OtherUserhook
            }else{
                //set login status to false
                // setLoginStatus(false);
                console.log("some error");
            }
        }
    }
    useEffect(()=>{
        fetchOtherUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[otherUserId])

    return(
        <otherUserContext.Provider value={{otherUser,setOtherUserId,setOtherUser}} >
          {props.children}
        </otherUserContext.Provider>
    )
}

export default OtherUserStates;