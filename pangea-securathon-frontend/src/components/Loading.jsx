import React from 'react'
import spinnerGiff from "../images/spinner.gif"
import { CircularProgress } from '@mui/material'
const Loading = () => {
  return (
    <>
      <div>
         <div style={{width:"100%",height:"100vh",backgroundColor:"rgba(0, 0, 0, 0.794)",position:"absolute",top:"0",left:"0",zIndex:"7",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div>
                {/* <img style={{width:"100px"}} src={spinnerGiff} alt="Loading..."/>
                <p style={{color:"white",textAlign:"center"}} >Working On it...</p> */}
                <CircularProgress />
            </div>
         </div>
      </div>
    </>
  )
}

export default Loading