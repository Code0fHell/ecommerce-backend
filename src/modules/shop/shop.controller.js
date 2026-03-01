const shopService = require('./shop.service')
const { createShopSchema, updateShopSchema } = require('./shop.validation')

exports.createShop = async (req, res) => {
  try {
    const { error } = createShopSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })

    const result = await shopService.createShop(req.user.id, req.body)

    res.status(201).json({
      message: "Shop created successfully",
      data: result
    })

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getMyShop = async (req, res) => {
  try {
    const shop = await shopService.getMyShop(req.user.id)
    res.json(shop)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

exports.updateMyShop = async (req, res) => {
  try {
    const { error } = updateShopSchema.validate(req.body)
    if (error) return res.status(400).json({ message: error.message })

    const result = await shopService.updateMyShop(req.user.id, req.body)
    res.json(result)

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}