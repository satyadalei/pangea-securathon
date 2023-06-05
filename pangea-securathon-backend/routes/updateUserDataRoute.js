const express = require('express');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const user = require("../models/userModel");
const multer = require("multer")
// MULTER MIDDLEWARE FOR HANDELING FILES
const upload = multer()
//ROUTE1 --- UPDATE EMOTION OF USER
router.post("/updateMode",authenticateUser, async(req,res)=>{
   const userId = req.user.userId;
   const userUpdatedData = req.body.userUpdateData;
   await user.updateOne(
        {_id: userId},
        { $set: { "modeLists": userUpdatedData.modeLists } }
    )
    res.json({
      "msg": "mode updated",
      "success": true,
      "detailMsg": "mode updated successfully for today"
  });
})
//ROUTE2 --- UPDATE PROFILE PICTURE OF USER
router.post("/profileImage",authenticateUser,upload.single('file'),(req,res)=>{

  console.log(req.file,25);
  console.log(req.body,26);
   res.json({
    "msg":"file accepted"
   })
})




module.exports = router;