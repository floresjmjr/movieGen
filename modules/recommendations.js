
const GenFunc = require('./_community')

module.exports = {


  getRecommendations: function(movies) {
    console.log('getReccomendations');
    var promises = [];
    movies.forEach((movie)=>{
      promises.push(this.requestRecommendations(movie.movie_id))      
    })
    return Promise.all(promises)
  },

  requestRecommendations: function(movieId) {
    var apiKey = GenFunc.tmdbApiKey();
    var url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`
    return GenFunc.tmdbRequest(url)
  },

  mergeRecommendations: function(nestedArr) {
    console.log('mergeRecommendations', nestedArr)
    var results = [];
    nestedArr.forEach((arr)=>{
      results = results.concat(arr)
    })
    return results;
  },


}