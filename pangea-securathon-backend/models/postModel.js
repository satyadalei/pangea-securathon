const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    postCreatedAt:{
        type : Date,
        default: Date.now 
    },
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref  : "user"
        },
        name:{
            type: String
        },
        profileUrl:{
            type: String
        }
    },
    tag:{
       type: String,
       default: "post"
    },
    postType:{
        type: String
    },
    status:{
        type:String,
        default:"public"
    },
    saves:{
        savedBy:[]
    },
    likes:{
        likedBy: []
    },
    postDetails:{
        fileType:{
            type:String,
            default:""
        },
        postUrl:{
            type:String,
            default:""
        },
        givenName:{
            type:String,
            default:""
        },
        postTextData:{
            type: String,
            default:""
        },
        postLink:{
            type:String,
            default:""
        }
    }
})

module.exports = mongoose.model("Post",postSchema);