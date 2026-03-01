const Joi = require('joi')

exports.registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('CUSTOMER', 'SHOP', 'SHIPPER').required(),
    full_name: Joi.string().required(),
    phone: Joi.string().required()
})

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})