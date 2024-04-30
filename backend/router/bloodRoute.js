const express = require('express')
const router = express()
const BloodInventory = require('../Models/blood')

router.post(`/findBlood`, async (req,res)=>{
    BloodInventory.find({})
        .then(found => {
            if (Object.keys(found).length === 0) {
                const newBlood = new BloodInventory({
                    "o+":{
                        maharashtra:{
                            pune:["a123","b456","c789"]
                        }
                    }
                });
                newBlood.save()
                    .then(saved => {
                        // res.sendFile(__dirname + '/html/success.html'   );
                        console.log("saved");
                        res.send(saved)
                    })
                    .catch(error => {
                        console.error('Error saving document:', error);
                    });
            }
            else {
                
            }
        })
        .catch(err => {
            console.error(err)
        })


})

module.exports = router