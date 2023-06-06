const express = require("express");
const router = express.Router();
const authenticateuser = require("../middlewares/authenticateUser");
const multer = require("multer");
const upload = multer();
router.post("/uploadPost",authenticateuser,upload.single("postImage"), async(req,res)=>{
    console.log("data send");
    console.log(req.file);
    console.log(req.body);
    res.send("data send")
})






module.exports = router;