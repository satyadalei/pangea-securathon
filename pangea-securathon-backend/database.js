require("dotenv").config();
const { audit } = require('./pangea/pangea');
const mongoose = require("mongoose");

const mongoDbUrl = process.env.MONGODB_URL;
const connectToDataBase = async () => {
    try {
        await mongoose.connect(mongoDbUrl);
        if (process.env.MODE === "deployed") {
            //*******pangea service - audit.log
            audit.log({
                action: "connect to database",
                status: "success",
                message: "Database connected successfully",
            })
        } else {
            console.log("Database connected successfully");
        }
    } catch (error) {
        if (process.env.MODE === "deployed") {
            //*******pangea service - audit.log
            audit.log({
                action: "connect to database",
                status: "failure",
                message: "Error in connecting to Database.",
            })
        } else {
            console.log("Database connection failed");
        }
    }
}

module.exports = connectToDataBase;