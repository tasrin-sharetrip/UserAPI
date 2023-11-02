const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middlewares/multer'); // Import the Multer configuration

router.post('/register', upload.single('profile_photo'), authController.register);
router.post('/login', authController.login);

module.exports = router;