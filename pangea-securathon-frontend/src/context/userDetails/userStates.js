import {
    // useEffect, 
    useState } from "react";
import userContext from "./userContext";
const UserStates = (props) => {
    const [user, setUser] = useState({});
    const hostApi = process.env.REACT_APP_API_URL;
   
    //------------- FETCH USER DETAILS ------------
    const fetchUser = async () => {
        const userToken = localStorage.getItem("authtoken");
        if(userToken){
            // means user has token --> now fetch user
            const url = `${hostApi}/api/user/fetchUser`;
            const fetchUser = await fetch(url, {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                    "authtoken": userToken
                }
            })
            const fetchUserResponse = await fetchUser.json();
            if (fetchUserResponse.msg === "user sent" & fetchUserResponse.success) {
                //user fetched successfully
                setUser(fetchUserResponse.user);
            }
        } else {
            //they are not authorised
            localStorage.clear("authtoken")
        }
    }
    // useEffect(()=>{
    //     fetchUser();
    // },[])

    return (
        <userContext.Provider value={{ user, setUser, fetchUser }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserStates;