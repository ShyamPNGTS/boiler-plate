const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

// Get wallet balance for the authenticated user
router.get('/balance', authenticateJWT, walletController.getWalletBalance);

// Withdraw funds from the authenticated user's wallet
router.post('/withdraw', authenticateJWT, walletController.withdrawFunds);

module.exports = router;