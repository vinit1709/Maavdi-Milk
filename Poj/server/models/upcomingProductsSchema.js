const mongoose = require("mongoose");
const { object } = require("zod");


const upcomingProductSchema = new mongoose.Schema({
    productCategory: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    packing: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    shelfLife: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

const UpcomingProduct = new mongoose.model("Upcomig-Product", upcomingProductSchema);

module.exports = UpcomingProduct;