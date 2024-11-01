const mongoose = require("mongoose");

const todayUpdatesSchema = new mongoose.Schema({
    productStatus: {
        type: String,
        required: true
    },
    priceStatus: {
        type: String,
        required: true
    },
    deliveryStatus: {
        type: String,
        required: true
    },
    extraDetails: {
        type: String,
        required: true
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
})

const TodayUpdates = new mongoose.model("Today-Updates", todayUpdatesSchema);

module.exports = TodayUpdates;