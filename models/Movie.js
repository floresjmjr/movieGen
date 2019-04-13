const Sequelize = require('sequelize')
const db = require('../config/database')

const Movie = db.define('movie', {
  movie_id: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
  },
  overview: {
    type: Sequelize.STRING,
  },
  post_path: {
    type: Sequelize.STRING,
  },
  vote_average: {
    type: Sequelize.STRING,
  },
  vote_count: {
    type: Sequelize.INTEGER,
  },
  release_date: {
    type: Sequelize.STRING,
  },
  popularity: {
    type: Sequelize.INTEGER,
  },
  genre_ids: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },

},   
{timestamps: false})

module.exports = Movie;