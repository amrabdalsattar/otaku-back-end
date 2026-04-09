const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt.util');

const SALT_ROUNDS = 12;

/**
 * Register a new user.
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: object }}
 */
const register = async (email, password) => {
  // Check for existing user
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use.');
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({ email, password: hashedPassword });

  const token = generateToken({ id: user._id, email: user.email });

  return {
    token,
    user: { id: user._id, email: user.email, createdAt: user.createdAt },
  };
};

/**
 * Authenticate an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: object }}
 */
const login = async (email, password) => {
  // Explicitly select password (it's hidden by default via `select: false`)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken({ id: user._id, email: user.email });

  return {
    token,
    user: { id: user._id, email: user.email, createdAt: user.createdAt },
  };
};

module.exports = { register, login };
