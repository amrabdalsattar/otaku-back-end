const Anime = require('../models/anime.model');

/**
 * Get character details by character ID.
 * Searches across all anime documents for the embedded character.
 * @param {string} characterId
 * @returns {object}
 */
const getCharacterById = async (characterId) => {
  const anime = await Anime.findOne({ 'characters._id': characterId });

  if (!anime) {
    const err = new Error('Character not found.');
    err.statusCode = 404;
    throw err;
  }

  const character = anime.characters.id(characterId);

  return {
    id: character._id,
    charName: character.name,
    image: character.image,
    animeId: anime._id,
    animeName: anime.name,
    biography: character.biography,
    favouritesNumber: character.favouritesNumber,
    kanjiName: character.kanjiName,
  };
};

/**
 * Get top 3 characters from the highest-rated anime.
 * Logic:
 *  1. Find the anime with the highest `rate`
 *  2. Return first 3 characters sorted by favouritesNumber desc
 * @returns {Array}
 */
const getTopCharacters = async () => {
  const topAnime = await Anime.findOne().sort({ rate: -1 });

  if (!topAnime || topAnime.characters.length === 0) {
    return [];
  }

  const sorted = [...topAnime.characters].sort(
    (a, b) => b.favouritesNumber - a.favouritesNumber
  );

  return sorted.slice(0, 3).map((c) => ({
    characterId: c._id,
    name: c.name,
    image: c.image,
    kanjiName: c.kanjiName,
    favouritesNumber: c.favouritesNumber,
    animeId: topAnime._id,
    animeName: topAnime.name,
  }));
};

module.exports = { getCharacterById, getTopCharacters };
