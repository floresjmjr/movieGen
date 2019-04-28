const movieModel = require('../models/Movie')

module.exports = {

  findSavedMovies: function() {
    return movieModel.findAll();
  },

  insertMovie: function(movieObj) {
    return movieModel.create({
      movie_id: movieObj.id,
      title: movieObj.title,
      overview: movieObj.overview,
      post_path: movieObj.post_path,
      vote_average: movieObj.vote_average,
      vote_count: movieObj.vote_count,
      release_date: movieObj.release_date,
      popularity: movieObj.popularity,
      genre_ids: movieObj.genre_ids,
    }) 
  },

  removeMovieById: function(id) {
    return movieModel.destroy({
      where: {
        movie_id: id,
      }
    })
  },


}