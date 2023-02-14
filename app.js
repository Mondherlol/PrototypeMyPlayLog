const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

const steamRoutes = require('./routes/steamRoutes')
const gamesRoutes = require('./routes/gamesRoutes')
const psnRoutes = require('./routes/psnRoutes')

app.use(cors())
app.use(morgan('dev'))
dotenv.config()
app.use(express.json())

app.use('/api/games', gamesRoutes)
app.use('/api/steam', steamRoutes)
app.use('/api/psn', psnRoutes)

module.exports = app
