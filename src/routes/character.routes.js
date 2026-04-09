const express = require('express');
const router = express.Router();

const characterController = require('../controllers/character.controller');

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Character endpoints
 */

/**
 * @swagger
 * /api/characters/top:
 *   get:
 *     summary: Get top 3 characters from the highest-rated anime
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: Top 3 characters
 */
// NOTE: /top MUST be defined before /:id so Express doesn't treat "top" as an ID
router.get('/top', characterController.getTopCharacters);

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     summary: Get character details by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Character details
 *       404:
 *         description: Character not found
 */
router.get('/:id', characterController.getCharacterById);

module.exports = router;
