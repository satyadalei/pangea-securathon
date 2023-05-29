const express = require('express');
const router = express.Router();
const user = require("../models/userModel");

// this route will create new user
router.post("/createUser", async (req,res)=>{
    const {fName,lName, email, password} = req.body;
    const findUser = await user.findOne({email:email});
    let msg ;
    let detailMsg;
    //first find user if exists
    if (findUser) {
        msg = "user exists";
        detailMsg = "This user exists. Please login"
        res.json({
            "msg" : msg,
            "detail msg" : detailMsg,
            "success" : false
        })
    }else{
        // when testing is done encrypt their password
        const newUser = new user({
           email : email,
           userDetails : {
            fName: fName,
            lName : lName,
            password : password
           }
        });
        await newUser.save();
        //find that user and send back without password
        const savedUser = await user.findById(newUser._id).select("-userDetails.password");
        msg = "new user created";
        res.json({
            "msg" : msg,
            "success" : true,
            "user data" : savedUser
        })
    }
});






module.exports = router;