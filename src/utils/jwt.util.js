const jwt = require('jsonwebtoken');

/**
 * Generate a signed JWT token for a given payload.
 * @param {object} payload - Data to embed in the token (e.g. { id, email })
 * @returns {string} Signed JWT string
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Verify and decode a JWT token.
 * @param {string} token
 * @returns {object} Decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
