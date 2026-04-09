const Anime = require('../models/anime.model');
const ApiFeatures = require('../utils/apiFeatures');

/**
 * Get all anime with filter, search, sort, and pagination.
 * @param {object} queryString - req.query
 * @returns {{ data: Anime[], total: number, page: number, limit: number }}
 */
const getAllAnime = async (queryString) => {
  const features = new ApiFeatures(Anime.find(), queryString)
    .filter()
    .search()
    .sort()
    .paginate();

  const [data, total] = await Promise.all([
    features.query.select('name image year rate type'),
    Anime.countDocuments(),
  ]);

  return { data, total, page: features.page, limit: features.limit };
};

/**
 * Get full anime details by ID.
 * @param {string} id
 * @returns {Anime}
 */
const getAnimeById = async (id) => {
  const anime = await Anime.findById(id);
  if (!anime) {
    const err = new Error('Anime not found.');
    err.statusCode = 404;
    throw err;
  }
  return anime;
};

/**
 * Get characters of a specific anime.
 * @param {string} animeId
 * @returns {Array}
 */
const getAnimeCharacters = async (animeId) => {
  const anime = await Anime.findById(animeId).select('characters');
  if (!anime) {
    const err = new Error('Anime not found.');
    err.statusCode = 404;
    throw err;
  }

  return anime.characters.map((c) => ({
    characterId: c._id,
    image: c.image,
    name: c.name,
  }));
};

/**
 * Add a character to an anime.
 * @param {string} animeId
 * @param {object} characterData
 * @returns {Anime} Updated anime document
 */
const addCharacterToAnime = async (animeId, characterData) => {
  const anime = await Anime.findById(animeId);
  if (!anime) {
    const err = new Error('Anime not found.');
    err.statusCode = 404;
    throw err;
  }

  anime.characters.push(characterData);
  await anime.save();

  return anime;
};

/**
 * Create a new anime.
 * @param {object} animeData
 * @returns {Anime}
 */
const createAnime = async (animeData) => {
  const anime = await Anime.create(animeData);
  return anime;
};

/**
 * Update an anime by ID.
 * @param {string} id
 * @param {object} updateData
 * @returns {Anime}
 */
const updateAnime = async (id, updateData) => {
  const anime = await Anime.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!anime) {
    const err = new Error('Anime not found.');
    err.statusCode = 404;
    throw err;
  }

  return anime;
};

/**
 * Delete an anime by ID.
 * @param {string} id
 */
const deleteAnime = async (id) => {
  const anime = await Anime.findByIdAndDelete(id);

  if (!anime) {
    const err = new Error('Anime not found.');
    err.statusCode = 404;
    throw err;
  }
};

/**
 * Filter anime by type/topRated.
 * Delegates to getAllAnime with the type param.
 * @param {string} type
 * @returns {Array}
 */
const filterAnime = async (type) => {
  return getAllAnime({ type });
};

/**
 * Search anime by q term across name, studio, classifications.
 * @param {string} q
 * @returns {Array}
 */
const searchAnime = async (q) => {
  return getAllAnime({ q, limit: 50 });
};

module.exports = {
  getAllAnime,
  getAnimeById,
  getAnimeCharacters,
  addCharacterToAnime,
  createAnime,
  updateAnime,
  deleteAnime,
  filterAnime,
  searchAnime,
};
