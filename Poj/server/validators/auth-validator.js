const { z } = require("zod");

// Creating an object schema
const signupSchema = z
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
    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(3, {message: "Address must be at lest of 3 charcters."})
        .max(350, {message: "Address must not be more than of 350 charcters."}),
    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(3, {message: "City must be at lest of 3 charcters."})
        .max(255, {message: "City must not be more than of 255 charcters."}),
    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(3, {message: "State must be at lest of 3 charcters."})
        .max(255, {message: "State must not be more than of 255 charcters."}),
    pinCode: z
        .string({ required_error: "Pin Code is required" })
        .trim()
        .min(6, {message: "Pin Code must be at lest of 6 charcters."})
        .max(6, {message: "Pin Code must not be more than of 6 charcters."}),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, {message: "Password must be at lest of 8 charcters."})
        .max(1024, {message: "Password must not be more than 1024 charcters."}),
    cpassword: z
        .string({ required_error: "Confirm password is required" })
        .min(8, {message: "Confirm password must be at lest of 8 charcters."})
        .max(1024, {message: "Confirm password must not be more than 1024 charcters."}),
})
.refine((data) => data.password === data.cpassword, {
    message: "Password & Confirm password don't match",
    path: ["cpassword"],
})

const signinSchema = z
.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address"})
        .min(3, {message: "Email must be at lest of 3 charcters."})
        .max(255, {message: "Email must not be more than 255 charcters."}),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, {message: "Password must be at lest of 8 charcters."})
        .max(1024, {message: "Password must not be more than 1024 charcters."})
});

const emailValidate = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address"})
        .min(3, {message: "Email must be at lest of 3 charcters."})
        .max(255, {message: "Email must not be more than 255 charcters."})
})

const userUpdateSchema = z
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
    address: z
        .string({ required_error: "Address is required" })
        .trim()
        .min(3, {message: "Address must be at lest of 3 charcters."})
        .max(350, {message: "Address must not be more than of 350 charcters."}),
    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(3, {message: "City must be at lest of 3 charcters."})
        .max(255, {message: "City must not be more than of 255 charcters."}),
    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(3, {message: "State must be at lest of 3 charcters."})
        .max(255, {message: "State must not be more than of 255 charcters."}),
    pinCode: z
        .string({ required_error: "Pin Code is required" })
        .trim()
        .min(6, {message: "Pin Code must be at lest of 6 charcters."})
        .max(6, {message: "Pin Code must not be more than of 6 charcters."}),
});

const userUpdatePassword = z
.object({
    password: z
        .string({ required_error: "Password is required" })
        .min(8, {message: "Password must be at lest of 8 charcters."})
        .max(1024, {message: "Password must not be more than 1024 charcters."}),
    newPassword: z
        .string({ required_error: "New Password is required" })
        .min(8, {message: "New Password must be at lest of 8 charcters."})
        .max(1024, {message: "New Password must not be more than 1024 charcters."}),
    newConfimPassword: z
        .string({ required_error: "New Confirm Password is required" })
        .min(8, {message: "New Confirm Password must be at lest of 8 charcters."})
        .max(1024, {message: "New Confirm Password must not be more than 1024 charcters."}),
})
.refine((data) => data.newPassword === data.newConfimPassword, {
    message: "New Password & New Confirm password don't match",
    path: ["newConfimPassword"],
});

module.exports = { signupSchema, signinSchema, emailValidate, userUpdateSchema, userUpdatePassword};