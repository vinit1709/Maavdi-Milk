const { z } = require("zod");

const productSchema = z
.object({
    productCategory: z
        .string({ required_error: "Category is required" })
        .trim()
        .min(3, {message: "Category must be at lest of 3 charcters."})
        .max(255, {message: "Category must not be more than of 255 charcters."}),
    productName: z
        .string({ required_error: "Product Name is required" })
        .trim()
        .min(3, {message: "Product Name must be at lest of 3 charcters."})
        .max(255, {message: "Product Name must not be more than of 255 charcters."}),
    description: z
        .string({ required_error: "Description is required" })
        .trim()
        .min(3, {message: "Description must be at lest of 3 charcters."})
        .max(255, {message: "Description must not be more than of 255 charcters."}),
    packing: z
        .string({ required_error: "Packing is required" })
        .trim()
        .min(3, {message: "Packing must be at lest of 3 charcters."})
        .max(255, {message: "Packing must not be more than of 255 charcters."}),
    composition: z
        .string({ required_error: "Composition is required" })
        .trim()
        .min(1, {message: "Composition must be at lest of 1 charcters."})
        .max(255, {message: "Composition must not be more than of 255 charcters."}),
    shelfLife: z
        .string({ required_error: "Shelf Life is required" })
        .trim()
        .min(3, {message: "Shelf Life must be at lest of 3 charcters."})
        .max(255, {message: "Shelf Life must not be more than of 255 charcters."}),
    price: z
        .string({ required_error: "Price is required" })
        .trim()
        .min(2, {message: "Price must be at lest of 2 charcters."})
        .max(255, {message: "Price must not be more than of 255 charcters."}),
    storageCondition: z
        .string({ required_error: "Storage Condition is required" })
        .trim()
        .min(3, {message: "Storage Condition must be at lest of 3 charcters."})
        .max(255, {message: "Storage Condition must not be more than of 255 charcters."}),
})

module.exports = { productSchema }