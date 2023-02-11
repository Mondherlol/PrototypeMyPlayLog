const express = require('express')
const router = express.Router()

const steamController = require('../controllers/steamController')

router.get('/:steamId', steamController.getSteamUser)

module.exports = router
