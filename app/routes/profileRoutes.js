const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:user_id', profileController.getProfile);
router.put('/:user_id', profileController.updateProfile);
//router.delete('/:user_id', profileController.deleteProfile);

module.exports = router;