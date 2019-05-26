const GenFunc = require('./_community')
const Recommend = require('./recommendations')

module.exports = {

  movieById: function(id) {
    console.log('addMovieById working');
    var savedMovie = {};
    Recommend.list.forEach((movieObj)=>{
      if (movieObj.id === Number(id)) {
        savedMovie = movieObj;
      }
    })
    return savedMovie;
  },

  byMovieName: function(movieName) {
    var apiKey = GenFunc.tmdbApiKey()
    var encodedQuery = encodeURIComponent(movieName); 
    var encodedPath = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodedQuery}&page=1`
    return GenFunc.tmdbRequest(encodedPath);
  },

}