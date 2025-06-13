const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
      return res.sendStatus(401); // If there's no token, return 401 unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // If token is not valid, return 403 forbidden
      }
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.sendStatus(401); // If user not found
      }
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.sendStatus(500);
  }
};

module.exports = verifyToken;