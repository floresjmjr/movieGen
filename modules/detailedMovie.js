const GenFunc = require('./_community')

module.exports = {

  getMovieByTitle: function(searchData) {
    console.log('searchMovieByTitle')
    var apiKey = GenFunc.omdbApiKey();
    var data = searchData.split('&');
    var encodedName = encodeURIComponent(data[0]);
    var date = data[1].substring(0, 4);
    var encodedUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodedName}&y=${date}&plot=full`
    return GenFunc.omdbRequest(encodedUrl)
  },
}