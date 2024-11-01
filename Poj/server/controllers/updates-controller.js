const TodayUpdates = require("../models/todayUpdatesSchema");
const UpcomingProduct = require("../models/upcomingProductsSchema");

// --------------------------
// Get Latest Today Updates 
// --------------------------
const getLastTodayUpdates = async(req, res) => {
    try {
        const todayUpdates = await TodayUpdates.findOne().sort({ timestamp: -1 });
        return res.status(200).json(todayUpdates);
    } catch (error) {
        next(error);
    }
}

// ------------------------------
// Get Upcoming Products Logic 
// ------------------------------
const getLastUpcomingProduct = async(req, res) => {
    try {
        const upcomingProduct = await UpcomingProduct.findOne().sort({ timestamp: -1 });
        return res.status(200).json(upcomingProduct)
    } catch (error) {
        next(error);
    }
}


module.exports = { getLastTodayUpdates, getLastUpcomingProduct }
