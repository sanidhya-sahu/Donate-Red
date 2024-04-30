const express = require('express')
const router = express()
const BloodInventory = require('../Models/blood')

router.post(`/findBlood`, async (req, res) => {
    BloodInventory.find({})
        .then(found => {
            const type = req.body.bloodtype
            const state = req.body.state
            const data = found[type][state]
            const respObj = {
                "data": {...data},
                "res":true,
                "req":{
                    type : type,
                    state :state,
                    city : req.body.city
                }
            }
            res.send(respObj)
        })
        .catch(err => {
            res.send({"res":false})
        })
})

module.exports = router