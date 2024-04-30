const express = require('express')
const userSchema = require('../Models/userSchema')
const fastHashCode = require('fast-hash-code')
const path = require('path')


const router = express()

const frontPath = path.join(__dirname, '../', 'public', '/')
router.use(express.static(frontPath));

function isLoggedIn(req, res, next) {
    if (req.session.logsuccess == true) {
        next()
    }
    else {
        res.redirect('/logpage')
    }
}

router.post(`/login`, (req, res) => {
    userSchema.findOne({ accID: fastHashCode.fastHashCode(req.body.email), pass: fastHashCode.fastHashCode(req.body.password) })
        .then((found) => {
            if (found != null) {
                req.session.logsuccess = true;
                res.redirect(`/`)
            }
            else{
                res.status(401).sendFile(frontPath + 'HTML/error_401.html')
            }
        })
        .catch((err) => {
            res.status(401).sendFile(frontPath + 'HTML/error_401.html')
        })
})

router.post(`/register`, (req, res) => {
    userSchema.find({ accID: fastHashCode.fastHashCode(req.body.email) })
        .then((found) => {
            if (Object.keys(found).length === 0) {
                const username = req.body.firstname +" "+ req.body.lastname 
                const newUser = new userSchema({
                    name: username,
                    email: req.body.email,
                    bloodGrp: req.body.bloodGrp,
                    age: req.body.age,
                    phone: req.body.phone,
                    city: req.body.city,
                    state: req.body.state,
                    accID: fastHashCode.fastHashCode(req.body.email),
                    pass: fastHashCode.fastHashCode(req.body.password)
                })
                newUser.save()
                    .then((saved) => {
                        res.sendFile(frontPath + 'HTML/successRegister.html')
                    })
                    .catch(err => {
                        if (err.code == 11000) {
                            res.sendFile(frontPath + 'HTML/error_11000.html')
                        }
                        else {
                            res.sendFile(frontPath + 'HTML/error.html')
                        }
                    })
            }
            else {
                res.sendFile(frontPath + 'HTML/error_11000.html')
                // res.send("email already exists , redirecting...")
            }
        })
})

router.get(`/findDonorDetails`,(req,res)=>{
    userSchema.findOne({ accID: req.query.accID})
        .then((found) => {
            if (found != null) {
                const obj = {
                    "name":found.name,
                    "email":found.email,
                    "phone":found.phone,
                    "city":found.city,
                    "state":found.state
                }
                res.send(obj)
            }
            else{
                res.status(401).sendFile(frontPath + 'HTML/error_401.html')
            }
        })
        .catch((err) => {
            res.status(401).sendFile(frontPath + 'HTML/error_401.html')
        })
})


module.exports = router