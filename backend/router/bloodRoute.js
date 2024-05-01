const express = require('express')
const router = express()
const BloodInventory = require('../Models/blood')
const path = require('path')
const frontPath = path.join(__dirname, '../../', 'frontend', '/')
router.use(express.static(frontPath));

router.post(`/findBlood`, async (req, res) => {
    BloodInventory.find({})
        .then(found => {
            const type = String(req.body.bloodtype).toLowerCase()
            const state = String(req.body.state).toLowerCase()
            const data = found[0][type][state]
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
                res.sendFile(frontPath + `HTML/searchresult.html`)
            }
            else{
                throw new Error('This is a custom error message');
            }
        })
        .catch(err => {
            const respObj = {
                "res":false,
                "error":err
            }
            req.session.responseObject = respObj
            res.sendFile(frontPath + `HTML/searchresult.html`)
        })
})

router.get(`/listresults`,(req,res)=>{
    res.send(req.session.responseObject)
})

module.exports = router