const pool = require('../../database/connection')

class AuthRepository {

    async findUserByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )
        return rows[0]
    }

    async createUser(data) {
        const { email, password, role, full_name, phone } = data

        const [result] = await pool.query(
            'INSERT INTO users (email, password, role, full_name, phone) VALUES (?, ?, ?, ?, ?)',
            [email, password, role, full_name, phone]
        )
        return result.insertId
    }
}

module.exports = new AuthRepository()