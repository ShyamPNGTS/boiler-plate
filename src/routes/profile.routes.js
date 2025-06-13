const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

// Get user profile
router.get('/', authenticateJWT, profileController.getProfile);

// Update user profile
router.put('/', authenticateJWT, profileController.updateProfile);

module.exports = router;