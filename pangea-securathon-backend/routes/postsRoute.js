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
const { audit, urlIntel, clientIpAddress, hostIpAddress } = require('../pangea/pangea');

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
const postImagesRef = ref(storage, "/images/postImages");

router.post("/uploadPost", authenticateuser, upload.single("postImage"), async (req, res) => {
    const userId = req.user.userId;
    const findThatUser = await user.findById(userId);
    try {
        const fileType = req.file.mimetype;
        const fileOrginalName = req.file.originalname;
        const bufferData = req.file.buffer;
        const postType = req.body.postType;
        const textWithPost = req.body.textData;
        const linkWithPost = req.body.link;   // links provided with post --> will be checked through urlIntel of pangea
        const now = new Date();
        const dateStamp = now.toISOString();
        const randomString = randomstring.generate({ length: 12, charset: "alphanumeric" })
        const docGivenName = fileOrginalName + dateStamp + randomString;
        const metaData = {
            contentType: fileType
        }
        let uploadTask;
        let uploadedDocUrl;

        if (linkWithPost !== "") {
            //means link has added to post
            //first check whether provided(by user) post link is malicious or not
            //*******pangea service - url intel
            const urlIntelResponse = await urlIntel.reputation(
                linkWithPost, // ref line no. 34
                {
                    provider: "crowdstrike"
                }
            );
            const { result, summary } = urlIntelResponse
            // console.log(result); // { data: { category: [], score: -1, verdict: 'unknown' } }
            // console.log(summary); // Url was not found

            if (result.data.verdict === "malicious") {
                //link found malicious
                //*******pangea service - audit.log
                audit.log({
                    actor: findThatUser.email,  // ref line no. 28
                    action: "uplaod post",
                    status: "failure",
                    target: `${hostIpAddress(req)}`,
                    source: `${clientIpAddress(req)}`,
                    message: `url:${linkWithPost}. ` + summary
                })
                res.json({
                    "msg": "malicious link",
                    "detailMsg": "Link you have added to post found malicious. Please change that link",
                    "success": false
                })
            } else {
                // link is safe to go
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
                                author: {
                                    id: findThatUser._id,
                                    name: findThatUser.userDetails.fName + " " + findThatUser.userDetails.lName,
                                    profileUrl: findThatUser.profileImg.url || ""
                                },
                                postType: postType,
                                postDetails:{
                                    fileType: fileType,
                                    postUrl: downloadURL,
                                    givenName: docGivenName,
                                    postTextData: textWithPost,
                                    postLink: linkWithPost
                                }
                            })
                            await newPost.save();
                            //adds that posts credentials to authors post section
                            findThatUser.posts.push(newPost);
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
            }

        } else {
            //means no link is added --> save directly
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
                            author: {
                                id: findThatUser._id,
                                name: findThatUser.userDetails.fName + " " + findThatUser.userDetails.lName,
                                profileUrl: findThatUser.profileImg.url || ""
                            },
                            postType: postType,
                            postDetails: {
                                fileType: fileType,
                                postUrl: downloadURL,
                                givenName: docGivenName,
                                postTextData: textWithPost,
                                postLink: linkWithPost
                            }
                        })
                        await newPost.save();
                        //adds that posts credentials to authors post section
                        findThatUser.posts.push(newPost);
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
        }
    } catch (error) {
        //*******pangea service - audit.log
        audit.log({
            actor: findThatUser.email,
            action: "uplaod post",
            status: "failure",
            target: `${hostIpAddress(req)}`,
            source: `${clientIpAddress(req)}`,
            message: `There is some internal error.`
        });
        res.json({
            "msg": "internal error",
            "detailMsg": "There is some internal server error. Please try after some time.",
            "success": false
        });
    }
});
router.get("/fetchPosts",authenticateuser,async (req,res)=>{
  const userId = req.user.userId;
  const findUser = await user.findById(userId);
  const lastUpdatedMode = findUser.modeLists.length !== 0 ? findUser.modeLists[findUser.modeLists.length-1].mode : "newUser";
 

  //possible postTypes --> happy,sad,joke,qoute,motivational,inspiring
  const happyPosts = await post.find({tag:"post",postType:"happy"});
  const jokePosts = await post.find({tag:"post",postType:"joke"});
  const sadPosts = await post.find({tag:"post",postType:"sad"});
  const motivationalPosts = await post.find({tag:"post",postType:"motivational"});
  const inspiringPosts = await post.find({tag:"post",postType:"inspiring"});
  const quotePosts = await post.find({tag:"post",postType:"qoute"});
  
  let allPosts = [];

   //all emotions --> sad, happy, fatigue, depressed, motivated
   if (lastUpdatedMode === "happy") {
    allPosts = [...happyPosts, ...jokePosts, ...motivationalPosts]
   }else if(lastUpdatedMode === "sad"){
    allPosts = [...motivationalPosts, ...quotePosts, ...inspiringPosts, ...jokePosts]
   }else if (lastUpdatedMode === "fatigue") {
     allPosts = [...quotePosts,...jokePosts,...happyPosts]
    }else if (lastUpdatedMode === "depressed") {
       allPosts = [...inspiringPosts,...quotePosts,...jokePosts]
   }else if(lastUpdatedMode === "motivated"){
    allPosts = [...inspiringPosts,...quotePosts,...jokePosts,...quotePosts, ...motivationalPosts]
   }else{
    allPosts = [...inspiringPosts,...quotePosts,...jokePosts,...quotePosts, ...motivationalPosts]
   }
  const shuffledArray = allPosts.sort(() => Math.random() - 0.5);
  res.json({
    "msg":"posts send",
    "success":true,
    "posts":shuffledArray
  })
})






module.exports = router;