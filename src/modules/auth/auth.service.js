const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/env')
const authRepo = require('./auth.repository')

class AuthService {

    async register(data) {
        const existingUser = await authRepo.findUserByEmail(data.email)
        if (existingUser) {
            throw new Error('Email has already been registered!')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        
        const userId = await authRepo.createUser({
            ...data,
            password: hashedPassword
        })

        return { id: userId}
    }

    async login(email, password) {
        const user = await authRepo.findUserByEmail(email)

        if (!user) {
            throw new Error('Email does not exist!')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Password does not match!')
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            config.jwt.secret,
            { expiresIn: config.jwt.expires }
        )

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                full_name: user.full_name
            }
        }
    }
}

module.exports = new AuthService()