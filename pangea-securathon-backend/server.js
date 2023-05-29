const express = require("express");
const connectToDataBase = require("./database");
const bodyParser = require("body-parser");
// connect to data base
connectToDataBase();
const app = express();
// to send back data as response in json format
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// home route
app.get("/",(req,res)=>{
    res.json({
        "msg":"You have reached Pangea securathon server",
        "Keep" :":)--> Smilling"
    });
})
//all user related stuffs will be in userRoute (create user, fetch user,login user)
app.use("/api/user", require("./routes/userRoute"));













const port = process.env.PORT || 7000 ;
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})