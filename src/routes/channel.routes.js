const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channel.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

// Route to create a new channel (can be called internally after signup)
router.post('/', authenticateJWT, channelController.createChannel);

// Route to get channel details for the authenticated user
router.get('/', authenticateJWT, channelController.getChannel);

module.exports = router;