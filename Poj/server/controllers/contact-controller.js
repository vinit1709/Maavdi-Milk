const Contact = require("../models/contactSchema");


// ------------------------------
// Contact Form Add Logic
// ------------------------------
const AddContact = async(req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: "message sent successfully..."});
    } catch (error) {
        next(error);
    }
}

module.exports = AddContact;