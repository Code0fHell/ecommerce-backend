const pool = require('../../database/connection')

class ShopRepository {

  async findByUserId(userId) {
    const [rows] = await pool.query(
      "SELECT * FROM shops WHERE user_id = ?",
      [userId]
    )
    return rows[0]
  }

  async createShop(data) {
    const { user_id, shop_name, description, address } = data

    const [result] = await pool.query(
      `INSERT INTO shops (user_id, shop_name, description, address)
       VALUES (?, ?, ?, ?)`,
      [user_id, shop_name, description, address]
    )

    return result.insertId
  }

  async updateShop(id, data) {
    const { shop_name, description, address } = data

    await pool.query(
      `UPDATE shops
       SET shop_name = ?, description = ?, address = ?
       WHERE id = ?`,
      [shop_name, description, address, id]
    )
  }
}

module.exports = new ShopRepository()