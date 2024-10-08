const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    bloodGrp:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    accID:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    donarReg:{
        type:Boolean,
        default: false
    }
}
);

const user = mongoose.model('user', userSchema);

module.exports = user