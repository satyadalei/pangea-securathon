require("dotenv").config();
const mongoose = require("mongoose");

const mongoDbUrl = process.env.MONGODB_URL;
const connectToDataBase = async ()=>{
   try {
        await mongoose.connect(mongoDbUrl);
       console.log("Database connected successfully");
   }catch (error) {
       console.log("Database connection failed");
   }
}

module.exports = connectToDataBase;