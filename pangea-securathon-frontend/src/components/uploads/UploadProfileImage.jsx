import React, { useContext, useState } from 'react'
import alertContext from "../../context/alert/alertContext"
import userContext from '../../context/userDetails/userContext';
import loadingContext from "../../context/loading/loadingContext"
import Loading from '../Loading';

const UploadProfileImage = () => {
    const AlertContext = useContext(alertContext);
    const {setAlert} = AlertContext;
    const UserContext = useContext(userContext);
    const {fetchUser,user} = UserContext;
    const LoadingContext = useContext(loadingContext);
    const {loading,setLoading} = LoadingContext;
    const [file, setFile] = useState({
        preview:"",
        data:""
    })

    const handleFile = (e) => {
        const img = {
            preview : URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setFile(()=>{
            return img;
        });
    }

    // console.log(file.data);
    const hostApi = process.env.REACT_APP_API_URL;
    const handleProfileUpload = async() => {
        if (file.data === "") {
            return;
        }else{
            setLoading(true)
            const url = `${hostApi}/api/updateUserData/profileImage`;
            const formData = new FormData();
            formData.append('file', file.data);
            const authToken = localStorage.getItem("authtoken")
            const uploadFile = await fetch(url,{
                method:"POST",
                headers:{
                    "authtoken":authToken
                },
                body:formData
            });
            const uploadFileResponse = await uploadFile.json();
            console.log(uploadFileResponse);
            if(uploadFileResponse.success){
              //profile picture updated successfully -> set alert + update user
                fetchUser();
                setAlert({
                        alertMsg:uploadFileResponse.detailMsg,
                        alertType: "success"
                });
                setFile({
                    preview:"",
                    data:""
                })
                document.getElementById("file-input").value = "";
                setLoading(false)
            }else{
                setAlert({
                    alertMsg:uploadFileResponse.detailMsg,
                    alertType: "danger"
                });
                setLoading(false)
            }
        }
    }
    const handleFileRemove = () => {
        setFile({
            preview:"",
            data:""
        });
        document.getElementById("file-input").value = "";
    }
    return (
        <div style={{marginTop:"1rem"}} >
            {loading && <Loading/> }
            <div>
            {
                Object.keys(user).length !== 0 &&
                user.profileImg.url !== "" &&  <h6>Your previous profile picture</h6>
            }
            {
             Object.keys(user).length !== 0 &&
             user.profileImg.url !== "" ?
             <img style={{height:"200px"}} src={user.profileImg.url} alt='uploaded file' /> : 
             <h5>You have not uploaded any image yet</h5>
            }
            
            {/* <img style={{width:"30%"}} src={Object.keys(user).length === 0 ? "" : user.profileImg ? user.profileImg.url : ""} alt='uploaded file' /> */}
            </div>
            <h5 style={{marginTop:"1rem"}} >To update profile Image Choose file below:</h5>
                <input id='file-input' type="file" onChange={handleFile} accept='image/png, image/jpeg'
                required />
            {
              file.data === "" ?"" : 
              <div style={{marginTop:"1rem"}} >
              <button onClick={handleProfileUpload} type='button' >Update</button> &nbsp; &nbsp;
              <button onClick={handleFileRemove} type='button' >Remove file</button>
              </div>
            } 
            <br />
            {
             file.data !== "" && <img style={{ height: "180px" }} src={file.preview} alt='uploaded file' />
            }
        </div>
    )
}

export default UploadProfileImage