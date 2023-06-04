import { useState } from "react";
import AlertContext from "./alertContext";

const AlertStates = (props)=>{
     const [alert, setAlert] = useState({
        alertMsg:"",
        alertType:""
     })

    return(
        <AlertContext.Provider value={{alert, setAlert}} >
           {props.children}
        </AlertContext.Provider>
    )
}

export default AlertStates;