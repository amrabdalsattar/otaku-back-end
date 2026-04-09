const animeService = require('../services/anime.service');

/**
 * @route  GET /api/anime
 * @access Public
 */
const getAllAnime = async (req, res, next) => {
  try {
    const result = await animeService.getAllAnime(req.query);

    res.status(200).json({
      success: true,
      total: result.total,
      page: result.page,
      limit: result.limit,
      count: result.data.length,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  GET /api/anime/filter?type=
 * @access Public
 */
const filterAnime = async (req, res, next) => {
  try {
    const result = await animeService.getAllAnime(req.query);

    res.status(200).json({
      success: true,
      count: result.data.length,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  GET /api/anime/search?q=
 * @access Public
 */
const searchAnime = async (req, res, next) => {
  try {
    const result = await animeService.getAllAnime({ ...req.query, limit: 50 });

    res.status(200).json({
      success: true,
      count: result.data.length,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  GET /api/anime/:id
 * @access Public
 */
const getAnimeById = async (req, res, next) => {
  try {
    const anime = await animeService.getAnimeById(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        id: anime._id,
        name: anime.name,
        synopsis: anime.synopsis,
        characters: anime.characters,
        type: anime.type,
        rate: anime.rate,
        classifications: anime.classifications,
        year: anime.year,
        studio: anime.studio,
        episodes: anime.episodes,
        status: anime.status,
        rating: anime.rating,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  GET /api/anime/:id/characters
 * @access Public
 */
const getAnimeCharacters = async (req, res, next) => {
  try {
    const characters = await animeService.getAnimeCharacters(req.params.id);

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
 * @route  POST /api/anime/:animeId/characters
 * @access Protected
 */
const addCharacterToAnime = async (req, res, next) => {
  try {
    const anime = await animeService.addCharacterToAnime(req.params.animeId, req.body);

    res.status(201).json({
      success: true,
      message: 'Character added successfully.',
      data: anime,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  POST /api/anime
 * @access Protected
 */
const createAnime = async (req, res, next) => {
  try {
    const anime = await animeService.createAnime(req.body);

    res.status(201).json({
      success: true,
      message: 'Anime created successfully.',
      data: anime,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  PUT /api/anime/:id
 * @access Protected
 */
const updateAnime = async (req, res, next) => {
  try {
    const anime = await animeService.updateAnime(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Anime updated successfully.',
      data: anime,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route  DELETE /api/anime/:id
 * @access Protected
 */
const deleteAnime = async (req, res, next) => {
  try {
    await animeService.deleteAnime(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Anime deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAnime,
  filterAnime,
  searchAnime,
  getAnimeById,
  getAnimeCharacters,
  addCharacterToAnime,
  createAnime,
  updateAnime,
  deleteAnime,
};
