const express = require("express")
const cors = require('cors')
const bloodRoute = require('./router/bloodRoute')
const userRoute = require('./router/userRoute')
const mainRoute = require('./router/mainRoute')
const connectDB = require("./helpers/db")

const app = express()
connectDB()


app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})



app.use(`/`, mainRoute, bloodRoute, userRoute)

app.listen(80, () => { console.log("running on http://127.0.0.1/") })