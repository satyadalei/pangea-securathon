require("dotenv").config();
const express = require('express');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const user = require("../models/userModel");
// MULTER MIDDLEWARE FOR HANDELING FILES
const multer = require("multer")
const upload = multer()
const { initializeApp } = require('firebase/app'); // require firebase
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage"); // getting required services from firestore
var randomstring = require("randomstring"); // to create random string for saving images with unique name
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


//ROUTE1 --- UPDATE EMOTION OF USER
router.post("/updateMode", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  const userUpdatedData = req.body.userUpdateData;
  await user.updateOne(
    { _id: userId },
    { $set: { "modeLists": userUpdatedData.modeLists } }
  )
  res.json({
    "msg": "mode updated",
    "success": true,
    "detailMsg": "mode updated successfully for today"
  });
})


//ROUTE2 --- UPDATE PROFILE PICTURE OF USER
router.post("/profileImage", authenticateUser, upload.single('file'), async (req, res) => {
  const userId = req.user.userId;
  //1.first find that user
  const findThatUser = await user.findById(userId);
  // all common required credentials for saving files to firebase
  const docType = req.file.mimetype;
  const now = new Date();
  const dateStamp = now.toISOString();
  const randomString = randomstring.generate({ length: 12, charset: "alphanumeric" });
  const docOriginalName = req.file.originalname;
  const docGivenName = docOriginalName + dateStamp + randomString;
  const metaData = {
    contentType: docType
  }

  //2.check  profile image if previosly exists
  let uploadTask;
  if (findThatUser.profileImg.url === "") {
      //mesns does not exist previouly -> directly save to firebase
      if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
          const uploadProfileImageRef = ref(imagesRef, `profileImages/${docGivenName}`);
          uploadTask = uploadBytes(uploadProfileImageRef, req.file.buffer, metaData);
          uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                // console.log('File available at', downloadURL);
                uploadedDocUrl = downloadURL;
                //----------file uploaded to firebase now save details to mongoDB ---------
                findThatUser.profileImg.url = downloadURL;
                findThatUser.profileImg.givenName = docGivenName;
                await findThatUser.save();
                //everything done -> send response
                res.json({
                  "msg":"profile updated",
                  "success": true,
                  "detailMsg":"Profile picture updated successfully"
                })
            });
          });
      }else{
        // not an valid image file type
        res.json({
          "msg":"not valid file",
          "success": false,
          "detailMsg":"Please upload an valid image file i.e. .PNG or .JPEG"
        })
      }
  }else{
    //previously image exists
    // 1. delete previous one first
    const deleteProfileImgRef = ref(imagesRef, `profileImages/${findThatUser.profileImg.givenName}`);
    deleteObject(deleteProfileImgRef).then(async() => {
    // File deleted successfully -- now upload new one and save to data base
          const uploadProfileImageRef = ref(imagesRef, `profileImages/${docGivenName}`);
          uploadTask = uploadBytes(uploadProfileImageRef, req.file.buffer, metaData);
          uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                // console.log('File available at', downloadURL);
                uploadedDocUrl = downloadURL;
                //----------file uploaded to firebase now save details to mongoDB ---------
                findThatUser.profileImg.url = downloadURL;
                findThatUser.profileImg.givenName = docGivenName;
                await findThatUser.save();
                //everything done -> send response
                res.json({
                  "msg":"profile updated",
                  "success": true,
                  "detailMsg":"Profile picture updated successfully"
                })
            });
          });
    }).catch((error) => {
        console.log(error);
    });
  }
  //profile update successfully
})




module.exports = router;