const { json } = require("express");
const Product = require("../models/productSchema");


// -------------------
// Get Product Logic
// -------------------
const GetProduct = async(req, res) => {
    try {
        const response = await Product.find();
        if(!response || response.length === 0) {
            res.status(404),json({ msg: "No Product Found"});
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// ---------------------------
// Get Product With Id Logic
// ---------------------------
const GetProductId = async(req, res) => {
    try {
        const id = req.params.id;
        const response = await Product.findById({ _id: id});
        if(!response) {
            res.status(404),json({ msg: "No Product Found"});
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
module.exports = {GetProduct, GetProductId };