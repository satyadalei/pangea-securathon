const express = require('express');
const router = express.Router();
const user = require("../models/userModel");

// this route will create new user
router.post("/createUser", async (req,res)=>{
    const {fName,lName, email, password} = req.body;
    console.log({fName,lName, email,password});
    const newUser = new user({

    });
    await newUser.save();
    res.json({
        "user data" : newUser
    })
});






module.exports = router;