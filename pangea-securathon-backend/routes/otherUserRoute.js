// main goal of Route --> To deliver other users details;
const express =require("express");
const router = express.Router();
const authenticateuser = require("../middlewares/authenticateUser");


router.get("/fetchUser",authenticateuser,async(req,res)=>{
  //fetch user details and send them data based on their firend or not
  const userId = req.user.userId; //647e388bc4d63e2b99f35ece(who is requesting to know other user);
  const otherUserId = req.headers.otheruserid; // (to whome someone is trying to no);
  
  res.json({
    "msg":"other user data send"
  })
})







module.exports = router;