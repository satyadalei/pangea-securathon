import { useState } from "react"
import LoginContext from "./loginContext"


const LoginStates = (props)=>{
   let isTokenExist ;
   if (localStorage.getItem("authtoken")) {
      isTokenExist = true;
   }else{
      isTokenExist = false;
   }
   const [loginStatus, setLoginStatus] = useState(isTokenExist);
   return(
    <LoginContext.Provider value={{loginStatus,setLoginStatus}} >
       {props.children}
    </LoginContext.Provider>
   )
}

export default LoginStates;