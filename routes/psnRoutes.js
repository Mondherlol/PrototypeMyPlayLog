const router = require('express').Router();
const psnCtrl=require("../controllers/psnController");

// username in "body" => user informations
router.post('/userInfo',psnCtrl.getUserInfo);
router.post('/userGames',psnCtrl.getUserGames);
router.post('/userTrophies',psnCtrl.getUserTrophies);



module.exports = router;