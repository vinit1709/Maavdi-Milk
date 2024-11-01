const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const SKEY = "maavdiwearethebestmilkprovider";

const userSchema = new mongoose.Schema({
    userImg: {
        type: String,
        default: "user.png"
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true,
        minlength: 6
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    cpassword:{
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// json web token Genetate Token
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        SKEY,{
            expiresIn: "1d"
        }
        );
    } catch (error) {
        console.error(error);
    }
};

// define the model or the collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;