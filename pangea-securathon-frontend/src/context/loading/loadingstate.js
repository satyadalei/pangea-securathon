import { useState } from "react";
import loadingContext from "./loadingContext";
const LoadingStates = (props)=>{
    const [loading, setLoading] = useState(false);
    return (
        <loadingContext.Provider value={{loading,setLoading}} >
           {props.children}
        </loadingContext.Provider>
    )
}

export default LoadingStates;