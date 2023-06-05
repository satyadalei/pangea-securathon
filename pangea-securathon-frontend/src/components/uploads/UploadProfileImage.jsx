import React, { useState } from 'react'
// import axios from 'axios';
const UploadProfileImage = () => {

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
            const url = `${hostApi}/api/updateUserData/profileImage`;
            const formData = new FormData();
            formData.append('userName', "Satyanarayan");
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
        }
    }
    const handleFileRemove = () => {
        setFile({
            preview:"",
            data:""
        })
    }
    return (
        <div>
            <h2>Add Image:</h2>
                <input id='file-input' type="file" onChange={handleFile} accept='image/png, image/jpeg'
                required />
            {
             file.data !== "" && <img style={{ width: "200px" }} src={file.preview} alt='uploaded file' />
            }
            <br />
            <br />
            <button onClick={handleProfileUpload} type='button' >Upload</button> <br />
            {
              file.data === "" ?"" : 
              <button onClick={handleFileRemove} type='button' >Remove file</button>
            }
        </div>
    )
}

export default UploadProfileImage