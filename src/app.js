require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const animeRoutes = require('./routes/anime.routes');
const characterRoutes = require('./routes/character.routes');

const errorMiddleware = require('./middlewares/error.middleware');
const setupSwagger = require('./docs/swagger');

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// ── Body Parser ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Swagger Documentation ────────────────────────────────────────────────────
setupSwagger(app);

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎌 Welcome to the Otaku Anime Platform API!',
    docs: '/api-docs',
    version: '1.0.0',
  });
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes);
app.use('/api/characters', characterRoutes);

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

// ── Centralized Error Handler ─────────────────────────────────────────────────
// Must be registered LAST
app.use(errorMiddleware);

module.exports = app;
