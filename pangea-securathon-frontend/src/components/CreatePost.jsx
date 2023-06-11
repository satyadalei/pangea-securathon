import React, { useContext, useState } from "react";
import { Avatar, Box, Button, ButtonGroup, Fab, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Tooltip, Typography } from "@mui/material";
import loadingContext from "../context/loading/loadingContext"
import { Add } from "@mui/icons-material";
import styled from "@emotion/styled";
import userContext from "../context/userDetails/userContext"
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import alertContext from "../context/alert/alertContext"
const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})
const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem"
})
const StyledStack = styled(Stack)({
    display: "flex",
    alignItems: "center"
})

const CreatePost = () => {
    const LoadingContext = useContext(loadingContext);
    const {loading,setLoading} = LoadingContext;
    const AlertContext = useContext(alertContext);
    const {setAlert} = AlertContext;
    const navigate = useNavigate();
    const hostApi = process.env.REACT_APP_API_URL;
    const [open, setOpen] = useState(false);
    const UserContext = useContext(userContext);
    const { user,fetchUser } = UserContext;

    const [file, setFile] = useState({
        preview: "",
        data: "",
        link: "",
        textData: "",
        postType: ""
    });
    const handleFile = (e) => {
        setFile({
            ...file,
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        })
    }
    const handleChange = (e) => {
        setFile({
            ...file,
            [e.target.name]: e.target.value
        })
    }
    const handleRemove = (e) => {
        setFile({
            preview: "",
            data: "",
            link: "",
            textData: "",
            postType: ""
        })
        document.getElementById("file-input-id").value = "";
    }

    const handlePost = async () => {
        //check whether text data or image is empty --> to stop emty post
        if (file.data === "" && file.textData === "") {
            return;
        }else if(file.postType === ""){
            setAlert({
                alertMsg:"Please select Post type",
                alertType: "danger"
            });
        }else {
            setLoading(true);
            setOpen(false);
            const url = `${hostApi}/api/posts/uploadPost`;
            const authToken = localStorage.getItem("authtoken");
            const formData = new FormData();
            formData.append("link",file.link)
            formData.append("textData",file.textData)
            formData.append("postType",file.postType)
            formData.append("postImage",file.data)
            const uploadPost = await fetch(url, {
                method: "POST",
                headers: {
                    "authtoken": authToken
                },
                body: formData
            })
            const uploadPostResponse = await uploadPost.json();
            if (uploadPostResponse.msg === "post uploaded") {
                //post uploade successfully
                console.log(uploadPostResponse);
                setLoading(false);
                setAlert({
                    alertMsg:uploadPostResponse.detailMsg,
                    alertType: "success"
                });
                setFile({
                    preview: "",
                    data: "",
                    link: "",
                    textData: "",
                    postType: ""
                });
                fetchUser();
            } else if (uploadPostResponse.msg === "unauthorised access") {
                setLoading(false);
                localStorage.clear();
                setAlert({
                    alertMsg:"Error in uploading",
                    alertType: "danger"
                })
                setFile({
                    preview: "",
                    data: "",
                    link: "",
                    textData: "",
                    postType: ""
                });
                navigate("/");
            }else if(uploadPostResponse.msg === "malicious link"){
                setLoading(false);
                setAlert({
                    alertMsg:uploadPostResponse.detailMsg,
                    alertType: "danger"
                })
                setFile({
                    ...file,
                    link: "",
                })
            }else{
                setLoading(false);
                setAlert({
                    alertMsg:"Error in uploading",
                    alertType: "danger"
                });
                setFile({
                    preview: "",
                    data: "",
                    link: "",
                    textData: "",
                    postType: ""
                });
            }
        }
    }
    return (
        <>
            <div>
                {loading && <Loading/>}
                <Box  style={{position: "fixed", zIndex: '300'}} >
                    <Tooltip onClick={(e) => { setOpen(true) }} title="Add">
                        <Fab sx={{margin:"1rem 0.5rem 1rem 0"}} color="primary" aria-label="add">
                            <Add />
                        </Fab>
                    </Tooltip>
                    <span>Create New Post</span>
                </Box>
            </div>
            <StyledModal
                open={open}
                onClose={(e) => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ width: '380px', height: "420px", borderRadius: "10px", position: "relative" }} bgcolor={"white"} p={3} >
                    <Typography variant="h6" color="gray" textAlign="center">Creat new post</Typography>
                    {/* <UserBox sx={{marginTop:"0.5rem"}} >
                        <Avatar sx={{ width: "30px", height: "30px" }} src={Object.keys(user).length !== 0 && user.profileImg.url} ></Avatar>
                        <Typography fontWeight={400} variant="span">
                            &nbsp;
                            {Object.keys(user).length !== 0 && user.userDetails.fName} &nbsp;
                            {Object.keys(user).length !== 0 && user.userDetails.lName}
                        </Typography>
                    </UserBox> */}
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Type of post?</InputLabel>
                        <Select
                            sx={{ width: "100%" }}
                            required
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={file.postType}
                            onChange={handleChange}
                            label="What type of post"
                            name="postType"
                        >
                            <MenuItem disabled value="Please Choose One">
                                <em>Please Choose One</em>
                            </MenuItem>
                            <MenuItem value="happy">Happy</MenuItem>
                            <MenuItem value="joke">Joke</MenuItem>
                            <MenuItem value="sad">Sad</MenuItem>
                            <MenuItem value="inspiring">Inspiring</MenuItem>
                            <MenuItem value="motivational">Motivational</MenuItem>
                            <MenuItem value="quote">Quote</MenuItem>
                        </Select>
                    </FormControl>
                    <StyledStack direction="row" gap={1} mb={1} mt={1} >
                        <ImageIcon />
                        <input id="file-input-id" onChange={handleFile} type="file" label="Upload any image" />
                    </StyledStack>
                    {file.data !== "" &&
                        <>
                            <img src={file.preview} style={{ height: "90px", width: "auto" }} alt="current post" />
                            <Button onClick={handleRemove} >
                                <CancelIcon />
                            </Button>
                        </>
                    }
                    <TextField
                        onChange={handleChange}
                        name="textData"
                        value={file.textData}
                        sx={{ width: "100%", marginTop: "1rem", padding: "0.2rem" }}
                        id="standard-multiline-static"
                        multiline
                        rows={2}
                        placeholder={file.data === "" ? "What's on your mind?" : "Tell more about this post.."}
                        variant="standard"
                    />
                    <TextField
                        onChange={handleChange}
                        value={file.link}
                        name="link"
                        sx={{ width: "100%", marginTop: "0.3rem" }}
                        id="standard-basic"
                        label="Add link to this post.."
                        placeholder="ex. https://moreinteresting.com"
                        variant="standard" />

                    <ButtonGroup sx={{ position: "absolute", bottom: "1rem", right: "1rem" }} >
                        <Button onClick={handlePost} variant="contained">
                            Post
                        </Button>
                    </ButtonGroup>
                </Box>
            </StyledModal>
        </>
    );
};

export default CreatePost;
