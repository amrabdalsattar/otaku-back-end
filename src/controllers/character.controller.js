const characterService = require('../services/character.service');

/**
 * @route  GET /api/characters/top
 * @access Public
 */
const getTopCharacters = async (req, res, next) => {
  try {
    const characters = await characterService.getTopCharacters();

    res.status(200).json({
      success: true,
      count: characters.length,
      data: characters,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  GET /api/characters/:id
 * @access Public
 */
const getCharacterById = async (req, res, next) => {
  try {
    const character = await characterService.getCharacterById(req.params.id);

    res.status(200).json({
      success: true,
      data: character,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTopCharacters, getCharacterById };
