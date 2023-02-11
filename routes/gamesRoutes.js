const express = require('express')
const router = express.Router()

const gamesController = require('../controllers/gamesController')

router.get('/search/:name', gamesController.searchGame)
router.get('/:id', gamesController.getGameById)

module.exports = router
