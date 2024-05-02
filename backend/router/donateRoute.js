const express = require('express')
const router = express()
const BloodInventory = require('../Models/blood')
const userSchema = require('../Models/userSchema')
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
            "donartype": req.query.donartype,
            "medicine": req.query.medicine,
            "lastdonation": req.query.lastdonation,
            "immunizations": req.query.immunizations,
            "Malaria": req.query.Malaria,
            "recieveblood": req.query.recieveblood,
            "Rabies": req.query.Rabies,
            "jaundice": req.query.jaundice
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
            "Diabetes": req.query.Diabetes,
            "Cancer": req.query.Cancer,
            "Tuberculosis": req.query.Tuberculosis,
            "asthma": req.query.asthma,
            "liver": req.query.liver,
            "kidney": req.query.kidney,
            "clot": req.query.clot,
            "Heart": req.query.Heart,
            "Allergy": req.query.Allergy
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
            "user": req.session.user,
            "details1": req.session.detailsOBJ1,
            "details2": req.session.detailsOBJ2
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
router.get(`/rejected`, isLoggedIn, (req, res) => {
    res.sendFile(frontPath + `HTML/noteligible.html`)
})

router.get(`/validateDonar`, isLoggedIn, (req, res) => {
    try {
        const details1 = req.session.detailsOBJ1
        const details2 = req.session.detailsOBJ2
        const checkArray1 = [
            "medicine",
            "lastdonate",
            "immu",
            "malaria",
            "recieveblood",
            "jaundice",
            "Rabies"
        ]
        const checkArray2 = [
            "Diabetes",
            "Cancer",
            "Tuberculosis",
            "asthma",
            "liver",
            "kidney",
            "clot",
            "Heart",
            "Allergy"
        ]
        checkArray1.forEach((element) => {
            if (details1[element] == "Yes" || details1[element] == "yes") {
                res.json({
                    "stat": true,
                    "valid": false
                })
            }
        })
        checkArray2.forEach((element) => {
            if (details2[element] == "Yes" || details2[element] == "yes") {
                res.json({
                    "stat": true,
                    "valid": false
                })
            }
        })

        userSchema.find({ accID: req.session.user.accID })
            .then((found) => {
                if (Object.keys(found).length === 0) {
                    res.sendFile(frontPath + 'HTML/error.html')
                }
                else {
                    userSchema.updateOne({accID: req.session.user.accID },{ $set:{"donarReg":true}})
                            .then((u) => {
                                req.session.user.donarReg = true
                                const userBlood = String(req.session.user.bloodGrp).toLowerCase()
                                const state = String(req.session.user.state).toLowerCase()
                                const city = String(req.session.user.city).toLowerCase()
                                BloodInventory.updateOne({},{$push:{[`${userBlood}.${state}.${city}`]:`${req.session.user.accID}`}})
                                .then((done)=>{
                                    res.json({
                                        "stat": true,
                                        "valid": true
                                    })
                                })
                                .catch(()=>{
                                    res.sendFile(frontPath + 'HTML/error.html')
                                })
                            })
                            .catch(() => {
                                res.sendFile(frontPath + 'HTML/error.html')
                            })
                }
            })

    } catch (error) {
        res.json({
            "stat": false,
            "valid": false
        })
    }
})


module.exports = router