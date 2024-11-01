const Order = require("../models/orderSchema");

// --------------------
// Order Place Logic
// --------------------
const AddOrder = async(req, res) => {
    try {
        const userId = req.body[0].userId;
        const userName = req.body[0].userName;
        const orders = req.body.map(order => ({
            productName: order.productName,
            packing: order.packing,
            quantity: order.quantity,
            totalPrice: order.totalPrices[order.productName]
        })).filter(order => order.quantity > 0 && order.productName && order.packing);
        const grandTotal = req.body[0].grandTotal;
        const deliveryDate = req.body[0].deliveryDate;

        await Order.create({ userId, userName, grandTotal, deliveryDate, orders });
        return res.status(200).json({ message: "Order Place Successfully..."});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { AddOrder }

