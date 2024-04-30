const mongoose = require('mongoose');
const { Schema } = mongoose;

const BloodInventorySchema = new Schema({
    "o+":{
        type:Object
    },
    "o-":{
        type:Object
    },
    "a+":{
        type:Object
    },
    "a-":{
        type:Object
    },
    "ab+":{
        type:Object
    },
    "ab-":{
        type:Object
    },
    "b+":{
        type:Object
    },
    "b-":{
        type:Object
    },
})


const BloodInventory = mongoose.model('BloodInventory', BloodInventorySchema);

module.exports = BloodInventory