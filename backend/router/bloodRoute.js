const express = require('express')
const router = express()
const BloodInventory = require('../Models/blood')
const path = require('path')
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

router.post(`/findBlood`, async (req, res) => {
    BloodInventory.find({})
        .then(found => {
            const type = String(req.body.bloodtype).toLowerCase()
            const state = String(req.body.state).toLowerCase()
            // console.log(found);
            const data = found[0][type][state]
            // console.log(data);
            if (data != null) {   
                const respObj = {
                    "data": {...data},
                    "res":true,
                    "req":{
                        type : type,
                        state :state,
                        city : String(req.body.city).toLowerCase()
                    }
                }
                req.session.responseObject = respObj
                res.sendFile(frontPath + `html/searchresult.html`)
            }
            else{
                throw new Error('This is a custom error message');
            }
        })
        .catch(err => {
            console.log(err);
            const respObj = {
                "res":false,
                "error":err
            }
            req.session.responseObject = respObj
            res.sendFile(frontPath + `html/searchresult.html`)
        })
})

router.get(`/listresults`,(req,res)=>{
    res.send(req.session.responseObject)
})

module.exports = router