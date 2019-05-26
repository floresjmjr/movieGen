
const GenFunc = require('./_community')

module.exports = {

  list: [],

  getRecommendations: function(movieId) {
    console.log('getReccomendations');
    var promises = [];
    var pageCount;
    for(pageCount = 1; pageCount < 3; pageCount+=1){
      promises.push(this.requestRecommendations(movieId, pageCount))
    }
    return Promise.all(promises)
  },

  requestRecommendations: function(movieId, pageCount) {
    var apiKey = GenFunc.tmdbApiKey();
    var url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=${pageCount}`
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