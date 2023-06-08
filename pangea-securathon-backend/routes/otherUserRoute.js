// main goal of Route --> To deliver other users details;
const express =require("express");
const router = express.Router();
const authenticateuser = require("../middlewares/authenticateUser");
const user = require("../models/userModel");

router.get("/fetchUser",authenticateuser,async(req,res)=>{
  //fetch user details and send them data based on their firend or not
  const userId = req.user.userId; //647e388bc4d63e2b99f35ece(who is requesting to know other user);
  const otherUserId = req.headers.otheruserid; // (to whome someone is trying to no);
  console.log(userId," who is requesting");
  console.log(otherUserId," whose id is being requesting");
  const findOtherUser = await user.findById(otherUserId).select("-userDetails.password");
  //check is friend or not below
  let redactDataOfUser = findOtherUser;
  //check is friend or not  above
  let sendingOtherUser = redactDataOfUser;
  console.log(findOtherUser);
  res.json({
    "msg":"other user data send",
    "success":true,
    "otherUser": sendingOtherUser
  })
})







module.exports = router;