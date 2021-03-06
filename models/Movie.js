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
    type: Sequelize.TEXT,
  },
  poster_path: {
    type: Sequelize.STRING,
  },
  vote_average: {
    type: Sequelize.DECIMAL,
  },
  vote_count: {
    type: Sequelize.INTEGER,
  },
  release_date: {
    type: Sequelize.STRING,
  },
  popularity: {
    type: Sequelize.DECIMAL,
  },
  genre_ids: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  }
})

module.exports = Movie;
