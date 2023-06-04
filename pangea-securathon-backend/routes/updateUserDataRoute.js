const express = require('express');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const user = require("../models/userModel");
const multer = require('multer');
const uploadMulterInstance = require("../middlewares/multerMiddleware");
// MULTER MIDDLEWARE FOR HANDELING FILES
const upload = multer({
  // store files in the memory as buffer instead of storing in disk
  storage: multer.memoryStorage(),
  // set file limit
  limits: {
      fileSize: 1024 * 1024 * 10 // 10 MB max size
  },
  fileFilter:  (req, file, callBackFn)=> {
      const fileType = file.mimetype;
      if (fileType === "image/jpeg" || "image/png") {
          callBackFn(null, true); // accept the file
      } else {
          callBackFn(new Error("You have not entered valid file")); // reject the file
      }
  }
})
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
router.post("/profileImage",authenticateUser,upload.single('image'),(req,res)=>{
  console.log(req.file,41);
   res.json({
    "msg":"file accepted"
   })
})




module.exports = router;