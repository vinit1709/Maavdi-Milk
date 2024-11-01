const { z } = require("zod");

const contactSchema = z
.object({
    userName: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, {message: "Name must be at lest of 3 charcters."})
        .max(255, {message: "Name must not be more than of 255 charcters."}),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address"})
        .min(3, {message: "Email must be at lest of 3 charcters."})
        .max(255, {message: "Email must not be more than 255 charcters."}),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, {message: "Phone must be at lest of 10 charcters."})
        .max(10, {message: "Phone must not be more than 10 charcters."}),
    message: z
        .string({ required_error: "Please Enter Message"})
        .trim()
        .min(5, {message: "Message must be at lest of 5 characters."}),
});

module.exports = { contactSchema };