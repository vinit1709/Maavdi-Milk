const Category = require("../models/categorySchema");

// -------------------
// Get Category Logic
// -------------------
const GetCategory = async(req, res) => {
    try {
        const response = await Category.find();
        if(!response) {
            res.status(404),json({ msg: "No Category Found"});
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        next(error);
    }
}

module.exports = { GetCategory };