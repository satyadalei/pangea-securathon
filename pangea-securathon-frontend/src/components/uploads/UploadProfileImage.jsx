import React, { useState } from 'react'

const UploadProfileImage = () => {

    const [file, setFile] = useState()

    const handleFile = (e) => {
        console.log(e.target.files);
        setFile(()=>{
            return URL.createObjectURL(e.target.files[0])
        });
    }

    console.log(file);
    const hostApi = process.env.REACT_APP_API_URL;

    const handleProfileUpload = async() => {
        if (!file) {
            return;
        }else{
            const url = `${hostApi}/api/updateUserData/profileImage`;
            const formData = new FormData();
            formData.append('image', file);
            console.log(file,24);
            console.log(formData,25);
            const authToken = localStorage.getItem("authtoken")
            const uploadFile = await fetch(url,{
                method:"POST",
                headers:{
                    "content-type": "image/jpeg" || "image/png",
                    "authtoken":authToken
                },
                body:formData
            });
            const uploadFileResponse = await uploadFile.json();
            console.log(uploadFileResponse);
        }
    }
    const handleFileRemove = () => {
        setFile(null)
    }
    return (
        <div>
            <h2>Add Image:</h2>
                <input id='file-input' name='image' type="file" onChange={handleFile} accept='.png, .jpeg, .jpg'
                value={!file ? "" : file.name}
                required />
            {
             !file ?"" : <img style={{ width: "200px" }} src={!file ? "" : file} alt='uploaded file' />
            }
            <br />
            <br />
            <button onClick={handleProfileUpload} type='button' >Upload</button> <br />
            {
              !file ?"" : <button onClick={handleFileRemove} type='button' >Remove file</button>
            }
        </div>
    )
}

export default UploadProfileImage