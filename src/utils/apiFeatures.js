/**
 * ApiFeatures — chainable query builder for Mongoose.
 *
 * Usage:
 *   const features = new ApiFeatures(Anime.find(), req.query)
 *     .filter()
 *     .search()
 *     .sort()
 *     .paginate();
 *   const docs = await features.query;
 */
class ApiFeatures {
  /**
   * @param {mongoose.Query} query  - A Mongoose query object (e.g. Model.find())
   * @param {object}         queryString - req.query from Express
   */
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * Filter by type: all | topRated | series | movies
   */
  filter() {
    const { type } = this.queryString;

    if (!type || type === 'all') {
      return this;
    }

    if (type === 'topRated') {
      this.query = this.query.sort({ rate: -1 });
      return this;
    }

    if (type === 'series') {
      this.query = this.query.find({ type: 'series' });
      return this;
    }

    if (type === 'movies') {
      this.query = this.query.find({ type: 'movie' });
      return this;
    }

    return this;
  }

  /**
   * Full-text search across name, studio, classifications.
   * Falls back to regex when the text index is not available.
   */
  search() {
    const { q } = this.queryString;

    if (q) {
      const regex = new RegExp(q, 'i');
      this.query = this.query.find({
        $or: [
          { name: regex },
          { studio: regex },
          { classifications: regex },
        ],
      });
    }

    return this;
  }

  /**
   * Sort by any field passed via ?sort=rate,-year (comma-separated).
   * Defaults to newest first.
   */
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * Paginate results.
   * ?page=1&limit=10
   */
  paginate() {
    const page = Math.max(1, parseInt(this.queryString.page, 10) || 1);
    const limit = Math.min(100, parseInt(this.queryString.limit, 10) || 10);
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this.page = page;
    this.limit = limit;

    return this;
  }
}

module.exports = ApiFeatures;
