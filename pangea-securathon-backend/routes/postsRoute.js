const express = require("express");
const router = express.Router();
const authenticateuser = require("../middlewares/authenticateUser");
const multer = require("multer");
const upload = multer();
const post = require("../models/postModel");
const randomstring = require("randomstring");
const user = require("../models/userModel");
const { initializeApp } = require('firebase/app'); // require firebase
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage"); // getting required services from firestore

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};
const fireBaseApp = initializeApp(firebaseConfig);
const storage = getStorage(fireBaseApp); //points to root directory 
const imagesRef = ref(storage, '/images'); // imagesRef now points to 'images'
const postImagesRef = ref(storage, "/images/postImages");

router.post("/uploadPost", authenticateuser, upload.single("postImage"), async (req, res) => {
    const userId = req.user.userId;
    const findThatUser = await user.findById(userId);
    const fileType = req.file.mimetype;
    const fileOrginalName = req.file.originalname;
    const bufferData = req.file.buffer;
    const textWithPost = req.body.textData;
    const linkWithPost = req.body.link;
    const now = new Date();
    const dateStamp = now.toISOString();
    const randomString = randomstring.generate({ length: 12, charset: "alphanumeric" })
    const docGivenName = fileOrginalName + dateStamp + randomString;
    const metaData = {
        contentType: fileType
    }
    let uploadTask;
    let uploadedDocUrl;
    //-----------FILE UPLOADING STARTS ------------------
    if (fileType === "image/jpeg" || fileType === "image/png") {
        const uploadPostRef = ref(postImagesRef, `/${docGivenName}`);
        uploadTask = uploadBytes(uploadPostRef, bufferData, metaData);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                // console.log('File available at', downloadURL);
                uploadedDocUrl = downloadURL;
                //----------upload done now save to mongo DB ---------
                const newPost = new post({
                    autherId: userId,
                    postType: fileType,
                    postDeatils: {
                        fileType: fileType,
                        postUrl: downloadURL,
                        givenName: docGivenName,
                        postTextData:textWithPost,
                        postLink:linkWithPost
                    }
                })
                await newPost.save();
                findThatUser.postIds.push(newPost);
                findThatUser.save();
                //everything done correctly now send response
                res.json({
                    "msg": "post uploaded",
                    "detailMsg": "Post uploaded successfully",
                    "success": true,
                    "post": newPost
                })
            });
        });
    } else {
        res.json({
            "msg": "not valid file",
            "detailMsg": "Please enter the correct file type i.e. .JPEG or .PNG",
            "success": false
        })
    }
    // res.json({
    //     "msg": "post uploaded",
    //     "detailMsg": "Post uploaded successfully",
    //     "success": true
    // })
})






module.exports = router;