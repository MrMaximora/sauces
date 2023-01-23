const express = require('express');
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/sauce');
const multerConfig = require('../middlewares/multer-config');
const router = express.Router();

//ROUTER SAUCE
router.get('/',auth, sauceCtrl.getSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.post('/',auth, multerConfig, sauceCtrl.postSauce)
router.put('/:id',auth, multerConfig, sauceCtrl.updateSauce)
router.delete('/:id',auth, sauceCtrl.deleteSauce)
router.post('/:id/like',auth, sauceCtrl.likeSauce)

module.exports = router;