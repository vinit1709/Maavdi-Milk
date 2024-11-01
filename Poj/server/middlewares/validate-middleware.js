const validate = (schema) => async(req, res, next) => {
    try {
        const paresBody = await schema.parseAsync(req.body);
        req.body = paresBody;
        next();
    } catch (err) {
        const status = 400;
        const message = "Fill the input properly"
        const extraDetails= err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails
        };

        console.log(error);
        // res.status(400).json({ message: message})
        next(error)
    }
};

module.exports = validate;