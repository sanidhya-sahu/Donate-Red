const express = require('express')
const router = express()
const BloodInventory = require('../Models/blood')
const path = require('path')
const frontPath = path.join(__dirname, '../../', 'frontend', '/')
router.use(express.static(frontPath));

const session = require('express-session')
router.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

function isLoggedIn(req, res, next) {
    if (req.session.logsuccess == true) {
        next()
    }
    else {
        res.redirect('/logpage')
    }
}

router.get(`/donarDetailsSave1`, isLoggedIn, (req, res) => {
    try {
        const detailsOBJ1 = {
            "donartype": req.query.res.donartype,
            "medicine": req.query.res.medicine,
            "lastdonation": req.query.res.lastdonation,
            "immunizations": req.query.res.immunizations,
            "Malaria": req.query.res.Malaria,
            "recieveblood": req.query.res.recieveblood,
            "Rabies": req.query.res.Rabies,
            "jaundice": req.query.res.jaundice
        }
        req.session.detailsOBJ1 = detailsOBJ1
        res.json({
            "stat": true
        })
    } catch (error) {
        res.json({
            "stat": false
        })
    }
})
router.get(`/donarDetailsSave2`, isLoggedIn, (req, res) => {
    try {
        const detailsOBJ2 = {
            "Diabetes": req.query.res.Diabetes,
            "Cancer": req.query.res.Cancer,
            "Tuberculosis": req.query.res.Tuberculosis,
            "asthma": req.query.res.asthma,
            "liver": req.query.res.liver,
            "kidney": req.query.res.kidney,
            "clot": req.query.res.clot,
            "Heart": req.query.res.Heart,
            "Allergy": req.query.res.Allergy
        }
        req.session.detailsOBJ2 = detailsOBJ2
        res.json({
            "stat": true
        })
    } catch (error) {
        res.json({
            "stat": false
        })
    }
})


router.get(`/check3`, isLoggedIn, (req, res) => {
    res.sendFile(frontPath + `HTML/check3.html`)
})
router.get(`/showDetails`, isLoggedIn, (req, res) => {
    res.sendFile(frontPath + `HTML/details.html`)
})
router.get(`/fetchDetails`, isLoggedIn, (req, res) => {
    try {
        var returnOBJ = {
            "user" : req.session.user,
            "details1" : req.session.detailsOBJ1,
            "details2" : req.session.detailsOBJ2
        } 
        res.json({
            "stat": true,
            "data": returnOBJ
        })
    } catch (error) {
        res.json({
            "stat": false
        })
    }
})
router.get(`/thank`, isLoggedIn, (req, res) => {
    res.sendFile(frontPath + `HTML/thank.html`)
})


module.exports = router