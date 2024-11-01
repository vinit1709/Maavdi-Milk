const mongoose = require("mongoose");
const { object } = require("zod");


const productSchema = new mongoose.Schema({
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
    description:{
        type: String,
        required: true
    },
    packing: [{
        type: Object,
        // required: true
    }],
    composition: {
        type: String,
        required: true
    },
    shelfLife: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    storageCondition: {
        type: String,
        required: true
    }
})

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;