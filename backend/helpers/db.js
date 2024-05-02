const mongoose = require('mongoose');
// require("dotenv").config();

// const mongoURL = "mongodb://127.0.0.1:27017/BloodInventory";
const mongoURL = "mongodb+srv://tanishqmiglani2oo:Otaku@cluster0.v2ix7m7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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