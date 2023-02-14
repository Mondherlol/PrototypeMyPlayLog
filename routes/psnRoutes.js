const router = require('express').Router()
const psnCtrl = require('../controllers/psnController')

router.get('/userInfo/:username', psnCtrl.getUserInfo)
router.get('/userGames/:username', psnCtrl.getUserGames)
router.get('/userTrophies/:username', psnCtrl.getUserTrophies)
router.get('/userTrophiesByTitle/:username/:npComIdGame', psnCtrl.getTrophiesByTitle)

module.exports = router
