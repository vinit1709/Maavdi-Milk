const mongoose = require("mongoose");

const constactSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
})

const Contact = new mongoose.model("Contact", constactSchema);
module.exports = Contact;