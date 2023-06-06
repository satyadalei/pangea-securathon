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

try {
  
} catch (error) {
  console.log(error);
}
  

})




module.exports = router;