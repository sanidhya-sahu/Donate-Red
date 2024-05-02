const express = require('express')
const userSchema = require('../Models/userSchema')
const fastHashCode = require('fast-hash-code')
const path = require('path')


const router = express()

const frontPath = path.join(__dirname, '../../', 'frontend', '/')
router.use(express.static(frontPath));

function isLoggedIn(req, res, next) {
    if (req.session.logsuccess == true) {
        next()
    }
    else {
        res.redirect('/logpage')
    }
}

function duallogged(req, res, next) {
    if (req.session.logsuccess == true) {
        res.redirect('/')
    }
    else {
        next()
    }
}


router.post(`/login`,duallogged, (req, res) => {
    userSchema.findOne({ accID: fastHashCode.fastHashCode(req.body.email), pass: fastHashCode.fastHashCode(req.body.password) })
        .then((found) => {
            if (found != null) {
                req.session.logsuccess = true;
                req.session.user = found
                res.redirect('/')
            }
            else{
                res.status(401).sendFile(frontPath + 'html/error.html')
            }
        })
        .catch((err) => {
            res.status(401).sendFile(frontPath + 'html/error.html')
        })
})

router.post(`/register`,duallogged, (req, res) => {
    userSchema.find({ accID: fastHashCode.fastHashCode(req.body.email) })
        .then((found) => {
            if (Object.keys(found).length === 0) {
                const username = req.body.firstname +" "+ req.body.lastname 
                const newUser = new userSchema({
                    name: username,
                    email: req.body.email,
                    bloodGrp: String(req.body.bloodGrp).toLowerCase(),
                    age: req.body.age,
                    phone: req.body.phone,
                    city: req.body.city,
                    state: req.body.state,
                    accID: fastHashCode.fastHashCode(req.body.email),
                    pass: fastHashCode.fastHashCode(req.body.password)
                })
                newUser.save()
                    .then((saved) => {
                        res.sendFile(frontPath + 'html/login.html')
                    })
                    .catch(err => {
                        // console.log(err);
                        if (err.code == 11000) {
                            res.sendFile(frontPath + 'html/error.html')
                        }
                        else {
                            res.sendFile(frontPath + 'html/error.html')
                        }
                    })
            }
            else {
                res.sendFile(frontPath + 'html/error.html')
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
                res.status(401).sendFile(frontPath + 'html/error.html')
            }
        })
        .catch((err) => {
            res.status(401).sendFile(frontPath + 'html/error.html')
        })
})

router.get(`/loggedin`,(req,res)=>{
    if (req.session.logsuccess == true) {
        res.send({
            "stat":true,
            "user":req.session.user
        })
    }
    else {
        res.send({
            "stat":false
        })
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(async err => {
        if (err) {
            res.status(401).sendFile(frontPath + 'html/error.html')
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router