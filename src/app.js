const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./modules/auth/auth.routes')
const shopRoutes = require('./modules/shop/shop.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/shops', shopRoutes)


module.exports = app