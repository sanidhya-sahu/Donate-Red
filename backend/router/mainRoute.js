const express = require('express')
const router = express()
const path = require('path')
const userSchema = require('../Models/userSchema')
const fastHashCode = require('fast-hash-code')

router.use(express.urlencoded())

const session = require('express-session')
router.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const frontPath = path.join(__dirname, '../../', 'frontend', '/')
router.use(express.static(frontPath));

router.get(`/`,(req, res) => {
    res.status(200).sendFile(frontPath + 'html/index.html')
})

function isLoggedIn(req, res, next) {
    if (req.session.logsuccess == true) {
        next()
    }
    else {
        res.redirect('/logpage')
    }
}

router.get(`/donate`, isLoggedIn, (req, res) => {
    res.sendFile(frontPath + `HTML/donate.html`)
})


router.get(`/logpage`,(req,res)=>{
    res.sendFile(frontPath + `HTML/login.html`)
})
router.get(`/login`,(req,res)=>{
    res.sendFile(frontPath + `HTML/login.html`)
})
router.get(`/register`,(req,res)=>{
    res.sendFile(frontPath + `HTML/register.html`)
})
router.get(`/about`,(req,res)=>{
    res.sendFile(frontPath + `HTML/aboutus.html`)
})




module.exports = router