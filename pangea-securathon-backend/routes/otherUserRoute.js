// main goal of Route --> To deliver other users details;
const express = require("express");
const router = express.Router();
const authenticateuser = require("../middlewares/authenticateUser");
const user = require("../models/userModel");
const { redact } = require("../pangea/pangea");


router.get("/fetchUser", authenticateuser, async (req, res) => {
  //fetch user details and send them data based on their firend or not
  const userId = req.user.userId; //647e388bc4d63e2b99f35ece(who is requesting to know other user);
  const otherUserId = req.headers.otheruserid; // (to whome someone is trying to no);
  const findOtherUser = await user.findById(otherUserId).select("-userDetails.password");
  //check is friend or not below
  const totalfriends = findOtherUser.friendListIds.length;
  let redactDataOfUser = findOtherUser;

  let isFriend = false;
  let isRequestSent = false;
  let isSameUser = false;
  if (userId === otherUserId) {
    isSameUser = true;
    res.json({
      "msg": "same user",
      "success": true,
    })
  } else {
    // means they are different user
    //loop throgh friendlists to check is friend
    for (let i = 0; i < findOtherUser.friendListIds.length; i++) {
      if (userId === findOtherUser.friendListIds[i]) {
        isFriend = true;
        break;
      }
    }
    //check whether user has sent friend request to that user
    for (let i = 0; i < findOtherUser.friendRequests.length; i++) {
      if (findOtherUser.friendRequests[i].sentBy === userId) {
        isRequestSent = true;
        break;
      }
    }
    if (!isFriend) {
      //means user user in not friend of the requesting user
      // then redact email
      let redactResponse = await redact.redact(
        email = findOtherUser.email
      );
      redactDataOfUser.email = redactResponse.result.redacted_text;
    }

    let sendingOtherUser = { isFriend: isFriend, isRequestSent: isRequestSent };
    const merged = Object.assign({}, redactDataOfUser, sendingOtherUser);

    res.json({
      "msg": "other user data send",
      "success": true,
      "otherUser": merged,
    })
  }
})

router.post("/sendFriendRequest", authenticateuser, async (req, res) => {
  const userId = req.user.userId; // who sent friend request
  const otherUserId = req.headers.otheruserid; // to whome friend request is sent
  const findUser = await user.findById(userId);
  const findOtherUser = await user.findById(otherUserId);
  const timeStamp = req.headers.timestamp;
  // console.log(findUser);
  // console.log(findOtherUser);
  // console.log(req.headers.timestamp);
  findOtherUser.friendRequests.push({
    sentBy: userId,
    time: timeStamp
  });
  await findOtherUser.save();
  findUser.invitationsSent.push({
    to: otherUserId,
    time: timeStamp
  });
  await findUser.save();
  res.json({
    "msg": "friend request sent"
  })
})

router.get("/smallDetails", authenticateuser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const otherUserId = req.headers.otheruserid;

    const findOtherUser = await user.findById(otherUserId).select("-userDetails.password");
    const responseOtherUserData = {
      name: findOtherUser.userDetails.fName + " " + findOtherUser.userDetails.lName,
      profileImageUrl: findOtherUser.profileImg.url
    }
    // console.log(findOtherUser);
      res.json({
        "msg": "user data sent",
        "success": true,
        "smallDetails": responseOtherUserData
      })
  }catch(error) {
      res.json({
        "msg": "some internal server error",
        "success": false,
        "smallDetails": "could not send"
      })
  }
})



module.exports = router;