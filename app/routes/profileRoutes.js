const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const upload = require('../middlewares/multer');

router.get('/:user_id', profileController.getProfile);
router.put('/photo/:user_id', upload.single('profile_photo'), profileController.updateProfilePhoto);
router.put('/:user_id', profileController.updateProfile);
router.delete('/:user_id', profileController.deleteProfile);

module.exports = router;