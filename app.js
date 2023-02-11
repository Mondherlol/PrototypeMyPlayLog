const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const steamRoutes = require('./routes/steamRoutes')
const gamesRoutes = require('./routes/gamesRoutes')

//zuuhcfezirfgcuygeruuyfcez test

const apiConfig = {
  url: 'https://api.igdb.com/v4/games/',
  method: 'post',
  headers: {
    Authorization: 'Bearer vu57a9n1nj1dlgr80z91knet3puvmj',
    'Client-ID': '6jv4rs9l9dyzch8x0tiyziccpv6wat',
    'Content-Type': 'text/plain',
  },
}

app.use(cors())
app.use(morgan('dev'))

app.use('/api/games', gamesRoutes)
app.use('/api/steam', steamRoutes)

module.exports = app
