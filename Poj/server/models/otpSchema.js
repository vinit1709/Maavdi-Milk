const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    code: {
        type: String,
        default: null,
    },
    expireIn:{
        type: Number,
        default: null
    }
},{ timestamps: true });

// define the model or the collection name
const Otp = new mongoose.model("Otp", otpSchema);
module.exports = Otp;