const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const SKEY = "maavdiwearethebestmilkprovider";

const authMiddleware = async(req, res, next) => { 
    const token = req.header('Authorization');
    // console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided"});
    }

    const jwtToken = token.replace("Bearer", "").trim();
    // console.log('token fron auth middleware :', jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, SKEY);
        // console.log("isVerifeied: ",isVerified);
        
        const userData = await User.findOne({ email: isVerified.email })
        .select({
            password: 0,
            cpassword: 0,
        });
        // console.log("mid :",userData);

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token"});
    }
};

module.exports = authMiddleware;