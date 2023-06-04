const express = require('express');
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const user = require("../models/userModel");
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





module.exports = router;