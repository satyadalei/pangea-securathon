import {Box,FormControlLabel,Radio,RadioGroup,Typography} from "@mui/material";
import React, { useContext} from "react";
import userContext from "../context/userDetails/userContext";
import alertContext from "../context/alert/alertContext";

const ChooseMode = () => {
  const AlertContext = useContext(alertContext);
  const {setAlert} = AlertContext;
  const hostApi = process.env.REACT_APP_API_URL;
  const UserContext = useContext(userContext);
  const {user,setUser} = UserContext;

  const updateData = async (update)=>{
    const url = `${hostApi}/api/updateUserData/updateMode`;
    const authToken = localStorage.getItem("authtoken");
    //sending users updated data
    const updatedData = {userUpdateData:update} 
    const updateUserMode = await fetch(url,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
        "authtoken": authToken
      },
      body: JSON.stringify(updatedData)
    })
    const updateUserModeResponse = await updateUserMode.json();
    console.log(updateUserModeResponse);
    if (updateUserModeResponse.msg === "mode updated") {
      setAlert({
        alertMsg:updateUserModeResponse.detailMsg,
        alertType:"success"
      })
    }else{
      setAlert({
        alertMsg:"There is an error saving your mode",
        alertType:"danger"
      })
    }
  }
  // to check whether two date stams are same date or not
  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
      );
    }
  const handleMode = async (mode) => {
    // console.log(mode + " mode is clicked.");
    //check if the mode array is emty or not
    const modeListsLength = user.modeLists.length ;
    const todayDateStamp = new Date();
    const lastindex = modeListsLength-1;
    console.log(todayDateStamp);
    const modeDetails = {
      lastUpdated : todayDateStamp,
      mode : mode
    }
    if (modeListsLength === 0) {
      setUser((prev)=>{
        const update =  {
          ...prev, 
          modeLists : [...prev.modeLists,modeDetails]
        }
        //do call the api below
        updateData(update)
        //do call the api above
        return update;
      })
    }else{
      const lastUpdatedModeDate = new Date(user.modeLists[lastindex].lastUpdated) ;
      //check whether changes are in same date or different date
      //console.log(todayDateStamp);
      // console.log(lastUpdatedModeDate);
      const areSameDate = isSameDate(todayDateStamp,lastUpdatedModeDate) // true if same date false if different date
       if (areSameDate) {
        //same date -> update only last element instead of pushing new
        setUser((prev)=>{
          // const update =  {
          //   ...prev, 
          //   modeLists : [...prev.modeLists[lastindex],modeDetails]  --> this is not working
          // }
          const updatedAllModes = [...prev.modeLists];
          updatedAllModes[lastindex] = modeDetails
          const finalThings = {...prev,modeLists : updatedAllModes}
          //do call the api below
          updateData(finalThings)
          //do call the api above
          return finalThings;
        })
      }else{
        //different date -> pushing new update instead of updating last element  
        setUser((prev)=>{
          const update =  {
            ...prev, 
            modeLists : [...prev.modeLists,modeDetails]
          }
          //do call the api below to save to data base
          updateData(update)
          //do call the api above
          return update;
        })
      }
    }
    //now update data
  };

  return (
    <>
      <Box>
        <Typography
          variant="h6"
          sx={{ fontSize: "1", margin: "1rem 0 0.5rem 0" }}
        >
          Hi! How are you feeling today?
        </Typography>
        <div sx={{ margin: "1rem 0 1rem 0" }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              onClick={() => handleMode("happy")}
              value="happy"
              control={<Radio />}
              label="Happy"
            />
            <FormControlLabel
              onClick={() => handleMode("sad")}
              value="had"
              control={<Radio />}
              label="Sad"
            />
            <FormControlLabel
              onClick={() => handleMode("fatigue")}
              value="fatigue"
              control={<Radio />}
              label="Fatigue"
            />
          </RadioGroup>
        </div>
      </Box>
    </>
  );
};

export default ChooseMode;
