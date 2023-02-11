const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const steamRoutes = require('./routes/steamRoutes')
const gamesRoutes = require('./routes/gamesRoutes')

app.use(cors())
app.use(morgan('dev'))

app.use('/api/games', gamesRoutes)
app.use('/api/steam', steamRoutes)

module.exports = app
