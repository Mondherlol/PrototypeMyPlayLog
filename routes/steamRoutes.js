const express = require('express')
const router = express.Router()

const steamController = require('../controllers/steamController')

router.get('/userInfo/:steamId', steamController.getSteamUser)
router.get('/userTrophies/:steamId/:appid', steamController.getUserAchievements)

module.exports = router
