const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    orders:[{
        productName: {
            type: String,
            required: true
        },
        packing: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        totalPrice: {
            type:String,
            required: true
        }
    }],
    grandTotal: {
        type: String,
        required: true
    },
    orderDate: { 
        type: Date, 
        default: Date.now 
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;