require('dotenv').config();
const express = require("express");
const connectToDataBase = require("./database");
const bodyParser = require("body-parser");
const { audit } = require('./pangea/pangea');
const cors = require("cors");
// connect to data base
connectToDataBase();
const app = express();
// to send back data as response in json format
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN_URL1,
    method: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
// home route
app.get("/",(req,res)=>{
    res.json({
        "msg":"You have reached Pangea securathon server",
        "Keep" :":)--> Smilling"
    });
})
// #### ROUTES #####  ROUTES ########  ROUTES ######## 
//all user related stuffs will be in userRoute (create user, fetch user,login user)
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/updateUserData",require("./routes/updateUserDataRoute"));












const port = process.env.PORT || 7000 ;
app.listen(port,()=>{
    if (process.env.MODE === "deployed") {
        //*******pangea service - audit.log
        audit.log({
            action: "start server",
            status: "success",
            message: `server started successfully at port ${port}`,
        })
    } else {
        console.log(`Server started at port ${port}`);
    }
})