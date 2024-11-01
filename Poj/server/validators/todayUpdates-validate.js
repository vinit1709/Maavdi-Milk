const { z } = require("zod");

const todayUpdatesSchema = z
.object({
    productStatus: z
        .string({ required_error: "Product Status is required" })
        .trim()
        .min(3, {message: "Product Status must be at lest of 3 charcters."})
        .max(255, {message: "Product Status must not be more than of 255 charcters."}),
    priceStatus: z
        .string({ required_error: "Price Status is required" })
        .trim()
        .min(2, {message: "Price Status must be at lest of 2 charcters."})
        .max(255, {message: "Price Status must not be more than of 255 charcters."}),
    deliveryStatus: z
        .string({ required_error: "Delivery Status is required" })
        .trim()
        .min(3, {message: "Delivery Status must be at lest of 3 charcters."})
        .max(255, {message: "Delivery Status must not be more than of 255 charcters."}),
    extraDetails: z
        .string({ required_error: "Extra Details is required" })
        .trim()
        .min(3, {message: "Extra Details must be at lest of 3 charcters."})
        .max(255, {message: "Extra Details must not be more than of 255 charcters."})
})

module.exports = { todayUpdatesSchema }