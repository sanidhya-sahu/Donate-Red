const mongoose = require('mongoose');
// require("dotenv").config();

const mongoURL = "mongodb://127.0.0.1:27017/BloodInventory";

const connectDB = async () =>{
    try {
        await mongoose.connect(mongoURL);     
        console.log("db-/");
    } catch (error) {
        console.log(error);
    }
};

// connectDB()

module.exports = connectDB;