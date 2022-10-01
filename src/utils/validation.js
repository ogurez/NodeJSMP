const Joi = require('joi');

const userSchema = Joi.object({
    login: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
    isDeleted: Joi.boolean().optional()
});

const groupSchema = Joi.object({
    name: Joi.string().min(0).max(100).required()
});

const errorResponse = schemaErrors => {
    const errors = schemaErrors.map(e => {
        const { path, message } = e;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};

const validateSchema = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};

module.exports = { userSchema, groupSchema, validateSchema };
