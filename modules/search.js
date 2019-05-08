const GenFunc = require('./_community')


module.exports = {
  results: [],

  movieById: function(id) {
    console.log('addMovieById working');
    var savedMovie = {};
    this.results.forEach((movieObj)=>{
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