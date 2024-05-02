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
    const user = req.session.user
    if (user.donarReg == false) {
        res.sendFile(frontPath + `html/check2.html`)
    }
    else if(user.donarReg == true){
        res.sendFile(frontPath + `html/already.html`)
    }
    else{
        res.sendFile(frontPath + `html/error.html`)
    }
})

router.get(`/logpage`,(req,res)=>{
    if (req.session.logsuccess == true) {
        res.redirect('/')
    }
    else{
        res.sendFile(frontPath + `html/login.html`)
    }
})
router.get(`/login`,(req,res)=>{
    if (req.session.logsuccess == true) {
        res.redirect('/')
    }
    else{
        res.sendFile(frontPath + `html/login.html`)
    }
})
router.get(`/register`,(req,res)=>{
    if (req.session.logsuccess == true) {
        res.redirect('/')
    }
    else{
        res.sendFile(frontPath + `html/register.html`)
    }
})
router.get(`/about`,(req,res)=>{
    res.sendFile(frontPath + `html/aboutus.html`)
})
router.get(`/contact`,(req,res)=>{
    res.sendFile(frontPath + `html/aboutus.html`)
})
router.get(`/home`,(req,res)=>{
    res.sendFile(frontPath + `html/index.html`)
})
router.get(`/find`,(req,res)=>{
    res.sendFile(frontPath + `html/find.html`)
})
router.get(`/error`,(req,res)=>{
    res.sendFile(frontPath + `html/error.html`)
})
router.get(`/blog`,(req,res)=>{
    res.sendFile(frontPath + `html/blogs.html`)
})



module.exports = router