import {useEffect, useState } from "react";
import otherUserContext from "./otherUserContext";
import { useNavigate } from "react-router-dom";


const OtherUserStates = (props)=>{
    const navigate = useNavigate();
    const [otherUserId, setOtherUserId] = useState("");
    const [otherUser, setOtherUser] = useState({});

    const hostApi = process.env.REACT_APP_API_URL;
    const url = `${hostApi}/api/otherUser/fetchUser`;
    const fetchOtherUser = async (id)=>{
        if (!id) {
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
                        "otheruserid": id
                    }
                });
                const response = await fetchOtherUserDetails.json();
                if (response.msg === "other user data send") {
                    setOtherUser(response.otherUser);
                }
                console.log(response);
                //if successfull then set otherUsers data to OtherUserhook
            }else{
                //set login status to false
                // setLoginStatus(false);
                console.log("some error");
                navigate("/")
            }
        }
    }
    useEffect(()=>{
        fetchOtherUser();
    },[otherUserId])

    return(
        <otherUserContext.Provider value={{otherUser,fetchOtherUser}} >
          {props.children}
        </otherUserContext.Provider>
    )
}

export default OtherUserStates;