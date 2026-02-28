const app = require('./app')
const config = require('./config/env')

const pool = require('./database/connection')

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

async function testDB() {
    try {
        const [rows] = await pool.query('SELECT 1')
        console.log('Database connected')
    } catch (err) {
        console.error(err)
    }
}

testDB()