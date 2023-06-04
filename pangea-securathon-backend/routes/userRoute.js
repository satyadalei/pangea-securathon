require("dotenv").config();
const express = require('express');
const router = express.Router();
const user = require("../models/userModel");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//require services from pangea.js
const { audit, userIntel, clientIpAddress, hostIpAddress } = require('../pangea/pangea');
const authenticateUser = require("../middlewares/authenticateUser");


// Start-- create new user -- this route will create new user
router.post("/createUser",
    [
        body('fName', "Enter a valid name").isLength({ min: 3 }),
        body('email', "Enter a valid email").isEmail(),
        body('password', "Enter password atleast 5 characters").notEmpty().isLength({ min: 5 })
    ],
    async (req, res) => {
        const result = validationResult(req);
        let msg;
        let detailMsg;
        let success;
        // means error in user credentials 
        if (result.errors.length != 0) {
            msg = "invalid credentials";
            success = false;
            res.status(400).json({
                "msg": msg,
                "success": success,
                "error": result.errors
            });
        } else {
            // there is no error in credentials
            const { fName, lName, email, password } = req.body;
            const findUser = await user.findOne({ email: email });
            //first find user if exists
            if (findUser) {
                //*******pangea service - audit.log
                audit.log({
                    actor: email,
                    action: "create user",
                    status: "failure",
                    target: `${hostIpAddress(req)}`,
                    source: `${clientIpAddress(req)}`,
                    message: "user already exists",
                })
                res.status(400).json({
                    "msg": "user exists",
                    "detailMsg": "Please login",
                    "success": false
                });
            } else {
                //*******pangea service - user intel - to detect if user email is breached
                const requestEmailOptions = { email: email, verbose: true, raw: true };
                const emailCheckResponse = await userIntel.userBreached(requestEmailOptions);
                const isBreached = emailCheckResponse.result.data.found_in_breach;
                const breachCount = emailCheckResponse.result.data.breach_count;
                //emailCheckResponse.result.data.found_in_breach = true
                //emailCheckResponse.result.data.breach_count = 1 or 3
                // encrypt their password first
                if (isBreached) {
                    //*******pangea service - audit log
                    audit.log({
                        actor: email,
                        action: "create User",
                        status: "false",
                        target: `${hostIpAddress(req)}`,
                        source: `${clientIpAddress(req)}`,
                        message: `user email is breached with ${breachCount} times`,
                    })
                    if (breachCount < 3) {
                        //allow creating account but also send warning
                        const salt = bcrypt.genSaltSync(saltRounds);
                        const hashedPassword = bcrypt.hashSync(password, salt);
                        const newUser = new user({
                            email: email,
                            userDetails: {
                                fName: fName,
                                lName: lName,
                                password: hashedPassword
                            }
                        });
                        await newUser.save();
                        //find that user and send back with token
                        const jwtToken = jwt.sign({ user: { userId: newUser._id } }, process.env.JWT_SECRET);
                        
                        //*******pangea service - audit.log
                        audit.log({
                            actor: email,
                            action: "create User",
                            status: "success",
                            target: `${hostIpAddress(req)}`,
                            source: `${clientIpAddress(req)}`,
                            message: "user created successfully with breached email",
                        })
                        res.json({
                            "msg": "new user created with breached email",
                            "token": jwtToken,
                            "success": true
                        })
                    } else {
                        // do not allow creating account respond with warning
                        res.json({
                            "msg": "email breached",
                            "success": false,
                            "detailMsg": "Try using another email"
                        })
                    }
                } else {
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashedPassword = bcrypt.hashSync(password, salt);
                    const newUser = new user({
                        email: email,
                        userDetails: {
                            fName: fName,
                            lName: lName,
                            password: hashedPassword
                        }
                    });
                    await newUser.save();
                    //find that user and send back with token
                    const jwtToken = jwt.sign({ user: { userId: newUser._id } }, process.env.JWT_SECRET);
                    //*******pangea service - audit.log
                    audit.log({
                        actor: email,
                        action: "create User",
                        status: "success",
                        target: `${hostIpAddress(req)}`,
                        source: `${clientIpAddress(req)}`,
                        message: "user created successfully",
                    })
                    res.json({
                        "msg": "new user created",
                        "token": jwtToken,
                        "success": true
                    })
                }
                //end of saving user to db    
            }
        }
    });
// Ends-- create new user -- this route will create new user
// const jwtToken = jwt.sign({userId :  "param sutra" },process.env.JWT_SECRET);
// console.log(jwtToken);
// jwt.verify(jwtToken,process.env.JWT_SECRET, function(err, decoded) {
//     console.log(decoded.userId) 
// });
// Starts --logIn user -- this route logIns user
router.post("/loginUser",
    [
        body('email', "Enter a valid email").isEmail(),
        body('password', "Enter password atleast 5 characters").notEmpty()
    ],
    async (req, res) => {
        const result = validationResult(req);
        let msg;
        let detailMsg;
        let success;
        // first check whether valid credentials are given
        if (result.errors.length != 0) {
            //not valid credentials
            msg = "invalid credentials";
            success = false;
            res.status(400).json({
                "msg": msg,
                "success": success,
                "error": result.errors
            });
        } else {
            //valid credentials now check is user exist
            const { email, password } = req.body;
            const findThatUser = await user.findOne({ email: email });
            if (!findThatUser) {
                //*******pangea service - audit.log
                audit.log({
                    actor: email,
                    action: "login User",
                    status: "failure",
                    target: `${hostIpAddress(req)}`,
                    source: `${clientIpAddress(req)}`,
                    message: "user notfound",
                })
                res.status(400).json({
                    "msg": "user notfound",
                    "success": false,
                    "detailMsg": "Please loin with correct credentials"
                })
            } else {
                //user found now check password 
                const isPassMatched = bcrypt.compareSync(password, findThatUser.userDetails.password);
                if (isPassMatched) {
                    const jwtToken = jwt.sign({ user: { userId: findThatUser._id } }, process.env.JWT_SECRET);
                    //*******pangea service - audit.log
                    audit.log({
                        actor: email,
                        action: "login user",
                        status: "success",
                        target: `${hostIpAddress(req)}`,
                        source: `${clientIpAddress(req)}`,
                        message: "user logedin successfully",
                    })
                    res.json({
                        "msg": "user logedin",
                        "success": true,
                        "token": jwtToken
                    })
                } else {
                    //password did not matched
                    //*******pangea service - audit.log
                    audit.log({
                        actor: email,
                        action: "login user",
                        status: "failure",
                        target: `${hostIpAddress(req)}`,
                        source: `${clientIpAddress(req)}`,
                        message: "incorrect password",
                    })
                    res.status(400).json({
                        "msg": "incorrect password",
                        "success": false,
                        "detailMsg": "incorrect password"
                    })
                }
            }

        }
    }
)
// Ends --logIn user -- this route logIns user

// Starts -- fetch user -- this route fetches user and send details of user
router.get("/fetchUser", authenticateUser, async (req, res) => {
    // this route is protect as authenticateUser middleware passed
    const userId = req.user.userId;
    const findThatUser = await user.findById(userId).select("-userDetails.password");
    res.json({
        "msg": "user sent",
        "success": true,
        "user": findThatUser
    })
})
// Ends -- fetch user -- this route fetches user and send details of user

module.exports = router;