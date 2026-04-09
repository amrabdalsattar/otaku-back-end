const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const animeController = require('../controllers/anime.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

// ── Validation rules ────────────────────────────────────────────────────────

const animeRules = [
  body('name').notEmpty().withMessage('Anime name is required.').trim(),
  body('type')
    .optional()
    .isIn(['series', 'movie', 'ova', 'special'])
    .withMessage('Type must be series, movie, ova, or special.'),
  body('rate')
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage('Rate must be between 0 and 10.'),
  body('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 5 })
    .withMessage('Please provide a valid year.'),
  body('episodes').optional().isInt({ min: 0 }).withMessage('Episodes must be a non-negative integer.'),
];

const characterRules = [
  body('name').notEmpty().withMessage('Character name is required.').trim(),
  body('favouritesNumber')
    .optional()
    .isInt({ min: 0 })
    .withMessage('favouritesNumber must be a non-negative integer.'),
];

// ── Routes ───────────────────────────────────────────────────────────────────

/**
 * @swagger
 * tags:
 *   name: Anime
 *   description: Anime management
 */

/**
 * @swagger
 * /api/anime:
 *   get:
 *     summary: Get all anime (paginated, sortable)
 *     tags: [Anime]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Results per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (comma-separated, prefix with - for desc)
 *     responses:
 *       200:
 *         description: List of anime
 */
router.get('/', animeController.getAllAnime);

/**
 * @swagger
 * /api/anime/filter:
 *   get:
 *     summary: Filter anime by type
 *     tags: [Anime]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, topRated, series, movies]
 *         required: true
 *     responses:
 *       200:
 *         description: Filtered list of anime
 */
router.get('/filter', animeController.filterAnime);

/**
 * @swagger
 * /api/anime/search:
 *   get:
 *     summary: Search anime by name, studio, or classification
 *     tags: [Anime]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term
 *     responses:
 *       200:
 *         description: Matching anime list
 */
router.get('/search', animeController.searchAnime);

/**
 * @swagger
 * /api/anime/{id}:
 *   get:
 *     summary: Get anime details by ID
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Full anime details
 *       404:
 *         description: Anime not found
 */
router.get('/:id', animeController.getAnimeById);

/**
 * @swagger
 * /api/anime/{id}/characters:
 *   get:
 *     summary: Get characters of a specific anime
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of characters
 *       404:
 *         description: Anime not found
 */
router.get('/:id/characters', animeController.getAnimeCharacters);

/**
 * @swagger
 * /api/anime/{animeId}/characters:
 *   post:
 *     summary: Add a character to an anime (Protected)
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               biography:
 *                 type: string
 *               favouritesNumber:
 *                 type: integer
 *               kanjiName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Character added successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Anime not found
 */
router.post('/:animeId/characters', authMiddleware, characterRules, validate, animeController.addCharacterToAnime);

/**
 * @swagger
 * /api/anime:
 *   post:
 *     summary: Create a new anime (Protected)
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               synopsis:
 *                 type: string
 *               type:
 *                 type: string
 *               rate:
 *                 type: number
 *               year:
 *                 type: integer
 *               studio:
 *                 type: string
 *               episodes:
 *                 type: integer
 *               status:
 *                 type: string
 *               rating:
 *                 type: string
 *               classifications:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Anime created
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, animeRules, validate, animeController.createAnime);

/**
 * @swagger
 * /api/anime/{id}:
 *   put:
 *     summary: Update an anime (Protected)
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Anime updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Anime not found
 */
router.put('/:id', authMiddleware, animeController.updateAnime);

/**
 * @swagger
 * /api/anime/{id}:
 *   delete:
 *     summary: Delete an anime (Protected)
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Anime deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Anime not found
 */
router.delete('/:id', authMiddleware, animeController.deleteAnime);

module.exports = router;
