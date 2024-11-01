const { z } = require("zod");

const categorySchema = z
.object({
    categoryName: z
        .string({ required_error: "Category name is required" })
        .trim()
        .min(3, {message: "Category name must be at lest of 3 charcters."})
        .max(255, {message: "Category name must not be more than of 255 charcters."}),
});

module.exports = { categorySchema };