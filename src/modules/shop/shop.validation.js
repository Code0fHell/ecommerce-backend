const Joi = require('joi')

exports.createShopSchema = Joi.object({
  shop_name: Joi.string().required(),
  description: Joi.string().allow(''),
  address: Joi.string().required()
})

exports.updateShopSchema = Joi.object({
  shop_name: Joi.string().required(),
  description: Joi.string().allow(''),
  address: Joi.string().required()
})