const GenFunc = require('./_community')

module.exports = {

  apiKey: GenFunc.tmdbApiKey(),

  getTrendingList: function() {
    var url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}`;
    return this.getMovies(url)
  },

  getTopRatedList: function() {
    var url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en&page=1`;
    return this.getMovies(url);
  },

  getLatestList: function() {
    var url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&vote_average.gte=7`;
    return this.getMovies(url);
  },

  getMovies: function(url) {
    var promises = [];
    var i;
    for(i = 1; i < 3; i+=1){
      promises.push(GenFunc.tmdbRequest(url + `&page=${i}`))
    }
    return Promise.all(promises)
  }

}