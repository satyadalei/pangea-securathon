const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
   tag:{
        type: String,
        default : "user"
   },
   status :{
     type : String,
     default : "not verified"
   },
   email : {
     type : String,
     unique : true
   },
   userDetails : {
        fName : String,
        lName : String,
        password : String,
        otherThings :{}
   },
   profileImg :{
    type : String
   },
   postIds: {
     type : Array
   },
   friendListIds : {
    type : Array
   },
   modeLists: {
    type : Array
   },
   otherThings : {}
});

module.exports = mongoose.model("User",userSchema);