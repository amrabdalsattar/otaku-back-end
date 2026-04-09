const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Character name is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    biography: {
      type: String,
      default: '',
    },
    favouritesNumber: {
      type: Number,
      default: 0,
      min: [0, 'Favourites number cannot be negative'],
    },
    kanjiName: {
      type: String,
      default: '',
    },
  },
  { _id: true }
);

const animeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Anime name is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    synopsis: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['series', 'movie', 'ova', 'special'],
      default: 'series',
    },
    rate: {
      type: Number,
      default: 0,
      min: [0, 'Rate cannot be less than 0'],
      max: [10, 'Rate cannot exceed 10'],
    },
    classifications: {
      type: [String],
      default: [],
    },
    year: {
      type: Number,
    },
    studio: {
      type: String,
      default: '',
      trim: true,
    },
    episodes: {
      type: Number,
      default: 0,
      min: [0, 'Episodes cannot be negative'],
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'upcoming'],
      default: 'ongoing',
    },
    rating: {
      type: String,
      default: '',
    },
    characters: {
      type: [characterSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Text index for search functionality
animeSchema.index({ name: 'text', studio: 'text', classifications: 'text' });

module.exports = mongoose.model('Anime', animeSchema);
