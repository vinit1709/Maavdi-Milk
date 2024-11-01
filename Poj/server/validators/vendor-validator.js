const { z } = require("zod");

const vendorSchema = z
.object({
    name: z
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
    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(3, {message: "State must be at lest of 3 charcters."})
        .max(255, {message: "State must not be more than of 255 charcters."}),
    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(3, {message: "City must be at lest of 3 charcters."})
        .max(255, {message: "City must not be more than of 255 charcters."}),
    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(3, {message: "Address must be at lest of 3 charcters."})
        .max(350, {message: "Address must not be more than of 350 charcters."}),
    pinCode: z
        .string({ required_error: "Pin Code is required" })
        .trim()
        .min(6, {message: "Pin Code must be at lest of 6 charcters."})
        .max(6, {message: "Pin Code must not be more than of 6 charcters."}),
    serviceRequest: z
        .string({ required_error: "Service Request/Comments is required" })
        .trim()
        .min(3, {message: "Service Request/Comments must be at lest of 3 charcters."})
        .max(500, {message: "Service Request/Comments must not be more than of 500 charcters."})
});

module.exports = { vendorSchema };