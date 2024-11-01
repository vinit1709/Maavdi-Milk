const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        minlength: 10
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true,
        minlength: 6
    },
    serviceRequest: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    msg: {
        type: String,
        default: "none"
    }
});

// define the model or the collection name
const Vendor = new mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;