const authService = require('./auth.service')
const { registerSchema, loginSchema } = require('./auth.validation')

exports.register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body)

        if (error) {
            return res.status(400).json({ message: error.message})
        }

        const result = await authService.register(req.body)

        res.status(201).json({
            message: 'User registered successfully!',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body)
        
        if (error) {
            return res.status(400).json( { message: error.message } )
        }

        const result = await authService.login(
            req.body.email,
            req.body.password
        )

        res.json(result)
    } catch (err) {
        res.status(400).json( { message: err.message})
    }
}