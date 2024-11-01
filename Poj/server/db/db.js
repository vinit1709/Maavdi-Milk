const mongoose = require("mongoose");

// const DB_URL = "mongodb://localhost:27017/Naruto";

const DB_URL = "mongodb+srv://ljclg10:ljclg10@cluster0.xnk8k.mongodb.net/Maavdi";



// mongoose.connect(DB_URL);

const connectDb = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log("database connection successfully..!!");
    } catch (error) {
        console.log("database connection failed..!!");
        process.exit(0);
    }
}

module.exports = connectDb;