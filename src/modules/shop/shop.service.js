const shopRepo = require('./shop.repository')

class ShopService {

  async createShop(userId, data) {
    const existing = await shopRepo.findByUserId(userId)

    if (existing) {
      throw new Error("User already owns a shop")
    }

    const shopId = await shopRepo.createShop({
      user_id: userId,
      ...data
    })

    return { id: shopId }
  }

  async getMyShop(userId) {
    const shop = await shopRepo.findByUserId(userId)

    if (!shop) {
      throw new Error("Shop not found")
    }

    return shop
  }

  async updateMyShop(userId, data) {
    const shop = await shopRepo.findByUserId(userId)

    if (!shop) {
      throw new Error("Shop not found")
    }

    await shopRepo.updateShop(shop.id, data)

    return { message: "Shop updated successfully" }
  }
}

module.exports = new ShopService()