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

router.post(`/donarDetailsSave1`,(req,res)=>{
    const detailsOBJ1 = {
        "donartype" : req.query.donartype,
        "medicine" : req.query.medicine,
        "lastdonation" : req.query.lastdonation,
        "immunizations" : req.query.immunizations,
        "Malaria" : req.query.Malaria,
        "recieveblood" : req.query.recieveblood,
        "jaundice" : req.query.jaundice
    }
    req.session.detailsOBJ1 = detailsOBJ1
    res.sendFile(frontPath + `HTML/check3.html`)
})



module.exports = router