const Vendor = require('../models/vendorSchema');

// ----------------------
// Vendor Request Logic
// ----------------------
const AddVendor = async(req, res) => {
    try {
        const response = req.body;
        await Vendor.create(response);
        return res.status(200).json({ message: "Request sent successfully..."})
    } catch (error) {
        next(error)
    }
}

module.exports = AddVendor;