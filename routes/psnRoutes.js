const router = require('express').Router()
const psnCtrl = require('../controllers/psnController')

router.get('/userInfo/:username', psnCtrl.getUserInfo)
router.get('/userGames/:username', psnCtrl.getUserGames)
router.get('/userTrophies/:username', psnCtrl.getUserTrophies)

module.exports = router
