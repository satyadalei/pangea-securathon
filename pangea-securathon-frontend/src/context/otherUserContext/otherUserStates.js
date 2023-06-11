import {useContext, 
    // useEffect, 
    useState } from "react";
import otherUserContext from "./otherUserContext";
import { useNavigate } from "react-router-dom";
import alertContext from "../alert/alertContext";


const OtherUserStates = (props)=>{
    const navigate = useNavigate();
    const AlertContext = useContext(alertContext);
    const {setAlert} = AlertContext;
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
                }else if(response.msg === "same user"){
                    navigate("/profile")
                }else{
                    navigate("/dashboard");
                }
                //if successfull then set otherUsers data to OtherUserhook
            }else{
                //set login status to false
                // setLoginStatus(false);
                console.log("some error");
                navigate("/")
                setAlert({
                    alertMsg:"There is an error loading data",
                    alertType:"danger"
                })
            }
        }
    }
    // useEffect(()=>{
    //     fetchOtherUser();
    // },[otherUserId])

    return(
        <otherUserContext.Provider value={{otherUser,fetchOtherUser,setOtherUser,setOtherUserId}} >
          {props.children}
        </otherUserContext.Provider>
    )
}

export default OtherUserStates;