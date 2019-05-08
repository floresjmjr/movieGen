const GenFunc = require('./_community')

module.exports = {

  getMovieLists: function() {
    var apiKey = GenFunc.tmdbApiKey()
    var categoryList = [
      { name: 'trending 1', url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}` },
      { name: 'topRated 1', url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en&page=1`}, 
      { name: 'latest 1', url: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&vote_average.gte=7`},
      { name: 'trending 2', url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=2` },
      { name: 'topRated 2', url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en&page=2`}, 
      { name: 'latest 2', url: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en&sort_by=release_date.desc&include_adult=false&include_video=false&page=2&vote_count.gte=500&vote_average.gte=7`},
    ]
    var promises = [];
    categoryList.forEach((catObj)=>{
        promises.push(GenFunc.tmdbRequest(catObj.url))
    })
    return Promise.all(promises)
  }

}